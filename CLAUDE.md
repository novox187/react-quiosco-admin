# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`, `pnpm-workspace.yaml`). Do not introduce `npm install` / `package-lock.json` — `package-lock.json` was intentionally removed.

- `pnpm dev` — Vite dev server with HMR
- `pnpm build` — production build to `dist/`
- `pnpm preview` — preview the production build
- `pnpm lint` — `eslint . --ext js,jsx --max-warnings 0` (zero-warning policy)
- `pnpm start` — `serve -s dist` (serve a built bundle, useful for prod-like local runs)

`pnpm-workspace.yaml` lists `@heroui/shared-utils` and `esbuild` under `allowBuilds:` — these need post-install scripts allowed when installing.

There is no test runner configured.

## Environment

Required at runtime (Vite, so `VITE_*` are exposed to the client):

- `VITE_API_URL` — backend HTTP base, used by `src/config/axios.js` (axios is created with `withCredentials: true`)
- `VITE_SOCKET_URL` — socket.io endpoint, connected from `AdminProvider`

See `.env.example`.

## Architecture

This is a **Vite + React 18** SPA serving as the staff/admin side of a "quiosco" (POS / order management) system. UI strings are in Spanish — keep that consistent when editing user-facing copy. The backend (Laravel-style API, separate repo) exposes `/api/...` endpoints and a socket.io server that this client both **emits to** and **listens on**.

### Routing — two layout trees

`src/router.jsx` defines two top-level routes, both wrapped by `AdminProvider`:

- `/` → `AuthLayout` (`Login`, `/auth/registro`)
- `/admin` → `AdminLayout` with nested role-specific views (`Dashboard`, `Ordenes` cocinero, `Despacho` mesero, `Repartidor`, `Productos`, `Categorias`, `ResivosPedidos`, etc.)
- `/error` → `Errores`

Note `AdminProvider` wraps the `/` tree too — auth screens depend on its state (e.g. `pedidoEnCurso`).

### State: `AdminProvider` is the hub

`src/context/AdminProvider.jsx` is the central store for nearly all domain state (products, categories, orders, cash register, modals, websocket connection). It is large and intentionally so — most components consume it via `useAdmin()` (`src/hooks/useAdmin.js`). When adding a new feature, the established pattern is to add state + handlers here and expose them through the provider value.

`src/context/GeneralProvider.jsx` is much smaller and only holds top-level auth state (`userActual`, `modalAuth`, `authActual`). It mounts at the root in `src/main.jsx`.

### The socket-driven update loop (important)

Local mutations do **not** update state directly from the API response. The pattern is:

1. Component calls a handler in `AdminProvider` (e.g. `crearProducto`, `handleClickCompletarPedido`).
2. Handler POSTs/PUTs to the backend.
3. On success, the handler `socketConnection.emit(...)` an event (e.g. `onCrearProducto`, `onPedido`, `onRegistro`).
4. The backend rebroadcasts; the **same client** receives it in its `socketConnection.on(...)` listener.
5. The listener calls a setter (e.g. `setProductoNuevo`); a dedicated `useEffect` then reconciles `productoQuery` / `categoriasProductos` / `pedidosQuery`.

Consequences:
- If you add a new mutation, you must also emit a socket event and (usually) add a listener + reconciliation `useEffect`, otherwise the UI won't reflect the change until reload.
- The reconciliation effects in `AdminProvider` are coupled to specific data shapes (`productoQuery.data`, `pedidosQuery.pedidos`, `categoriasProductos[i].productos`). Preserve those shapes when modifying API responses or the corresponding setters.

Socket events currently in use (client side): `onCrearProducto`, `onActualizarProductos`, `onMoverProducto`, `onEliminarProductos`, `onDisponible`, `onPedido`, `onNuevoPedido`, `onEliminarPedido`, `onEditarCategoria`, `onCrearCategoria`, `onEliminarCategoria`, `onCaja`, `onRegistro`.

### Auth + role-based redirect

`src/hooks/useAuth.js`:
- SWR-fetches `/api/employees/session` as the session source of truth.
- `login` / `registro` persist three things in parallel: `localStorage.AUTH_TOKEN`, `localStorage.USER` (email), and a `userData` cookie via `js-cookie` (2-day expiry). Treat the cookie as the canonical user object — `AdminProvider` re-reads it on every render.
- A `useEffect` performs **role-based navigation** every time `userActual` or `pedidoEnCurso` changes. `admin` is blocked from `/admin/repartidor|cocinero|mesero|/`; `repartidor` is forced into `/admin/repartidor` or the active pedido map. Be careful editing this — it runs on every protected page and can cause redirect loops if a new route isn't accounted for.
- `useAuth` accepts a `middleware` arg but it is currently unused; don't rely on it gating anything.

The token used for `Authorization: Bearer ...` is read inconsistently across the codebase — sometimes from the `userData` cookie, sometimes inline from `localStorage.getItem('AUTH_TOKEN')`, and many handlers gate on `localStorage.getItem('USER')` being truthy as a "logged-in" check. Follow the surrounding convention in the file you're editing rather than introducing a fourth pattern.

### Repartidor (delivery driver) flow

- Map UI: `react-leaflet` + `leaflet` (CSS imported in `src/main.jsx`).
- `pedidoEnCurso` is mirrored in a cookie (`Cookies.set('pedidoEnCurso', ...)`) so the driver returns to the active order on reload. `asignarPedido` / `cancelarPedido` / `finalizarPedido` in `AdminProvider` manage this cookie and trigger `window.location.reload()` on cancel/finish (intentional — clears all derived state).

### Modals

Two coexisting modal systems:
- Legacy: `react-modal` instances rendered at the bottom of `AdminLayout.jsx`, each gated by a boolean in `AdminProvider` (`modalCrearProducto`, `modalEditarCategoria`, …). To add a modal of this style, add the boolean to the provider, render the `<Modal>` in `AdminLayout`, and toggle from anywhere via `useAdmin()`.
- Newer: HeroUI `useDisclosure()` (`isOpenDireccionEntrega`, `isOpenConfirmarCancelarEntrega`, …) also exposed through `AdminProvider`. Prefer this for new modals.

### UI stack

- **HeroUI** (`@heroui/react`) is the primary component library; `<HeroUIProvider>` wraps the app in `main.jsx`.
- **Tailwind** with the HeroUI plugin. Brand palette in `tailwind.config.js`: `primero` `#F09441`, `segundo` `#4E1333`, `tercero` `#FAD6C6`, `cuarto` `#9F4F42`. Custom font families: `raleway` (default body), `lato`, `lobster`, `kaushan`, `kalam`, `allura`.
- **react-toastify** for notifications (`ToastContainer` mounted in `AdminLayout`).
- **apexcharts** / `react-apexcharts` for dashboard charts.
- **framer-motion** for animations.

### Helpers

`src/helpers/index.js` has the shared formatters — currency (`formatearDinero`), date/time (`limpiarCreateAtFecha`, `formatearFecha`), text normalization for DB vs view, and `generateGoogleMapsUrl` for the delivery flow. Reuse these instead of re-implementing.

### Print

`AdminLayout` injects inline `@media print` CSS (`.inpresion`, `.inpresionScroll`) used by `ResivosPedidos` / receipt views. Apply those class names on elements that should be hidden or scroll-locked when printing receipts.

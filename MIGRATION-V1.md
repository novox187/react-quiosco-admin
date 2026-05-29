# Migración del admin React al backend v1

Este admin originalmente consumía la API v0 (`http://127.0.0.1:8000/api/...`).
Como parte del rebuild se migró al backend v1 (`http://127.0.0.1:8001/api/v1/...`),
documentado en `backend-v2/docs/`.

Esta guía explica qué cambió, qué quedó migrado y qué quedó pendiente.

## Configuración global

| Antes | Ahora |
|---|---|
| `VITE_API_URL=http://127.0.0.1:8000` | `VITE_API_URL=http://127.0.0.1:8001` |
| Auth header manual en cada call | Interceptor en `axios.js` lo agrega solo |
| Calls a `/api/categorias` | Calls a `/categorias` (baseURL = `/api/v1`) |

Nuevas variables en `.env`:
```
VITE_API_URL=http://127.0.0.1:8001
VITE_API_VERSION=v1
VITE_REVERB_APP_KEY=local-key
VITE_REVERB_HOST=127.0.0.1
VITE_REVERB_PORT=8080
```

## Cambios de shape importantes

### Usuario / Auth

| Legacy | v1 |
|---|---|
| `data.name`, `data.first_name`, `data.last_name` | `data.user.nombre`, `data.user.apellido` |
| `data.rol` (string único) | `data.user.roles[]` (array) y `data.user.permisos[]` |
| `data.id_user` | `data.user.id` |

`useAuth.js` ahora normaliza esto: dado `roles[]`, mapea el rol principal a la string
legacy (`admin` para superadmin/gerente, otros pasan tal cual). Los componentes que
leen `userActual.rol`, `userActual.name`, `userActual.id_user` siguen funcionando
sin cambios — `normalizarUsuario()` les expone esos campos como alias.

### Pedidos

| Legacy | v1 |
|---|---|
| `estado` numérico 0..3 | `estado` enum string: `recibido|en_preparacion|listo|en_entrega|entregado|cerrado|cancelado` |
| `lugar: "local"|"envio"` | `tipo_servicio: "local"|"para_llevar"|"delivery"|"en_mesa"` |
| `identificador: 0|1|2` para avanzar | `estado: <string>` |
| `numero_pedido` formato libre | Igual: `A-000`…`Z-999` con wraparound |

### Categorías / Productos

| Legacy | v1 |
|---|---|
| `GET /api/categorias/productos` → `{ data: [...] }` | `GET /categorias?con_productos=true` → array plano |
| `GET /api/productos` → array plano | `GET /productos?por_pagina=200` → paginado `{ data, links, meta }` |
| `precio` campo libre | `precio` decimal string, `promocion_id` (no `promo_id`) |

## Mapping endpoint a endpoint

| Legacy | v1 | Estado |
|---|---|---|
| `POST /api/employee/login` | `POST /auth/login` | ✅ migrado |
| `POST /api/employee/register` | `POST /auth/register` | ✅ migrado (con remapeo first_name → nombre) |
| `GET /api/employees/session` | `GET /auth/me` | ✅ migrado |
| `POST /api/logout` | `POST /auth/logout` | ✅ migrado |
| `GET /api/categorias` | `GET /categorias` | ✅ migrado |
| `GET /api/categorias/productos` | `GET /categorias?con_productos=true` | ✅ migrado |
| `POST /api/categorias/create` | `POST /categorias` multipart | ✅ migrado |
| `POST /api/categorias/update/{id}` | `POST /categorias/{id}` multipart | ✅ migrado |
| `DELETE /api/categorias/eliminar/{id}` | `DELETE /categorias/{id}` | ✅ migrado |
| `GET /api/productos` | `GET /productos?por_pagina=200` paginado | ✅ migrado |
| `POST /api/productos/create` | `POST /productos` multipart | ✅ migrado |
| `POST /api/productos/actualizar/{id}` | `POST /productos/{id}` multipart | ✅ migrado |
| `PUT /api/productos/disponible/{id}` | `PATCH /productos/{id}/disponibilidad` con `{disponible}` | ✅ migrado |
| `PUT /api/productos/eliminar/{id}` | `DELETE /productos/{id}` (soft-delete) | ✅ migrado |
| `PUT /api/productos/mover/{id}` | `PATCH /productos/{id}/mover` con `{categoria_id}` | ✅ migrado |
| `GET /api/promociones` | `GET /promociones` | ✅ migrado |
| `POST /api/promocion/create` | `POST /promociones` con `{nombre, descuento, activa}` | ✅ migrado |
| `GET /api/contenedores` | `GET /contenedores-opcion` | ✅ migrado |
| `GET /api/pedidos/admin` | `GET /pedidos?activos=true` paginado | ✅ migrado |
| `POST /api/pedidos/nuevo` | `POST /pedidos` con shape v1 (`items[].producto_id`, `opciones[]`) | ✅ migrado |
| `PUT /api/pedidos/actualizar/{id}` con `identificador` | `PATCH /pedidos/{id}/estado` con `estado` | ✅ migrado |
| Cancelar pedido (legacy via calificación) | `PATCH /pedidos/{id}/cancelar` con `{motivo}` | ✅ migrado parcial |
| `GET /api/pedidos/repartidor` | `GET /delivery/asignaciones/mias` | ✅ migrado |
| `POST /api/pedidos/repartidor/asignar/{id}` | `POST /delivery/pedidos/{id}/asignar` con `{repartidor_id}` | ✅ migrado |
| `PATCH /api/pedidos/repartidor/cancelar/{id}` | `PATCH /delivery/asignaciones/{id}/cancelar` | ✅ migrado |
| `PATCH /api/pedidos/repartidor/finalizar/{id}` | `PATCH /delivery/asignaciones/{id}/finalizar` | ✅ migrado |
| `GET /api/caja` | `GET /caja/cajas` (lista con apertura activa anidada) | ✅ migrado |
| `POST /api/caja/abrir` | `POST /caja/cajas/{id}/abrir` con `{fondo_inicial}` | ✅ migrado |
| `POST /api/caja/cerrar` | `POST /caja/aperturas/{id}/cerrar` con `{fondo_final_real}` | ✅ migrado |

## Pendientes (endpoints v1 que faltan crear en backend)

Estos archivos del admin siguen llamando a endpoints legacy que **no tienen equivalente en v1 todavía**. Cuando se llame al endpoint legacy, el backend devolverá 404. Para producción hay que agregar estos endpoints al backend (Fase de mantenimiento post-rebuild) o reemplazar la pantalla.

| Archivo del admin | Endpoint legacy | Acción recomendada |
|---|---|---|
| `views/admin/Dashboard.jsx` | `GET /api/datos/datosPanel` | Crear `GET /reportes/dashboard` en backend con KPIs (ventas día, pedidos activos, etc.) |
| `components/admin/dashboard/TablaUsuarios.jsx` | `GET /api/users` | Crear `GET /usuarios` con paginación y permiso `usuarios.gestionar` |
| `components/admin/dashboard/TablaEquipoTrabajo.jsx` | `GET /api/users/equipoTrabajo` | Crear `GET /personal/empleados` (ya existe pero requiere `personal_avanzado=on`) |
| `components/admin/dashboard/TablaRegistro.jsx` | `GET /api/registros` | Crear `GET /auditoria/registros` que lea de MongoDB `audit_log` |
| `components/admin/dashboard/RegistroInforme.jsx` | `GET /api/registros/{id}` | Crear `GET /auditoria/registros/{id}` |
| `views/admin/ResivosPedidos.jsx` | `GET /api/pedidos/pedidosCheques`, `POST /pedidos/pedidosCheques/busqueda` | Crear `GET /pedidos?estado=cerrado&busqueda=` |
| Cobro al confirmar pedido | (incrustado en update legacy) | `POST /pedidos/{id}/pagos` ya existe — falta resolver `metodo_pago_id` dinámicamente desde el frontend (hoy hardcoded a `1`). Crear `GET /metodos-pago` y usar el selector |

## Tiempo real (Socket.io → Reverb)

El admin actualmente usa Socket.io contra un servidor Node aparte (`VITE_SOCKET_URL`).
El backend v1 usa **Laravel Reverb** (Pusher-compatible).

Plan de migración (no incluido en este pase):
1. Reemplazar `socket.io-client` por `laravel-echo` + `pusher-js`.
2. Configurar Echo con las variables `VITE_REVERB_*` que ya están en `.env`.
3. Sustituir `socketConnection.on("onPedido", ...)` por `Echo.channel("pedidos").listen(".pedido.estado_cambiado", ...)`.
4. Sustituir `.emit(...)` por NADA — los eventos los emite el backend automáticamente al cambiar de estado vía `PATCH /pedidos/{id}/estado`.

Ver `backend-v2/docs/guides/eventos-tiempo-real.md`.

Como capa de seguridad mientras coexisten, el admin actual usa `socketConnection?.emit(...)`
con optional chaining para no crashear si Socket.io no está configurado.

## Cómo probar la migración

1. Levantar backend v1:
   ```bash
   cd backend-v2
   docker compose up -d
   php artisan serve --port=8001
   ```
2. Asegurarse de que en `backend-v2/.env`: `CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174` (o `*` en dev).
3. Levantar el admin:
   ```bash
   cd react-quiosco-admin
   npm install
   npm run dev
   ```
4. Login con `admin@quiosco.test / Admin1234` (usuario seed).
5. Verificar:
   - Login funciona y muestra el usuario en navbar.
   - Lista de categorías y productos carga.
   - Crear un producto multipart con imagen funciona (requiere `CLOUDINARY_URL` configurado en backend o deja la imagen sin subir).
   - Avanzar estado de pedido por el state machine: 422 si la transición es ilegal.
   - Abrir y cerrar caja registran apertura y arqueo correctamente.

## Limpieza futura

Una vez validada la migración, los siguientes vestigios pueden quitarse:
- `Cookies.set("userData", ...)` — duplicado de localStorage en v1.
- `socketConnection.emit(...)` — los eventos los emite el backend ahora, no el frontend.
- Helpers que asumen `estado` numérico (`estado === 1`) — todo es string ahora.
- Estado de Spanish-mixed-with-snake: el admin v1 nuevo debería elegir un convention y stick to it.

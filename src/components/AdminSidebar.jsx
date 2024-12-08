import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import Usuario from './Usuario';
import { useMemo } from 'react';

export default function AdminSidebar() {
  const location = useLocation();
  const { user } = useAuth({ middleware: '' });

  // Define rutas por rol usando useMemo
  const RutasPorRol = useMemo(
    () => ({
      admin: [
        { path: "/admin", label: "Panel" },
        { path: "/admin/productos", label: "Productos" },
        { path: "/admin/categorias", label: "Categorias" },
        { path: "/admin/resivos", label: "Resivos" },
        { path: "/admin/mesero", label: "Mesero" },
        { path: "/admin/cocinero", label: "Chef" },
      ],
      mesero: [
        { path: "/admin/mesero", label: "Mesero" },
        { path: "/admin/resivos", label: "Resivos" },
      ],
      cocinero: [
        { path: "/admin/cocinero", label: "Chef" },
      ],
      repartidor: [
        { path: "/admin/repartidor", label: "Repartidor" },
      ],
    }),
    []
  );

  // Obtén las rutas válidas para el rol actual
  const rutasValidas = RutasPorRol[user?.rol] || [];

  return (
    <aside className="flex flex-col justify-between lg:ml-[10px] lg:my-[10px] lg:w-60 lg:p-2 lg:pt-5 lg:rounded-xl rounded-b-xl bg-zinc-900 inpresion">
      <div>
        <div className="flex flex-row justify-between items-center lg:flex-col overflow-hidden px-3">
          <div className="flex lg:justify-center items-center py-4 lg:p-4 relative">
            <img
              className="w-[3rem] lg:w-40"
              src={`https://res.cloudinary.com/dfrsffngq/image/upload/v1723837093/logo.png`}
              alt="Imagen Logo"
            />
            <p className="text-center h-full mx-2 xs:text-xl lg:text-2xl tracking-tighter leading-none lg:hidden font-allura text-white">
              secos y bolones
            </p>
          </div>
          <div className="flex lg:w-full justify-end lg:justify-center visible lg:invisible">
            <Usuario />
          </div>
        </div>

        {/* Genera las rutas dinámicamente */}
        {rutasValidas.length > 0 && (
          <nav className="flex flex-row justify-around text-mini overflow-auto lg:flex-col lg:border-none min-w-60 lg:text-lg pr-4 py-3">
            {rutasValidas.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`font-bold uppercase ${location.pathname === path ? 'bg-zinc-800' : ''} p-3 lg:p-4 rounded-xl lg:rounded-l-xl`}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </aside>
  );
}

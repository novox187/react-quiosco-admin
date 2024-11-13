import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLocation } from 'react-router-dom'
import Usuario from './Usuario';

export default function AdminSidebar() {
    let location = useLocation();
    const { user } = useAuth({ middleware: '' });
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
                        <p className="text-center h-full mx-2 xs:text-xl lg:text-2xl  tracking-tighter leading-none lg:hidden font-allura text-white">secos y bolones</p>
                    </div>
                    <div className="flex lg:w-full justify-end lg:justify-center visible lg:invisible">
                        <Usuario/>
                    </div>
                </div>

                {user?.rol === 'admin' && (
                    <nav className='flex flex-row justify-around text-mini overflow-auto lg:flex-col  lg:border-none min-w-60  lg:text-lg pr-4 py-3'>
                        <Link to="/admin" className={`font-bold uppercase ${location.pathname === '/admin' ? 'bg-zinc-800' : ''}  p-3 lg:p-4 rounded-xl lg:rounded-l-xl`}>Panel</Link>
                        <Link to="/admin/productos" className={`font-bold uppercase ${location.pathname === '/admin/productos' ? 'bg-zinc-800' : ''}  p-3 lg:p-4 rounded-xl lg:rounded-l-xl`}>Productos</Link>
                        <Link to="/admin/categorias" className={`font-bold uppercase ${location.pathname === '/admin/categorias' ? 'bg-zinc-800' : ''}  p-3 lg:p-4 rounded-xl lg:rounded-l-xl`}>Categorias</Link>
                        <Link to="/admin/resivos" className={`font-bold uppercase ${location.pathname === '/admin/resivos' ? 'bg-zinc-800' : ''}  p-3 lg:p-4 rounded-xl lg:rounded-l-xl`}>Resivos</Link>
                        <Link to="/admin/mesero" className={`font-bold uppercase ${location.pathname === '/admin/mesero' ? 'bg-zinc-800' : ''}  p-3 lg:p-4 rounded-xl lg:rounded-l-xl`}>Mesero</Link>
                        <Link to="/admin/cocinero" className={`font-bold uppercase ${location.pathname === '/admin/cocinero' ? 'bg-zinc-800' : ''}  p-3 lg:p-4 rounded-xl lg:rounded-l-xl`}>Chef</Link>
                        <Link to="/admin/repartidor" className={`font-bold uppercase ${location.pathname === '/admin/repartidor' ? 'bg-zinc-800' : ''}  p-3 lg:p-4 rounded-xl lg:rounded-l-xl`}>Repartidor</Link>
                    </nav>
                )}
                {user?.rol === 'mesero' && (
                    <nav className='flex flex-row justify-around text-mini overflow-auto lg:flex-col  lg:border-none min-w-60  lg:text-lg pr-4 py-3'>
                        <Link to="/admin/mesero" className={`font-bold uppercase ${location.pathname === '/admin/mesero' ? 'bg-zinc-800' : ''}  p-3 lg:p-4 rounded-xl lg:rounded-l-xl`}>Mesero</Link>
                        <Link to="/admin/resivos" className={`font-bold uppercase ${location.pathname === '/admin/resivos' ? 'bg-zinc-800' : ''}  p-3 lg:p-4 rounded-xl lg:rounded-l-xl`}>Resivos</Link>
                    </nav>
                )}
                {user?.rol === 'cocinero' && (
                    <nav className='flex flex-row justify-around text-mini overflow-auto lg:flex-col  lg:border-none min-w-60  lg:text-lg pr-4 py-3'>
                        <Link to="/admin/cocinero" className={`font-bold uppercase ${location.pathname === '/admin/cocinero' ? 'bg-zinc-800' : ''}  p-3 lg:p-4 rounded-xl lg:rounded-l-xl`}>Chef</Link>
                    </nav>
                )}
                {user?.rol === 'repartidor' && (
                    <nav className='flex flex-row justify-around text-mini overflow-auto lg:flex-col  lg:border-none min-w-60  lg:text-lg pr-4 py-3'>
                        <Link to="/admin/repartidor" className={`font-bold uppercase ${location.pathname === '/admin/repartidor' ? 'bg-zinc-800' : ''}  p-3 lg:p-4 rounded-xl lg:rounded-l-xl`}>Repartidor</Link>
                    </nav>
                )}

            </div>
        </aside>
    )
}

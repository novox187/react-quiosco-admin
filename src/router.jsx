import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout'
import Login from './views/Login'
import Ordenes from './views/Ordenes'
import Productos from './views/Productos'
import Categorias from './views/Categorias'
import Registro from './views/Registro'
import Despacho from './views/Despacho'
import Errores from './views/Errores'
import { AdminProvider } from './context/AdminProvider'
import Dashboard from './views/admin/Dashboard'
import ResivosPedidos from './views/admin/ResivosPedidos'
import RegistroInforme from './components/admin/dashboard/RegistroInforme'
import Repartidor from './views/admin/Repartidor'
import PedidoMapa from './components/admin/PedidoMapa'
import Configuracion from './views/Config/Configuracion'
import ConfiguracionesLayout from './layouts/ConfiguracionesLayout'
import ContenedoresControler from './views/ContenedoresControler'
import Cajas from './views/Cajas'
import BienvenidaLayout from './layouts/BienvenidaLayout'
import PrimerEmployee from './views/Bienvenida/PrimerEmployee'
const router = createBrowserRouter([

    {
        path: '/admin',
        element: <AdminProvider><AdminLayout /></AdminProvider>,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: '/admin/cocinero',
                element: <Ordenes />
            },
            {
                path: '/admin/mesero',
                element: <Despacho />
            },
            {
                path: '/admin/repartidor',
                element: <Repartidor />
            },
            {
                path: '/admin/repartidor/pedido/:pedidoID',
                element: <PedidoMapa />
            },
            {
                path: '/admin/productos',
                element: <Productos />
            },
            {
                path: '/admin/productos/contenedores',
                element: <ContenedoresControler />
            },
            {
                path: '/admin/categorias',
                element: <Categorias />
            },
            {
                path: '/admin/resivos',
                element: <ResivosPedidos />
            },
            {
                path: '/admin/registro/:registroID',
                element: <RegistroInforme />
            },
            {
                path: '/admin/cajas',
                element: <Cajas />
            },
        ]
    },
    {
        path: '/admin/conf',
        element: <AdminProvider><ConfiguracionesLayout /></AdminProvider>,
        children: [
            {
                index: true,
                element: <Configuracion />
            },
        ]
    },
    {
        path: '/',
        element: <AdminProvider><AuthLayout /></AdminProvider>,
        children: [
            {
                index:true,
                element: <Login />
            }
        ]
    },
    {
        path: '/error',
        element: <Errores />,
    },
    {
        path: '/bienvenida',
        element: <BienvenidaLayout />,
        children: [
            {
                index: true,
                element: <PrimerEmployee />
            }
        ]
    }
])

export default router
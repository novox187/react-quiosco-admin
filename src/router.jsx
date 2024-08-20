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
import { QuioscoProvider } from './context/QuioscoProvider'
import { AdminProvider } from './context/AdminProvider'
import Dashboard from './views/admin/Dashboard'
import ResivosPedidos from './views/admin/ResivosPedidos'
import RegistroInforme from './components/admin/dashboard/RegistroInforme'
import Repartidor from './views/admin/Repartidor'
import PedidoMapa from './components/admin/PedidoMapa'
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

        ]
    },
    {
        path: '/',
        element: <QuioscoProvider><AuthLayout /></QuioscoProvider>,
        children: [
            {
                index:true,
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            }
        ]
    },
    {
        path: '/error',
        element: <Errores />,
    }
])

export default router
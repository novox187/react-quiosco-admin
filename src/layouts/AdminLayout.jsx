import { Outlet } from 'react-router-dom'
import useAdmin from '../hooks/useAdmin';
import { useAuth } from '../hooks/useAuth';
import Modal from 'react-modal'
import AdminSidebar from "../components/AdminSidebar";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import ModalCreateCategoria from '../components/ModalCreateCategoria';
import ModalEliminarOrden from '../components/ModalEliminarOrden';
import ModalEditarProducto from '../components/ModalEditarProducto';
import ModalCrearPromo from '../components/ModalCrearPromo';
import ModalCrearProducto from '../components/ModalCrearProducto';
import ModalEliminarProducto from '../components/ModalEliminarProducto';
import ModalMoverProducto from '../components/ModalMoverProducto';
import ModalEditarCategoria from '../components/ModalEditarCategoria';
import ModalEliminarCategoria from '../components/ModalEliminarCategoria';
import ModalProductoMesero from '../components/admin/ModalProductoMesero';
import ModalPedidoMesero from '../components/admin/ModalPedidoMesero';
import ModalLugarMesero from '../components/admin/ModalLugarMesero';
import ModalConfirmarPedido from '../components/admin/ModalConfirmarPedido';
import ModalAbrirCaja from '../components/admin/dashboard/ModalAbrirCaja';
import ModalCerrarCaja from '../components/admin/dashboard/ModalCerrarCaja';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderRadius: '7px',
        marginRight: '-50%',
        padding: '0',
        transform: 'translate(-50%, -50%)',
    },
};


Modal.setAppElement('#root')
export default function AdminLayout() {
    /* useAuth({ middleware: 'administracion' }) */
    const {
        modalCrearCategoria,
        modalEliminarOrden,
        modalEditarProducto,
        modalCrearPromo,
        modalCrearProducto,
        modalEliminarProducto,
        modalMoverProducto,
        modalEditarCategoria,
        modalEliminarCategoria,
        modalAbrirCaja,
        modalProductoMesero,
        modalLugarMesero,
        modalPedidoMesero,
        modalConfirmarPedido,
        modalCerrarCaja
    } = useAdmin();



    return (
        <>
            <div className='lg:flex bg-zinc-800 overflow-y-hidden scroll-smooth h-dvh text-white min-w-[17rem] font-raleway'>
                <style>
                    {`
                @media print {
                    .inpresion {
                        display: none;
                    }
                    .inpresionScroll {
                        overflow-y: hidden;
                    }
                }
                `}
                </style>
                <AdminSidebar />

                <main className='flex-1 h-dvh pb-20 overflow-y-auto inpresionScroll overflow-x-hidden p-3 scroll-smooth hover:scroll-auto bg-zinc-800'>
                    <Outlet />
                </main>

            </div>
            <ToastContainer />
            <Modal isOpen={modalConfirmarPedido} style={customStyles}>
                <ModalConfirmarPedido />
            </Modal>
            <Modal isOpen={modalAbrirCaja} style={customStyles}>
                <ModalAbrirCaja />
            </Modal>
            <Modal isOpen={modalCerrarCaja} style={customStyles}>
                <ModalCerrarCaja />
            </Modal>
            <Modal isOpen={modalCrearProducto} style={customStyles}>
                <ModalCrearProducto />
            </Modal>
            <Modal isOpen={modalPedidoMesero} style={customStyles}>
                <ModalPedidoMesero />
            </Modal>
            <Modal isOpen={modalLugarMesero} style={customStyles}>
                <ModalLugarMesero />
            </Modal>
            <Modal isOpen={modalProductoMesero} style={customStyles}>
                <ModalProductoMesero />
            </Modal>
            <Modal isOpen={modalCrearCategoria} style={customStyles}>
                <ModalCreateCategoria />
            </Modal>
            <Modal isOpen={modalEliminarOrden} style={customStyles}>
                <ModalEliminarOrden />
            </Modal>
            <Modal isOpen={modalEditarProducto} style={customStyles}>
                <ModalEditarProducto />
            </Modal>
            <Modal isOpen={modalCrearPromo} style={customStyles}>
                <ModalCrearPromo />
            </Modal>
            <Modal isOpen={modalEliminarProducto} style={customStyles}>
                <ModalEliminarProducto />
            </Modal>
            <Modal isOpen={modalMoverProducto} style={customStyles}>
                <ModalMoverProducto />
            </Modal>
            <Modal isOpen={modalEditarCategoria} style={customStyles}>
                <ModalEditarCategoria />
            </Modal>
            <Modal isOpen={modalEliminarCategoria} style={customStyles}>
                <ModalEliminarCategoria />
            </Modal>
        </>
    )
}

import { useState } from "react";
import useAdmin from "../../../hooks/useAdmin";
import { Button } from "@heroui/react";
import clienteAxios from "../../../config/axios";
import { toast } from "react-toastify";

export default function ModalCerrarCaja() {
    const { idCajaCerrar, setModalCerrarCaja, setDatosCaja,socketConnection } = useAdmin();

    const [confirmacion, setConfirmacion] = useState();
    const [loginCerrarCaja, setLoginCerrarCaja] = useState(false);

    const handleClickCerrarModal = () => {
        setModalCerrarCaja(false)
        setLoginCerrarCaja(false)
    }

    const handleConfirmacionChange = (e) => {
        setConfirmacion(e.target.value)
    }

    const handleCerrarCaja = async () => {
        setLoginCerrarCaja(true)

        const datosCaja = {
            id_caja: idCajaCerrar,
        }

        const token = localStorage.getItem('AUTH_TOKEN');
        if (localStorage.getItem('USER')) {
            try {
                const { data } = await clienteAxios.post('/api/caja/cerrar', datosCaja, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                })
                setLoginCerrarCaja(false)
                setModalCerrarCaja(false)
                socketConnection.emit("onCaja", data,)
                socketConnection.emit("onRegistro", data)
                toast.warning('Cerraste la caja, los usuarios no podran hacer nuevos pedidos')
            } catch (error) {
                toast.error(error.response.data.errors.pedidos[0])
                setLoginCerrarCaja(false)
            }
        }
    }


    return (
        <div className=" flex flex-col justify-around items-center text-white text-center text-[0.8rem] md:text-base w-full md:w-96 h-52 p-8 font-raleway bg-zinc-900">
            <button onClick={handleClickCerrarModal} className=" fixed top-1 right-1 transition-all 5s text-white  rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <span className="font-bold ">Estas seguro de querer cerrar caja?</span>
            <p className=" text-zinc-300">Escribe la palabra <strong className="text-red-800">confirmar</strong> para cerrar caja.</p>
            <input
                type="text"
                name="confirmacion"
                id="confirmacion"
                placeholder="Escribe el nombre del producto"
                onChange={handleConfirmacionChange}
                className="p-1 rounded m-2 w-full text-center text-white placeholder-zinc-300 bg-zinc-800" />

            <Button
                type="button"
                className={`${confirmacion !== 'confirmar' ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90 cursor-pointer'} w-full bg-red-800 rounded p-2 `}
                onClick={() => handleCerrarCaja()}
                isDisabled={confirmacion !== 'confirmar' || loginCerrarCaja}
            >
                {loginCerrarCaja ? (
                    <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    'Eliminar'
                )}
            </Button>

        </div>
    )
}

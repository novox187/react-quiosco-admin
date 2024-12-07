import { createRef, useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "./Alerta";
import { toast } from 'react-toastify';
import { formatearTextoDB } from "../helpers";
import useAdmin from "../hooks/useAdmin";
import BotonCarga from "./BotonCarga";
export default function ModalCrearPromo() {
    const { modalCrearPromo, setModalCrearPromo, socketConnection,token } = useAdmin();

    const [errorPromo, setErrorPromo] = useState();
    const [loading, setLoading] = useState(false)
    const nombrePromoRef = createRef();
    const porcientoPromoRef = createRef();

    //Subir datos 
    const handleSubmitNuevaPromo = async e => {
        e.preventDefault();
        setLoading(true)
        const datosNuevaPromo = {
            nombre_promo: formatearTextoDB(nombrePromoRef.current.value),
            porciento_promo: formatearTextoDB(porcientoPromoRef.current.value),
        }
        try {
            const { data } = await clienteAxios.post('/api/promocion/create', datosNuevaPromo, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            setErrorPromo([]);
            toast.success('Promocion añadida Correctamente');
            setModalCrearPromo(!modalCrearPromo);
            setLoading(false)
            socketConnection.emit("onRegistro", data.registro);
        } catch (error) {
            setErrorPromo(Object.values(error.response.data.errors))
            setLoading(false)
        }

    }


    return (
        <div className=" flex flex-col justify-start items-end w-96 bg-zinc-900 p-5 text-white font-raleway">
            <button
                type="button"
                onClick={() => setModalCrearPromo(!modalCrearPromo)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>

            <form
                className='flex flex-col w-full rounded  justify-center items-center m-auto'
                onSubmit={handleSubmitNuevaPromo}
                noValidate
            >
                {errorPromo ? errorPromo.map(error => <Alerta key={error}>{error}</Alerta>) : null}

                <h1 className='text-2xl font-bold mb-4'>Nueva Promocion</h1>

                <div className='flex flex-col w-full mt-2'>
                    <label htmlFor="nombre" className=" mb-1">Nombre Promocion: </label>
                    <input
                        type="text"
                        name='nombrePromo'
                        id='nombrePromo'
                        placeholder='Elija un nombre para la promocion'
                        className='p-3 rounded shadow text-white bg-zinc-800 placeholder-zinc-300'
                        ref={nombrePromoRef}
                    />
                </div>
                <div className='flex flex-col w-full mt-2'>
                    <label htmlFor="nombre" className=" mb-1">Porciendo Promocion: </label>
                    <input
                        type="number"
                        name="porciontoPromo"
                        id="porciontoPromo"
                        placeholder='Elije el prociento a descontar al producto'
                        className='p-3 rounded shadow bg-zinc-800 placeholder-zinc-300 text-white'
                        ref={porcientoPromoRef}
                    />
                </div>
                <BotonCarga loading={loading} texto={'Crear'} />
            </form>
        </div>
    )
}

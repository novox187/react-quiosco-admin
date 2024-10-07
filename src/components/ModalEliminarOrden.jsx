import { createRef, useState } from "react"
import Alerta from "./Alerta";
import useAdmin from "../hooks/useAdmin";
import BotonCarga from "./BotonCarga";



export default function ModalEliminarOrden() {

    const { modalEliminarOrden, setModalEliminarOrden, errorCalificacion, setErrorCalificacion, handleSubmitCalificacion, ordenEliminar, loadingEliminarOrden } = useAdmin();
    const comentarioRef = createRef(null);

    const [rating, setRating] = useState(ordenEliminar.calificacion);


    const preEnvio = (e) => {
        e.preventDefault();
        const datosCalificacion = {
            id_user: ordenEliminar.idU,
            id_pedido: ordenEliminar.idP,
            observacion: comentarioRef.current.value,
            puntos: rating,
        }
        handleSubmitCalificacion(datosCalificacion);




    }
    const handleClickModalClalificacion = () => {
        setErrorCalificacion()
        setModalEliminarOrden(!modalEliminarOrden)
    }
    const handleMouseLeave = () => {

    }
    const handleClickRating = (value) => {
        setRating(value)
    }
    return (
        <div className=" flex flex-col items-center justify-center md:w-96 xl:w-ancho h-96 relative px-5 text-white font-raleway bg-zinc-900 ">
            <div className="fixed top-2 right-2">
                <button onClick={handleClickModalClalificacion} className=" transition-all 5s rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            <h1 className="text-2xl font-bold">Que sucedio?</h1>
            <p className=" text-xl text-center">Justifique el por que cancelacion del pedido</p>
            <span className=" absolute top-2 left-2 text-gray-300">ID: {ordenEliminar.idP} </span>


            <form
                className="w-full my-8"
                onSubmit={preEnvio}
            >

                {errorCalificacion ? errorCalificacion.map(error => <Alerta key={error}>{error}</Alerta>) : null}
                <div className="flex flex-col w-full">
                    <label className=" font-bold" htmlFor="comentario">Observacion:</label>
                    <textarea
                        name="comentario"
                        id="comentario"
                        cols="30"
                        rows="10"
                        placeholder="Ingrese aqui la razon por la que elimina el pedido"
                        className="h-40 w-full px-3 py-2 bg-zinc-800 text-white border rounded-lg focus:outline-none focus:ring-2 border-none focus:ring-zinc-800"
                        ref={comentarioRef}></textarea>
                </div>


                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className=" text-1xl font-bold mt-4">Califica al Usuario</h1>
                    <h2 className=" text-red-800 font-bold">{ordenEliminar.name}</h2>
                    <p className="">Califica al usuario para tenerlo en cuenta en las siguientes compras </p>
                    <div className=" flex items-center mt-8">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span
                                key={value}
                                className={`text-3xl mx-4 cursor-pointer ${value <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClickRating(value)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>

                            </span>
                        ))}
                    </div>

                </div>
                <BotonCarga loading={loadingEliminarOrden} texto={'Eliminar orden'} />
            </form>
        </div>
    )
}

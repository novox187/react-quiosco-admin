import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import { formatearTextoVista } from "../helpers";
import { Button } from "@heroui/react";

export default function ModalMoverProducto() {
    const { setModalMoverProducto, modalMoverProducto, productoMover, categorias, moverProducto, loadingMoverProducto, setLoadingMoverProducto } = useAdmin();
    const { id, nombre, categoriaId } = productoMover
    const [categoriaMover, setCategoriaMover] = useState({ id: categoriaId });

    const handleClickDatosCategoria = (id, nombre) => {
        const datosCategoria = {
            id: id,
            nombre: nombre
        }
        setCategoriaMover(datosCategoria)
    }

    const handleClickMoverCategoria = async () => {
        setLoadingMoverProducto(true)
        const datos = {
            id_categoria: categoriaMover.id,
            nombre_categoria: categoriaMover.nombre,
            categoria_anterior: categoriaId
        }
        moverProducto(datos, id);
    }
    const handleClickCerrarMoverCategoria = async () => {
        setLoadingMoverProducto(false)
        setModalMoverProducto(!modalMoverProducto)
    }
    return (
        <div className=" flex flex-col justify-between items-center  w-full md:w-[30rem] h-80 text-white p-2 md:p-5 text-center overflow-y-auto font-raleway bg-zinc-900">
            <button onClick={handleClickCerrarMoverCategoria} className=" flex justify-end transition-all 5s text-white  rounded-full w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <div className=" text-mini">
                Elije a que categoria quieres mover el producto <br />
                <span className=" text-red-800 text-base font-bold md:text-2xl">{formatearTextoVista(nombre)}</span>
            </div>
            <div className="grid gap-1 grid-cols-3 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 mb-3 w-full">
                {categorias?.map(categoria => (
                    <button
                        type="button"
                        key={categoria.id}
                        onClick={() => handleClickDatosCategoria(categoria.id, categoria.nombre)}
                        className={`${categoriaMover.id === categoria.id ? 'bg-zinc-700 text-white' : "bg-white"}  w-20 h-auto tracking-tighter leading-none flex flex-col justify-center items-center  text-famaBlack p-2 rounded`}>
                        <img src={categoria.icono} alt={nombre} className=" w-8 md:w-10" />
                        <span className=" font-bold text-mini">{formatearTextoVista(categoria.nombre)}</span>
                    </button>
                ))}
            </div>
            <Button
                type="button"
                className={`${!categoriaMover?.id ? 'cursor-not-allowed' : 'cursor-pointer'} bg-red-800 w-full hover:opacity-90 font-bold p-2 py-4 md:py-5 text-xl `}
                onClick={() => {
                    if (categoriaMover?.id) {
                        handleClickMoverCategoria()
                    }
                }}
                isDisabled={loadingMoverProducto || !categoriaMover}
            >
                {loadingMoverProducto ? (
                    <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    'Mover'
                )}
            </Button>

        </div>
    )
}

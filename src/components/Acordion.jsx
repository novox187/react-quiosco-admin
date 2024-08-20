import { useState } from "react";
import { formatearTextoVista } from "../helpers";
import useAdmin from "../hooks/useAdmin";
import { toast } from "react-toastify";


export default function Acordion({ categoria }) {
    const {
        modalMoverProducto,
        setModalMoverProducto,
        setProductoMover,
        setModalEditarCategoria,
        modalEditarCategoria,
        setCategoriaModificar,
        setModalEliminarCategoria,
        modalEliminarCategoria
    } = useAdmin();

    const { id, nombre, icono, productos } = categoria;
    const [activo, setActivo] = useState()

    const handleClickModalMover = (id, nombre, categoriaId) => {
        const productoAMover = {
            id: id,
            nombre: nombre,
            categoriaId: categoriaId
        }
        setProductoMover(productoAMover);
        setModalMoverProducto(!modalMoverProducto);
    }

    const handleClickModalEditar = () => {
        setModalEditarCategoria(!modalEditarCategoria)
        setCategoriaModificar(categoria)
    }
    const handleClickModalEliminarCategoria = () => {
        if (productos.length === 0) {
            setModalEliminarCategoria(!modalEliminarCategoria)
            setCategoriaModificar(categoria)
        } else {
            toast.error('La categoria ' + nombre + ' debe estar vacia para poder eliminarla')
        }

    }

    const handleClickAbrir = (id) => {
        if (activo === id) {
            setActivo();
        } else {
            setActivo(id);
        }
    }

    return (
        <div
            className="group flex flex-col gap-2 rounded-lg bg-zinc-900 p-5 text-white"
            tabIndex={id}
            onClick={() => handleClickAbrir(id)}
        >
            <div className="flex cursor-pointer items-center justify-between">
                <span className=" flex flex-col justify-center items-start"><img src={icono} alt={nombre} className="w-5" /> {formatearTextoVista(nombre)}</span>
                <div className=" flex space-x-6">
                    <div className=" space-x-2 invisible group-hover:visible group-focus:visible ">
                        <button
                            type="button"
                            className=" hover:bg-yellow-400 transition-colors p-1 rounded"
                            onClick={() => handleClickModalEditar()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 md:w-5 h-4 md:h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className=" hover:bg-fama transition-colors p-1 rounded"
                            onClick={() => handleClickModalEliminarCategoria()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 md:w-5 h-4 md:h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${activo === id && '-rotate-180'} w-3 md:w-5 h-3 md:h-5 transition-all duration-500 `}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div
                className={`${activo === id ? 'visible max-h-dvh opacity-100 duration-1000' : 'invisible opacity-0 h-auto max-h-0'}   items-center  transition-all pl-5`}
            >

                {productos.length === 0 && (
                    <p>no hay productos registrados en esta categoria</p>
                )}

                {productos?.map(producto => (
                    < div key={producto?.id} className="flex justify-between items-center w-full hover:bg-zinc-600 p-1 rounded transition-colors">
                        <span>{formatearTextoVista(producto?.nombre)}</span>
                        <span className="space-x-3 ">
                            <button
                                type="button"
                                className=" hover:bg-famaBlue rounded p-1 m-2 transition-colors cursor-pointer"
                                onClick={() => handleClickModalMover(producto?.id, producto?.nombre, producto?.categoria_id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 md:w-5 h-4 md:h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                </svg>
                            </button>
                        </span>
                    </div>
                ))}
            </div>
        </div >
    )
}

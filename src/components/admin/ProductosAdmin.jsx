import useAdmin from '../../hooks/useAdmin';
import { formatearDinero } from '../../helpers';
import { formatearTextoVista } from '../../helpers';
import { useState } from 'react';
import { Image, Card, Chip, Button } from '@heroui/react';

export default function ProductosAdmin({ producto }) {

    const { handleClickProductoAgotado, setProductoEditar, setModalEditarProducto, modalEditarProducto, setLoadingDisponible, loadingDisponible, setProductoEliminar, setModalEliminarProducto, modalEliminarProducto } = useAdmin();
    const { nombre, imagen, precio, disponible, created_at, descripcion, promocion } = producto

    const fechaActual = new Date();
    const fechaProducto = new Date(created_at);

    const diferenciaMilisegundos = fechaActual - fechaProducto;
    const diasTranscurridos = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

    const descripcionCortada2Xl = descripcion.slice(0, 75);
    const descripcionCortadaXl = descripcion.slice(0, 50);
    const descripcionCortadaMd = descripcion.slice(0, 45);
    const descripcionCortada = descripcion.slice(0, 30);

    const [productoOpcionesActivo, setProductoOpcionesActivo] = useState(false);

    const handleClickDatosProducto = (id, nombre, precio, peso, tipo_peso, descripcion, categoria, imagen, promo_id) => {

        const datosProducto = {
            id: id,
            imagen: imagen,
            nombre: nombre,
            precio: precio,
            peso: peso,
            tipo_peso: tipo_peso,
            descripcion: descripcion,
            categoria_id: categoria,
            promo_id: promo_id,
        }
        setProductoEditar(datosProducto);
        setModalEditarProducto(!modalEditarProducto)

    }
    const handleClickModalEliminar = (id, nombre) => {

        const productoAEliminar = {
            id: id,
            nombre: nombre
        }
        setProductoEliminar(productoAEliminar)
        setModalEliminarProducto(!modalEliminarProducto)
    }


    return (
        <Card
          
            className="h-[20rem] w-[15rem] sm:h-[17rem] sm:w-[11rem] md:h-[25rem] md:w-[17rem] 3xl:h-[25rem] 3xl:w-[20rem] flex flex-col justify-between items-center md:m-0  p-2 md:p-4 rounded-xl shadow-zinc-800  bg-zinc-900 relative box-content bg-origin-content font-raleway overflow-hidden z-0">
            <div className=" absolute  md:space-x-1 pr-3 z-10">
                {diasTranscurridos <= 30 ? (
                    <Chip
                        classNames={{
                            content: "text-green",
                            base: "bg-white",
                        }}
                        color="success"
                        variant="bordered"
                        size="sm"
                    >
                        Nuevo
                    </Chip>
                ) : ('')
                }
                {promocion ? (
                    <Chip
                        classNames={{
                            content: "text-green",
                            base: "bg-white",
                        }}
                        color="warning"
                        variant="bordered"
                        size="sm"
                    >
                        -{promocion.descuento}%
                    </Chip>
                ) : ('')}
            </div>
            <div className="w-full h-[50%] relative overflow-hidden">
                <Image
                    alt={`imagen ${nombre}`}
                    className='z-0'
                    src={`${imagen}`}
                />
            </div>

            <div className=" px-1 pt-2 w-full h-[30%] overflow-hidden">
                <h3 className=" text-mini md:text-lg  xl:text-xl 2xl:text-xl mb-1 font-bold uppercase text-white">{formatearTextoVista(nombre)}</h3>
                <p className=" hidden 2xl:flex text-white">
                    {descripcionCortada2Xl}...
                </p>
                <p className=" hidden xl:flex 2xl:hidden text text-white">
                    {descripcionCortadaXl}...
                </p>
                <p className=" xl:hidden md:flex hidden text-sm tracking-tighter leading-none text-white">
                    {descripcionCortadaMd}...
                </p>
                <p className=" tracking-tighter leading-none text-mini md:hidden text-white">
                    {descripcionCortada}...
                </p>
            </div>

            <div className=" flex flex-col justify-center w-full h-[10%] px-1 pb-2">
                <p className=" mt-1 xl:mt-2 2xl:mt-5 font-black text-sm md:text-xl 2xl:text-3xl text-red-800">
                    {formatearDinero(precio)}
                </p>
            </div>

            <div className=" flex w-full h-[10%]">
                <div className="flex w-full h-full space-x-2 text-white">


                    <Button
                        type="button"
                        className={`${disponible === 1 ? 'bg-zinc-800 rounded' : 'bg-zinc-800 rounded'} text-white w-full h-full lg:p-4 uppercase font-bold transition-all`}
                        onClick={() => [handleClickProductoAgotado(producto.id, producto.disponible), setLoadingDisponible(producto.id)]}
                        isDisabled={loadingDisponible === producto.id}
                    >
                        {!loadingDisponible ? disponible === 1 ? "Disponible" : "Agotado" : ''}
                        {loadingDisponible === producto.id && (
                            <svg className="mr-3 h-7 w-7 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                    </Button>
                    <Button
                        type="button"
                        isIconOnly
                        className="flex flex-col justify-center items-center bg-zinc-800 hover:opacity-75 px-1.5 py-2 rounded uppercase font-bold text-white text-center w-10 p-1 md:p-2 cursor-pointer h-full"
                        onClick={() => setProductoOpcionesActivo(!productoOpcionesActivo)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 transition-all duration-300 ${productoOpcionesActivo ? '-rotate-180' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </Button>

                    <div className={`${productoOpcionesActivo ? ' w-20' : ' w-0 opacity-0'} flex space-x-1 transition-all duration-500`}>
                        <button
                            type="button"
                            className="flex flex-col justify-center items-center bg-zinc-800 hover:opacity-75 px-1.5 py-2 rounded uppercase font-bold text-white text-center w-10 p-1 md:p-2 cursor-pointer h-full "
                            onClick={() => handleClickDatosProducto(producto.id, producto.nombre, producto.precio, producto.peso, producto.tipo_peso, producto.descripcion, producto.categoria_id, producto.imagen, producto.promo_id)}
                            disabled={!productoOpcionesActivo}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            className="flex flex-col justify-center items-center hover:bg-red-800 hover:opacity-75 px-1.5 py-2 rounded uppercase font-bold text-white text-center w-10 p-1 md:p-2 cursor-pointer h-full"
                            onClick={() => handleClickModalEliminar(producto?.id, producto?.nombre)}
                            disabled={!productoOpcionesActivo}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 md:w-5 h-4 md:h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>


                </div>
            </div>

        </Card>
    )
}

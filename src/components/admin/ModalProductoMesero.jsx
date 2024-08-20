import { useState, useEffect } from 'react'
import { Card, Image, Chip } from '@nextui-org/react';
import OpcionesProducto from '../OpcionesProducto';
import { formatearDinero, formatearTextoVista } from '../../helpers';
import useAdmin from '../../hooks/useAdmin';

export default function ModalProductoMesero() {

    const { producto, handleAgregarPedidoMesero, handleclickModalProductoMesero } = useAdmin();
    const [detallesProducto, setDetallesProducto] = useState([])
    const [totalOpciones, setTotalOpciones] = useState(0)
    const promocion = producto.promocion;

    function generateUniqueRandomNumber() {
        let randomNumber = Math.floor(Math.random() * 1000); // Genera un número aleatorio entre 0 y 99

        while (numbersArray.includes(randomNumber)) {
            randomNumber = Math.floor(Math.random() * 1000);
        }

        numbersArray.push(randomNumber);
        localStorage.setItem('numbersMesero', JSON.stringify(numbersArray));
        return randomNumber;
    }

    let numbersArray = JSON.parse(localStorage.getItem('numbersMesero')) || [];

    const handleClickAgregarProductoIndex = (producto, detallesProducto, totalOpciones) => {
        const indexProducto = generateUniqueRandomNumber();

        handleAgregarPedidoMesero({ ...producto, detallesProducto, totalOpciones, indexProducto })
        handleclickModalProductoMesero()
    }

    const precioDescuento = () => {
        return (formatearDinero((producto.precio + totalOpciones) - ((producto.precio + totalOpciones) * promocion?.descuento) / 100))
    }

    useEffect(() => {
        const NuevototalOpciones = detallesProducto.reduce((total, opcion) =>
            (opcion.precio * opcion.cantidad) + total, 0)

        setTotalOpciones(NuevototalOpciones)
    }, [detallesProducto]);

    const fechaActual = new Date();
    const fechaProducto = new Date(producto.created_at);

    const diferenciaMilisegundos = fechaActual - fechaProducto;
    const diasTranscurridos = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
    return (
        <div className="flex flex-col justify-center items-center  h-dvh w-screen min-w-[240px] md:h-auto  md:w-auto xl:w-ancho  bg-zinc-900 text-white font-raleway">
            <Card className='flex md:flex-row flex-col  w-full max-h-[90%] md:h-auto overflow-y-auto gap-10 p-5 pt-10 md:pt-5 items-center md:justify-center relative bg-zinc-900 text-white'>
                <button onClick={handleclickModalProductoMesero} className=' flex w-full h-0 justify-end md:absolute md:top-1 md:right-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>


                <div className=" flex justify-center md:w-1/3 relative">

                    <Card className=" bg-transparent absolute left-0 z-10 p-2">
                        {diasTranscurridos <= 30 ? (
                            <Chip
                                classNames={{
                                    content: "text-green",
                                    base: "bg-white",
                                }}
                                color="success"
                                variant="bordered"
                                size="lg"
                            >
                                Nuevo
                            </Chip>
                        ) : ('')}
                        {promocion ? (
                            <>
                                <Chip
                                    classNames={{
                                        content: "text-green",
                                        base: "bg-white",
                                    }}
                                    color="warning"
                                    variant="bordered"
                                    size="lg"
                                >
                                    {formatearTextoVista(promocion.nombre)}
                                </Chip>
                                <Chip
                                    classNames={{
                                        content: "text-green",
                                        base: "bg-white",
                                    }}
                                    color="warning"
                                    variant="bordered"
                                    size="lg"
                                >
                                    -{promocion.descuento}%
                                </Chip>
                            </>
                        ) : (
                            null
                        )}
                    </Card>

                    <Image
                        className='z-0'
                        alt={`Imagen producto ${producto.nombre}`}
                        src={`${producto.imagen}`}
                    />
                </div>

                <div className="w-full md:w-2/3 ">

                    <h1 className="text-3xl font-bold mt-4 mb-2 uppercase">
                        {formatearTextoVista(producto.nombre)}
                    </h1>

                    <p className=' text-[1.1rem] text-zinc-300'>{producto.descripcion}<br />{producto.peso}g.</p>

                    <div className='m-2 space-y-2'>
                        {producto.contenedor_opciones.map((contenedor, index) => (
                            <OpcionesProducto
                                key={contenedor.id}
                                contenedor={contenedor}
                                index={index}
                                setDetallesProducto={setDetallesProducto}
                                detallesProducto={detallesProducto}
                                opcionesProducto={producto.detallesProducto}
                            />
                        ))}
                    </div>

                    {promocion ? (
                        <div className='flex flex-row items-center mt-2'>
                            <p className=" font-black text-2xl text-fama line-through opacity-40">
                                {formatearDinero(producto.precio + totalOpciones)}
                            </p>
                            <span className=' opacity-0'>_-</span>
                            <p className=" font-black text-3xl text-fama ">
                                /  {precioDescuento()}
                            </p>
                        </div>
                    ) : (
                        <p className="mt-3 font-black text-5xl text-fama">
                            {formatearDinero(producto.precio + totalOpciones)}
                        </p>
                    )}
                    {producto.detallesProducto ? (
                        <button
                            type="button"
                            className="bg-zinc-600 hover:bg-white text-white hover:text-famaBlack  px-5 py-2 mt-2 font-bold uppercase rounded"
                            onClick={() => { handleAgregarPedidoMesero({ ...producto, detallesProducto, totalOpciones }), handleclickModalProductoMesero() }}
                        >
                            Guardar cambios
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="bg-zinc-600 hover:bg-white text-white hover:text-famaBlack  px-5 py-2 mt-2 font-bold uppercase rounded"
                            onClick={() => handleClickAgregarProductoIndex(producto, detallesProducto, totalOpciones)}
                        >
                            Añadir al Pedido
                        </button>
                    )}
                </div>
            </Card>
        </div>
    )
}

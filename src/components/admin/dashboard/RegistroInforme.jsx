import React, { useEffect, useState } from 'react'
import useAdmin from '../../../hooks/useAdmin'
import { Button, Chip } from '@nextui-org/react';
import { formatearDinero, formatearFecha, formatearTextoVista } from '../../../helpers';
import clienteAxios from '../../../config/axios';
import { Link, useParams } from 'react-router-dom';

export default function RegistroInforme() {

    const [datosCambios, setDatosCambios] = useState(false);

    const token = localStorage.getItem("AUTH_TOKEN");

    const { registroID } = useParams();

    const registroQuery = async () => {
        try {
            const { data } = await clienteAxios(`/api/registros/${registroID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            setDatosCambios(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        registroQuery();
    }, []);

    let resumen =
        datosCambios?.datos?.accion === 'editar' && datosCambios?.datos?.producto !== null ? `El empleado ${datosCambios?.datos?.user?.name} el dia ${formatearFecha(datosCambios?.datos?.created_at)} edito el producto con el id ${datosCambios?.datos?.producto?.id}` :
            datosCambios?.datos?.accion === 'crear' && datosCambios?.datos?.producto !== null ? `El empleado ${datosCambios?.datos?.user?.name} el dia ${formatearFecha(datosCambios?.datos?.created_at)} creo el producto con el id ${datosCambios?.datos?.producto?.id}` :
                datosCambios?.datos?.accion === 'eliminar' ? `El empleado ${datosCambios?.datos?.user?.name} el dia ${formatearFecha(datosCambios?.datos?.created_at)} elimino el producto con el id ${datosCambios?.datos?.producto?.id}` :
                    datosCambios?.datos?.accion === 'cambiar_estado' && datosCambios.producto !== null ? `El empleado ${datosCambios?.datos?.user?.name} el dia ${formatearFecha(datosCambios?.datos?.created_at)} Cambio el estado del producto con el id ${datosCambios?.datos?.producto?.id}` :
                        datosCambios?.datos?.accion === 'cobro' ? `El empleado ${datosCambios?.datos?.user?.name} el dia ${formatearFecha(datosCambios?.datos?.created_at)} cobro el pedido ${datosCambios?.datos?.pedido?.numero_pedido}` :
                            datosCambios?.datos?.accion === 'entrega' ? `El empleado ${datosCambios?.datos?.user?.name} el dia ${formatearFecha(datosCambios?.datos?.created_at)} entrego el pedido ${datosCambios?.datos?.pedido?.numero_pedido}` :
                                datosCambios?.datos?.accion === 'preparacion' ? `El empleado ${datosCambios?.datos?.user?.name} el dia ${formatearFecha(datosCambios?.datos?.created_at)} preparo los alimentos del pedido ${datosCambios?.datos?.pedido?.numero_pedido}` :
                                    datosCambios?.datos?.accion === 'crear' && datosCambios?.datos?.categoria !== null ? `El empleado ${datosCambios?.datos?.user?.name} el dia ${formatearFecha(datosCambios?.datos?.created_at)} creo la categoria con el id ${datosCambios?.datos?.categoria?.id}` :
                                        datosCambios?.datos?.accion === 'eliminar' && datosCambios?.datos?.categoria !== null ? `El empleado ${datosCambios?.datos?.user?.name} el dia ${formatearFecha(datosCambios?.datos?.created_at)} elimino la categoria con el id ${datosCambios?.datos?.categoria?.id}` :
                                            datosCambios?.datos?.accion === 'editar' && datosCambios?.datos?.categoria !== null ? `El empleado ${datosCambios?.datos?.user?.name} el dia ${formatearFecha(datosCambios?.datos?.created_at)} edito la categoria con el id ${datosCambios?.datos?.categoria?.id}` :
                                                datosCambios?.datos?.accion === 'crear' && datosCambios?.datos?.promocion !== null ? `El empleado ${datosCambios?.datos?.user?.name} el dia ${formatearFecha(datosCambios?.datos?.created_at)} creo la promocion con el id ${datosCambios?.datos?.promocion?.id}` :
                                                    datosCambios?.datos?.accion === 'eliminar' && datosCambios?.datos?.promocion !== null ? `El empleado ${datosCambios?.datos?.user?.name} el dia ${formatearFecha(datosCambios?.datos?.created_at)} Elimino la promocion con el id ${datosCambios?.datos?.promocion?.id}` :
                                                        'en desarrollo'
        ;
    let afectado = datosCambios?.datos?.accion === 'cobro' ? 'ID pedido' : 'ID producto';
    return (

        <div className="flex flex-col overflow-y-auto relative  h-dvh bg-white text-black rounded-xl px-5 z-20  overflow-hidden">
            <span className='flex justify-between pt-3'>
                <Link
                    to={'/admin'}
                    className=' text-black inpresion'

                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:bg-zinc-400 transition-all rounded-full w-8 h-8 p-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>

                </Link>
                <Button className=' inpresion' endContent={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                    </svg>
                }
                    onClick={() => window.print()}
                >
                    Imprimir
                </Button>
            </span>
            <div>
                <header className=' flex flex-col items-center'>
                    <div className="w-full flex items-center py-4 relative">
                        <img
                            className="w-[3rem]"
                            src='https://res.cloudinary.com/dfrsffngq/image/upload/v1719580467/establecimiento/lgnifsbkmqjw8rjzjvw8.png'
                            alt="Imagen Logo"
                        />
                        <p className="text-center h-full mx-2 text-2xl  tracking-tighter leading-none font-allura">secos y bolones</p>
                    </div>
                    <div className=' w-full border border-black rounded p-2'>
                        <div className='flex space-x-3'>
                            <h2 className=' font-bold'>Responsable: </h2>
                            <span>{datosCambios?.datos?.user?.name}</span>
                        </div>
                        <div className='flex space-x-3'>
                            <h2 className=' font-bold'>Cargo: </h2>
                            <span>{datosCambios?.datos?.user?.rol[0]}</span>
                        </div>
                        <div className='flex space-x-3'>
                            <h2 className=' font-bold'>Accion: </h2>
                            <span>{datosCambios?.datos?.accion}</span>
                        </div>
                        <div className='flex space-x-3'>
                            <h2 className=' font-bold'>{afectado}: </h2>
                            <span>{datosCambios?.datos?.accion === 'cobro' ? datosCambios?.datos?.pedido?.id : datosCambios?.datos?.producto?.id}</span>
                        </div>
                        <div className='flex space-x-3'>
                            <h2 className=' font-bold'>Fecha: </h2>
                            <span>{formatearFecha(datosCambios?.datos?.created_at)}</span>
                        </div>
                    </div>
                </header>
                <main className=' flex flex-col items-center'>
                    <p className='mt-3'>{resumen}</p>

                    <h2 className=' font-bold uppercase mt-3'>Detalles</h2>

                    <ul className=' w-[90%] list-decimal mt-2'>
                        {datosCambios?.cambios
                            ?
                            datosCambios?.cambios?.map(cambio => (
                                <li>{cambio}</li>
                            ))
                            :
                            datosCambios?.datos?.accion == 'crear' && datosCambios?.datos?.producto !== null ?
                                <li>Creo el producto con el id {datosCambios?.datos?.producto?.id}</li>
                                : datosCambios?.datos?.accion == 'eliminar' && datosCambios?.datos?.producto !== null ?
                                    <li>Elimino el producto con el id {datosCambios?.datos?.producto?.id}</li>
                                    : datosCambios?.datos?.accion === 'cambiar_estado' && datosCambios.producto !== null ?
                                        <li>cambio el estado del producto como {datosCambios?.estado?.disponible == 1 ? 'disponible' : 'no disponible'}</li>
                                        : datosCambios?.datos?.accion === 'cobro' ?
                                            <>
                                                <li>{datosCambios?.datos?.pedido?.mesa !== null ? `El cobro se realizo en la mesa ${datosCambios?.datos?.pedido?.mesa}` : 'El pedido fue para llevar'}</li>
                                                <li>El cliente pago {formatearDinero(datosCambios?.datos?.pedido?.efectivo)}</li>
                                                <li>El total del pedido fue de {formatearDinero(datosCambios?.datos?.pedido?.total)}</li>
                                                {datosCambios?.datos?.pedido?.total < datosCambios?.datos?.pedido?.efectivo && (
                                                    <li>Se le debio entregar de vuelto {formatearDinero(datosCambios?.datos?.pedido?.efectivo - datosCambios?.datos?.pedido?.total)}</li>
                                                )}
                                            </>
                                            : datosCambios?.datos?.accion === 'entrega' ?
                                                <li>{datosCambios?.datos?.pedido?.mesa !== null ? `El pedido se entrego en la mesa ${datosCambios?.datos?.pedido?.mesa}` : 'El pedido fue para llevar'}</li>
                                                : datosCambios?.datos?.accion === 'crear' && datosCambios?.datos?.categoria !== null ?
                                                    <li>Creo la categoria con el id {datosCambios?.datos?.categoria?.id}</li>
                                                    : datosCambios?.datos?.accion === 'eliminar' && datosCambios?.datos?.categoria !== null ?
                                                        <li>Elimino la categoria con el id {datosCambios?.datos?.categoria?.id}</li> :
                                                        ''
                        }

                    </ul>
                </main>
            </div>
        </div>
    )
}

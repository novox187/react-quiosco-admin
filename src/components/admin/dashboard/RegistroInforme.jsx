import React, { useEffect, useState } from 'react';
import useAdmin from '../../../hooks/useAdmin';
import { Button } from '@nextui-org/react';
import { formatearDinero, formatearFecha } from '../../../helpers';
import clienteAxios from '../../../config/axios';
import { Link, useParams } from 'react-router-dom';

export default function RegistroInforme() {
    const [datosCambios, setDatosCambios] = useState(null);
    const {token} = useAdmin();
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

    const generarResumen = () => {
        const { accion, employee, created_at, producto, pedido, categoria, promocion } = datosCambios?.datos || {};
        const nombreEmpleado = employee?.name;
        const fecha = formatearFecha(created_at);
        const idProducto = producto?.id;
        const idPedido = pedido?.id;
        const idCategoria = categoria?.id;
        const idPromocion = promocion?.id;

        const acciones = {
            editar: `El empleado ${nombreEmpleado} el día ${fecha} editó el producto con el id ${idProducto}`,
            crear: `El empleado ${nombreEmpleado} el día ${fecha} creó el producto con el id ${idProducto}`,
            eliminar: `El empleado ${nombreEmpleado} el día ${fecha} eliminó el producto con el id ${idProducto}`,
            cambiar_estado: `El empleado ${nombreEmpleado} el día ${fecha} cambió el estado del producto con el id ${idProducto}`,
            cobro: `El empleado ${nombreEmpleado} el día ${fecha} cobró el pedido ${pedido?.numero_pedido}`,
            entrega: `El empleado ${nombreEmpleado} el día ${fecha} entregó el pedido ${pedido?.numero_pedido}`,
            preparacion: `El empleado ${nombreEmpleado} el día ${fecha} preparó los alimentos del pedido ${pedido?.numero_pedido}`,
            crear_categoria: `El empleado ${nombreEmpleado} el día ${fecha} creó la categoría con el id ${idCategoria}`,
            eliminar_categoria: `El empleado ${nombreEmpleado} el día ${fecha} eliminó la categoría con el id ${idCategoria}`,
            crear_promocion: `El empleado ${nombreEmpleado} el día ${fecha} creó la promoción con el id ${idPromocion}`,
            eliminar_promocion: `El empleado ${nombreEmpleado} el día ${fecha} eliminó la promoción con el id ${idPromocion}`,
        };

        return acciones[accion] || 'en desarrollo';
    };

    const afectado = ['cobro', 'entrega', 'preparacion'].includes(datosCambios?.datos?.accion) ? 'ID pedido' : 'ID producto';

    return (
        <div className="flex flex-col overflow-y-auto relative h-dvh bg-white text-black rounded-xl px-5 z-20 overflow-hidden">
            <span className='flex justify-between pt-3'>
                <Link to={'/admin'} className='text-black inpresion'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:bg-zinc-400 transition-all rounded-full w-8 h-8 p-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </Link>
                <Button className='inpresion' endContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" /></svg>} onClick={() => window.print()}>Imprimir</Button>
            </span>
            <div>
                <header className='flex flex-col items-center'>
                    <div className="w-full flex items-center py-4 relative">
                        <img className="w-[3rem]" src='https://res.cloudinary.com/dfrsffngq/image/upload/v1723837093/logo.png' alt="Imagen Logo" />
                        <p className="text-center h-full mx-2 text-2xl tracking-tighter leading-none font-allura">secos y bolones</p>
                    </div>
                    <div className='w-full border border-black rounded p-2'>
                        {['Responsable', 'Cargo', 'Accion', afectado, 'Fecha'].map((label, index) => (
                            <div className='flex space-x-3' key={index}>
                                <h2 className='font-bold'>{label}: </h2>
                                <span>{label === 'Responsable' ? datosCambios?.datos?.employee?.name :
                                    label === 'Cargo' ? datosCambios?.datos?.employee?.rol[0] :
                                    label === 'Accion' ? datosCambios?.datos?.accion :
                                    label === afectado ? (['cobro', 'entrega', 'preparacion'].includes(datosCambios?.datos?.accion) ? datosCambios?.datos?.pedido?.id : datosCambios?.datos?.producto?.id) :
                                    formatearFecha(datosCambios?.datos?.created_at)}</span>
                            </div>
                        ))}
                    </div>
                </header>
                <main className='flex flex-col items-center'>
                    <p className='mt-3'>{datosCambios && generarResumen()}</p>
                    <h2 className='font-bold uppercase mt-3'>Detalles</h2>
                    <ul className='w-[90%] list-decimal mt-2'>
                        {datosCambios?.cambios?.length > 0 ? datosCambios.cambios.map((cambio, index) => <li key={index}>{cambio}</li>) : (
                            <li>{generarResumen()}</li>
                        )}
                    </ul>
                </main>
            </div>
        </div>
    );
}
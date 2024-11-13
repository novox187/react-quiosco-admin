import React from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { formatearDinero } from '../../helpers';
import useAdmin from '../../hooks/useAdmin';

export default function ModalDetallesPedidoEntrega({ isOpen, onOpenChange }) {
    const { pedidoEnCurso } = useAdmin();

    const generarEstrellas = (cantidad) => {
        const estrellas = [];
        for (let i = 1; i <= cantidad; i++) {
            estrellas.push(
                <span
                    key={i}
                    className={'text-yellow-400'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                </span>
            );
        }
        return estrellas;
    };
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className='overflow-x-hidden items-center'
            scrollBehavior='inside'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='font-bold uppercase text-4xl'>{pedidoEnCurso?.numero_pedido}</ModalHeader>
                        <ModalBody className='w-full mb-5'>
                            {pedidoEnCurso.productos.map((producto, index) => (
                                <div
                                    className={`flex justify-between items-center border-b border-slate-200 last-of-type:border-none py-4 cursor-pointer`}
                                    index={producto.id}
                                >
                                    <div>
                                        <p className=" font-bold uppercase " id="descripcion">
                                            {producto.nombre}
                                        </p>
                                        <label
                                            className=" ml-2 mt-2 font-bold"
                                            htmlFor="descripcion"
                                        >
                                            Descripcion del plato:{" "}
                                        </label>
                                        {producto.detalles_producto.map((detalle) => (
                                                <div key={detalle.id}>
                                                    <p className=" mx-2 text-famaClaro">
                                                        {detalle.nombre_contenedor}:
                                                    </p>
                                                    {detalle.tipo_contenedor === 'cantidad' ? (
                                                        <div className=" flex">
                                                            <span className=" pl-3 text-sm text-slate-200">
                                                                {detalle.opcion}:
                                                            </span>
                                                            <span className=" pl-3 text-sm text-slate-200">
                                                                {detalle.cantidad}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className=" pl-3 text-sm text-slate-200">
                                                            {detalle.opcion}
                                                        </span>

                                                    )}


                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}


                        </ModalBody>
                        <ModalFooter className=' w-full'>
                            <div className='w-full '>
                                <p className='text-lg font-bold '>
                                    Cliente: {''}
                                    <div className=' flex space-x-1'>
                                        <span className='font-normal text-white'>{pedidoEnCurso?.user?.name}</span>
                                    </div>
                                    <span className="flex">
                                        {generarEstrellas(pedidoEnCurso?.user?.calificacion)}
                                    </span>
                                </p>
                            </div>
                        </ModalFooter>
                        <ModalFooter>
                            <p className='text-lg font-bold '>
                                Total a Pagar: {''}
                                <span className='font-normal text-slate-300'>{formatearDinero(pedidoEnCurso.total)}</span>
                            </p>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

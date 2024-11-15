import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react'
import CajaIcono from '../../icons/CajaIcono'
import ModalAbrirCaja from './ModalAbrirCaja'
import ModalCerrarCaja from './ModalCerrarCaja'

export default function CartaCajas({ caja, setDatosCajas }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    const [expandir, setExpandir] = useState(false);

    return (
        <Card className='p-5 w-full max-w-md'>
            <CardHeader className='flex justify-between items-center'>
                <h1 className='uppercase font-extrabold text-xl'>{caja.nombre_caja}</h1>
                <CajaIcono
                    size={50}
                    className={`${caja.estado ? 'animate-pulse bg-green-800' : 'bg-yellow-800 bg-opacity-50'} rounded-xl p-2`}
                    color='white'
                />
            </CardHeader>
            <Divider className='my-4' />
            <CardBody className='space-y-4'>
                {expandir ? (
                    <>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <p className='font-semibold'>Estado:</p>
                                <p className={`${caja.estado ? 'text-green-600' : 'text-yellow-600'} font-bold`}>
                                    {caja.estado ? 'Abierta' : 'Cerrada'}
                                </p>
                            </div>
                            <div>
                                <p className='font-semibold'>Total Ventas:</p>
                                <p className='font-bold'>${caja.total_ventas.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className='font-semibold'>Número de Aperturas:</p>
                                <p>{caja.numero_aperturas}</p>
                            </div>
                            <div>
                                <p className='font-semibold'>Número de Cierres:</p>
                                <p>{caja.numero_cierres}</p>
                            </div>
                            <div>
                                <p className='font-semibold'>Número de Transacciones:</p>
                                <p>{caja.numero_transacciones}</p>
                            </div>
                            <div>
                                <p className='font-semibold'>Promedio Ventas por Cierre:</p>
                                <p>${caja.promedio_ventas_por_cierre.toFixed(2)}</p>
                            </div>
                        </div>
                        <Divider />
                        <div>
                            <h2 className='font-bold text-lg mb-2'>Última Apertura</h2>
                            <p><span className='font-semibold'>Fecha:</span> {formatDate(caja?.ultima_apertura?.created_at)}</p>
                            <p><span className='font-semibold'>Monto Inicial:</span> ${parseFloat(caja?.ultima_apertura?.monto_inicial).toFixed(2)}</p>
                        </div>
                        <Divider />
                        <div>
                            <h2 className='font-bold text-lg mb-2'>Último Cierre</h2>
                            <p><span className='font-semibold'>Fecha:</span> {formatDate(caja?.ultimo_cierre?.created_at)}</p>
                            <p><span className='font-semibold'>Monto Final:</span> ${parseFloat(caja?.ultimo_cierre?.monto_final || 0).toFixed(2)}</p>
                            <p><span className='font-semibold'>Total Ventas:</span> ${parseFloat(caja?.ultimo_cierre?.total_ventas || 0).toFixed(2)}</p>
                        </div>
                    </>
                ) : (
                    <div>
                        <h2 className='font-bold text-lg mb-2'>Última Apertura</h2>
                        <p><span className='font-semibold'>Monto Inicial:</span> ${parseFloat(caja?.ultima_apertura?.monto_inicial || 0).toFixed(2)}</p>
                        <p><span className='font-semibold'>Fecha:</span> {caja?.ultima_apertura?.created_at ? formatDate(caja?.ultima_apertura?.created_at) : 'Sin Apertura'}</p>
                    </div>
                )}

            </CardBody>
            <CardFooter className='space-x-2 justify-end'>
                <Button color="primary" variant="flat">Editar</Button>
                <Button color="secondary" variant="flat" onPress={() => setExpandir(!expandir)}>{expandir ? 'Ver menos' : 'Ver mas'}</Button>
                <ModalAbrirCaja caja={caja} setDatosCajas={setDatosCajas} />
                <ModalCerrarCaja caja={caja} />
            </CardFooter>
        </Card>
    )
}
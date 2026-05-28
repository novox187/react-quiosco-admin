import React, { useEffect, useState } from 'react';
import MapaRepartidor from '../MapaLeaflet/MapaRepartidor';
import { Button, Card } from '@heroui/react';
import { generateGoogleMapsUrl } from '../../helpers';
import useAdmin from '../../hooks/useAdmin';
import ModalDetallesPedidoEntrega from './ModalDetallesPedidoEntrega';
import Cookies from 'js-cookie';
import { useAuth } from '../../hooks/useAuth';
import ModalConfirmarCancelarEntrega from './ModalConfirmarCancelarEntrega';

export default function PedidoMapa() {
    useAuth({ middleware: 'pedidoEnCurso' });
    const {
        isOpenDireccionEntrega,
        onOpenChangeDireccionEntrega,
        pedidoEnCurso,
        cancelarPedido,
        isOpenConfirmarCancelarEntrega,
        onOpenConfirmarCancelarEntrega,
        onOpenChangeConfirmarCancelarEntrega,
        setLoadingCancelarPedido,
        loadingCancelarPedido,
        setLoadingFinalizarPedido,
        loadingFinalizarPedido,
        finalizarPedido
    } = useAdmin();

    const [positions, setPositions] = useState([
        [-0.43855503307235705, -77.00431070445268], // Punto A por defecto
        [pedidoEnCurso?.direccion?.coordenadas?.lat, pedidoEnCurso?.direccion?.coordenadas?.lon], // Punto B
    ]);
    const [coordenadasObtenidas, setCoordenadasObtenidas] = useState(false);

    useEffect(() => {
        // Función para obtener la ubicación actual del usuario
        const obtenerUbicacionActual = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setPositions((prevPositions) => [
                            [latitude, longitude], // Ubicación actual del usuario
                            prevPositions[1], // Mantener Punto B
                        ]);
                        setCoordenadasObtenidas(true); // Marcar que las coordenadas han sido obtenidas
                    },
                    (error) => {
                        console.error('Error al obtener la ubicación:', error);
                        setCoordenadasObtenidas(true); // Marcar que las coordenadas han sido obtenidas (aunque con error)
                    }
                );
            } else {
                console.error('Geolocalización no es soportada por este navegador.');
                setCoordenadasObtenidas(true); // Marcar que las coordenadas han sido obtenidas (aunque con error)
            }
        };

        // Llamar a la función para obtener la ubicación actual
        obtenerUbicacionActual();
    }, [pedidoEnCurso]);

    if (!coordenadasObtenidas) {
        return 'Cargando...';
        /* () => handleClickCancelarPedido() */
    }

    const handleClickCancelarPedido = async () => {
        setLoadingCancelarPedido(true);
        cancelarPedido(pedidoEnCurso?.id);
    };

    const handleClickFinalizarPedido = async () => {
        setLoadingFinalizarPedido(true);
        finalizarPedido(pedidoEnCurso?.id);
    };

    return (
        <>
            <div className='w-full space-y-5' style={{ height: 'calc(100dvh - 10rem)' }}>
                <Card className='p-3 w-full h-full space-y-3' style={{ height: 'calc(100% - 10rem)' }}>
                    <div className='w-full  rounded-xl overflow-hidden h-full z-0' >
                        <MapaRepartidor positions={positions} />
                    </div>
                    <div className='flex space-x-5'>
                        <a target='_blank' href={generateGoogleMapsUrl(positions)}>Google maps</a>
                        <button type='button' onClick={onOpenChangeDireccionEntrega}>Detalles</button>
                    </div>
                </Card>
                <div className='flex  flex-col space-y-5'>
                    <Button
                        className='m-auto w-full bg-zinc-900'
                        onPress={() => handleClickFinalizarPedido()}
                        isLoading={loadingFinalizarPedido}
                    >{loadingFinalizarPedido ? '' : 'Finalizar Pedido'}</Button>

                    <Button
                        className='m-auto w-full bg-zinc-900'
                        onPress={() => handleClickCancelarPedido()}
                        isLoading={loadingCancelarPedido}
                    >{loadingCancelarPedido ? '' : 'Cancelar Pedido'}</Button>
                </div>
            </div>
            <ModalDetallesPedidoEntrega isOpen={isOpenDireccionEntrega} onOpenChange={onOpenChangeDireccionEntrega} />
            <ModalConfirmarCancelarEntrega isOpen={isOpenConfirmarCancelarEntrega} onOpenChange={onOpenChangeConfirmarCancelarEntrega} />
        </>
    );
}
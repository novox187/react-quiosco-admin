import React, { useEffect, useState } from 'react';
import MapaRepartidor from '../MapaLeaflet/MapaRepartidor';
import { Button, Card } from '@nextui-org/react';
import { formatTime, generateGoogleMapsUrl } from '../../helpers';
import useAdmin from '../../hooks/useAdmin';
import ModalDetallesPedidoEntrega from './ModalDetallesPedidoEntrega';
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
        finalizarPedido,
        handleNotificarUsuario
    } = useAdmin();

    const [positions, setPositions] = useState(null); // Inicialmente null
    const [coordenadasObtenidas, setCoordenadasObtenidas] = useState(false);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        const obtenerUbicacionActual = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setPositions([
                            [latitude, longitude], // Ubicación actual del usuario
                            [
                                pedidoEnCurso?.direccion?.coordenadas?.lat || 0, // Valor predeterminado para evitar errores
                                pedidoEnCurso?.direccion?.coordenadas?.lon || 0
                            ],
                        ]);
                        setCoordenadasObtenidas(true);
                    },
                    (error) => {
                        console.error('Error al obtener la ubicación:', error);
                        // Si falla, establecemos coordenadas por defecto
                        setPositions([
                            [-0.43855503307235705, -77.00431070445268],
                            [
                                pedidoEnCurso?.direccion?.coordenadas?.lat || 0,
                                pedidoEnCurso?.direccion?.coordenadas?.lon || 0,
                            ],
                        ]);
                        setCoordenadasObtenidas(true);
                    }
                );
            } else {
                console.error('Geolocalización no es soportada por este navegador.');
                // Si la geolocalización no está disponible, establecemos coordenadas por defecto
                setPositions([
                    [-0.43855503307235705, -77.00431070445268],
                    [
                        pedidoEnCurso?.direccion?.coordenadas?.lat || 0,
                        pedidoEnCurso?.direccion?.coordenadas?.lon || 0,
                    ],
                ]);
                setCoordenadasObtenidas(true);
            }
        };

        // Solo ejecutamos obtenerUbicacionActual si `pedidoEnCurso` tiene coordenadas válidas
        if (pedidoEnCurso?.direccion?.coordenadas?.lat && pedidoEnCurso?.direccion?.coordenadas?.lon) {
            obtenerUbicacionActual();
        }
    }, [pedidoEnCurso]);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else if (countdown === 0 && isButtonDisabled) {
            setIsButtonDisabled(false);
        }
        return () => clearTimeout(timer);
    }, [countdown, isButtonDisabled]);

    // Mostrar "Cargando..." hasta que `pedidoEnCurso` y `positions` estén listos
    if (!pedidoEnCurso || !positions) {
        return <div>Cargando...</div>;
    }

    const handleClickCancelarPedido = async () => {
        setLoadingCancelarPedido(true);
        cancelarPedido(pedidoEnCurso?.id);
    };

    const handleClickFinalizarPedido = async () => {
        setLoadingFinalizarPedido(true);
        await finalizarPedido(pedidoEnCurso?.id);
    };

    const handleNotifyUser = () => {
        handleNotificarUsuario(
            pedidoEnCurso?.user?.email,
            `El repartidor está en el punto de entrega de su pedido ${pedidoEnCurso.numero_pedido}`,
            pedidoEnCurso?.id
        );
        setIsButtonDisabled(true);
        setCountdown(60);
    };

    return (
        <>
            <div className="w-full space-y-5" style={{ height: 'calc(100dvh - 10rem)' }}>
                <Card className="p-3 w-full h-full space-y-3" style={{ height: 'calc(100% - 10rem)' }}>
                    <div className="w-full rounded-xl overflow-hidden h-full z-0">
                        <MapaRepartidor positions={positions} />
                    </div>
                    <div className="flex space-x-5">
                        <a target="_blank" href={generateGoogleMapsUrl(positions)}>Google maps</a>
                        <button type="button" onClick={onOpenChangeDireccionEntrega}>Detalles</button>
                    </div>
                </Card>
                <div className="flex flex-col space-y-5">
                    <Button
                        className="m-auto w-full bg-zinc-900"
                        onPress={handleNotifyUser}
                        isDisabled={isButtonDisabled}
                        isLoading={loadingFinalizarPedido}
                    >
                        {isButtonDisabled ? `Esperar ${formatTime(countdown)}` : 'Notificar al usuario'}
                    </Button>
                    <Button
                        className="m-auto w-full bg-zinc-900"
                        onPress={handleClickFinalizarPedido}
                        isLoading={loadingFinalizarPedido}
                    >
                        {loadingFinalizarPedido ? '' : 'Finalizar Pedido'}
                    </Button>
                    <Button
                        className="m-auto w-full bg-zinc-900"
                        onPress={handleClickCancelarPedido}
                        isLoading={loadingCancelarPedido}
                    >
                        {loadingCancelarPedido ? '' : 'Cancelar Pedido'}
                    </Button>
                </div>
            </div>
            <ModalDetallesPedidoEntrega isOpen={isOpenDireccionEntrega} onOpenChange={onOpenChangeDireccionEntrega} />
            <ModalConfirmarCancelarEntrega isOpen={isOpenConfirmarCancelarEntrega} onOpenChange={onOpenConfirmarCancelarEntrega} />
        </>
    );
}

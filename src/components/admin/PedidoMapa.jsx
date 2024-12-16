import React, { useEffect, useState } from 'react';
import MapaRepartidor from '../MapaLeaflet/MapaRepartidor';
import { Button, Card } from '@nextui-org/react';
import { formatTime, generateGoogleMapsUrl } from '../../helpers';
import useAdmin from '../../hooks/useAdmin';
import ModalDetallesPedidoEntrega from './ModalDetallesPedidoEntrega';
import { useAuth } from '../../hooks/useAuth';
import ModalConfirmarCancelarEntrega from './ModalConfirmarCancelarEntrega';
import clienteAxios from '../../config/axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export default function PedidoMapa() {
    useAuth({ middleware: 'pedidoEnCurso' });
    const {
        isOpenDireccionEntrega,
        onOpenChangeDireccionEntrega,
        pedidoEnCurso,
        cancelarPedido,
        isOpenConfirmarCancelarEntrega,
        onOpenConfirmarCancelarEntrega,
        setLoadingCancelarPedido,
        loadingCancelarPedido,
        setLoadingFinalizarPedido,
        loadingFinalizarPedido,
        finalizarPedido,
        setPedidoEnCurso,
        token,
        socketConnection
    } = useAdmin();

    const [positions, setPositions] = useState(null); // Inicialmente null
    const [coordenadasObtenidas, setCoordenadasObtenidas] = useState(false);

    const [loadingEnelPuntoEntrega, setLoadingEnelPuntoEntrega] = useState(false);

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

    const handleClickEnElPuntoEntrega = async () => {
        setLoadingEnelPuntoEntrega(true)
        try {
            const { data } = await clienteAxios.patch(`/api/pedidos/repartidor/enpuntoentrega/${pedidoEnCurso?.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            Cookies.set("pedidoEnCurso", JSON.stringify(data.data), { expires: 2 });
            setPedidoEnCurso(data.data);
            const notificacion = {
                email: pedidoEnCurso?.user?.email,
                payload: {
                    mensaje: "El repartidor se encuentra en el punto de entrega",
                    idPedido: pedidoEnCurso?.id,
                    tipo: 'enElPuntoEntrega'
                },
            }
            socketConnection.emit("onNotificarUsuario", notificacion)
            toast.success('Se ha enviado la notificación al usuario, espera a que lo reciba, si demora contacta al usuario con el número de teléfono')
        } catch (error) {
            setLoadingEnelPuntoEntrega(false)
            console.log(error)
        }
        finally {
            setLoadingEnelPuntoEntrega(false)
        }
    }
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
                    {pedidoEnCurso.en_punto_entrega === 1
                        ?
                        <Button
                            className="m-auto w-full bg-zinc-900"
                            onPress={handleClickFinalizarPedido}
                            isLoading={loadingFinalizarPedido}
                        >
                            {loadingFinalizarPedido ? '' : 'Finalizar Pedido'}
                        </Button>
                        :
                        <Button
                            className="m-auto w-full bg-zinc-900"
                            onPress={handleClickEnElPuntoEntrega}
                            isLoading={loadingEnelPuntoEntrega}
                        >
                            Llegue al punto de entrega
                        </Button>
                    }
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

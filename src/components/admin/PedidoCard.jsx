import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { formatearDinero } from '../../helpers';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingAnimado from '../icons/LoadingAnimado';
import useAdmin from '../../hooks/useAdmin';

export default function PedidoCard({ pedido }) {
    const [start, setStart] = useState([-0.43855503307235705, -77.00431070445268]);
    const [end, setEnd] = useState([
        pedido.direccion?.coordenadas?.lat || 0,
        pedido.direccion?.coordenadas?.lon || 0
    ]);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [streetName, setStreetName] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [loadingPedidoEnCurso, setLoadingPedidoEnCurso] = useState(false);

    const { asignarPedido, pedidoEnCurso } = useAdmin();

    const calculateRoute = async () => {
        const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
            setDistance(data.routes[0].distance);
            setDuration(data.routes[0].duration);
        } else {
            setError('No se pudo calcular la ruta.'); // Manejo de error añadido
        }
    };

    const fetchStreetName = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${end[0]}&lon=${end[1]}&zoom=18&addressdetails=1`
            );
            if (response.data && response.data.address) {
                const streetName = response.data.display_name || 'Calle desconocida';
                setStreetName(streetName);
            } else {
                setError('No se pudo obtener la dirección.');
            }
        } catch (error) {
            console.error(error); // Registro del error para depuración
            setError('Error al obtener la dirección.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        calculateRoute();
        fetchStreetName();
    }, [start, end]);

    const formatDuration = (durationInSeconds) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = Math.floor(durationInSeconds % 60);

        return `${hours}h ${minutes}m ${seconds}s`; // Se eliminó el +5
    };

    const handleClickAsignarPedido = async (pedidoId) => {
        setLoadingPedidoEnCurso(true);
        await asignarPedido(pedidoId);
        setLoadingPedidoEnCurso(false); // Mover esta línea aquí
    };

    useEffect(() => {
        if (pedidoEnCurso?.numero_pedido) {
            setLoadingPedidoEnCurso(false);
            navigate(`/admin/repartidor/pedido/${pedidoEnCurso?.numero_pedido}`);
        }
    }, [pedidoEnCurso]);

    return (
        <Card>
            <CardHeader className='h-[7rem] flex flex-col mb-2 w-full justify-center items-center'>
                <h1 className='uppercase text-sm font-bold'>Numero de pedido</h1>
                <h2 className='text-3xl w-full text-center uppercase font-bold'>{pedido.numero_pedido}</h2>
            </CardHeader>
            <CardBody className='w-full h-full flex justify-around'>
                <p>
                    <b>Ubicación: </b>
                    {loading ? 'Cargando...' : error ? `Error: ${error}` : streetName}
                </p>
                <p>
                    <b>Usuario: </b>
                    {pedido.user.name}
                </p>
                <p>
                    <b>Método de pago: </b>
                    {pedido.pago}
                </p>
                <p>
                    <b>Total: </b>
                    {formatearDinero(pedido.total)}
                </p>
            </CardBody>
            <CardFooter className='w-full'>
                <Button onPress={() => handleClickAsignarPedido(pedido.id)} className='w-full mb-2 text-lg uppercase font-bold' size='sm'>
                    {loadingPedidoEnCurso ? <LoadingAnimado size={6} /> : 'Empezar'}
                </Button>
            </CardFooter>
        </Card>
    );
};
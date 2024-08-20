import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import MapaRepartidor from '../MapaLeaflet/MapaRepartidor';

export default function PedidoCard() {
    const [positions, setPositions] = useState([
        [-0.43855503307235705, -77.00431070445268], // Punto A
        [-0.44313670517234355, -76.99559846168907],   // Punto B
    ]);
    const [start, setStart] = useState([-0.43855503307235705, -77.00431070445268]);
    const [end, setEnd] = useState([-0.44313670517234355, -76.99559846168907]);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);

    useEffect(() => {
        const calculateRoute = async () => {
            const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`);
            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                setDistance(data.routes[0].distance);
                setDuration(data.routes[0].duration);
            }
        };

        calculateRoute();
    }, [start, end]);

    const formatDuration = (durationInSeconds) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = Math.floor(durationInSeconds % 60);

        return `${hours}h ${minutes + 5}m ${seconds}s`;
    };

    return (
        <Card >
            <CardHeader className='h-[7rem] flex flex-col mb-2 w-full justify-center items-center'>
                <h1 className=' uppercase text-sm font-bold'>Numero de pedido</h1>
                <h2 className=' text-3xl w-full text-center uppercase font-bold'>A-001</h2>
            </CardHeader>
            <CardBody className='w-full h-full flex justify-around'>
                <p>
                    <b>Distancia aproximada: </b>
                    {distance ? `${(distance / 1000).toFixed(2)} km` : 'Calculando...'}
                </p>
                <p>
                    <b>Tiempo aproximado: </b>
                    {duration ? formatDuration(duration): 'Calculando...'}
                </p>
                <p>
                    <b>Usuario: </b>
                    Harrison
                </p>
                <p>
                    <b>Metodo de pago: </b>
                    Efectivo
                </p>
                <p>
                    <b>Total: </b>
                    $13.50
                </p>
            </CardBody>
            <CardFooter className='w-full'>
                <Button className='w-full mb-2 text-lg uppercase font-bold' size='sm'>Empezar</Button>
            </CardFooter>
        </Card>
    );
};
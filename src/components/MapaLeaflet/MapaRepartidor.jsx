import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Chip } from '@heroui/react';

function RouteCalculator({ start, end }) {
    const [route, setRoute] = useState(null);
    const [duration, setDuration] = useState(null);
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        const calculateRoute = async () => {
            const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`);
            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                setRoute(data.routes[0].geometry.coordinates);
                setDuration(data.routes[0].duration);
                setDistance(data.routes[0].distance);
            }
        };

        calculateRoute();
    }, [start, end]);

    return route ? (
        <>
            <Polyline positions={route.map(coord => [coord[1], coord[0]])} color="green" />
            <div className='flex flex-col space-y-1' style={{ position: 'absolute', left: 0, top: 0, padding: 2, zIndex: 1000 }}>
                <Chip className=' bg-white text-zinc-700 shadow-xl'  >
                    Duración aprox: {duration ? `${(duration / 60).toFixed(2)} minutos` : 'Calculando...'}
                </Chip>
                <Chip className=' bg-white text-zinc-700 shadow-xl' >
                    Distancia aprox: {distance ? `${(distance / 1000).toFixed(2)} km` : 'Calculando...'}
                </Chip>
            </div>
        </>
    ) : null;
}

function Direccion() {
    return (
        <p className='w-full flex justify-center items-center text-center' style={{ display: 'flex', position: 'absolute', left: 0, bottom: 0, background: 'white', color: 'black', padding: 2, borderRadius: 5, zIndex: 1000 }}>
            Recoje el pedido y entrgalo en la direccion: Barrio 6 de diciembre, Orellana</p>
    )
}

function DisableMapInteractions() {
    const map = useMap();

    useEffect(() => {
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        if (map.tap) map.tap.disable();
    }, [map]);

    return null;
}

export default function MapaRepartidor({positions}) {

    return (
        <MapContainer center={positions[0]} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker position={positions[0]}>
                <Popup>
                    Punto A
                </Popup>
            </Marker>

            <Marker position={positions[1]}>
                <Popup>
                    Punto B
                </Popup>
            </Marker>

            <Marker position={[-0.47105781780871325, -76.98323627116352]}>
                <Popup>
                    Local Secos y Bolones
                </Popup>
            </Marker>
            <RouteCalculator start={positions[0]} end={positions[1]} />
            {/* <DisableMapInteractions /> */}
            <Direccion />
        </MapContainer>
    );
};
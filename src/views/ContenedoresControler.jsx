import React, { useEffect, useState } from 'react';
import Usuario from '../components/Usuario';
import { Switch } from '@nextui-org/react';
import clienteAxios from '../config/axios';
import ContenedorSkeleton from '../components/ContenedorSkeleton';
import { toast } from 'react-toastify';

export default function ContenedoresControler() {
    const [contenedoresQuery, setContenedoresQuery] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("AUTH_TOKEN");

    useEffect(() => {
        const obtenerContenedores = async () => {
            if (token) {
                try {
                    const { data } = await clienteAxios.get("/api/contenedores", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setContenedoresQuery(data);
                } catch (error) {
                    console.error("Error al obtener contenedores", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        obtenerContenedores();
    }, []);

    const handleSwitchChange = async (id, estado, nombre) => {
        setContenedoresQuery(prevState => prevState.map(contenedor =>
            contenedor.id === id ? { ...contenedor, estado: !estado } : contenedor
        ));
        try {
            await clienteAxios.post(`/api/contenedores/estado`, { id, estado: !estado }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (estado === false) {
                toast.success('Todas las opciones de ' + nombre + ' ya son visibles para el usuario')
            } else {
                toast.success('Todas las opciones de ' + nombre + ' ya no son visibles para el usuario')
            }
        } catch (error) {
            toast.error("Error al cambiar el estado del contenedor");
            setContenedoresQuery(prevState => prevState.map(contenedor =>
                contenedor.id === id ? { ...contenedor, estado } : contenedor
            ));
        }
    };

    const handleOpcionSwitchChange = async (id, estado,nombre) => {
        setContenedoresQuery(prevState => prevState.map(contenedor => ({
            ...contenedor,
            opciones: contenedor.opciones.map(opcion =>
                opcion.id === id ? { ...opcion, estado: !estado } : opcion
            )
        })));
        try {
            await clienteAxios.post(`/api/contenedores/opciones/estado`, { id, estado: !estado }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (estado === false) {
                toast.success('La opcion ' + nombre + ' ya es visibles para el usuario')
            } else {
                toast.success('La opcion ' + nombre + ' ya no es visibles para el usuario')
            }
        } catch (error) {
            console.log(error)
            toast.error("Error al cambiar el estado de la opción");
            setContenedoresQuery(prevState => prevState.map(contenedor => ({
                ...contenedor,
                opciones: contenedor.opciones.map(opcion =>
                    opcion.id === id ? { ...opcion, estado } : opcion
                )
            })));
        }
    };
console.log(contenedoresQuery)
    return (
        <div className='flex flex-col justify-center items-center pr-5 mb-40 pb-20 w-full'>
            <div className="lg:w-full hidden lg:flex justify-end lg:mr-10">
                <Usuario />
            </div>
            <h1 className='text-4xl font-black'>Contenedores</h1>
            <p className='text-2xl my-5 text-center'>Gestiona tus contenedores y sus opciones</p>
            <div className="flex flex-col w-screen md:w-full justify-center items-center md:flex-row md:justify-between pb-5">
                <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 min-w-56 px-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full'>
                    {loading ? (
                        Array.from({ length: 8 }).map((_, index) => <ContenedorSkeleton key={index} />)
                    ) : (
                        contenedoresQuery.map(({ id, nombre, estado, opciones }) => (
                            <div className={`shadow shadow-zinc-700 rounded-xl p-3 w-full space-y-5 ${!estado && 'opacity-50'}`} key={id}>
                                <header className='flex justify-between items-center shadow shadow-zinc-700 w-full rounded-xl p-3'>
                                    <h1 className='text-xl uppercase font-bold'>{nombre}</h1>
                                    <Switch isSelected={estado} color='warning' onChange={() => handleSwitchChange(id, estado, nombre)} />
                                </header>
                                <ul className='flex flex-col space-y-2 p-3'>
                                    {opciones.map(({ id, nombre, estado: estadoOpcion }) => (
                                        <li key={id} className={`flex flex-row justify-between items-center  ${!estadoOpcion && 'opacity-50'}`}>
                                            <p>{nombre}</p>
                                            <Switch isSelected={estadoOpcion} size='sm' color='warning' isDisabled={!estado} onChange={() => handleOpcionSwitchChange(id, estadoOpcion, nombre)} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
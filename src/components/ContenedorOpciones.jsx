import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import AcordionOpcion from './AcordionOpcion';
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';
import useAdmin from '../hooks/useAdmin';

const ContenedorOpciones = ({ opcionesProducto, setOpcionesProducto, encabezado = 'Contenedores de opciones', opcionesActuales = [], agregarContenedor = true }) => {
    const [abrirContenedores, setAbrirContenedores] = useState(false);
    const [contenedoresQuery, setContenedoresQuery] = useState([])
    const {token,userData} = useAdmin();

    const filtrarOpciones = (contenedoresQuery, opcionesActuales) => {
        return contenedoresQuery.filter(query => {
            // Verificar si el id de la opción ya existe en las opciones existentes
            const existe = opcionesActuales.some(existente => existente.id === query.id);
            return !existe; // Retornar solo las que no existen
        }).map(query => {
            // Filtrar las opciones dentro de cada contenedor
            return {
                ...query,
                opciones: query.opciones.filter(opcionQuery => {
                    return !opcionesActuales.some(existente =>
                        existente.opciones.some(opcionExistente => opcionExistente.id === opcionQuery.id)
                    );
                }),
            };
        });
    };


    const obtenerContenedores = async () => {
        if (userData) {
            try {
                const { data } = await clienteAxios("/api/contenedores", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setContenedoresQuery(data)
            } catch (error) {
                console.log(error)
            }
        }
    };
    useEffect(() => {
        obtenerContenedores()

    }, [])

    const handelClickAgregarContenedor = (nombre, tipo, opciones, query) => {
        const confirmacionOpciones = opcionesProducto.find(opcion => opcion.name === nombre);
        if (!confirmacionOpciones) {
            setOpcionesProducto([...opcionesProducto, { name: nombre, tipo: tipo, query: query, opciones: opciones }])
        } else {
            toast.error('El contenedor ' + nombre + ' ya esta agregado')
        }
    }
    return (
        <div className='w-full'>
            <div>
                <h1>{encabezado}</h1>
                <span className='text-mini opacity-60'>(opcional)</span>
            </div>
            <div className='flex items-center space-x-1 w-full'>
                <div
                    onClick={() => setAbrirContenedores(!abrirContenedores)}
                    className='flex flex-row justify-between items-center w-full p-2 md:p-4 rounded-xl bg-zinc-800 text-white shadow cursor-pointer'>
                    <h1 className='select-none'>Contenedores Existentes</h1>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
                        className={`h-1 w-2 transition-all duration-75 select-none ${abrirContenedores && 'rotate-180'}`}
                    />
                </div>
                {agregarContenedor &&
                    <Button
                        isIconOnly
                        type="button"
                        onClick={() => setOpcionesProducto([...opcionesProducto, { name: '', tipo: 'seleccion', opciones: {} }])}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Button>
                }
            </div>
            <div className='w-full space-y-1'>
                {filtrarOpciones(contenedoresQuery, opcionesActuales).map((contenedor) => (
                    <div
                        tabIndex={contenedor.id}
                        key={contenedor.id}
                        className={`flex flex-row justify-between items-center w-full bg-zinc-800 mt-1 rounded-xl transition-all ${abrirContenedores ? 'visible opacity-100 h-auto p-2' : 'invisible opacity-0 max-h-0 h-auto'}`}
                    >
                        <h1 className='select-none'>{contenedor.nombre}</h1>
                        <span
                            onClick={() => handelClickAgregarContenedor(contenedor.nombre, contenedor.tipo, contenedor.opciones, true)}
                            className='hover:bg-slate-500 p-1 rounded-xl transition-all cursor-pointer select-none'>
                            Agregar
                        </span>

                    </div>
                ))}
                {filtrarOpciones(contenedoresQuery, opcionesActuales).length < 1 ? (
                    <p className={` transition-all duration-1000  text-center ${abrirContenedores ? 'flex  scale-100' : 'hidden scale-50 '}`}>No hay contenedores disponibles o ya estan agregados</p>
                ) : ''}
                {opcionesProducto.map((option, index) => (
                    <AcordionOpcion
                        option={option}
                        index={index}
                        key={index}
                        setOpcionesProducto={setOpcionesProducto}
                        opcionesProducto={opcionesProducto}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContenedorOpciones;
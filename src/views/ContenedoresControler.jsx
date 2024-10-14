import React, { useState } from 'react'
import Usuario from '../components/Usuario'
import dataContenedores from '../data/dataContenedores'
import { Switch } from '@nextui-org/react'

export default function ContenedoresControler() {
    return (
        <div className='flex flex-col justify-center items-center pr-5 mb-40 pb-20 w-full'>
            <div className=" lg:w-full hidden lg:flex justify-end  lg:mr-10">
                <Usuario />
            </div>
            <h1 className='text-4xl font-black'>Contenedores</h1>
            <p className='text-2xl my-5 text-center'>
                Gestiona tus contenedores y sus opciones
            </p>
            <div className=" flex flex-col w-screen md:w-full justify-center items-center md:flex-row md:justify-between pb-5">
                <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 min-w-56 px-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full'>
                    {dataContenedores.map(contenedor => (
                        <div className={` shadow shadow-zinc-700 rounded-xl p-3 w-full space-y-5 ${!contenedor?.estado && 'opacity-50'}`} key={contenedor.id}>   
                            <header className='flex justify-between items-center shadow shadow-zinc-700 w-full rounded-xl p-3'>
                                <h1 className='text-xl uppercase font-bold'>{contenedor.nombre}</h1>
                                <Switch isSelected={contenedor.estado} color='warning'/>       
                            </header>
                            <ul className='flex flex-col space-y-2 p-3'>
                                {contenedor.opciones.map(opcion => (
                                    <li key={opcion.id} className='flex flex-row justify-between items-center'>
                                        <p>{opcion.nombre}</p>
                                        <Switch isSelected={opcion.estado} size='sm' color='warning' isDisabled={!contenedor.estado}/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

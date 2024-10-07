import React from 'react'
import { Outlet } from 'react-router-dom'
import ConfiguracionMenu from '../components/ConfiguracionMenu'
import Usuario from '../components/Usuario'

export default function ConfiguracionesLayout() {
    return (
        <div className='lg:flex overflow-y-hidden scroll-smooth h-dvh text-white min-w-[17rem] font-raleway w-[80rem] m-auto'>
            <ConfiguracionMenu />
            <main className='flex-1 h-dvh pb-20 overflow-y-auto inpresionScroll overflow-x-hidden p-3 scroll-smooth hover:scroll-auto bg-zinc-800'>
                <div className=" lg:w-full hidden lg:flex justify-end  lg:mr-10">
                    <Usuario />
                </div>
                <Outlet />
            </main>

        </div>
    )
}

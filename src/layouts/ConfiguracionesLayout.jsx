import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import ConfiguracionMenu from '../components/ConfiguracionMenu'
import Usuario from '../components/Usuario'
import { ToastContainer } from 'react-toastify'
import RegresarIcon from '../components/icons/RegresarIcon'

export default function ConfiguracionesLayout() {
    return (
        <div className='flex overflow-y-hidden scroll-smooth h-dvh text-white min-w-[17rem] font-raleway 2xl:w-[80rem] m-auto'>
            <ToastContainer />
            <ConfiguracionMenu />
            <main className='flex-1 h-dvh overflow-y-auto  overflow-x-hidden p-3 scroll-smooth hover:scroll-auto bg-zinc-800'>
                <div className=" lg:w-full flex  justify-between  lg:mr-10">
                    <Link to={'/admin'} className=' flex'>
                        <RegresarIcon className='size-5 mr-2' />
                        Regresar
                    </Link>
                    <Usuario />
                </div>
                <Outlet />
            </main>

        </div>
    )
}

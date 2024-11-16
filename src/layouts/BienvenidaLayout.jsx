import React from 'react'
import { Image } from '@nextui-org/react'
import { Outlet } from 'react-router-dom'

export default function BienvenidaLayout() {
  return (
    <main className='w-dvw h-dvh flex flex-col md:flex-row items-center justify-center  bg-tercero'>
      <div className='w-[65rem] h-auto text-center text-segundo'>
        <div className='flex  items-center'>
          <Image
            src={'https://res.cloudinary.com/dfrsffngq/image/upload/v1723837093/logo.png'}
            alt='imagen logotipo'
            className="w-24"
            sizes='sm'
          />
          <p className="text-center h-full text-2xl tracking-tighter leading-none font-kaushan text-segundo">
            Secos y Bolones
          </p>
        </div>
        <h1 className='font-bold text-xl'>Bienvenido</h1>
        <p>Crea tu usuario administrador para comenzar a usar la aplicación</p>
        <div className='p-10'>
          <Outlet />
        </div>
      </div>
    </main>
  )
}

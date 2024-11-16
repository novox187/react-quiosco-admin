import { Image } from '@nextui-org/react';
import { Outlet } from 'react-router-dom';


export default function AuthLayout() {
  return (
    <main className='w-dvw h-dvh flex flex-col md:flex-row items-center justify-center  bg-tercero'>
      <Image
        src={'https://res.cloudinary.com/dfrsffngq/image/upload/v1723837093/logo.png'}
        alt='imagen logotipo'
        className="max-w-xs"
        sizes='xl'
      />
      <div className='p-10'>
        <Outlet />
      </div>
    </main>
  )
}

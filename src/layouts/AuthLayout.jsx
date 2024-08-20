import { Image } from '@nextui-org/react';
import { Outlet, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

export default function AuthLayout() {
  let location = useLocation();
  const registroUrl = '/auth/registro';
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
        <nav className="mt-5">
          {location.pathname === registroUrl ? (
            <Link to="/auth/login">
              <p className='text-segundo'>¿Ya tienes una cuenta? Inicia Sesion</p>
            </Link>
          ) : (
            <Link to="/auth/registro">
              <p className='text-segundo'>¿No tienes cuenta? Crea una</p>
            </Link>
          )}

        </nav>
      </div>
    </main>
  )
}

import React, { useEffect, useState } from 'react'
import Usuario from '../components/Usuario'
import CartaCajas from '../components/admin/dashboard/CartaCajas'
import clienteAxios from '../config/axios'
import useAdmin from '../hooks/useAdmin'

export default function Cajas() {
    const [datosCajas, setDatosCajas] = useState(null);
    const { token } = useAdmin()
    const obtenerDatosCaja = async () => {
        try {
            const { data } = await clienteAxios('api/caja/datos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });

            setDatosCajas(data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        obtenerDatosCaja();
    }, [])

    if (!datosCajas) {
        return (
            <div className='w-ful h-full flex flex-col justify-center items-center pt-5'>
                <img
                    className="w-32 md:w-40 animate-bounce"
                    src={`https://res.cloudinary.com/dfrsffngq/image/upload/v1723837093/logo.png`}
                    alt="Imagen Logo"
                />
                <h1 className=" font-bold text-white text-xl">Cargando...</h1>
            </div>
        )
    }


    return (
        <div className='2xl:w-[70rem] flex flex-col justify-center items-center space-y-4 mb-[8rem]  mx-auto'>
            <div className=" lg:w-full hidden lg:flex justify-end  lg:mr-10">
                <Usuario />
            </div>
            {datosCajas?.length === 0 ? (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-black">No tienes cajas</h1>
                    <p className="text-center text-white mb-10 mt-2">
                        Crea una nueva para poder gestionar tus compras
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-4xl font-black">Cajas</h1>
                        <p className="text-center text-white mb-10 mt-2">
                            desde aqui podras ver tus cajas y gestionarlas
                        </p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 min-w-full'>
                        {datosCajas?.map(caja => (
                            <CartaCajas key={caja.id} caja={caja} setDatosCajas={setDatosCajas} />
                        ))}
                    </div>
                </>
            )}


        </div>
    )
}

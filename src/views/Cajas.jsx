import React, { useEffect, useState } from 'react'
import Usuario from '../components/Usuario'
import CartaCajas from '../components/admin/dashboard/CartaCajas'
import clienteAxios from '../config/axios'
import useAdmin from '../hooks/useAdmin'

export default function Cajas() {
    const [datosCajas, setDatosCajas] = useState(null);
    const {token} = useAdmin()
    const obtenerDatosCaja = async () => {
        try {
            const {data} = await clienteAxios('api/caja/datos', {
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
    return (
        <div className='2xl:w-[70rem] flex flex-col justify-center items-center space-y-4 mb-[8rem]  mx-auto'>
            <div className=" lg:w-full hidden lg:flex justify-end  lg:mr-10">
                <Usuario />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 min-w-full'>
                {datosCajas?.map(caja => (
                    <CartaCajas key={caja.id} caja={caja} />
                ))}
            </div>
        </div>
    )
}

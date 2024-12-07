import { useEffect, useState } from 'react'
import PedidoCard from '../../components/admin/PedidoCard'
import Usuario from '../../components/Usuario'
import clienteAxios from '../../config/axios';
import { useAuth } from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';

export default function Repartidor() {
  useAuth({ middleware: 'repartidor' })
  const {token} = useAdmin();
  const [pedidos, setPedidos] = useState(null);

  const obtenerPedidosRepartidor = async () => {
    try {
      const { data } = await clienteAxios('/api/pedidos/repartidor', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      setPedidos(data.data);
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    obtenerPedidosRepartidor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pedidos) {
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
    <>
      <div className=" lg:w-full hidden lg:flex justify-end  lg:mr-10 mb-10">
        <Usuario />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-4xl font-black'>Repartidor</h1>
        <p className='text-1xl text-center text-white mb-10 mt-2'>
          Empieza una entrega de pedidos
        </p>
      </div>
      {pedidos?.length === 0 ?
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 transition-all duration-500 items-center justify-center'>
          <p>No hay pedidos por el momento</p>
        </div>
        :
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 transition-all duration-500 items-center justify-center'>
          {pedidos?.map((pedido, index) => (
            <PedidoCard key={index} pedido={pedido} />
          ))}
        </div>
      }
    </>
  )
}

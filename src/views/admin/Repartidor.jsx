import { useEffect, useState } from 'react'
import PedidoCard from '../../components/admin/PedidoCard'
import Usuario from '../../components/Usuario'
import clienteAxios from '../../config/axios';
import { useAuth } from '../../hooks/useAuth';

export default function Repartidor() {
  useAuth({ middleware: 'repartidor' })
  const token = localStorage.getItem("AUTH_TOKEN");
  const [pedidos, setPedidos] = useState([]);

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
  return (
    <>
      <div className=" lg:w-full hidden lg:flex justify-end  lg:mr-10 mb-10">
        <Usuario />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 transition-all duration-500 items-center justify-center'>
        {pedidos?.map((pedido, index) => (
          <PedidoCard key={index} pedido={pedido} />
        ))}
      </div>
    </>
  )
}

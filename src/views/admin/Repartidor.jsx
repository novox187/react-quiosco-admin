import React from 'react'
import PedidoCard from '../../components/admin/PedidoCard'

export default function Repartidor() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 transition-all duration-500 items-center justify-center'>
        <PedidoCard/>
        <PedidoCard/>
        <PedidoCard/>
        <PedidoCard/>
        <PedidoCard/>
    </div>
  )
}

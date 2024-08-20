import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { formatearTextoVista } from '../../../helpers'
import { Card, Skeleton } from '@nextui-org/react'
import useAdmin from '../../../hooks/useAdmin'

export default function TablaProductosTop({ datos }) {
    if (!datos) {
        return (
            <Card className=" bg-zinc-900 p-3 w-full">
                <Skeleton className='w-full h-7 rounded-lg mb-4' />
                <div className=' flex flex-col space-y-8'>
                    <div className='flex space-x-3'>
                        <Skeleton className='w-full h-3 rounded-lg' />
                        <Skeleton className='w-full h-3 rounded-lg' />
                    </div>
                    <div className='flex space-x-3'>
                        <Skeleton className='w-full h-3 rounded-lg' />
                        <Skeleton className='w-full h-3 rounded-lg' />
                    </div>
                    <div className='flex space-x-3'>
                        <Skeleton className='w-full h-3 rounded-lg' />
                        <Skeleton className='w-full h-3 rounded-lg' />
                    </div>
                    <div className='flex space-x-3'>
                        <Skeleton className='w-full h-3 rounded-lg' />
                        <Skeleton className='w-full h-3 rounded-lg' />
                    </div>
                </div>
            </Card>
        )
    }
    const { setProductoEditar, setModalEditarProducto, modalEditarProducto } = useAdmin();

    const handleClickDatosProducto = (id, nombre, precio, descripcion, categoria, imagen, promo_id) => {

        const datosProducto = {
            id: id,
            imagen: imagen,
            nombre: nombre,
            precio: precio,
            descripcion: descripcion,
            categoria_id: categoria,
            promo_id: promo_id,
        }
        setProductoEditar(datosProducto);
        setModalEditarProducto(!modalEditarProducto)

    }
    return (
        <Table aria-label='Tabla de productos Top'>
            <TableHeader>
                <TableColumn>PRODUCTO</TableColumn>
                <TableColumn>VENTAS</TableColumn>
            </TableHeader>
            <TableBody>
                {datos?.productos.map(producto => (
                    <TableRow key={producto.producto_id}>
                        <TableCell>{formatearTextoVista(producto.nombre)}</TableCell>
                        <TableCell>{producto.repeticiones}</TableCell>
                    </TableRow>
                ))};
            </TableBody>
        </Table>
    )
}

import useAdmin from '../hooks/useAdmin'
import { formatearDinero } from '../helpers'
import { useAuth } from '../hooks/useAuth'
import { Button, Card, Chip, Input } from '@nextui-org/react'
import Usuario from '../components/Usuario'
import { useState } from 'react'
import ProductosMesero from '../components/admin/ProductosMesero'
import ResumenFooterMesero from '../components/admin/ResumenFooterMesero'

export default function Despacho() {
    const [opcionMesero, setOpcionMesero] = useState('pedidos');

    useAuth({ middleware: 'despacho' })
    const {
        handleClickCompletarPedido,
        pedidosQuery,
        productoQuery,
        loadingEntregarPedido,
        loadingConfirmarPedido,
        setOrdenEliminar,
        setModalEliminarOrden,
        modalEliminarOrden,
        setModalConfirmarPedido,
        modalConfirmarPedido,
        setPrecioPedido,
    } = useAdmin()

    const [busqueda, setBusqueda] = useState("");
    const [busquedaPedidos, setBusquedaPedidos] = useState("");

    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };
    const handleBusquedaPedidosChange = (e) => {
        setBusquedaPedidos(e.target.value);
    };
    const productosFiltrados = busqueda
        ? productoQuery?.data.filter(producto => (
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            producto.disponible.toString().includes(busqueda)
        ))
        : productoQuery?.data;

    if (!pedidosQuery) {
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
    const pedidosIncompletos = pedidosQuery?.pedidos.filter(pedido => pedido.estado == 0  || pedido.pago === 'transferencia')

    const PedidosFiltrados = busquedaPedidos
        ? pedidosIncompletos?.filter(pedido => {
            return (
                pedido.user.name.toLowerCase().includes(busquedaPedidos.toLowerCase()) ||
                pedido.numero_pedido.includes(busquedaPedidos) ||
                pedido.mesa == busquedaPedidos ||
                pedido.user.rol[0] === busquedaPedidos ||
                (busquedaPedidos === "confirmar" && pedido.estado === 0) ||
                (busquedaPedidos === "proceso" && pedido.estado === 1) ||
                (busquedaPedidos === "listo" && pedido.estado === 2)
            );
        })
        : pedidosIncompletos;

    const handleClickObtenerIdOrden = (idP, idU, name, calificacion) => {
        const ids = {
            idP: idP,
            idU: idU,
            name: name,
            calificacion: calificacion,
        }
        setOrdenEliminar(ids)
        setModalEliminarOrden(!modalEliminarOrden);

    }

    const generarEstrellas = (cantidad) => {
        const estrellas = [];
        for (let i = 1; i <= cantidad; i++) {
            estrellas.push(
                <span
                    key={i}
                    className={'text-yellow-400'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                </span>
            );
        }
        return estrellas;
    };

    const handleClickVerificarPedido = (id, estado, correo, total) => {
        setPrecioPedido({ total, id, estado, correo })
        setModalConfirmarPedido(!modalConfirmarPedido)
    }

    return (
        <div className='mb-40 pb-20 w-full'>
            <div className=" lg:w-full hidden lg:flex justify-end  lg:mr-10">
                <Usuario />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-black'>Mesero</h1>
                <p className='text-1xl text-center text-white mb-10 mt-2'>
                    Verifica que el numero de orden del cliente coincida con el de la orden
                </p>
            </div>

            <div className=" flex flex-col w-screen md:w-full justify-center items-center md:flex-row md:justify-between pb-5">
                <div className='flex flex-col xs:flex-row justify-center items-center w-full md:w-auto'>
                    <Button
                        className=" bg-zinc-700 hover:bg-zinc-900 transition-colors px-3 text-white py-2.5 m-1"
                        onClick={() => setOpcionMesero('pedidos')}
                    >
                        Pedidos
                    </Button>

                    <Button
                        className=" bg-zinc-700 hover:bg-zinc-900 px-3 text-white py-2.5 m-1"
                        onClick={() => setOpcionMesero('menu')}
                    >
                        Menu
                    </Button>
                </div>
                {/* BUSQUEDA PRODUCTO */}
                <form
                    className={` flex flex-row justify-center items-center w-full md:w-auto md:justify-end my-1 space-x-1`}
                >
                    <Input type="text"
                        name="search"
                        id="search"
                        label="Filtra por nombre..."
                        color='default'
                        variant='bordered'
                        className={`${opcionMesero === 'pedidos' ? ' hidden' : ''} text-white h-[40px] w-2/4 md:w-auto z-0`}
                        value={busqueda}
                        onChange={handleBusquedaChange}
                    />

                    <Input type="text"
                        name="searchPedido"
                        id="searchPedido"
                        label="Filtra los pedidos..."
                        color='default'
                        variant='bordered'
                        className={`${opcionMesero === 'menu' ? ' hidden' : ''} text-white h-[40px] w-2/4 md:w-auto z-0`}
                        value={busquedaPedidos}
                        onChange={handleBusquedaPedidosChange}
                    />

                    <Button
                        type="button"
                        isIconOnly
                        className=" flex bg-zinc-600 hover:bg-zinc-900a w-10 h-10 items-center justify-center disabled"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white font-bold">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                    </Button>
                </form>
            </div>
            <div className={`${opcionMesero === 'menu' ? '-ml-[105%] sm:-ml-[101.5%]' : ''} flex w-full space-x-5 transition-all duration-500`}>
                <div className={`${opcionMesero === 'menu' ? 'max-h-0 max-w-0 opacity-0 overflow-hidden' : ' opacity-100'} grid grid-cols-1  md:grid-cols-2 gap-5 min-w-full transition-all duration-500`}>
                    {PedidosFiltrados.map(pedido => (

                        <Card key={pedido.id} className=" flex flex-col justify-between p-5  shadow space-y-2 relative">

                            <div className=' w-full'>
                                <Chip
                                    variant='shadow'
                                    color={pedido.estado === 0 ? 'warning' : pedido.estado === 1 ? 'primary' : 'success'}
                                    className=' text-xl absolute top-3 right-3 text-white transition-all '>
                                    {pedido.estado === 0 && (
                                        'Por confirmar'
                                    )}
                                    {pedido.estado === 1 && (
                                        'En proceso'
                                    )}
                                    {pedido.estado === 2 && (
                                        'Listo'
                                    )}
                                </Chip >

                                <div className=' flex flex-col w-full justify-center items-center'>
                                    <span className=' mt-8 text-white'>Numero de Pedido:</span>
                                    <strong className=' text-4xl text-red-800'>{pedido.numero_pedido}</strong>
                                </div>

                                {pedido.productos.map((producto, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-between items-center border-b border-slate-200 last-of-type:border-none py-4 m-1 cursor-pointer`}
                                    >
                                        <div>
                                            <p className=" font-bold uppercase " id="descripcion">
                                                {producto.nombre}
                                            </p>
                                            <label
                                                className=" ml-2 mt-2 font-bold"
                                                htmlFor="descripcion"
                                            >
                                                Descripcion del plato:{" "}
                                            </label>

                                            {producto.detalles_producto.map((detalle) => (
                                                <div key={detalle.id}>
                                                    <p className=" mx-2 text-famaClaro">
                                                        {detalle.nombre_contenedor}:
                                                    </p>
                                                    {detalle.tipo_contenedor === 'cantidad' ? (
                                                        <div className=" flex">
                                                            <span className=" pl-3 text-sm text-slate-200">
                                                                {detalle.opcion}:
                                                            </span>
                                                            <span className=" pl-3 text-sm text-slate-200">
                                                                {detalle.cantidad}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className=" pl-3 text-sm text-slate-200">
                                                            {detalle.opcion}
                                                        </span>

                                                    )}


                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='w-full'>
                                <p className='text-lg font-bold text-red-800'>
                                    Cliente: {''}
                                    <div className=' flex space-x-1'>
                                        <span className='font-normal text-white'>{pedido.user.name}</span>
                                    </div>
                                    <span className="flex">
                                        {generarEstrellas(pedido.user.calificacion)}
                                    </span>
                                </p>
                                {pedido.mesa ? (
                                    <p className='text-lg font-bold text-red-800'>
                                        Mesa: {''}
                                        <span className='font-normal text-white'>{pedido.mesa}</span>
                                    </p>
                                ) : (
                                    <p className='ttext-lg font-bold text-red-800'>
                                        Lugar: {''}
                                        <span className='font-normal text-white'>Para llevar</span>
                                    </p>
                                )}


                                <p className='text-lg font-bold text-red-800'>
                                    Lugar: {''}
                                    <span className='font-normal text-slate-300'>{pedido.lugar}</span>
                                </p>
                                <p className='text-lg font-bold text-red-800'>
                                    metodo de pago: {''}
                                    <span className='font-normal text-slate-300'>{pedido.pago}</span>
                                </p>

                                <p className='text-lg font-bold text-red-800'>
                                    Total a Pagar: {''}
                                    <span className='font-normal text-slate-300'>{formatearDinero(pedido.total)}</span>
                                </p>

                                <div className='w-full flex'>
                                    <Button
                                        type="button"
                                        className={`${pedido.estado === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} " bg-zinc-600 hover:bg-zinc-800 px-5 py-2 rounded uppercase font-bold text-white w-full "`}
                                        isDisabled={loadingConfirmarPedido || loadingEntregarPedido}
                                        onClick={() => {
                                            if (pedido.estado === 0) {
                                                handleClickVerificarPedido(pedido.id, 0, 'novox187@gmail.com', pedido.total)
                                            }
                                            if (pedido.estado === 2) {
                                                handleClickCompletarPedido(pedido.id, 2, 'novox187@gmail.com')
                                            }
                                        }}
                                    >
                                        {loadingEntregarPedido || loadingConfirmarPedido === pedido.id ? (
                                            <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            pedido.estado === 0 ? (
                                                'Confirmar'
                                            ) : (
                                                'Completar'
                                            )
                                        )}
                                    </Button>
                                    <Button
                                        isIconOnly
                                        aria-label="Eliminar"
                                        type="button"
                                        className={`${pedido.estado > 0 && 'hidden'} bg-red-600 hover:bg-red-800 px-1.5 py-2 rounded ml-2 uppercase font-bold text-white text-center w-10 cursor-pointer`}
                                        isDisabled={loadingConfirmarPedido || loadingEntregarPedido}
                                        onClick={() => {
                                            if (!loadingConfirmarPedido || !loadingEntregarPedido) {
                                                handleClickObtenerIdOrden(pedido.id, pedido.user.id, pedido.user.name, pedido.user.calificacion)
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>

                                    </Button>
                                </div>
                            </div>

                        </Card>
                    ))}
                </div>

                <div className={`${opcionMesero === 'pedidos' ? 'max-h-0 max-w-0 opacity-0 overflow-hidden' : ' opacity-100'}  grid gap-1 md:gap-2  min-w-full grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 transition-all duration-500`}>
                    {productosFiltrados?.map(producto => (
                        <ProductosMesero
                            key={producto.imagen}
                            producto={producto}
                        />
                    ))}
                    <div className={`${opcionMesero === 'pedidos' ? 'hidden' : ''} `}>
                        <ResumenFooterMesero />
                    </div>
                </div>
            </div>
        </div>
    )
}

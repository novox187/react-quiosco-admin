import React, { useState } from 'react';
import useAdmin from '../hooks/useAdmin';
import ProductosAdmin from '../components/admin/ProductosAdmin';
import { Button, Input } from '@heroui/react';
import Usuario from '../components/Usuario';


export default function Productos() {

    const [busqueda, setBusqueda] = useState("");
    const { productoQuery, modalCrearPromo, setModalCrearPromo, modalCrearProducto, setModalCrearProducto } = useAdmin();


    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };

    const productosFiltrados = busqueda
        ? productoQuery?.data.filter(producto => (
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            producto.disponible.toString().includes(busqueda)
        ))
        : productoQuery?.data;


    if (!productoQuery) {
        return (
            <div className='w-full h-full flex flex-col justify-center items-center pt-5'>
                <img
                    className="w-32 md:w-40 animate-bounce "
                    src={`https://res.cloudinary.com/dfrsffngq/image/upload/v1723837093/logo.png`}
                    alt="Imagen Logo"
                />
                <h1 className=" font-bold text-white text-xl">Cargando...</h1>
            </div>
        )
    }
    return (
        <div className='flex flex-col justify-center items-center pr-5 mb-40 pb-20'>
            <div className=" lg:w-full hidden lg:flex justify-end  lg:mr-10">
                <Usuario />
            </div>
            <h1 className='text-4xl font-black'>Productos</h1>
            <p className='text-2xl my-5 text-center'>
                Gestiona, Crea y Edita el contenido de tu Negocio
            </p>

            <div className=" flex flex-col w-screen md:w-full justify-center items-center md:flex-row md:justify-between pb-5">
                <div className='flex flex-col xs:flex-row justify-center items-center w-full md:w-auto'>
                    <Button
                        className=" bg-zinc-700 hover:bg-zinc-900 transition-colors px-3 text-white py-2.5 m-1"
                        onClick={() => setModalCrearPromo(!modalCrearPromo)}
                        endContent={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        }
                    >
                        Descuento
                    </Button>

                    <Button
                        className=" bg-zinc-700 hover:bg-zinc-900 px-3 text-white py-2.5 m-1"
                        onClick={() => setModalCrearProducto(!modalCrearProducto)}
                        endContent={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        }
                    >
                        Producto
                    </Button>
                </div>
                <form
                    className="flex flex-row justify-center items-center w-full md:w-auto md:justify-end my-1 space-x-1"
                >

                    <Input type="text"
                        name="search"
                        id="search"
                        label="Filtra por nombre"
                        color='default'
                        variant='bordered'
                        className="text-white h-[40px] w-2/4 md:w-auto z-0"
                        value={busqueda}
                        onChange={handleBusquedaChange}
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

            <div className={`${productosFiltrados.length > 0 ? 'grid gap-2 grid-cols-1 justify-center items-center sm:grid-cols-2 max-w-56 sm:max-w-96 md:max-w-none md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' : '  h-96 flex items-center justify-center'}`}>
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map(producto => (
                        <ProductosAdmin
                            key={producto.imagen}
                            producto={producto}
                        />
                    ))
                ) : (
                    <p className='flex flex-col items-center justify-center  w-full text-center text-slate-400' >No hay resultados para esta busqueda
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>
                    </p>
                )}
            </div>

        </div>
    )
}

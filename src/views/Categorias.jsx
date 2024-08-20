import useAdmin from "../hooks/useAdmin"
import Acordion from "../components/Acordion"
import { useAuth } from "../hooks/useAuth";
import Usuario from "../components/Usuario";
import { Button } from "@nextui-org/react";

export default function Categorias() {

    const { categoriasProductos, handleClickModalCategoria } = useAdmin();
    useAuth({ middleware: 'categorias' })
    if (!categoriasProductos) {
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
        <div className="m-2 space-y-2 text-mini md:text-base mb-40 pb-20">
            <div className=" lg:w-full hidden lg:flex justify-end  lg:mr-10">
                <Usuario />
            </div>
            <div className=" flex flex-col justify-center items-center w-full">
                <h1 className='text-4xl font-black'>Categorias</h1>
                <p className='text-1xl text-white mb-10 mt-2 text-center'>
                    Edita tus categorias y mueve tus productos de categoria
                </p>
            </div>
            <Button
                type="button"
                className=' bg-zinc-700 hover:bg-zinc-800 ml-2 py-2 md:py-2.5 rounded-xl text-white px-2 md:px-3'
                onClick={handleClickModalCategoria}
                endContent={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                }
            >
                Categoria
            </Button>
            <div className=" flex flex-col  space-y-2">
                {categoriasProductos?.map(categorias => (
                    <Acordion
                        key={categorias.id}
                        categoria={categorias}
                    />
                ))}
            </div>
        </div>
    )
}

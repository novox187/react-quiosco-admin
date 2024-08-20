import { useState, createRef } from "react";
import useAdmin from "../hooks/useAdmin";
import { formatearTextoDB, formatearTextoVista, formatoNombreImg } from "../helpers";
import BotonCarga from '../components/BotonCarga'

export default function ModalEditarCategoria() {
    const { setModalEditarCategoria, categoriaModificar, editarCategoria, errorEditarCategoria, loadingEditarCategoria, setLoadingEditarCategoria } = useAdmin();

    const [iconoSrc, setIconoSrc] = useState(categoriaModificar.icono);
    const [iconoNuevoProducto, setIconoNuevoProducto] = useState([]);
    const [errorImg, setErrorImg] = useState(false);

    const categoriaRef = createRef();

    const iconoPreview = (e) => {
        setErrorImg(false)
        if (e.target.files[0]) {
            if (formatoNombreImg(e.target.files[0].name) !== 'jpg') {
                const reader = new FileReader();
                reader.onload = function (e) {
                    setIconoSrc(e.target.result);
                };

                reader.readAsDataURL(e.target.files[0]);
                setIconoNuevoProducto(e.target.files[0])
            } else {
                setErrorImg(true)
                setIconoSrc(categoriaModificar.icono);
            }
        } else {
            setIconoSrc(categoriaModificar.icono);
        }
    };


    //Subir datos 
    const handleSubmitActualizarIcono = async e => {
        e.preventDefault();
        setLoadingEditarCategoria(true)

        const datosIconoNuevo = {
            nombre: formatearTextoDB(categoriaRef.current.value),
            icono: iconoNuevoProducto,
        }

        editarCategoria(datosIconoNuevo, categoriaModificar.id)
    }


    return (
        <div className=" flex flex-col justify-start items-end w-96 z-20 font-raleway bg-zinc-900 ">
            <button onClick={() => setModalEditarCategoria(false)} className=" w-full flex justify-end md:fixed md:top-1 md:right-1 transition-all 5s text-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>

            <form
                className='flex flex-col w-full p-5 rounded  justify-center items-center text-white m-auto'
                onSubmit={handleSubmitActualizarIcono}
                noValidate
            >
                {errorEditarCategoria ? errorEditarCategoria.map(error => <Alerta key={error}>{error}</Alerta>) : null}

                <h1 className='text-2xl font-bold mb-4'>Categoria</h1>

                <div className='flex flex-col w-full'>
                    <label htmlFor="nombre" className=" font-bold ">Nombre Categoria: </label>
                    <input
                        type="text"
                        name='nombreCategoria'
                        id='nombreCategoria'
                        placeholder='Eligue un nombre para la categoria'
                        className='p-4 rounded bg-zinc-800 text-white focus:border-none placeholder-zinc-300 focus:transform focus:scale-[1.02] focus:outline-none transition-transform shadow'
                        defaultValue={formatearTextoVista(categoriaModificar.nombre)}
                        ref={categoriaRef}
                    />
                </div>

                <div className='flex  justify-center  items-center space-x-2'>
                    <div className="relative flex justify-center items-center">
                        <label htmlFor={'iconoProducto'} className="w-[50%] top-1.5 right-[25.5%] h-full rounded-full absolute hover:bg-[#dadada50] hover:text-gray-800 text-transparent flex justify-center items-center cursor-pointer transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </label>
                        <input
                            type="file"
                            name={"iconoProducto"}
                            id={"iconoProducto"}
                            hidden
                            onChange={iconoPreview}
                            accept=".jpeg, .png, .webp , .svg" />

                        <img
                            src={iconoSrc}
                            alt="Icono de la categoria"
                            className=' w-[50%] rounded' />
                    </div>
                </div>
                <small className={`${errorImg ? '' : 'hidden'} text-fama font-bold mt-7 animate-bounce`}>*las imagenes con formato <b>jpg</b>  no son permitidas</small>
                <BotonCarga loading={loadingEditarCategoria} texto={'Editar'} />
            </form>
        </div>
    )
}

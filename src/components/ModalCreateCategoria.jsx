import { useState, createRef } from "react";
import Alerta from "./Alerta";
import { formatearTextoDB } from '../helpers';
import useAdmin from "../hooks/useAdmin";
import BotonCarga from "./BotonCarga";
import { formatoNombreImg } from "../helpers";
import { Input } from "@heroui/react";


export default function ModalCreateCategoria() {

  const { setModalCrearCategoria, modalCrearCategoria, loadingCrearCategoria, setLoadingCrearCategoria, erroresCrearCategoria, crearCategoria } = useAdmin()

  const categoriaRef = createRef();
  const imgDefault = 'https://res.cloudinary.com/dfrsffngq/image/upload/v1716986479/ddbooeqvr4fg7md8pz7f.png';
  const [iconoSrc, setIconoSrc] = useState(imgDefault);
  const [iconoNuevoProducto, setIconoNuevoProducto] = useState([]);
  const [errorImg, setErrorImg] = useState(false);

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
        setIconoSrc(imgDefault);
      }
    } else {
      setIconoSrc(imgDefault);
    }
  };

  //Subir datos 
  const handleSubmitNuevoIcono = async e => {
    e.preventDefault();
    setLoadingCrearCategoria(true)
    const datosIconoNuevo = {
      nombre: formatearTextoDB(categoriaRef.current.value),
      icono: iconoNuevoProducto,
    }

    crearCategoria(datosIconoNuevo);

  }

  return (
    <div className=" flex flex-col justify-start items-end w-96 z-20 font-raleway bg-zinc-900">
      <button
        type="button"
        className=" fixed top-1 right-1 text-white"
        onClick={() => setModalCrearCategoria(!modalCrearCategoria)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

      </button>

      <form
        className='flex flex-col w-full p-5 rounded  justify-center items-center text-white m-auto'
        onSubmit={handleSubmitNuevoIcono}
        noValidate
      >
        {erroresCrearCategoria ? erroresCrearCategoria.map(error => <Alerta key={error}>{error}</Alerta>) : null}

        <h1 className='text-2xl font-bold mb-4'>Categoria</h1>

        <div className='flex flex-col w-full'>
          <label htmlFor="nombre" className=" font-bold ">Nombre Categoria: </label>
          <Input
            type="text"
            name='nombreCategoria'
            id='nombreCategoria'
            label='Eligue un nombre para la categoria'
            className='text-white focus:border-none placeholder-zinc-300 focus:transform focus:scale-[1.02] focus:outline-none transition-transform shadow'
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
        <small className={`${errorImg ? '' : 'hidden'} text-red-800 font-bold mt-7 animate-bounce`}>*las imagenes con formato <b>jpg</b>  no son permitidas</small>
        <BotonCarga loading={loadingCrearCategoria} texto={'Crear categoria'} />
      </form>
    </div>
  )
}

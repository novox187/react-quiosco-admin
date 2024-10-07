import React from 'react';
import { createRef, useState, useEffect } from 'react'
import { Input, Select, SelectItem } from '@nextui-org/react';
import { formatearDinero, formatearTextoVista } from "../helpers";
import Alerta from '../components/Alerta';
import { formatearTextoDB } from '../helpers';
import AcordionOpcion from './AcordionOpcion';
import clienteAxios from '../config/axios';
import useAdmin from '../hooks/useAdmin';
import BotonCarga from './BotonCarga';
import { toast } from 'react-toastify';
import TipoSelect from './admin/TipoSelect';
import { formatoNombreImg } from '../helpers';

export default function ModalCrearProducto() {
    const nombreRef = createRef();
    const precioRef = createRef();
    const pesoRef = createRef();
    const descripcionRef = createRef();

    const { categorias, handleClickModalCategoria, setModalCrearProducto, modalCrearProducto, errores, setErrores, loadingCrearProducto, setLoadingCrearProducto, crearProducto } = useAdmin()
    const [selectedOption, setSelectedOption] = useState('sin_definir');
    const [opcionesProducto, setOpcionesProducto] = useState([]);
    const [abrirContenedores, setAbrirContenedores] = useState(false)
    const [contenedoresQuery, setContenedoresQuery] = useState([])
    const [imagenNuevoProducto, setImagenNuevoProducto] = useState([]);
    const [errorImg, setErrorImg] = useState(false);
    const [selectedKeys, setSelectedKeys] = React.useState("g");


    const imgDefault = 'https://res.cloudinary.com/dfrsffngq/image/upload/v1716986479/ddbooeqvr4fg7md8pz7f.png';
    const [imgSrc, setImgSrc] = useState(imgDefault);

    const imagenPreview = (e) => {
        setErrorImg(false)
        if (e.target.files[0]) {
            if (formatoNombreImg(e.target.files[0].name) !== 'jpg') {
                const reader = new FileReader();
                reader.onload = function (e) {
                    setImgSrc(e.target.result);
                };

                reader.readAsDataURL(e.target.files[0]);
                setImagenNuevoProducto(e.target.files[0])
            } else {
                setErrorImg(true)
                setImgSrc(imgDefault);
            }
        } else {
            setImgSrc(imgDefault);
        }

    };


    const obtenerContenedores = async () => {
        if (localStorage.getItem('USER')) {
            const token = localStorage.getItem("AUTH_TOKEN");
            try {
                const { data } = await clienteAxios("/api/contenedores", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setContenedoresQuery(data)
            } catch (error) {
                console.log(error)
            }
        }
    };
    useEffect(() => {
        obtenerContenedores()

    }, [])

    const addOptionMain = () => {
        setOpcionesProducto([...opcionesProducto, { name: '', tipo: 'seleccion', opciones: {} }]);
    };


    const handleClickCerrar = () => {
        setErrores([]);
        setModalCrearProducto(!modalCrearProducto)
        setLoadingCrearProducto(false)
    }

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption.target.value);
    };

    const categoriasOpcion = categorias.map((categoria) => {
        return {
            key: categoria.nombre,
            label: formatearTextoVista(categoria.nombre)
        };
    });


    const handleSubmitNuevoProducto = async e => {
        e.preventDefault();
        setLoadingCrearProducto(true)
        let idCategoria = categorias.find(categoria => categoria?.nombre === selectedOption)


        const datosProductoNuevo = {
            imagen: imagenNuevoProducto,
            nombre: formatearTextoDB(nombreRef.current.value),
            precio: formatearDinero(precioRef.current.value),
            peso: pesoRef.current.value,
            tipo_peso: selectedKeys,
            categoria: idCategoria?.id,
            descripcion: descripcionRef.current.value,
            opciones_producto: opcionesProducto,
        }
        crearProducto(datosProductoNuevo);

    }

    const handelClickAgregarContenedor = (nombre, tipo, opciones, query) => {
        const confirmacionOpciones = opcionesProducto.find(opcion => opcion.name === nombre);
        if (!confirmacionOpciones) {
            setOpcionesProducto([...opcionesProducto, { name: nombre, tipo: tipo, query: query, opciones: opciones }])
        } else {
            toast.error('El contenedor ' + nombre + ' ya esta agregado')
        }
    }
    return (
        <div className="flex flex-col w-screen h-dvh max-w-[40rem] text-white md:py-3 font-raleway bg-transparent ">
            <div className=" flex flex-col overflow-y-auto relative bg-zinc-900 rounded-xl p-5 z-20">
                <span>
                    <button
                        type="button"
                        className=' md:absolute w-full flex justify-end md:top-2 md:right-2 text-white'
                        onClick={() => handleClickCerrar()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </span>
                <form
                    className='flex flex-col w-full text-white items-center'
                    onSubmit={handleSubmitNuevoProducto}
                    noValidate
                >
                    {errores ? errores.map(error => <Alerta key={error}>{error}</Alerta>) : null}

                    <h1 className='text-2xl font-bold mb-4 py-8'>Producto</h1>

                    <div className='flex  justify-center  items-center space-x-2'>
                        <div className="relative flex justify-center items-center">
                            <label htmlFor={'imgProducto'} className="w-[50%] top-1.5 right-[25.5%] h-full rounded-full absolute hover:bg-[#dadada50] hover:text-gray-800 text-transparent flex justify-center items-center cursor-pointer transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </label>
                            <input
                                type="file"
                                name={"imgProducto"}
                                id={"imgProducto"}
                                hidden
                                onChange={imagenPreview}
                                accept=".jpeg, .png, .webp , .svg" />

                            <img
                                src={imgSrc}
                                alt="img logo"
                                className=' w-[50%] rounded' />
                        </div>
                    </div>
                    <small className={`${errorImg ? '' : 'hidden'} text-red-800 font-bold mt-7 animate-bounce`}>*las imagenes con formato <b>jpg</b>  no son permitidas</small>

                    <div className='flex flex-col w-full'>
                        <label htmlFor="nombre">Nombre: </label>
                        <Input
                            type="text"
                            name='nombre'
                            id='nombre'
                            label='Nombre del Producto'
                            className='text-white focus:border-none placeholder-zinc-300 focus:transform focus:scale-[1.02] focus:outline-none transition-transform shadow'
                            ref={nombreRef}
                        />
                    </div>
                    <div className=' md:flex w-full md:space-x-3'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="precio">Precio: </label>
                            <Input
                                type='number'
                                name='precio'
                                id='precio'
                                label='Precio del Producto'
                                placeholder='0.00'
                                className=' text-white focus:border-none placeholder-zinc-300 focus:transform focus:scale-[1.02] focus:outline-none transition-transform shadow'
                                ref={precioRef}
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">$</span>
                                    </div>
                                }
                                
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="precio">Peso: </label>
                            <div className=' flex flex-row justify-center space-x-1 items-center w-full'>
                                <Input
                                    type='number'
                                    name='peso'
                                    id='peso'
                                    label='Escribe el peso del producto'
                                    className='text-white focus:border-none placeholder-zinc-300 focus:transform focus:scale-[1.02] focus:outline-none transition-transform shadow'
                                    ref={pesoRef}
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">{selectedKeys}</span>
                                        </div>
                                    }
                                />
                                <TipoSelect setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys} />
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <p>Categoria: </p>
                        <div className='flex flex-row justify-center items-center w-full space-x-1'>
                            <Select
                                label="Selecciona una categoria"
                                className="text-white"
                                onChange={handleSelectChange}
                            >
                                {categoriasOpcion.map((categoria) => (
                                    <SelectItem key={categoria.key}>
                                        {categoria.label}
                                    </SelectItem>
                                ))}
                            </Select>

                            <button
                                type="button"
                                className=' bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white h-full py-2 px-2'
                                onClick={handleClickModalCategoria}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>

                            </button>
                        </div>
                    </div>

                    <div className='w-full'>
                        <div
                            onClick={() => setAbrirContenedores(!abrirContenedores)}
                            className='flex flex-row justify-between items-center w-full p-2 md:p-4 rounded-xl bg-zinc-800 text-white shadow  mt-3 cursor-pointer'>
                            <h1 className=' select-none'>Contenedores Existentes</h1>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
                                className={`h-1 w-2 transition-all duration-75 select-none ${abrirContenedores && 'rotate-180'}`}
                            />
                        </div>
                        <div className=' w-full space-y-1'>
                            {contenedoresQuery.map((contenedor) => (
                                <div
                                    tabIndex={contenedor.id}
                                    key={contenedor.id}
                                    className={`flex flex-row justify-between items-center w-full bg-zinc-800 mt-1 rounded-xl transition-all ${abrirContenedores ? 'visible opcaity-100 h-auto p-2' : 'invisible opacity-0 max-h-0 h-auto'}`}
                                >
                                    <h1 className=' select-none'>{contenedor.nombre}</h1>
                                    <span
                                        onClick={() => handelClickAgregarContenedor(contenedor.nombre, contenedor.tipo, contenedor.opciones, true)}
                                        className=' hover:bg-slate-500 p-1 rounded-xl transition-all cursor-pointer select-none'>
                                        Agregar
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='w-full'>
                        <div>
                            <h1>Crear contenedor de opciones</h1>
                            <span className='text-mini opacity-60'>(opcional)</span>
                        </div>

                        {opcionesProducto.map((option, index) => (

                            <AcordionOpcion
                                option={option}
                                index={index}
                                key={index}
                                setOpcionesProducto={setOpcionesProducto}
                                opcionesProducto={opcionesProducto}
                            />
                        ))}
                        <button
                            type="button"
                            className='flex flex-col justify-center items-center p-1 md:p-2 rounded-xl w-full bg-white hover:opacity-80 text-zinc-500'
                            onClick={addOptionMain}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>

                    </div>

                    <div className='flex flex-col w-full'>
                        <label htmlFor="descripcion">Descripcion: </label>
                        <textarea
                            name="descripcion"
                            id="descripcion"
                            className="h-20 md:h-40 w-full px-3 py-2 text-white rounded-lg focus:outline-none focus:ring-2 bg-zinc-800 focus:ring-indigo-200"
                            ref={descripcionRef} placeholder='Ingresa una descripcion atractiva para tu producto'></textarea>
                    </div>
                    <BotonCarga loading={loadingCrearProducto} texto={'Crear'} />
                </form>
            </div>
        </div>
    )
}

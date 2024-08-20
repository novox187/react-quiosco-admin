import { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { createRef } from "react";
import Alerta from "./Alerta";
import clienteAxios from '../config/axios';
import { formatearTextoDB, formatearTextoVista } from "../helpers";
import useAdmin from "../hooks/useAdmin";
import { Card, Image, Textarea } from "@nextui-org/react";
import BotonCarga from "./BotonCarga";
import TipoSelect from "./admin/TipoSelect";

export default function ModalEditarProducto() {
    const token = localStorage.getItem("AUTH_TOKEN");
    const { setModalEditarProducto, modalEditarProducto, productoEditar, handleClickEditarProducto, errorEdicionProducto, loadingIsEdit, setLoadingIsEdit } = useAdmin();

    const [nuevaImagenProducto, setNuevaImagenProducto] = useState([]);
    const [promociones, setPromociones] = useState([]);
    const [promoActualConsulta, setPromoActualConsulta] = useState(false);
    const [selectedOption, setSelectedOption] = useState();
    const [imagenUrl, setImagenUrl] = useState(productoEditar.imagen);
    const [selectedKeys, setSelectedKeys] = useState(productoEditar.tipo_peso);

    const nombreRef = createRef();
    const descripcionRef = createRef();
    const precioRef = createRef();
    const pesoRef = createRef();

    const handleClickCerrarEdicion = () => {
        setLoadingIsEdit(false)
        setModalEditarProducto(!modalEditarProducto);
    }



    //OBTENER TODAS LAS PROMOCIONES
    const obtenerPromociones = async () => {
        try {
            const { data } = await clienteAxios("/api/promociones", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            //guardamos los datos traidos desde la base de datos
            let datos = data?.data;
            //agregamos la opcion de dejar sin promocion el producto
            datos.push({ id: "", nombre: 'sin promocion' })
            //guardamos los datos en el estado de promociones
            setPromociones(datos);
            //filtramos la promocion actual que tiene el producto
            let promocionDelrpducto = data?.data?.find(promocion => promocion?.id === productoEditar?.promo_id)
            //en caso de que no tenga promocion le asignamos el nombre sin promocion
            if (!promocionDelrpducto) {
                promocionDelrpducto = {
                    id: "",
                    nombre: 'sin promocion'
                }
            }
            //guardamos la promocion actual
            setPromoActualConsulta(promocionDelrpducto)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        obtenerPromociones();
    }, []);


    //FORMATEAR LA RESPUESTA DEL SERVIDOR PARA EL SELECT
    const promocionesOpcion = promociones?.map((promocion) => {

        return {
            key: promocion?.nombre,
            label: formatearTextoVista(promocion?.nombre)
        };
    });

    //FORMATEAMOS LOS DATOS QUE LE PASAMOS A LA PROMOCION POR DEFECTO (ESTA DESPUES DE LA CONDICIONAL PARA QUE NO DE ERROR)
    const promocionActual = {
        key: promoActualConsulta?.nombre,
        label: promoActualConsulta?.nombre
    };


    //RECUPERAR LA PROMOCION SELECCIONADA
    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption.target.value);
    };


    const imagenPreview = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setImagenUrl(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
            setNuevaImagenProducto(e.target.files[0])
        } else {
            setImagenUrl(productoEditar.imagen);
        }
    };

    //PASANDO LOS DATOS A LA FUCION QUE ACTUALIZA LOS DATOS
    const handleClickDatosEditadosProducto = (e) => {
        e.preventDefault();

        setLoadingIsEdit(true)

        let idPromocion = promociones.find(promocion => promocion?.nombre === selectedOption)

        const datosActualizarProducto = {
            id: productoEditar?.id,
            nombre: formatearTextoDB(nombreRef.current.value),
            precio: precioRef.current.value,
            imagen: nuevaImagenProducto,
            descripcion: descripcionRef.current.value,
            peso: pesoRef.current.value,
            tipo_peso: selectedKeys,
            promo_id: idPromocion?.id,
        }

        handleClickEditarProducto(datosActualizarProducto);

    }

    if (!promoActualConsulta) {
        return (
            <div className='w-80 h-72 flex flex-col justify-center items-center pt-5'>
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
        <div className="flex flex-col justify-center items-center w-screen  h-dvh md:w-[40rem] text-white md:p-5 font-raleway ">
            <Card className="flex flex-col w-full h-[100%] md:h-full overflow-y-scroll relative bg-zinc-900 rounded-xl px-5 md:px-5 py-4">
                <div className=" flex justify-end w-full  top-2 right-2">
                    <button onClick={handleClickCerrarEdicion} className=" transition-all 5s text-white  rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <div className=" text-center">
                    <h1 className=" font-bold text-xl uppercase"> Modifica tu producto  </h1>
                    <p>Desde esta ventana podras editar tu producto</p>
                </div>
                <div className=" flex flex-col justify-center items-center mt-2">
                    <form
                        className=" w-full"
                        onSubmit={handleClickDatosEditadosProducto}
                        noValidate
                    >
                        {errorEdicionProducto ? errorEdicionProducto?.map(error => <Alerta key={error}>{error}</Alerta>) : null}


                        <div className='flex flex-col items-center justify-center col-start-2 '>
                            <div className=' xs:w-[295px] xs:h-[266px] overflow-hidden rounded-xl m-2'>
                                <Image
                                    className="w-full h-full object-cover  object-center rounded-xl"
                                    src={imagenUrl}
                                    alt={`imagen ${productoEditar.nombre}`}
                                    id="imgView" />
                            </div>
                            <label htmlFor="img" className='p-4 bg-zinc-800 shadow-md shadow-zinc-800 hover:bg-zinc-700 cursor-pointer text-white rounded-xl font-bold text-center'>Ingrese la imagen</label>
                            <input
                                type="file"
                                name="img"
                                id="img"
                                hidden
                                onChange={imagenPreview}
                                accept=".jpeg, .png, .jpg, .gif, .webp"
                            />
                        </div>

                        <div className="flex flex-col w-full justify-center items-center mt-2 shadow-inner">
                            <label htmlFor="nombre" className=" text-xl font-bold mb-1 ">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                ref={nombreRef}
                                defaultValue={formatearTextoVista(productoEditar?.nombre)}
                                placeholder="Nombre del Producto"
                                className='p-2 bg-zinc-800 text-white outline-none w-full rounded-xl  k text-xl'
                            />
                        </div>

                        <div className="flex flex-col w-full mt-2 text-famaBlack">
                            <h1 className=" text-xl font-bold mb-1 w-full text-center text-white">Promocion:</h1>
                            <Select
                                label="Selecciona una categoria"
                                className="text-white"
                                onChange={handleSelectChange}
                                defaultSelectedKeys={[promocionActual?.key]}
                            >
                                {promocionesOpcion?.map((promo) => (
                                    <SelectItem key={promo.key}>
                                        {promo.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className=' md:flex w-full md:space-x-3'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="precio">Precio: </label>
                                <input
                                    type='number'
                                    name='precio'
                                    id='precio'
                                    defaultValue={productoEditar.precio}
                                    ref={precioRef}
                                    placeholder='Precio del Producto'
                                    className='p-2 w-full md:p-4 rounded-xl bg-zinc-800 text-white focus:border-none placeholder-zinc-300 focus:transform focus:scale-[1.02] focus:outline-none transition-transform shadow'
                                />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="precio">Peso: </label>
                                <div className=' flex flex-row justify-center space-x-1 items-center w-full'>
                                    <input
                                        type='number'
                                        name='peso'
                                        id='peso'
                                        placeholder='Escribe el peso del producto'
                                        defaultValue={productoEditar.peso}
                                        ref={pesoRef}
                                        className=' p-2 w-full md:p-4 rounded-xl bg-zinc-800 text-white focus:border-none placeholder-zinc-300 focus:transform focus:scale-[1.02] focus:outline-none transition-transform shadow'
                                    />
                                    <TipoSelect setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-full justify-center items-center mt-2">
                            <label htmlFor="descripcion" className=" text-xl font-bold mb-1 ">Descripcion:</label>
                            <Textarea
                                id="descripcion"
                                name="descripcion"
                                defaultValue={productoEditar?.descripcion}
                                placeholder="Descripcion del Producto"
                                className='p-2 bg-zinc-800 text-white  focus:outline-none w-full rounded-xl shadow  text-xl'
                                ref={descripcionRef}
                            ></Textarea>
                        </div>

                        <BotonCarga loading={loadingIsEdit} texto={'Editar'} />
                    </form>
                </div>
            </Card>
        </div>
    )
}

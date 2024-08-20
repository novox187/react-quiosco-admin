import { useState,useEffect } from "react";

export default function SubAcordionOpciones({ mostrarOpciones, opcionesProducto, setOpcionesProducto, indexMain, index, tipo }) {

    const [subIconoUrl, setSubIconoUrl] = useState('https://res.cloudinary.com/dfrsffngq/image/upload/v1716986479/ddbooeqvr4fg7md8pz7f.png');
    const [subprecio, setSubPrecio] = useState(0);
    

    useEffect(() => {
        if (tipo === 'seleccion') {
            opcionesProducto[indexMain].opciones[index]['precio'] = 0
        }else if( tipo === 'cantidad'){
            opcionesProducto[indexMain].opciones[index]['precio'] = subprecio
        }
    }, [tipo])

    const optenerIcono = (indexMain, indexSub, field, e) => {
        if (e.target.files[0]) {
            const iconoSubOpcion = new FileReader();
            iconoSubOpcion.onload = function (e) {
                setSubIconoUrl(e.target.result);
            };

            iconoSubOpcion.readAsDataURL(e.target.files[0]);
            updateOptionSubIcono(indexMain, indexSub, field, e.target.files[0])
        } else {
            setImagenURL('https://res.cloudinary.com/dfrsffngq/image/upload/v1716986479/ddbooeqvr4fg7md8pz7f.png');
        }
    }

    const updateOptionSubIcono = (indexMain, indexSub, field, value) => {
        const newOptions = [...opcionesProducto];
        newOptions[indexMain].opciones[indexSub][field] = value;
        setOpcionesProducto(newOptions);
    };

    const updateOptionSub = (indexMain, indexSub, field, value) => {
        const newOptions = [...opcionesProducto];
        newOptions[indexMain].opciones[indexSub][field] = value;
        setOpcionesProducto(newOptions);
    };

    const updateOptionSubPrecio = (indexMain, indexSub, field, value) => {
        setSubPrecio(value)
        const newOptions = [...opcionesProducto];
        newOptions[indexMain].opciones[indexSub][field] = value;
        setOpcionesProducto(newOptions);
    };

    const deleteSubOption = (indexMain, index) => {
        const newOptions = [...opcionesProducto];
        newOptions[indexMain].opciones.splice(index, 1);
        setOpcionesProducto(newOptions);
    };
    

    return (

        <div
            className={`w-full group flex flex-col gap-2 rounded-lg bg-gray-800 text-white  transition-all ${mostrarOpciones ? 'visible opacity-100  p-2' : 'invisible h-auto max-h-0 opacity-0'}`}
            key={index}
        >
            <div
                className="flex cursor-pointer items-center justify-between"

            >
                <div className='flex flex-row justify-between items-center space-x-2'>
{/*                     <div className="relative">
                        <label htmlFor={'iconoSubOpcion' + index + indexMain} className=" absolute w-full h-full hover:bg-[#dadada50] hover:text-gray-800 text-transparent flex justify-center items-center cursor-pointer rounded transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </label>
                        <input
                            type="file"
                            name={"iconoSubOpcion" + index + indexMain}
                            id={"iconoSubOpcion" + index + indexMain}
                            hidden
                            onChange={(e) => optenerIcono(indexMain, index, 'icono', e)}
                            accept=".jpeg, .png, .jpg, .gif, .webp, .svg" />

                        <img
                            src={subIconoUrl}
                            alt="img logo"
                            className=' w-10  rounded' />
                    </div> */}
                    <input
                        type="text"
                        name={"nombreSubOpcion" + index}
                        id={"nombreSubOpcion" + index}
                        onChange={(e) => updateOptionSub(indexMain, index, 'nombre', e.target.value)}
                        className="w-[70%] md:w-auto p-1 bg-gray-700 text-sm rounded focus:outline-none" placeholder="Nombre de la opcion" />
                </div>
                <div className={`${tipo === "cantidad" ? ' visible max-w-none opacity-100' : ' invisible max-w-0 opacity-0 overflow-hidden '} flex flex-col md:flex-row justify-center items-center m-0 transition-all duration-500`}>

                    <label htmlFor={"precioSubOpcion" + index} className="text-mini m-0 hidden md:block">Precio:</label>
                    <input
                        type="number"
                        name={"precioSubOpcion" + index}
                        id={"precioSubOpcion" + index}
                        defaultValue={opcionesProducto[indexMain].opciones[index]['precio']}
                        placeholder="precio"
                        onChange={(e) => updateOptionSubPrecio(indexMain, index, 'precio', e.target.value)}
                        className=" p-1 bg-gray-700 text-sm rounded focus:outline-none w-16 text-center" />

                </div>
                <div className="flex flex-row justify-center items-center space-x-2">
                    <button
                        className="hover:bg-fama p-0.5 rounded"
                        type="button"
                        onClick={() => deleteSubOption(indexMain, index)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

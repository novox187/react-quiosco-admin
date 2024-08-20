import { useState } from "react"
import SubAcordionOpciones from "./SubAcordionOpciones";

export default function AcordionOpcion({ option, index, setOpcionesProducto, opcionesProducto }) {
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const [activo, setActivo] = useState(false)
    const [tipo, setTipo] = useState('seleccion');

    const updateOptionSeleccion = (index, field, value) => {
        setTipo(value);
        const newOptions = [...opcionesProducto];
        newOptions[index][field] = value;
        setOpcionesProducto(newOptions);
    };

    const deleteOption = (index) => {
        const newOptions = [...opcionesProducto];
        newOptions.splice(index, 1);
        setOpcionesProducto(newOptions);
    };

    const updateOptionNameMain = (index, field, value,) => {

        const newOptions = [...opcionesProducto];
        newOptions[index][field] = value;
        setOpcionesProducto(newOptions);
    };

    const addOptionSub = (index) => {
        let newOpcionesProducto = [...opcionesProducto];
        if (!Array.isArray(newOpcionesProducto[index].opciones)) {
            newOpcionesProducto[index].opciones = [];
        }
        newOpcionesProducto[index].opciones = [...newOpcionesProducto[index].opciones, { nombre: '', icono: '', precio: '' }];
        setOpcionesProducto(newOpcionesProducto);
    };

    return (
        <div className='flex flex-col w-full my-3'
            key={index}>

            <div className=" flex flex-col justify-center items-center">
                <div
                    className={`w-full group flex flex-col gap-2 rounded-lg bg-gray-800 p-2 md:p-3  text-white`}
                    onClick={() => setMostrarOpciones(!mostrarOpciones)}
                >
                    <div
                        className="flex flex-row cursor-pointer items-center justify-between "

                    >
                        <div className='flex flex-row justify-between items-center space-x-2 w-[35%]'>
                            {option.query ? (
                                <input
                                    type="text"
                                    name={"nombreOpcion" + index}
                                    id={"nombreOpcion" + index}
                                    value={option.name}
                                    onChange={(e) => updateOptionNameMain(index, 'name', e.target.value)}
                                    className=" w-full md:w-auto md:p-1 bg-gray-700 text-sm rounded focus:outline-none" placeholder="Nombre de la opcion" 
                                    readOnly
                                    />
                            ):(
                                <input
                                type="text"
                                name={"nombreOpcion" + index}
                                id={"nombreOpcion" + index}
                                value={option.name}
                                onChange={(e) => updateOptionNameMain(index, 'name', e.target.value)}
                                className=" w-full md:w-auto md:p-1 bg-gray-700 text-sm rounded focus:outline-none" placeholder="Nombre del contenedor" 
                                />
                            )}
                        </div>
                        <div className={`${option.query?'hidden':''} space-x-1`}>
                            <button
                                type="button"
                                className={`transition-colors ${tipo === "seleccion" && 'bg-gray-400 '} text-mini md:text-base px-0.5 md:p-1 rounded`}
                                onClick={() => updateOptionSeleccion(index, 'tipo', 'seleccion')}
                            >
                                seleccion
                            </button>
                            <button
                                type="button"
                                className={`transition-colors ${tipo === "cantidad" && 'bg-gray-400 '} text-mini md:text-base px-0.5 md:p-1  rounded`}
                                onClick={() => updateOptionSeleccion(index, 'tipo', 'cantidad')}
                            >
                                cantidad
                            </button>
                        </div>
                        <div className="flex flex-row justify-center items-center space-x-2">
                            <button
                                className="hover:bg-fama p-0.5 rounded"
                                type="button"
                                onClick={() => deleteOption(index)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>

                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
                                className={`h-2 w-3 transition-all duration-500 ${mostrarOpciones && '-rotate-180'} ${option.query && 'hidden'}`}
                            />
                        </div>
                    </div>
                </div>
                <div className={`w-full pl-5 space-y-1 ${mostrarOpciones && 'mt-1'} ${option.query && 'hidden'}`}>
                    {opcionesProducto[index]?.opciones.length > 0 &&

                        opcionesProducto[index]?.opciones?.map((suboptiones,indexSub) => (
                            <SubAcordionOpciones
                                key={indexSub}
                                mostrarOpciones={mostrarOpciones}
                                opcionesProducto={opcionesProducto}
                                setOpcionesProducto={setOpcionesProducto}
                                indexMain={index}
                                index={indexSub}
                                tipo={tipo}
                            />
                        ))
                    }
                </div>
                <button
                    type="button"
                    className={`rounded w-full flex flex-col  justify-center items-center bg-white text-zinc-500 hover:opacity-80 transition-all ${mostrarOpciones ? '  visible max-h-dvh opacity-100  p-0.5 mt-2 ' : 'invisible h-auto max-h-0 items-center opacity-0'} ${option.query && 'hidden'}`}
                    onClick={() => addOptionSub(index)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>

        </div>
    );
}

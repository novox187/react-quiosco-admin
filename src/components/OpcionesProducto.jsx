import { useState, useEffect } from "react"
import SubOpcionesProductos from "./SubOpcionesProductos"
export default function OpcionesProducto({ contenedor, index, setDetallesProducto, detallesProducto, opcionesProducto }) {
    const { id, nombre, tipo, opciones } = contenedor
    const [opcionActual, setOpcionActual] = useState(opciones[0])
    const [mostrarOpciones, setMostrarOpciones] = useState(false)


    useEffect(() => {
        if (!opcionesProducto) {

            if (tipo === 'seleccion') {
                const newOption = {
                    idContenedor: id,
                    nombreContenedor: nombre,
                    tipoContenedor: tipo,
                    idOpcion: opcionActual.id,
                    opcion: opcionActual.nombre,
                    cantidad: 0,
                    precio: opcionActual.precio,
                    total: 0,
                };
                setDetallesProducto(prevDetalles => [...prevDetalles, newOption]);
            }
        }
    }, []);

    useEffect(() => {
        if (opcionesProducto) {
            const opcionProducto = opcionesProducto.filter((opcion) => opcion.idContenedor === contenedor.id && opcion.tipoContenedor === contenedor.tipo)
            const opcionActualActualizada = opciones.filter((opcione) => opcione.id === opcionProducto[0].idOpcion)
            setOpcionActual(opcionActualActualizada[0])

            if (tipo === 'seleccion') {
                const newOption = {
                    idContenedor: id,
                    nombreContenedor: nombre,
                    tipoContenedor: tipo,
                    idOpcion: opcionActualActualizada[0].id,
                    opcion: opcionActualActualizada[0].nombre,
                    cantidad: 0,
                    precio: opcionActualActualizada[0].precio,
                    total: 0,
                };
                setDetallesProducto(prevDetalles => [...prevDetalles, newOption]);
            }
        }
    }, [])


    const editarNombreContenedor = (idContenedor, idOpcion, nuevoNombre) => {
        setDetallesProducto(prevDetalles =>
            prevDetalles.map(detalle => {
                if (detalle.idContenedor === idContenedor) {
                    return { ...detalle, opcion: nuevoNombre, idOpcion: idOpcion };
                }
                return detalle;
            })
        );
    };


    return (
        <div>
            <div>
                <div className='flex flex-row space-x-2'>
                    <h1 className="text-xl text-segundo uppercase font-bold mb-2">
                        {nombre}
                    </h1>
                </div>

                <div
                    onClick={() => setMostrarOpciones(!mostrarOpciones)}
                    className={`flex flex-row justify-between items-center p-1 rounded ${tipo === 'seleccion' && 'cursor-pointer bg-tercero shadow-lg'} `}>
                    {tipo === 'cantidad' ? (
                        <div
                            className='pl-0.5 w-full space-y-2'>
                            {opciones?.map((opcione) => (
                                <SubOpcionesProductos
                                    key={opcione.id}
                                    opcione={opcione}
                                    contenedor={contenedor}
                                    setDetallesProducto={setDetallesProducto}
                                    detallesProducto={detallesProducto}
                                    opcionesProducto={opcionesProducto}
                                />
                            ))}
                        </div>
                    ) :
                        <div className='flex flex-row items-center space-x-2 p-1'>
                            <h1 className="text-[1.1rem] text-segundo">
                                {opcionActual.nombre}
                            </h1>
                        </div>
                    }
                    {tipo === 'seleccion' && (

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    )}
                </div>
                {tipo === 'seleccion' && (
                    <div
                        className={` transition-all duration-500 space-y-1 mt-1 ${mostrarOpciones ? 'visible opacity-100 pl-2 pr-1' : 'invisible h-auto max-h-0 opacity-0 overflow-hidden'}`}>
                        {opciones?.map(opcione => (
                            <div
                                key={opcione.id}
                                onClick={() => [setOpcionActual(opcione), setMostrarOpciones(!mostrarOpciones), editarNombreContenedor(id, opcione.id, opcione.nombre)]}
                                className={`flex flex-row transition-all ${opcionActual.id === opcione.id && 'bg-tercero'}  hover:bg-tercero p-1 rounded justify-between items-center cursor-pointer`}>
                                <div
                                    key={opcione.id}
                                    className='flex flex-row items-center space-x-2'>
                                    <h1 className="tracking-tighter leading-none text-segundo ">
                                        {opcione.nombre}
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

import { useState, useEffect } from "react"
import { formatearDinero } from "../helpers";

export default function SubOpcionesProductos({ opcione, contenedor, setDetallesProducto, opcionesProducto }) {
    const [cantidad, setCantidad] = useState(0)

    const { id, nombre, tipo } = contenedor
    useEffect(() => {
        if (!opcionesProducto) {
            const newOption = {
                idContenedor: id,
                nombreContenedor: nombre,
                tipoContenedor: tipo,
                idOpcion: opcione.id,
                opcion: opcione.nombre,
                cantidad: cantidad,
                precio: opcione.precio,
                total: 0,
            };
            setDetallesProducto(prevDetalles => [...prevDetalles, newOption]);
        }
    }, []);

    useEffect(() => {
        if (opcionesProducto) {
            const opcionProducto = opcionesProducto.filter((opcion) => opcion.idOpcion === opcione.id && opcion.tipoContenedor === contenedor.tipo)
            setCantidad(opcionProducto[0].cantidad)

            const newOption = {
                idContenedor: id,
                nombreContenedor: nombre,
                tipoContenedor: tipo,
                idOpcion: opcione.id,
                opcion: opcione.nombre,
                cantidad: opcionProducto[0].cantidad,
                precio: opcione.precio,
                total: 0,
            };
            setDetallesProducto(prevDetalles => [...prevDetalles, newOption]);
        }
    }, [])

    const editarCantidadContenedor = (id, cantidad) => {
        setDetallesProducto(detallesProducto =>
            detallesProducto.map(detalle => {
                if (detalle.idOpcion === id) {
                    return { ...detalle, cantidad: cantidad, total: opcione.precio * cantidad };
                }
                return detalle;
            })
        );
    };

    return (
        <div className='flex flex-row justify-between items-center w-full bg-gray-800 p-1 rounded '>

            <div key={opcione.id} className='flex flex-row items-center space-x-2'>
                <h1 className=" leading-none text-mini">
                    {opcione.nombre}
                </h1>
            </div>
            <div>
                <p className="tracking-tighter leading-none text-mini mr-2">{formatearDinero(opcione.precio)}uni</p>
            </div>
            <div className='flex justify-center items-center gap-2'>
                <button
                    type='button'
                    onClick={() => {
                        if (cantidad <= 0) return
                        setCantidad(cantidad - 1);
                        editarCantidadContenedor(opcione.id, cantidad - 1)

                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                <p>{cantidad}</p>

                <button
                    type='button'
                    onClick={() => {
                        if (cantidad >= 5) return
                        setCantidad(cantidad + 1);
                        editarCantidadContenedor(opcione.id, cantidad + 1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

        </div>
    )
}

import { formatearTextoVista, formatearDinero } from '../../helpers';
import useAdmin from '../../hooks/useAdmin';

export default function ResumenProductoMesero({ producto }) {
 
    const { handleEliminarProductoPedido, handleEditarDetallesProducto } = useAdmin();
    const { nombre, precio, promocion, detallesProducto, totalOpciones,indexProducto } = producto
  
  
    const grouped = detallesProducto.reduce((acc, obj) => {
      const key = obj.nombreContenedor;
      if (!acc[key]) acc[key] = [];
      acc[key].push({
        opcion: obj.opcion,
        cantidad: obj.cantidad,
        precio: obj.precio,
        tipo: obj.tipoContenedor
      });
      return acc;
    }, {});
  
    const subtotal = (precio + totalOpciones) * (promocion?.descuento / 100);
  
    const precioDescuento = () => {
      return (formatearDinero((producto.precio + totalOpciones) - ((producto.precio + totalOpciones) * promocion?.descuento) / 100))
    }
  
    return (
      <div className=" shadow m-1 rounded space-y-1 p-4 bg-gray-700">
        <div className="space-y-2">
          <p className="text-xl font-bold">{formatearTextoVista(nombre)}</p>
  
          {Object.keys(grouped).map((contenedor) => (
            <div key={contenedor}>
              <p className="font-bold">{contenedor}:</p>
              {grouped[contenedor].map((detalle, index) => (
                detalle.tipo === 'cantidad' ? (
  
                  <p key={index} className="pl-2">{detalle.opcion}: {detalle.cantidad}</p>
                ):(
                  <p key={index} className="pl-2">{detalle.opcion}</p>
                )
              ))}
            </div>
          ))}
  
          {promocion ? (
            <div className='flex flex-row items-center mt-2'>
              Precio: <span className='opacity-0'>_</span>
              <p className=" font-black text-bse text-fama line-through opacity-50">
                {formatearDinero(precio + totalOpciones)}
              </p>
              <span className=' opacity-0'>s</span>
              <p className=" font-black text-base text-fama ">
                /  {precioDescuento()}
              </p>
            </div>
          ) : (
            <p className="mt-3 font-black text-base text-fama mb-3">
              Precio: {formatearDinero(precio + totalOpciones)}
            </p>
          )}
  
          {promocion ? (
            <p className="text-lg text font-bold">
              Descuento:
              <span className=" text-fama mx-1">
                {promocion.descuento}%
              </span>
            </p>
          ) : (
            null
          )}
          {promocion ? (
  
            <p className="text-lg">
              Subtotal: {formatearDinero((precio + totalOpciones) - subtotal)}
            </p>
          ) : (
            <p className="text-lg">
              Subtotal: {formatearDinero(precio)}
            </p>
          )}
        </div>
  
        <div className="flex justify-end gap-2 pb-4">
          <button
            type="button"
            className="bg-amber-500 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
            onClick={() => handleEditarDetallesProducto(indexProducto)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            type="button"
            className="bg-red-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
            onClick={() => handleEliminarProductoPedido(indexProducto)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
  
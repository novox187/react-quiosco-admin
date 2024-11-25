import { useState, useEffect } from "react";
import useAdmin from "../hooks/useAdmin";
import { useAuth } from "../hooks/useAuth";
import { Button, Card } from "@nextui-org/react";
import Usuario from "../components/Usuario";
import clienteAxios from "../config/axios";


export default function Ordenes() {

  useAuth({ middleware: 'ordenes' })

  const { handleClickCompletarPedido, pedidosQuery, modalEliminarOrden, setModalEliminarOrden, setOrdenEliminar, loadingCompletarPedido } = useAdmin();

  const pedidosIncompletos = pedidosQuery?.pedidos.filter(pedido => pedido.estado === 1);

  const [listo, setListo] = useState(() => {
    const storedData = localStorage.getItem("productosListos");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("productosListos", JSON.stringify(listo));
  }, [listo]);

  const VerificarListo = (value) => {
    if (listo.includes(value)) {
      const actualizaListo = listo.filter((producto) => producto !== value);
      setListo(actualizaListo);
    } else {
      setListo([...listo, value]);
    }
  };


  const handleClickObtenerIdOrden = (idP, idU, name, calificacion) => {
    const ids = {
      idP: idP,
      idU: idU,
      name: name,
      calificacion: calificacion
    }
    setOrdenEliminar(ids)
    setModalEliminarOrden(!modalEliminarOrden);

  }

  const generarEstrellas = (cantidad) => {
    const estrellas = [];
    for (let i = 1; i <= cantidad; i++) {
      estrellas.push(
        <span
          key={i}
          className={'text-yellow-400'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        </span>
      );
    }
    return estrellas;
  };


  if (!pedidosQuery) {
    return (
      <div className='w-ful h-full flex flex-col justify-center items-center pt-5'>
        <img
          className="w-32 md:w-40 animate-bounce "
          src={`https://res.cloudinary.com/dfrsffngq/image/upload/v1723837093/logo.png`}
          alt="Imagen Logo"
        />
        <h1 className=" font-bold text-white text-xl">Cargando...</h1>
      </div>
    )
  };

  return (
    <div className=" mb-40 pb-20">
      {pedidosQuery ? (
        <>
          <div className=" lg:w-full hidden lg:flex justify-end  lg:mr-10">
            <Usuario />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-black">Chef</h1>
            <p className="text-1xl text-center text-slate-200 mb-10 mt-2">
              Prepara los productos y cuando esten listos completa el pedido para
              notificar al despachador y al cliente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pedidosIncompletos.map((pedido) => (
              <Card
                key={pedido.id}
                className="flex flex-col  justify-between items-center p-5 shadow space-y-2"
              >
                <div className=" w-full">


                  <p className="text-xl font-bold text-slate-300">
                    Contenido del Pedido:
                  </p>
                  <span>Id: {pedido.id}</span>

                  {pedido.productos.map((producto, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center border-b border-b-slate-200 last-of-type:border-none py-4 m-1 cursor-pointer`}
                      onClick={() => VerificarListo(producto.nombre + pedido.id + '-' + pedido.numero_pedido)}
                    >
                      <div>
                        <p className=" font-bold uppercase " id="descripcion">
                          {producto.nombre}
                        </p>
                        <label
                          className=" ml-2 mt-2 font-bold"
                          htmlFor="descripcion"
                        >
                          Descripcion del plato:{" "}
                        </label>

                        {producto.detalles_producto.map((detalle) => (
                          <div key={detalle.id}>
                            <p className=" mx-2 text-famaClaro">
                              {detalle.nombre_contenedor}:
                            </p>
                            {detalle.tipo_contenedor === 'cantidad' ? (
                              <div className=" flex">
                                <span className=" pl-3 text-sm text-slate-200">
                                  {detalle.opcion}:
                                </span>
                                <span className=" pl-3 text-sm text-slate-200">
                                  {detalle.cantidad}
                                </span>
                              </div>
                            ) : (
                              <span className=" pl-3 text-sm text-slate-200">
                                {detalle.opcion}
                              </span>

                            )}


                          </div>
                        ))}
                      </div>
                      <div >
                        <img src="/img/listo.png" className={`${listo.includes(producto.nombre + pedido.id + '-' + pedido.numero_pedido) ? '' : 'filter grayscale'}  w-10 lg:w-14`} alt="Listo" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className=" w-full">
                  <p className="text-lg font-bold text-red-800">
                    Lugar: {""}
                    <span className="font-normal text-white">{pedido.lugar}</span> <br />
                  </p>

                  <p className="text-lg font-bold text-red-800">
                    Cliente: {""}
                    <span className="font-normal text-white">{pedido.user.name}</span> <br />
                    <span className="flex">
                      {generarEstrellas(pedido.user.calificacion)}
                    </span>
                  </p>

                  <div className="w-full flex">
                    <Button
                      type="button"
                      className="bg-zinc-600 hover:bg-zinc-800 px-5 py-2 rounded uppercase font-bold text-white w-full cursor-pointer"
                      isDisabled={loadingCompletarPedido}
                      onClick={() => {
                        if (!loadingCompletarPedido) {
                          handleClickCompletarPedido(pedido.id, 1)
                        }
                      }}
                    >
                      {loadingCompletarPedido === pedido.id ? (
                        <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        'Completar'
                      )}
                    </Button>
                    <Button
                      isIconOnly
                      aria-label="Eliminar"
                      type="button"
                      className="bg-red-600 hover:bg-red-800 px-1.5 py-2 rounded ml-2 uppercase font-bold text-white text-center w-10 cursor-pointer"
                      onClick={() => handleClickObtenerIdOrden(pedido.id, pedido.user.id, pedido.user.name, pedido.user.calificacion)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>

                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

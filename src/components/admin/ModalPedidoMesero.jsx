import useGeneralContext from "../../hooks/useGeneralContext";
import { formatearDinero } from "../../helpers";
import useAdmin from "../../hooks/useAdmin";
import ResumenProductoMesero from "./ResumenProductoMesero";

export default function ModalPedidoMesero() {
    const { pedidoMesero, total, totalNeto, modalLugarMesero, setModalLugarMesero, setModalPedidoMesero, modalPedidoMesero } = useAdmin();
    const { userActivo, modalAuth, setModalAuth } = useGeneralContext();

    const comprobarPedido = () => pedidoMesero.length === 0;

    const handleClickModalPedidoMesero = () => {
        setModalPedidoMesero(!modalPedidoMesero);
    }


    const handleSubmit = e => {
        e.preventDefault();
        if (userActivo) {
            setModalLugarMesero(!modalLugarMesero)
            handleClickModalPedidoMesero()
        } else {
            setModalAuth(!modalAuth)
            console.log('necesitas iniciar session')
        }


    }
    return (
        <div className="flex flex-col justify-center items-center  h-dvh md:h-alto w-screen md:w-md xl:w-ancho  text-white font-raleway bg-zinc-900">
            <div className="bg-zinc-800 w-full p-2 pt-10 h-[90%] md:h-full overflow-y-scroll relative">


                <div className=" absolute top-3 md:top-10 right-4 md:right-10">
                    <button onClick={handleClickModalPedidoMesero} className=" transition-all 5s text-white hover:bg-gray-300 rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <h1 className="text-4xl font-black flex flex-row justify-center items-center">
                    Mi pedido
                </h1>
                <p className="text-lg my-5 flex flex-row justify-center items-center">
                    Verifica tu pedido y modificalo
                </p>

                <div className="pt-5">
                    {pedidoMesero.length === 0 ? (
                        <p className="text-center text-2xl text-gray-700 ">
                            No has agregado pedidos a tu carrito{handleClickModalPedidoMesero}
                        </p>
                    ) : (
                        pedidoMesero.map(producto => (
                            <ResumenProductoMesero
                                key={producto.indexProducto}
                                producto={producto}
                            />
                        ))
                    )}
                </div>

                <div className="text-xl mb-10  mt-5 px-5">
                    <p>
                        Descuento: {''}
                        -{formatearDinero(totalNeto - total)}
                    </p>
                    <p>
                        Total: {''}
                        {formatearDinero(total)}
                    </p>
                </div>

                <form
                    className="w-full px-5"
                    onSubmit={handleSubmit}
                >
                    <div className="w-full">
                        <input
                            type="submit"
                            className={`${comprobarPedido()
                                ?
                                'bg-indigo-100'
                                :
                                'bg-zinc-600  hover:bg-white text-white hover:text-famaBlack cursor-pointer'} 
                            px-5 py-2 mb-2 rounded uppercase transition-all  font-bold text-black text-center w-full `}
                            value="Confirmar Pedido"
                            disabled={comprobarPedido()}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

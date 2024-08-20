import { formatearDinero } from '../../helpers';
import useAdmin from '../../hooks/useAdmin';

export default function ResumenFooterMesero({ location }) {

    const { pedidoMesero, total, setModalPedidoMesero, modalPedidoMesero } = useAdmin();

    const handleClickModalPedidoMesero = () => {
        setModalPedidoMesero(true);
    }


    const contadorPedidos = pedidoMesero.length;

    const anchoPantalla = window.innerWidth;
    return (
        <aside className={`${location === 'pedidos' ? ' hidden' : ''} flex flex-row justify-between md:justify-start fixed bottom-4 left-1/2 transform -translate-x-1/2 space-x-16 shadow-xl shadow-zinc-800 font-raleway bg-zinc-900 p-1 mb-[10px] mx-[10px] rounded-xl pr-5`}>
            <div className="flex flex-row text-sm">
                <span className="flex flex-row  justify-center items-center relative w-16 md:w-20 h-14 md:h-14 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 md:w-9 h-8 md:h-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                    <span className=" absolute right-1 top-0.5 bg-red-600 text-white rounded-full min-w-5 h-5 text-center text-mini ">{contadorPedidos}</span>
                </span>
                <div className="flex justify-center items-center">
                    <p className=" font-bold text-sm md:text-lg">Total: </p>
                    <p className=" mx-0.5 md:mx-1">{formatearDinero(total)}</p>
                </div>
            </div>
            <div className="flex w-auto items-center">
                {contadorPedidos === 0 ? (

                    <button type="button" className="flex flex-row items-center bg-fama  text-gray-200 text-mini md:text-lg font-bold p-1.5 rounded cursor-no-drop">
                        <span className="hidden sm:flex">Pedido</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${anchoPantalla < 767 ? 'ml-0' : 'ml-2'}  w-6 h-6`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </button>


                ) : (
                    <button type="button" className="flex flex-row items-center justify-between bg-fama hover:bg-fama text-gray-100 hover:text-gray-50 text-mini md:text-lg cursor-pointer font-bold p-1.5  rounded " onClick={() => handleClickModalPedidoMesero()}>
                        <span className="hidden sm:flex">Pedido</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${anchoPantalla < 767 ? 'ml-0' : 'ml-2'}  w-6 h-6`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </button>
                )}
            </div>
        </aside>
    )
}

import { useState } from 'react';
import Alerta from '../Alerta';
import useAdmin from '../../hooks/useAdmin';
import useGeneralContext from '../../hooks/useGeneralContext';
import { Button } from '@nextui-org/react';

export default function ModalLugarMesero() {

    const { lugarMesero, setLugarMesero, setModalLugarMesero, handleSubmitNuevaOrden, mesaMesero, setMesaMesero, loadingNuevaOrden } = useAdmin();
    const { userActivo, setModalAuth, modalAuth } = useGeneralContext();

    const [error, setError] = useState();

    const handleMesaChange = (e) => {
        setMesaMesero(e.target.value)
    }

    const handleClickEnviar = () => {
        if (userActivo) {
            if (mesaMesero || lugarMesero === 'para-llevar') {
                handleSubmitNuevaOrden();
            } else {
                setError('Elije una mesa')
            }
        } else {
            setModalAuth(!modalAuth)
            console.log('necesitas iniciar session')
        }
    }

    const handleClick = (identificador) => {
        setLugarMesero(identificador);
    };

    return (
        <div className=' md:w-[40rem] md:h-[30rem]  relative text-center font-raleway bg-zinc-600'>
            <button onClick={() => setModalLugarMesero(false)} className=" w-full flex justify-end md:fixed md:top-1 md:right-1 transition-all 5s text-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>

            {error && lugarMesero === 'comedor' && !mesaMesero && (
                <div className=' w-5/6 m-auto h-10'>
                    <Alerta >{error}</Alerta>
                </div>
            )}

            <h1 className='m-2 md:mt-5 md:text-2xl text-white uppercase font-bold'>¿Donde vas a comer?</h1>
            <div className=' w-full h-[62%] flex justify-around items-center'>
                <div className='flex flex-col items-center'>
                    <button
                        className={`border-4 ${lugarMesero === 'comedor' ? 'border-zinc-800' : 'border-white'} w-3/4  p-1 md:p-2 rounded-xl  transition-colors`}
                        onClick={() => handleClick('comedor')}
                    >
                        <img
                            src="/img/restaurante.png"
                            alt="restaurante"
                            className={`${lugarMesero === 'comedor' ? 'bg-zinc-800' : 'bg-white'} p-5 rounded-md `}
                        />
                    </button>
                    <p className=' pt-2 md:pt-2 text-mini md:text-base text-white uppercase font-bold'>En el restaurante</p>
                </div>
                <div className='flex flex-col items-center'>
                    <button
                        className={`border-4 ${lugarMesero === 'para-llevar' ? 'border-zinc-800' : 'border-white'} w-3/4  p-1 md:p-2 rounded-xl  transition-colors`}
                        onClick={() => handleClick('para-llevar')}
                    >
                        <img
                            src="/img/para-llevar.png"
                            alt="para-llevar"
                            className={`${lugarMesero === 'para-llevar' ? 'bg-zinc-800' : 'bg-white'} p-5 rounded-md`}
                        />
                    </button>
                    <p className=' pt-2 md:pt-5 text-mini md:text-base text-white uppercase font-bold'>para llevar</p>
                </div>
            </div>
            {<div className={`${lugarMesero === 'comedor' ? ' opacity-100 ' : ' scale-0 h-1'}  flex flex-col transition-all w-full justify-center items-center `}>
                <label htmlFor="numeroMesa" className="text-white font-bold">Numero de mesa</label>
                <input
                    type="number"
                    name="numeroMesa"
                    id="numeroMesa"
                    onChange={handleMesaChange}
                    defaultValue={mesaMesero}
                    className=" p-1 rounded m-2" />
            </div>
            }
            <Button
                type="button"
                className={`${lugarMesero === ''? 'cursor-not-allowed' : 'cursor-pointer'} bg-red-800  w-[10rem] hover:opacity-90 font-bold p-2 text-xl `}
                onClick={() => {
                    if (lugarMesero !== '') {
                        handleClickEnviar()
                    }
                }}
                isDisabled={lugarMesero === ''}
            >
                {loadingNuevaOrden ? (
                    <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    'Realizar Pedido'
                )}
            </Button>



        </div>
    )
}

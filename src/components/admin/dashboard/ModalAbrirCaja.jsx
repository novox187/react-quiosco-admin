import { useState,useEffect } from 'react';
import useAdmin from '../../../hooks/useAdmin'
import { Button, Input } from '@nextui-org/react';
import clienteAxios from '../../../config/axios';

export default function ModalAbrirCaja() {

    const { setModalAbrirCaja, setLoadingAbrirCaja, loadingAbrirCaja, setDinero, handleClickAbrirCaja } = useAdmin();
    

    const handleClickCerrar = () => {
        setModalAbrirCaja(false)
        setLoadingAbrirCaja(false)
    }

    return (
        <div className="flex flex-col w-screen justify-center h-dvh max-w-[40rem] text-white md:py-3 font-raleway bg-transparent ">
            <div className="flex flex-col overflow-y-auto relative bg-zinc-900 rounded-xl p-5 z-20 space-y-5">
                <span>
                    <button
                        type="button"
                        className=' md:absolute w-full flex justify-end md:top-2 md:right-2 text-white'
                        onClick={() => handleClickCerrar()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </span>
                <h1 className=' w-full text-center'>Abrir Caja</h1>
                <div className='flex flex-col space-y-2'>
                    <Input
                        type="number"
                        label="Dinero para abrir caja"
                        placeholder="0.00"
                        labelPlacement="outside"
                        onChange={setDinero}
                        min={0}
                        max={380}
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">$</span>
                            </div>
                        }
                    />
                </div>
                <Button
                    onClick={() => handleClickAbrirCaja()}
                    className=' font-bold uppercase'
                    isDisabled={loadingAbrirCaja}
                >
                    {loadingAbrirCaja ? (
                        <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        'ABRIR CAJA'
                    )}</Button>
            </div>
        </div>
    )
}

import Login from "../views/Login"
import Registro from "../views/Registro";
import useGeneralContext from "../hooks/useGeneralContext";
export default function ModalAuth() {
  
    const { modalAuth, setModalAuth,authActual, setAuthActual } = useGeneralContext();

    return (
        <main className=' min-h-96 text-segundo p-5 font-raleway bg-tercero'>
            <button onClick={() => setModalAuth(!modalAuth)} className=' absolute top-2 right-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <div className=' w-full'>
                {authActual ? (
                    <>
                        <Login />
                        <nav className=" mt-2">
                            <button type="button" onClick={() => setAuthActual(!authActual)}>
                            <p className='text-segundo'>¿No tienes cuenta? Crea una</p>
                            </button>
                        </nav>
                    </>
                ) :
                    <>
                        <Registro />
                        <nav className=" mt-2">
                            <button type="button" onClick={() => setAuthActual(!authActual)}>
                            <p className='text-segundo'>¿Ya tienes una cuenta? Inicia Sesion</p>
                            </button>
                        </nav>
                    </>
                }
            </div>

        </main>
    )
}

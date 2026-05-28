import { createRef, useState } from 'react'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';
import { Button, Input } from '@heroui/react';
import BotonCarga from '../components/BotonCarga';

export default function Login() {
    const { login, loadingLogin } = useAuth({ middleware: 'auth' })
    const emailRef = createRef();
    const passwordRef = createRef();

    const [errores, setErrores] = useState([]);



    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        login(datos, setErrores)
    }


    return (
        <>
            <h1 className="text-4xl font-black text-segundo">Iniciar Sesión</h1>
            <p className='text-segundo'>Para crear un pedido debes iniciar sesión</p>

            <div className="bg-tercero text-segundo  md:w-96 md:max-w-96 rounded-md ">
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >

                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

                    <div className="mb-4">
                        <Input
                            type="email"
                            id="email"
                            label="Email"
                            className="mt-2 w-full "
                            name="email"
                            placeholder="email@email.com"
                            ref={emailRef}
                            classNames={{
                                label: " text-segundo",
                                input: [
                                  "bg-transparent",
                                  "text-segundo",
                                  "placeholder:text-segundo/50 dark:placeholder:text-white/60",
                                ],
                                innerWrapper: "",
                                inputWrapper: [
                                  "shadow-md shadow-cuarto",
                                  "border-2 border-cuarto",
                                  "text-segundo",
                                  "bg-tercero",
                                  "backdrop-blur-xl",
                                  "backdrop-saturate-200",
                                  "group-data-[focus=true]:bg-tercero",
                                  "!cursor-text",
                                ],
                              }}
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            type="password"
                            id="password"
                            label="Contraseña"
                            className="mt-2 w-full"
                            name="password"
                            placeholder="Escribe tu contraseña"
                            ref={passwordRef}
                            classNames={{
                                label: " text-segundo",
                                input: [
                                  "bg-transparent",
                                  "text-segundo",
                                  "placeholder:text-segundo/50 dark:placeholder:text-white/60",
                                ],
                                innerWrapper: "",
                                inputWrapper: [
                                  "shadow-md shadow-cuarto",
                                  "border-2 border-cuarto",
                                  "text-segundo",
                                  "bg-tercero",
                                  "backdrop-blur-xl",
                                  "backdrop-saturate-200",
                                  "group-data-[focus=true]:bg-tercero",
                                  "!cursor-text",
                                ],
                              }}
                        />
                    </div>
                    <BotonCarga loading={loadingLogin} texto={'Inicia sesión'}/>
                </form>
            </div>
        </>
    )
}

import { createRef, useState } from 'react'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';
import BotonCarga from '../components/BotonCarga';
import { Input } from '@nextui-org/react';

export default function Registro() {

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([])
    const { registro, loadingRegistro } = useAuth({ middleware: 'auth' })

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        registro(datos, setErrores)
    }

    return (
        <>
            <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
            <p className='text-center max-w-72'>Mantén un registro de tus compras y aprovecha los descuentos</p>

            <div className="bg-tercero text-segundo md:w-96 md:max-w-96 rounded-md">
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className=' max-h-20 md:max-h-none overflow-y-scroll md:overflow-auto mb-5'>
                        {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                    </div>

                    <div className="mb-4">
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            label="Nombre"
                            placeholder="Juen Perez"
                            ref={nameRef}
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
                            type="email"
                            id="email"
                            label="Email"
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
                            name="password"
                            label="Contraseña"
                            placeholder="Escribe una contraseña"
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

                    <div className="mb-4">
                        <Input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            label="Contraseña"
                            placeholder="Repite la contraseña"
                            ref={passwordConfirmationRef}
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

                    <BotonCarga loading={loadingRegistro} texto={'Crear Cuenta'}/>
                </form>
            </div>
        </>
    )
}

import { createRef, useState } from 'react'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';
import BotonCarga from '../components/BotonCarga';
import { Input } from '@nextui-org/react';

export default function Registro() {

    const firstNameRef = createRef();
    const lastNameRef = createRef();
    const emailRef = createRef();
    const phoneRef = createRef();
    const salaryRef = createRef();
    const positionRef = createRef();
    const departmentRef = createRef();
    const addressRef = createRef();
    const hireDateRef = createRef();
    const usernameRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([])
    const { registro, loadingRegistro } = useAuth({ middleware: 'auth' })

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            salary: salaryRef.current.value,
            position: positionRef.current.value,
            department: departmentRef.current.value,
            address: addressRef.current.value,
            hire_date: hireDateRef.current.value,
            username: usernameRef.current.value,
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
                            id="first_name"
                            name="first_name"
                            label="Nombre"
                            placeholder="Juan"
                            ref={firstNameRef}
                            classNames={{
                                label: " dark:text-green",
                                input: [
                                  "bg-transparent",
                                  "text-segundo",
                                  "placeholder:text-segundo/50 dark:placeholder:text-segundo",
                                ],
                                innerWrapper: "",
                                inputWrapper: [
                                  "shadow-md shadow-cuarto",
                                  "border-2 border-cuarto",
                                  "text-segundo",
                                  "bg-tercero",
                                  "backdrop-blur-xl",
                                  "group-data-[focus=true]:bg-tercero",
                                  "!cursor-text",
                                ],
                              }}
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            type="text"
                            id="last_name"
                            name="last_name"
                            label="Apellido"
                            placeholder="Pérez"
                            ref={lastNameRef}
                            classNames={{
                                label: " text-segundo",
                                input: [
                                  "bg-transparent",
                                  "text-segundo",
                                  "placeholder:text-segundo/50 dark:placeholder:text-segundo",
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
                                  "placeholder:text-segundo/50 dark:placeholder:text-segundo",
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
                            type="text"
                            id="phone"
                            name="phone"
                            label="Teléfono"
                            placeholder="123-456-7890"
                            ref={phoneRef}
                            classNames={{
                                label: " text-segundo",
                                input: [
                                  "bg-transparent",
                                  "text-segundo",
                                  "placeholder:text-segundo/50 dark:placeholder:text-segundo",
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
                            type="text"
                            id="salary"
                            name="salary"
                            label="Salario"
                            placeholder="1000"
                            ref={salaryRef}
                            classNames={{
                                label: " text-segundo",
                                input: [
                                  "bg-transparent",
                                  "text-segundo",
                                  "placeholder:text-segundo/50 dark:placeholder:text-segundo",
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
                            type="text"
                            id="position"
                            name="position"
                            label="Puesto"
                            placeholder="Desarrollador"
                            ref={positionRef}
                            classNames={{
                                label: " text-segundo",
                                input: [
                                  "bg-transparent",
                                  "text-segundo",
                                  "placeholder:text-segundo/50 dark:placeholder:text-segundo",
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
                            type="text"
                            id="department"
                            name="department"
                            label="Departamento"
                            placeholder="Tecnología"
                            ref={departmentRef}
                            classNames={{
                                label: " text-segundo",
                                input: [
                                  "bg-transparent",
                                  "text-segundo",
                                  "placeholder:text-segundo/50 dark:placeholder:text-segundo",
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
                            type="text"
                            id="address"
                            name="address"
                            label="Dirección"
                            placeholder="Calle 123"
                            ref={addressRef}
                            classNames={{
                                label: " text-segundo",
                                input: [
                                  "bg-transparent",
                                  "text-segundo",
                                  "placeholder:text-segundo/50 dark:placeholder:text-segundo",
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
                            type="date"
                            id="hire_date"
                            name="hire_date"
                            label="Fecha de Contratación"
                            placeholder="2023-01-01"
                            ref={hireDateRef}
                            classNames={{
                                label: " text-segundo",
                                input: [
                                  "bg-transparent",
                                  "text-segundo",
                                  "placeholder:text-segundo/50 dark:placeholder:text-segundo",
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
                            type="text"
                            id="username"
                            name="username"
                            label="Nombre de Usuario"
                            placeholder="juanperez"
                            ref={usernameRef}
                            classNames={{
                                label: " text-segundo",
                                input: [
                                  "bg-transparent",
                                  "text-segundo",
                                  "placeholder:text-segundo/50 dark:placeholder:text-segundo",
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
                                  "placeholder:text-segundo/50 dark:placeholder:text-segundo",
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
                            label="Confirmar Contraseña"
                            placeholder="Repite la contraseña"
                            className='text-segundo'
                            ref={passwordConfirmationRef}
                            classNames={{
                                label: " text-segundo",
                                input: [
                                  "bg-transparent",
                                  "text-segundo",
                                  "placeholder:text-segundo/50 dark:placeholder:text-segundo",
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
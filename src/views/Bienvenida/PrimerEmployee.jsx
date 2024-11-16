import { createRef, useState } from 'react'
import Alerta from '../../components/Alerta';
import { Button, Input } from '@nextui-org/react';
import clienteAxios from '../../config/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const styles = {
    label: "text-black/50 dark:text-white/90",
    input: [
        "bg-transparent",
        "text-black",
        "placeholder:text-segundo/50 dark:placeholder:text-black/60",
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
};

export default function PrimerEmployee() {

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
    const [loadingRegistro, setLoadingRegistro] = useState(false)
    const navigate = useNavigate();

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

    const registro = async (datos) => {
        setLoadingRegistro(true)
        try {
            const { data } = await clienteAxios.post(
                "/api/register/primero",
                datos
            );
            setLoadingRegistro(false)
            navigate('/')
            toast.success('Usuario creado correctamente, inicia session')
        } catch (error) {
            setLoadingRegistro(false)
            console.log(error)
            toast.error('algo salio mal')
            setErrores(Object.values(error.response.data.errors))
        }
    };

    return (
        <div className="flex flex-col w-full rounded-md h-[70vh] overflow-auto light ">
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
                        classNames={styles}
                        ref={firstNameRef}

                    />
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        id="last_name"
                        name="last_name"
                        label="Apellido"
                        placeholder="Pérez"
                        classNames={styles}
                        ref={lastNameRef}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        type="email"
                        id="email"
                        label="Email"
                        name="email"
                        placeholder="email@email.com"
                        classNames={styles}
                        ref={emailRef}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        id="phone"
                        name="phone"
                        label="Teléfono"
                        placeholder="123-456-7890"
                        classNames={styles}
                        ref={phoneRef}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        id="salary"
                        name="salary"
                        label="Salario"
                        placeholder="1000"
                        classNames={styles}
                        ref={salaryRef}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        id="position"
                        name="position"
                        label="Puesto"
                        placeholder="Desarrollador"
                        classNames={styles}
                        ref={positionRef}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        id="department"
                        name="department"
                        label="Departamento"
                        placeholder="Tecnología"
                        classNames={styles}
                        ref={departmentRef}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        id="address"
                        name="address"
                        label="Dirección"
                        placeholder="Calle 123"
                        classNames={styles}
                        ref={addressRef}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        type="date"
                        id="hire_date"
                        name="hire_date"
                        label="Fecha de Contratación"
                        placeholder="2023-01-01"
                        classNames={styles}
                        ref={hireDateRef}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        label="Nombre de Usuario"
                        placeholder="juanperez"
                        classNames={styles}
                        ref={usernameRef}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        label="Contraseña"
                        placeholder="Escribe una contraseña"
                        classNames={styles}
                        ref={passwordRef}
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
                        classNames={styles}
                        ref={passwordConfirmationRef}
                    />
                </div>

                <Button
                    isLoading={loadingRegistro}
                    className=' w-full mt-5 p-5 uppercase font-bold cursor-pointer bg-primero'
                    type='submit'
                >
                    {!loadingRegistro && "Crear Cuenta"}
                </Button>
            </form>
        </div>
    )
}
import { createRef, useEffect, useState } from 'react'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';
import BotonCarga from '../components/BotonCarga';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import useAdmin from '../hooks/useAdmin';
import clienteAxios from '../config/axios';

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
  const { token } = useAdmin();
  const [roles, setRoles] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState(new Set([]));

  const obtenerRoles = async () => {
    try {
      const { data } = await clienteAxios('/api/roles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRoles(data)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    obtenerRoles();
  }, []);

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
      role_id: parseInt(rolSeleccionado.currentKey, 10),
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    }
    registro(datos, setErrores)
  }

  return (
    <div className="md:w-96 md:max-w-96 rounded-md h-[60vh] overflow-auto">
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
          />
        </div>

        <div className="mb-4">
          <Select
            label="Roles"
            placeholder="Asigna un rol al trabajador"
            className="w-full"
            selectedKeys={rolSeleccionado}
            onSelectionChange={setRolSeleccionado}
            required
            isRequired
          >
            {roles.map(rol => (
              <SelectItem key={rol.id}>{rol.rol}</SelectItem>
            ))}
          </Select>
        </div>

        <div className="mb-4">
          <Input
            type="password"
            id="password"
            name="password"
            label="Contraseña"
            placeholder="Escribe una contraseña"
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
            ref={passwordConfirmationRef}
          />
        </div>

        <Button
          isLoading={loadingRegistro}
          className=' w-full mt-5 p-5 uppercase font-bold cursor-pointer'
          type='submit'
        >
          {!loadingRegistro && "Crear Cuenta"}
        </Button>
      </form>
    </div>
  )
}
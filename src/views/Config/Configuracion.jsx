'use client'

import { Button, Input, Skeleton } from '@nextui-org/react'
import { useRef, useState, useEffect } from 'react'
import useAdmin from '../../hooks/useAdmin'
import ImageUploader from '../../components/ImageUploader'

export default function Configuracion() {
  const { ActualizarNegocio, obtenerNegocio, loadingUpdateConfig } = useAdmin()
  const [negocio, setNegocio] = useState({
    nombre: '',
    eslogan: '',
    direccion: '',
    telefono: '',
    email: '',
    ruc: '',
  })
  const [imagenLogo, setImagenLogo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNegocio = async () => {
      setIsLoading(true)
      const data = await obtenerNegocio()
      if (data) {
        setNegocio(data)
      }
      setIsLoading(false)
    }
    fetchNegocio()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const negocioData = {
      logo: imagenLogo ? imagenLogo : null,
      nombre: negocio.nombre,
      eslogan: negocio.eslogan,
      direccion: negocio.direccion,
      telefono: negocio.telefono,
      email: negocio.email,
      ruc: negocio.ruc,
    }
    console.log(negocioData)
    if (negocio.id) {
      await ActualizarNegocio(negocio.id, negocioData)
    } else {
      console.error('ID del negocio no está definido')
    }
  }

  const handleImageChange = (file) => {
    setImagenLogo(file)
  }

  if (isLoading) {
    return (
      <div className="mt-10 w-full md:w-[70%] 2xl:w-[60rem] m-auto space-y-16 mb-10">
        <Skeleton className="h-8 w-3/4 rounded-lg" />
        <div className="space-y-10">
          <Skeleton className="h-40 w-full rounded-lg" />
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-1/4 rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4 rounded-lg" />
            </div>
          ))}
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mt-10 w-full md:w-[70%] 2xl:w-[60rem] m-auto space-y-16 mb-10">
        <h1 className="text-4xl font-black text-center md:text-start">Informacion</h1>
        <form onSubmit={handleSubmit} className="space-y-10">
          <ImageUploader onImageChange={handleImageChange} imgSrcDB={negocio.logo} />
          <Input
            label="Nombre del negocio"
            name="nombre"
            placeholder="Nombre del negocio"
            className="w-full"
            color="default"
            variant="faded"
            labelPlacement="outside"
            description="Es el nombre de tu negocio, tu marca o tu empresa en general"
            value={negocio.nombre}
            onChange={(e) => setNegocio({ ...negocio, nombre: e.target.value })}
          />
          <Input
            label="Eslogan del negocio"
            name="eslogan"
            placeholder="Eslogan del negocio"
            className="w-full"
            color="default"
            variant="faded"
            labelPlacement="outside"
            description="Es el eslogan de tu negocio, tu marca o tu empresa en general"
            value={negocio.eslogan}
            onChange={(e) => setNegocio({ ...negocio, eslogan: e.target.value })}
          />
          <Input
            label="Direccion"
            name="direccion"
            placeholder="Direccion"
            className="w-full"
            color="default"
            variant="faded"
            labelPlacement="outside"
            description="Direccion de tu negocio, en donde pueden ser ubicados tus productos"
            value={negocio.direccion}
            onChange={(e) => setNegocio({ ...negocio, direccion: e.target.value })}
          />
          <Input
            label="Telefono"
            name="telefono"
            placeholder="Telefono"
            className="w-full"
            color="default"
            variant="faded"
            labelPlacement="outside"
            description="Telefono de tu negocio, en donde pueden ser contactados con tus clientes"
            value={negocio.telefono}
            onChange={(e) => setNegocio({ ...negocio, telefono: e.target.value })}
          />
          <Input
            label="Email"
            name="email"
            placeholder="Email"
            className="w-full"
            color="default"
            variant="faded"
            labelPlacement="outside"
            description="Email de tu negocio, en donde pueden ser contactados con tus clientes"
            value={negocio.email}
            onChange={(e) => setNegocio({ ...negocio, email: e.target.value })}
          />
          <Input
            label="RUC"
            name="ruc"
            placeholder="RUC"
            className="w-full"
            color="default"
            variant="faded"
            labelPlacement="outside"
            description="RUC de tu negocio"
            value={negocio.ruc}
            onChange={(e) => setNegocio({ ...negocio, ruc: e.target.value })}
          />
          <Button
            type="submit"
            className="w-full bg-zinc-700 ml-2 py-2 md:py-2.5 rounded-xl text-white px-2 md:px-3"
            isLoading={loadingUpdateConfig}
          >
            {loadingUpdateConfig ? '' : 'Guardar'}
          </Button>
        </form>
      </div>
    </div>
  )
}
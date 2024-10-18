import { useState, useEffect } from "react"
import Ingresos from "../../components/admin/dashboard/Ingresos"
import GraficaEstadistica from '../../components/admin/dashboard/GraficaEstadistica'
import { Card, ScrollShadow } from '@nextui-org/react'
import TablaProductosTop from '../../components/admin/dashboard/TablaProductosTop'
import TablaUsuarios from '../../components/admin/dashboard/TablaUsuarios'
import TablaEquipoTrabajo from '../../components/admin/dashboard/TablaEquipoTrabajo'
import { useAuth } from '../../hooks/useAuth'
import clienteAxios from "../../config/axios"
import Usuario from "../../components/Usuario"
import Caja from "../../components/admin/dashboard/Caja"
import TablaRegistro from "../../components/admin/dashboard/TablaRegistro"

export default function Dashboard() {

  /* PANEL */
  const [datosPanel, setDatosPanel] = useState()

  /* PANEL */
  const token = localStorage.getItem("AUTH_TOKEN");
  const obtenerDatosPanel = async () => {
    try {
      const { data } = await clienteAxios("/api/datos/datosPanel", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      setDatosPanel(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerDatosPanel();
  }, []);

  useAuth({ middleware: 'panel' })
  return (
    <div className="flex flex-col justify-center items-center space-y-4 mb-[8rem]  mx-auto">
      <div className=" lg:w-full hidden lg:flex justify-end  lg:mr-10">
        <Usuario />
      </div>
      <ScrollShadow orientation='horizontal' className={`flex flex-row  space-x-3 overflow-auto w-[95%] z-0`}>
        <Ingresos datos={datosPanel?.ingresoHoy} />
        <Ingresos datos={datosPanel?.ingresoMes} />
        <Ingresos datos={datosPanel?.usuariosMes} />
        <Caja datos={datosPanel?.ingresoHoy} />
      </ScrollShadow>
      <div className='flex flex-col md:flex-row justify-center md:space-x-3 space-y-3 md:space-y-0 w-[95%]'>
        <Card className='md:w-[50%] flex flex-col justify-center'>
        <h1 className=" ml-5 mt-4 text-center text-zinc-400 md:text-start font-bold uppercase">5 mas vendidos en el mes</h1>
          <GraficaEstadistica datos={datosPanel?.topProductos} />
          <TablaProductosTop datos={datosPanel?.topProductosTabla} />
        </Card>
        <Card className='w-full flex flex-col justify-center'>
          <h1 className=" ml-5 mt-4 text-center text-zinc-400 md:text-start font-bold uppercase">Actividad en el negocio</h1>
          <TablaRegistro />
        </Card>
      </div>
      <div className='flex flex-col md:flex-row justify-center md:space-x-3 space-y-3 md:space-y-0 w-[95%]'>
        <Card className='min-w-[50%] min-h-full'>
          <h1 className=" ml-5 mt-4 text-center text-zinc-400 md:text-start font-bold uppercase">Equipo de trabajo</h1>
          <TablaEquipoTrabajo />
        </Card>
        <Card className='min-w-[50%] h-full'>
          <h1 className=" ml-5 mt-4 text-center text-zinc-400 md:text-start font-bold uppercase">Usuarios reistrados</h1>
          <TablaUsuarios />
        </Card>
      </div>
    </div>
  )
}

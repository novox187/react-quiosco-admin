import { useEffect, useState, useRef } from "react";
import ApexCharts from 'apexcharts';
import { Card, CardBody, Skeleton, Button } from "@heroui/react"
import { formatearDinero } from "../../../helpers"
import useAdmin from "../../../hooks/useAdmin";
import clienteAxios from "../../../config/axios";

export default function Caja() {

    const chartRef = useRef(null);
    const [chartRendered, setChartRendered] = useState(false);
    const { setModalAbrirCaja, setModalCerrarCaja, setDatosCaja, datosCaja } = useAdmin();
    const [colorBoton, setColorBoton] = useState('danger');

    // v1: GET /caja/cajas — devuelve lista; usamos la primera con apertura activa si existe.
    const obtenerDatosCaja = async () => {
        try {
            const { data } = await clienteAxios.get('/caja/cajas');
            const cajaConApertura = data.find((c) => c.aperturas?.length > 0) ?? data[0];
            setDatosCaja({
                caja: cajaConApertura,
                apertura: cajaConApertura?.aperturas?.[0] ?? null,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerDatosCaja();
    }, []);
    
    useEffect(() => {
        if (datosCaja.estado === 1) {
            setColorBoton('danger')
        } else {
            setColorBoton('success')
        }
    }, [datosCaja]);

    useEffect(() => {
        if (!chartRendered) {
            var optionsSpark = {
                chart: {
                    id: 'sparkline1',
                    type: 'line',
                    height: 30,
                    sparkline: {
                        enabled: true
                    },
                    group: 'sparklines'
                },
                series: [{
                    name: '',
                    data: datosCaja.historia
                }],
                stroke: {
                    curve: 'straight'
                },
                markers: {
                    size: 0,
                },
                colors: ['#108d45']
            }
            if (chartRef.current) {
                new ApexCharts(chartRef.current, optionsSpark).render();
                setChartRendered(true);
            }
        }
    }, [datosCaja, chartRendered]);

    if (datosCaja.length == 0) {
        return (
            <Card className=" bg-zinc-900 text-white shadow-xl p-3  min-w-[17rem] sm:min-w-[20rem] 2xl:min-w-[22rem] w-full">
                <CardBody className=" flex justify-between">
                    <div className="flex justify-between">
                        <Skeleton className="w-[3rem] rounded-lg">
                            <div className="h-3 rounded-lg bg-default-800"></div>
                        </Skeleton>
                        <Skeleton className="w-[4rem] rounded-md">
                            <div className="h-4 w-4/5 rounded-md bg-default-800"></div>
                        </Skeleton>
                    </div>
                    <div>
                        <Skeleton className="w-[6rem] mt-2 rounded-xl">
                            <div className="h-5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                    <div className="flex space-x-3">
                        <Skeleton className="text-xl mt-7 w-[2.5rem] rounded-md">
                            <div className="h-5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <Skeleton className="text-xl mt-7 w-[6rem] rounded-xl">
                            <div className="h-3 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                </CardBody>
            </Card>
        )
    }
    return (
        <Card className="bg-zinc-900 text-white shadow-xl p-3 min-w-[17rem] sm:min-w-[18rem] 2xl:min-w-[22rem] w-full">
            <CardBody className="flex flex-row items-center justify-between">
                <div>
                    <div className="flex justify-between">
                        <h2>Caja</h2>
                    </div>
                    <h1 className="flex text-2xl py-3">
                        {formatearDinero(datosCaja.caja)}
                    </h1>

                    <div className=" w-20 md:w-40 max-h-16 overflow-hidden">
                        <div id="spark" className=" text-black" ref={chartRef}></div>
                    </div>
                </div>
                <div className=" flex flex-col justify-center items-center space-y-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="size-16 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                    <Button
                        size="sm"
                        color={colorBoton}
                        variant="flat"
                        onClick={() => {
                            if (datosCaja.estado > 0) {
                                setModalCerrarCaja(true)
                            } else {
                                setModalAbrirCaja(true)
                            }
                        }}
                    >
                        {datosCaja.estado > 0 ? (

                            'Cerrar Caja'
                        ) : (
                            'Abrir caja'
                        )}
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}

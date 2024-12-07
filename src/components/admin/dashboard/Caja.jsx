import { useEffect, useState, useRef } from "react";
import ApexCharts from 'apexcharts';
import { Card, CardBody, Skeleton, Button } from "@nextui-org/react"
import { formatearDinero } from "../../../helpers"
import useAdmin from "../../../hooks/useAdmin";
import clienteAxios from "../../../config/axios";
import CajaIcono from "../../icons/CajaIcono";
import { useNavigate } from "react-router-dom";

export default function Caja() {
    const {setDatosCaja, datosCaja,token } = useAdmin();
    const navigate = useNavigate();

    const obtenerDatosCaja = async () => {
        try {
            const { data } = await clienteAxios("/api/caja", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            setDatosCaja(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerDatosCaja();
    }, []);

    if (datosCaja == null) {
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
                        <h2 className="text-xl">Cajas activas</h2>
                    </div>
                    <h1 className="flex text-4xl py-3">
                        {datosCaja.length || 0}
                    </h1>
                </div>
                <div className=" flex flex-col justify-center items-center space-y-4">
                    <CajaIcono size={40} />
                    <Button
                        variant="flat"
                        onPress={() => navigate('/admin/cajas')}
                    >
                        Ver cajas
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}

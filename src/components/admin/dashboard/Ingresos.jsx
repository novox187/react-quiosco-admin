import { Card, CardBody, Chip, Skeleton } from "@nextui-org/react"
import { formatearDinero } from "../../../helpers"
export default function Ingresos({ datos }) {
    if (!datos) {
        return (
            <Card className=" bg-zinc-900 text-white shadow-xl p-3 min-w-[17rem] sm:min-w-[20rem] 2xl:min-w-[25rem] w-full">
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
    const { nombre, fecha, cantidad, comparacion, fechaComparacion, tipo } = datos
    return (

        <Card className=" bg-zinc-900 text-white shadow-xl p-3 min-w-[17rem] sm:min-w-[18rem] 2xl:min-w-[22rem] w-full">
            <CardBody>
                <div>
                    <div className="flex justify-between">
                        <h2>{nombre}</h2>
                        <Chip
                            classNames={{
                                content: "text-white",
                                base: "bg-zinc-700 shadow-md shadow-zinc-800",
                            }}
                            color="success"
                            radius="sm"
                            size="sm">{fecha}</Chip>
                    </div>
                    <h1 className="flex text-2xl py-3">{`${tipo === 'dinero' ? '' : ''}`}{tipo === 'usuarios' &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>

                    }{tipo === 'usuarios' ? cantidad : formatearDinero(cantidad)}</h1>
                    <div className=" space-x-3">
                        <Chip
                            color={`${comparacion < 0 ? 'danger' : 'success'}`}
                            radius="sm"
                            variant="flat"
                            size="sm">{comparacion < 0 ? '' : '+'}{comparacion}%</Chip>
                        <span className=" text-zinc-400"> {fechaComparacion}</span>
                    </div>
                </div>
            </CardBody>
        </Card>

    )
}

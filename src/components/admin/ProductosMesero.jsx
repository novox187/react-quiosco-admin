import { Card, CardHeader, CardBody, Image, Button, Chip } from "@nextui-org/react";
import { formatearTextoVista } from "../../helpers";
import { formatearDinero } from "../../helpers";
import useAdmin from "../../hooks/useAdmin";

export default function ProductosMesero({ producto }) {

    const { handleSetProducto, handleclickModalProductoMesero } = useAdmin();

    const { nombre, imagen, precio, created_at, promocion, descripcion, peso, tipo_peso } = producto;

    const fechaActual = new Date();
    const fechaProducto = new Date(created_at);

    const diferenciaMilisegundos = fechaActual - fechaProducto;
    const diasTranscurridos = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
    return (
        <Card className="flex flex-col flex-grow py-3 bg-zinc-900 text-white min-h-[13rem] h-full md:min-h-[17rem] 2xl:min-h-[20rem] max-w-[20rem]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start z-0 overflow-hidden  relative">

                <div className=" absolute z-10 md:space-x-1 pr-3">
                    {diasTranscurridos <= 30 && (
                        <Chip
                            classNames={{
                                content: "text-green",
                                base: "bg-white",
                            }}
                            color="success"
                            variant="bordered"
                            size="sm"
                        >
                            Nuevo
                        </Chip>
                    )}
                    {promocion && (
                        <Chip
                            classNames={{
                                content: "text-green",
                                base: "bg-white",
                            }}
                            color="warning"
                            variant="bordered"
                            size="sm"
                        >
                            -{promocion.descuento}%
                        </Chip>
                    )}
                </div>

                <Image
                    disableSkeleton={true}
                    alt="Card background"
                    className="object-cover rounded-xl z-0  max-h-[7rem] md:max-h-[9rem] min-h-[7rem] md:min-h-[9rem]"
                    src={imagen}
                    width={'100%'}
                />
            </CardHeader>
            <CardBody className="flex flex-col justify-between items-center overflow-visible py-2">
                <h4 className="font-bold text-large">{formatearTextoVista(nombre)}</h4>
                <p className="w-full leading-7 py-1 overflow-hidden line-clamp-2" >{formatearTextoVista(descripcion)}</p>
                <div className="flex flex-row w-full items-center justify-between pt-2">
                    <div className="leading-tight">
                        <h3 className="text-red-800 font-bold text-sm md:text-base">{formatearDinero(precio)} USD.</h3>
                        <small className="text-zinc-500  ">{peso} <span className=" text-mini">{tipo_peso}</span></small>
                    </div>
                    <Button isIconOnly color="danger" variant="faded" aria-label="Take a photo" size="sm" onClick={() => [handleclickModalProductoMesero(), handleSetProducto(producto)]}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}

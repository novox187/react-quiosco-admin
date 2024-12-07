import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useState } from "react";
import clienteAxios from '../../../config/axios';
import useAdmin from "../../../hooks/useAdmin";
import { toast } from "react-toastify";

export default function ModalCerrarCaja({ caja, setDatosCajas }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [dinero, setDinero] = useState(0);
    const [confirmacion, setConfirmacion] = useState("");
    const [loadingCerrarCaja, setLoadingCerrarCaja] = useState(false);
    const { token, socketConnection } = useAdmin();

    const cerrarCaja = async () => {
        if (confirmacion.toLowerCase() !== "confirmar") {
            alert("Debe ingresar 'confirmar' para cerrar la caja.");
            return;
        }

        setLoadingCerrarCaja(true);
        try {
            const { data } = await clienteAxios.post('api/caja/cerrar', {
                caja_id: caja.id,
                monto_final: dinero,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            toast.success('Caja cerrada con éxito');
            onOpenChange(false); // Cerrar el modal
            setDatosCajas(prevCajas => actualizarCajaCierre(prevCajas, data));
            let cajaestado = {
                estado: data.estadoCaja,
            };
            socketConnection.emit("onCierreCaja", cajaestado);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoadingCerrarCaja(false);
        }
    };

    function actualizarCajaCierre(stateCajas, datosRespuesta) {
        // Buscar la caja que coincide con el id_caja de la respuesta del servidor
        const indiceCaja = stateCajas.findIndex(caja => caja.id === datosRespuesta.id_caja);

        if (indiceCaja !== -1) {
            // Actualizar la caja con la información de la respuesta
            stateCajas[indiceCaja] = {
                ...stateCajas[indiceCaja],
                estado: datosRespuesta.estadoCaja,
                ultimo_cierre: {
                    id: datosRespuesta.id,
                    id_caja: datosRespuesta.id_caja,
                    monto_final: datosRespuesta.monto_final,
                    usuario_cierre: datosRespuesta.usuario_cierre,
                    total_ventas: datosRespuesta.total_ventas,
                    created_at: datosRespuesta.created_at,
                    updated_at: datosRespuesta.updated_at
                }
            };
        }

        return [...stateCajas]; // Retornar una copia del arreglo actualizado
    }

    return (
        <>
            <Button onPress={onOpen} variant="flat" color="danger" className={`${!caja.estado && ' hidden'}`}>Cerrar</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 uppercase">Cierre de caja {caja.nombre_caja}</ModalHeader>
                            <ModalBody>
                                <p className="text-sm text-zinc-300 text-center animate-bounce">Recuerda que para cerrar la caja no deben haber pedidos pendientes.</p>
                                <Input
                                    type="number"
                                    label="Dinero total"
                                    placeholder="0.00"
                                    labelPlacement="outside"
                                    onChange={(e) => setDinero(e.target.value)}
                                    min={0}
                                    description='Haga la contabilidad para el efectivo físico y anote el dinero resultante.'
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">$</span>
                                        </div>
                                    }
                                />
                                <Input
                                    type="text"
                                    label="Verifica que quieres cerrar la caja"
                                    placeholder="confirmar"
                                    labelPlacement="outside"
                                    onChange={(e) => setConfirmacion(e.target.value)}
                                    description='Ingresa la palabra "confirmar" para cerrar caja.'
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={cerrarCaja} isLoading={loadingCerrarCaja} disabled={loadingCerrarCaja}>
                                    Cerrar Caja
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

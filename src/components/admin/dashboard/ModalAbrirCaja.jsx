import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import useAdmin from "../../../hooks/useAdmin";
import { useState } from "react";
import clienteAxios from "../../../config/axios";
import { toast } from "react-toastify";

export default function ModalAbrirCaja({ caja, setDatosCajas }) {
    const { isOpenAbrirCaja: isOpen, onOpenAbrirCaja: onOpen, onOpenChangeAbrirCaja: onOpenChange, token, onCloseAbrirCaja: onClose, socketConnection } = useAdmin();
    const [dinero, setDinero] = useState(0);
    const [loadingAbrirCaja, setLoadingAbrirCaja] = useState(false);

    const abrirCaja = async () => {
        setLoadingAbrirCaja(true)
        try {
            const { data } = await clienteAxios.post('api/caja/abrir', {
                caja_id: caja.id,
                monto_inicial: parseFloat(dinero), // Asegurarse de que el monto sea un número
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            // Utilizar la función de setDatosCajas para actualizar el estado actual
            setDatosCajas(prevCajas => actualizarCajaApertura(prevCajas, data));
            let cajaestado = {
                estado: data.estadoCaja,
            };
            socketConnection.emit("onAbrirCaja", cajaestado);
            toast.success('Caja abierta con éxito');
            onClose();
        } catch (error) {
            console.error('Error al abrir la caja:', error);
            toast.error(error.response?.data?.message || 'Error al abrir la caja');
        } finally {
            setLoadingAbrirCaja(false);
        }
    }

    const handleInputChange = (e) => {
        setDinero(e.target.value);
    }

    function actualizarCajaApertura(stateCajas, datosRespuesta) {
        // Buscar la caja que coincide con el id_caja de la respuesta del servidor
        const indiceCaja = stateCajas.findIndex(caja => caja.id === datosRespuesta.id_caja);

        if (indiceCaja !== -1) {
            // Actualizar la caja con la información de la respuesta
            stateCajas[indiceCaja] = {
                ...stateCajas[indiceCaja],
                estado: datosRespuesta.estadoCaja,
                ultima_apertura: {
                    id: datosRespuesta.id,
                    id_caja: datosRespuesta.id_caja,
                    monto_inicial: datosRespuesta.monto_inicial,
                    usuario_apertura: datosRespuesta.usuario_apertura,
                    created_at: datosRespuesta.created_at,
                    updated_at: datosRespuesta.updated_at
                }
            };
        }

        return [...stateCajas]; // Retornar una copia del arreglo actualizado
    }

    return (
        <>
            <Button onPress={onOpen} className={`${caja.estado && ' hidden'}`} >Abrir</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 uppercase">Abrir caja {caja.nombre_caja}</ModalHeader>
                            <ModalBody>
                                <Input
                                    type="number"
                                    label="Dinero de apertura"
                                    placeholder="0.00"
                                    labelPlacement="outside"
                                    onChange={handleInputChange}
                                    min={0}
                                    max={380}
                                    description='El dinero que se deposite quedará de base para que puedan dar cambio en caso de que lo necesiten.'
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">$</span>
                                        </div>
                                    }
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" isDisabled={loadingAbrirCaja} onPress={onClose}>
                                    Close
                                </Button>
                                <Button onPress={abrirCaja} disabled={caja.estado} isLoading={loadingAbrirCaja}>Abrir</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
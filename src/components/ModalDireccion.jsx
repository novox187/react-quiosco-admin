import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@heroui/react'
import React, { createRef, useRef, useState } from 'react'
import MapaVista from './MapaLeaflet/MapaVista'
import useQuiosco from '../hooks/useQuiosco';

export default function ModalDireccion({ isOpen, onOpenChange }) {
    const { setUbicacionEntrega, ubicacionEntrega } = useQuiosco();
    const telefonoRef = createRef();
    const comentariaRef = createRef();
    const [numerovalido, setNumerovalido] = useState(false)

    const handleClickGuardarDireccion = (onClose) => {
        if (ubicacionEntrega && ubicacionEntrega.direccion) {
            if (telefonoRef.current.value.length == 9 && numerovalido == false) {
                setUbicacionEntrega({ ...ubicacionEntrega, datos: { telefono: telefonoRef.current.value, comentario: comentariaRef.current.value } });
                onClose()
            } else {
                setNumerovalido(true)
            }
        } else {
            alert('Elije una direccion')
        }
    }

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length > 9) {
            setNumerovalido(true)
        } else (
            setNumerovalido(false)
        )
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className='overflow-x-hidden items-center bg-tercero text-segundo'
            scrollBehavior='inside'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h1 className='flex items-center font-bold uppercase'>Indica tu ubicacion</h1>
                        </ModalHeader>
                        <ModalBody className='flex flex-col h-full w-full space-y-2 '>
                            <MapaVista ubicacionEntrega={ubicacionEntrega} setUbicacionEntrega={setUbicacionEntrega} />
                            <Input
                                type="number"
                                label={<span className='text-segundo'>Telefono</span>}
                                startContent='+593'
                                placeholder="123456789"
                                defaultValue={ubicacionEntrega?.datos?.telefono || ''}
                                maxLength={8}
                                classNames={{
                                    label: " text-segundo",
                                    input: [
                                      "bg-transparent",
                                      "text-segundo",
                                      "placeholder:text-segundo/50 dark:placeholder:text-white/60",
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
                                  }}
                                isRequired
                                ref={telefonoRef}
                                isInvalid={numerovalido}
                                errorMessage="El numero debe ser de nueve cifras"
                                onChange={handleInputChange}
                            />
                            <Textarea
                                label={<span className='text-segundo'>Descripción</span>}
                                placeholder="Escribe mas informacion sobre tu direccion."
                                classNames={{
                                    label: " text-segundo",
                                    input: [
                                      "bg-transparent",
                                      "text-segundo",
                                      "placeholder:text-segundo/50 dark:placeholder:text-white/60",
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
                                  }}
                                ref={comentariaRef}
                            />

                        </ModalBody>
                        <ModalFooter>
                            <Button
                                variant="flat"
                                className='w-full uppercase font-bold bg-cuarto text-tercero'
                                size='lg'
                                onPress={() => handleClickGuardarDireccion(onClose)}
                            >
                                guardar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

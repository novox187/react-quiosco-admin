import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@nextui-org/react";
import MasIcono from '../../icons/MasIcono';
import Registro from '../../../views/Registro';
import useAdmin from '../../../hooks/useAdmin';

export default function ModalNuevoTrabajador() {
    const { isOpenCrearEmployee: isOpen, onOpenCrearEmployee: onOpen, onOpenChangeCrearEmployee: onOpenChange } = useAdmin();
    return (
        <>
            <Button onPress={onOpen} variant='flat' endContent={<MasIcono className="size-5" />} >Nuevo</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Nuevo trabajador</ModalHeader>
                            <ModalBody className='pb-5'>
                                <Registro />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox, Select, SelectItem } from "@nextui-org/react";
import useAdmin from '../../../hooks/useAdmin';
import clienteAxios from '../../../config/axios';
import { toast } from 'react-toastify';

export default function ModalEditarEmployee() {
    const { isOpenEditarEmployee: isOpen, onOpenChangeEditarEmployee: onOpenChange, token, employeeVer,socketConnection } = useAdmin();
    const [employeeEdit, setEmployeeEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const obtenerEmployee = async () => {
        if (employeeVer.id) {
            setIsLoading(true);
            setError(null);
            try {
                const { data } = await clienteAxios(`/api/employee/${employeeVer.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEmployeeEdit(data);
            } catch (error) {
                console.error(error);
                setError('Error al cargar los datos del empleado');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeEdit(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name) => {
        setEmployeeEdit(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const handleRoleChange = (name, value) => {
        setEmployeeEdit(prev => ({
            ...prev,
            rol: { ...prev.rol, [name]: value }
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await clienteAxios.put(`/api/employee/editar/${employeeVer.id}`, employeeEdit, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onOpenChange(false);
            socketConnection.emit("onEditarEmployee", data.employee);
            toast.success('Empleado actualizado correctamente');
            // Aquí podrías añadir una notificación de éxito
        } catch (error) {
            console.error(error);
            setError('Error al guardar los cambios');
            toast.error('Error al guardar los cambios');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            obtenerEmployee();
        }
    }, [isOpen, employeeVer]);

    return (
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
            size='5xl' 
            scrollBehavior='inside'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 p-6">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Editar Detalles del Empleado</h2>
                        </ModalHeader>
                        <ModalBody>
                            {isLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <p className="text-gray-500 dark:text-gray-400">Cargando información del empleado...</p>
                                </div>
                            ) : error ? (
                                <div className="flex justify-center items-center h-64">
                                    <p className="text-red-500">{error}</p>
                                </div>
                            ) : employeeEdit ? (
                                <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                    <Input
                                        label="Nombre"
                                        name="first_name"
                                        value={employeeEdit.first_name || ''}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                    <Input
                                        label="Apellido"
                                        name="last_name"
                                        value={employeeEdit.last_name || ''}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                    <Input
                                        label="Email"
                                        name="email"
                                        value={employeeEdit.email || ''}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                    <Input
                                        label="Teléfono"
                                        name="phone"
                                        value={employeeEdit.phone || ''}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                    <Input
                                        label="Salario"
                                        name="salary"
                                        type="number"
                                        value={employeeEdit.salary || ''}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                    <Input
                                        label="Posición"
                                        name="position"
                                        value={employeeEdit.position || ''}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                    <Input
                                        label="Departamento"
                                        name="department"
                                        value={employeeEdit.department || ''}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                    <Input
                                        label="Dirección"
                                        name="address"
                                        value={employeeEdit.address || ''}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                    <Select
                                        label="Activo"
                                        name="active"
                                        selectedKeys={[employeeEdit.active ? 'true' : 'false']}
                                        onChange={(e) => handleCheckboxChange('active')}
                                        className="w-full"
                                    >
                                        <SelectItem key="true" value={true}>Sí</SelectItem>
                                        <SelectItem key="false" value={false}>No</SelectItem>
                                    </Select>
                                    <Input
                                        label="Nombre de Usuario"
                                        name="username"
                                        value={employeeEdit.username || ''}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
{/*                                     <div className="col-span-full">
                                        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Permisos:</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Checkbox
                                                isSelected={employeeEdit.rol?.eliminar}
                                                onValueChange={(checked) => handleRoleChange('eliminar', checked)}
                                            >
                                                Eliminar
                                            </Checkbox>
                                            <Checkbox
                                                isSelected={employeeEdit.rol?.editar}
                                                onValueChange={(checked) => handleRoleChange('editar', checked)}
                                            >
                                                Editar
                                            </Checkbox>
                                            <Checkbox
                                                isSelected={employeeEdit.rol?.ver}
                                                onValueChange={(checked) => handleRoleChange('ver', checked)}
                                            >
                                                Ver
                                            </Checkbox>
                                            <Checkbox
                                                isSelected={employeeEdit.rol?.preparar_pedidos}
                                                onValueChange={(checked) => handleRoleChange('preparar_pedidos', checked)}
                                            >
                                                Preparar Pedidos
                                            </Checkbox>
                                            <Checkbox
                                                isSelected={employeeEdit.rol?.entregar_pedidos}
                                                onValueChange={(checked) => handleRoleChange('entregar_pedidos', checked)}
                                            >
                                                Entregar Pedidos
                                            </Checkbox>
                                        </div>
                                    </div> */}
                                </form>
                            ) : null}
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                color="danger" 
                                variant="light" 
                                onPress={onClose}
                                className="hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200"
                            >
                                Cancelar
                            </Button>
                            <Button 
                                color="primary" 
                                variant="solid" 
                                onPress={handleSubmit}
                                isLoading={isLoading}
                                className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
                            >
                                Guardar Cambios
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
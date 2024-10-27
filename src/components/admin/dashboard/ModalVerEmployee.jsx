import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import useAdmin from '../../../hooks/useAdmin';
import clienteAxios from '../../../config/axios';

export default function ModalVerEmployee() {
  const { isOpenVerEmployee: isOpen, onOpenChangeVerEmployee: onOpenChange, token, employeeVer } = useAdmin();
  const [employeeQuery, setEmployeeQuery] = useState(null);

  const obtenerEmployee = async () => {
    if (employeeVer.id) {
      try {
        const { data } = await clienteAxios(`/api/employee/${employeeVer.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmployeeQuery(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    obtenerEmployee();
  }, [employeeVer]);

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
            <ModalHeader>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Detalles del Empleado</h2>
            </ModalHeader>
            <ModalBody>
              {employeeQuery ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <InfoItem label="Nombre" value={`${employeeQuery.first_name} ${employeeQuery.last_name}`} />
                  <InfoItem label="Email" value={employeeQuery.email} />
                  <InfoItem label="Teléfono" value={employeeQuery.phone} />
                  <InfoItem label="Salario" value={`$${employeeQuery.salary}`} />
                  <InfoItem label="Posición" value={employeeQuery.position} />
                  <InfoItem label="Departamento" value={employeeQuery.department} />
                  <InfoItem label="Dirección" value={employeeQuery.address} />
                  <InfoItem label="Fecha de Contratación" value={new Date(employeeQuery.hire_date).toLocaleDateString()} />
                  <InfoItem label="Activo" value={employeeQuery.active ? 'Sí' : 'No'} />
                  <InfoItem label="Nombre de Usuario" value={employeeQuery.username} />
                  <InfoItem label="Rol" value={employeeQuery.rol.rol} />
                  <div className="col-span-full">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Permisos:</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      <PermissionItem label="Eliminar" value={employeeQuery.rol.eliminar} />
                      <PermissionItem label="Editar" value={employeeQuery.rol.editar} />
                      <PermissionItem label="Ver" value={employeeQuery.rol.ver} />
                      <PermissionItem label="Preparar Pedidos" value={employeeQuery.rol.preparar_pedidos} />
                      <PermissionItem label="Entregar Pedidos" value={employeeQuery.rol.entregar_pedidos} />
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <p className="text-gray-500 dark:text-gray-400">Cargando información del empleado...</p>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button 
                color="danger" 
                variant="light" 
                onPress={onClose}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

const InfoItem = ({ label, value }) => (
  <div className="bg-white dark:bg-zinc-800 p-2.5 rounded-xl shadow-sm">
    <p className="text-[12px] font-medium text-gray-500 dark:text-gray-400">{label}</p>
    <p className="mt-0.2 text-lg font-semibold text-gray-900 dark:text-gray-100">{value}</p>
  </div>
);

const PermissionItem = ({ label, value }) => (
  <li className={`flex items-center justify-between p-2 rounded ${value ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'}`}>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
    <span className={`px-2 py-1 text-xs font-semibold rounded ${value ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100' : 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100'}`}>
      {value ? 'Sí' : 'No'}
    </span>
  </li>
);
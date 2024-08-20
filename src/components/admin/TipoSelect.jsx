import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function TipoSelect({ setSelectedKeys, selectedKeys }) {
    const handleSelectionChange = (key) => {
        setSelectedKeys(key.anchorKey); // Guardar el key como cadena de texto en selectedKeys
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="ligth"
                    className=" bg-zinc-800"
                    size="md"
                    isIconOnly
                >
                    {selectedKeys}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={handleSelectionChange} // Utilizar la función handleSelectionChange para manejar el cambio de selección
            >
                <DropdownItem key="g">Gramos</DropdownItem>
                <DropdownItem key="ml">Mili litros</DropdownItem>
                <DropdownItem key="lt">Litros</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
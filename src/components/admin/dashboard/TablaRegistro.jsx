import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../../../config/axios";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Pagination,
    Spinner,
} from "@heroui/react";
import { columns, statusOptions } from "../../../data/data3";
import { formatearTextoVista } from "../../../helpers";
import useAdmin from "../../../hooks/useAdmin";

const statusColorMap = {
    activo: "success",
    vacaciones: "warning",
    despedido: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["id", "responsable", "rol", "accion", "opciones"];

export default function TablaRegistro() {

    const { setRegistros, registros } = useAdmin();
    const navigate = useNavigate();

    const handleClickRegistro = (id) => {
        navigate(`/admin/registro/${id}`)
    }

    const token = localStorage.getItem("AUTH_TOKEN");

    const user = async () => {
        try {
            const { data } = await clienteAxios("/api/registros", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            setRegistros(data.data)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        user();
    }, []);

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...registros];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.accion),
            );
        }

        return filteredUsers;
    }, [registros, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);



    const renderCell = React.useCallback((registro, columnKey) => {
        const cellValue = user[columnKey];
        let color;

        switch (columnKey) {
            case "id":

                if (registro.accion == 'entrega') {
                    color = 'bg-green-400'
                }
                if (registro.accion == 'cobro') {
                    color = 'bg-green-800'
                }
                if (registro.accion == 'preparacion') {
                    color = 'bg-blue-500'
                }
                if (registro.accion == 'editar') {
                    color = 'bg-yellow-500'
                }
                if (registro.accion == 'cambiar_estado') {
                    color = 'bg-yellow-500'
                }

                if (registro.accion == 'eliminar') {
                    color = 'bg-red-800'
                }
                if (registro.accion == 'cambiar_categoria') {
                    color = 'bg-purple-700'
                }
                if (registro.accion == 'crear') {
                    color = 'bg-green-800'
                }
                if (registro.accion == 'abrir_caja') {
                    color = 'bg-green-500'
                }
                if (registro.accion == 'cerrar_caja') {
                    color = 'bg-red-800'
                }
                return (
                    <>
                        <span className={`${color} p-0.5 mr-2 rounded-full `}>
                        </span>
                        {registro.id}
                    </>
                );
            case "responsable":
                return (
                    <Chip size="sm">
                        {registro.employee.name}
                    </Chip>
                );
            case "rol":
                return (
                    <Chip size="sm" className=" ">
                        {registro.employee.rol}
                    </Chip>
                );
            case "accion":
                let accionModificado
                if (registro.accion == 'entrega') {
                    accionModificado = 'Entregò el pedido '
                    color = 'border-green-500'
                }
                if (registro.accion == 'cobro') {
                    accionModificado = 'Cobrò el pedido '
                }
                if (registro.accion == 'preparacion') {
                    accionModificado = 'Preparo los alimentos del pedido '
                }
                if (registro.accion == 'editar' && registro.producto !== null) {
                    accionModificado = 'Editò el producto '
                }
                if (registro.accion == 'editar' && registro.categoria !== null) {
                    accionModificado = 'Editò la categoria '
                }
                if (registro.accion == 'cambiar_estado' && registro.detalle.disponible == 0) {
                    accionModificado = 'Marco como agotado al producto '
                }
                if (registro.accion == 'cambiar_estado' && registro.detalle.disponible == 1) {
                    accionModificado = 'Marco como disponible el producto '
                }
                if (registro.accion == 'eliminar' && registro.producto !== null) {
                    accionModificado = 'Elimino el producto '
                }
                if (registro.accion == 'eliminar' && registro.categoria !== null) {
                    accionModificado = 'Elimino la categoria '
                }
                if (registro.accion == 'eliminar' && registro.pedido !== null) {
                    accionModificado = 'Elimino el pedido '
                }
                if (registro.accion == 'cambiar_categoria') {
                    accionModificado = 'Cambio de categoria el producto '
                }
                if (registro.accion == 'crear' && registro.producto !== null) {
                    accionModificado = 'Creo el producto '
                }
                if (registro.accion == 'crear' && registro.categoria !== null) {
                    accionModificado = 'Creo la categoria '
                }
                if (registro.accion == 'crear' && registro.promocion !== null) {
                    accionModificado = 'Creo la promocion '
                }
                if (registro.accion == 'abrir_caja') {
                    accionModificado = 'Abrio caja con '
                }
                if (registro.accion == 'cerrar_caja') {
                    accionModificado = 'Cerro caja con '
                }
                return (
                    <p className="line-clamp-1">
                        {accionModificado}
                        {
                            formatearTextoVista(registro.pedido && registro.pedido.numero_pedido ? registro.pedido.numero_pedido :
                                registro.categoria && registro.categoria.nombre ? registro.categoria.nombre :
                                    registro.producto && registro.producto.nombre ? registro.producto.nombre : registro.accion == 'abrir_caja' ? registro.detalle[0].dinero_abrir + '$' : registro.accion == 'cerrar_caja' ? registro.detalle[0].dinero_cerrar + '$' : registro.promocion.nombre ? registro.promocion.nombre :
                                        'sin definir')
                        }
                    </p>
                );
            case "opciones":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                    </svg>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={() => handleClickRegistro(registro.id)}>Ver</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Bucar por usuario..."
                        startContent={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        }
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex z-0">
                                <Button endContent={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>

                                } variant="flat">
                                    Estado
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {registros.length} registros</span>
                    <label className="flex items-center text-default-400 text-small">
                        Fila de página:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="6">6</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        registros.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-center items-center z-0">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            aria-label="Tabla de equipo de trabajo"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[432px]",
            }}
            className="flex justify-between p-2 h-full"

            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={"No hay registros"}
                items={sortedItems}
            >
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}


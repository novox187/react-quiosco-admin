import React, { useEffect, useState, useMemo, useCallback } from "react";
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
    User,
    Pagination
} from "@nextui-org/react";
import { formatearDinero, formatearTextoVista } from "../helpers";
import BuscarIcono from "../components/icons/BuscarIcono";
import OpcionesIcono from "../components/icons/OpcionesIcono";
import useAdmin from "../hooks/useAdmin";
import Usuario from "../components/Usuario";
import OjoIcono from "../components/icons/OjoIcono";
import { useNavigate } from "react-router-dom";

const columns = [
    { name: "PRODUCTO", uid: "producto" },
    { name: "PRECIO", uid: "precio", sortable: true },
    { name: "ESTADO", uid: "estado", sortable: true },
    { name: "DESCUENTO", uid: "descuento" },
    { name: "ACCIONES", uid: "acciones" }
];

const statusColorMap = {
    1: "success",
    0: "danger"
};

const INITIAL_VISIBLE_COLUMNS = ["producto", "precio", "estado", "descuento", "acciones"];

export default function ProductosTable() {
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "precio",
        direction: "ascending"
    });
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState(new Set(["all"]));
    const navigate = useNavigate();

    const {
        productoQuery,
        modalCrearPromo,
        setModalCrearPromo,
        modalCrearProducto,
        setModalCrearProducto,
        handleClickProductoAgotado,
        setProductoEditar,
        setModalEditarProducto,
        modalEditarProducto,
        setProductoEliminar,
        setModalEliminarProducto,
        modalEliminarProducto
    } = useAdmin();

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        return Array.from(visibleColumns).map((columnUid) =>
            columns.find((column) => column.uid === columnUid)
        );
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        if (!productoQuery?.data) return [];

        let filteredProducts = [...productoQuery.data];


        if (hasSearchFilter) {
            filteredProducts = filteredProducts.filter((product) =>
                product?.nombre?.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        if (!statusFilter.has("all")) {
            filteredProducts = filteredProducts.filter((product) =>
                statusFilter.has(product?.disponible ? "disponible" : "agotado")
            );
        }

        return filteredProducts;
    }, [productoQuery?.data, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = useCallback((producto, columnKey) => {
        const handleClickDatosProducto = (id, nombre, precio, peso, tipo_peso, descripcion, categoria, imagen, promo_id, opciones_producto) => {

            const datosProducto = {
                id: id,
                imagen: imagen,
                nombre: nombre,
                precio: precio,
                peso: peso,
                tipo_peso: tipo_peso,
                opciones_producto: opciones_producto,
                descripcion: descripcion,
                categoria_id: categoria,
                promo_id: promo_id,
            }
            setProductoEditar(datosProducto);
            setModalEditarProducto(!modalEditarProducto)

        }
        switch (columnKey) {
            case "producto":
                return (
                    <User
                        avatarProps={{
                            radius: "lg",
                            src: producto?.imagen || "",
                            className: "w-14 h-14 hover:scale-150 transition-all cursor-pointer min-w-[3.5rem] min-h-[3.5rem]"
                        }}
                        description={(producto?.descripcion || "").slice(0, 50) + "..."}
                        name={formatearTextoVista(producto?.nombre) || "Sin nombre"}
                    />
                );
            case "precio":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small">{formatearDinero(producto?.precio || 0)}</p>
                    </div>
                );
            case "estado":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[producto?.disponible]}
                        size="sm"
                        variant="flat"
                    >
                        {producto?.disponible ? "Disponible" : "Agotado"}
                    </Chip>
                );
            case "descuento":
                return producto?.promocion ? (
                    <Chip color="warning" variant="flat" size="sm">
                        -{producto.promocion.descuento}%
                    </Chip>
                ) : null;
            case "acciones":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light" aria-label="Opciones">
                                    <OpcionesIcono />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Opciones del producto">
                                <DropdownItem
                                    key="toggle-status"
                                    color="primary"
                                    className="text-primary"
                                    onClick={() => handleClickProductoAgotado(producto?.id, producto?.disponible)}
                                >
                                    {producto?.disponible ? "Marcar como Agotado" : "Marcar como Disponible"}
                                </DropdownItem>
                                <DropdownItem
                                    key="edit"
                                    onClick={() => {
                                        handleClickDatosProducto(producto.id, producto.nombre, producto.precio, producto.peso, producto.tipo_peso, producto.descripcion, producto.categoria_id, producto.imagen, producto.promo_id, producto.contenedor_opciones);
                                    }}
                                >
                                    Editar
                                </DropdownItem>
                                <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    onClick={() => {
                                        setProductoEliminar(producto);
                                        setModalEliminarProducto(!modalEliminarProducto);
                                    }}
                                >
                                    Eliminar
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return producto[columnKey] || "-";
        }
    }, [handleClickProductoAgotado, setModalEditarProducto, setProductoEditar, setProductoEliminar, setModalEliminarProducto, modalEditarProducto, modalEliminarProducto]);

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Buscar por nombre..."
                        startContent={<BuscarIcono />}
                        value={filterValue}
                        onClear={() => setFilterValue("")}
                        onValueChange={(value) => {
                            setFilterValue(value);
                            setPage(1);
                        }}
                    />
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="flat" startContent={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                                </svg>

                            }>Filtrar</Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Filtrar por estado"
                            selectedKeys={statusFilter}
                            selectionMode="single"
                            onSelectionChange={setStatusFilter}
                        >
                            <DropdownItem key="all">Todos</DropdownItem>
                            <DropdownItem key="disponible">Disponible</DropdownItem>
                            <DropdownItem key="agotado">Agotado</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {filteredItems.length} productos
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Filas por página:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setPage(1);
                            }}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [filterValue, statusFilter, filteredItems.length]);

    const bottomContent = useMemo(() => {
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
    }, [page, pages]);

    return (
        <div className="flex flex-col gap-4 p-4 md:p-6 min-h-screen">
            <div className="lg:w-full hidden lg:flex justify-end">
                <Usuario />
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black">Productos</h1>
                <p className="text-2xl text-default-500">Gestiona, Crea y Edita el contenido de tu Negocio</p>
            </div>

            <div className='flex flex-col md:flex-row items-center w-full md:w-auto overflow-x-scroll'>
                <Button
                    className="bg-zinc-700 hover:bg-zinc-900 transition-colors px-3 text-white py-2.5 m-1"
                    onClick={() => setModalCrearPromo(!modalCrearPromo)}
                    size="sm"
                    endContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    }
                >
                    Descuento
                </Button>

                <Button
                    size="sm"
                    className="bg-zinc-700 hover:bg-zinc-900 px-3 text-white py-2.5 m-1"
                    onClick={() => setModalCrearProducto(!modalCrearProducto)}
                    endContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    }
                >
                    Producto
                </Button>

                <Button
                    size="sm"
                    className="bg-zinc-700 hover:bg-zinc-900 px-3 text-white py-2.5 m-1 min-w-[10rem]"
                    onClick={() => navigate('/admin/productos/contenedores')}
                    endContent={<OjoIcono className='size-4' />}
                >Contenedores opciones</Button>
            </div>

            <Table
                isHeaderSticky
                bottomContentPlacement="outside"
                sortDescriptor={sortDescriptor}
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
                topContent={topContent}
                bottomContent={bottomContent}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "acciones" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    emptyContent={"No hay productos disponibles"}
                    items={sortedItems}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
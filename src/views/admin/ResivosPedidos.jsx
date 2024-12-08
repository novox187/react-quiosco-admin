import { useEffect, useMemo, useState } from 'react'
import Usuario from '../../components/Usuario'
import clienteAxios from '../../config/axios';
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Spinner,
    Chip,
    spinner
} from '@nextui-org/react'
import { formatearFecha } from '../../helpers';
import { toast } from 'react-toastify';
import useAdmin from '../../hooks/useAdmin';

export default function ResivosPedidos() {
    const {token} = useAdmin();
    const [selectedKeys, setSelectedKeys] = useState("numero_pedido");
    const [pedidos, setPedidos] = useState([]);
    const [resultadoBusqueda, setResultadoBusqueda] = useState();
    const [loadingBusqueda, setLoadingBusqueda] = useState(false);
    const [sinResultados, setSinResultados] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [busquedaPedidos, setBusquedaPedidos] = useState("");
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;



    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };
    const handleBusquedaPedidosChange = (event) => {
        setBusquedaPedidos(event.target.value);
    };

    const pedidosFiltro = busqueda
        ? pedidos?.filter(pedido => (
            pedido.user.name.toLowerCase().includes(busqueda.toLowerCase()) ||
            pedido.numero_pedido.toLowerCase().includes(busqueda) ||
            formatearFecha(pedido.created_at).toLowerCase().includes(busqueda)
        ))
        : pedidos;
    const pages = Math.ceil(pedidosFiltro?.length / rowsPerPage);
    const pedidosPaginacion = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return pedidosFiltro?.slice(start, end);
    }, [page, pedidosFiltro, pedidos]);

    const handleSelectionChange = (key) => {
        setSelectedKeys(key.anchorKey); // Guardar el key como cadena de texto en selectedKeys
    };
    const obtenerPedidosCheques = async () => {
        try {
            const { data } = await clienteAxios('/api/pedidos/pedidosCheques', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (data?.pedidos?.length == 0) {
                setSinResultados(true)
            }
            setPedidos(data.pedidos)
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        obtenerPedidosCheques()
    }, []);

    const obtenerPedidosChequesBusqueda = async (pedido, tipo) => {
        if (pedido === "") {
            toast.error('La busqueda esta vacia')
        } else {
            setBusquedaPedidos("")
            setResultadoBusqueda()
            setLoadingBusqueda(true)
            const datosPedido = {
                pedido: pedido,
                tipo: tipo
            };
            try {
                const { data } = await clienteAxios.post('/api/pedidos/pedidosCheques/busqueda', datosPedido, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setResultadoBusqueda(data.pedidos)
                setLoadingBusqueda(false)
            } catch (error) {
                toast.warning('No se pudo encontrar el pedido deseado')
                setLoadingBusqueda(false)
            }
        }
    };

    return (
        <div className="m-2 space-y-2 text-mini md:text-base mb-40  h-dvh">
            <div className=" lg:w-full hidden lg:flex justify-end  lg:mr-10">
                <Usuario />
            </div>
            <div className=" flex flex-col justify-center items-center w-full">
                <h1 className='text-4xl font-black'>Resivos</h1>
                <p className='text-1xl text-white mb-10 mt-2 text-center'>
                    Imprime resivos y consulta pedidos
                </p>
            </div>
            <div className={`${sinResultados ? 'h-3/4' : ''} flex flex-col justify-center h- items-center space-y-5`}>
                <Card className='w-full p-2 md:p-5'>
                    <CardHeader>
                        <h1 className='m-auto font-bold'>Busca entre todos los pedidos existentes</h1>
                    </CardHeader>
                    <CardBody>
                        <div className='flex justify-center items-center space-x-1'>
                            <Input
                                placeholder={selectedKeys == 'numero_pedido' ? "A-000" : selectedKeys == 'id' && 'ID: 15'}
                                size='lg'
                                onChange={handleBusquedaPedidosChange}
                                value={busquedaPedidos}
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                    </div>
                                }
                                endContent={
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button
                                                variant="ligth"
                                                size='sm'
                                                endContent={
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 mt-1 ml-1">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                }
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
                                            <DropdownItem key="numero_pedido">Numero de pedido</DropdownItem>
                                            <DropdownItem key="id">ID del pedido</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                }
                            />
                            <Button
                                isIconOnly
                                isDisabled={loadingBusqueda}
                                onClick={() => obtenerPedidosChequesBusqueda(busquedaPedidos, selectedKeys)}
                                endContent={
                                    <div className="pointer-events-none flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                    </div>
                                }
                            />
                        </div>
                        <div>
                            {resultadoBusqueda && (
                                <Card className='my-5 p-2 pl-4'>
                                    <div className='flex w-full justify-between items-center'>
                                        <h1>{resultadoBusqueda.id}</h1>
                                        <h1>{resultadoBusqueda.numero_pedido}</h1>
                                        <h1>{resultadoBusqueda.user.name}{resultadoBusqueda.user.rol && (<Chip size='sm' color='primary' variant='flat' className='ml-1'>{resultadoBusqueda.user.rol}</Chip>)}</h1>
                                        <h1>{formatearFecha(resultadoBusqueda.created_at)}</h1>
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button
                                                    variant="ligth"
                                                    size='md'
                                                    isIconOnly
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                    </svg>
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="Single selection example"
                                                variant="flat"
                                                selectionMode="none"
                                            >
                                                <DropdownItem
                                                    key="numero_pedido"
                                                    endContent={
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                                                        </svg>
                                                    }>Imprimir</DropdownItem>
                                                <DropdownItem
                                                    key="id"
                                                    endContent={
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                                        </svg>
                                                    }
                                                >Detalle</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </Card>
                            )}
                            {loadingBusqueda && (
                                <div className=' w-full flex justify-center mt-5'>
                                    <Spinner label="Buscando..." />
                                </div>
                            )}
                        </div>
                    </CardBody>
                </Card>
                <div className={`${sinResultados ? ' hidden' : ' flex flex-col'} w-full `}>
                    <Card className='p-2 md:p-5'>
                        <h1 className=' font-bold uppercase mb-2'>Pedidos de hoy</h1>
                        <Input
                            placeholder='Flitrar pedidos...'
                            size='md'
                            className='md:w-1/2'
                            onChange={handleBusquedaChange}
                            value={busqueda}
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </div>
                            }
                        />
                        <Table
                            aria-label="Tabla de pedidos"
                            classNames={{
                                wrapper: "max-h-[432px]",
                            }}
                            className="flex justify-between md:p-2 h-full"
                            bottomContent={
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
                            }
                        >
                            <TableHeader>
                                <TableColumn>NUMERO PEDIDO</TableColumn>
                                <TableColumn>USUARIO</TableColumn>
                                <TableColumn>FECHA</TableColumn>
                                <TableColumn>OPCION</TableColumn>
                            </TableHeader>
                            <TableBody
                                isLoading={pedidos.length < 1}
                                loadingContent={<Spinner label="Cargando..." />}
                            >
                                {pedidosPaginacion?.map((pedido) => (
                                    <TableRow key={pedido.id}>
                                        <TableCell className=' uppercase font-bol text-lg '>{pedido.numero_pedido}</TableCell>
                                        <TableCell>{pedido.user.name}{pedido.user.rol && (<Chip size='sm' color='primary' variant='flat' className='ml-1'>{pedido.user.rol}</Chip>)}</TableCell>
                                        <TableCell>{formatearFecha(pedido.created_at)}</TableCell>
                                        <TableCell>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button
                                                        variant="ligth"
                                                        size='md'
                                                        isIconOnly
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                        </svg>
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu
                                                    aria-label="Single selection example"
                                                    variant="flat"
                                                    selectionMode="none"
                                                >
                                                    <DropdownItem
                                                        key="numero_pedido"
                                                        endContent={
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                                                            </svg>
                                                        }>Imprimir</DropdownItem>
                                                    <DropdownItem
                                                        key="id"
                                                        endContent={
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                                            </svg>
                                                        }
                                                    >Detalle</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </div>
        </div >
    )
}

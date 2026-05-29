import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import clienteAxios from "../config/axios";
import socketio from "socket.io-client";
import axios from "axios";
import Cookies from "js-cookie";
import { useDisclosure } from "@heroui/react";
const AdminContext = createContext();


const AdminProvider = ({ children }) => {

    const logoUrl = "https://res.cloudinary.com/dfrsffngq/image/upload/v1723651613/logo.png";
    // WEb Socket 

    /* Conexion a web socket */
    const [socketConnection, setSocketConnection] = useState(null);

    useEffect(() => {
        const urlSocket = import.meta.env.VITE_SOCKET_URL
        const socket = socketio(urlSocket, {
            auth: {
                token: `Bearer ${token}`
            }
        });
        setSocketConnection(socket);

        return () => {
            socket.disconnect();
        };
    }, []);


    // Obtener el token y los datos del usuario desde las cookies
    const jsonString = Cookies.get('userData');
    let userData = null;
    if (jsonString) {
        try {
            userData = JSON.parse(jsonString);
        } catch (error) {
            console.error("Error parsing userData cookie:", error);
        }
    }
    const token = userData?.token || localStorage.getItem("AUTH_TOKEN");

    const Usuario = localStorage.getItem("USER");

    /* ESTADOS  */
    const [productoQuery, setProductoQuery] = useState(null);
    const [pedidosQuery, setPedidosQuery] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [categoriasProductos, setCategoriasProductos] = useState(false);
    const [errores, setErrores] = useState([]);

    /* Eliminar orden */
    const [modalEliminarOrden, setModalEliminarOrden] = useState(false);
    const [errorCalificacion, setErrorCalificacion] = useState([]);
    const [ordenEliminar, setOrdenEliminar] = useState({});
    const [loadingEliminarOrden, setLoadingEliminarOrden] = useState(false);
    /* Editar producto */
    const [productoEditar, setProductoEditar] = useState({});
    const [modalEditarProducto, setModalEditarProducto] = useState(false);
    const [errorEdicionProducto, setErrorEdicionProducto] = useState([]);
    const [loadingIsEdit, setLoadingIsEdit] = useState(false)
    /* Promociones */
    const [modalCrearPromo, setModalCrearPromo] = useState(false);
    /* productos */
    const [loginEliminarProducto, setLoginEliminarProducto] = useState(false);
    const [loadingCrearProducto, setLoadingCrearProducto] = useState(false);
    const [loadingMoverProducto, setLoadingMoverProducto] = useState(false);
    const [modalCrearProducto, setModalCrearProducto] = useState(false);
    const [productoEliminar, setProductoEliminar] = useState({});
    const [modalMoverProducto, setModalMoverProducto] = useState(false);
    const [productoMover, setProductoMover] = useState({});
    const [productoNuevo, setProductoNuevo] = useState(null);
    const [productoCambiarEstado, setProductoCambiarEstado] = useState(null);
    const [productoActualizar, setProductoActualizar] = useState(null);
    const [datosProductoMover, setDatosProductoMover] = useState(null);
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    /* Categorias */
    const [loadingCrearCategoria, setLoadingCrearCategoria] = useState(false);
    const [loadingEditarCategoria, setLoadingEditarCategoria] = useState(false);
    const [loginEliminarCategoria, setLoginEliminarCategoria] = useState(false);
    const [modalCrearCategoria, setModalCrearCategoria] = useState(false);
    const [modalEliminarProducto, setModalEliminarProducto] = useState(false);
    const [modalEditarCategoria, setModalEditarCategoria] = useState(false);
    const [categoriaModificar, setCategoriaModificar] = useState({});
    const [modalEliminarCategoria, setModalEliminarCategoria] = useState(false);
    const [errorEditarCategoria, setErrorEditarCategoria] = useState();
    const [categoriaActualizar, setCategoriaActualizar] = useState();
    const [categoriaNueva, setCategoriaNueva] = useState();
    const [categoriaEliminar, setCategoriaEliminar] = useState();
    const [erroresCrearCategoria, setErroresCrearCategoria] = useState();
    const [loadingDisponible, setLoadingDisponible] = useState();

    /* PANEL DE CONTROL */
    const [modalAbrirCaja, setModalAbrirCaja] = useState(false);
    const [modalCerrarCaja, setModalCerrarCaja] = useState(false);
    const [idCajaCerrar, setIdCajaCerrar] = useState();
    const [loadingAbrirCaja, setLoadingAbrirCaja] = useState(false);
    const [registroVer, setRegistroVer] = useState([]);
    const [datosCaja, setDatosCaja] = useState([]);
    const [dinero, setDinero] = useState(0);
    const [nuevosDatosCaja, setNuevosDatosCaja] = useState();
    const [nuevoRegistro, setNuevoRegistro] = useState();
    const [registros, setRegistros] = useState([]);


    /* PEDIDOS */
    const [pedidoActualizar, setPedidoActualizar] = useState(null)
    const [pedidoEliminar, setPedidoEliminar] = useState(null)
    const [nuevoPedido, setNuevoPedido] = useState(null)
    const [loadingEntregarPedido, setLoadingEntregarPedido] = useState(false)
    const [loadingCompletarPedido, setLoadingCompletarPedido] = useState(false)
    const [loadingConfirmarPedido, setLoadingConfirmarPedido] = useState(false)
    const [pedidoMesero, setPedidoMesero] = useState([]);
    const [totalNeto, setTotalNeto] = useState(0);
    const [total, setTotal] = useState(0);
    const [producto, setProducto] = useState({});
    const [modalProductoMesero, setModalProductoMesero] = useState(false);
    const [modalPedidoMesero, setModalPedidoMesero] = useState(false);
    const [modalLugarMesero, setModalLugarMesero] = useState(false);
    const [modalConfirmarPedido, setModalConfirmarPedido] = useState(false);
    const [lugarMesero, setLugarMesero] = useState('');
    const [mesaMesero, setMesaMesero] = useState(null);
    const [loadingNuevaOrden, setLoadingNuevaOrden] = useState(null);
    const [precioPedido, setPrecioPedido] = useState(0);
    const [loadingConfirmarPedidoModal, setLoadingConfirmarPedidoModal] = useState(false);
    const { isOpen: isOpenDireccionEntrega, onOpen: onOpenDireccionEntrega, onOpenChange: onOpenChangeDireccionEntrega } = useDisclosure();
    const {isOpen: isOpenConfirmarCancelarEntrega, onOpen: onOpenConfirmarCancelarEntrega, onOpenChange: onOpenChangeConfirmarCancelarEntrega} = useDisclosure();

    const [pedidoEnCurso, setPedidoEnCurso] = useState(null);
    const [loadingCancelarPedido, setLoadingCancelarPedido] = useState(false);
    const [loadingFinalizarPedido, setLoadingFinalizarPedido] = useState(false);

    useEffect(() => {
        const jsonString = Cookies.get('pedidoEnCurso');
        if (jsonString) {
            try {
                setPedidoEnCurso(JSON.parse(jsonString));
            } catch (error) {
                console.error('Error al parsear la cookie "pedidoEnCurso":', error);
                setPedidoEnCurso(null); // O cualquier otro valor por defecto
            }
        }
    }, []);
    useEffect(() => {
        const nuevoTotal = pedidoMesero.reduce((total, producto) => {
            let precioProducto = producto.precio + producto.totalOpciones;
            if (producto.promocion !== null) {
                let descuento = precioProducto * (producto?.promocion?.descuento / 100);
                precioProducto -= descuento;
            }
            return total + precioProducto;
        }, 0);
        setTotal(nuevoTotal);
    }, [pedidoMesero]);

    useEffect(() => {
        const nuevoTotalSinPromo = pedidoMesero.reduce((total, producto) => {
            let precioProducto = producto.precio + producto.totalOpciones;
            return total + precioProducto;
        }, 0);
        setTotalNeto(nuevoTotalSinPromo);
    }, [pedidoMesero]);


    /* Agrega un producto nuevo */
    useEffect(() => {
        if (productoQuery && productoNuevo && categoriasProductos) {
            const categoria = categoriasProductos.find(categoria => categoria.id == productoNuevo.categoria_id);
            if (categoria) {

                setProductoQuery(prevProducto => ({ ...prevProducto, data: [productoNuevo, ...prevProducto.data] }));
                const producto = {
                    id: productoNuevo.id,
                    nombre: productoNuevo.nombre,
                    eliminado: productoNuevo.eliminado,
                    categoria_id: productoNuevo.categoria_id
                }

                categoria.productos.push(producto);
                // Actualiza el estado con los datos de la categoría modificados
                setCategoriasProductos([...categoriasProductos]);
            }
        }

    }, [productoNuevo]);

    /* Actualiza el dato disponible del producto */
    useEffect(() => {
        if (productoQuery && productoCambiarEstado) {
            const productoActualizado = productoQuery.data.find(producto => producto.id === productoCambiarEstado.producto);
            if (productoActualizado) {
                productoActualizado.disponible = productoCambiarEstado.estado;
                setProductoQuery({
                    ...productoQuery,
                    data: [...productoQuery.data.filter(producto => producto.id !== productoCambiarEstado.producto), productoActualizado]
                });
            }
        }

    }, [productoCambiarEstado]);

    /* Actualiza el producto */
    useEffect(() => {
        if (productoQuery && productoActualizar) {
            setProductoQuery({
                ...productoQuery,
                data: [productoActualizar, ...productoQuery.data.filter(producto => producto.id !== productoActualizar.id)]
            });
        }
    }, [productoActualizar]);

    /* Actualiza es estado del pedido */
    useEffect(() => {
        if (pedidosQuery && pedidoActualizar) {
            const pedidoActualizado = pedidosQuery.pedidos.find(pedido => pedido.id === pedidoActualizar.id);
            if (pedidoActualizado) {
                pedidoActualizado.estado = pedidoActualizar.estado;
                pedidoActualizado.eliminado = pedidoActualizar.eliminado;
                setPedidosQuery({
                    ...pedidosQuery,
                    pedidos: [...pedidosQuery.pedidos.filter(pedido => pedido.id !== pedidoActualizar.id), pedidoActualizado]
                });
            }
        }
    }, [pedidoActualizar]);


    /* Elimina el pedido */
    useEffect(() => {
        if (pedidosQuery && pedidoEliminar) {
            const pedidoEliminado = pedidosQuery?.pedidos.filter(pedido => pedido.id !== pedidoEliminar);
            setPedidosQuery({ ...pedidosQuery, pedidos: pedidoEliminado });
        }
    }, [pedidoEliminar]);


    /* Actualizar Categoria */
    useEffect(() => {
        if (categoriasProductos && categoriaActualizar) {
            const categoriaActualizada = categoriasProductos.find(categoria => categoria.id === categoriaActualizar.id);
            if (categoriaActualizada) {
                categoriaActualizada.nombre = categoriaActualizar.nombre;
                categoriaActualizada.icono = categoriaActualizar.icono;

                // Encuentra el índice de la categoría actualizada
                const index = categoriasProductos.findIndex(categoria => categoria.id === categoriaActualizar.id);

                // Crea una nueva lista de categorías con la categoría actualizada en su posición original
                const nuevasCategorias = [
                    ...categoriasProductos.slice(0, index), // Elementos antes de la categoría actualizada
                    categoriaActualizada, // Categoría actualizada
                    ...categoriasProductos.slice(index + 1) // Elementos después de la categoría actualizada
                ];

                // Actualiza el estado con la nueva lista de categorías
                setCategoriasProductos(nuevasCategorias);
            }
        }
    }, [categoriaActualizar]);

    /* Mover producto de categoria */
    useEffect(() => {
        if (categoriasProductos && datosProductoMover) {
            // Encuentra la categoría con ID 3
            const categoriaDesde = categoriasProductos.find(categoria => categoria.id === datosProductoMover.categoriaAnterior);
            // Encuentra la categoría con ID 1
            const categoriaHacia = categoriasProductos.find(categoria => categoria.id === datosProductoMover.categoriaActual);
            if (categoriaDesde && categoriaHacia) {
                // Encuentra el producto con ID 2 en el array 'productos' de categoriaDesde
                const productoAMover = categoriaDesde.productos.find(producto => producto.id === datosProductoMover.productoId);
                if (productoAMover) {
                    // Elimina el producto de categoriaDesde
                    categoriaDesde.productos = categoriaDesde.productos.filter(producto => producto.id !== datosProductoMover.productoId);
                    // Actualiza el 'categoria_id' del producto
                    productoAMover.categoria_id = datosProductoMover.categoriaActual;
                    // Agrega el producto a categoriaHacia
                    categoriaHacia.productos.push(productoAMover);
                    // Actualiza el estado con los datos de la categoría modificados
                    setCategoriasProductos([...categoriasProductos]);
                }
            }
        }
    }, [datosProductoMover]);

    /* Eliminar Producto */
    useEffect(() => {
        if (categoriasProductos && productoAEliminar && productoQuery) {
            const categoriaDelproducto = categoriasProductos.find(categoria => categoria.id === productoAEliminar.categoriaId);
            if (categoriaDelproducto) {
                // Elimina el producto con ID 2 de la lista de productos de la categoría
                categoriaDelproducto.productos = categoriaDelproducto.productos.filter(producto => producto.id !== productoAEliminar.productoId);
                // Actualiza el estado con la categoría modificada
                setCategoriasProductos([...categoriasProductos]);

                //Eliminar producto de productoQuery
                setProductoQuery(prevProducto => ({ ...prevProducto, data: productoQuery?.data.filter(producto => producto.id !== productoAEliminar.productoId) }));
            }
        }
    }, [productoAEliminar]);

    /* Crear nueva categoria */
    useEffect(() => {
        if (categoriasProductos && categoriaNueva && categorias) {

            const categoriaNuevoAdaptada = {
                id: categoriaNueva.id,
                nombre: categoriaNueva.nombre,
                icono: categoriaNueva.icono
            }
            const categoriaConProductos = {
                id: categoriaNueva.id,
                nombre: categoriaNueva.nombre,
                icono: categoriaNueva.icono,
                productos: []
            }
            setCategorias(prevCategorias => [...prevCategorias, categoriaNuevoAdaptada]);

            setCategoriasProductos(prevCategoriasProductos => [...prevCategoriasProductos, categoriaConProductos]);
        }
    }, [categoriaNueva]);

    /* Eliminar categoria */
    useEffect(() => {
        if (categoriasProductos && categoriaEliminar && categorias) {
            setCategorias(categorias.filter(categoria => categoria.id !== categoriaEliminar))
            setCategoriasProductos(categoriasProductos.filter(categoriaProducto => categoriaProducto.id !== categoriaEliminar))
        }
    }, [categoriaEliminar]);

    /* Agregar nuevo pedido */
    useEffect(() => {
        if (nuevoPedido && pedidosQuery) {
            setPedidosQuery(prevPedido => ({ ...prevPedido, pedidos: [...prevPedido.pedidos, nuevoPedido] }));
        }
    }, [nuevoPedido]);

    /* ACTUALIZAR DATOS DE CAJA */
    useEffect(() => {
        if (nuevosDatosCaja) {
            setDatosCaja(nuevosDatosCaja);
        }
    }, [nuevosDatosCaja]);

    /* ACTUALIZAR DATOS DE REGISTRO */
    useEffect(() => {
        if (nuevoRegistro) {
            setRegistros(prevRegistros => [nuevoRegistro, ...prevRegistros]);
        }
    }, [nuevoRegistro]);

    /* funciones de websocket */
    useEffect(() => {
        if (!socketConnection) return;

        socketConnection.on("onCrearProducto", (data) => {
            setProductoNuevo(data.data);
        });

        socketConnection.on("onActualizarProductos", (data) => {
            setProductoActualizar(data);
        });

        socketConnection.on("onMoverProducto", (data) => {
            setDatosProductoMover(data);
        });

        socketConnection.on("onEliminarProductos", (data) => {
            setProductoAEliminar(data)
        });

        socketConnection.on("onDisponible", (data) => {
            setProductoCambiarEstado(data);
        });

        socketConnection.on('onPedido', (data) => {
            setPedidoActualizar(data)
        });

        socketConnection.on('onNuevoPedido', (data) => {
            setNuevoPedido(data)
        });

        socketConnection.on("onEliminarPedido", (data) => {
            setPedidoEliminar(data)
        });

        socketConnection.on("onEditarCategoria", (data) => {
            setCategoriaActualizar(data);
        });

        socketConnection.on("onCrearCategoria", (data) => {
            setCategoriaNueva(data)
        });

        socketConnection.on("onEliminarCategoria", (data) => {
            setCategoriaEliminar(data)
        });

        socketConnection.on("onCaja", (data) => {
            setNuevosDatosCaja(data.nuevaCaja);
        });
        socketConnection.on("onRegistro", (data) => {
            setNuevoRegistro(data);
        });

        return () => {
            socketConnection.off("onCrearProducto");
            socketConnection.off("onEliminarProductos");
            socketConnection.off("onActualizarProductos");
            socketConnection.off("onMoverProducto");
            socketConnection.off("onDisponible");
            socketConnection.off("onPedido");
            socketConnection.off("onNuevoPedido");
            socketConnection.off("onEliminarPedido");
            socketConnection.off("onEditarCategoria");
            socketConnection.off("onCrearCategoria");
            socketConnection.off("onEliminarCategoria");
            socketConnection.off("onCaja");
            socketConnection.off("onRegistro");
        };
    }, [socketConnection]);

    /* MODELES */
    const handleClickModalCategoria = () => {
        setModalCrearCategoria(!modalCrearCategoria);
    };

    const handleClickCerrarModal = () => {
        setModalEliminarCategoria(!modalEliminarCategoria)
    }

    /*
     * Calificación + eliminar orden (legacy unía dos cosas).
     * v1 separa: PATCH /pedidos/{id}/cancelar para anular el pedido.
     * La calificación de usuario aún no tiene endpoint en v1 — pendiente backend.
     */
    const handleSubmitCalificacion = async (datosCalificacion) => {
        setErrorCalificacion([]);
        setLoadingEliminarOrden(true);
        try {
            const pedidoId = datosCalificacion.pedido_id ?? datosCalificacion.id;
            if (pedidoId) {
                await clienteAxios.patch(`/pedidos/${pedidoId}/cancelar`, {
                    motivo: datosCalificacion.motivo ?? 'Eliminado por admin',
                });
            }
            // TODO: calificación del usuario — esperando endpoint v1 dedicado.
            setErrorCalificacion([]);
            toast.success('Pedido cancelado correctamente');
            setModalEliminarOrden(!modalEliminarOrden);
            socketConnection?.emit("onEliminarPedido", { id: pedidoId });
            setLoadingEliminarOrden(false);
        } catch (error) {
            setErrorCalificacion(Object.values(error.response?.data?.errors ?? {}));
            setLoadingEliminarOrden(false);
        }
    };

    /* COMPLETAR PEDIDO */
    /*
     * Avanzar pedido — v1 cambió la semántica:
     *   legacy: PUT /pedidos/actualizar/{id} con `identificador: 0|1|2`
     *   v1:     PATCH /pedidos/{id}/estado con `estado: "en_preparacion"|"listo"|"entregado"`
     * Y el cobro (`dineroCliente, pago`) ahora es un endpoint aparte:
     *   POST /pedidos/{id}/pagos {metodo_pago_id, monto}
     */
    const handleClickCompletarPedido = async (id, variable, dineroCliente, pago) => {
        const estadoPorVariable = { 0: 'en_preparacion', 1: 'listo', 2: 'entregado' };
        const nuevoEstado = estadoPorVariable[variable];

        if (variable === 0) setLoadingConfirmarPedido(id);
        if (variable === 1) setLoadingCompletarPedido(id);
        if (variable === 2) setLoadingEntregarPedido(id);

        try {
            // Avance de estado
            const { data } = await clienteAxios.patch(`/pedidos/${id}/estado`, { estado: nuevoEstado });
            socketConnection?.emit("onPedido", data);

            // Cobro: se registra al confirmar (variable === 0) si llegan los datos.
            if (variable === 0 && dineroCliente && pago) {
                try {
                    // pago: nombre del método (legacy). Resolvemos el id de metodos_pago.
                    const metodos = await clienteAxios.get('/caja/cajas'); // TODO: endpoint dedicado /metodos-pago
                    // Por ahora asumimos id=1 (efectivo) si no podemos resolver.
                    await clienteAxios.post(`/pedidos/${id}/pagos`, {
                        metodo_pago_id: 1,
                        monto: Number(data.total ?? dineroCliente),
                    });
                } catch (e) {
                    console.warn('Pago no registrado en v1:', e.message);
                }
            }

            if (variable === 0) {
                toast.success("El pedido está en proceso");
                setLoadingConfirmarPedido(false);
                setLoadingConfirmarPedidoModal(false);
                setModalConfirmarPedido(false);
                setPrecioPedido({});
            }
            if (variable === 1) { toast.success("Pedido listo"); setLoadingCompletarPedido(false); }
            if (variable === 2) { toast.success("Pedido entregado"); setLoadingEntregarPedido(false); }
        } catch (error) {
            console.error(error);
            if (variable === 0) setLoadingConfirmarPedido(false);
            if (variable === 1) setLoadingCompletarPedido(false);
            if (variable === 2) setLoadingEntregarPedido(false);
        }
    };

    /* PEDIDO MESERO */
    const handleSetProducto = (producto) => {
        setProducto(producto)
    }
    /* Agrega el producto al carrito de compras */
    const handleAgregarPedidoMesero = ({ categoria_id, ...producto }) => {
        if (pedidoMesero.some((pedidoState) => pedidoState.indexProducto === producto.indexProducto)) {
            const pedidoActualizado = pedidoMesero.map((PedidoState) => PedidoState.indexProducto === producto.indexProducto ? producto : PedidoState)
            setPedidoMesero(pedidoActualizado)
            toast.success("Producto Editado Correctamente");
        } else {
            setPedidoMesero([...pedidoMesero, producto]);
            toast.success("Agregado al Pedido");
        }

    };

    const handleclickModalProductoMesero = () => {
        setModalProductoMesero(!modalProductoMesero);
    };

    const handleEditarDetallesProducto = (indexProducto) => {
        const productoActualizar = pedidoMesero.filter(
            (producto) => producto.indexProducto === indexProducto
        )[0];
        setProducto(productoActualizar);
        if (modalPedidoMesero) {
            setModalPedidoMesero(!modalPedidoMesero);
        }
        setModalProductoMesero(!modalProductoMesero);
    };

    const handleEliminarProductoPedido = (indexProducto) => {
        const pedidoActualizado = pedidoMesero.filter((producto) => producto.indexProducto !== indexProducto);
        setPedidoMesero(pedidoActualizado);

        //Eliminarmos el Index del producto del LocalStorage
        let numbersArray = JSON.parse(localStorage.getItem('numbersMesero')) || [];
        numbersArray = numbersArray.filter(item => item !== indexProducto)
        localStorage.setItem('numbersMesero', JSON.stringify(numbersArray));
        toast.success("Eliminado del Pedido");
    };

    const handleSubmitNuevaOrden = async () => {
        const token = localStorage.getItem("AUTH_TOKEN");
        setLoadingNuevaOrden(true)
        if (localStorage.getItem('USER')) {
            try {
                /*
                 * v1 cambió el shape de crear pedido:
                 *   POST /pedidos {tipo_servicio, mesa, items: [{producto_id, cantidad, opciones: [{opcion_id, cantidad}]}]}
                 * El total se calcula en el backend (snapshot de precios).
                 * El campo `lugar` legacy ("local"|"envio") se mapea a `tipo_servicio` ("local"|"delivery").
                 */
                const tipoServicio = lugarMesero === 'envio'
                    ? 'delivery'
                    : (mesaMesero ? 'en_mesa' : 'local');

                const { data } = await clienteAxios.post("/pedidos", {
                    tipo_servicio: tipoServicio,
                    mesa: mesaMesero ?? null,
                    items: pedidoMesero.map((producto) => ({
                        producto_id: producto.id,
                        cantidad: producto.cantidad ?? 1,
                        notas: producto.notas ?? null,
                        opciones: (producto.detallesProducto ?? [])
                            .filter((d) => d.opcion_id)
                            .map((d) => ({
                                opcion_id: d.opcion_id,
                                cantidad: d.cantidad ?? 1,
                            })),
                    })),
                });
                toast.success(`Pedido ${data.numero_pedido} creado`);
                setTimeout(() => {
                    setPedidoMesero([]);
                }, 1000);
                setMesaMesero(null);
                setLugarMesero('');
                //Eliminamos todos los indentificadores del producto del LocalStorage
                localStorage.removeItem('numbersMesero');
                // notificando al servidor de websockets
                socketConnection.emit("onNuevoPedido", data.data);
                setPedidosQuery(prevPedido => ({ ...prevPedido, pedidos: [...prevPedido.pedidos, data] }));
                setModalLugarMesero(!modalLugarMesero)
                setLoadingNuevaOrden(false)
            } catch (error) {
                console.log(error);
                setLoadingNuevaOrden(false)
            }
        }
    };




    /* Obtener productos desde el backend (v1: paginado en {data: [...]}) */
    const obtenerProductos = async () => {
        try {
            const { data } = await clienteAxios.get("/productos?por_pagina=200&incluir_ocultos=true");
            // v1 devuelve { data, links, meta, ... } por paginación.
            setProductoQuery(data.data ?? data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        obtenerProductos();
    }, []);

    /* Obtener categorías con productos anidados (v1: GET /categorias?con_productos=true) */
    const obtenerCategoriasProductos = async () => {
        if (!localStorage.getItem('AUTH_TOKEN')) return;
        try {
            const { data } = await clienteAxios.get("/categorias?con_productos=true");
            setCategoriasProductos(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        obtenerCategoriasProductos();
    }, [])


    /* PRODUCTO */
    /* Crear producto — v1: POST /productos (multipart) devuelve el modelo */
    const crearProducto = async (datosProductoNuevo) => {
        try {
            const { data } = await clienteAxios.post('/productos', datosProductoNuevo, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setErrores([]);
            toast.success('Producto añadido correctamente');
            setModalCrearProducto(false);
            setLoadingCrearProducto(false);
            socketConnection?.emit("onCrearProducto", data);
        } catch (error) {
            console.error(error);
            setErrores(Object.values(error.response?.data?.errors ?? {}));
            setLoadingCrearProducto(false);
        }
    };

    /* Editar producto — v1: POST /productos/{id} (multipart, _method=PUT no requerido) */
    const handleClickEditarProducto = async (data) => {
        try {
            const res = await clienteAxios.post(`/productos/${data.id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setLoadingIsEdit(false);
            toast.success(`Producto ${res.data.id} editado`);
            setErrorEdicionProducto([]);
            setModalEditarProducto(!modalEditarProducto);
            socketConnection?.emit("onActualizarProductos", res.data);
        } catch (error) {
            setErrorEdicionProducto(Object.values(error.response?.data?.errors ?? {}));
        }
    };

    /* Toggle disponibilidad — v1: PATCH /productos/{id}/disponibilidad {disponible: enum} */
    const handleClickProductoAgotado = async (id, disponibilidad) => {
        try {
            // El admin usa "1"/"0" como agotado/disponible; v1 acepta los strings de enum.
            const nuevo = disponibilidad == "1" ? "agotado" : "disponible";
            const { data } = await clienteAxios.patch(`/productos/${id}/disponibilidad`, { disponible: nuevo });
            socketConnection?.emit("onDisponible", data);
            toast.success(nuevo === "agotado" ? "Producto deshabilitado" : "Producto reinsertado");
            setLoadingDisponible();
        } catch (error) {
            setLoadingDisponible();
            console.error(error);
        }
    };

    /* Eliminar producto — v1: DELETE /productos/{id} (soft-delete) */
    const eliminarProducto = async (id) => {
        try {
            const { data } = await clienteAxios.delete(`/productos/${id}`);
            setModalEliminarProducto(false);
            toast.success(data.mensaje ?? 'Producto eliminado');
            socketConnection?.emit("onEliminarProductos", { id });
            setLoginEliminarProducto(false);
        } catch (error) {
            console.log(error);
            setLoginEliminarProducto(false);
        }
    };

    /* Mover producto entre categorías — v1: PATCH /productos/{id}/mover {categoria_id} */
    const moverProducto = async (datos, id) => {
        try {
            // admin legacy enviaba {categoriaAnterior, categoriaActual, productoId};
            // v1 sólo necesita categoria_id (nueva).
            const body = { categoria_id: datos.categoriaActual ?? datos.categoria_id };
            const { data } = await clienteAxios.patch(`/productos/${id}/mover`, body);
            toast.success('Producto movido');
            setModalMoverProducto(!modalMoverProducto);
            socketConnection?.emit("onMoverProducto", data);
            setLoadingMoverProducto(false);
        } catch (error) {
            console.error(error);
            setLoadingMoverProducto(false);
        }
    };

    /* CATEGORIAS */
    /* Obtener categorías — v1: GET /categorias devuelve un array plano (sin envelope) */
    const obtenerCategorias = async () => {
        try {
            const { data } = await clienteAxios.get("/categorias");
            setCategorias(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerCategorias();
    }, []);

    /* Crear categoría — v1: POST /categorias (multipart con `icono` opcional) */
    const crearCategoria = async (datosIconoNuevo) => {
        setErroresCrearCategoria([]);
        try {
            const { data } = await clienteAxios.post('/categorias', datosIconoNuevo, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setErrores([]);
            toast.success('Categoría añadida correctamente');
            handleClickModalCategoria();
            setLoadingCrearCategoria(false);
            socketConnection?.emit("onCrearCategoria", data);
        } catch (error) {
            console.error(error);
            setLoadingCrearCategoria(false);
            setErroresCrearCategoria(Object.values(error.response?.data?.errors ?? {}));
        }
    };

    /* Eliminar categoría — v1: DELETE /categorias/{id} */
    const eliminarCategoria = async (id) => {
        try {
            const { data } = await clienteAxios.delete(`/categorias/${id}`);
            toast.success(data.mensaje ?? 'Categoría eliminada');
            setModalEliminarCategoria(false);
            socketConnection?.emit("onEliminarCategoria", id);
            setLoginEliminarCategoria(false);
        } catch (error) {
            console.error(error);
            setLoginEliminarCategoria(false);
        }
    };

    /* Editar categoría — v1: POST /categorias/{id} (multipart) */
    const editarCategoria = async (datosIconoNuevo, id) => {
        try {
            const { data } = await clienteAxios.post(`/categorias/${id}`, datosIconoNuevo, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Categoría actualizada');
            setErrorEditarCategoria([]);
            setLoadingEditarCategoria(false);
            setModalEditarCategoria(false);
            socketConnection?.emit("onEditarCategoria", data);
        } catch (error) {
            setErrorEditarCategoria(Object.values(error.response?.data?.errors ?? {}));
            setLoadingEditarCategoria(false);
        }
    };

    /* Abrir caja — v1: POST /caja/cajas/{id}/abrir {fondo_inicial} */
    const handleClickAbrirCaja = async () => {
        setLoadingAbrirCaja(true);
        try {
            // En v1 abrimos una caja específica; obtenemos la primera disponible.
            const cajas = await clienteAxios.get('/caja/cajas');
            const cajaId = cajas.data[0]?.id;
            if (!cajaId) throw new Error('No hay cajas configuradas');

            const { data } = await clienteAxios.post(`/caja/cajas/${cajaId}/abrir`, {
                fondo_inicial: Number(dinero.target.value),
            });
            setLoadingAbrirCaja(false);
            setModalAbrirCaja(false);
            socketConnection?.emit("onCaja", data);
            toast.success('Caja abierta — ya se pueden tomar pedidos');
        } catch (error) {
            console.error(error);
            setLoadingAbrirCaja(false);
            toast.error(error.response?.data?.message ?? 'Error al abrir caja');
        }
    };


    /*
     * DELIVERY (v1): el flujo legacy asignaba al repartidor en una sola llamada.
     * En v1 se requiere `repartidor_id` explícito (el usuario auth) y el endpoint
     * vive en /delivery. Aquí asumimos que el repartidor se auto-asigna su pedido.
     */
    const asignarPedido = async (pedidoId) => {
        try {
            const me = await clienteAxios.get('/auth/me');
            const { data } = await clienteAxios.post(`/delivery/pedidos/${pedidoId}/asignar`, {
                repartidor_id: me.data.id,
            });
            setPedidoEnCurso(data);
            Cookies.set("pedidoEnCurso", JSON.stringify(data), { expires: 2 });
        } catch (error) {
            console.error(error);
        }
    };

    /* Cancelar entrega — v1: PATCH /delivery/asignaciones/{id}/cancelar */
    const cancelarPedido = async (id) => {
        try {
            await clienteAxios.patch(`/delivery/asignaciones/${id}/cancelar`, {});
            setPedidoEnCurso(null);
            Cookies.remove('pedidoEnCurso');
            window.location.reload();
            setLoadingCancelarPedido(false);
        } catch (error) {
            console.error(error);
            setLoadingCancelarPedido(false);
        }
    };

    /* Finalizar entrega — v1: PATCH /delivery/asignaciones/{id}/finalizar */
    const finalizarPedido = async (id) => {
        try {
            await clienteAxios.patch(`/delivery/asignaciones/${id}/finalizar`, {});
            setPedidoEnCurso(null);
            Cookies.remove('pedidoEnCurso');
            window.location.reload();
            setLoadingFinalizarPedido(false);
        } catch (error) {
            console.error(error);
            setLoadingFinalizarPedido(false);
        }
    };

    return (
        <AdminContext.Provider
            value={{
                pedidosQuery,
                setPedidosQuery,
                modalEliminarOrden,
                setModalEliminarOrden,
                errorCalificacion,
                setErrorCalificacion,
                handleSubmitCalificacion,
                ordenEliminar,
                setOrdenEliminar,
                handleClickCompletarPedido,
                productoQuery,
                handleClickProductoAgotado,
                setProductoEditar,
                productoEditar,
                setModalEditarProducto,
                modalEditarProducto,
                handleClickEditarProducto,
                errorEdicionProducto,
                loadingIsEdit,
                setLoadingIsEdit,
                setModalCrearPromo,
                modalCrearPromo,
                categorias,
                handleClickModalCategoria,
                setModalCrearProducto,
                modalCrearProducto,
                crearProducto,
                errores,
                loadingCrearProducto,
                setLoadingCrearProducto,
                setErrores,
                modalCrearCategoria,
                setModalCrearCategoria,
                loadingCrearCategoria,
                setLoadingCrearCategoria,
                crearCategoria,
                categoriasProductos,
                setModalEliminarProducto,
                modalEliminarProducto,
                setProductoEliminar,
                handleClickCerrarModal,
                setModalMoverProducto,
                modalMoverProducto,
                setProductoMover,
                setModalEditarCategoria,
                modalEditarCategoria,
                editarCategoria,
                setCategoriaModificar,
                setModalEliminarCategoria,
                modalEliminarCategoria,
                productoEliminar,
                eliminarProducto,
                loginEliminarProducto,
                setLoginEliminarProducto,
                categoriaModificar,
                eliminarCategoria,
                loginEliminarCategoria,
                setLoginEliminarCategoria,
                productoMover,
                moverProducto,
                loadingMoverProducto,
                setLoadingMoverProducto,
                loadingEditarCategoria,
                setLoadingEditarCategoria,
                errorEditarCategoria,
                erroresCrearCategoria,
                setLoadingDisponible,
                loadingDisponible,
                loadingEliminarOrden,
                loadingEntregarPedido,
                loadingCompletarPedido,
                loadingConfirmarPedido,
                pedidoMesero,
                setPedidoMesero,
                total,
                setTotal,
                handleSetProducto,
                setModalProductoMesero,
                modalProductoMesero,
                handleAgregarPedidoMesero,
                producto,
                handleclickModalProductoMesero,
                totalNeto,
                setModalLugarMesero,
                modalLugarMesero,
                setModalPedidoMesero,
                modalPedidoMesero,
                handleEditarDetallesProducto,
                handleEliminarProductoPedido,
                lugarMesero,
                setLugarMesero,
                setMesaMesero,
                mesaMesero,
                loadingNuevaOrden,
                handleSubmitNuevaOrden,
                modalConfirmarPedido,
                setModalConfirmarPedido,
                precioPedido,
                setPrecioPedido,
                setLoadingConfirmarPedidoModal,
                loadingConfirmarPedidoModal,
                setRegistroVer,
                registroVer,
                setModalAbrirCaja,
                modalAbrirCaja,
                setLoadingAbrirCaja,
                loadingAbrirCaja,
                setModalCerrarCaja,
                modalCerrarCaja,
                setIdCajaCerrar,
                idCajaCerrar,
                setDatosCaja,
                datosCaja,
                handleClickAbrirCaja,
                setDinero,
                socketConnection,
                setRegistros,
                registros,
                logoUrl,
                token,
                isOpenDireccionEntrega,
                onOpenDireccionEntrega,
                onOpenChangeDireccionEntrega,
                asignarPedido,
                pedidoEnCurso,
                setPedidoEnCurso,
                cancelarPedido,
                isOpenConfirmarCancelarEntrega,
                onOpenConfirmarCancelarEntrega,
                onOpenChangeConfirmarCancelarEntrega,
                loadingCancelarPedido,
                setLoadingCancelarPedido,
                setLoadingFinalizarPedido,
                loadingFinalizarPedido,
                finalizarPedido
            }}
        >
            {children}
        </AdminContext.Provider>
    )

}

export { AdminProvider };
export default AdminContext
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import clienteAxios from "../config/axios";
import socketio from "socket.io-client";
import axios from "axios";
import Cookies from "js-cookie";
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


    /* TOKEN PARA LA CONECCION CON EL BACKEND*/
    const jsonString = Cookies.get('userData');
    const userData = JSON.parse(jsonString);

    const token = userData.token;

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

    /* Eliminar Orden */
    const handleSubmitCalificacion = async (datosCalificacion) => {
        setErrorCalificacion([])
        setLoadingEliminarOrden(true)
        try {
            const { data } = await clienteAxios.put(`/api/usuarios/${datosCalificacion.id_user}`, datosCalificacion, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setErrorCalificacion([]);
            toast.success('Se ha eliminado el pedido Correctamente');
            setModalEliminarOrden(!modalEliminarOrden);
            socketConnection.emit("onEliminarPedido", data.data)
            socketConnection.emit("onRegistro", data.registro)
            setLoadingEliminarOrden(false)
        } catch (error) {
            setErrorCalificacion(Object.values(error.response.data.errors))
            setLoadingEliminarOrden(false)
        }

    }

    /* COMPLETAR PEDIDO */
    const handleClickCompletarPedido = async (id, variable, dineroCliente, pago) => {
        if (variable === 0) {
            setLoadingConfirmarPedido(id);
        }
        if (variable === 1) {
            setLoadingCompletarPedido(id);
        }
        if (variable === 2) {
            setLoadingEntregarPedido(id);
        }
        if (localStorage.getItem('USER')) {
            try {
                const { data } = await clienteAxios.put(
                    `/api/pedidos/actualizar/${id}`,
                    {
                        identificador: variable,
                        dineroCliente: dineroCliente,
                        pago: pago
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                socketConnection.emit("onPedido", data)
                socketConnection.emit("onRegistro", data.registro)

                if (variable === 0) {
                    toast.success("El pedido esta en proceso");
                    setLoadingConfirmarPedido(false);
                    setLoadingConfirmarPedidoModal(false)
                    setModalConfirmarPedido(false)
                    setPrecioPedido({})
                }
                if (variable === 1) {
                    toast.success("pedido Preparada");
                    setLoadingCompletarPedido(false);
                }
                if (variable === 2) {
                    toast.success("pedido Entregada");
                    setLoadingEntregarPedido(false);
                }
            } catch (error) {
                console.error(error);
                if (variable === 0) {
                    setLoadingConfirmarPedido(false);
                }
                if (variable === 1) {
                    setLoadingCompletarPedido(false);
                }
                if (variable === 2) {
                    setLoadingEntregarPedido(false);
                }
            }
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
                const { data } = await clienteAxios.post(
                    "/api/pedidos/nuevo",
                    {
                        totalNeto,
                        total,
                        lugar: lugarMesero,
                        mesa: mesaMesero,
                        productos: pedidoMesero.map((producto) => {
                            return {
                                id: producto.id,
                                detalle_Producto: producto.detallesProducto,
                                total_opciones: producto.totalOpciones
                            };
                        }),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success(data.message);
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




    /* Obtener productos desde el backend */
    const obtenerProductos = async () => {
        try {
            const { data } = await clienteAxios("/api/productos");
            setProductoQuery(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        obtenerProductos();
    }, []);

    /* Obtener categorias */
    const obtenerCategoriasProductos = async () => {

        const token = localStorage.getItem("AUTH_TOKEN");
        if (localStorage.getItem('USER')) {
            try {
                const { data } = await clienteAxios("/api/categorias/productos", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategoriasProductos(data.data);
            } catch (error) {
                console.log(error)
            }
        }
    };

    useEffect(() => {
        obtenerCategoriasProductos();
    }, [])


    /* PRODUCTO */
    /* Funcion Crear producto */
    const crearProducto = async (datosProductoNuevo) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (localStorage.getItem('USER')) {
            try {
                const { data } = await clienteAxios.post('/api/productos/create', datosProductoNuevo, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                })
                setErrores([])
                toast.success('Producto añadido Correctamente')
                setModalCrearProducto(false)
                setLoadingCrearProducto(false)
                socketConnection.emit("onCrearProducto", data);
                socketConnection.emit("onRegistro", data.registro);
            } catch (error) {
                console.error(error)
                setErrores(Object.values(error.response.data.errors))
                setLoadingCrearProducto(false)
            }
        }
    }

    /* Editar producto */
    const handleClickEditarProducto = async (data) => {
        try {
            const res = await clienteAxios.post(`/api/productos/actualizar/${data.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            setLoadingIsEdit(false)
            toast.success(` producto con el id:${data.id} editado`);
            setErrorEdicionProducto([])
            setModalEditarProducto(!modalEditarProducto)
            socketConnection.emit("onActualizarProductos", res.data.producto);
            socketConnection.emit("onRegistro", res.data.registro);
        } catch (error) {
            setErrorEdicionProducto(Object.values(error.response.data.errors))
        }
    };

    /* CAMBIAR ESTADO DEL PRODUCTO (agotado o disponible) */
    const handleClickProductoAgotado = async (id, disponibilidad) => {
        try {
            const { data } = await clienteAxios.put(`/api/productos/disponible/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            socketConnection.emit("onDisponible", data);
            socketConnection.emit("onRegistro", data.registro);
            if (disponibilidad == "1") {
                toast.success("Producto desabilitado");
            } else {
                toast.success("Producto Reinsertado");
            }

            setLoadingDisponible()
        } catch (error) {
            setLoadingDisponible()
            console.error(error);
        }
    };

    const eliminarProducto = async (id) => {
        if (localStorage.getItem('USER')) {
            try {
                const { data } = await clienteAxios.put(`/api/productos/eliminar/${id}`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setModalEliminarProducto(false);
                toast.success(data.message)
                socketConnection.emit("onEliminarProductos", data);
                socketConnection.emit("onRegistro", data.registro);
                setLoginEliminarProducto(false)
            } catch (error) {
                console.log(error)
                setLoginEliminarProducto(false)
            }
        }
    }

    const moverProducto = async (datos, id) => {
        const token = localStorage.getItem("AUTH_TOKEN");
        if (localStorage.getItem('USER')) {
            try {
                const { data } = await clienteAxios.put(`/api/productos/mover/${id}`, datos, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                toast.success(data.message)
                setModalMoverProducto(!modalMoverProducto)
                socketConnection.emit("onMoverProducto", data);
                socketConnection.emit("onRegistro", data.registro);
                setLoadingMoverProducto(false)
            } catch (error) {
                console.error(error)
                setLoadingMoverProducto(false)
            }
        }
    }

    /* CATEGORIAS */
    /* Obtener categorias desde el backend */
    const obtenerCategorias = async () => {
        try {
            const { data } = await clienteAxios("/api/categorias");
            setCategorias(data.data);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        obtenerCategorias();
    }, []);

    /* Funcion Crear Categoria */
    const crearCategoria = async (datosIconoNuevo) => {
        setErroresCrearCategoria([])
        const token = localStorage.getItem('AUTH_TOKEN');
        if (localStorage.getItem('USER')) {
            try {
                const { data } = await clienteAxios.post('/api/categorias/create', datosIconoNuevo, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                })
                setErrores([])
                toast.success('Categoria añadida Correctamente')
                handleClickModalCategoria()
                setLoadingCrearCategoria(false)
                socketConnection.emit("onCrearCategoria", data.data);
                socketConnection.emit("onRegistro", data.registro);
            } catch (error) {
                console.error(error)
                setLoadingCrearCategoria(false)
                setErroresCrearCategoria(Object.values(error.response.data.errors))
            }
        }
    }

    /* Funcion eliminar categoria */
    const eliminarCategoria = async (id) => {
        if (localStorage.getItem('USER')) {
            try {
                const { data } = await clienteAxios.delete(`/api/categorias/eliminar/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                toast.success(data.menssage)
                setModalEliminarCategoria(false)
                socketConnection.emit("onEliminarCategoria", id);
                socketConnection.emit("onRegistro", data.registro);
                setLoginEliminarCategoria(false)
            } catch (error) {
                console.error(error)
                setLoginEliminarCategoria(false)
            }
        }
    }

    const editarCategoria = async (datosIconoNuevo, id) => {
        if (localStorage.getItem('USER')) {
            try {
                const { data } = await clienteAxios.post(`/api/categorias/update/${id}`, datosIconoNuevo, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                });
                toast.success(data.menssage)
                setErrorEditarCategoria([])
                setLoadingEditarCategoria(false)
                setModalEditarCategoria(false)
                socketConnection.emit("onEditarCategoria", data);
                socketConnection.emit("onRegistro", data.registro);
            } catch (error) {
                setErrorEditarCategoria(Object.values(error.response.data.errors))
                setLoadingEditarCategoria(false)
            }
        }
    }

    const handleClickAbrirCaja = async () => {
        setLoadingAbrirCaja(true)
        const datosCaja = {
            dinero_abrir: dinero.target.value,
        }
        const token = localStorage.getItem('AUTH_TOKEN');
        if (localStorage.getItem('USER')) {
            try {
                const { data } = await clienteAxios.post('/api/caja/abrir', datosCaja, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                })
                setLoadingAbrirCaja(false)
                setModalAbrirCaja(false)
                socketConnection.emit("onCaja", data)
                socketConnection.emit("onRegistro", data.registro)
                toast.success('Acabas de abrir la caja, los usuarios podran hacer nuevos pedidos')
            } catch (error) {
                console.error(error)
                setLoadingAbrirCaja(false)
            }
        }
    }





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
                token
            }}
        >
            {children}
        </AdminContext.Provider>
    )

}

export { AdminProvider };
export default AdminContext
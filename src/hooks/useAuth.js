import { useEffect, useState } from "react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import { toast } from "react-toastify";
import useGeneralContext from "./useGeneralContext";

export const useAuth = ({ middleware, url }) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const navigate = useNavigate();
  const [loadingRegistro, setLoadingRegistro] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const { setUserActivo, modalAuth, setModalAuth, setPedido, setUserActual } =
    useGeneralContext();

  const fetcher = async () => {
    const response = await clienteAxios("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };


  const { data: user, error, mutate } = useSWR("/api/user", fetcher);
  const login = async (datos, setErrores) => {
    setErrores([]);
    setLoadingLogin(true)
    try {
      const { data } = await clienteAxios.post("/api/login", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      localStorage.setItem("USER", datos.email);
      setErrores([]);
      setModalAuth(!modalAuth);
      fetcher();
      toast.success(`Bienvenido ${data?.user?.name}`);
      setUserActual(data.user);
      await mutate();
      setUserActivo(true);
      setLoadingLogin(false)
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
      setLoadingLogin(false)
    }
  };

  const registro = async (datos, setErrores) => {
    setErrores([]);
    setLoadingRegistro(true)
    try {
      const { data } = await clienteAxios.post("/api/registro", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]);
      toast.success(`Bienvenido ${data?.user?.name}`);
      setUserActual(data.user);
      await mutate();
      localStorage.setItem("USER", datos.email);
      setModalAuth(!modalAuth);
      setUserActivo(true);
      setLoadingRegistro(false)
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
      setLoadingRegistro(false)
    }
  };

  const logout = async () => {
    try {
      await clienteAxios.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserActual([]);
      window.location.reload();
      await mutate(undefined);
      setPedido([]);
      localStorage.removeItem("AUTH_TOKEN");
      localStorage.removeItem("USER");
    } catch (error) {
      console.log('algo salio mal')
    }
  };

  useEffect(() => {
    if (middleware === "auth" && user && user?.rol == 'admin') {
      navigate('/admin');
    }
    if (middleware === "auth" && user && user?.rol == 'mesero') {
      navigate('/admin/mesero');
    }
    if (middleware === "auth" && user && user?.rol == 'cocinero') {
      navigate('/admin/cocinero');
    }
  
    if (middleware === "administracion" && user && !user?.rol) {
      navigate("/");
    }

    if (user) {
      setUserActivo(true);
    } else {
      setUserActivo(false);
    }

    if (middleware === "administracion" && error) {
      navigate("/");
    }
    if (middleware === "panel" && user && user?.rol !== 'admin') {
      navigate("/");
    }
    if (middleware === "categorias" && user && user?.rol !== 'admin') {
      navigate("/");
    }
    if (middleware === "despacho" && user && user?.rol !== 'admin' && user?.rol !== 'mesero') {
      navigate("/");
    }
    if (middleware === "ordenes" && user && user?.rol !== 'admin' && user?.rol !== 'cocinero') {
      navigate("/");
    }
  }, [user, error]);

  return {
    login,
    registro,
    logout,
    user,
    error,
    loadingLogin,
    loadingRegistro,

  };
};

import { useEffect, useState, useCallback, useMemo } from "react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import { toast } from "react-toastify";
import useGeneralContext from "./useGeneralContext";
import Cookies from "js-cookie";
import useAdmin from "./useAdmin";

export const useAuth = ({ middleware, url }) => {
  const navigate = useNavigate();
  const [loadingRegistro, setLoadingRegistro] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [redirected, setRedirected] = useState(false); // Estado para rastrear si ya se ha redirigido
  const {
    setUserActivo,
    modalAuth,
    setModalAuth,
    setPedido,
    setUserActual,
    userActual,
  } = useGeneralContext();

  const { pedidoEnCurso,onCloseCrearEmployee, socketConnection } = useAdmin();

  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = useCallback(async () => {
    const response = await clienteAxios("/api/employees/session", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }, [token]);

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/employees/session", fetcher);

  const login = useCallback(
    async (datos, setErrores) => {
      setErrores([]);
      setLoadingLogin(true);
      try {
        const { data } = await clienteAxios.post("/api/employee/login", datos);
        localStorage.setItem("AUTH_TOKEN", data.token);
        localStorage.setItem("USER", datos.email);
        setErrores([]);
        setModalAuth(!modalAuth);
        toast.success(`Bienvenido ${data?.name}`);
        setUserActual(data);
        Cookies.set("userData", JSON.stringify(data), { expires: 2 });
        await mutate();
        setUserActivo(true);
        setLoadingLogin(false);
        setRedirected(false); // Reiniciar el estado de redirección
      } catch (error) {
        console.error(error);
        setErrores(Object.values(error.response.data.errors));
        setLoadingLogin(false);
      }
    },
    [modalAuth, mutate, setModalAuth, setUserActual, setUserActivo]
  );

  const registro = useCallback(
    async (datos, setErrores) => {
      setErrores([]);
      setLoadingRegistro(true);
      try {
        const { data } = await clienteAxios.post(
          "/api/employee/register",
          datos
        );
        socketConnection.emit("onCrearEmployee", data.employee);
        setErrores([]);
        await mutate();
        setLoadingRegistro(false);
        onCloseCrearEmployee();
      } catch (error) {
        console.log(error)
        setLoadingRegistro(false);
        setErrores(Object.values(error.response.data.errors));
        toast.error('algo salio mal')
      }
    },
    [modalAuth, mutate, setModalAuth, setUserActual, setUserActivo]
  );

  const logout = useCallback(async () => {
    try {
      await clienteAxios.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("AUTH_TOKEN");
      localStorage.removeItem("USER");
      Cookies.remove("userData");
      setUserActual([]);
      window.location.reload();
      await mutate(undefined);
      setPedido([]);
      setRedirected(false); // Reiniciar el estado de redirección
    } catch (error) {
      console.log("algo salio mal");
    }
  }, [mutate, setPedido, setUserActual, token]);

  useEffect(() => {
    if (!redirected) {
      if (!userActual || !userActual.rol) {
        // Si no hay usuario o rol, permitir acceso a /register
        if (window.location.pathname === "/auth/registro") {
          setRedirected(true); // Permitir acceso a /register
        } else {
          // Redirigir a la raíz si no es /register
          navigate("/");
          setRedirected(true);
        }
      } else {
        // Redirigir según el rol
        switch (userActual.rol) {
          case "admin":
            // Permitir acceso a cualquier ruta excepto a /admin/repartidor
            if (
              window.location.pathname === "/admin/repartidor" ||
              window.location.pathname === "/admin/cocinero" ||
              window.location.pathname === "/admin/mesero" ||
              window.location.pathname === "/"
            ) {
              navigate("/admin"); // Redirigir a la raíz si intenta acceder a /admin/repartidor
            } else {
              setRedirected(true); // Permitir acceso a otras rutas
            }
            break;
          case "repartidor":
            if (pedidoEnCurso?.numero_pedido) {
              // Si hay un pedido en curso, redirigir a la página del pedido
              navigate(
                `/admin/repartidor/pedido/${pedidoEnCurso.numero_pedido}`
              );
            } else {
              // Si no hay pedido en curso, redirigir a la página de repartidor
              navigate("/admin/repartidor");
            }
            setRedirected(true);
            break;
          default:
            navigate("/"); // En caso de que el rol no sea reconocido
            break;
        }
      }
    }
  }, [userActual, navigate, redirected, pedidoEnCurso]);

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

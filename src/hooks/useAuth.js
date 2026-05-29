import { useEffect, useState, useCallback } from "react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import { toast } from "react-toastify";
import useGeneralContext from "./useGeneralContext";
import Cookies from "js-cookie";
import useAdmin from "./useAdmin";

/**
 * Mapea el primer rol del array roles[] de v1 al string `rol` que esperan
 * los componentes del admin legacy. Evita refactorizar todos los switches
 * que aún dependen de `userActual.rol`.
 */
function normalizarUsuario(userV1) {
  if (!userV1) return null;
  const roles = userV1.roles || [];
  const rolPrincipal =
    roles.find((r) => r === "superadmin" || r === "gerente") ||
    roles[0] ||
    null;

  return {
    ...userV1,
    name: userV1.nombre,
    first_name: userV1.nombre,
    last_name: userV1.apellido,
    rol:
      rolPrincipal === "superadmin" || rolPrincipal === "gerente"
        ? "admin"
        : rolPrincipal,
    rol_original: rolPrincipal,
    id_user: userV1.id,
  };
}

export const useAuth = ({ middleware, url } = {}) => {
  const navigate = useNavigate();
  const [loadingRegistro, setLoadingRegistro] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [redirected, setRedirected] = useState(false);
  const {
    setUserActivo,
    modalAuth,
    setModalAuth,
    setPedido,
    setUserActual,
    userActual,
  } = useGeneralContext();

  const { pedidoEnCurso } = useAdmin();
  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = useCallback(async () => {
    if (!token) return null;
    const response = await clienteAxios.get("/auth/me");
    return normalizarUsuario(response.data);
  }, [token]);

  const { data: user, error, mutate } = useSWR(
    token ? "/auth/me" : null,
    fetcher
  );

  const login = useCallback(
    async (datos, setErrores) => {
      setErrores([]);
      setLoadingLogin(true);
      try {
        const { data } = await clienteAxios.post("/auth/login", datos);
        localStorage.setItem("AUTH_TOKEN", data.token);
        localStorage.setItem("USER", datos.email);

        const u = normalizarUsuario(data.user);
        setErrores([]);
        setModalAuth(!modalAuth);
        toast.success(`Bienvenido ${u.nombre}`);
        setUserActual(u);
        Cookies.set("userData", JSON.stringify(u), { expires: 2 });
        await mutate();
        setUserActivo(true);
        setRedirected(false);
      } catch (error) {
        console.error(error);
        const errores = error.response?.data?.errors;
        setErrores(
          errores
            ? Object.values(errores)
            : [error.response?.data?.message || "Error de login"]
        );
      } finally {
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
        // El admin envía {first_name, last_name, email, password, password_confirmation}
        // v1 espera {nombre, apellido, ...}
        const body = {
          nombre: datos.first_name ?? datos.nombre,
          apellido: datos.last_name ?? datos.apellido,
          email: datos.email,
          telefono: datos.telefono,
          password: datos.password,
          password_confirmation: datos.password_confirmation,
        };
        const { data } = await clienteAxios.post("/auth/register", body);
        localStorage.setItem("AUTH_TOKEN", data.token);
        localStorage.setItem("USER", datos.email);

        const u = normalizarUsuario(data.user);
        toast.success(`Bienvenido ${u.nombre} ${u.apellido ?? ""}`);
        setUserActual(u);
        Cookies.set("userData", JSON.stringify(u), { expires: 2 });
        await mutate();
        setModalAuth(!modalAuth);
        setUserActivo(true);
        setRedirected(false);
      } catch (error) {
        const errores = error.response?.data?.errors;
        setErrores(
          errores
            ? Object.values(errores)
            : [error.response?.data?.message || "Error de registro"]
        );
      } finally {
        setLoadingRegistro(false);
      }
    },
    [modalAuth, mutate, setModalAuth, setUserActual, setUserActivo]
  );

  const logout = useCallback(async () => {
    try {
      await clienteAxios.post("/auth/logout");
    } catch (e) {
      // Si el token ya está expirado, no bloqueamos el logout local
    } finally {
      localStorage.removeItem("AUTH_TOKEN");
      localStorage.removeItem("USER");
      Cookies.remove("userData");
      setUserActual(null);
      setPedido([]);
      await mutate(undefined);
      setRedirected(false);
      window.location.reload();
    }
  }, [mutate, setPedido, setUserActual]);

  useEffect(() => {
    if (redirected) return;

    if (!userActual || !userActual.rol) {
      if (window.location.pathname === "/auth/registro") {
        setRedirected(true);
      } else {
        navigate("/");
        setRedirected(true);
      }
      return;
    }

    switch (userActual.rol) {
      case "admin":
        if (
          [
            "/admin/repartidor",
            "/admin/cocinero",
            "/admin/mesero",
            "/",
          ].includes(window.location.pathname)
        ) {
          navigate("/admin");
        } else {
          setRedirected(true);
        }
        break;
      case "repartidor":
        if (pedidoEnCurso?.numero_pedido) {
          navigate(`/admin/repartidor/pedido/${pedidoEnCurso.numero_pedido}`);
        } else {
          navigate("/admin/repartidor");
        }
        setRedirected(true);
        break;
      default:
        navigate("/");
        break;
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

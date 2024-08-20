import { createContext, useState } from "react";

const GeneralContext = createContext();

const GeneralProvider = ({ children }) => {
    /* ESTADOS */
    const [userActivo, setUserActivo] = useState(false);
    const [modalAuth, setModalAuth] = useState(false);
    const [userActual, setUserActual] = useState([]);
    const [authActual, setAuthActual] = useState(true);
    


    return (
        <GeneralContext.Provider
            value={{
                setUserActivo,
                modalAuth,
                setModalAuth,
                setUserActual,
                userActivo,
                userActual,
                setAuthActual,
                authActual,
            }}>
            {children}
        </GeneralContext.Provider>
    )
}

export {GeneralProvider};
export default GeneralContext;
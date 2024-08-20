import { useContext } from "react";
import GeneralContext from "../context/GeneralProvider";

const useGeneralContext = () => {
    return useContext(GeneralContext);
}

export default useGeneralContext
import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

const usePacientes = () => {
    //se usa useContext para acceder al contexto de AuthProvider
    return useContext(PacientesContext);
}

export default usePacientes;
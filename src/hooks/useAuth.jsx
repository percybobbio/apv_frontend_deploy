import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    //se usa useContext para acceder al contexto de AuthProvider
    return useContext(AuthContext);
}

export default useAuth;
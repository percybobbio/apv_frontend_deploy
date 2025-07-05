import {useState, useEffect, createContext} from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [cargando, setCargando] = useState(true);
    //cargando es un state que indica si la app esta cargando o no
    //se usa para que cuando la app cargue, se revise si el usuario esta autenticado o no
    const [auth, setAuth] = useState({});
    //se usa useEffect para que cuando cargue la app se revise si el usuario esta autenticado o no
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if(!token){
                setCargando(false);
                return; //Si no hay token, se sale de la funcion
            }
            
            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios.get('/veterinarios/perfil', config);
                setAuth(data); //se guarda el usuario en el state
                
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({}); //Si el token no es valido, se limpia el state de auth
            }

            setCargando(false);
        }

        autenticarUsuario()
    }, []);

    const cerrarSesionAuth = () => {
        localStorage.removeItem('token'); //se elimina el token del local storage
        setAuth({}); //se limpia el state de auth
    }

    const actualizarPerfil = async datos => {
       const token = localStorage.getItem('token');
            if(!token){
                setCargando(false);
                return; //Si no hay token, se sale de la funcion
            }
            
            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const url = `/veterinarios/perfil/${datos._id}`;
                const {data} = await clienteAxios.put(url, datos, config);
                return{
                    msg: "Actualizado correctamente",
                    error: false
                }
                
            } catch (error) {
                return{
                    msg: error.response.data.msg,
                    error: true
                }
                
            }
        
    }

    const guardarPassword = async datos => {
        const token = localStorage.getItem('token');
            if(!token){
                setCargando(false);
                return; //Si no hay token, se sale de la funcion
            }
            
            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        try {
            const url = `/veterinarios/actualizar-password`;
            const {data} = await clienteAxios.put(url, datos, config)
            console.log(data);
            return{
                msg: data.msg,
                error: false
            }
            
        } catch (error) {
            return{
                msg: error.response.data.msg,
                error: true
            }
            
        }
        
    }

    return(
        <AuthContext.Provider
        //Las doble llaves son para indicar que es un objeto
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )    
}

export {
    AuthProvider
};

export default AuthContext;
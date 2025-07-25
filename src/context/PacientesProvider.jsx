import {useContext, useState, useEffect, createContext} from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

const PacientesProvider = ({children}) => {
    //Primer state para almacenar los pacientes
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    //Segundo state para almacenar el paciente que se va a editar
    const {auth} = useAuth();

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return;
                const config = {
                headers: {
                    ContentType: 'application/json',
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.get('/pacientes', config);
            setPacientes(data);
            
            } catch (error) {
                console.log(error);
                
            }
        }
        obtenerPacientes();
    }, [auth]);

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token');
        const config = {
                    headers: {
                        ContentType: 'application/json',
                        Authorization : `Bearer ${token}`
                    }
                }

        if(paciente.id) {
            try {
                const{data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacienteActualizado = pacientes
                .map(pacienteState => pacienteState._id === data._id ? data : pacienteState
                )
                setPacientes(pacienteActualizado);
            } catch (error) {
                console.log(error);                
            }            
        }else{   
            try {
                // Enviamos el paciente al backend
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
    
                //Con este codigo va a crear un nuevo objeto sin los campos que no queremos mostrar
                // como createdAt, updatedAt y __v
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data;
    
               setPacientes([pacienteAlmacenado, ...pacientes]);
                
                
            } catch (error) {
                console.log(error.response.data.msg);
                
            }
        }


        
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
        
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Deseas eliminar este paciente?');
        if(confirmar){
            try {
                const token = localStorage.getItem('token');
                if(!token) return;
                const config = {
                headers: {
                    ContentType: 'application/json',
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.delete(`/pacientes/${id}`, config);
            const pacientesActualizados = pacientes.filter(pacientesState => pacientesState._id !== id);
            setPacientes(pacientesActualizados);
            
            } catch (error) {
                console.log(error);
                
            }
        }
        
    }

    return (
        <PacientesContext.Provider
            value={{
                // Aquí puedes agregar los valores y funciones que deseas compartir este prop es obligatorio
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {
    PacientesProvider
} 

export default PacientesContext
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";


const ConfirmarCuenta = () => {
    const [cuentaComfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});
    const params = useParams();
    
    const {id} = params;
    
    useEffect(() => {
      //Se agrega [] al final de la funcion para que solo se ejecute una vez
      const confirmarCuenta =async () => {
        try {
          const url = `/veterinarios/confirmar/${id}`;
          const {data} = await clienteAxios.get(url);
          setCuentaConfirmada(true);
          setAlerta({
            msg: data.msg
          });
        } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          });
        }

        setCargando(false);
      }

      confirmarCuenta();
    }, []);
    return (
      <>
        <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Confirma tu cuenta y comienza a administrar {""}
          <span className='text-black'>tus Pacientes</span></h1>
        </div>

        <div className="mt-20 md::mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {/* Cuando ya no este cargando como true se mostrara la alerta */}
          {!cargando && <Alerta alerta={alerta}/>}

          {cuentaComfirmada && (
            <Link to="/" className="block text-center my-5 text-gray-500">
              Iniciar Sesion
            </Link>
          )}
        </div>
      </>
    )
  }
  
  export default ConfirmarCuenta;
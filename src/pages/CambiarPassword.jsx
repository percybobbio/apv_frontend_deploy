import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

function CambiarPassword() {
  //Se importa el hook useAuth para poder usar la funcion guardarPassword
  const { guardarPassword } = useAuth();
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwdActual: '',
    pwdNuevo: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(Object.values(password).some(field => field === '')) {
      //Si alguno de los campos esta vacio, se muestra un mensaje de error
      setAlerta({
        msg: 'Todos los campos son Obligatorios',
        error: true
      });
      return;
    }

    if(password.pwdActual === password.pwdNuevo) {
      //Si el password actual es igual al nuevo, se muestra un mensaje de error
      setAlerta({
        msg: 'El Password Actual no puede ser igual al Nuevo',
        error: true
      });
      return;
    }

    if(password.pwdNuevo.length < 6){
      //Si el password nuevo es menor a 6 caracteres, se muestra un mensaje de error
      setAlerta({
        msg: 'El Password Nuevo debe tener al menos 6 caracteres',
        error: true
      });
      return;
    }

    const respuesta = await guardarPassword(password);
    setAlerta(respuesta);
    
  }

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {' '} <span className="text-indigo-600 font-bold">Password Aqui</span></p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
        {msg && <Alerta alerta={alerta} />}
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Password Actual</label>
              <input 
                type="password"
                className="border w-full bg-gray-50 p-2 mt-5 rounded-lg"
                name="pwdActual"
                placeholder="Escribe tu password actual"
                onChange={e => setPassword({...password, [e.target.name] : e.target.value})}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Password Nuevo</label>
              <input 
                type="password"
                className="border w-full bg-gray-50 p-2 mt-5 rounded-lg"
                name="pwdNuevo"
                placeholder="Escribe tu password nuevo"
                onChange={e => setPassword({...password, [e.target.name] : e.target.value})}
              />
            </div>
            
            <input 
              type="submit"
              value="Actualizar Password"
              className="bg-indigo-500 py-3 px-10 text-white uppercase w-full font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-lg mt-5"
            />
          </form>
        </div>
      </div> 
    </>
  )
}

export default CambiarPassword

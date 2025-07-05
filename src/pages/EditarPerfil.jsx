import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";

function EditarPerfil() {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});

  //el [auth] es para que se ejecute cada vez que el auth cambie
  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {nombre, email} = perfil;
    if([nombre, perfil].includes('')) {
      //Si alguno de los campos esta vacio, se muestra un mensaje de error
      setAlerta({
        msg: 'El Nombre y Email son Obligatorios',
        error: true
      });
      return;
    }

    const resultado = await actualizarPerfil(perfil);
    setAlerta(resultado);
  }

  const {msg} = alerta;
  
  return (
    <>
        <AdminNav />
        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {' '} <span className="text-indigo-600 font-bold">Información Aqui</span></p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
        {msg && <Alerta alerta={alerta} />}
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Nombre</label>
              <input 
                type="text"
                className="border w-full bg-gray-50 p-2 mt-5 rounded-lg"
                name="nombre"
                /*Esto generaba un error se le agrega '' porque al cargar la pagina lo carga vacio y luego le llena el perfil*/ 
                value={perfil.nombre  || ''}
                /*La copia de perfil es la que va a traer el nombre, el target.name traera solo el dato que requerimos con el valor name (en este caso name="nombre") y el target.value lo escribira en el state del input para que no reescriba el que viene del context*/
                onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Web</label>
              <input 
                type="text"
                className="border w-full bg-gray-50 p-2 mt-5 rounded-lg"
                name="web"
                value={perfil.web  || ''}
                onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Telefono</label>
              <input 
                type="text"
                className="border w-full bg-gray-50 p-2 mt-5 rounded-lg"
                name="telefono"
                value={perfil.telefono  || ''}
                onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Email</label>
              <input 
                type="email"
                className="border w-full bg-gray-50 p-2 mt-5 rounded-lg"
                name="email"
                value={perfil.email  || ''}
                onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
              />
            </div>
            <input 
              type="submit"
              value="Guardar Cambios"
              className="bg-indigo-500 py-3 px-10 text-white uppercase w-full font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-lg mt-5"
            />
          </form>
        </div>
      </div> 
    </>
  )
}

export default EditarPerfil

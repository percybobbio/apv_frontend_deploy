import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async(e) => {
      e.preventDefault();
      if([nombre, email, password, repetirPassword].includes('')){
        setAlerta({msg: 'Hay al menos un campo vacio', error: true});
        return;
       }

       if(password !== repetirPassword){
        setAlerta({msg: 'Los passwords no son iguales', error: true});
        return;        
       }

       if (password.length < 6) {
        setAlerta({msg: 'El password es muy corto, agrega al menos 6 caracteres', error: true});
        return;
       }
       
       setAlerta({});

       //Crear el usuario en la API
      try {
        //const url = process.env.REACT_APP_API_URL + '/veterinarios';
        //const url = import.meta.env.VITE_API_URL + '/veterinarios';
        await clienteAxios.post('/veterinarios', {nombre, email, password});       
        setAlerta({
          msg: 'Creado correctamente, revisa tu email para confirmar tu cuenta', 
          error: false});
        console.log(respuesta);
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
          console.log(error.response);
          
      }
    }

    const { msg } = alerta;
    return (
      <>
        <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Crea tu cuenta y administra {""}
          <span className='text-black'>tus Pacientes</span></h1>
        </div>

        <div className="mt-20 md::mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

          {/*Mostrar alerta se usa && para mostrar el componente Alerta solo si hay un mensaje-->*/}
          {msg && <Alerta alerta={alerta} />}
          <form 
            action=""
            onSubmit={handleSubmit}
          >
            <div className='my-5'>
              <label htmlFor="" className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
              <input 
                type="text" 
                placeholder='Tu Nombre'
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </div>
            <div className='my-5'>
              <label htmlFor="" className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
              <input 
                type="email" 
                placeholder='Email de registro' 
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='my-5'>
              <label htmlFor="" className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
              <input 
                type="password" 
                placeholder='Tu password' 
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className='my-5'>
              <label htmlFor="" className='uppercase text-gray-600 block text-xl font-bold'>Repetir Password</label>
              <input 
                type="password" 
                placeholder='Repetir el password' 
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
              />
            </div>
            <input 
              type="submit" 
              className='uppercase bg-indigo-700 w-full py-3 px-10 rounded-xl font-bold text-white mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
              value="Registrar Usuario" 
              />
          </form>
          <nav className="mt-10 lg:flex lg:justify-between">
          <Link 
            to='/'
            className="block text-center my-5 text-gray-500"
            >¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link 
            to='/olvide-password'
            className="block text-center my-5 text-gray-500"
            >Olvide mi password</Link>
        </nav>
        </div>
      </>
    )
  }
  
  export default Registrar;
import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"

function Formulario() {
  const [nombreMascota, setNombreMascota] = useState('')
  const [nombrePropietario, setNombrePropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [alerta, setAlerta] = useState({})
  const [id, setId] = useState(null)

  //Extraer el objeto de pacientes se retorna como un objeto
  const {guardarPaciente, paciente} = usePacientes()

  useEffect(() => {
    if(paciente?.nombreMascota){
      setNombreMascota(paciente.nombreMascota)
      setNombrePropietario(paciente.nombrePropietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha?.split('T')[0] || '') // Formatear fecha para input
      setSintomas(paciente.sintomas)
      setId(paciente._id) // Guardar el ID del paciente para edición

    }
    
  }, [paciente])
  
  
  const handleSubmit = e => {
    e.preventDefault()

    // Validar formulario
    if([nombreMascota, nombrePropietario, email, fecha, sintomas].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }

    
    guardarPaciente({nombreMascota, nombrePropietario, email, fecha, sintomas, id})
    setAlerta({
      msg: id ? 'Paciente actualizado correctamente' : 'Paciente agregado correctamente',
    })
    setNombreMascota('')
    setNombrePropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setId('') // Resetear ID para nuevo paciente
  }

  const {msg} = alerta

  return (
    <>
    <h2 className='font-black text-3xl text-center'>Administrador de Pacientes</h2>
    <p className='text-xl mt-5 mb-10 text-center'>
              Añade tus pacientes y {' '}
              <span className='text-indigo-600 font-bold'>Administralos</span>
            </p>
    {msg && <Alerta alerta={alerta}/>}
     
      <form 
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label 
            htmlFor="nombreMascota"
            className="text-gray-700 uppercase font-bold"
          >Nombre Mascota</label>
          <input
            id="nombreMascota" 
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombreMascota}
            onChange={e => setNombreMascota(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >Nombre Propietario</label>
          <input
            id="propietario" 
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombrePropietario}
            onChange={e => setNombrePropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="email"
            className="text-gray-700 uppercase font-bold"
          >Email</label>
          <input
            id="email" 
            type="email"
            placeholder="Email contacto propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="fecha"
            className="text-gray-700 uppercase font-bold"
          >Fecha Alta</label>
          <input
            id="fecha" 
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >Sintomas</label>
          <textarea
            id="sintomas"
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors rounded-xl border-2 border-gray-600 hover:border-gray-800" 
          value={id? 'Guardar Cambios' : 'Agregar Paciente' }
        />
      </form>
    </>
  )
}

export default Formulario

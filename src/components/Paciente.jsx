import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {
    const {setEdicion, eliminarPaciente} = usePacientes();

    const {email, fecha, nombreMascota, nombrePropietario, sintomas, _id} = paciente;


    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-PE', {
            dateStyle: 'long',
        }).format(nuevaFecha)
    }
    
    
    
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-800 my-2">Nombre: {' '}
            <span className="font-normal normal-case text-black">{nombreMascota}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Propietario: {' '}
            <span className="font-normal normal-case text-black">{nombrePropietario}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Email: {' '}
            <span className="font-normal normal-case text-black">{email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Fecha de Alta: {' '}
            <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Sintomas: {' '}
            <span className="font-normal normal-case text-black">{sintomas}</span>
        </p>
        <div className="flex justify-around mt-10">
            <button
                type="button"
                className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                /*<!-- Aquí se llama a la función setEdicion con el ID del paciente para editarlo al agregar un callback este espera a que se ejecute el evento -->*/
                onClick={() => setEdicion(paciente)}
                >
                    Editar
            </button>
            <button
                type="button"
                className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                onClick={() => eliminarPaciente(_id)}
                >
                    Eliminar
            </button>
        </div>
    </div>
  )
}

export default Paciente

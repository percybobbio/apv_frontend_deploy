import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {
  const { cerrarSesionAuth } = useAuth()

  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de pacientes {' '} <span className="text-white font-black"> de veterinaria</span></h1>
        <nav className="flex flex-col lg:flex-row items-center gap-4 mt-5 lg:mt-0">
          <Link to="/admin" className="text-white text-sm uppercase font-bold">Pacientes</Link>
          <Link to="/admin/perfil" className="text-white text-sm uppercase font-bold">Perfil</Link>
          <button 
            type="button"
            className="text-white text-sm uppercase font-bold"
            onClick={cerrarSesionAuth}
            >
              Cerrar Sesión</button>
        </nav>
      </div>
    </header>
  )
}

export default Header

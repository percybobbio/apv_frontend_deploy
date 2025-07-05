const Footer = () => {
  return (
    <footer className="py-10">
      <div className="container mx-auto">
        <p className="text-center font-bold">{new Date().getFullYear()} APV - Administrador de pacientes de {' '}
          <span className="text-indigo-600 font-bold">
            veterinaria
          </span></p>
        <p className="text-center font-bold">Desarrollado por Percy Bobbio</p>
      </div>
    </footer>
  )
}

export default Footer

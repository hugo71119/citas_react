import { useState, useEffect } from "react";
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {
  const initial = JSON.parse(localStorage.getItem('pacientes')) ?? [];
  const [pacientes, setPacientes] = useState(initial);
  const [pacienteEdit, setPacienteEdit] = useState({});

  

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  },[pacientes])

  const eliminarPaciente = (id) =>{
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id );

    setPacientes(pacientesActualizados)
  }
  
  return (
    <div className="container mx-auto mt-20">
      <Header/>
      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          pacienteEdit={pacienteEdit}
          setPacienteEdit={setPacienteEdit}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPacienteEdit={setPacienteEdit}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App

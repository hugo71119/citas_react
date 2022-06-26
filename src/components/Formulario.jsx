import { useState, useEffect } from "react";
import Error from "./Error";

function Formulario({ pacientes ,setPacientes, pacienteEdit, setPacienteEdit}) {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() =>{
    if ( Object.keys(pacienteEdit).length > 0 ) {
      setNombre(pacienteEdit.nombre);
      setPropietario(pacienteEdit.propietario);
      setEmail(pacienteEdit.email);
      setFecha(pacienteEdit.fecha)
      setSintomas(pacienteEdit.sintomas)
    }
  },[pacienteEdit])

  const generarId = () =>{
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha
  }

  const handleSubmit = e => {
    e.preventDefault();

    // Validación del formulario
    if([ nombre, propietario, email, fecha, sintomas ].includes('')){
      console.log('Hay al menos un campo vacio');

      setError(true);
      return;
    }

    setError(false);

    // Objeto de Pacientes
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,
    }

    if (pacienteEdit.id) {
      // Editando el Registro
      objetoPaciente.id = pacienteEdit.id;
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === pacienteEdit.id ? objetoPaciente : pacienteState )

      setPacientes(pacientesActualizados)

      setPacienteEdit({});
    }else{
      // Nuevo Registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    // Reiniciar el form
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h1 className="font-black text-center text-3xl">Seguimiento Pacientes</h1>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form id="formulario" onSubmit={handleSubmit} className="mx-3 bg-white shadow-md rounded-lg py-10 px-5 mb-10">

        {error && <Error mensaje="Todos los campos son obligatorios" />}

        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input id="mascota" type="text" placeholder="Nombre de la Mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={nombre} onChange={ (e) => setNombre(e.target.value) }/>
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input id="propietario" type="text" placeholder="Nombre del Propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={propietario} onChange={ e => setPropietario(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input id="email" type="email" placeholder="E-mail Contacto Propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={email} onChange={ e => setEmail(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
          <input id="alta" type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={fecha} onChange={ e => setFecha(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
          <textarea name="" id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los Sintomas" value={sintomas} onChange={ e => setSintomas(e.target.value)}/>
        </div>

        <input type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={pacienteEdit.id ? "Editar Paciente" : "Agregar paciente"}
        />

      </form>
    </div>
  )
}

export default Formulario
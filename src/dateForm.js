import React, { useState } from 'react';

const DateForm = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí se puede realizar cualquier lógica necesaria con los datos del formulario
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          placeholder='Nombre'
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="Edad">Edad:</label>
        <input
          type="number"
          id="edad"
          value={edad}
          placeholder='Edad'
          onChange={(e) => setEdad(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="Sexo" >Sexo:</label>
        <select id="sexo" placeholder='Sexo' value={sexo} onChange={(e) => setSexo(e.target.value)}>
          <option value="">Seleccione...</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>
      <div>
        <label htmlFor="Correo">Correo:</label>
        <input
          type="email"
          id="correo"
          value={correo}
          placeholder='Correo'
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="Contraseña">Contraseña:</label>
        <input
          type="password"
          id="contraseña"
          value={contraseña}
          placeholder='Contraseña'
          onChange={(e) => setContraseña(e.target.value)}
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default DateForm;

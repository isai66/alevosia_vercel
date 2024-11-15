// RegisterForm.js
import React, { useState } from 'react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos del formulario al servidor y realizar el registro
    
    setIsRegistered(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Nombre' />
      </label>
      <label>
        Correo electrónico:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo' />
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
      </label>
      <button type="submit">Registrar</button>
      {isRegistered && <p>¡Registro exitoso!</p>}
    </form>
  );
};

export default RegisterForm;

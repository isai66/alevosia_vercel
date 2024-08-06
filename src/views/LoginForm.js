// LoginForm.js
import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos del formulario al servidor y realizar el inicio de sesión
    setIsLoggedIn(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Correo electrónico:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email'/>
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
      </label>
      <button type="submit">Iniciar sesión</button>
      {isLoggedIn && <p>¡Inicio de sesión exitoso!</p>}
    </form>
  );
};

export default LoginForm;

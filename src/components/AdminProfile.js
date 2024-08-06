import React, { useState } from 'react';

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: 'Admin Name',
    email: 'admin@example.com',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({
      ...admin,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar la lógica de actualización del perfil, por ejemplo, enviar los datos a un servidor
    console.log('Perfil actualizado:', admin);
  };

  return (
    <div>
      <h2>Perfil del Administrador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="name" value={admin.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={admin.email} onChange={handleChange} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" value={admin.password} onChange={handleChange} />
        </div>
        <button type="submit">Actualizar Perfil</button>
      </form>
    </div>
  );
};

export default AdminProfile;

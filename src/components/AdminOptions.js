import React from 'react';
import { Outlet, Link } from 'react-router-dom';


const AdminOptions = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Opciones de administrador</h2>
      <div class="adminclientnav">
      <ul>
        <li><Link to="AdminProfile">Administrar Usuarios</Link></li>
        <li><Link to="UsersProfile">Administrar Empleados</Link></li>
        <li><Link to="/Alta">Subir Productos</Link></li>
        <li><Link to="/Registro2">Bitacora de registros y logins</Link></li>
        <li><Link to="EditProfileAdmin">Editar Mi Perfil</Link></li>
      </ul>
      </div>
    </div>
  );
};

export default AdminOptions;

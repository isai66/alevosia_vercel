import React from 'react';
import { Outlet, Link } from 'react-router-dom';


const ClientOptions = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Opciones de cliente</h2>
      <div class="adminclientnav">
        <ul>
          <li>Ver Perfil</li>
          <li>Historial de Compras</li>
        </ul>
      </div>
    </div>
  );
};

export default ClientOptions;

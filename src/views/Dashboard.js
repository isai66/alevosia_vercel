import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/authUser'; 
import AdminOptions from '../components/AdminOptions';
import ClientOptions from '../components/ClientOptions';

const Dashboard = () => {
  const { userData, isAuthenticated, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [userData]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="min-h-screen flex items-start pt-5 justify-center">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">

      <h1 className="text-3xl font-bold text-center mb-6">Bienvenido: {userData.username}</h1>
      {isAuthenticated ? (
        <div>
          <div className="mb-6">
          {userData.rol === null ? <ClientOptions /> : <AdminOptions />}
          </div>
          <button onClick={logout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">Cerrar sesión</button>
        </div>
      ) : (
        <p className="text-center text-gray-600">No estás autenticado</p>
      )}
      </div>
    </div>
  );
};

export default Dashboard;

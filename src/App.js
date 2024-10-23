import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, {useState} from 'react';
import Plantilla from './views/Plantilla';
import Inicio from './views/Inicio';
import Inicio2 from './views/Inicio2';
import Men from './views/Men';
import NotFound from './views/404';
import Women from './views/Women';
import Producto1 from './views/Producto1';
import Somos from './views/Somos';
import Busqueda from './views/Busqueda';
import Signup from './views/Signup';
import Login from './views/Login';
import Login2 from './views/Login2';
import { Outlet, Link } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Alta from './views/Alta';
import EnviarCorreo from './views/EnviarCorreo';
import ActualizarContra from './views/ActualizarContra';
import Profile from './views/Profile';
import DataProvider from './components/DataContext';
import { AuthProvider, useAuth} from './components/authUser';
import CartContent from './components/cart/CartContent';
import DescripcionProductos from './views/DescripcionProductos';
import PedidoEstado from './views/PedidoEstado';
import AdminProfile from './components/AdminProfile';
import UsersProfile from './components/UsersProfile';
import Registro2 from './views/Registro2';
import EditProfile from './views/EditProfile';
import EditProfileAdmin from './views/EditProfileAdmin';
import AvisoPriv from './views/avisoPriv';
import Signup3 from './views/Signup3';

function App() {

  return (

    
    <div>
      
      <AuthProvider>
        <DataProvider>
        <Routes>
          <Route path='/' element={<Plantilla/>}>
            <Route path='/' element={<Inicio/>}/>
            <Route path='Inicio2' element={<Inicio2/>}/>
            <Route path='Men' element={<Men/>}/>
            <Route path='Women' element={<Women/>}/>
            <Route path='Somos' element={<Somos/>}/>
            <Route path='Busqueda' element={<Busqueda/>}/>
            <Route path="Women/Producto1" element={<Producto1/>}/>
            <Route path="Signup" element={<Signup/>}/>
            <Route path="Login" element={<Login2/>}/>
            <Route path="Registro2" element={<Registro2/>}/>
            <Route path="avisoPriv" element={<AvisoPriv/>}/>

            <Route path="Dashboard" element={<PrivateRouteUser><Dashboard/></PrivateRouteUser>}/>

            <Route path="Profile" element={<PrivateRouteUser><Profile/></PrivateRouteUser>}/>   
            <Route path="Cart" element={<PrivateRouteUser><CartContent/></PrivateRouteUser>}/>
            <Route path="Alta" element={<PrivateRoute><AltaProductos/></PrivateRoute>}/>

            <Route path="EnviarCorreo" element={<EnviarCorreo/>}/>
            <Route path="ActualizarContra" element={<ActualizarContra/>}/>
            <Route path="Descripcion/:id" element={<DescripcionProductos/>}/>
            <Route path="PedidoEstado" element={<PedidoEstado/>}/>
            <Route path="Dashboard/AdminProfile" element={<AdminProfile/>}/>
            <Route path="Dashboard/UsersProfile" element={<UsersProfile/>}/>
            <Route path="Dashboard/EditProfile" element={<PrivateRouteUser><EditProfile/></PrivateRouteUser>}/>
            <Route path="Dashboard/EditProfileAdmin" element={<PrivateRoute><EditProfileAdmin/></PrivateRoute>}/>

      
            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
        </DataProvider>
      </AuthProvider>
    </div>
  );
}

function AltaProductos() {
  const { isAuthenticated, userData } = useAuth();
  if( userData.rol=== null )
  {
    console.log( "no hay roles",userData.rol )

  }
  return !isAuthenticated || userData.rol == null ? <Navigate to="/" /> : <Alta />;
}

function PrivateRoute({ children }) {
  const { isAuthenticated, userData } = useAuth();

  // Validación: Usuario no autenticado
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  // Validación: Usuario autenticado pero sin rol
  if (isAuthenticated && !userData.rol) {
    return <Navigate to="/" />;
  }

  // Si pasa la validación, muestra el contenido de la ruta
  return children;
}

function PrivateRouteUser({ children }) {
  const { isAuthenticated, userData } = useAuth();

  // Validación: Usuario no autenticado
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Si pasa la validación, muestra el contenido de la ruta
  return children;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../sw.js', { scope: '/pwa/' })
    .then(function(registration) {
      console.log('Service Worker PWA registrado con éxito:', registration);

      console.log('Service Worker registered with scope PWA:', registration.scope);
    })
    .catch(function(error) {
      console.log('Error al registrar el service de la PWA:', error);
    });
}

export default App;



/*
<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
*/

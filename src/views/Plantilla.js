import '../App.css';
import React, { useState } from 'react';
import logo from '../image/logo.png';
import user from '../image/user.svg';
import divisor from '../image/divisor.png';
import { Outlet, Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import { Flex } from 'antd';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram, FaBars } from "react-icons/fa";
import { FaXmark, FaXTwitter } from "react-icons/fa6";
import { useAuth } from '../components/authUser';
import { useContext } from 'react';
import { dataContext } from '../components/DataContext';

import TotalItems from '../components/cart/TotalItems';


const Plantilla = props => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar el menú desplegable
  const { isAuthenticated, userData } = useAuth();
  const { logout } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alternar el estado del menú
  };


  const { history } = props;

  return (
    <div class="body">
      <header class="encabezado">
        <img class="logo alevosia" src={logo} />
        {/* Botón para desplegar el menú */}
        <button className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaXmark/> : <FaBars />}
        </button>
      </header>
      {/* La clase 'open' se añade cuando el menú está abierto */}
      <nav className={`navbar ${menuOpen ? 'open' : ''}`} >
        <ul>
          <li class="si">
            {isAuthenticated ? <Link to="/Dashboard">Cuenta</Link> : <Link to="/login">Entrar</Link>}
          </li>
          <li>
            <Link to="/" /*class="active"*/>Inicio</Link>
          </li>
          <li>
            <Link to="/men">Hombres</Link>
          </li>
          <li>
            <Link to="/women">Mujeres</Link>
          </li>
          <li>
            <Link to="/somos">¿Quiénes somos?</Link>
          </li>
          <li>
            {isAuthenticated ? <Link to="/cart"> 🛒 <TotalItems /></Link> : ""}


          </li>
          <li>
            {isAuthenticated ? <button onClick={logout}>Cerrar Sesion</button> : null}
          </li>
        </ul>
        
      </nav>
      <div class='cajaDivPlantilla'>
          <div class='cajaPlantilla'>
          </div>
        </div>
      <Outlet />
      <footer class="pie-pagina">
        <div>
          <Link to='avisoPriv'>Politica de privacidad</Link>
          <div class="red-social">
            <a href="https://facebook.com/Alevosiaboutique"><FaFacebook /></a>
            <a href="https://www.instagram.com/alevosia.boutique/" ><FaInstagram /></a>
          </div>
          <span>© 2024 Creado por Alevosía Boutique</span>
        </div>
      </footer>
    </div>
  );
}
export default Plantilla;
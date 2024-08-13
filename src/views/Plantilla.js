import '../App.css';
import logo from '../image/logo.png';
import user from '../image/user.svg';
import divisor from '../image/divisor.png';
import { Outlet, Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import { Flex } from 'antd';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from '../components/authUser'; 
import { useContext } from 'react';
import { dataContext } from '../components/DataContext';

import TotalItems from '../components/cart/TotalItems';



const Plantilla = props =>{

  const { isAuthenticated, userData } = useAuth();
  const { logout } = useAuth();


  const {history} = props;
    return (
      <div class="body">
        <header class="encabezado">
          <img class="logo" src={logo}/>
        </header>
        <nav>
          <ul>
            <li class="si">
              {/*<img class="usersvg" src={user}/>*/}
              {isAuthenticated ? <Link to="/Dashboard">Cuenta</Link> : <Link to="/login">Entrar</Link>}
              {/*<Link to="/login">Entrar</Link>*/}
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
            {/* <li>
              <Link to="/Registro2">Contáctanos</Link>
            </li> */}
            <li>
            {isAuthenticated ? <Link to="/cart"> 🛒 <TotalItems/></Link> : ""}
              
            
            </li>
            <li>
              {isAuthenticated ? <button onClick={logout}>Cerrar Sesion</button> : ""} 
            </li>
          </ul>
          <div class='cajaDivPlantilla'>
                <div class='cajaPlantilla'>
                </div>
            </div>
        </nav> 
        <Outlet/>
        {/*<footer class="pie-pagina">
          <div class="grupo-1">
            <div class="box">
              <h2>UBICACION</h2>
              <p class="pie-pagina">Calle Plaza de la Revolución Mexicana, esquina con calle Doctor GEA González, Centro. Huejutla de Reyes Hidalgo, CP 43000.</p>
            </div>
            <div class="box">
              <h2>PAGA CON TU PREFERENCIA</h2>
              <li>
                <p class="pie-pagina">Tarjetas de regalo</p>
              </li>
              <li>
                <p class="pie-pagina">Formas de pago</p>
              </li>
              <li>
                <p class="pie-pagina">Facturacion electronica</p>
              </li>
              <a href="docs/AVISO_PRIVACIDAD_ALEVOSIA_15-NOV-2023.pdf">Politica de privacidad</a>     
            </div>
            <div class="box">
              <h2>SIGUENOS</h2>
                <div class="red-social">
                  <a href="https://www.instagram.com/alevosia.boutique/" class="fa fa-facebook"><FaFacebook/></a>
                  <a href="https://facebook.com/Alevosiaboutique" class="fa fa-instagram"><FaInstagram/></a>
                </div>
            </div>
          </div>
          <script
          src="//code.jivosite.com/widget/8DmekcQaFf" async></script>
        </footer>*/}
        <footer class="pie-pagina">
          <div>
            <Link to='avisoPriv'>Politica de privacidad</Link>
            <div class="red-social">
              <a href="https://facebook.com/Alevosiaboutique"><FaFacebook/></a>
              <a href="https://www.instagram.com/alevosia.boutique/" ><FaInstagram/></a>
            </div>
            <span>© 2024 Creado por Alevosía Boutique</span>
          </div>
        </footer>
      </div>
    );
}
export default Plantilla;
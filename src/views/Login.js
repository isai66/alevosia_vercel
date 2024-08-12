import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import "../css/login.css"

const Login = () => {
    const [loginUsuario,setLoginUsuario]=useState("");
    const [loginContrasena,setLoginContrasena]=useState("");
    const navigateTo = useNavigate();

    const[loginStatus,setLoginStatus] = useState('')
    const[statusHolder,setStatusHolder] = useState('message')

    const loginUser = (e)=>{
        e.preventDefault();
        Axios.post("http://localhost:3001/login",{
            loginUsuario:loginUsuario,
            loginContrasena:loginContrasena,
        }).then((response)=>{
            console.log();
            if(response.data.message || loginUsuario == '' || loginContrasena == ''){
                navigateTo('/login')
                console.log(response.data.message)
                setLoginStatus('Los datos no existen')
            }
            else{
                navigateTo('/')
            }
        });
    }

    useEffect(()=>{
        if(loginStatus !== ''){
            setStatusHolder('showMessage')
            setTimeout(()=>{
                setStatusHolder('message')
            },4000);
        }
    },[loginStatus])

    const onSubmit=()=>{
        setLoginUsuario('')
        setLoginContrasena('')
    }

    return(
        <div class="loginPage">
            <div class='containerlogin'>
                <div class='title'>
                    <h2>Inicia Sesión</h2>
                </div>
                <div class='formDiv'>
                    <div class='headerDiv'>
                        <h3>Hola de nuevo</h3>
                    </div>
                    <form class="form grid" onSubmit={onSubmit}>
                        <span class={statusHolder}>{loginStatus}</span>
                        <div class='inputDiv'>
                            <label htmlFor='username'>Usuario: </label>
                            <div class='input flex'>
                                <FaUserShield class='icon'/>
                                <input type="text" id='username' placeholder='Ingrese su nombre de usuario' onChange={(event)=>{setLoginUsuario(event.target.value)}} required/>
                            </div>
                        </div>
                        <div class='inputDiv'>
                            <label htmlFor='password'>Contraseña: </label>
                            <div class='input flex'>
                                <BsFillShieldLockFill class='icon'/>
                                <input type="password" id='password' placeholder='Ingrese su contraseña' onChange={(event)=>{setLoginContrasena(event.target.value)}}required/>
                            </div>
                        </div>
                        <button type='submit' class='btnLogin flex' onClick={loginUser}>
                            <span class="submitText">Iniciar Sesión</span>
                            <AiOutlineSwapRight class='iconbtn'></AiOutlineSwapRight>
                        </button>
                    </form>
                    <div class='footerDiv flex'>
                            {/* <span class='forgotPswd'>¿Olvidaste tu contraseña?</span> */}
                            <span class='text'>¿No tienes una cuenta?</span>
                            <Link to={'/signup'}>
                                <button class="btn1">Registrate</button>
                            </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

/*
const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try 
            {
                const response = await axios.get("http://localhost:3001/usuarios");
                setData(response.data);
            } 
            catch (error)
            {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[]);

    return (
        <div>
            <h1>Data from API:</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.nombre}</li> // Suponiendo que "nombre" es un campo en tu tabla MySQL
                ))}
            </ul>
        </div>
    )

*/

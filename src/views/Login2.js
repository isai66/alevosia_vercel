import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { useAuth } from '../components/authUser'; 
import "../css/login.css"

const Login = () => {
    const [loginUsuario,setLoginUsuario]=useState("");
    const [loginContrasena,setLoginContrasena]=useState("");
    const navigateTo = useNavigate();
    const { login, setUser } = useAuth(); // funcion parar guardar la sesion en JWT

    const [loginSuccessful,setLoginSuccessful] = useState(false);

    const[loginStatus,setLoginStatus] = useState('')
   // const[statusHolder,setStatusHolder] = useState('message')

    const refreshPage = () => {
        window.location.reload();
      }

    const loginUser = (e)=>{
        e.preventDefault();
        /*
        console.log({loginUsuario:loginUsuario,
        loginContrasena: loginContrasena})
        */
        
        const data ={
            loginUsuario:loginUsuario,
            loginContrasena:loginContrasena,
        }
        fetch('https://alev-backend-vercel.vercel.app/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.data)
            localStorage.setItem('id_usuario',result.data.id_usuario)
            if(result.token){
                login(result.token, result.data); // Almacena el token JWT en el almacenamiento local
                navigateTo('/');
                refreshPage();
                //localStorage.setItem('token',result.token)
               // setLoginSuccessful(true);
            }else if (result.error) {
                setLoginStatus(result.error); // Muestra el mensaje de error desde el backend
            }
        })
        .catch(error=>{
            console.log(error)
            setLoginStatus('Por favor, intenta de nuevo.');
        })
       /* Axios.post("http://localhost:3001/login",{
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
        });*/
    }

    useEffect(()=>{
        if(loginStatus !== ''){
            //setStatusHolder('showMessage')
            setTimeout(()=>{
                setLoginStatus('')
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
                <div>
                    <h3 className='text-lg font-medium mb-4 text-center'>Hola de nuevo</h3>
                    <form class="space-y-4" onSubmit={onSubmit}>
                    {loginStatus && <span className="text-red-500">{loginStatus}</span>}
                    <div class='inputDiv'>
                            <label htmlFor='username' >Usuario: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    <FaUserShield />
                                </span>
                                <input type="text" id='username' placeholder='Ingrese su nombre de usuario' onChange={(event)=>{setLoginUsuario(event.target.value)}} required className="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor='password' >Contraseña: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    <BsFillShieldLockFill />
                                </span>
                                <input type="password" id='password' placeholder='Ingrese su contraseña'onChange={(event)=>{setLoginContrasena(event.target.value)}} required className="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                            </div>
                        </div>
                        <button type='submit' class='btnLogin flex' onClick={loginUser}>
                            <span class="submitText">Iniciar Sesión</span>
                            <AiOutlineSwapRight class='iconbtn'></AiOutlineSwapRight>
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                            {/* <span class='forgotPswd'>¿Olvidaste tu contraseña?</span> */}
                            <span class="text">¿No tienes una cuenta?</span>
                            <Link to={'/signup'}>
                                <button class="btn1">Registrate</button>
                            </Link>
                            <br/>
                            <span class='text'>¿Olvidaste tu contraseña?</span>
                            <Link to={'/EnviarCorreo'}>
                                <button class="btn1">Actualizala</button>
                            </Link>
                    </div>
                </div>
            </div>
            <br/>
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
/*
<>{loginSuccessful ? <Carrito2/> : <div class="loginPage">
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
                                <input type="password" id='password' placeholder='Ingrese su contraseña'onChange={(event)=>{setLoginContrasena(event.target.value)}} required/>
                            </div>
                        </div>
                        <button type='submit' class='btnLogin flex' onClick={loginUser}>
                            <span class="submitText">Iniciar Sesión</span>
                            <AiOutlineSwapRight class='iconbtn'></AiOutlineSwapRight>
                        </button>
                    </form>
                    <div class='footerDiv flex'>
                            { <span class='forgotPswd'>¿Olvidaste tu contraseña?</span> }
                            <span class='text'>¿No tienes una cuenta?</span>
                            <Link to={'/signup'}>
                                <button class="btn1">Registrate</button>
                            </Link>
                    </div>
                </div>
            </div>
        </div>}</>
*/

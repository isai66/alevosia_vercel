import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
//import '../components/ValidaSignUp'


import "../css/signup.css"

const Signup = () => {


    const [nombre,setNombre]=useState("");
    const [apellido,setApellido]=useState("");
    const [codigoPostal,setCP]=useState("");
    const [estado,setEstado]=useState("");
    const [municipio,setMunicipio]=useState("");
    const [colonias, setColonias] = useState([]);
    const [colonia,setColonia]=useState("");
    const [calle,setCalle]=useState("");
    const [numint,setNumInt]=useState("");
    const [numext,setNumExt]=useState("");
    const [telefono,setTelefono]=useState("");
    const [usuario,setUsuario]=useState("");
    const [correo,setCorreo]=useState("");
    const [contrasena,setContrasena]=useState("");
    const [error, setError] = useState("");
    const [errors, setErrors] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigateTo = useNavigate()

    useEffect(() => {
        if (codigoPostal.length === 5) {
            Axios.get(`http://localhost:3001/codigo_postal?cp=${codigoPostal}`)
                .then(response => {
                    const data = response.data;
                    console.log(data.codigo_postal)
                    if (!data.error) {
                        setEstado(data.codigo_postal.estado);
                        setMunicipio(data.codigo_postal.municipio);
                        setColonias(data.codigo_postal.colonias);
                    } else {
                        console.error(data.message);
                    }
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                });
        }
    }, [codigoPostal]);

    const validateFields = () => {
        const newErrors = {};
        const regexLetters = /^[a-zA-Z\s]+$/;
        const regexUsername = /^[a-zA-Z0-9]+$/;
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!regexLetters.test(nombre)) newErrors.nombre = "El nombre solo puede contener letras y no estar vacio.";
        if (!regexLetters.test(apellido)) newErrors.apellido = "El apellido solo puede contener letras y no estar vacio.";
        if (!calle) newErrors.calle = "La calle es obligatoria.";
        if (numext === "" || parseInt(numext) < 0) newErrors.numext = "El número exterior es obligatorio y no puede ser negativo.";
        if (numint !== "" && parseInt(numint) < 0) newErrors.numint = "El número interior no puede ser negativo.";
        if (!codigoPostal) newErrors.codigoPostal = "El codigo postal es obligatorio.";
        if (telefono.length !== 10 || isNaN(telefono) || parseInt(telefono) < 0) newErrors.telefono = "El teléfono debe tener 10 caracteres y no puede ser negativo.";
        if (!regexUsername.test(usuario)) newErrors.usuario = "El usuario solo puede contener letras y números.";
        if (!regexEmail.test(correo)) newErrors.correo = "El correo no tiene un formato válido.";
        if (!regexPassword.test(contrasena)) newErrors.contrasena = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkUserExists = (usuario) => {
        return Axios.get(`http://localhost:3001/usuarioExiste?usuario=${usuario}`)
            .then(response => response.data.exists)
            .catch(error => {
                console.error("Error checking user existence: ", error);
                return false;
            });
    };

    const createUser = async  (e)=>{
        e.preventDefault()
        if (!validateFields()) return;

        setIsSubmitting(true);
        setError("");

        const userExists = await checkUserExists(usuario);

        if (userExists) {
            setError("Este usuario no está disponible.");
            setIsSubmitting(false);
            return;
        }

        Axios.post("http://localhost:3001/signup",{
            usuario:usuario,
            nombre:nombre,
            apellido:apellido,
            codigoPostal:codigoPostal,
            estado:estado,
            municipio:municipio,
            colonia:colonia,
            calle:calle,
            numint:numint,
            numext:numext,
            contrasena:contrasena,
            correo:correo,
            telefono:telefono
        }).then(()=>{
            navigateTo('/login')
            setNombre('')
            setApellido('')
            setCP('')
            setEstado('')
            setMunicipio('')
            setColonias([])
            setColonia('')
            setCalle('')
            setNumInt('')
            setNumExt('')
            setTelefono('')
            setUsuario('')
            setCorreo('')
            setContrasena('')
        }).catch(error => {
            console.error("Error registering user: ", error);
            setError("Error al registrar el usuario.");
        }).finally(() => {
            setIsSubmitting(false);
        });
    }

    return(
        <div class="signupPage">
            <div class='containersignup'>
                <div class='title'>
                    <h2>Registrate</h2>
                </div>
                <div class=''>
                        <h3>Déjanos conocerte</h3>
                    <form action='' class="formsignup grid" id='formulario'>
                        
                        <div class='inputDiv'>
                            <label htmlFor='nombre'>Nombre: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <FaUser class='icon'/>
                                </span>
                                <input type="text" id='nombre' placeholder='Ingrese su nombre' value={nombre} onChange={(event)=>{setNombre(event.target.value)}} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                            {errors.nombre && <p className="text-red-500 text-sm mt-2">{errors.nombre}</p>}
                        </div>

                        <div class='inputDiv'>
                            <label htmlFor='apellido'>Apellido: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <FaUser class='icon'/>
                                </span>
                                <input type="text" id='apellido' placeholder='Ingrese su apellido' value={apellido} onChange={(event)=>{setApellido(event.target.value)}} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                            {errors.apellido && <p className="text-red-500 text-sm mt-2">{errors.apellido}</p>}
                        </div>

                        <div class='inputDiv'>
                            <label htmlFor='codigopostal'>Código Postal: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <IoHome class='icon'/>
                                </span>
                                <input type="number" id='codigopostal' placeholder='Ingrese su Código Postal' value={codigoPostal} onChange={(event) => setCP(event.target.value)} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                            {errors.codigoPostal && <p className="text-red-500 text-sm mt-2">{errors.codigoPostal}</p>}
                        </div>

                        <div class='inputDiv'>
                            <label htmlFor='estado'>Estado: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <IoHome class='icon'/>
                                </span>
                                <input type="text" id='estado' value={estado} readOnly placeholder='Estado autorrellenable' className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                        </div>

                        <div class='inputDiv'>
                            <label htmlFor='municipio'>Municipio: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <IoHome class='icon'/>
                            </span>
                                <input type="text" id='municipio' value={municipio} readOnly placeholder='Municipio autorrellenable' className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                        </div>

                        <div class='inputDiv'>
                            <label htmlFor='colonia'>Colonia: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <IoHome class='icon'/>
                                </span>
                                <select class="colonia" id="colonia" required onChange={(event)=>{setColonia(event.target.value)}} className="flex-1 block rounded-none rounded-r-md border-gray-300 selectBox">
                                    <option value="">Seleccionar Colonia</option>
                                    {colonias.map((col, index) => (
                                        <option key={index} value={col}>{col}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div class='inputDiv'>
                            <label htmlFor='calle'>Calle: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <IoHome class='icon'/>
                                </span>
                                <input type="text" id='calle' placeholder='Ingrese su calle' value={calle} onChange={(event)=>{setCalle(event.target.value)}} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                            {errors.calle && <p className="text-red-500 text-sm mt-2">{errors.calle}</p>}
                        </div>

                        <div class='inputDiv'>
                            <label htmlFor='numinterior'>Número interior:</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <IoHome class='icon'/>
                                </span>
                                <input type="number" id='numinterior' placeholder='Opcional' value={numint} onChange={(event)=>{setNumInt(event.target.value)}} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                            {errors.numint && <p className="text-red-500 text-sm mt-2">{errors.numint}</p>}
                        </div>

                        <div class='inputDiv'>
                            <label htmlFor='numexterior'>Número exterior: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <IoHome class='icon'/>
                                </span>
                                <input type="number" id='numexterior' placeholder='Ingrese su numero exterior' value={numext} onChange={(event)=>{setNumExt(event.target.value)}} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                            {errors.numext && <p className="text-red-500 text-sm mt-2">{errors.numext}</p>}
                        </div>

                        <div class='inputDiv'>
                            <label htmlFor='telefono'>Teléfono: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <FaPhoneAlt class='icon'/>
                                </span>
                                <input type="number" id='telefono' placeholder='Ingrese número telefónico' value={telefono} onChange={(event)=>{setTelefono(event.target.value)}} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                            {errors.telefono && <p className="text-red-500 text-xs italic">{errors.telefono}</p>}
                        </div>

                        <div class='inputDiv'>
                            <label htmlFor='username'>Usuario: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <FaUserShield class='icon'/>
                                </span>
                                <input type="text" id='username' placeholder='Ingrese su nombre de usuario' value={usuario} onChange={(event)=>{setUsuario(event.target.value)}} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                            {/* Display error message if any */}
                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error}
                            </div>
                        )}   
                        </div>
                                       

                        <div class='inputDiv'>
                            <label htmlFor='email'>Correo: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <MdMarkEmailRead class='icon'/>
                                </span>
                                <input type="email" id='email' placeholder='Ingrese su correo electrónico' value={correo} onChange={(event)=>{setCorreo(event.target.value)}} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                            {errors.correo && <p className="text-red-500 text-xs italic">{errors.correo}</p>}
                        </div>

                        <div class='inputDiv'>
                            <label htmlFor='password'>Contraseña: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <BsFillShieldLockFill class='icon'/>
                            </span>
                                <input type="password" id='password' placeholder='Ingrese su contraseña' value={contrasena} onChange={(event)=>{setContrasena(event.target.value)}} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                            {errors.contrasena && <p className="text-red-500 text-xs italic">{errors.contrasena}</p>}

                        </div>

                        <button type='submit' class='btnSignup flex' onClick={createUser}>
                            <span class="submitText">Registrarse</span>
                            <AiOutlineSwapRight class='iconbtn'></AiOutlineSwapRight>
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                            {/* <span class='forgotPswd'>¿Olvidaste tu contraseña?</span> */}
                            <span class='text'>¿Ya tienes una cuenta?</span>
                            <Link to={'/login'}>
                                <button class="btn1">Inicia Sesión</button>
                            </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;

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

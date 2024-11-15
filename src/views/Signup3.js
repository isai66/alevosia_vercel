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
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "../css/signup.css";

const Signup3 = () => {


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
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);


    const navigateTo = useNavigate()

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    
    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };
    

    useEffect(() => {
        if (codigoPostal.length === 5) {
            Axios.get(`https://alev-backend-vercel.vercel.app/codigo_postal?cp=${codigoPostal}`)
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

    const validatePassword = (password) => {
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regexPassword.test(password);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setContrasena(newPassword);

        if (!validatePassword(newPassword)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                contrasena: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
            }));
        } else {
            setErrors(prevErrors => {
                const { contrasena, ...rest } = prevErrors;
                return rest;
            });
        }
    };

    const validateFields = () => {
        const newErrors = {};
        const regexLetters = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
        const regexUsername = /^[a-zA-Z0-9!#$%^&*()_=\[\]{};:'"<>\/\\|`~]+$/;
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regexLetters.test(nombre)) newErrors.nombre = "El nombre solo puede contener letras y no estar vacio.";
        if (!regexLetters.test(apellido)) newErrors.apellido = "El apellido solo puede contener letras y no estar vacio.";
        if (!calle) newErrors.calle = "La calle es obligatoria.";
        if (numext === "" || parseInt(numext) < 0) newErrors.numext = "El número exterior es obligatorio y no puede ser negativo.";
        if (numint !== "" && parseInt(numint) < 0) newErrors.numint = "El número interior no puede ser negativo.";
        if (!codigoPostal) newErrors.codigoPostal = "El codigo postal es obligatorio.";
        if (telefono.length !== 10 || isNaN(telefono) || parseInt(telefono) < 0) newErrors.telefono = "El teléfono debe tener 10 caracteres y no puede ser negativo.";
        if (!regexUsername.test(usuario)) newErrors.usuario = "El usuario solo puede contener letras, números y algunos caracteres especiales como guión bajo.";
        if (!regexEmail.test(correo)) newErrors.correo = "El correo no tiene un formato válido.";
        if (!validatePassword(contrasena)) newErrors.contrasena = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";

        setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };


    const checkUserExists = (usuario) => {
        return Axios.get(`https://alev-backend-vercel.vercel.app/usuarioExiste?usuario=${usuario}`)
            .then(response => response.data.exists)
            .catch(error => {
                console.error("Error checking user existence: ", error);
                return false;
            });
    };

    const createUser = async (e)=>{
        e.preventDefault()

        if (!validateFields()) return;

        setError("");

        const userExists = await checkUserExists(usuario);

        if (userExists) {
            setError("Este usuario no está disponible.");
            setIsSubmitting(false);
            return;
        }
        Axios.post("https://alev-backend-vercel.vercel.app/signup",{
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
            message.success('Usuario registrado exitosamente.');
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
    const toggleMostrarContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia);
    };
    
    return (
        <div class="signupPage">
            <div class='containersignup'>
                <div class='title'>
                    <h2>Registrate</h2>
                </div>
    
                <form action='' className="formsignup grid" id='formulario'>
    
                    {currentStep === 1 && (
                        <>
                            <h3>Información Personal</h3>
                            <div class='inputDiv'>
                                <label htmlFor='nombre'>Nombre: </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        <FaUser class='icon' />
                                    </span>
                                    <input type="text" id='nombre' placeholder='Ingrese su nombre' value={nombre} onChange={(event) => { setNombre(event.target.value) }} className="flex-1 block rounded-none rounded-r-md border-gray-300" />
                                </div>
                                {errors.nombre && <p className="text-red-500 text-sm mt-2">{errors.nombre}</p>}
                            </div>
    
                            <div class='inputDiv'>
                                <label htmlFor='apellido'>Apellido: </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        <FaUser class='icon' />
                                    </span>
                                    <input type="text" id='apellido' placeholder='Ingrese su apellido' value={apellido} onChange={(event) => { setApellido(event.target.value) }} className="flex-1 block rounded-none rounded-r-md border-gray-300" />
                                </div>
                                {errors.apellido && <p className="text-red-500 text-sm mt-2">{errors.apellido}</p>}
                            </div>
    
                            <div class='inputDiv'>
                                <label htmlFor='telefono'>Teléfono: </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        <FaPhoneAlt class='icon' />
                                    </span>
                                    <input type="number" id='telefono' placeholder='Ingrese número telefónico' value={telefono} onChange={(event) => { setTelefono(event.target.value) }} className="flex-1 block rounded-none rounded-r-md border-gray-300" />
                                </div>
                                {errors.telefono && <p className="text-red-500 text-sm mt-2">{errors.telefono}</p>}
                            </div>
    
                            <button type="button" onClick={nextStep} className="btn btn-primary">Siguiente</button>
                        </>
                    )}
    
                    {currentStep === 2 && (
                        <>
                            <h3>Información de Dirección</h3>
                            <div class='inputDiv'>
                                <label htmlFor='codigopostal'>Código Postal: </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        <IoHome class='icon' />
                                    </span>
                                    <input type="number" id='codigopostal' placeholder='Ingrese su Código Postal' value={codigoPostal} onChange={(event) => setCP(event.target.value)} className="flex-1 block rounded-none rounded-r-md border-gray-300" />
                                </div>
                                {errors.codigoPostal && <p className="text-red-500 text-sm mt-2">{errors.codigoPostal}</p>}
                            </div>
    
                            <div class='inputDiv'>
                                <label htmlFor='calle'>Calle: </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        <IoHome class='icon' />
                                    </span>
                                    <input type="text" id='calle' placeholder='Ingrese su calle' value={calle} onChange={(event) => { setCalle(event.target.value) }} className="flex-1 block rounded-none rounded-r-md border-gray-300" />
                                </div>
                                {errors.calle && <p className="text-red-500 text-sm mt-2">{errors.calle}</p>}
                            </div>
    
                            <button type="button" onClick={prevStep} className="btn btn-secondary">Anterior</button>
                            <button type="submit" className="btn btn-primary">Registrarse</button>
                        </>
                    )}
    
                </form>
            </div>
        </div>
    );
    
};

export default Signup3;
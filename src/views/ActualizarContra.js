import React, { useState, useEffect } from 'react'
import logo from '../image/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { message } from 'antd';
import { BsFillShieldLockFill } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";


const ActualizarContra = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmarContrasenia, setConfirmarContrasenia] = useState('');

    const [errorText, setErrorText] = useState('');
    const [errorTextConfirmacion, setErrorTextConfirmacion] = useState('');
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    const [mostrarContrasenia2, setMostrarContrasenia2] = useState(false);

    useEffect(() => {
        if (errorText !== '') {
            const timer = setTimeout(() => {
                setErrorText('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorText]);

    useEffect(() => {
        if (errorTextConfirmacion !== '') {
            const timer = setTimeout(() => {
                setErrorTextConfirmacion('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorTextConfirmacion]);

    const Validaciones_Contras = (value) => {
        const errorMess = [];
        const contenerMayusculas = /[A-Z]/.test(value);
        const contenerMinusculas = /[a-z]/.test(value);
        const contenerNumeros = /\d/.test(value);
        const contenerCaracteresEsp = /[!@#$*]/.test(value);
        if (!contenerMayusculas) errorMess.push('Debe contener al menos una letra mayúscula.');
        if (!contenerMinusculas) errorMess.push('Debe contener al menos una letra minúscula.');
        if (!contenerNumeros) errorMess.push('Debe contener al menos un número.');
        if (!contenerCaracteresEsp) errorMess.push('Debe contener al menos uno de los siguientes caracteres especiales: !, @, #, $, *.');
        return errorMess.length === 0 ? '' : errorMess.join(' ');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (correo === '' || usuario === '') {
            message.warning('Por favor, ingrese su correo electrónico y su usuario.');
        } else {
            validarConfirmacionContrasenia();
        }
    };

    const validarConfirmacionContrasenia = () => {
        if (confirmarContrasenia === contrasenia) {
            actualizarContrasenia();
        } else {
            setErrorTextConfirmacion('Las contraseñas no coinciden');
        }
    };

    const actualizarContrasenia = async () => {
        const datos = {
            usuario: usuario,
            correo: correo,
            contrasenia: contrasenia
        };
        try {
            console.log(datos);
            //const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/actualizarContraChay.php', {
            const response = await fetch('https://alevosia.host8b.me/Web_Services/actualizarContraChay.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            const { success } = await response.json();
            if (success === true) {
                message.success('Cambio de contraseña Exitoso.')
                navigate('/Login');
            } else {
                message.error('Error al actualizar la contraseña')
            }
        } catch (error) {
            console.log('Error al actualizar los datos...');
            navigate('/NotServe');
        }
    };
    const toggleMostrarContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia);
    };
    const toggleMostrarContrasenia2 = () => {
        setMostrarContrasenia2(!mostrarContrasenia2);
    };

    return (
        <div>
            <div class="containerlogin">
                <div className="col-md-4">
                    <div class='title'>
                        <h2>Actualiza Tu Contraseña</h2>
                    </div>
                    <h3 className="text-lg font-medium mb-4 mt-4 text-center">Introduce una nueva contraseña segura</h3>

                    {errorText && <p className="text-lg font-medium mb-4 mt-4 text-center" style={{ color: 'red' }}>{errorText}</p>}
                    {errorTextConfirmacion && <p className="text-lg font-medium mb-4 mt-4 text-center" style={{ color: 'red' }}>{errorTextConfirmacion}</p>}

                    <form className='space-y-4' onSubmit={handleFormSubmit}>
                        <div className="inputDiv">
                            <label htmlFor="usuario">Usuario:</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    <MdMarkEmailRead />
                                </span>
                                <input type="text" id="usuario" name="usuario" value={usuario}
                                    onChange={(e) => { setUsuario(e.target.value) }} required
                                    className="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder='Ingrese su nombre de usuario' />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="correo">Correo electronico:</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    <MdMarkEmailRead />
                                </span>
                                <input type="text" id="correo" name="correo" value={correo}
                                    onChange={(e) => { setCorreo(e.target.value) }} required
                                    className="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder='Ingrese su correo como verificación' />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="contrasenia">Nueva Contraseña:</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    <BsFillShieldLockFill />
                                </span>
                                <input type={mostrarContrasenia ? 'text' : 'password'} id="contrasenia" name="contrasenia" value={contrasenia}
                                    onChange={(e) => { setContrasenia(e.target.value); const erro = Validaciones_Contras(e.target.value); setErrorText(erro); }} required
                                    className="flex-1 block w-full rounded-none  sm:text-sm border-gray-300" placeholder='Ingrese una nueva contraseña' />
                                <button type="button" onClick={toggleMostrarContrasenia} className="rounded-none rounded-r-md border-gray-300"
                                    style={{ backgroundColor: 'white', color: 'black', border: 'none', cursor: 'pointer' }}>
                                    {mostrarContrasenia ? (<FontAwesomeIcon icon={faEyeSlash} />) : (<FontAwesomeIcon icon={faEye} />)}
                                </button>
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="contrasenia">Confirmar Contraseña:</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    <BsFillShieldLockFill />
                                </span>
                                <input type={mostrarContrasenia2 ? 'text' : 'password'} id="confirmarContrasenia" name="confirmarContrasenia" value={confirmarContrasenia}
                                    onChange={(e) => { setConfirmarContrasenia(e.target.value); setErrorTextConfirmacion(''); }} required
                                    className="flex-1 block w-full rounded-none  sm:text-sm border-gray-300" placeholder='Confirma la contraseña' />
                                <button type="button" onClick={toggleMostrarContrasenia2} className="rounded-none rounded-r-md border-gray-300"
                                    style={{ backgroundColor: 'white', color: 'black', border: 'none', cursor: 'pointer' }}>
                                    {mostrarContrasenia2 ? (<FontAwesomeIcon icon={faEyeSlash} />) : (<FontAwesomeIcon icon={faEye} />)}
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <button type="submit" class="btnLogin2 flex">Actualizar Contraseña</button>
                        </div>
                        <div className="">
                            <Link to={'/Login'}>
                                <button class="btn1">Atras</button>
                            </Link>
                        </div>


                    </form>

                </div>
            </div>
        </div>
    )
}

export default ActualizarContra

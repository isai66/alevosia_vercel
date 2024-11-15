import React, {useState} from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import BreadCrumb from '../components/BreadCrumb';
    
    function Signup() {
        const navigate = useNavigate();
        
        const [usuario, setUsuario] = useState('');
        const [nombre, setNombre] = useState('');
        const [apellidoPaterno, setApellidoPaterno] = useState('');
        const [apellidoMaterno, setApellidoMaterno] = useState('');
        const [estado, setEstado] = useState('');
        const [municipio, setMunicipio] = useState('');
        const [colonia, setColonia] = useState('');
        const [calle, setCalle] = useState('');
        const [numint, setNumInt] = useState('');
        const [numext, setNumExt] = useState('');
        const [contrasenia, setContrasenia] = useState('');
        const [repetirContrasena, setRepetirContrasena] = useState('');
        const [mensaje, setMensaje] = useState('');
        const [telefono, setTelefono] = useState('');
        const [correo, setCorreo] = useState('');
        
        
    
        const [correoError, setCorreoError] = useState('');
        const [telefonoError, setTelefonoError] = useState('');
        
        const RegistrarUsuarioValido = async () => {
            const datos = {
                nombre: nombre,
            //    apellidoPaterno: apellidoPaterno,
              //  apellidoMaterno: apellidoMaterno,
              estado: estado,
              municipio: municipio,
              colonia: colonia,
              calle:calle,
              numint: numint,
              numext: numext,
                correo: correo,
                telefono: telefono,
                contrasenia: contrasenia,
                usuario: usuario
            };
        
            try {
                const response = await fetch('http://localhost/alevosia_webservice/register_process.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datos),
                });
        
                const responseData = await response.json();
        
                if (response.ok) {
                    const { success, id_rol, message } = responseData; // Incluir id_rol en la respuesta
                    console.log(id_rol);
                    if (success) {
                        Cookies.set('token', responseData.token, { expires: 7 });
                        if (id_rol === '1') {
                            navigate('/HomeDirectivo');
                        } else if (id_rol === '2') {
                            navigate('/HomeAdministrativo');
                        } else if (id_rol === '3') {
                            navigate('/HomeDocente');
                        } else {
                            navigate('/NotFound');
                        }
                        alert('Registro exitoso', message);
                    } else {
                        alert('Error', message);
                    }
                } else {
                    alert('Error', 'No se pudo completar el registro');
                }
            } catch (error) {
                console.error('Error al intentar registrar:', error);
                alert('Error del servidor');
            }
        };    
    
        const VerificarTelefonoExistente = async (e) => {
            const datos = { telefono: telefono };
    
            try {
                const response = await fetch('http://localhost/alevosia_webservice/register_process.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datos),
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData)
                    if (responseData.success === true) {
                        setTelefonoError('El telefono ya esta en uso, por favor intente con otro numero.'); setTimeout(() => setTelefonoError(null), 3000);
                    } else {
                        RegistrarUsuarioValido();
                    }
                } else {
                    setTelefonoError('Error al intentar verificar si el telefono esta en uso:'); setTimeout(() => setTelefonoError(null), 3000);
                }
            } catch (error) {
                setTelefonoError('Error al intentar verificar el telefono:'); setTimeout(() => setTelefonoError(null), 3000);
            }
        };
    
        const verificarCorreoExistente = async () => {
            const datos = { correo: correo };
    
            try {
                const response = await fetch('http://localhost/alevosia_webservice/register_process.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datos),
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData)
                    if (responseData.success === true) {
                        setCorreoError('El correo ya esta en uso, intente con otro correo por favor'); setTimeout(() => setCorreoError(null), 3000);
                    } else {
                        VerificarTelefonoExistente();
                    }
                } else {
                    console.log('peor')
                    setCorreoError('Datos incorrectos'); setTimeout(() => setCorreoError(null), 3000);
                }
            } catch (error) {
                setCorreoError('Error al intentar verificar el correo:'); setTimeout(() => setCorreoError(null), 3000);
            }
        };
        
        const Validacion = () => {
            if (nombre === '' || apellidoPaterno === '' || apellidoMaterno === '' || usuario === '' || correo === '' || telefono === '' || contrasenia === '') {
              setMensaje("Hay campos vacíos");
              return false;
            }
            verificarCorreoExistente();
        };
        
        const handleSubmit = async (event) => {
            event.preventDefault();
      
            if (contrasenia !== repetirContrasena) {
              setMensaje('Las contraseñas no coinciden, verifique por favor.');
            } else {
                Validacion();
            }
        };
      
        const ValidarNombre = () => {
            const mensaje = document.getElementById('nombre');
            const nota = document.getElementById('validarNombre');
            const partido = mensaje.value.trim();
            const nombreRegex = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;
          
            if (nombreRegex.test(partido)) {
                nota.innerHTML = '<span style="color:green; font-size: 25px">&#10003</span>';
            } else {
                nota.innerHTML = '<span style="color:red">El nombre debe contener solo letras y espacios, con una longitud de 3 a 40 caracteres</span>';
            }
        };
      
        const ValidarApellidoPa = () => {
            const mensaje = document.getElementById('apellidopa');
            const nota = document.getElementById('validarApellidoPa');
            const partido2 = mensaje.value.trim();
            const nombreRegex2 = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;
          
            if (nombreRegex2.test(partido2)) {
                nota.innerHTML = '<span style="color:green; font-size: 25px">&#10003</span>';
            } else {
                nota.innerHTML = '<span style="color:red">El Apellido Paterno debe contener solo letras y espacios con una longitud menor de 40.</span>';
            }
        };
      
        const ValidarApellidoMa = () => {
            const mensaje = document.getElementById('apellidoma');
            const nota = document.getElementById('validarApellidoma');
            const partido3 = mensaje.value.trim();
            const nombreRegex3 = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;
        
            if (nombreRegex3.test(partido3)) {
                nota.innerHTML = '<span style="color:green; font-size: 25px">&#10003</span>';
            } else {
                nota.innerHTML = '<span style="color:red">El Apellido Materno debe contener solo letras y espacios y una longitud menos de 40.</span>';
            }
        };
    
        const validarCorreo = () => {
            const correo = document.getElementById('correo');
            const mensaje = document.getElementById('validar');
            const partido3 = correo.value.trim();
            const correoRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
          
            if (correoRegex.test(partido3)) {
                mensaje.innerHTML = '<span style="color:green; font-size: 25px">&#10003</span>';
            } else {
                mensaje.innerHTML = '<span style="color:red">El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.</span>';
            }
        };
      
        const validarContraseña = () => {
            const contra = document.getElementById('contraseña');
            const reContra = document.getElementById('reContraseña');
            const contraMensaje = document.getElementById('validarContrasena');
        
            if (contra.value === reContra.value) {
                contraMensaje.innerHTML = '<span style="color:green; font-size: 25px">&#10003</span>';
            } else {
                contraMensaje.innerHTML = '<span style="color:red">la verificación es incorrecta.</span>';
            }
        };
    
        const ValidarContra = () => {
            const contra = document.getElementById('contraseña');
            const mensaje = document.getElementById('validarContra');
            const mensaje2 = document.getElementById('validarContra2');
            const emailRegex = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[!@#$%^&*]).{8,}$/;
        
            if (emailRegex.test(contra.value)) {
                mensaje2.innerHTML = '<span style="color:green; font-size: 25px">&#10003</span>';
                mensaje.innerHTML = '';
            } else if (contra.value === '') {
                mensaje2.innerHTML = '';
            } else {
                mensaje.innerHTML = '<span style="color:red">Solo Mayúsculas, Minúsculas, Números y Almenos un caracter especial.</span>';
            }
        };
      
        const ValidarTelefono = () => {
            const tel = document.getElementById('telefono');
            const mensaje = document.getElementById('mensajeTel');
            const mensaje2 = document.getElementById('mensajeTel2');
            const partido = tel.value.trim();
            const telefonoRegex = /^\d{8,16}$/;
          
            if (telefonoRegex.test(partido)) {
              mensaje2.innerHTML = '<span style="color:green; font-size: 25px">&#10003</span>';
              mensaje.innerHTML = '';
            } else {
              mensaje.innerHTML = '<span style="color:red">El número de teléfono debe contener solo dígitos y tener una longitud de 8 a 16 caracteres.</span>';
              mensaje2.innerHTML = '';
            }
        };
    
        const handleUsuarioChange = (e) => {
            const tipoUsuario = e.target.value;
            setUsuario(tipoUsuario);
        };
      
        return (
        
            <div className="login-container d-flex justify-content-center align-items-center" style={{ height: '120vh', backgroundColor: '#f7f7f7' }}>
            <div className="login-card" style={{ width: '100%', maxWidth: '950px', borderRadius: '8px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', padding: '40px', backgroundColor: '#fff', marginBottom: '80px' }}>
    
                <form onSubmit={handleSubmit} className="form" style={{ marginTop: '30px' }}>
                    <div className="datosReg container" style={{ marginTop: '5%' }}>
                        <div className="row" style={{ marginBottom: '30px' }}>
                        <h1 className="form-signin-heading" style={{ marginBottom: '30px', color: '#333', fontWeight: 'bold', textAlign: 'center' }}>Bienvenido a Registro</h1>
                        <h3 className="form-signin-heading" style={{ marginBottom: '30px', color: '#333', fontWeight: 'bold', textAlign: 'center' }}>Ingrese los datos correspondientes</h3>
    
                            <div className="col-md-6">
                                <h4 className="titulo">Nombre(s)</h4>
                                <input className="cajas form-control" type="text" placeholder="Nombre(s)" id="nombre" 
                                onChange={(e) => setNombre(e.target.value)} onKeyUp={ValidarNombre} required />
                                <span id="validarNombre"></span>
                            </div>
    
                            <div className="col-md-6">
                                <h4 className="titulo">Apellido paterno</h4>
                                <input className="cajas form-control" type="text" placeholder="Ingresa tu apellido paterno" id="apellidopa" 
                                onChange={(e) => setApellidoPaterno(e.target.value)} onKeyUp={ValidarApellidoPa} required />
                                <span id="validarApellidoPa"></span>
                            </div>
                        </div>
    
                        <div className="row" style={{ marginBottom: '20px' }}>
                            <div className="col-md-6">
                                <h4 className="titulo">Apellido materno</h4>
                                <input className="cajas form-control" type="text" placeholder="Ingresa tu apellido materno" id="apellidoma" 
                                onChange={(e) => setApellidoMaterno(e.target.value)} onKeyUp={ValidarApellidoMa} required />
                                <span id="validarApellidoma"></span>
                            </div>
    
                            <div className="col-md-6">
                                <h4 className="titulo">Cree un usuario</h4>
                                <select className="cajas form-control" id="usuario" onChange={handleUsuarioChange} required>
                                    <option value="">Selecciona un tipo de usuario</option>
                                    <option value="1">Directivo</option>
                                    <option value="2">Administrativo</option>
                                    <option value="3">Docente</option>
                                </select>
                            </div>
                        </div>
    
                        {correoError && <p style={{ color: 'red' }}>{correoError}</p>}
                        <div className="row" style={{ marginBottom: '20px' }}>
                            <div className="col-md-6" style={{ width: '50%' }}>
                                <h4 className="titulo">Correo</h4>
                                <input className="cajas form-control" placeholder="Ingresa tu correo" id="correo" value={correo} 
                                onChange={(e) => setCorreo(e.target.value)} onBlur={validarCorreo} required />
                                <span id="validar"></span>
                            </div>
    
                            
                            <div className="col-md-6" style={{ width: '50%' }}>
                                {telefonoError && <p style={{ color: 'red' }}>{telefonoError}</p>}
                                <h4 className="titulo">Celular</h4>
                                <input className="cajas form-control" type="tel" placeholder="Ingresa numero telefonico" id="telefono" value={telefono} 
                                onChange={(e) => setTelefono(e.target.value.replace(/\D/, ''))} onBlur={ValidarTelefono} maxLength="10" minLength="10" required />
                                <span id="mensajeTel2"></span>
                                <br />
                                <span id="mensajeTel" className="estupendo"></span>
                            </div>
                        </div>
                        <div className="row" style={{ marginBottom: '20px' }}>
                            <div className="col-md-6" style={{ width: '50%' }}>
                                <h4 className="titulo">Cree una contraseña</h4>
                                <input className="cajas form-control" type="password" placeholder="Ingresa una contraseña" id="contrasenia" 
                                onChange={(e) => setContrasenia(e.target.value)} onKeyUp={ValidarContra} required />
                                <span id="validarContra2"></span>
                                <br/>
                                <span id="validarContra"></span>
                            </div>
                            <div className="col-md-6" style={{ width: '50%' }}>
                                <h4 className="titulo">Confirmar contraseña</h4>
                                <input className="cajas form-control" type="password" placeholder="Confirma la contraseña" id="reContraseña" 
                                onChange={(e) => setRepetirContrasena(e.target.value)} onBlur={validarContraseña} required />
                                <span id="contraMensaje"></span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', color: 'red', animation: 'beautifulAnimation' }}>{mensaje && <div>{mensaje}</div>}</div>
                        <div className="BotonReg d-flex justify-content-center" style={{ marginBottom: '20px' }}>
                            <input type="submit" value="Crear cuenta" className="btn btn-primary" style={{ backgroundColor: 'var(--first-color)', borderColor: '#004b9b', color: '#fff', padding: '10px 20px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}/>
                        </div>
                        <p className="mt-4 text-center">¿Ya tienes una cuenta? <Link to="/Login" style={{ color: '#7d0430', textDecoration: 'none' }}>Ir a Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
        );
    }
    
    export default Signup
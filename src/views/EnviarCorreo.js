//import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo.png';

import axios from 'axios';

const EnviarCorreo = () => {
    const navigate = useNavigate();
    const [tokenrecibido, setTokenRecibido] = useState('');//token que recupero de la respuesta del servidor
    const [correo, setCorreo] = useState('');
    const [token, setToken] = useState('');//token que ingresa el usuario para hacer la comprobación
    const [mostrarVerificacion, setMostrarVerificacion] = useState(false);

    const enviarCorreo = async (e) => {
      e.preventDefault();
      if (correo === '') {
        message.warning('Por favor, ingrese algún dato en el campo de correo antes de enviar el código.');
      } else {
        const datos = {
          correo: correo
        };
    
        try {
          const response = await axios.post('https://alevosia.host8b.me/Web_Services/Alevosia/correoChay.php', datos, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          const responseData = response.data;
    
          if (!responseData) {
            console.log('La respuesta del servidor está vacía');
          } else {
            const { done, token } = responseData;
    
            if (!done) {
              console.log('No se pudo enviar el correo.');
              console.log(responseData)
            } else {
              console.log('Token recibido:', token);
              setTokenRecibido(token);
    
              if (token) {
                message.success('¡Éxito! Correo Enviado Exitosamente.');
                message.info('Verifica tu bandeja de entrada de tu correo electrónico.');
                setMostrarVerificacion(true);
              } else {
                message.error('El servidor no devolvió un token válido.');
              }
            }
          }
        } catch (error) {
          message.error('¡Error! No se pudo mandar el Correo, verifica nuevamente.');
          console.log('Error al mandar los datos', error);
        }
      }
    };    
    
      const verifyCode = async(e)=>{
        e.preventDefault()
        if (token === '') {
            message.warning('Por favor, ingrese el código de verificación para poder hacer la confirmación')
        } else {
          if (String(token) === String(tokenrecibido)) {
            message.success('¡Bien! El código de verificación es correcto.')
            navigate('/ActualizarContra');
          } else {
            message.error('¡Error!, los datos no coinciden, verifica por favor')
          }
        }
      }

    return (
        <div>
            <div className="container-fluid" style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
            <div className="row justify-content-center align-items-center" style={{ minHeight: '110vh' }}>
                <div className="col-md-4">
                <div className="card p-4 shadow text-center">
                    
                    <div style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <img src={logo} alt="Logo de la Empresa" className="company-logo-olvi" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </div>

                    <h2 className="mb-1 text-magenta"><p>Recuperación de Contraseña</p></h2>
                    <p className="text-muted mb-4">Introduce tu correo electrónico y revisa tu bandeja de entrada el token de verificación que te enviaremos.</p>

                    <form>

                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label"><b>Correo Electronico:</b></label>
                        <input type="email" id="correo" name="correo" className="form-control rounded-md"
                        placeholder="Introduce tu correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-3">
                        <button onClick={enviarCorreo} type="submit" className="btn btn-primary" style={{ backgroundColor: 'var(--first-color)', borderColor: '#004b9b', padding: '8px 25px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold',  borderColor: 'transparent' }}>Enviar Codigo al correo</button>
                    </div>

                    {mostrarVerificacion && (
                        <div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label"><b>Token proporcionado:</b></label>
                            <input type="text" id="token" name="token" className="form-control rounded-md"
                            placeholder="Introduce el token proporcionado" value={token} onChange={(e) => setToken(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-3">
                            <button onClick={verifyCode} type="submit" className="btn btn-primary" style={{ backgroundColor: 'var(--first-color)', borderColor: '#004b9b', padding: '8px 25px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', borderColor: 'transparent' }}>Verificar Token Ingresado</button>
                        </div>
                        </div>
                    )}

                    <br></br>
                    <div className="d-grid gap-3">
                        <Link to="/Login" className="btn btn-secondary" style={{ backgroundColor: '#A9A9A9', borderColor: 'transparent', padding: '8px 25px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}>Atrás</Link>
                    </div>

                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default EnviarCorreo;

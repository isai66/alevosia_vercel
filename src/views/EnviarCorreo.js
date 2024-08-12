//import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MdMarkEmailRead } from "react-icons/md";
import { AiOutlineSwap } from "react-icons/ai";
import { FaMapPin } from "react-icons/fa";

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
        const response = await axios.post('https://alevosia.host8b.me/Web_Services/correoChay.php', datos, {
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

  const verifyCode = async (e) => {
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
      <div class="containerlogin" >
        <div className="col-md-4">
          <div class='title'>
            <h2>Recupera Tu Contraseña</h2>
          </div>
          <h3 className="text-lg font-medium mb-4 mt-4 text-center">Introduce tu correo electrónico y revisa tu bandeja de entrada el token de verificación que te enviaremos.</h3>

          <form className='space-y-4'>
            <div class="inputDiv">
              <label htmlFor="inputPassword">Correo Electronico:</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <MdMarkEmailRead />
                </span>
                <input type="email" id="correo" name="correo" className="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="Introduce tu correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 text-center">
              <button onClick={enviarCorreo} type="submit" class="btnLogin2 flex">Enviar Codigo al correo <AiOutlineSwap class='iconbtn2' /></button>
            </div>

            {mostrarVerificacion && (
              <div>
                <div className="mb-3">
                  <label htmlFor="inputPassword" className="form-label"><b>Token proporcionado:</b></label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <FaMapPin/>
                </span>
                  <input type="text" id="token" name="token" className="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="Introduce el token proporcionado" value={token} onChange={(e) => setToken(e.target.value)}
                  />
                  </div>
                </div>
                <div className="d-grid gap-3">
                  <button onClick={verifyCode} type="submit" class="btn1">Verificar Token Ingresado</button>
                </div>
              </div>
            )}

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

export default EnviarCorreo;

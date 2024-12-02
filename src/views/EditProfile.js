import React, { useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaUser, FaPhoneAlt, FaCamera } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { AiOutlineSwapRight } from "react-icons/ai";
import { Modal, Button, message } from 'antd';
import "../css/signup.css";
import { AiOutlineLoading } from "react-icons/ai";
import {Dropdown } from 'flowbite-react';

const EditProfile = () => {
    const [foto, setFoto] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [codigoPostal, setCP] = useState("");
    const [estado, setEstado] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [colonias, setColonias] = useState([]);
    const [colonia, setColonia] = useState("");
    const [calle, setCalle] = useState("");
    const [numint, setNumInt] = useState("");
    const [numext, setNumExt] = useState("");
    const [telefono, setTelefono] = useState("");
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [errors, setErrors] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const idUser = localStorage.getItem('id_usuario')
    
    const navigate = useNavigate();


    const traerDatosUsuario = () => {
                // Aquí cargarías los datos del usuario actual desde la API
                Axios.get(`https://alev-backend-vercel.vercel.app/getUserData/${idUser}`)
                .then(response => {
                    const userData = response.data;
                    const profileImageUrl = userData?.vchFotoPerfil
                    ? `https://alevosia.host8b.me/image/${userData.vchFotoPerfil}`
                    : `https://robe.host8b.me/assets/imagenes/userProfile.png`; // Enlace alternativo cuando vchFotoPerfil es null o usuario no está autenticado 
                    setFoto(profileImageUrl);
                    setNombre(userData.nombre);
                    setApellido(userData.apellido);
                    setCP(userData.codigopostal);
                    setEstado(userData.estado);
                    setMunicipio(userData.municipio);
                    setColonias([userData.colonia]);
                    setColonia(userData.colonia);
                    setCalle(userData.calle);
                    setNumInt(userData.numinterior);
                    setNumExt(userData.numexterior);
                    setTelefono(userData.telefono);
                    setUsuario(userData.username);
                    setCorreo(userData.email);
                })
                .catch(error => {
                    console.error("Error fetching user data: ", error);
                });
    }

    useEffect(() => {
        traerDatosUsuario();
    }, []);

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

    const validateFields = () => {
        const newErrors = {};
        const regexLetters = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
        const regexUsername = /^[a-zA-Z0-9!#$%^&*()_=\[\]{};:'"<>\/\\|`~]+$/;
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!regexLetters.test(nombre)) newErrors.nombre = "El nombre solo puede contener letras y no estar vacio.";
        if (!regexLetters.test(apellido)) newErrors.apellido = "El apellido solo puede contener letras y no estar vacio.";
        if (!calle) newErrors.calle = "La calle es obligatoria.";
        if (numext === "" || parseInt(numext) < 0) newErrors.numext = "El número exterior es obligatorio y no puede ser negativo.";
        if (numint !== "" && parseInt(numint) < 0) newErrors.numint = "El número interior no puede ser negativo.";
        if (!codigoPostal) newErrors.codigoPostal = "El codigo postal es obligatorio.";
        if (telefono.length !== 10 || isNaN(telefono) || parseInt(telefono) < 0) newErrors.telefono = "El teléfono debe tener 10 caracteres y no puede ser negativo.";
        if (!regexUsername.test(usuario)) newErrors.usuario = "El usuario solo puede contener letras, números y algunos caracteres especiales como guión bajo.";
        if (!regexEmail.test(correo)) newErrors.correo = "El correo no tiene un formato válido.";
        if (!regexPassword.test(contrasena)) newErrors.contrasena = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";

        setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

    const updateUser = (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        setIsSubmitting(true);

        Axios.put(`https://alev-backend-vercel.vercel.app/updateUser/${idUser}`, {
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
        }).then(() => {
            message.success('Usuario actualizado exitosamente.');
            navigate('/Dashboard');
        }).catch(error => {
            console.error("Error updating user: ", error);
        }).finally(() => {
            setIsSubmitting(false);
        });
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // Aquí harías la solicitud para eliminar la cuenta
        Axios.delete(`https://alev-backend-vercel.vercel.app/deleteUser/${idUser}`)
            .then(() => {
                message.success('Usuario eliminado exitosamente.');
                navigate('/signup');
            })
            .catch(error => {
                console.error("Error deleting user: ", error);
            });
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
      };

      const openCamera = async () => {
        setIsCameraOpen(true);
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } catch (error) {
          console.error("No se pudo acceder a la cámara:", error);
        }
      };

      const handleFileChange = async(event) => {
        const file = event.target.files[0];
          if (file) {
            const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Marca de tiempo única
            const filename = `${usuario}_captured_${timestamp}.png`;
    
            setLoading(true);
          // Crear un objeto FormData y agregar el archivo y los datos del usuario
          const formData = new FormData();
          formData.append('file', file, filename);
          formData.append('user', usuario);
          
    
          try {
            // Subir el archivo al servidor usando fetch
            const response = await fetch(`https://alevosia.host8b.me/Web_Services/UploadImagen.php`, {
                method: 'POST',
              body: formData,
            });
    
            const data = await response.json();
    
            if(data.done)
            {
                traerDatosUsuario();
              console.log(data)
            }
            
          } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
          }
        }
       //window.location.reload(); // Recarga la página
      };

      const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const capturedImage = canvas.toDataURL('image/png');
        setProfileImage(capturedImage); // Muestra la imagen capturada
    
        // Convertir la imagen capturada a archivo Blob para enviar al servidor
        canvas.toBlob(async (blob) => {
  
          // Generar un nombre de archivo único usando la matrícula y la fecha/hora
          const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Marca de tiempo única
          const filename = `${usuario}_captured_${timestamp}.png`;
  
          const formData = new FormData();
          formData.append('file', blob, filename); // Asignar el nombre personalizado
          formData.append('user', usuario); // Matrícula del usuario
    
          try {
            setLoading(true);
            const response = await fetch(`https://alevosia.host8b.me/Web_Services/UploadImagen.php`, {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
            if (data.done) {
                traerDatosUsuario();

              console.log('Imagen capturada subida con éxito:', data);
            } else {
              console.error('Error al subir la imagen capturada:', data.message);
            }
          } catch (error) {
            console.error('Error de red al subir la imagen capturada:', error);
          }
          finally{
            setLoading(false);
          }
        });
    
        closeCamera();
      };
        // Función para cerrar la cámara
    const closeCamera = () => {
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsCameraOpen(false);
    };
  

    return (
        <div className="signupPage">
            <div className='containersignup'>
                <div className='title'>
                    <h2>Edita tu Perfil</h2>
                </div>
                <form onSubmit={updateUser} className="formsignup grid">
                <div className="relative inline-block">
                {loading ? 
                  (
                    <div className="flex items-center justify-center h-20 w-20 full bg-gray-200 mb-2 mr-2 ">
                      <AiOutlineLoading className="animate-spin text-gray-500" size={24} />
                    </div>
                  ) 
                  : 
                  (
                    <div className="relative inline-block">

                      <img
                        alt="Profile"
                        src={foto}
                        className="mb-2 mr-2 h-20 w-20 rounded-lg object-cover"
                      />
                    <Dropdown
                      className="w-max" // Ajusta el ancho según lo necesites

                      label={
                        
                      <button
                        className="absolute bottom-0 right-0 mb-1 mr-1 bg-white p-1 rounded-full border border-gray-300"
                      >
                        <FaCamera size={14} className="text-gray-600" />
                      </button>
                    }
                      inline={true}
                      arrowIcon={false}
                    >
                      <Dropdown.Item onClick={handleButtonClick}>
                        Elegir de Archivos
                      </Dropdown.Item>
                      <Dropdown.Item onClick={openCamera}>
                        Tomar Foto
                      </Dropdown.Item>
                    </Dropdown>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <input
                        type="file"
                        ref={cameraInputRef}
                        className="hidden"
                        accept="image/*"
                        capture="user"
                        onChange={handleFileChange}
                      />
                      {isCameraOpen && (
                           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                           <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
                             <video ref={videoRef} autoPlay className="rounded-lg border-2 border-gray-300 w-full" />
                             <canvas ref={canvasRef} style={{ display: 'none' }} />
                             <div className="flex justify-around mt-4">
                                <div className="w-40">
                                <Button color="gray" onClick={capturePhoto} >
                                Tomar Foto
                                </Button>
                           
                                </div>
                                <Button color="gray" onClick={closeCamera} >
                                  Cancelar
                                </Button>
                             </div>
                           </div>
                         </div>
                      )}
                    </div>
                    
                  )
                }

              </div>
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
                                <input type="text" id='codigopostal' placeholder='Ingrese su Código Postal' value={codigoPostal} onChange={(event) => setCP(event.target.value)} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
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
                                <select id="colonia" required value={colonia} onChange={(event) => setColonia(event.target.value)} className="flex-1 block rounded-none rounded-r-md border-gray-300 selectBox">
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
                            {errors.telefono && <p className="text-red-500 text-sm mt-2">{errors.telefono}</p>}
                        </div>

                        <div class='inputDiv'>
                            <label htmlFor='username'>Usuario: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <FaUserShield class='icon'/>
                                </span>
                                <input type="text" id='username' placeholder='Ingrese su nombre de usuario' value={usuario} onChange={(event)=>{setUsuario(event.target.value)}} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                            
                        {errors.usuario && <p className="text-red-500 text-sm mt-2">{errors.usuario}</p>}  
                        </div>
                                       

                        <div class='inputDiv'>
                            <label htmlFor='email'>Correo: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <MdMarkEmailRead class='icon'/>
                                </span>
                                <input type="email" id='email' placeholder='Ingrese su correo electrónico' value={correo} onChange={(event)=>{setCorreo(event.target.value)}} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                            {errors.correo && <p className="text-red-500 text-sm mt-2">{errors.correo}</p>}
                        </div>

                        <div class='inputDiv'>
                            <label htmlFor='password'>Contraseña: </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <BsFillShieldLockFill class='icon'/>
                            </span>
                                <input type="password" id='password' placeholder='Ingrese su contraseña' value={contrasena} onChange={(event)=>{setContrasena(event.target.value)}} className="flex-1 block rounded-none rounded-r-md border-gray-300"/>
                            </div>
                            {errors.contrasena && <p className="text-red-500 text-sm mt-2">{errors.contrasena}</p>}

                        </div>
                    
                    <button type='submit' className='btnSignup flex'>
                        <span className="submitText">Guardar Cambios</span>
                        <AiOutlineSwapRight className='iconbtn'></AiOutlineSwapRight>
                    </button>
                </form>

                <Button type="danger" onClick={showModal} className="mt-4">
                    Eliminar Cuenta
                </Button>
                
                <Modal title="Confirmar Eliminación" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.</p>
                </Modal>
            </div>
        </div>
    );
};

export default EditProfile;

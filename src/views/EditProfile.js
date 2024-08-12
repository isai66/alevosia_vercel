import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaUser, FaPhoneAlt } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { AiOutlineSwapRight } from "react-icons/ai";
import { Modal, Button, message } from 'antd';
import "../css/signup.css";

const EditProfile = () => {
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
    
    const idUser = localStorage.getItem('id_usuario')
    
    const navigate = useNavigate();

    useEffect(() => {
        // Aquí cargarías los datos del usuario actual desde la API
        Axios.get(`http://localhost:3001/getUserData/${idUser}`)
            .then(response => {
                const userData = response.data;
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
    }, []);

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

        Axios.put(`http://localhost:3001/updateUser/${idUser}`, {
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
        Axios.delete(`http://localhost:3001/deleteUser/${idUser}`)
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

    return (
        <div className="signupPage">
            <div className='containersignup'>
                <div className='title'>
                    <h2>Edita tu Perfil</h2>
                </div>
                <form onSubmit={updateUser} className="formsignup grid">
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

import React, {useState} from 'react'
import  Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import '../css/signinup.css';


function Registro2 () {
    const [usuario,setUsuario]=useState("");
    const [nombre,setNombre]=useState("");
    const [codigoPostal,setCP]=useState(0);
    const [estado,setEstado]=useState("");
    const [municipio,setMunicipio]=useState("");
    const [colonia,setColonia]=useState("");
    const [calle,setCalle]=useState("");
    const [numint,setNumInt]=useState(0);
    const [numext,setNumExt]=useState(0);
    const [contrasena,setContrasena]=useState("");
    const [correo,setCorreo]=useState("");
    const [telefono,settelefono]=useState(0);

    const [usuariosList,setUsuarios] = useState([]);
    const [loginsList,setLogins] = useState([]);

    const add = ()=>{
        Axios.post("http://localhost:3001/create",{
            usuario:usuario,
            nombre:nombre,
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
            getUsuarios();
            alert("Usuario registrado");
        });
    }
    
    const getUsuarios = ()=>{
        Axios.get("https://alev-backend-vercel.vercel.app/bitacora").then((response)=>{
            setUsuarios(response.data);
            console.log(response.data);
        });
    }
    const getLogins = ()=>{
        Axios.get("https://alev-backend-vercel.vercel.app/bitacora_logins").then((logs)=>{
            setLogins(logs.data);
        });
    }

    const buscar=()=>
  {
    let CodigoPostal2=document.querySelector('codigoPostal').value;
    consultarAPI(CodigoPostal2);
  }
  const consultarAPI=async(codigoPostal)=>{
  const ApiKey='cff1095c-acf3-47ab-8bb0-ed0979e4f30b';
  
  const urlApi= `https://api.copomex.com/query/info_cp/${codigoPostal}?type=simplified&token=${ApiKey}`;

  console.log(urlApi)
  fetch(urlApi)
  .then(response=>response.json())
  .then(result=>{
    if(!result.error){

    document.getElementById('codigoPostal').className = 'content';

    document.getElementById('estado').value = result.response.estado; 
    document.getElementById('municipio').value = result.response.municipio; 
    LimpiarSelect();
    crearOpciones(result.response.asentamiento);}
    else
    {
      document.getElementById('codigoPostal').className = 'form-control is-invalid';
      document.getElementById('error_message').innerText = result.error_message;

      // Limpiar inputs
      document.getElementById('estado').value = ''; 
      document.getElementById('municipio').value = ''; 
      // Limpiar opciones de select en caso de que existan
      LimpiarSelect();
    }
  })
  .catch(err => console.error(err));
}

function crearOpciones(arreglo) {
  let select = document.getElementById('colonia');
  for (let i = 0; i < arreglo.length; i++) {
      let opcion = document.createElement('option');
      // Asigna el valor de la opcion
      opcion.value = arreglo[i];
      // Asigna el contenido de text de la opcion
      opcion.textContent = arreglo[i];
      select.options.add(opcion);
  }
}

function LimpiarSelect() {
  // Recorre y elimina la opciones que tenga el select y solo deja la opcion por defecto
  for (let i = document.getElementById('colonia').options.length; i >= 1; i--) {
      document.getElementById('colonia').remove(i);
  }
};

    return (
        /*<div>
        <div class="brd">
        <div class="brd2">
        <BreadCrumb/>
        REGÍSTRATE
        </div>
        </div>
        <div class="container">
        <div>
            <label>Usuario:<input class="inputreg"
                onChange={(event)=>{
                setUsuario(event.target.value);
            }} type='text'/></label>

            <label>Nombre:<input class="inputreg"
            onChange={(event)=>{
                setNombre(event.target.value);
            }} type='text'/></label>

            <label>Código Postal:<input class="inputreg" id='codigoPostal'
            onKeyUp={buscar}
            onChange={(event)=>{
                setCP(event.target.value);
            }} type='number'/></label>

            <label>Estado:<input class="inputreg" id='estado'
            onChange={(event)=>{
                setEstado(event.target.value);
            }} type='text'/></label>

            <label>Municipio:<input  class="inputreg" id='municipio'
            onChange={(event)=>{
                setMunicipio(event.target.value);
            }} type='text'/></label>

            <label>Colonia:<input class="inputreg" id colonia
             onChange={(event)=>{
                setColonia(event.target.value);
            }} type='text'/></label>

            <label>Calle:<input class="inputreg"
             onChange={(event)=>{
                setCalle(event.target.value);
            }} type='text'/></label>

            <label>Número Interior:<input class="inputreg" onChange={(event)=>{
                setNumInt(event.target.value);
            }} type='number'/></label>

            <label>Número Exterior:<input class="inputreg"
             onChange={(event)=>{
                setNumExt(event.target.value);
            }} type='number'/></label>

            <label>Contraseña:<input class="inputreg" onChange={(event)=>{
                setContrasena(event.target.value);
            }} type='text'/></label>

            <label>Correo:<input class="inputreg" onChange={(event)=>{
                setCorreo(event.target.value);
            }} type='text'/></label>

            <label>Teléfono:<input class="inputreg" onChange={(event)=>{
                settelefono(event.target.value);
            }} type='number'/></label>

            <button onClick={add}>Registrar</button>
        </div>
        </div>*/
        <div class="lista">

        <button onClick={getUsuarios}>Listar</button>
        <center>
        Esta pequeña tabla nos muestra las transacciones que se han realizado
        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Usuario</th>
                    <th>Hosting</th>
                </tr>
            </thead>
            <tbody>
                {usuariosList.map((val, key) =>
                    <tr key={key}>
                        <td>{val.Fecha}</td>
                        <td>{val.Usuario}</td>
                        <td>{val.Hosti}</td>
                    </tr>
                )}
            </tbody>
        </table>
        </center>
        <button onClick={getLogins}>Listar</button>
        <center>
            Mientras que esta otra nos muestra cuando un usuario inicia sesión o se registra
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tipo</th>
                    <th>IP</th>
                    <th>Usuario</th>
                </tr>
            </thead>
            <tbody>
                {loginsList.map((val, key) =>
                    <tr key={key}>
                        <td>{val.id}</td>
                        <td>{val.tipo}</td>
                        <td>{val.ip}</td>
                        <td>{val.username}</td>
                    </tr>
                )}
            </tbody>
        </table>
        </center>



        
        </div>

    );
}
export default Registro2;

/*

<button onClick={getUsuarios}>Listar</button>
            {
                usuariosList.map((val,key)=>{
                    return <div class="">
                        
                        
                    </div>
                })
            }
                <table>
                            <th>
                                Usuario
                            </th>
                            <td>
                                {val.Usuario}
                            </td>
                            <th>
                                Hosti
                            </th>
                            <td>
                                {val.Hosti}
                            </td>
                        </table>
                        
                        */

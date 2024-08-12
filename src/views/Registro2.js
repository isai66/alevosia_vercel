import React, {useState} from 'react'
import  Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import '../css/signinup.css';


function Registro2 () {


    const [usuariosList,setUsuarios] = useState([]);
    const [loginsList,setLogins] = useState([]);

    
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


    return (
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

import '../App.css';
import banners from '../image/banners.svg';
import men1 from '../image/men/men1.jpg';
import men2 from '../image/men/men2.jpg';
import men3 from '../image/men/men3.jpg';
import BreadCrumb from '../components/BreadCrumb';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { message, Modal } from 'antd';
import { useAuth } from '../components/authUser'; 



const TraerProductos = () => axios.get('https://alev-backend-vercel.vercel.app/hombres')
const InsertarCarrito = prodicto => axios.post('https://alev-backend-vercel.vercel.app/InsertarCarro', prodicto)
const idUser = localStorage.getItem('id_usuario')

const Men = () =>{
    const { isAuthenticated, userData } = useAuth();
    const [products, setProducts] = useState([]);
    
    useEffect(()=>{
        async function fetchData(){
            const response = await TraerProductos();
            setProducts(response.data);
        }
        fetchData();
    },[])
    
    const comprar = async(id) => {
        const prodicto = {
            usuario: idUser,
            producto: id
        }
        const aa = await InsertarCarrito(prodicto)
        message.success('Se agrego al carrito');
        console.log(aa.data)
    }
    
    return (
        <div class="body">
            <div class="divisor">
                <div className='cccc' >
                    <BreadCrumb/>
                    <div className="productos-container">
                        {products.map((product) => (
                            <div className="tarjeta" key={product.ID_Prenda}>
                            <img
                                src={`/image/${product.Imagen}`}
                                alt={product.Nombre}
                                className="imagen-producto"
                            />
                            <div className="informacion">
                                <h2>{product.Nombre}</h2>
                                <p>{product.Descripcion}</p>
                                <p className="precio">${product.Precio}</p>
                                {isAuthenticated ? <button className="boton-comprar" onClick={()=>comprar(product.ID_Prenda)}>Comprar</button> : <button className="boton-disabled" onClick={()=>comprar(product.ID_Prenda)} disabled>Debes iniciar sesión para poder comprar</button>}
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Men;

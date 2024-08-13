import '../App.css';
import banners from '../image/banners.svg';
import women1 from '../image/women/women2.jpg';
import women2 from '../image/women/women3.jpg';
import women3 from '../image/women/women4.jpg';
import { Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { message, Modal, Pagination } from 'antd';
import { useAuth } from '../components/authUser'; 



const TraerProductos = () => axios.get('https://alev-backend-vercel.vercel.app/mujeres')
const InsertarCarrito = prodicto => axios.post('https://alev-backend-vercel.vercel.app/InsertarCarro', prodicto)
const idUser = localStorage.getItem('id_usuario')
const Women = () =>{
    const { isAuthenticated, userData } = useAuth();

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    
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
    // Obtener los productos para la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    return (
        <div class="body">
            <div class="divisor">
                <div className='cccc' >
                    <BreadCrumb/>
                    <div className="productos-container">
                        {currentProducts.map((product) => (
                            <div className="tarjeta" key={product.ID_Prenda}>
                            <img
                                src={`https://alevosia.host8b.me/image/${product.Imagen}`}
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
                    <Pagination
                        current={currentPage}
                        pageSize={productsPerPage}
                        total={products.length}
                        onChange={paginate}
                    />
                </div>
            </div>
        </div>
    );
}


export default Women;

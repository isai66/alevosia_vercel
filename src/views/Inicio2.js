/*import '../App.css';
import main2 from '../image/main2.jpg';
import collection from '../image/collection.svg';
import ropa1 from '../image/ropa1.jpg';
import ropa2 from '../image/ropa2.jpg';
import ropa3 from '../image/ropa3.jpg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { message, Modal } from 'antd';

import { useAuth } from '../components/authUser';

import BreadCrumb from '../components/BreadCrumb';

import ReactDOM from 'react-dom';
import Carousel from '../components/Carousel';

const TraerProductos = () => axios.get('http://localhost:3001/productosGeneral')
const InsertarCarrito = prodicto => axios.post('http://localhost:3001/InsertarCarro', prodicto)
const idUser = localStorage.getItem('id_usuario')

const Inicio2 = () => {
  const { isAuthenticated, userData } = useAuth();
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  const [recommendations, setRecommendations] = useState([]);

  const [products2, setProducts2] = useState([]);

  useEffect(() => {
    async function fetchDiscountedProducts() {
      try {
        const response = await fetch('http://localhost:3001/discounted-products');
        const data = await response.json();
        setProducts2(data);
      } catch (error) {
        console.error('Error al obtener productos con descuento:', error);
      }
    }

    fetchDiscountedProducts();
  }, []);


  useEffect(() => {
    async function fetchData() {
      const response = await TraerProductos();
      setProducts(response.data);
      setRandomProducts(getRandomProducts(response.data));
    }
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10 * 60 * 1000); // 10 minutos en milisegundos

    return () => clearInterval(interval);
  }, []);

  const getRandomProducts = (products) => {
    let shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }

  const comprar = async (id) => {
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
        <BreadCrumb />
        <h1>{isAuthenticated ? `Hola ${userData.username}` : ""}</h1>
      </div>

      <div className="relative">
        <Carousel />
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/3 bg-green-600 text-white text-xl font-bold p-4 rounded-full">
          Nueva colección de verano
        </div>
      </div>
      <section className="w-full mt-8">
        <h2 className="text-3xl font-bold text-center mb-4">Nuestros Productos</h2>
        <div className='cccc'>
          <div className="productos-container">
            {randomProducts.map((product) => (
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
                  {isAuthenticated ? <button className="boton-comprar" onClick={() => comprar(product.ID_Prenda)}>Comprar</button> : <button className="boton-disabled" onClick={() => comprar(product.ID_Prenda)} disabled>Debes iniciar sesión para poder comprar</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>Productos recomendados para ti</h1>
          <div className="grid grid-cols-3 gap-4">
            {products2.length === 0 ? (
              <p>No hay productos con descuento en este momento.</p>
            ) : (
              <ul>
                {products.map((product, index) => (
                  <li key={index}>
                    {product.Marca} - {product.Precio} - {product.Material}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Inicio2;
*/
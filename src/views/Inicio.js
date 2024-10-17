import '../App.css';
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

const TraerProductos = () => axios.get('https://alev-backend-vercel.vercel.app/productosGeneral')
const InsertarCarrito = prodicto => axios.post('https://alev-backend-vercel.vercel.app/InsertarCarro', prodicto)
const idUser = localStorage.getItem('id_usuario')

const Inicio = () => {
  const { isAuthenticated, userData } = useAuth();
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);


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
        <div className="sm:w-1/4 sm:top-3/4 sm:mb-0 sm:right-3/4 sm:translate-x-3/4 sm:-translate-y-12 sm:bg-green-600 text-white sm:text-xl sm:font-bold p-4 sm:rounded-full
                md:left-1/4 md:text-2xl mb-4 text-lg bg-blue-600">
          Nueva colección de verano
        </div>

      </div>
      <section className="w-full">
        <h2 className="text-3xl font-bold text-center mb-2">Nuestros Productos</h2>
        <div className='cccc'>
          <div className="productos-container">
            {randomProducts.map((product) => (
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
                  {isAuthenticated ? <button className="boton-comprar" onClick={() => comprar(product.ID_Prenda)}>Comprar</button> : <button className="boton-disabled" onClick={() => comprar(product.ID_Prenda)} disabled>Debes iniciar sesión para poder comprar</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Inicio;

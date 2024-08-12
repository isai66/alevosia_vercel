import { useEffect, useState } from "react";
import "../../css/cartContent.css";
import axios from "axios";
import PayPalButton from "../PayPalButton";
import { CardTitle } from "react-bootstrap";
import { message, Modal } from 'antd';


const MasRoute = carrito => axios.post('http://localhost:3001/AumentarCarro', carrito)

const MenosRoute = carrito => axios.post('http://localhost:3001/QuirtarCarro', carrito)

const EliminarRoute = carrito => axios.post('http://localhost:3001/EliminarCarro', carrito)

const CartContent = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0); // Estado para almacenar el total

  const idUser = localStorage.getItem('id_usuario')

  useEffect(() => {
    fetchData();
  },[])

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3001/TraerCarrito/${idUser}`)
    setCart(response.data)
    console.log(response.data)
    calculateTotal(response.data);
  };

  const Mas = async(id) => {
    await MasRoute({ carrito: id });
    fetchData();
  }
  
  const Menos = async(id) => {
    const currentItem = cart.find(item => item.id_carrito === id);
    if (currentItem && currentItem.cantidad_producto === 1) {
      return;
    }
    await MenosRoute({ carrito: id });
    fetchData();
  }
  
  
  const Eliminar = (id) => {
    Modal.confirm({
      title: '¿Estás seguro de que quieres eliminar este producto del carrito?',
      onOk: () => confirmarEliminacion(id),
      okText: 'Sí',
      cancelText: 'Cancelar'
    });
  }
  
  const confirmarEliminacion = async (id) => {
    await EliminarRoute({ carrito: id });
    fetchData();
  }
  
  
  const calculateTotal = (cartData) => {
    let totalPrice = 0;
    cartData.forEach(item => {
        const cantidad = parseFloat(item.cantidad_producto);
        const precio = parseFloat(item.Precio);

        if (!isNaN(cantidad) && !isNaN(precio)) {
            totalPrice += cantidad * precio;
        } else {
            console.log(`Error: Cantidad o precio no son numéricos para el producto con ID ${item.id_producto}`);
        }
    });
    setTotal(totalPrice);
};
  
  const Compra = async(total) => {
    let datos = {
      id_usuario : idUser,
      total : total
    }
    axios.post('http://localhost:3001/compra', datos)
    .then(() => {
      fetchData(); // Actualizar datos del carrito después de completar la compra
    })
    .catch(error => {
      console.error('Error al realizar la compra:', error);
    });
  }
  
  return (
    <>
      {cart.length > 0 ? (
        <>
        <div className="contenedor-Car">
          <div className="tarjetas-container" >
          {cart.map((item) => (
            <div key={item.id_carrito} className="shopping-cart">
              <img src={`/image/${item.Imagen_Prenda}`} alt={item.Nombre_Prenda} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
              <div className="info">
                <h3>{item.Nombre_Prenda}</h3>
                <p className="descripcion">{item.Descripcion_Prenda}</p>
                <p className="descripcion" >Precio unitario: {item.Precio}</p>
                <p className="descripcion" >Total: {item.cantidad_producto * item.Precio}</p>
                <div className="acciones">
                  <div className="pp">
                    <button onClick={() => Menos(item.id_carrito)} >-</button>
                    <p>{item.cantidad_producto}</p>
                    <button onClick={() => Mas(item.id_carrito)} >+</button>
                  </div>
                  <button className="eliminar-btn"onClick={()=>Eliminar(item.id_carrito)} >Eliminar</button>
                </div>
              </div>
            </div>
          ))}
          </div>
          <div>
            <h3>Total: ${total}</h3>
            {/*<button onClick={() => Compra(total)} >Comprar</button>*/}
            <PayPalButton total={total} />
          </div>
        </div>
        </>
      ) : (
        <h2 className='cart-message-center'>Tu carrito está vacio</h2>
      )}
    </>
  );
};

export default CartContent;

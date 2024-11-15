import React from 'react';
import { useContext } from "react";
import { dataContext } from "../DataContext";
import CartItemCounter from './CartItemCounter';

const CartElements = () => {
    const {cart, setCart} = useContext(dataContext);
    
    const deleteProduct=(ID_Prenda)=>{
        const foundID = cart.find((element)=> element.ID_Prenda === ID_Prenda);
        const newCart = cart.filter((element)=>{
            return element !== foundID;
        });
        setCart(newCart);
    };

  return cart.map((product)=>{
    const urlImage='../image/'
    return(
        <div class="cartContent" key={product.ID_Prenda}>
            <img src={`${urlImage}${product.Imagen}`}/>
            <h3 class="name">{product.Nombre}</h3>
            
            <CartItemCounter product={product}/>
            <h4 class="price">${product.Precio * product.Cantidad}</h4>
            <h3 class='cart-delete-button' onClick={()=>deleteProduct(product.ID_Prenda)}>❌</h3>
        </div>
    );
  });
};

export default CartElements

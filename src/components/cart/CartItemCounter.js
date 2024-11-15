import React from 'react'
import { useContext } from "react";
import { dataContext } from "../DataContext";

const CartItemCounter = ({product}) => {
    const { cart, setCart, buyProducts } = useContext(dataContext);

    const decrease = ()=>{
        const productrepeat = cart.find((item) => item.ID_Prenda === product.ID_Prenda);
        
        productrepeat.Cantidad !== 1 && 
        setCart(cart.map((item)=>(item.ID_Prenda === product.ID_Prenda ? {...product, Cantidad: 
            productrepeat.Cantidad - 1 } : item)));
    };
  return (
    <>
        <p class='counter-button' onClick={decrease}>-</p>
        <p>{product.Cantidad}</p>
        <p class='counter-button'onClick={()=>buyProducts(product)}>+</p>
    </>
  );
};

export default CartItemCounter

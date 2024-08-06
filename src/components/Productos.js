import React from 'react';
import { useContext } from "react";
import { dataContext } from "./DataContext";
import { useAuth } from '../components/authUser'; 

import '../css/productos.css'
import '../App.css'

const Productos = () => {
    const { isAuthenticated, userData } = useAuth();

    const { data, buyProducts } = useContext(dataContext);

    const urlImage='../image/'
    return data.map((product)=>{
        return(
            <div class='card' key={product.ID_Prenda}>
                <center><img src={`${urlImage}${product.Imagen}`} style={{ height: '100px' }}/></center>
                <h3>{product.Nombre}</h3>
                <h4>${product.Precio}</h4>
                {isAuthenticated ? <button onClick={()=>buyProducts(product)}>Adquirir</button> : <button disabled>Logeate</button>}
                
            </div>
        )
    });
};

export default Productos;

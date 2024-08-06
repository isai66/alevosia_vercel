import '../App.css';
import '../css/Producto1.css'
import women1 from '../image/women/women1.jpg';
import womenrojo from '../image/women/womenrojo.webp';
import BreadCrumb from '../components/BreadCrumb';
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import  Axios  from 'axios';

const Producto1 = () =>{
    const [producto,setProducto] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(()=>{
        Axios.get("https://alev-backend-vercel.vercel.app/producto").then((response)=>{
            setProducto(response.data[0]);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
          });
        }, []);
    

    const handleFocusIn = () => {
        setIsFocused(true);
    };
    const handleFocusOut = () => {
        setIsFocused(false);
    };

    return (
        <div class="body">
            <div class="divisor">
                <BreadCrumb/>
            </div>
            <div class="producto">
                {isFocused ?  <img class='iphone' src={womenrojo}/>  : <img class='iphone' src={women1}/>}
                <div class="divproducto">
                    <h1 class="tituloproducto">Perfume ROJO Para Dama<br/>(Eau de parfum)</h1>
                    <h4 class="sku">SKU: 19770202</h4>
                    {/*<h1 class="precio">$500</h1>*/}
                    <div>
                        {/* Aquí puedes mostrar el campo específico */}
                        {producto && <h1>${producto.Precio}</h1>}
                    </div>
                    <br/>
                    <div class="divcantidad">
                        <p class="cantidad">Cantidad</p>
                        <input class="inputcantidad" type="number" /*pattern="[0-9]*" data-hook="number-input-spinner-input" */ aria-label="Cantidad" max="999" min="1" defaultValue={1}
                        onFocus={handleFocusIn} // Corrección aquí
                        onBlur={handleFocusOut} // Corrección aquí
                        />
                    </div>
                  {/*  <button class="comprar"><Link to="/carrito2">COMPRAR AHORA</Link></button>*/}
                </div>
            </div>
            <div class="detalles">
                <h2>DETALLES DEL PRODUCTO</h2>
                {producto && <span>{producto.Descripcion}</span>}
                {/*La nueva colección de fragancias de Shakira Perfumes se estrena con firmeza con ROJO,
                el color de la fuerza, el atrevimiento y la pasión. El primer Eau de Parfum de la gama de
                fragancias de Shakira es un homenaje a las mujeres empoderadas de todo el mundo. La nueva fragancia,
                ROJO, nos habla de la valentía y la seguridad de las mujeres de hoy, despertando su lado más atrevido.
                Y hace brillar una luz intensa y radiante que muestra quiénes son en realidad. Atrevida, valiente y
                apasionada: así es la voz de Shakira, que la gente escucha y que ella misma se atreve a utilizar para 
                expresar su opinión y compartir sus sentimientos más íntimos. ROJO es un reflejo de la pasión y el atrevimiento
                de Shakira, y de su determinación para asumir con valentía su papel de icono de la mujer moderna. El nuevo Eau
                de Parfum anima a las mujeres de todo el mundo a hacer lo mismo: adueñarse de sus cualidades, expresar su identidad
                y sentir su poder.*/} <br/><br/>   
                Contenido: 80 ml.

              {/*  correo 
            pregunta secreta
            llamada
            mensaje*/}
            </div>
        </div>
    );
}

export default Producto1;


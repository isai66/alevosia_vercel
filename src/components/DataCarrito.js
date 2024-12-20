import  Axios from "axios";
import { createContext, useState, useEffect } from "react";

export const dataContext = createContext();

const DataCarrito = ({children}) => {
    
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];


    const [data, setData] = useState([]);
    const [cart, setCart] = useState(savedCart);

    

    useEffect(()=>{
        Axios.get("https://alev-backend-vercel.vercel.app/consultaCarritoUsuario").then((response)=>{
            setData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
          });
        }, []);

        useEffect(()=>{
            localStorage.setItem('cart', JSON.stringify(cart))
        },[cart]);

        //setItem
        //getItem
    const buyProducts = (product)=>{
        const productrepeat = cart.find((item)=>item.ID_Prenda===product.ID_Prenda);
    
        if(productrepeat){
            setCart(cart.map((item)=>(item.ID_Prenda === product.ID_Prenda ? {...product, Cantidad: 
                productrepeat.Cantidad + 1 } : item)));
        }
        else{
            console.log(product);
            setCart([...cart, product]);
        }
    };

    return(
        <dataContext.Provider value={{data, cart, setCart, buyProducts}}>
            {children}
        </dataContext.Provider>
    )
};

export default DataCarrito;


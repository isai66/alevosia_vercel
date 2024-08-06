import '../App.css';
import banners from '../image/banners.svg';
import BreadCrumb from '../components/BreadCrumb';

const Somos = () =>{
    return (
        <div class="body">
            <div class="divisor">
  <BreadCrumb/>
  </div>
<div class="banner1">
    <img src={banners}/>
    <h1 class="alevosianame">ALEVOSÍA BOUTIQUE</h1>
</div>
<div class="detalles">
    Alevosía es un comercio minorista de prendas y accesorios ubicado en el centro de la ciudad de Huejutla de Reyes, Hidalgo, que se enfoca en dar un estilo de vida fresco a la juventud huejutlense desde 2009. A lo largo de los años Alevosía se ha caracterizado por vender prendas a la moda y que esté al alcance del público.
</div>
<div class="somos1">
    <h3>Misión</h3>
    <span class="somos2">
        Vestir jóvenes que siguen tendencias de un un mundo que evoluciona, gente que desea diferenciarse, jovenes con
        un toque de rebeldía que crean un estilo sencillo y fuerte a la vez.
    </span>
    <h3>Visión</h3>
    <span class="somos2">
        Alevosía es una boutique UNISEX, dedicada a la venta de ropa de dama y caballero y la organización de pasarelas,
        expo de novias y certámenes de modelaje, que es líder en su segmento y crea una plataforma para el lanzamiento
        de nuevos talentos creativos y chavas y chavos que aspiran a convertirse en modelos profesionales.
    </span>
    <h3>Propósitos</h3>
    <span class="somos2">
        Convertirnos y mantenernos posteriormente como una de las empresas más eficientes de la región y del estado
        logrando un prestigio y al mismo tiempo que los clientes obtengan soluciones buenas y rápidas.
    </span>
</div>

        </div>
        );
    }
    
    export default Somos;
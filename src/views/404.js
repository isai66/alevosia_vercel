import '../css/404.css'
import { Link } from 'react-router-dom';

const NotFound = () =>{
    return (
        <div>
            <h1 class="titulo404">Error 404 - Página no encontrada</h1>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            <p>Puedes regresar a <Link to="/">la página de inicio</Link>.</p>
        </div>
    );}

export default NotFound
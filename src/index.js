
import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { render } from "react-dom";


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../sw.js', { type: 'module' }).then(registration => {
      console.log('ServiceWorker registrado con éxito con alcance:', registration.scope);
    }).catch(error => { console.error('Error al registrar el ServiceWorker:', error); });
  });
}

render(<React.StrictMode>
  <Router>
    
    <App />
  </Router>
</React.StrictMode>, document.getElementById("root"));



/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



//import React from 'react';
//import { useEffect  } from 'react';
//import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';
//import Inicio from './views/Inicio';
//import reportWebVitals from './reportWebVitals';
//import {BrowserRouter as Router} from "react-router-dom";
//import { toast, ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//import { render } from "react-dom";

//render(<React.StrictMode>
//  <Router>
//  <App/>
//  </Router>
//</React.StrictMode>, document.getElementById("root"));

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();


//19a42361ec8e1c8d5d13e0e5a1a0c083a119c1ab

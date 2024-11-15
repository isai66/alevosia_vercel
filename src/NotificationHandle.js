// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getMessaging, getToken, onMessage} from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
import { useEffect } from "react";
import axios from "axios";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCa85sXbzidRjiOYVincgZ_Ki_255aSvc",
  authDomain: "alevosia-e16d6.firebaseapp.com",
  projectId: "alevosia-e16d6",
  storageBucket: "alevosia-e16d6.firebasestorage.app",
  messagingSenderId: "537099082696",
  appId: "1:537099082696:web:a27d7c45e622a7ded63efd",
  measurementId: "G-4X0K5935DG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app)

/// le cambie aqui
const NotificationHandle = () => {
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' })
    .then(function(registration) {
      console.log('Service Worker registrado con éxito:', registration);
    })
    .catch(function(err) {
      console.log('Error al registrar el service worker:', err);
    });
  
  }
  
  const activarMensajes = async () => {
    try {
      const storedToken = localStorage.getItem('fcmToken');
      if (!storedToken) {
        const token = await getToken(messaging, { vapidKey: 'BFkbZAI98IyepPG0WMdoqfTrCpL_QezXueCT5kKHnbkHtWiwNgU0aTP9lUuHAyroYA1pALPBfFZ12iMwNyrJNUY' });
        if (token) {
          localStorage.setItem('fcmToken', token); 
          await axios.post('https://alev-backend-vercel.vercel.app/suscribirse', {token})
        } else {
          console.log('No se pudo obtener el token');
        }
      } else {
        console.log('Token ya existente:');
      }
    } catch (error) {
      console.log('Error de activación de mensajería', error);
    }
  } 

  
  useEffect(() => {
    // Activar la mensajería
    activarMensajes();

    // Manejo de mensajes en primer plano
    onMessage(messaging, (payload) => {
      console.log("Mensaje recibido en primer plano:", payload);

      // Extraer título y cuerpo de la notificación
      const { title, body } = payload.notification;

      // Mostrar la notificación
      new Notification(title, {
        body: body,
        icon: "/firebase-logo.png", // Puedes personalizar el icono
      });
    });
  }, []); // Este useEffect se ejecuta una sola vez cuando el componente se monta

  return null;
};

export default NotificationHandle






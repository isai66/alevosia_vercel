// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyDCa85sXbzidRjiOYVincgZ_Ki_255aSvc",
  authDomain: "alevosia-e16d6.firebaseapp.com",
  projectId: "alevosia-e16d6",
  storageBucket: "alevosia-e16d6.firebasestorage.app",
  messagingSenderId: "537099082696",
  appId: "1:537099082696:web:a27d7c45e622a7ded63efd",
  measurementId: "G-4X0K5935DG"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Mensaje recibido en segundo plano: ", payload);
  const { title, body } = payload.notification;

  // Mostrar la notificación
  self.registration.showNotification(title, {
    body: body,
    icon: "/firebase-logo.png",
  });
});

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log("Permiso de notificación concedido");
  } else {
    console.log("Permiso de notificación denegado");
  }
};

useEffect(() => {
  requestNotificationPermission();
  activarMensajes();
  onMessage(messaging, (payload) => {
    console.log("Mensaje recibido en primer plano:", payload);
    const { title, body } = payload.notification;
    new Notification(title, { body, icon: "/firebase-logo.png" });
  });
}, []);

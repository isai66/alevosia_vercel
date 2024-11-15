import React, { useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { message } from 'antd';

const idUser = localStorage.getItem('id_usuario');

function PayPalButton({ total }) {
  useEffect(() => {
    // Solicitar permiso para las notificaciones
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          console.log("Permiso para notificaciones concedido.");
        }
      });
    }
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const sendNotification = (total) => {
    if (Notification.permission === "granted") {
      new Notification("Compra registrada", {
        body: `Compra realizada por un total de ${total} pesos`,
        icon: "https://example.com/icon.png" // Puedes usar una URL de un icono aquí
      });
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        'client-id': 'Aevm832RAu3vO5qmOb1TzV7Rmvqefppr3t8BKmmYglRIyV78TJ7aPF3GuuXMGC02Orz8DbVDYL7yB_K4',
        currency: 'MXN',
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          try {
            const details = await actions.order.capture();
            const datos = {
              id_usuario: idUser,
              total: total,
            };

            // Enviar la información al backend
            await axios.post('https://alev-backend-vercel.vercel.app/compra', datos);
            message.success('Compra realizada con éxito', details.payer.name.given_name);

            // Llamar a la función para enviar la notificación
            sendNotification(total);

            // Recargar la página después de completar la compra y enviar la notificación
            refreshPage();
          } catch (error) {
            console.error('Error en la transacción:', error);
            message.error('Hubo un problema al completar la compra');
          }
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalButton;

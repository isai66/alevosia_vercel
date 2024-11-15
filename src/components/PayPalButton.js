import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { message } from 'antd';

const idUser = localStorage.getItem('id_usuario');
const storedToken = localStorage.getItem('fcmToken');

function PayPalButton({ total }) {
  const refreshPage = () => {
    window.location.reload();
  };

  const sendNotification = async (total) => {
    try {
      const response = await axios.post('https://firebase-alevosia.vercel.app/', {
        tokenUser: storedToken,
        title: "Compra exitosa Alevosia",
        body: `Compra realizada por un total de ${total} pesos`,
        url: "https://alevosia-vercel.vercel.app/",
        matricula: "20210643",
      });
      console.log('Notificación enviada con éxito:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
      throw error;
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
            await sendNotification(total)
            refreshPage();

            // Recargar la página después de completar la compra y enviar la notificación
           // refreshPage();
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

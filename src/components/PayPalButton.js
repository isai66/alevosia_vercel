import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { message, Modal } from 'antd';


const idUser = localStorage.getItem('id_usuario')

function PayPalButton({ total }) {
    const refreshPage = () => {
      window.location.reload();
    }
  return (
    <PayPalScriptProvider options={{ "client-id": "Aevm832RAu3vO5qmOb1TzV7Rmvqefppr3t8BKmmYglRIyV78TJ7aPF3GuuXMGC02Orz8DbVDYL7yB_K4" }}>
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
        onApprove={(data, actions) => {
          return actions.order.capture().then(function(details) {
            let datos = {
              id_usuario : idUser,
              total: total
            }
            axios.post('https://alev-backend-vercel.vercel.app/compra', datos)
            message.success('Compra realizada con exito', details.payer.name.given_name);
            // alert('Transaction completed by ' + details.payer.name.given_name);
            refreshPage();
          });
        }}
        
      />
    </PayPalScriptProvider>
  );
}

export default PayPalButton;

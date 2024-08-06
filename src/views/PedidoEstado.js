import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const PedidoEstado = () => {
  const [pedidoEstado, setPedidoEstado] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState('');

  useEffect(() => {
    // Obtener el estado actual del pedido al cargar el componente
    fetchEstadoPedido();
  }, []);

  const fetchEstadoPedido = async () => {
    try {
      const response = await axios.get('/api/pedido/estado');
      setPedidoEstado(response.data.estado);
    } catch (error) {
      console.error('Error al obtener el estado del pedido:', error);
    }
  };

  const handleChangeEstado = async () => {
    try {
      await axios.put('/api/pedido/estado', { nuevoEstado });
      // Actualizar el estado local después de la modificación
      setPedidoEstado(nuevoEstado);
    } catch (error) {
      console.error('Error al actualizar el estado del pedido:', error);
    }
  };

  return (
    <div className="container">
      <h1>Estado del Pedido</h1>
      <p>Estado actual: {pedidoEstado}</p>
      <Form.Group controlId="formEstado">
        <Form.Label>Seleccionar nuevo estado:</Form.Label>
        <Form.Control as="select" onChange={(e) => setNuevoEstado(e.target.value)}>
          <option value="Pedido Realizado">Pedido Realizado</option>
          <option value="Enviado">Enviado</option>
          <option value="En camino">En camino</option>
          <option value="Recibido">Recibido</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" onClick={handleChangeEstado}>
        Cambiar Estado
      </Button>
    </div>
  );
};

export default PedidoEstado;

// LoginForm.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './views/LoginForm';

test('Inicio de sesión exitoso', async () => {
  const { getByPlaceholderText, getByText } = render(<LoginForm />);
  
  const emailInput = getByPlaceholderText('email');
  const passwordInput = getByPlaceholderText('password');
  const submitButton = getByText('Iniciar sesión');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'contrasenia123' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(getByText('¡Inicio de sesión exitoso!')).toBeInTheDocument();
  });
});

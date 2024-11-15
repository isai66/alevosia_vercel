import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './views/signupPage'; // Importa tu componente de formulario de registro

test('Registro exitoso', async () => {
  const { getByPlaceholderText, getByText } = render(<RegisterForm />);

  const nameInput = getByPlaceholderText('Nombre');
  const emailInput = getByPlaceholderText('Correo');
  const passwordInput = getByPlaceholderText('Password');
  const submitButton = getByText('Registrar');

  fireEvent.change(nameInput, { target: { value: 'Usuario de prueba' } });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(getByText('¡Registro exitoso!')).toBeInTheDocument();
  });
});

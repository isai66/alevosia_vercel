import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Signup from './Signup'; // Asegúrate de importar tu componente correctamente

describe('Signup Component', () => {
  it('should update the name state when input changes', () => {
    const { getByTestId } = render(<Signup />);
    const nameInput = getByTestId('nombre');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(nameInput.value).toBe('John');
  });

  it('should update the email state when input changes', () => {
    const { getByTestId } = render(<Signup />);
    const emailInput = getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput.value).toBe('john@example.com');
  });

  // Escribe más casos de prueba para otras funciones y componentes en tu formulario Signup
});

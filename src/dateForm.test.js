// dateForm.test.js

import React from 'react';
import { render, fireEvent, getByLabelText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DateForm from './dateForm'; // Asegúrate de importar tu componente correctamente


describe('DateForm', () => {
  test('renders all input fields correctly', () => {
    const { getByPlaceholderText } = render(<DateForm />);
    
    expect(getByPlaceholderText('Nombre')).toBeInTheDocument();
    expect(getByPlaceholderText('Edad')).toBeInTheDocument();
    expect(getByPlaceholderText('Sexo')).toBeInTheDocument();
    expect(getByPlaceholderText('Correo')).toBeInTheDocument();
    expect(getByPlaceholderText('Contraseña')).toBeInTheDocument();
  });

  test('allows user to input values into fields', () => {
    const { getByPlaceholderText } = render(<DateForm />);
    const nombreInput = getByPlaceholderText('Nombre');
    const edadInput = getByPlaceholderText('Edad');
    const sexoInput = getByPlaceholderText('Sexo');
    const correoInput = getByPlaceholderText('Correo');
    const contraseñaInput = getByPlaceholderText('Contraseña');

    fireEvent.change(nombreInput, { target: { value: 'Juan' } });
    fireEvent.change(edadInput, { target: { value: '30' } });
    fireEvent.change(sexoInput, { target: { value: 'Masculino' } });
    fireEvent.change(correoInput, { target: { value: 'juan@example.com' } });
    fireEvent.change(contraseñaInput, { target: { value: 'password123' } });

    expect(nombreInput.value).toBe('Juan');
    expect(edadInput.value).toBe('30');
    expect(sexoInput.value).toBe('Masculino');
    expect(correoInput.value).toBe('juan@example.com');
    expect(contraseñaInput.value).toBe('password123');
  });
});


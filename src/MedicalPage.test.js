// MedicalPage.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MedicalPage from './MedicalPage';

// Importamos los datos de pacientes de ejemplo
import { patientsData } from './components/patientsData';

test('Filtrar pacientes por género', async () => {
  // Renderizamos la página de citas médicas
  const { getByText, getByLabelText, queryByText, getAllByRole } = render(<MedicalPage />);

  // Esperamos a que aparezcan las celdas de género
  await waitFor(() => getAllByRole('cell', { name: /Masculino|Femenino/ }));

  // Simulamos clic en el botón de filtro de género masculino
  fireEvent.click(getByLabelText('Filtrar Masculinos'));

  // Verificamos que solo los pacientes masculinos estén presentes después del filtrado
  const cells = getAllByRole('cell', { name: /Masculino/ });
  expect(cells.length).toBeGreaterThan(0); // Verificar que haya celdas con género masculino
  expect(cells.every(cell => cell.textContent === 'Masculino')).toBeTruthy(); // Verificar que todas las celdas tengan género masculino
  expect(queryByText('Femenino')).not.toBeInTheDocument(); // 'Femenino' debería estar oculto después del filtrado
});

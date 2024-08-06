import React, { useState } from 'react';
import { patientsData } from './components/patientsData';
import PatientsTable from './components/PatientsTable';

const MedicalPage = () => {
  const [genderFilter, setGenderFilter] = useState(null);
  const filteredPatients = genderFilter ? patientsData.filter(patient => patient.gender === genderFilter) : patientsData;

  return (
    <div>
      <h1>Formulario de Citas Médicas</h1>
      <div>
        <button onClick={() => setGenderFilter('Masculino')} aria-label="Filtrar Masculinos">Filtrar Masculinos</button>
        <button onClick={() => setGenderFilter('Femenino')} aria-label="Filtrar Femeninos">Filtrar Femeninos</button>
        <button onClick={() => setGenderFilter(null)} aria-label="Limpiar Filtro">Limpiar Filtro</button>
      </div>
      <PatientsTable patients={filteredPatients} />
    </div>
  );
};

export default MedicalPage;

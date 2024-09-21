"use client";
import React, { useState } from 'react';
import PatientCreateForm from '../components/PatientCreateForm';
import TablePatients from '../components/Table';

export default function PatientPage() {
  const [updateTable, setUpdateTable] = useState(false);

  const handlePatientCreated = () => {
    setUpdateTable((prev) => !prev);
  };

  return (
    <div>
        <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Children's Hospital - Pacientes</h1>
                <div className="ml-4">
                    <PatientCreateForm onPatientCreated={handlePatientCreated} />
                </div>
            </div>
            <div>
                <TablePatients update={updateTable} />
            </div>
        </div>
    </div>
  );
}

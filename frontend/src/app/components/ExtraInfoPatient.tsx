import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Patient } from '../common/utils/types';

interface PatientExtraInfoProps {
    visible: boolean;
    patient: Patient | null;  
    onHide: () => void;       
}

const PatientExtraInfo: React.FC<PatientExtraInfoProps> = ({ visible, patient, onHide }) => {
    return (
        <Dialog header="Información del Paciente" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
            {patient ? (
                <div>
                    <p><strong>Nombre:</strong> {patient.fullName}</p>
                    <p><strong>Edad:</strong> {patient.age}</p>
                    <p><strong>Genero:</strong> {patient.gender}</p>
                    <p><strong>Fecha de nacimiento:</strong> {patient.dateBirth ? new Date(patient.dateBirth).toLocaleDateString() : 'Fecha no disponible'}</p>
                    <p><strong>Ciudad de Origen:</strong> {patient.cityOrigin}</p>
                    <p><strong>Fecha de ingreso:</strong> {patient.registerDate ? new Date(patient.registerDate).toLocaleDateString() : 'Fecha no disponible'}</p>
                    <p><strong>Hospital de Origen:</strong> {patient.hospitalOrigin}</p>
                    <p><strong>Nombre del tutor:</strong> {patient.tutorName}</p>
                    <p><strong>Teléfono del tutor:</strong> {patient.tutorTelephone}</p>
       
                </div>
            ) : (
                <p>No se ha seleccionado ningún paciente.</p>
            )}
        </Dialog>
    );
};

export default PatientExtraInfo;

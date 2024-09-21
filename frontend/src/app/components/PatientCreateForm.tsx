"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { createPatient, updatePatient } from '../api/patients';
import { Patient, CityOptions, GenderOptions } from '../common/utils/types';


interface PatientCreateFormProps {
  onPatientCreated: () => void;
}

export default function PatientCreateForm({ onPatientCreated }: PatientCreateFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Patient>();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async(data: Patient) => {
    const transformedData = {
      ...data,
      age: Number(data.age), 
    };
    try {
      await createPatient(transformedData);
      showSuccess();
      onPatientCreated();
    } catch (error) {
      console.error("Error creating patient:", error);
    }
    toggleModal();
  };

  const toast = useRef<Toast>(null);
  const showSuccess = () => {
    toast.current?.show({severity:'success', summary: 'Éxito', detail:'Paciente agregado correctamente', life: 3000});
  }
  return (
    <div className="grid justify-items-end items-center p-6">
      <Toast ref={toast} position="bottom-right"/>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={toggleModal}
      >
        Nuevo Paciente
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg">
          <button
              className="top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={toggleModal}
            >
              ✖
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-xl font-bold mb-4">Nuevo Paciente</h2>

              <label className="block text-gray-700">Nombre Completo</label>
              <input
                {...register('fullName', {
                  required: true,
                  pattern: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/i
                })}
                className="border p-2 w-full mb-2 rounded"
              />
              {errors?.fullName?.type === 'required' && <p className="text-red-500">Este campo es obligatorio</p>}
              {errors?.fullName?.type === 'pattern' && <p className="text-red-500">Solo caractéres alphabéticos.</p>}

              <label className="block text-gray-700">Edad</label>
              <input type="number"{...register('age', {
                  required: true,
                  max: 18,
                  pattern: /^[0-9]+$/ 
                })}
                className="border p-2 w-full mb-2 rounded"
              />
              {errors.age?.type === 'required' && <p className="text-red-500">Este campo es obligatorio</p>}
              {errors.age?.type === 'pattern' && <p className="text-red-500">Edad debe ser un número entero.</p>}
              {errors.age?.type === 'max' && <p className="text-red-500">Debe ser menor a 18 años</p>}
              
              <label className="block text-gray-700">Género</label>
              <select {...register('gender', { required: true })} className="border p-2 w-full mb-2 rounded">
                <option value="">Selecciona el género</option>
                  {GenderOptions.map((gender) => (
                    <option key={gender.id} value={gender.id}>
                      {gender.label}
                    </option>
                  ))}
              </select>
              {errors.gender && <p className="text-red-500">Este campo es obligatorio</p>}
              
              <label className="block text-gray-700">Fecha de nacimiento</label>
              <input type="date" {...register('dateBirth', { required: true })} className="border p-2 w-full mb-2 rounded"/>
              {errors.dateBirth && <p className="text-red-500">Este campo es obligatorio</p>}

              <label className="block text-gray-700">Ciudad de origen</label>
              <select {...register('cityOrigin', { required: true })} className="border p-2 w-full mb-2 rounded">
                <option value="">Selecciona la ciudad</option>
                  {CityOptions.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.name}
                    </option>
                  ))}
              </select>
              {errors.cityOrigin && <p className="text-red-500">Este campo es obligatorio</p>}
              
              <label className="block text-gray-700">Hospital de Origen</label>
              <input {...register('hospitalOrigin', {required: true, pattern: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/i })} className="border p-2 w-full mb-2 rounded" />
              {errors?.hospitalOrigin?.type === 'pattern' && <p className="text-red-500">Solo caracteres alphabéticos.</p>}
              {errors.hospitalOrigin?.type === 'required' && <p className="text-red-500">Este campo es obligatorio</p>}

              <label className="block text-gray-700">Fecha de registro</label>
              <input type="date" {...register('registerDate', { required: true })} className="border p-2 w-full mb-2 rounded"/>
              {errors.registerDate && <p className="text-red-500">Este campo es obligatorio</p>}

              <label className="block text-gray-700">Nombre del tutor</label>
              <input {...register('tutorName', {required: true, pattern: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/i })} className="border p-2 w-full mb-2 rounded" />
              {errors?.tutorName?.type === 'pattern' && <p className="text-red-500">Solo caractéres alphabéticos.</p>}
              {errors.tutorName?.type === 'required' && <p className="text-red-500">Este campo es obligatorio</p>}

              <label className="block text-gray-700">Teléfono</label>
              <input type="tel" {...register('tutorTelephone', 
                  {
                    required: true,
                    pattern: /^[0-9]{10}$/, 
                  }
                )}
                placeholder="1234567890"
                className="border p-2 w-full mb-2 rounded"
              />
              {errors.tutorTelephone?.type === 'required' && <p className="text-red-500">Este campo es obligatorio</p>}
              {errors.tutorTelephone?.type === 'pattern' && <p className="text-red-500">El teléfono debe tener 10 dígitos</p>}

              <input type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700 cursor-pointer w-full" value="Submit" onSubmit={toggleModal}/>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

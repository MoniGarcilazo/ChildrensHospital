import { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { Patient, GenderOptions, CityOptions } from "../common/utils/types";
import { updatePatient } from "../api/patients";
import { Toast } from "primereact/toast";

interface PatientUpdateFormProps {
    visible: boolean;
    patient: Patient | null;
    onHide: () => void;
}
const PatientUpdateForm: React.FC<PatientUpdateFormProps>= ({ visible, onHide, patient }) => {
  const {register, handleSubmit, setValue, formState: { errors },} = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const patientId = patient?.id ?? 0;
  useEffect(() => {
    if (patient) {
      setValue("fullName", patient.fullName);
      setValue("age", patient.age);
      setValue("gender", patient.gender);
      const formattedBirthDate = patient.dateBirth ? new Date(patient.dateBirth).toISOString().split("T")[0] : "";
      setValue("dateBirth", formattedBirthDate);
      setValue("cityOrigin", patient.cityOrigin);
      setValue("hospitalOrigin", patient.hospitalOrigin);
      const formattedRegisterDate = patient.registerDate ? new Date(patient.registerDate).toISOString().split("T")[0] : "";
      setValue("registerDate", formattedRegisterDate);
      setValue("tutorName", patient.tutorName);
      setValue("tutorTelephone", patient.tutorTelephone);
    }
  }, [patient, setValue]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async (data: any) => {
    const transformedData = {
      ...data,
      age: Number(data.age), 
    };
    if(patient?.id == null){

    }
    try {
      await updatePatient(patientId, transformedData);
      showSuccess();
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };
  const toast = useRef<Toast>(null);
  const showSuccess = () => {
    toast.current?.show({severity:'success', summary: 'Éxito', detail:'Paciente actualizado correctamente', life: 3000});
  }
  return (
    <Dialog header="Editar Paciente" visible={visible} onHide={onHide}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Toast ref={toast} position="bottom-right"/>
        <div>
          <label className="block text-gray-700">Nombre Completo</label>
          <input
            {...register("fullName", {
              required: true,
              pattern: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/i,
            })}
            className="border p-2 w-full mb-2 rounded"
          />
          {errors?.fullName?.type === "required" && <p className="text-red-500">Este campo es obligatorio</p>}
          {errors?.fullName?.type === "pattern" && <p className="text-red-500">Solo caractéres alphabéticos.</p>}
        </div>
        <div>
          <label className="block text-gray-700">Edad</label>
          <input
            type="number"
            {...register("age", {
              required: true,
              max: 18,
              pattern: /^[0-9]+$/,
            })}
            className="border p-2 w-full mb-2 rounded"
          />
          {errors.age?.type === "required" && <p className="text-red-500">Este campo es obligatorio</p>}
          {errors.age?.type === "pattern" && <p className="text-red-500">Edad debe ser un número entero.</p>}
          {errors.age?.type === "max" && <p className="text-red-500">Debe ser menor a 18 años</p>}
        </div>
        <div>
          <label className="block text-gray-700">Género</label>
          <select {...register("gender", { required: true })} className="border p-2 w-full mb-2 rounded">
            <option value="">Selecciona el género</option>
            {GenderOptions.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.label}
              </option>
            ))}
          </select>
          {errors.gender && <p className="text-red-500">Este campo es obligatorio</p>}
        </div>
        <div>
          <label className="block text-gray-700">Fecha de nacimiento</label>
          <input type="date" {...register("dateBirth", { required: true })} className="border p-2 w-full mb-2 rounded" />
          {errors.dateBirth && <p className="text-red-500">Este campo es obligatorio</p>}
        </div>
        <div>
          <label className="block text-gray-700">Ciudad de origen</label>
          <select {...register("cityOrigin", { required: true })} className="border p-2 w-full mb-2 rounded">
            <option value="">Selecciona la ciudad</option>
            {CityOptions.map((city) => (
              <option key={city.value} value={city.value}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.cityOrigin && <p className="text-red-500">Este campo es obligatorio</p>}
        </div>
        <div>
          <label className="block text-gray-700">Hospital de Origen</label>
          <input
            {...register("hospitalOrigin", {
              required: true,
              pattern: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/i,
            })}
            className="border p-2 w-full mb-2 rounded"
          />
          {errors?.hospitalOrigin?.type === "pattern" && <p className="text-red-500">Solo caracteres alphabéticos.</p>}
          {errors.hospitalOrigin?.type === "required" && <p className="text-red-500">Este campo es obligatorio</p>}
        </div>
        <div>
          <label className="block text-gray-700">Fecha de registro</label>
          <input type="date" {...register("registerDate", { required: true })} className="border p-2 w-full mb-2 rounded" />
          {errors.registerDate && <p className="text-red-500">Este campo es obligatorio</p>}
        </div>
        <div>
          <label className="block text-gray-700">Nombre del tutor</label>
          <input
            {...register("tutorName", {
              required: true,
              pattern: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/i,
            })}
            className="border p-2 w-full mb-2 rounded"
          />
          {errors?.tutorName?.type === "pattern" && <p className="text-red-500">Solo caractéres alphabéticos.</p>}
          {errors.tutorName?.type === "required" && <p className="text-red-500">Este campo es obligatorio</p>}
        </div>
        <div>
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="tel"
            {...register("tutorTelephone", {
              required: true,
              pattern: /^[0-9]{10}$/,
            })}
            placeholder="1234567890"
            className="border p-2 w-full mb-2 rounded"
          />
          {errors.tutorTelephone?.type === "required" && <p className="text-red-500">Este campo es obligatorio</p>}
          {errors.tutorTelephone?.type === "pattern" && <p className="text-red-500">El teléfono debe tener 10 dígitos</p>}
        </div>

        <div className="md:col-span-2">
          <input
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700 cursor-pointer w-full"
            value="Actualizar Paciente"
          />
        </div>
      </form>
    </Dialog>
  );
};

export default PatientUpdateForm;
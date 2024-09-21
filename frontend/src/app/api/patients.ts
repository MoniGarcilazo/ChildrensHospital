import { instance } from './base.api';
export const getAllPatients = async () => {
  const response = await instance.get(`patients`);
  return response.data;
};

export const getPatientById = async (id: number) => {
  const response = await instance.get(`patients/${id}`);
  return response.data;
};

export const createPatient = async (patientData: any) => {
  const response = await instance.post(`patients`, patientData);
  return response.data;
};

export const updatePatient = async (id: number, patientData: any) => {
  const response = await instance.put(`patients/${id}`, patientData);
  return response.data;
};

export const deletePatient = async (id: number) => {
  const response = await instance.delete(`patients/${id}`);
  return response.data;
};

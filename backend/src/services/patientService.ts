import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface Patient {
  fullName: string;
  age: number;
  gender: string;
  dateBirth: Date;
  cityOrigin: string;
  registerDate: Date;
  hospitalOrigin: string;
  tutorName: string;
  tutorTelephone: string;
}

//Get all patients
export const getAll = async () => {
  return await prisma.patient.findMany();
};

//Get patient by Id
export const getById = async (id: number) => {
  return await prisma.patient.findUnique({
    where: { id }
  });
};

//create new patient
export const create = async (data: Patient) => {
  return await prisma.patient.create({
    data: {
      ...data,
      dateBirth: new Date(data.dateBirth),
      registerDate: new Date(data.registerDate)
    }
  });
};

//Update patient by Id
export const update = async (id: number, data: Patient) => {
  return await prisma.patient.update({
    where: { id },
    data: {
      ...data,
      dateBirth: new Date(data.dateBirth),
      registerDate: new Date(data.registerDate)
    }
  });
};

//Delete patient by Id
export const remove = async (id: number) => {
  return await prisma.patient.delete({
    where: { id }
  });
};

import { Request, Response } from 'express';
import { getAll, getById, create, update, remove } from '../services/patientService';

// Get all patiens
export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await getAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Error getting patients' });
  }
};

//Get patient by Id
export const getPatientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const patient = await getById(parseInt(id));
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ error: 'Patient notfound' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error getting patient' });
  }
};

//Create patient
export const createPatient = async (req: Request, res: Response) => {
  try {
    const newpatient = await create(req.body);
    res.status(201).json(newpatient);
  } catch (error) {
    res.status(500).json({ error: 'Error creating patient' });
  }
};

//Update patient by Id
export const updatePatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const patientUpdated = await update(parseInt(id), req.body);
    res.json(patientUpdated);
  } catch (error) {
    res.status(404).json({ error: 'Error updating patient or patient not found.' });
  }
};

//Delete patient by Id
export const deletePatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await remove(parseInt(id));
    res.json({ message: 'Patient deleted successfuly.' });
  } catch (error) {
    res.status(404).json({ error: 'Error deleting patient or patient not found.' });
  }
};

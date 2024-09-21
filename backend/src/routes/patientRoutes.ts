import { Router } from 'express';
import { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } from '../controllers/patientController';

const router = Router();

router.get('/patients', getAllPatients);
router.get('/patients/:id', getPatientById);
router.post('/patients', createPatient);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

export default router;

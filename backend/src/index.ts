import express from 'express'
import patientRoutes from './routes/patientRoutes';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(patientRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});



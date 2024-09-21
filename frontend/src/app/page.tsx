import { PrimeReactProvider } from 'primereact/api';
import Table  from './components/Table'
import FormPatient from './components/PatientCreateForm';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './index.css';

export default function Home() {
  return (
    <PrimeReactProvider>
      <FormPatient></FormPatient>
      <Table></Table>
    </PrimeReactProvider>
  );
}

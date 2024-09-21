import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import PatientPage from './pages/PatientPage';
import './index.css';

export default function Home() {
  return (
    <PrimeReactProvider>
      <PatientPage/>
    </PrimeReactProvider>
  );
}

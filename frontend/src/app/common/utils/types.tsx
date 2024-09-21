export interface Patient {
    id: number;
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
  
export const GenderOptions = [
    {id: "M", label: "Masculino"},
    {id: "F", label: "Femenino"}, 
    {id: "NE", label: "No especificado"}
];
  
export const CityOptions = [
    {value: "Metropoli", name: "Metropoli"},
    {value: "Gotham City", name: "Gotham City"}, 
    {value: "Nueva Nueva York", name: "Nueva Nueva York"},
    {value: "Springfield", name: "Springfield"}, 
    {value: "Emerald City", name: "Emerald ity"},
    {value: "Atlantis", name: "Atlantis"}, 
    {value: "En ninguna Parte", name: "En ninguna parte"}
];
  
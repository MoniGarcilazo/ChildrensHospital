"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import 'primeicons/primeicons.css';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { Button } from 'primereact/button';
import { locale, addLocale } from 'primereact/api';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import ExtraInfoPatient from './ExtraInfoPatient'
import { Toast } from 'primereact/toast';
import { deletePatient, getAllPatients, updatePatient } from '../api/patients';
import { Patient, CityOptions } from '../common/utils/types';
import PatientUpdateForm from './PatientUpdateForm'

addLocale('es', {
    startsWith: 'Comienza con',
    contains: 'Contiene',
    notContains: 'No contiene',
    endsWith: 'Termina con',
    equals: 'Es igual a',
    notEquals: 'No es igual a',
    noFilter: 'Sin filtro',
});

locale('es');

export default function TablePatients() {
    const [patients, setPatients] = useState([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        fullName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        cityOrigin: { value: null, matchMode: FilterMatchMode.IN },
        hospitalOrigin: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPatients = async () => {
        try {
          const data = await getAllPatients();
          setPatients(data);
        } catch (error) {
          console.error("Error fetching patients:", error);
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const cityOriginBodyTemplate = (rowData: Patient) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.cityOrigin}</span>
            </div>
        );
    };
    
    const cityOriginRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <MultiSelect
                value={options.value}
                options={CityOptions}
                onChange={(e: MultiSelectChangeEvent) => options.filterApplyCallback(e.value)}
                optionLabel="name"
                placeholder="Todas"
                className="p-column-filter"
                maxSelectedLabels={1}
                style={{ minWidth: '14rem' }}
            />
        );
    };

    const [visibleMoreInfo, setVisibleMoreInfo] = useState(false);
    const [visibleUpdatePatient, setVisibleUpdatePatient] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    
    const viewPatient = (rowData: Patient) => {
        setSelectedPatient(rowData); 
        setVisibleMoreInfo(true);     
    };

    
    const editPatient = (rowData: Patient) => {
        setSelectedPatient(rowData); 
        setVisibleUpdatePatient(true);
    };

    const detelePatient = async (rowData: Patient) => {
        try {
          await deletePatient(rowData.id);
          showWarn();
          fetchPatients();
        } catch (error) {
          console.error("Error fetching patient:", error);
          showError();
        }
    };


    const toast = useRef<Toast>(null);
    const showError = () => {
        toast.current?.show({severity:'error', summary: 'Error', detail:'Error eliminando el paciente', life: 3000});
    }
    const showWarn = () => {
        toast.current?.show({severity:'warn', summary: 'Eliminado', detail:'Paciente eliminado correctamente', life: 3000});
    }
    const actionBodyTemplate = (rowData: Patient) => {
        return (
            <div className="flex justify-right gap-2">
                <Button icon="pi pi-eye" className="p-2" onClick={() => viewPatient(rowData)} />
                <Button icon="pi pi-pencil" className="p-2" onClick={() => editPatient(rowData)} />
                <Button icon="pi pi-trash" className="p-2" onClick={() => detelePatient(rowData)} />
            </div>
        );
    };
    
    return (
        <div className="card p-4" >
            <Toast ref={toast} position="bottom-right"/>
            <DataTable value={patients} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading} emptyMessage="Paciente no encontrado.">
                <Column field="fullName" header="Nombre" filter filterPlaceholder="Buscar por nombre"  style={{ minWidth: '12rem' }} className='px-3 py-2' />
                <Column field= "age" header="Edad" style={{ minWidth: '12rem' }} className='px-3 py-2'/>
                <Column field= "gender" header="Género" style={{ minWidth: '12rem' }} className='px-3 py-2'/>
                <Column header="Ciudad" filterField="cityOrigin" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                    body={cityOriginBodyTemplate} filter filterElement={cityOriginRowFilterTemplate} className='px-3 py-2'/>
                <Column field="hospitalOrigin" header="Hospital de Origen" filter filterPlaceholder="Buscar por hospital"   />
                <Column header="Acciones" body={actionBodyTemplate} style={{ textAlign: 'center', width: '10rem' }} className='px-3 py-2'/>
            </DataTable>
            <ExtraInfoPatient
                visible={visibleMoreInfo}
                patient={selectedPatient}
                onHide={() => setVisibleMoreInfo(false)}
            />
            <PatientUpdateForm
                visible={visibleUpdatePatient}
                patient={selectedPatient}
                onHide={() => setVisibleUpdatePatient(false)}
            />
        </div>
    );
}
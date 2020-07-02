import patients from '../../data/patients'
import { v4 as uuid } from 'uuid';


import {Patient, NonSensitivePatient, NewPatient} from '../types';

// const patients: Array<Patient> = patientData as Array<Patient>

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient [] => {
    return patients.map(({ id, name, dateOfBirth, gender,occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const findById = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id)
};

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };


    patients.push(newPatient);
    return newPatient;
}



export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    findById
};
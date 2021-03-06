import {Entry, NewEntry} from "../types";
import patientService from "./patientService"
import { v4 as uuid } from 'uuid';
import toNewEntry from '../utils'

const addEntry = ( unvalidatedEntry: NewEntry, patientId:string): Entry => {
    const validatedEntry = toNewEntry(unvalidatedEntry) as NewEntry

    const newEntry: Entry = {
        id: uuid(),
        ...validatedEntry
    };

    const patient = patientService.findById(patientId);
    patient?.entries.push(newEntry);
    return newEntry;
};

export default {
    addEntry
};
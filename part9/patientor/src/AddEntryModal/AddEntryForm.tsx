import React, {useState} from "react";
import { Entry } from "../types";
import { EntryTypeRadioFilter} from "./EntryTypeRadioFilter"
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import { AddHealthCheckEntryForm } from "./AddHealthCheckEntryForm"
import {AddOccupationalHealthcareEntryForm } from "./AddOccupationalHealthcareEntryForm"

export type EntryFormValues = Omit<Entry, "id">;

export interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {   
    const [entryType, setEntryType] = useState('Hospital')

    const EntryForm = () => {
        switch (entryType) {
            case 'Hospital':
                return <AddHospitalEntryForm
                onSubmit = {onSubmit}
                onCancel = {onCancel}
                />
                case 'OccupationalHealthcare':
                    return <AddOccupationalHealthcareEntryForm
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    />
                    case 'HealthCheck':
                        return <AddHealthCheckEntryForm
                        onSubmit = {onSubmit}
                        onCancel = {onCancel}
                        />
                    }         
                } 
                return (
                <div>
                    <EntryTypeRadioFilter
                    entryType = {entryType}
                    setEntryType = {setEntryType}
                    />
                    <br/>
                    {EntryForm()}
                    </div>
                    );
                };

export default AddEntryForm;

import React from "react";
import {Entry } from "../types";
import {useStateValue} from "../state";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import {List, Card} from "semantic-ui-react";


const PatientEntry: React.FC<{entry: Entry}> = ({entry}) => {
    const [{diagnoses}]=useStateValue()
    const entryDiagnoses = ()=> {
        if (entry.diagnosisCodes)
            return (
        <Card.Description>
                <b>Diagnoses:</b>
            {entry.diagnosisCodes?.map(code  =>
            <List key={code}>
                <List.Item>{code} {diagnoses[code].name}</List.Item>
            </List>)}
        <br/>
        </Card.Description>
            )
    }
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} diagnoses={entryDiagnoses()}/>
        case "Hospital":
            return <HospitalEntry entry={entry} diagnoses={entryDiagnoses()}/>
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} diagnoses={entryDiagnoses()}/>
        default:
            return assertNever(entry);
    }
};
export default PatientEntry;

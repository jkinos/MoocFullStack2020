import React from "react";
import {Entry } from "../types";
import {useStateValue} from "../state";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import {List, Card} from "semantic-ui-react";


const PatientEntry: React.FC<{entry: Entry}> = ({entry}) => {
    const [{diagnosisList}]=useStateValue()
    const diagnoses = ()=> {
        if (entry.diagnosisCodes)
            return (
        <Card.Description>
                <b>Diagnoses:</b>
            {entry.diagnosisCodes?.map(code  =>
            <List key={code}>
                <List.Item>{code} {diagnosisList[code].name}</List.Item>
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
            return <HealthCheckEntry entry={entry} diagnoses={diagnoses()}/>
        case "Hospital":
            return <HospitalEntry entry={entry} diagnoses={diagnoses()}/>
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses()}/>
        default:
            return assertNever(entry);
    }
};
export default PatientEntry;

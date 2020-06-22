import React from "react";
import {Diagnosis, Entry } from "../types";

const PatientEntry: React.FC<{entry: Entry, diagnosisList:{[code:string]: Diagnosis}}> = ({entry,diagnosisList}) => {


    if(!diagnosisList ) {
        return <div> </div>
    }
    const diagnoses = entry.diagnosisCodes?.map(code  => <li key={code}>{code} {diagnosisList[code].name}</li>);
    console.log(diagnosisList);

    return (
        <div>
            <p>{entry.date} {entry.description}</p>
            <ul>
                {diagnoses}
            </ul>
        </div>
    );
};
export default PatientEntry;

import React from "react";
import {Entry} from "../types";

const PatientEntry: React.FC<{entry: Entry}> = ({entry}) => {
    const diagnoses = entry.diagnosisCodes?.map(code => <li key={code}>{code}</li>);
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

import React from "react";
import {OccupationalHealthcare} from "../types";
import {Card, Icon} from "semantic-ui-react";

const OccupationalHealthcareEntry:
    React.FC<{entry: OccupationalHealthcare, diagnoses:JSX.Element|undefined}> = ({entry,diagnoses}) => {
    const sickLeave = () => {
       if( entry.sickLeave) {
           return <div><b>Sickleave: </b>{entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</div>
       }
    }
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon className='stethoscope'/></Card.Header>
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    {entry.description}
                </Card.Description>
                <Card.Description>
                    <b>Employer:</b> {entry.employerName}
                </Card.Description>
                <Card.Description>
                    {sickLeave()}
                </Card.Description>
                <Card.Description>
                   {diagnoses}
                </Card.Description>
                <Card.Description>
                    <Icon className='heart' color='green'/>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};
export default OccupationalHealthcareEntry;

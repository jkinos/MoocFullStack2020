import React from "react";
import {Hospital} from "../types";
import {Card, Icon} from "semantic-ui-react";

const HospitalEntry: React.FC<{entry: Hospital, diagnoses:JSX.Element|undefined}> = ({entry,diagnoses}) => {

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon className='doctor'/> </Card.Header>
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    {entry.description}
                </Card.Description>
                    {diagnoses}
                <Card.Description>
                    <b>Discharge: </b>
                </Card.Description>
                <Card.Description>
                    {entry.discharge.date}
                </Card.Description>
                <Card.Description>
                    {entry.discharge.criteria}
                </Card.Description>
                <Card.Description>
                    <Icon className='heart' color='green'/>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};
export default HospitalEntry;

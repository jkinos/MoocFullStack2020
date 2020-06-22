import React from "react";
import { HealthCheck, HealthCheckRating} from "../types";
import {Card, Icon} from "semantic-ui-react";

const HealthCheckEntry: React.FC<{entry: HealthCheck, diagnoses:JSX.Element|undefined}> = ({entry,diagnoses}) => {

    const healthRating= () => {
    switch (entry.healthCheckRating) {
        case HealthCheckRating.Healthy:
            return 'green';
        case HealthCheckRating.LowRisk:
            return 'yellow';
        case HealthCheckRating.HighRisk:
            return 'orange';
        case HealthCheckRating.CriticalRisk:
            return 'red'
    }
};
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon className='heartbeat' color='red'/> </Card.Header>
            </Card.Content>
                <Card.Content>
                <Card.Description>
                    {entry.description}
                </Card.Description>
                    <Card.Description>
                        {diagnoses}
                    </Card.Description>
                    <Card.Description>
                    <Icon className='heart' color={healthRating()}/>
                    </Card.Description>
                </Card.Content>
        </Card>
    );
};
export default HealthCheckEntry;

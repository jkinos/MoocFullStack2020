import React from "react";
import {useParams} from "react-router-dom";
import {useStateValue} from "../state";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import {Gender, Patient} from "../types";
import {Container, Icon} from 'semantic-ui-react'


const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{viewedPatients}, dispatch] = useStateValue();
    const patient = viewedPatients[id];

    React.useEffect(() => {
        axios.get<void>(`${apiBaseUrl}/ping`);

        const fetchViewedPatients = async () => {
                if (!viewedPatients[id]) {
                    try {
                        const { data: patientFromApi } = await axios.get<Patient[]>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                        dispatch({ type: "SET_VIEWED_PATIENT_LIST", payload: patientFromApi });
                    } catch (e) {
                        console.error(e);
                    }
                }
        };
        fetchViewedPatients();
    },[dispatch,id,viewedPatients]);

    const genderIcon = () => {
        if (patient.gender===Gender.Female){
        return 'venus'
    }
        if (patient.gender===Gender.Male){
            return 'mars'
        }
        return 'mars stroke'
};

    if(!patient) {
        return <div></div>
    }
        return (
            <Container>
                <h1>{patient.name} <Icon className={genderIcon()}/></h1>
                <p><b>ssn: {patient.ssn}</b></p>
                <p><b>occupation: {patient.occupation}</b></p>
            </Container>
        )
};

export default PatientPage
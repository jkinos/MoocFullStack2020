import React from "react";
import {useParams} from "react-router-dom";
import {useStateValue, setViewedPatients, setDiagnoses} from "../state";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import {Diagnosis, Gender, Patient} from "../types";
import {Header, Icon} from 'semantic-ui-react'
import PatientEntry from '../PatientEntry'


const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{viewedPatients,diagnosisList}, dispatch] = useStateValue();
    const patient = viewedPatients[id];

    React.useEffect(() => {
        const fetchViewedPatients = async () => {
                if (!viewedPatients[id]) {
                    try {
                        const { data: patientsFromApi } = await axios.get<Patient[]>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                        dispatch(setViewedPatients(patientsFromApi));
                    } catch (e) {
                        console.error(e);
                    }
                }
        };
        fetchViewedPatients();
    },[dispatch,id,viewedPatients]);

    React.useEffect(() => {
        const fetchDiagnosesList = async () => {

                if(Object.keys(diagnosisList).length === 0 ){
                    try {
                        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
                            `${apiBaseUrl}/diagnoses`
                        );
                        dispatch(setDiagnoses(diagnosesFromApi ));
                    } catch (e) {
                        console.error(e);
                    }
                }
        };
        fetchDiagnosesList();
    }, [dispatch,diagnosisList]);


    const genderIcon = () => {
        if (patient.gender===Gender.Female){
        return 'venus'
    }
        if (patient.gender===Gender.Male){
            return 'mars'
        }
        return 'mars stroke'
};

    if(!patient|| Object.keys(diagnosisList).length === 0) {
        return <div></div>
    }

    return (
            <div>
                <Header as="h1">{patient.name} <Icon className={genderIcon()}/></Header>
                <div>ssn: {patient.ssn}</div>
                <div>occupation: {patient.occupation}</div>
                <Header as='h2'>entries</Header>
                {
                    patient.entries.map(entry =>
                        <div key={entry.id} style={{paddingBottom: 10}}>
                        <PatientEntry entry={entry}/>
                        </div>
                )}
            </div>
        )
};

export default PatientPage;
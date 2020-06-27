import React from "react";
import {useParams} from "react-router-dom";
import {useStateValue, setViewedPatients, setDiagnoses} from "../state";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import {Diagnosis, Gender, Patient, Hospital} from "../types";
import {Header, Icon} from 'semantic-ui-react'
import PatientEntry from '../PatientEntry';
import { Button } from "semantic-ui-react";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";


const PatientPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [{viewedPatients,diagnoses}, dispatch] = useStateValue();
    const patient = viewedPatients[id];
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Hospital>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_NEW_ENTRY", payload: {entry: newEntry, id: id }});
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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

                if(Object.keys(diagnoses).length === 0 ){
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
    }, [dispatch,diagnoses]);


    const genderIcon = () => {
        if (patient.gender===Gender.Female){
        return 'venus'
    }
        if (patient.gender===Gender.Male){
            return 'mars'
        }
        return 'mars stroke'
};

    if(!patient|| Object.keys(diagnoses).length === 0) {
        return <div></div>
    }

    return (
            <div>
                <Header as="h1">{patient.name} <Icon className={genderIcon()}/></Header>
                <div>ssn: {patient.ssn}</div>
                <div>occupation: {patient.occupation}</div>
                <Header as='h2'>entries</Header>
                <AddEntryModal
                 modalOpen={modalOpen}
                 onSubmit={submitNewEntry}
                 error={error}
                 onClose={closeModal}
                 />
                  <Button onClick={() => openModal()}>Add New Entry</Button>
                  <br/>
                  <br/>
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
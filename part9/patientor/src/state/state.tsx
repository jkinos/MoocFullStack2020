import React, {createContext, useContext, useReducer} from "react";
import {Patient, Diagnosis} from "../types";

import {Action} from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  viewedPatients: { [id: string] :Patient};
  diagnoses: {[code: string]: Diagnosis}
};

const initialState: State = {
  patients: {},
  viewedPatients: {},
  diagnoses: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const setViewedPatients = (patientFromApi: Patient): Action => {
  return {
    type: "SET_VIEWED_PATIENT_LIST",
    payload: patientFromApi
  };
};
export const setDiagnoses = (diagnosesFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnosesFromApi
  }
}

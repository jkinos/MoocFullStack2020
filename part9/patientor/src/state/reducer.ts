import { State } from "./state";
import {Diagnosis, Patient} from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_VIEWED_PATIENT_LIST";
      payload: Patient[]
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis []
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_VIEWED_PATIENT_LIST":
      return {
        ...state,
        viewedPatients: {
          ...action.payload.reduce(
              (memo, patient) => ({ ...memo, [patient.id]: patient }),
              {}
          ),
          ...state.viewedPatients
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnosisList: {
          ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
          ),
          ...state.diagnosisList
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
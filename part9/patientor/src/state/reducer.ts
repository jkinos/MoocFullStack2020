import { State } from "./state";
import {Diagnosis, Patient, Entry} from "../types";

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
  | {
    type: "ADD_NEW_ENTRY";
    payload:  {
      entry: Entry
      id: string
    }
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
        diagnoses: {
          ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
          ),
          ...state.diagnoses
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
    case "ADD_NEW_ENTRY":
      console.log('id',action.payload.id)
      console.log('vieved patients',state.viewedPatients)
      return {
        ...state, 
        ...state.viewedPatients[action.payload.id].entries.concat(action.payload.entry)
      }
    default:
      return state;
    }
};

import React from "react";
import { Field, Formik, Form } from "formik";
import { TextField } from "./FormField";
import { Hospital } from "../types";
import { BaseEntryFields } from "./BaseEntryFields";
import { FormButtonsGrid } from "./FormButtonsGrid";
import {Form as SemanticForm} from 'semantic-ui-react'
import * as Yup from 'yup';
import { parse, isDate } from "date-fns";


export type HospitalEntryFormValues = Omit<Hospital, "id">;

export interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

const parseDateString = (originalValue:any)=> {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}


const requiredError = "Field is required";

const HospitalSchema = Yup.object().shape({
  description: Yup.string()
    .required(requiredError),
  date: Yup.date()
    .transform(parseDateString)
    .required(requiredError),
  specialist: Yup.string()
    .required(requiredError),
    discharge: Yup.object().shape({
      date: Yup.date().transform(parseDateString)
        .required(requiredError),
        criteria: Yup.string()
        .required(requiredError)
    })}
    );


export const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {    
  return (
    
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
            date: "",
            criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validationSchema={HospitalSchema}
    >     
    
      {({ isValid, dirty, setFieldValue, setFieldTouched, touched, errors}) => {
          
        return (
          <Form className="form ui">

            <BaseEntryFields
            setFieldValue = {setFieldValue}
            setFieldTouched = {setFieldTouched}
            /><br/>

            <SemanticForm.Group inline>
                <label>Discharge</label>
                <Field
                label= "Date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}/>
                <Field
                label= "Criteria"
                placeholder="Criteria"
                name="discharge.criteria"
                component={TextField}
                />
            </SemanticForm.Group>

            <FormButtonsGrid
            isValid={isValid}
            dirty = {dirty}
            onCancel = {onCancel}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalEntryForm;

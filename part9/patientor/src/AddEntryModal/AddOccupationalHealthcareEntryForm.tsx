import React from "react";
import { Field, Formik, Form } from "formik";
import { TextField } from "./FormField";
import { OccupationalHealthcare } from "../types";
import { BaseEntryFields } from "./BaseEntryFields";
import { FormButtonsGrid } from "./FormButtonsGrid";
import { Form as SemanticForm } from 'semantic-ui-react'
import * as Yup from 'yup';
import { parse, isDate } from "date-fns";

export type OccupationalHealthcareEntryValues = Omit<OccupationalHealthcare, "id">;

export interface Props {
  onSubmit: (values: OccupationalHealthcareEntryValues) => void;
  onCancel: () => void;
}

const parseDateString = (originalValue:any)=> {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}


const requiredError = "Field is required";

const OccupationalHealthcareSchema = Yup.object().shape({
  description: Yup.string()
    .required(requiredError),
  date: Yup.date()
    .transform(parseDateString)
    .required(requiredError),
  specialist: Yup.string()
    .required(requiredError),
    employerName: Yup.string()
    .required(requiredError),
    sickLeave: Yup.object().shape({
      startDate: Yup.date().transform(parseDateString),
        endDate: Yup.date().transform(parseDateString)
    })}
    );


export const AddOccupationalHealthcareEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {    

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName:'',
        sickLeave: {
          startDate: '',
          endDate: '',
      },
      }}
      onSubmit={onSubmit}
      validationSchema={OccupationalHealthcareSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, }) => {
          
        return (
          <Form className="form ui">

            <BaseEntryFields
            setFieldValue = {setFieldValue}
            setFieldTouched = {setFieldTouched}
            /><br/>

            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />

              <SemanticForm.Group inline>
                <label>Sick Leave</label>
                <Field
                label= "Start Date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
                />
                <Field
                label= "End Date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
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


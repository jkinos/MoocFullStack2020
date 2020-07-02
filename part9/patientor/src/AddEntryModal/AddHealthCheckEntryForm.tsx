import React from "react";
import { Formik, Field,Form } from "formik";
import { HealthCheck } from "../types";
import { BaseEntryFields } from "./BaseEntryFields";
import {FormButtonsGrid} from "./FormButtonsGrid";
import { NumberField } from "../AddPatientModal/FormField";

export type HealthCheckEntryFormValues = Omit<HealthCheck, "id">;

export interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

export const AddHealthCheckEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {    

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};

        const isString = (text: any): text is string => {
            return typeof text === 'string' || text instanceof String;
        };
        const isDate = (date: string): boolean => {
            return Boolean(Date.parse(date));
        };        
        
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
            errors.date = requiredError;
        }
        if(values.date.length> 0 && (!isString(values.date) || !isDate(values.date))) {
            errors.date = 'Malformatted date'
        }
        
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, }) => {
          
        return (
          <Form className="form ui">

            <BaseEntryFields
            setFieldValue = {setFieldValue}
            setFieldTouched = {setFieldTouched}
            /><br/>

            <Field
            label="healthCheckRating"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
            />

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


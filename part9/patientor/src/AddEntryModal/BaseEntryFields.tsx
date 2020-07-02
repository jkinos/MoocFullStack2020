import React from "react";
import { Field} from "formik";

import { TextField, DiagnosisSelection } from "./FormField";
import { useStateValue } from "../state";

interface Props {
setFieldValue: (field: "type"  | "description" | "date" | "specialist" | "diagnosisCodes", value: any, shouldValidate?: boolean | undefined) => void
setFieldTouched:(field: "type" | "description" | "date" | "specialist" | "diagnosisCodes", isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void
}
export const BaseEntryFields: React.FC<Props> = ({setFieldValue, setFieldTouched}) => {     
    const [{diagnoses}]=useStateValue()
  
          
        return (
          <div>

            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
    </div>
  );
};


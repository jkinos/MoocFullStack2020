import React from 'react'
import { Form } from 'semantic-ui-react'

export const EntryTypeRadioFilter: React.FC<{entryType: string, setEntryType:React.Dispatch<React.SetStateAction<string>>}>
 = ({entryType, setEntryType}) => {
    
  return (
        <Form.Group inline>
        <label><strong>Entry type</strong></label>
        <Form.Radio
        label= 'Hospital'
        checked = {entryType==='Hospital'}
        type="radio"
        name= "Hospital"
        value='Hospital'
        onChange= {()=> setEntryType('Hospital')}

        />
        <Form.Radio
        label= 'Health Check'
        checked = {entryType==='HealthCheck'}
        type="radio"
        name= "HealthCheck"
        value='HealthCheck'
        onChange={() => setEntryType('HealthCheck')}
        />
        <Form.Radio
        label='Occupational Healthcare'
        checked= {entryType==='OccupationalHealthcare'}
        type="radio"
        name= "OccupationalHealthcare"
        value='OccupationalHealthcare'
        onChange={() => setEntryType('OccupationalHealthcare')}
        />
        </Form.Group>

  )
}

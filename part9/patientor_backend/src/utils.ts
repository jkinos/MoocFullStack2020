import { Gender, NewPatient, HealthCheckRating, Diagnosis, NewEntry} from './types';
/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender)
    }
    return gender;
};
const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

export const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: object.entries || []
    }
}

const parseDescription  = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};

const parseSpecialist = (specialist: any): string => {
if(!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
}
return specialist}

const parseType = (type: any): 'Hospital'|'HealthCheck'|'OccupationalHealthcare' => {
    if(!type || !('Hospital' || 'HealthCheck' || 'OccupationalHealthcare')) {
        throw new Error('Incorrect or missing type: ' + type);
    }
    return type;
}
const parseDischarge = (discharge: any): { date: string, criteria: string } => {
if(!discharge || !discharge.date || !discharge.criteria
    || !isString(discharge.date) || !isString (discharge.criteria)) {
    throw new Error('Incorrect or missing discharge: ' + discharge)
}
discharge.date =  parseDate(discharge.date)
return discharge
}

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
}

const parseHealthCheck = (healthCheckRating: any): HealthCheckRating => {
    if(healthCheckRating===(undefined|| null) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthcheck rating: ' + healthCheckRating)
    }
    return healthCheckRating
}

const parseEmployer = (employerName: any): string => {
if(!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employername: ' + employerName)
}
return employerName
}

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
if (!Array<Diagnosis['code']>(diagnosisCodes)) {
    throw new Error('incorrect diagnosesCodes' + diagnosisCodes)
}
return diagnosisCodes;
}

const parseSickLeave = (sickLeave: any): { startDate: string, endDate: string } | undefined => {
    if (!sickLeave) {
    return undefined
    }
    if(!sickLeave.startDate || !sickLeave.endDate) {
        throw new Error('Incorrect or missing missing sickleave: ' + sickLeave)
    }
    
return { startDate: parseDate(sickLeave.startDate), endDate: sickLeave.endDate }
}

const toNewEntry = (object: any): NewEntry => {
    const date =  parseDate(object.date);
    const description = parseDescription(object.description);
    const specialist = parseSpecialist(object.specialist);
    const type = parseType(object.type);
    const diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes)
    const sickLeave = parseSickLeave(object.sickLeave)
    const baseEntryObject = {
        date,description,specialist,diagnosisCodes
    };
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    switch (type) {
        case 'Hospital':
                return {
                    ...baseEntryObject, type, discharge: parseDischarge(object.discharge)
                }
        case 'HealthCheck':
            return {
                ...baseEntryObject, type, healthCheckRating: parseHealthCheck(object.healthCheckRating)
            };
        case 'OccupationalHealthcare':
            return {
                ...baseEntryObject, type,employerName:parseEmployer(object.employerName), sickLeave
            };
        default:
            return assertNever(type)
        }
    }


export default toNewEntry
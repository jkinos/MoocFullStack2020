import diagnoses from '../../data/diagnoses'

import { Diagnosis } from '../types';

// const diagnoses: Array<Diagnose> = diagnoseData;

const getDiagnoses = (): Array<Diagnosis> => {
    return diagnoses;
};

export default {
    getDiagnoses,
};

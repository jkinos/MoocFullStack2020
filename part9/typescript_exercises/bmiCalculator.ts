
export const calculateBmi = (args: Array<string>): string => {
    /*if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
        console.log(args)
        throw new Error('Provided values were not numbers!');
    }

    const heightInCM = Number(args[2])
    const weightInKG = Number(args[3])*/

    const heightInCM = Number(args[0]);
    const weightInKG = Number(args[1]);

    const heightInMeters = heightInCM/100;
    const bmi = weightInKG / (heightInMeters*heightInMeters);

    if (bmi < 15) { return 'Very severely underweight'; }
    if (bmi >= 15 && bmi < 16 ) { return 'Severely underweight'; }
    if (bmi >= 16 && bmi < 18.5) { return 'Underweight'; }
    if (bmi >= 18.5 && bmi < 25 ) { return 'Normal (healthy weight)'; }
    if (bmi >= 25 && bmi < 30 ) { return 'Overweight'; }
    if ( bmi >= 30 && bmi < 35 ) { return 'Obese Class I (Moderately obese)'; }
    if (bmi >= 35 && bmi < 40 ) { return 'Obese Class II (Severely obese)'; }
    if ( bmi >= 40 ) { return 'Obese Class III (Very severely obese)'; }
    else { return 'bmi could not be calculated'; }
};


try {
    const result = calculateBmi(process.argv);
    console.log(result);
} catch (e) {
    const result = (e as Error).message;
    console.log('Error, something bad happened, message: ', result);
}

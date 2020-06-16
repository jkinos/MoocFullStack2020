
interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
export const calculateExercises = (periodsExerciseHoursPerDay: Array<number>, target: number): Result => {
    /*if (args.length < 4) throw new Error('Not enough arguments');
    const [,, ...numbers] = args.map(Number);
    if (numbers.some(isNaN)){
        console.log(numbers);
        throw new Error('Provided values were not numbers!');
    }
    const target = numbers[0];
    const [, ...periodsExerciseHoursPerDay] = numbers;*/

    if ( !Array.isArray(periodsExerciseHoursPerDay)
        || periodsExerciseHoursPerDay.some(isNaN)
        || isNaN(target)){
        throw new Error('malformatted parameters');
    }
    const periodLength = periodsExerciseHoursPerDay.length;
    const trainingDays = periodsExerciseHoursPerDay.filter(hours => hours != 0).length;
    const totalHours = periodsExerciseHoursPerDay.reduce((acc:number, cur:number) => acc + cur);
    const average = totalHours/periodLength;
    const success = average >= target;
    let rating;
    let ratingDescription;
    if(success) {
        rating = 3;
        ratingDescription = 'excellent work!';
    } else if(average/target>= 0.8){
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }else {
        rating = 1;
        ratingDescription = 'try harder next time';
    }
return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

/*try {
    const result = calculateExercises(process.argv);
    console.log(result);
} catch (e) {
    const result = (e as Error).message;
    console.log('Error, something bad happened, message: ', result);
}*/


export default calculateExercises;
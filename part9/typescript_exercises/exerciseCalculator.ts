
interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
const calculateExercises = (periodsExerciseHoursPerDay: Array<number> ,target: number): Result => {
    const periodLength = periodsExerciseHoursPerDay.length
    const trainingDays = periodsExerciseHoursPerDay.filter(hours => hours != 0).length
    const totalHours = periodsExerciseHoursPerDay.reduce((acc:number, cur:number) => acc + cur)
    const average = totalHours/periodLength
    const success = average >= target
    let rating
    let ratingDescription
    if(success) {
        rating = 3
        ratingDescription = 'excellent work!'
    } else if(average/target>= 0.8){
        rating = 2
        ratingDescription = 'not too bad but could be better'
    }else {
        rating = 1
        ratingDescription = 'try harder next time'
    }
return { periodLength, trainingDays, success, rating, ratingDescription, target, average }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))
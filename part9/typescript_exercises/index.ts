import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {
    const height = req.query.height as string;
    const weight = req.query.weight as string;
    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))){
        res.send({
            error: "malformatted parameters"
        });
    }
    const result = calculateBmi([height,weight]);
    try {
        res.send({
        weight: req.query.weight,
        height: req.query.height,
        bmi: result
    });
    } catch(e) {
        const result = (e as Error).message;
        res.send({
        error: `Error, something bad happened, message: ${ result }`
    });
    }
});

app.post('/exercises',
    (req,res) => {
        /*eslint-disable @typescript-eslint/no-unsafe-assignment*/
        /*eslint-disable @typescript-eslint/no-unsafe-member-access*/
        const body= req.body;

    if (!body.daily_exercises || !body.target || body.daily_exercises.length===0 || body.target.length===0) {
         res.status(400).send({
            error: 'parameters missing'
        });
    }
        const exercises = body.daily_exercises;
        const target = body.target;

    try {
        res.send( calculateExercises(exercises,target));
        }
    catch (e) {
        const error = (e as Error).message;
        res.status(400).send({
            error: error
        });
    }
});
const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

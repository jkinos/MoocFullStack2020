import express from 'express';
import { calculateBmi } from './bmiCalculator';
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
    try {res.send({
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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

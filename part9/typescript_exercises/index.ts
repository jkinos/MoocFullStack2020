import express from 'express';
import { calculateBmi } from './bmiCalculator'
const app = express();
app.use(express.json())


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {
    const height = req.query.height
    const weight = req.query.weight
    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))){
        res.send({
            error: "malformatted parameters"
        })
    }
    // @ts-ignore
    const result = calculateBmi([height,weight])
    try {res.send({
        weight: req.query.weight,
        height: req.query.height,
        bmi: result
    })
    } catch(e) {res.send({
        error: 'Error, something bad happened, message: '+ e.message
    })
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

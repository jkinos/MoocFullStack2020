import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import entriesRouter from './routes/entries';

const app = express();
import cors from 'cors';

app.use(express.json());
app.use(cors())
app.use(express.static('build'))


app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter )
app.use('/api/patients', patientsRouter )
app.use('/api/patients', entriesRouter )

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

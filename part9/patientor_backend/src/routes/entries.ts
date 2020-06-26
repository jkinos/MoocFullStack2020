import express from 'express';
import entryService from "../services/entryService";
import  toNewEntry from '../utils';

const router = express.Router();

router.post('/:id/entries', (req, res) => {

    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = entryService.addEntry(newEntry, req.params.id);
        res.json(addedEntry);
    }
    catch (e) {
            res.status(400).send(e.message);
        }
});

export default router;
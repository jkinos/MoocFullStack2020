import express from 'express';
import diangnoseService from "../services/diangnoseService";

const router = express.Router();


router.get('/', (_req, res) => {
    res.send(diangnoseService.getDiagnoses());
});

export default router;

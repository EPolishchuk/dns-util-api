import { Router } from 'express';
import { dig } from '../dns-utils';
import { digAnswer } from '../interfaces';

const router = Router();
const A = 'A';
const NS = 'NS';

router.get('/dig/:host', async (req, res) => {
  let answer: digAnswer = {
    host: req.params.host,
  };
  try {
    answer.record = await dig(answer.host, A);
  } catch (error) {
    if (error === 'ENOTFOUND') {
      answer.error = error;
      res.json({ answer });
    }
    answer.record = error;
  }
  try {
    answer.nameservers = await dig(answer.host, NS);
    res.json({ answer });
  } catch (error) {
    answer.nameservers = error;
    res.json({ answer });
  }
});

router.get('/dig/:host/:record', async (req, res) => {
  let answer: digAnswer = {
    host: req.params.host,
  };
  try {
    answer.record = await dig(answer.host, req.params.record);
  } catch (error) {
    if (error === 'ENOTFOUND') {
      answer.error = error;
      return res.json({ answer });
    }
    answer.record = error;
  }
  try {
    answer.nameservers = await dig(answer.host, NS);
    return res.json({ answer });
  } catch (error) {
    answer.nameservers = error;
    return res.json({ answer });
  }
});

export default router;

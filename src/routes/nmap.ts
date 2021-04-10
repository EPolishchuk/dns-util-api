import { Router } from 'express';
import { nmap } from './../dns-utils';
import { answer } from '../interfaces';
const router = Router();

router.get('/nmap/:host', async (req, res) => {
  const WEB_PORT = 80;

  let answer: answer = {
    host: req.params.host,
    port: WEB_PORT,
    status: false,
  };

  try {
    answer.status = await nmap(WEB_PORT, req.params.host);
  } catch (error) {
    answer.status = error;
  }

  res.json(answer);
});

router.get('/nmap/:host/:port', async (req, res) => {
  const PORT = +req.params.port;

  let answer: answer = {
    host: req.params.host,
    port: PORT,
    status: false,
  };

  try {
    answer.status = await nmap(PORT, req.params.host);
  } catch (error) {
    answer.status = error;
  }

  res.json(answer);
});

export default router;

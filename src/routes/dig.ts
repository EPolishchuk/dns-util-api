import { Router } from 'express';
import net from 'net';
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

router.get('/dig/:host/:record/:server', async (req, res) => {
  let answer: digAnswer = {
    host: req.params.host,
  };

  let record: string = req.params.record;
  let server: string = req.params.server;

  if (net.isIP(server) === 0) {
    let serverIp;
    try {
      serverIp = await dig(
        server,
        'A');
    } catch (error) {
      if (error === 'ENOTFOUND') {
        answer.error = error;
      }
      return res.json({ answer });
    }
    if (Array.isArray(serverIp)) {
      const random = Math.floor(Math.random() * serverIp.length);
      server = String(serverIp[random]);
    }
  }
  try {
    answer.record = await dig(
      answer.host,
      record,
      server
    );
  } catch (error) {
    if (error === 'ENOTFOUND') {
      answer.error = error;
      return res.json({ answer });
    }
    answer.record = error;
  }

  try {
    answer.nameservers = await dig(answer.host, NS, server);
    return res.json({ answer });
  } catch (error) {
    answer.nameservers = error;
    return res.json({ answer });
  }
});

export default router;

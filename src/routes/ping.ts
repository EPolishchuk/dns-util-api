import { Router } from 'express';
import { ping } from './../dns-utils';

const router = Router();

router.get('/ping/:host', async (req, res) => {
  let result = await ping(req.params.host);
  res.json(result);
});

export default router;

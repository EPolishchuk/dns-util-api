import { Router } from 'express';

const router = Router();

router.get('/dig/:domain', (req, res) => {
  res.json(req.params.domain);
});

export default router;

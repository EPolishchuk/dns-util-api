import { Router } from 'express';

const router = Router();

router.get('/nmap/:domain', (req, res) => {
  res.json(req.params.domain);
});

export default router;

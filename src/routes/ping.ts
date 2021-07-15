import { Router } from 'express';
import { ping } from './../dns-utils';

const router = Router();

router.get('/ping/:host', async (req, res) => {
  try {
    let result = await ping(req.params.host);
    return res.json(result);  
  } catch (error) {
    if (error === 'ENOTFOUND') {
      return res.json({ error: 'Host IP address incorrect or not found' });
    }
    return res.json({error: error});
  }
});

export default router;

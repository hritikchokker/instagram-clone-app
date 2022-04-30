import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  res.send('<h1>user route working fine</h1>');
});

router.post('/register').post('/login');

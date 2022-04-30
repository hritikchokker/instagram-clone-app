import { router as userRouter } from '../modules/user/userRoute';
import { Router } from 'express';

export const router = Router();

router.get('/api/v1', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});
router.use('/api/v1/user', userRouter);
router.all('*', (_, res) => {
  res.send(
    `<h1 style="text-align:center; margin-top:200px;">No Route Found,<br> Hello world</h1>`
  );
});

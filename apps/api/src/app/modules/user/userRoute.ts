import { Router } from 'express';
import { UserController } from './userController';
export const router = Router();
const userController = new UserController();

router.get('/', (req, res) => {
  res.send('<h1>user route working fine</h1>');
});

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/profile', userController.getUserProfile);
router.get('/list', userController.userList);

router.get('/forgot-password', userController.forgotPassword);

router.get('/logout', userController.logout);

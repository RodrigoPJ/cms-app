import { Router } from 'express';
import saveNewUser  from '../controllers/saveNewUser';
import getAllUsers from '../controllers/getAllUsers';
import loginUser from '../controllers/loginUser';
import authenticate from '../controllers/authenticate';
import resetPassword from '../controllers/resetPassword';
import UserPassParser from '../middleware/userPassParser';
import logout from '../controllers/logout';

const router = Router();

router.get('/auth/getUsers', getAllUsers);
router.post('/auth/add-user', saveNewUser);
router.post('/auth/login', UserPassParser, loginUser);
router.post('/auth/authenticate', authenticate);
router.put('/auth/reset', UserPassParser, resetPassword);
router.post('/auth/logout', logout);

export default router;
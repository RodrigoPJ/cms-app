import { Router } from 'express';
import saveNewUser  from '../controllers/saveNewUser';
import getAllUsers from '../controllers/getAllUsers';
import loginUser from '../controllers/loginUser';
import authenticate from '../middleware/authenticate';
import resetPassword from '../controllers/resetPassword';
import UserPassParser from '../middleware/userPassParser';
import logout from '../controllers/logout';
import healthCheck from '../controllers/health';
import isAuthenticated from '../controllers/isAuthenticated';

const router = Router();

router.get('/auth/get-users',authenticate, getAllUsers);
router.get('/auth/health-check', authenticate, healthCheck);
router.post('/auth/add-user', saveNewUser);
router.post('/auth/login', UserPassParser, loginUser);
router.post('/auth/authenticate', authenticate, isAuthenticated);
router.post('/auth/logout', logout);
router.put('/auth/reset', UserPassParser, resetPassword);

export default router;

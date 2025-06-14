import { Router } from 'express';
import saveNewUser  from '../handlers/saveNewUser';
import getAllUsers from '../handlers/getAllUsers';
import loginUser from '../handlers/loginUser';
import authenticate from '../middleware/authenticate';
import resetPassword from '../handlers/resetPassword';
import UserPassParser from '../middleware/userPassParser';
import logout from '../handlers/logout';
import healthCheck from '../handlers/health';
import isAuthenticated from '../handlers/isAuthenticated';

const router = Router();

router.get('/auth/get-users',authenticate, getAllUsers);
router.get('/auth/health-check', authenticate, healthCheck);
router.post('/auth/add-user', saveNewUser);
router.post('/auth/login', UserPassParser, loginUser);
router.post('/auth/authenticate', authenticate, isAuthenticated);
router.post('/auth/logout', logout);
router.put('/auth/reset', UserPassParser, resetPassword);

export default router;

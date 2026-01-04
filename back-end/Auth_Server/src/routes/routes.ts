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
import keys from '../handlers/keys';
import encryptedDataParser from '../middleware/encryptedDataParser';

const router = Router();

router.get('/get-users', getAllUsers);
router.get('/health-check', healthCheck);
router.get('/keys', keys);
router.post('/add-user', saveNewUser);
router.post('/login', encryptedDataParser , loginUser);
router.post('/authenticate', authenticate, isAuthenticated);
router.post('/logout', logout);
router.put('/reset', UserPassParser, resetPassword);

export default router;

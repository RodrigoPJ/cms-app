import { Router } from 'express';
import saveNewUser  from '../controllers/saveNewUser';
import getAllUsers from '../controllers/getAllUsers';
import loginUser from '../controllers/loginUser';

const router = Router();

router.get('/api/getUsers', getAllUsers);
router.post('/api/add-user', saveNewUser);
router.post('/api/login', loginUser)

export default router;
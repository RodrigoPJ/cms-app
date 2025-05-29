import { Router } from 'express';
import createNewUSer from '../controllers/createNewUser';
import getAllUsers from '../controllers/getAll';
import getUser from '../controllers/getUser';

const routes = Router();

routes.get('/ctn/get-users', getAllUsers);
routes.post('/uiprofile',  createNewUSer);
routes.get('/uiprofile', getUser);


export default routes;

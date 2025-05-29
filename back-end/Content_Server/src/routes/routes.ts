import { Router } from 'express';
import createNewUSer from '../controllers/createNewUser';
import aunthenticateRequest from '../middleware/authenticate';

const routes = Router();

routes.get('/api/content', (...cb)=>{
  const res = cb[1];
  res.status(200).send('content response')
});

routes.post('/uiprofile', aunthenticateRequest,  createNewUSer)

export default routes;

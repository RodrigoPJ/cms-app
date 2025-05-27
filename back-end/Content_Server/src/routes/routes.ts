import { Router } from 'express';

const routes = Router();

routes.get('/api/content', (...cb)=>{
  const res = cb[1];
  res.status(200).send('content response')
});

export default routes;

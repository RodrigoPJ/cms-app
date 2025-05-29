import { Router } from 'express';
import createNewUSer from './handlers/createNewUser';
import getAllUsers from './handlers/getAll';
import getUser from './handlers/getUser';
import createNewProject from './handlers/createNewProject';

const routes = Router();

// routes for admin check and status of server
routes.get('/admin/get-users', getAllUsers);

// routes for creating and retrieving an account

// this one is meant to be consumed only by the auth server 
routes.post('/uiprofile',  createNewUSer);

// this one feeds the client with the account information on the user
routes.get('/uiprofile', getUser);

//Project creation and handling
routes.post('/newProject', createNewProject);

// project content
routes.post('/project-content');
routes.get('/project-content');
routes.put('/project-content');
routes.delete('/project-content');



export default routes;

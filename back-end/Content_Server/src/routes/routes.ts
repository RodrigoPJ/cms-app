import { Router } from 'express';
import createNewUSer from './handlers/createNewUser';
import getAllUsers from './handlers/getAllUsers';
import getUser from './handlers/getUser';
import createNewProject from './handlers/createNewProject';
import getProject from './handlers/getProject';
import getAllContents from './handlers/getAllcontents';
import getAllProjects from './handlers/getAllProjects';
import newContent from './handlers/newContent';
import getProjectList from './handlers/getProjectList';

const routes = Router();

// routes for admin check and status of server
routes.get('/admin/get-users', getAllUsers);
routes.get('/admin/get-all-content', getAllContents);
routes.get('/admin/get-all-projects', getAllProjects);


// routes for creating and retrieving an account

// this one is meant to be consumed only by the auth server 
routes.post('/uiprofile',  createNewUSer);

// this one feeds the client with the account information on the user
routes.get('/uiprofile', getUser);

//Project creation
routes.post('/new-project', createNewProject);

//  gets the list of projects for a given user
routes.get('/projects', getProjectList);


//  create the first content node of a prroject
routes.post('/project-content', newContent);

// get content for given project
 routes.get('/project-content', getProject);
// routes.put('/project-content');
// routes.delete('/project-content');



export default routes;

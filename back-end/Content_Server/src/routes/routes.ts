import { Router } from 'express';
import postNewUser from './handlers/account/postAccount';
import getAllAccounts from './handlers/admin/getAllAccounts';
import getAccount from './handlers/account/getAccount';
import postNewProject from './handlers/project/postNewProject';
import getProject from './handlers/project/getProject';
import getAllcontents from './handlers/admin/getAllcontents';
import getAllProjects from './handlers/admin/getAllProjects';
import postContent from './handlers/content/postContent';
import patchContent from './handlers/content/patchContent';
import putContent from './handlers/content/putContent';
import postPresignedS3url from './handlers/aws/postPresignedS3url';
import deleteContent from './handlers/content/deleteContent';
import deleteProject from './handlers/project/deleteProject';

const routes = Router();

// Admin only routes
// routes for admin check and status of server
routes.get('/admin/get-all-users', getAllAccounts);
routes.get('/admin/get-all-content', getAllcontents);
routes.get('/admin/get-all-projects', getAllProjects);

// Server side route
// routes for creating and retrieving an account
routes.post('/ui-profile',  postNewUser);

// Client Side routes

// this one feeds the client the account with its list of projects
routes.get('/ui-profile/:accountId', getAccount);

// Project routes
routes.post('/new-project', postNewProject);
routes.get('/project/:projectId', getProject)
routes.delete('/project/:projectId', deleteProject)

//  Content routes
routes.post('/project-content', postContent);
routes.put('/project-content/:contentId', putContent);
routes.patch('/project-content/:contentId', patchContent);
routes.delete('/project-content/:contentId', deleteContent);

// AWS routes
routes.post('/presigned-S3-url', postPresignedS3url)

export default routes;

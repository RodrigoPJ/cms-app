import { Router } from 'express';
import postNewUSer from './handlers/postNewUser';
import getAllUsers from './handlers/admin/getAllUsers';
import getUser from './handlers/getUser';
import postNewProject from './handlers/postNewProject';
import getProject from './handlers/getProject';
import getAllContents from './handlers/admin/getAllcontents';
import getAllProjects from './handlers/admin/getAllProjects';
import postContent from './handlers/postContent';
import putContent from './handlers/putContent';
import postPresignedS3url from './handlers/postPresignedS3url';

const routes = Router();

// Auth / Admin only routes

// routes for admin check and status of server
routes.get('/admin/get-all-users', getAllUsers);
routes.get('/admin/get-all-content', getAllContents);
routes.get('/admin/get-all-projects', getAllProjects);

// routes for creating and retrieving an account
// this one is meant to be consumed only by the auth server, receives user data, creates and returns an accountId
routes.post('/ui-profile',  postNewUSer);

// Client Side routes

// this one feeds the client the user element with list of projects for the requested accountId
routes.get('/ui-profile', getUser);

//Project creation providing accountId
routes.post('/new-project', postNewProject);

// returns the contents for  a specific  projectId
routes.get('/project', getProject)

//  creates a content node  for any project given
routes.post('/project-content', postContent);

// update given content node
routes.put('/project-content', putContent);
// routes.delete('/project-content');


// posts filee information before getting the url to upload the users media
 routes.post('/presigned-S3-url', postPresignedS3url)


export default routes;

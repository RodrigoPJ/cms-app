import { Request, Response } from "express";
import { log } from "console";

import { ProjectItem } from "../../database/db-config/entity/ProjectItem";


export default function getProjectList(req:Request,res:Response){
  log(req.headers["user-agent"]);
  log('retrieving project list...');
  const body = req.body;
  if (body['projectListId']){
    const {projectListId} = body;
    if (typeof projectListId === 'string'){
      
    }
  }
  // const validationErrors = 

}
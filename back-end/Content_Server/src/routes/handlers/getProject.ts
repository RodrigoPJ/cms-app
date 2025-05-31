import { Request, Response } from "express";
import { log } from "console";
import { AppDataSource } from "../../database/db-config/data-source";
import validateProjecId, {
  ProjectRequest,
} from "../../utils/validators/validateProjectId";
import { ProjectItem } from "../../database/db-config/entity/ProjectItem";

const getProject = async (req: Request, res: Response) => {
  log(req.headers["user-agent"]);
  log("retrieving project and filling content");

  const body = req.body;
  if (body) {
    try {
      const validationErrors = await validateProjecId(body);
      log('validation errors',validationErrors.length)
      if (validationErrors.length > 0) {
        res.status(402).json({...validationErrors.map(e => e.constraints)})
      }else {
        const projectId:string = body.projectId;
        if (projectId) {
        const savedProject = await AppDataSource.getRepository(
          ProjectItem
        ).findOne({
          where: {
            id: projectId,
          },
        });
        if (savedProject) {
          res.status(200).json(savedProject);
        }else {
          res.status(402).send("db didn't find any project with that id");

        }
      } else {
        res.status(402).send("bad payload");
      }
      }
      
    } catch (error) {
      //log(error)
      res.status(500).send(error);
    }
  } else {
    res.status(403).send("bad request, no body");
  }
};

export default getProject;

import { log } from "console";
import { Request, Response } from "express";
import validateNewProjectItem, {
  ProjectValidator,
} from "../../utils/validators/validateNewProject";
import { ValidationError } from "class-validator";
import saveProject from "../../database/controllers/saveProject";

const createNewProject = async (req: Request, res: Response) => {
  log(req.headers["user-agent"]);
  try {
    const body: ProjectValidator = req.body;
    const validProject: ProjectValidator | ValidationError[] = await validateNewProjectItem(body);
    if (
      "accountId" in validProject &&
      validProject.name &&
      typeof validProject.contentType === "string"
    ) {
      const savedProject = await saveProject(validProject);
      if (savedProject) {
        res.status(200).json(savedProject);
      } else {
        res.status(503).send("was not able to create new project in database");
      }
    } else {
      res.status(401).json(validProject);
    }
  } catch (error) {
    res.status(402).send({ message: "error saving new project", error: JSON.stringify(error) });
  }
};

export default createNewProject;

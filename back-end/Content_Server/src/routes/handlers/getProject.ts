import { Request, Response } from "express";
import { log } from "console";
import validateProjectId from "../../utils/validators/validatePrrojectId";
import findContents from "../../database/controllers/findContents";

const getProject = async (req: Request, res: Response) => {
  log(req.headers["user-agent"]);
  log("retrieving contents of project");
  try {
    const body = req.body;
    if (body) {
      const validationErrors = await validateProjectId(body);
      log("validation errors", validationErrors.length);
      if (validationErrors.length > 0) {
        res.status(402).json({ ...validationErrors.map((e) => e.constraints) });
      } else {
        const projectId: string = body.projectId;
        const savedContents = await findContents(projectId);
        if (savedContents) res.status(200).send(savedContents);
        else {
          res.status(404).send('no contents saved for that project')
        }
      }
    } else {
      res.status(402).send("bad payload");
    }
  } catch (e) {
    res.status(400).json(e)
  }
};

export default getProject;

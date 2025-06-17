import { RequestHandler, Request, Response } from "express";
import validateContentRequest from "../../utils/validators/validateNewContent";
import saveContent from "../../database/controllers/saveContent";
import { AppDataSource } from "../../database/db-config/data-source";
import { ProjectContent } from "../../database/db-config/entity/ProjectContent";

const putContent: RequestHandler | null = async (
  req: Request,
  res: Response
) => {
  const reqBody = req.body;
  try {
    const { type, title, body, properties, projectItemId, id, published } =
      reqBody;
    if (typeof id === "string") {
      const savedContent = await AppDataSource.getRepository(
        ProjectContent
      ).update({ id }, { published: published ? published : new Date().toLocaleString() });
      if (savedContent) res.status(200).send(savedContent);
      else res.status(400).send("bad request");
    } else {
      res.status(400).send("bad request");
    }
  } catch (error) {
    res.status(403).send(error);
  }
};

export default putContent;

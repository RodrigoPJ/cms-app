import { RequestHandler, Request, Response } from "express";
import validateContentRequest from "../../utils/validators/validateNewContent";
import saveContent from "../../database/controllers/saveContent";
import { log } from "console";

const postContent: RequestHandler | null = async (req: Request, res: Response) => {
  const reqBody = req.body;
  try {
    const validationErrors = await validateContentRequest(reqBody);
    if (validationErrors.length > 0) {
      res.status(400).json([...validationErrors.map((el) => el.constraints)]);
    } else {
      const { type, title, body, properties, projectItemId } = reqBody;
      if (
        typeof type === "string" &&
        typeof title === "string" &&
        typeof body === "string" &&
        typeof properties === "string" &&
        typeof projectItemId === "string"
      ) {
        const savedContent =  await saveContent({
          type, title, body, properties, projectItemId 
        });
        if (savedContent) res.status(200).send(savedContent);
        else res.status(400).send("bad request");
      } else {
        res.status(400).send("bad request");
      }
    }
  } catch (error) {
    res.status(403).send(error);
  }
};

export default postContent;

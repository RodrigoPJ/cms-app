import { Request, Response } from "express";
import { log } from "console";
import { AppDataSource } from "../../database/db-config/data-source";
import { ProjectContent } from "../../database/db-config/entity/ProjectContent";

const deleteContent = async (req: Request, res: Response) => {
  const { contentId } = req.body;
  console.log("delete", contentId, req.body);
  if (typeof contentId === "string") {
    try {
      const deleteItem = await AppDataSource.getRepository(
        ProjectContent
      ).delete({
        id: contentId,
      });
      if (deleteItem.affected) {
        log("deleted", deleteItem);
        res.status(200).json({ text: "success", deleteItem });
      }
    } catch (error) {
      log(error);
      res.status(503).json(error);
    }
  } else {
    res.status(403).json("bad request");
  }
};

export default deleteContent;

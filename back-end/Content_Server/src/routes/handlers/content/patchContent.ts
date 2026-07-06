import { RequestHandler, Request, Response } from "express";
import { AppDataSource } from "../../../database/db-config/data-source";
import { Content } from "../../../database/db-config/entity/Content";

const patchContent: RequestHandler = async (req: Request, res: Response) => {
  const { contentId } = req.params;

  try {
    const { isPublished } = req.body;

    // Validate that the payload is explicitly a boolean
    if (typeof isPublished !== "boolean") {
      res
        .status(400)
        .json({ error: "Payload 'isPublished' must be a boolean." });
      return;
    }

    const contentRepo = AppDataSource.getRepository(Content);

    // 1. Verify the record exists
    const existingContent = await contentRepo.findOneBy({ id: contentId });
    if (!existingContent) {
      res.status(404).json({ error: "Content block not found" });
      return;
    }

    // 2. Set the database value based strictly on the incoming boolean flag
    // If true, stamp it with the current UTC time. If false, set it to null.
    const newPublishState = isPublished ? new Date().toISOString() : null;

    // 3. Update the row
    await contentRepo.update(contentId, { published: newPublishState });

    // 4. Return the updated content object back to the frontend
    const updatedContent = await contentRepo.findOneBy({ id: contentId });

    res.status(200).json(updatedContent);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export default patchContent;

import { RequestHandler, Request, Response } from "express";
import validateContentRequest from "../../../utils/validators/validateNewContent";
import { AppDataSource } from "../../../database/db-config/data-source";
import { Content } from "../../../database/db-config/entity/Content";

const putContent: RequestHandler = async (
  req: Request,
  res: Response
) => {
  // 1. Get the content ID from the route path parameters
  const { contentId } = req.params; 
  const reqBody = req.body;

  try {
    const validationErrors = await validateContentRequest(reqBody);
    if (validationErrors.length > 0) {
      res.status(400).json(validationErrors);
      return;
    }

    const contentRepo = AppDataSource.getRepository(Content);

    // 2. Fetch the existing record from Postgres
    const existingContent = await contentRepo.findOneBy({ id: contentId });
    if (!existingContent) {
      res.status(404).json({ error: "Content block not found" });
      return;
    }

    // 3. Destructure all possible update fields from the request body
    const { type, title, body, properties, projectId, published } = reqBody;

    // 4. Build a dynamic update payload containing only fields that were actually provided and changed
    const updatePayload: Partial<Content> = {};

    if (type !== undefined && type !== existingContent.type) updatePayload.type = type;
    if (title !== undefined && title !== existingContent.title) updatePayload.title = title;
    if (body !== undefined && body !== existingContent.body) updatePayload.body = body;
    if (published !== undefined && published !== existingContent.published) updatePayload.published = published;
    if (projectId !== undefined && projectId !== existingContent.projectId) updatePayload.projectId = projectId;

    // JSONB optimization: Deep check or simply pass it if it was sent in the body
    if (properties !== undefined && JSON.stringify(properties) !== JSON.stringify(existingContent.properties)) {
      updatePayload.properties = properties;
    }

    // 5. Check if any fields actually changed. If not, don't execute a useless database write.
    if (Object.keys(updatePayload).length === 0) {
      res.status(200).json(existingContent); // Return unchanged object immediately
      return;
    }

    // 6. Execute the update query passing the dynamic changes
    await contentRepo.update(contentId, updatePayload);

    // 7. Fetch and return the freshly updated database object to the frontend
    const updatedContent = await contentRepo.findOneBy({ id: contentId });
    res.status(200).json(updatedContent);

  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export default putContent;
import { log } from "console";
import { ContentRequest } from "../../utils/validators/validateNewContent";
import { AppDataSource } from "../db-config/data-source";
import { ProjectContent } from "../db-config/entity/ProjectContent";

const saveContent = async (content: ContentRequest) => {
  try {
      const newContent = new ProjectContent();
      newContent.body  = content.body;
      newContent.projectItemId = content.projectItemId;
      newContent.properties = content.properties;
      newContent.title = content.title;
      newContent.type = content.type;
      if (content.id) newContent.id  = content.id;
      if(content.published) newContent.published = content.published;
      const savedContent = await AppDataSource.getRepository(ProjectContent).save(newContent);
      if (savedContent) {
        return savedContent;
      
    }else {
      return null;
    }
  } catch (error) {
    log(error)
    throw new Error (JSON.stringify(error))
  }
};

export default saveContent;


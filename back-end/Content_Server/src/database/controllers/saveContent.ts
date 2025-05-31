import { ContentRequest } from "../../utils/validators/validateNewContent";
import { AppDataSource } from "../db-config/data-source";
import { ProjectContent } from "../db-config/entity/ProjectContent";
import { ProjectList } from "../db-config/entity/ProjectList";

const saveContent = async (content: ContentRequest) => {
  try {
    const projectList = AppDataSource.getRepository(ProjectList).findOneOrFail({
      where: {
        id: content.projectItemId,
      },
    });
    if(projectList) {
      const newContent = new ProjectContent();
      newContent.body  = content.body;
      newContent.projectItemId = content.projectItemId;
      newContent.properties = content.properties;
      newContent.title = content.title;
      newContent.type = content.type;
      const savedContent = await AppDataSource.getRepository(ProjectContent).save(newContent);
    }
  } catch (error) {
    throw new Error (JSON.stringify(error))
  }
};

export default saveContent;


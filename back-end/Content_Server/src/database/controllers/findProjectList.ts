import { ContentRequest } from "../../utils/validators/validateNewContent";
import { AppDataSource } from "../db-config/data-source";
import { ProjectContent } from "../db-config/entity/ProjectContent";
import { ProjectItem } from "../db-config/entity/ProjectItem";
import { ProjectList } from "../db-config/entity/ProjectList";

const findProjectList = async (id: string) => {
  try {
    const projectList= await AppDataSource.getRepository(ProjectItem).find({
      where: {
        projectListId: id
      }
    });
    return projectList
  } catch (error) {
    
  }
}

export default findProjectList;
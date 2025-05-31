import { AppDataSource } from "../db-config/data-source";
import { ProjectContent } from "../db-config/entity/ProjectContent";

/** Searches for all project items that share the given */
const findContents = async (id: string):Promise<ProjectContent[] | null> => {
  try {
    const projectList= await AppDataSource.getRepository(ProjectContent).find({
      where: {
        projectItemId: id
      }
    });    
    if(projectList.length === 0) return null;
    return projectList;
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export default findContents;

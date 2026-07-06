import { AppDataSource } from "../../db-config/data-source";
import { Content } from "../../db-config/entity/Content";

/** Searches for all project items that share the given */
const findContents = async (id: string):Promise<Content[] | null> => {
  // await AppDataSource.initialize();
  try {
    const projectList= await AppDataSource.getRepository(Content).find({
      where: {
        projectId: id
      }
    });
    if(projectList.length === 0) return null;
    return projectList;
  } catch (error) {
    console.log(error)
    return null;
  }
}

export default findContents;

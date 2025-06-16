import { log } from "console";
import { ProjectValidator } from "../../utils/validators/validateNewProject";
import { AppDataSource } from "../db-config/data-source";
import { ProjectItem } from "../db-config/entity/ProjectItem";

const saveProject = async ({
  accountId,
  name,
  contentType,
}: ProjectValidator): Promise<ProjectItem | null> => {
  try {
    const project = new ProjectItem();
    project.contentType = contentType;
    project.accountId = accountId;
    project.name = name;
    project.isActive = true;
    project.published = 'not published'
    const savedProject = await AppDataSource.getRepository(ProjectItem).save(
      project
    );
    if (savedProject.id) return savedProject;
    else return null;
  } catch (error) {
    log(error)
    throw new Error(error);
  }
};

export default saveProject;

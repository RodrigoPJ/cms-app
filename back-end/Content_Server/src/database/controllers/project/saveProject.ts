import { log } from "console";
import { ProjectValidator } from "../../../utils/validators/validateNewProject";
import { AppDataSource } from "../../db-config/data-source";
import { Project } from "../../db-config/entity/Project";

const saveProject = async ({
  accountId,
  name,
  contentType,
}: ProjectValidator): Promise<Project | null> => {
  try {
    const project = new Project();
    project.contentType = contentType;
    project.accountId = accountId;
    project.name = name;
    project.isActive = true;
    project.published = 'not published'
    const savedProject = await AppDataSource.getRepository(Project).save(
      project
    );
    if (savedProject.id) return savedProject;
    else return null;
  } catch (error) {
    log(error)
    throw new Error('Project not saved');
  }
};

export default saveProject;

import { ProjectValidator } from "../../utils/validators/validateNewProject";
import { AppDataSource } from "../db-config/data-source";
import { ProjectItem } from "../db-config/entity/ProjectItem";

const saveProject = async ({
  projectListId,
  name,
  contentType,
}: ProjectValidator): Promise<ProjectItem | null> => {
  try {
    const project = new ProjectItem();
    project.contentType = contentType;
    project.projectListId = projectListId;
    project.name = name;
    const savedProject = await AppDataSource.getRepository(ProjectItem).save(
      project
    );
    if (savedProject.contentType) return savedProject;
    else return null;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export default saveProject;

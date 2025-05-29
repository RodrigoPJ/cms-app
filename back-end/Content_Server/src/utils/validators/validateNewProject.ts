import { validate, IsUUID, IsString, ValidationError } from "class-validator";


export class ProjectValidator {
  @IsUUID()
  projectListId: string;

  @IsString()
  contentType: string;

  @IsString()
  name: string;

}


const validateNewProjectItem = async (item:ProjectValidator): Promise<ProjectValidator | ValidationError[]>=>{
    const project = new ProjectValidator();
    project.projectListId = item.projectListId;
    project.name = item.name;
    project.contentType = item.contentType;
    const ValidationErrors = await validate(project);
    if (ValidationErrors.length === 0) {
        return {...project};
    } else {
        return ValidationErrors;
    }
}

export default validateNewProjectItem;
import { validate, IsUUID, IsString, ValidationError } from "class-validator";


export class ProjectValidator {
  @IsUUID()
  accountId: string;

  @IsString()
  contentType: string;

  @IsString()
  name: string;

}


const validateNewProjectItem = async (item:ProjectValidator): Promise<ProjectValidator | ValidationError[]>=>{
    const project = new ProjectValidator();
    project.accountId = item.accountId;
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
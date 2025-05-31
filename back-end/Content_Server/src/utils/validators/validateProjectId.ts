import {
  validate,
  IsUUID,
  ValidationError,
} from "class-validator";

export class ProjectRequest {
  @IsUUID()
  projectId: string;
}

const validateProjecId = async (
  payload: ProjectRequest
): Promise<ValidationError[]> => {
  const goodRequest = new ProjectRequest();
  goodRequest.projectId = payload.projectId;
  const isValid = await validate(goodRequest);
  return isValid;
};

export default validateProjecId;

import { validate, IsEmail, IsUUID, IsString, IsObject, IsOptional } from "class-validator";

export class ContentRequest {
  @IsString()
  type: string;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  properties: string;

  @IsUUID()
  projectItemId: string;

  @IsOptional()
  id?: string;

  @IsOptional()
  published?: string;
}

const validateContentRequest = async (user: ContentRequest) => {
  const newContent = new ContentRequest();
  newContent.type = user.type;
  newContent.title = user.title;
  newContent.body = user.body;
  newContent.properties = user.properties;
  newContent.projectItemId = user.projectItemId;
  const validationErrorrs = await validate(newContent);
  return validationErrorrs;
};

export default validateContentRequest;

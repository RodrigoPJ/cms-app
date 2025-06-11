import type { AppDispatch } from "../../utils/store/store";
import { DataContent } from "./DataContent";
import {
  addAllContents,
  addContent,
  addProject,
  setProfile,
} from "../../utils/store/profileSlice";
import type { Content } from "../../utils/types/data-types";

export class ContentService {
  accountId: string;
  dataContent: DataContent;

  constructor(acc: string) {
    this.accountId = acc;
    this.dataContent = new DataContent();
  }

  findUser(accountId: string) {
    return async (dispatch: AppDispatch) => {
      const UserProfile = await this.dataContent.findUser(accountId);
      console.log(UserProfile);
      if (UserProfile) {
        dispatch(setProfile(UserProfile));
      }else {
        alert('no user found');
      }
    };
  }

  getAllContents(projectId:string) {
    return async (dispatch: AppDispatch) => {
      const allContents = await this.dataContent.fetchContents(projectId);
      if(allContents) {
        dispatch(addAllContents(allContents));
        return allContents;
      }
      return [];
    }
  }

  createNewProject(projectName: string, contentType: string) {
    return async (dispatch: AppDispatch) => {
      const createdProject = await this.dataContent.createProject(
        projectName,
        contentType,
        this.accountId
      );
      if (createdProject) {
        dispatch(addProject(createdProject));
        return;
      }else {
        alert('content not saved')
        return;
      }
    };
  }

  createNewContent(content: Content, quillValue: string) {
    return async (dispatch: AppDispatch) => {
      try {
        const createdContent = await this.dataContent.createContent(
          content,
          quillValue
        );
        if (createdContent) {
          dispatch(addContent(createdContent));
        }
      } catch (error) {}
    };
  }
}

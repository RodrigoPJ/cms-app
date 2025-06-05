import type { AppDispatch } from "../../utils/store/store";
import { DataContent } from "./DataContent";
import { addProject, setProfile } from "../../utils/store/profileSlice";

export class ContentService   {
    accountId: string;
    dataContent: DataContent;
    constructor(acc:string){
      this.accountId = acc;
      this.dataContent = new DataContent();
    }
    findUser(accountId:string){
      return async (dispatch: AppDispatch)=>{
          const UserProfile = await this.dataContent.findUser(accountId);
          console.log(UserProfile);
          if (UserProfile) {
            dispatch(setProfile(UserProfile))
          }
      }
    }
    createNewProject(projectName:string, contentType:string) {
      return async (dispatch:AppDispatch) =>{
       const createdProject = await this.dataContent.createProject(projectName, contentType, this.accountId);
       if(createdProject){
        dispatch(addProject(createdProject))
       }
      }
    }
    createNewContent(content) {
      return async (dispatch:AppDispatch)=>{}
    }
}
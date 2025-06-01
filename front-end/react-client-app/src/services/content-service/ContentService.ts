import type { AppDispatch } from "../../utils/store/store";
import { DataContent } from "./DataContent";
import { setProfile } from "../../utils/store/profileSlice";


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
}
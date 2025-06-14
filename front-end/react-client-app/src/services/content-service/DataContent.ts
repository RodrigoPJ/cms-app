import type { Content, User } from "../../utils/types/data-types";
import {
  fakeGetUser,
//  fakePostProject,
} from "./stand-alone-data/fakeContentServices";

export class DataContent {
  public findUser;
  private contentServer: string;
  public createProject;
  public createContent;
  public fetchContents;

  constructor() {
    const BE = import.meta.env;
    this.contentServer = BE["VITE_SERVER_content"] || "";
    if (BE["VITE_Back_End_type"] === "fake") {
      this.findUser = fakeGetUser;
      this.createProject = this.postProject;
      this.createContent = DataContent.postContent; //this.fakeContentCreation
      this.fetchContents = DataContent.getContents;
    }
    if (BE["VITE_Back_End_type"] === "local") {
      this.findUser = this.fetchUser;
      this.createProject = this.postProject;
      this.createContent = DataContent.postContent;
      this.fetchContents = DataContent.getContents;
    } else {
      this.findUser = fakeGetUser;
      this.createProject = this.postProject;
      this.createContent = DataContent.postContent;
      this.fetchContents = DataContent.getContents;
    }
  }

  static async getContents(projectId:string):Promise<Content[]| null> {
    const url =  `/content/project?projectId=${projectId}`
    const request = new Request(url);
    try {
      const rawContent = await fetch(request);            
      if (rawContent.status === 200) {  
        const parsedContent = await rawContent.json();        
        if (parsedContent.length > 0) {                  
          return parsedContent;
        }
      }
      if(rawContent.status === 303) {
        const message = await rawContent.text();
        alert(message);        
      }
      return null;
      
    } catch (error) {
      alert(error)
      return null
    }
    
  }


  static async postContent(content: Content, quill: string):Promise<Content | null> {
    const request = new Request("/content/project-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...content, body:quill, projectItemId:content.projectId
      }),
    });

    try {
      const rawContent = await fetch(request);
      if (rawContent.status === 200) {
        const parsedContent = await rawContent.json();
        if (parsedContent.id) {
          return parsedContent;
        }
      }
      return null;
      
    } catch (error) {
      alert(error)
      return null
    }
    
  }


  async postProject(
    projectName: string,
    contentType: string,
    accountId: string
  ) {
    const url = "/content/new-project";
    const request = new Request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId, name: projectName, contentType
      }),
    });

    try {
      const rawProject = await fetch(request);
      if (rawProject.status === 200) {
        const project = await rawProject.json();
        return project;
      } else {
        return null;
      }
    } catch (error) {
      alert(error);
      console.log(error);
      return null;
    }
  }

  async fetchUser(accId: string): Promise<User | null> {
    const shortUrl= `/content/ui-profile?accountId=${accId}`
    const request = new Request(shortUrl);    
    try {
      const rawUser = await fetch(request, {
        credentials: "include",
      });
      if (rawUser.status === 200) {
        const user: User = await rawUser.json();
        return user;
      } else {
        return null;
      }
    } catch (error) {
      // console.log(error);
      return null;
    }
  }
}

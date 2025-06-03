import type { User } from "../../utils/types/data-types";
import {
  fakeGetUser,
//  fakePostProject,
} from "./stand-alone-data/fakeContentServices";

export class DataContent {
  public findUser;
  private contentServer: string;
  public createProject;

  constructor() {
    const BE = import.meta.env;
    this.contentServer = BE["VITE_SERVER_content"] || "";
    if (BE["VITE_Back_End_type"] === "fake") {
      this.findUser = fakeGetUser;
      this.createProject = this.postProject;
    }
    if (BE["VITE_Back_End_type"] === "local") {
      this.findUser = this.fetchUser;
      this.createProject = this.postProject;
    } else {
      this.findUser = fakeGetUser;
      this.createProject = this.postProject;
    }
  }

  async loadProject() {}

  async postProject(
    projectName: string,
    contentType: string,
    accountId: string
  ) {
    const baseUrl = this.contentServer;
    let url = "/new-project";
    if (baseUrl) {
      url = baseUrl + url;
    }
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
    const baseUrl = this.contentServer;
    let url = "/ui-profile/";
    if (baseUrl) {
      url = baseUrl + url;
    }
    const userUrl = new URL(url);
    userUrl.searchParams.append("accountId", accId);
    const request = new Request(userUrl);
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
      console.log(error);
      return null;
    }
  }
}

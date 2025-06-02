import type { User } from "../../utils/types/data-types";
import { fakeGetUser } from "./stand-alone-data/fakeContentServices";

export class DataContent {
  public findUser;
  private contentServer: string;

  constructor() {
    const BE = import.meta.env;
    this.contentServer = BE["VITE_SERVER_content"] || '';
    if (BE["VITE_Back_End_type"] === "fake") {
      this.findUser = fakeGetUser;
    }
    if (BE["VITE_Back_End_type"] === "local") {
      this.findUser = this.fetchUser;
    } else {
      this.findUser = fakeGetUser;
    }
  }

  async loadProject(){}

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
        credentials: 'include'
      });
      if (rawUser.status === 200) {
        const user:User = await rawUser.json();
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

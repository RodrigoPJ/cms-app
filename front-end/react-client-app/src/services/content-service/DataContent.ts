import type { User } from "../../utils/types/data-types";
import { fakeGetUser } from "./stand-alone-data/fakeContentServices";

export class DataContent {
  public findUser;
  private env;

  constructor() {
    const BE = import.meta.env;
    this.env = BE;
    if (BE["VITE_Back_End_type"] === "fake") {
      this.findUser = fakeGetUser;
    }
    if (BE["VITE_Back_End_type"] === "local") {
      this.findUser = this.fetchUser;
    } else {
      this.findUser = fakeGetUser;
    }
  }

  async fetchUser(accId: string): Promise<User | null> {
    const baseUrl = this.env["VITE_Back_End_auth_url"];
    let url = "/ui-profile";
    if (baseUrl) {
      url = baseUrl + url;
    }
    const userUrl = new URL(url);
    userUrl.searchParams.append("accountId", accId);
    const request = new Request(userUrl);
    try {
      const rawUser = await fetch(request);
      if (rawUser.status === 200) {
        const user = await rawUser.json();
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

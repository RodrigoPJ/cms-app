import type { PersonData, SignupResponse } from "../../utils/types/data-types";
import { fakeLogIn, fakeLogout, fakeSignup } from "./fakeAuthServices";

export class DataAuth {
  public login;
  public logout;
  public signup;
  private env: any;
  constructor() {
    const BE = import.meta.env;
    this.env = BE;
    if (BE["VITE_Back_End_type"] === "fake") {
      this.login = fakeLogIn;
      this.logout = fakeLogout;
      this.signup = fakeSignup;
    } else if (BE["VITE_Back_End_type"] === "local") {
      this.login = this.authLogin;
      this.logout = this.authLogout;
      this.signup = this.authSignup;
    } else {
      this.login = fakeLogIn;
      this.logout = fakeLogout;
      this.signup = fakeSignup;
    }
  }

  async authSignup(obj: PersonData): Promise<SignupResponse | null> {
    const baseUrl = this.env["VITE_Back_End_auth_url"];
    let url = "/signup";
    if (baseUrl) {
      url = baseUrl + url;
    }
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(obj),
    });
    try {
      const rawResponse = await fetch(request);
      if (rawResponse.status === 200) {
        const user = await rawResponse.json();
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async authLogout() {
    const request = new Request("auth/logout", {
      method: "POST",
      body: JSON.stringify(null),
    });
    try {
      const rawResponse = await fetch(request);
      if (rawResponse.status === 200) {
        const user = await rawResponse.json();
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error("request to auth failed");
    }
  }

  async authLogin(
    name: string,
    password: string
  ): Promise<SignupResponse | null> {
    const baseUrl = this.env["VITE_Back_End_auth_url"];
    let url = "/login";
    if (baseUrl) {
      url = baseUrl + url;
    }
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify({ name, password }),
    });
    try {
      const rawResponse = await fetch(request);
      if (rawResponse.status === 200) {
        const user = await rawResponse.json();
        return user;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
}

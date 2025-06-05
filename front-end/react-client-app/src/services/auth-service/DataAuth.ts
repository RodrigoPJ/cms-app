import type {
  ENV,
  PersonData,
  SignupResponse,
} from "../../utils/types/data-types";
import { fakeLogIn, fakeLogout, fakeSignup } from "./fakeAuthServices";

export class DataAuth {
  public login;
  public logout;
  public signup;
  private env: ENV;
  constructor() {
    const BE: ENV = import.meta.env;
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
    const baseUrl = this.env["VITE_SERVER_auth"];
    let url = "/add-user";
    if (baseUrl) {
      url = baseUrl + url;
    }
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    request.headers.set("my_token", JSON.stringify(obj));
    console.log(request.headers);

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
    const baseUrl = this.env["VITE_SERVER_auth"];
    let url = "/logout";
    if (baseUrl) {
      url = baseUrl + url;
    }
    const request = new Request(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ loggedOut: true }),
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

  async authLogin(
    name: string,
    password: string
  ): Promise<SignupResponse | null> {
    const baseUrl = this.env["VITE_SERVER_auth"];
    let url = "/login";
    if (baseUrl) {
      url = baseUrl + url;
    }
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify({ email: "mail@test.com", password: "password" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    request.headers.set("my_token", JSON.stringify({ email: name, password }));
    try {
      const rawResponse = await fetch(request, {
        credentials: "include",
      });
      if (rawResponse.status === 200) {
        const user = await rawResponse.json();
        return user;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      throw new Error(JSON.stringify(e))
    }
  }
}

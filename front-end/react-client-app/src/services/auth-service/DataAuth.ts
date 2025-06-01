import type { PersonData, SignupResponse } from "../../utils/types/data-types";


export class DataAuth {
  public login;
  public logout;
  public signup;
  constructor() {
    const BE = import.meta.env;
    console.log(BE);
    if (BE["VITE_Back_End_type"] === "fake") {
      this.login = fakeLogIn;
      this.logout = fakeLogout;
      this.signup = fakeSignup;
    } else if (BE["VITE_Back_End_type"] === "local") {
      this.login = authLogin;
      this.logout = authLogout;
      this.signup = authSignup;
    } else {
      this.login = fakeLogIn;
      this.logout = fakeLogout;
      this.signup = fakeSignup;
    }
  }
}

export function fakeSignup(obj:PersonData): Promise<SignupResponse> {
  return new Promise<SignupResponse>((res) => {
    console.log("connecting to server....");
    setTimeout(() => {
      console.log(`${JSON.stringify(obj)}`);
      res({accountId: '1'});
    }, 1500);
  });
}


export async function authSignup(obj:PersonData):Promise<SignupResponse |null > {
const request = new Request('auth/signup', {
  method: 'POST',
  body: JSON.stringify(obj)
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

export async function authLogout() {
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

export async function authLogin(name: string, password: string) {
  const request = new Request("auth/login", {
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
  } catch (error) {
    console.log(error);

    throw new Error("request to auth failed");
  }
}

export function fakeLogout() {
  return new Promise<boolean>((res) => {
    console.log("connecting to serrver....");
    setTimeout(() => {
      console.log(`now logged out`);
      res(true);
    }, 1500);
  });
}

export function fakeLogIn(name: string, password: string) {
  return new Promise<boolean>((res) => {
    console.log("connecting to server....");
    setTimeout(() => {
      console.log(`${name} with ${password} is now logged in`);
      res(true);
    }, 1500);
  });
}

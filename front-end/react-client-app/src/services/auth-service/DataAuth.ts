import { encryptAESKey, encryptWithAES, generateAESKey } from "../../utils/crypto/cypher";
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
  constructor() {
    const BE: ENV = import.meta.env;
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
    const url = "/api/auth/add-user";
    console.log(url);
    
    const request = new Request(url, {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    request.headers.set("my_token", JSON.stringify(obj));
    console.log(request.headers.values().next().value);

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
    const url = "/api/auth/logout";
    const request = new Request(url, {
      method: "POST",
      credentials: "include",
      mode: 'cors',
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
    email: string,
    password: string
  ): Promise<SignupResponse | null> {
    const loginUrl = "/api/auth/login";
    const keyUrl = '/api/auth/keys';
    const publicRSAKeyRaw = await fetch(keyUrl);
    const publicRSAKey = await publicRSAKeyRaw.json()
    const aesKey = await generateAESKey();
    const encryptedData = await encryptWithAES(aesKey, {email, password});
    const encryptedKey = await encryptAESKey(aesKey, publicRSAKey.publicKey);
    const payload = {
      key: encryptedKey,
      iv: encryptedData.iv,
      data: encryptedData.ciphertext,
      tag: encryptedData.tag
    };
    const request = new Request(loginUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      credentials: 'include',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
    });
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

  static async resetPassword(
    name: string,
    password: string
  ): Promise<SignupResponse | null> {
    const url = "/api/auth/reset";
    const request = new Request(url, {
      method: "PUT",
      body: JSON.stringify({ email: name, password}),
      credentials: 'include',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      const rawResponse = await fetch(request);
      if (rawResponse.status === 200) {
        const user = await rawResponse.json();
        return user;
      } else {
        const error = await rawResponse.json();
        alert(error)
        return null;
      }
    } catch (e) {
      console.log(e);
      throw new Error(JSON.stringify(e))
    }
  }
}

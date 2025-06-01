import type { PersonData, SignupResponse } from "../../utils/types/data-types";

export function fakeSignup(obj:PersonData): Promise<SignupResponse> {
  return new Promise<SignupResponse>((res) => {
    console.log("connecting to server....");
    setTimeout(() => {
      console.log(`${JSON.stringify(obj)}`);
      res({accountId: '1'});
    }, 1500);
  });
}


export function fakeLogout() {
  return new Promise<boolean>((res) => {
    console.log("connecting to server....");
    setTimeout(() => {
      console.log(`now logged out`);
      res(true);
    }, 1500);
  });
}

export function fakeLogIn(name: string, password: string) {
  return new Promise<SignupResponse>((res) => {
    console.log("connecting to server....");
    setTimeout(() => {
      console.log(`${name} with ${password} is now logged in`);
      res({
        accountId: "1"
      });
    }, 1500);
  });
}

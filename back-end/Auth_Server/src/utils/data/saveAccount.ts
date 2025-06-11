import { ContentNewUserResponse } from "../types";
import * as dotenv from 'dotenv'

export default async function saveAccount(name: string, email: string) {
  dotenv.config();
  const contentServerUrl = process.env.CONTENT_SERVER_URL;
  const url = contentServerUrl + '/content/ui-profile';
  const rawResponse = await fetch(url ,{
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: name,
      user: email,
    }),
  });
  if (rawResponse.status !== 200) {
    rawResponse.statusText
    throw new Error(rawResponse.statusText);
  } else {
    const parsedUser:any = await rawResponse.json();
    if (parsedUser['id']) {
      return parsedUser as  ContentNewUserResponse
    } else {
      return null;
    }
  }
}

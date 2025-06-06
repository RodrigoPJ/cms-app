export interface UIState {
  isLoggedin: boolean;
  isCustomTheme?: boolean;
  isDarkTheme?: boolean;
}

export interface CmsAppInterface {
  user: string;
}

export interface Profile {
  id: string;
  user: string;
  userName: string;
  dateCreated: string;
  userType: string;
}

export interface Content {
  id?: string;
  type?: string;
  title?: string;
  body?: string;
  properties?: string; // this will be JSON stringified for maximum efficiency
  children?: Content[];
  projectId: string;
  projectItemId?: string;
}

export interface Project {
  id?: string;
  accountId?: string;
  contentType?: string;
  name?: string;
  isActive?: boolean;
  contents?: Content[];
}

export interface User {
  userAccount: Profile;
  projects: Project[];
}

export interface PersonData {
  firstName: string;
  lastName: string;
  age: number;
  password: string;
  email: string;
}

export interface SignupResponse {
  account: string;
}

export interface ENV extends ImportMetaEnv {
  VITE_Back_End_type?: string;
  VITE_SERVER_auth?: string;
  ["key"]?: string;
}

export interface Pages {
  name: string;
  url: string;
  loggedin: boolean;
}

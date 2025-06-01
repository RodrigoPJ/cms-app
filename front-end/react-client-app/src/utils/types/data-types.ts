export interface UIState {
  isLoggedin: boolean;
  isLightTheme?: boolean;
  isDarkTheme?: boolean;
}

export interface CmsAppInterface {
  user: string;
}

export interface Profile {
  id: string;
  user: string;
  userName: string;
  dateCreated: string,
	userType: string
}

export interface Project {
  id?: string;
  accountId?: string;
  contentType?: string;
  name?: string;
  isActive?: boolean;
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
  accountId: string;
}
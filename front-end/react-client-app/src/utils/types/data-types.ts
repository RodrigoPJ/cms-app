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
  dateCreated: Date,
	userType: string
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
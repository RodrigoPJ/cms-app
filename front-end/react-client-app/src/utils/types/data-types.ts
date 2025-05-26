export interface UIState {
  isLoggedin: boolean;
  isLightTheme?: boolean;
  isDarkTheme?: boolean;
}

export interface CmsAppInterface {
  user: string;
}
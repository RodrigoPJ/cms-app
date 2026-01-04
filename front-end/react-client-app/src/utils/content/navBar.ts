export const navBar = {
  brandName: "myCMS",
  mainTitle: "Content Manager",
  pages: [
    {
      name: "Home",
      url: "home",
      loggedin: false,
    },
    {
      name: "Sign up",
      url: "signup",
      loggedin: false,
    },
    {
      name: "Dashboard",
      url: "dashboard",
      loggedin: true,
    },
    {
      name: "Account",
      url: "account",
      loggedin: true,
    },
    {
      name: "Chat",
      url: "chat",
      loggedin: true
    }
  ],
  loginButton: "Log in",
  logoutButton: "Log out",
};

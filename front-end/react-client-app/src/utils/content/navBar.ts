export const navBar = {
  brandName: "myCMS",
  mainTitle: "Content Manager",
  pages: [
    {
      name: "Home",
      url: "home",
      needsAuth: false,
    },
    {
      name: "Sign UP",
      url: "signup",
      needsAuth: false,
    },
    {
      name: "Dasboard",
      url: "dashboard",
      needsAuth: true,
    },
    {
      name: "Account",
      url: "account",
      needsAuth: true,
    },
  ],
  loginButton: "Log In",
  logoutButton: "Log Out",
};

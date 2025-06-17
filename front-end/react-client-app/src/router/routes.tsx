import { Navigate, redirect, type RouteObject } from "react-router";
import { MainLayout } from "../components/MainLayout";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { DashboardLayout } from "../pages/dashboard/DashboardLayout";
import { Account } from "../pages/Acccount";
import { LogOut } from "../pages/LogOut";
import Content from "../pages/dashboard/components/Content";
import Projects from "../pages/dashboard/components/Projects";
import Settings from "../pages/dashboard/components/Settings";
import Summary from "../pages/dashboard/components/Summary";
import { SignUp } from "../pages/SignUp";
export const routes: RouteObject[] = [
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, element: <Navigate to={"home"} /> },
      { path: "home", element: <Home /> },
      { path: "login", Component: Login },
      { path: "signup", Component: SignUp },
      { path: "account", Component: Account },
      {
        path: "dashboard",
        Component: DashboardLayout,
        loader: async () => {
          const checkIfLogged = localStorage.getItem("cms-app");
          if (!checkIfLogged) return redirect("/home");
          return checkIfLogged;
        },
        children: [
          { index: true, element: <Navigate to={"summary"} /> },
          { path: "summary", Component: Summary },
          { path: "projects", Component: Projects },
          { path: "content", Component: Content },
          { path: "settings", Component: Settings },
          { path: "*", element: <Navigate to={"/"} /> },
        ],
      },
      { path: "logout", element: <LogOut /> },
    ],
  },
];

export default routes;

import {Navigate, type RouteObject } from "react-router";
import { MainLayout } from "../../pages/MainLayout";
import { Home } from "../../pages/Home";
import { Login } from "../../pages/Login";
import { DashboardLayout } from "../../pages/dashboard/DashboardLayout";
import { Account } from "../../pages/Acccount";
import { LogOut} from "../../pages/LogOut";
import Content from "../../pages/dashboard/components/Content";
import Users from "../../pages/dashboard/components/User";
import Settings from "../../pages/dashboard/components/Settings";
import Dashboard from "../../pages/dashboard/components/Dashboard";
export const routes:RouteObject[]= [
  {
    path: '/',
    Component: MainLayout,
    children: [
      {index: true, element: <Navigate to={'home'} />},
      {path: 'home', element: <Home />},
      {path: 'login', Component: Login},
      {path: 'account', Component: Account},
      {path: 'dashboard', Component: DashboardLayout, children: [
        {index: true, element: <Navigate to={'main'} />},
        {path: 'main', Component: Dashboard},
        {path: 'content', Component: Content},
        {path: 'users', Component: Users},
        {path: 'settings', Component: Settings},
        {path: '*', element: <Navigate to={'/'} />},
      ]},
      {path: 'logout', element:  <LogOut />}
    ]
}
];



export default routes
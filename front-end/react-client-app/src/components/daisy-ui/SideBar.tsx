import { NavLink } from "react-router";
import type { SideBarComponent } from "../../utils/types/components-interface";

export function SideBar ({sidebarOpen, navLinkStyle}:SideBarComponent){
  return(
    <div
        className={`bg-base-100 shadow-md p-2 transition-transform duration-300 ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col gap-4">
          <NavLink className={navLinkStyle} to="main">
            Dashboard
          </NavLink>
          <NavLink className={navLinkStyle} to="content">
            Content
          </NavLink>
          <NavLink className={navLinkStyle} to="users">
            Users
          </NavLink>
          <NavLink className={navLinkStyle} to="settings">
            Settings
          </NavLink>
        </nav>
      </div>
  )
}
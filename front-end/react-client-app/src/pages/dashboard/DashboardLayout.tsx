import { useState } from "react";
import type { NavLinkRenderProps } from "react-router";
import { NavLink, Outlet,} from "react-router";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function toggleSidebar() {
    setSidebarOpen((state) => !state);
  }

  function navLinkStyle(props: NavLinkRenderProps) {
    let style = "flex items-center gap-2 btn btn-ghost";
    if (props.isActive) {
      style += " btn-active";
    }
    return style;
  }

  return (
    <div className="flex h-screen bg-base-200">
      {/* Sidebar */}
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
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toggle Sidebar Button */}
        <div className="p-2">
          <button className="btn btn-sm" onClick={toggleSidebar}>
            {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

import { useState } from "react";
import type { NavLinkRenderProps } from "react-router";
import { Outlet } from "react-router";
import { SideBar } from "../../components/daisy-ui/SideBar";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function toggleSidebar() {
    setSidebarOpen((state) => !state);
  }

  function navLinkStyle(props: NavLinkRenderProps):string {
    let style = "flex items-center gap-2 btn btn-ghost";
    if (props.isActive) {
      style += " btn-active";
    }
    return style;
  }

  return (
    <div className="flex h-screen bg-base-200">
      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} navLinkStyle={navLinkStyle} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toggle Sidebar Button */}
        <div className="p-2">
          <button className="btn btn-sm" onClick={toggleSidebar}>
            {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </button>
        </div>
        {/* Actual view of the dashboard */}
        <Outlet />
      </div>
    </div>
  );
}

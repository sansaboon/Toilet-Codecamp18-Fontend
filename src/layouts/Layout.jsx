import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

function Layout() {
  return (
    <div className="h-screen w-screen flex">
      <div className="flex flex-col flex-1">
        <MainNav />
        <div className="flex-1 min-h-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;

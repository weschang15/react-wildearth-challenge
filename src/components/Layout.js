import React from "react";
import Topbar from "./Topbar";

function Layout({ children }) {
  return (
    <>
      <Topbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
    </>
  );
}

export default Layout;

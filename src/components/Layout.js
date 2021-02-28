import React from "react";
import Topbar from "./Topbar";

function Layout({ children }) {
  return (
    <>
      <Topbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;

import React from "react";
import { Link } from "react-router-dom";

function Topbar() {
  return (
    <nav>
      <h1>
        <Link to="/">Home</Link>
      </h1>
      <ul>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Topbar;

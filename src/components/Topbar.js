import React from "react";
import { Link } from "react-router-dom";

function Topbar() {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="flex-shrink-0 text-white">
            <Link to="/">Home</Link>
          </h1>
          <ul className="text-white">
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;

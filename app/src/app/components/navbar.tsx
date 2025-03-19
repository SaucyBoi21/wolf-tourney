"use client";

import { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);

  const toggleMobile = () => {
    setMobile(!mobile);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo"></div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/tournaments">Tournaments</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

"use client";

import Link from "next/link";
import { useState } from "react";
import "../../styles/navbar.css";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);

  const pathname = usePathname();

  const toggleMobile = () => {
    setMobile(!mobile);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/"> WolfChess </Link>
      </div>
      <ul className="navbar-links">
        <li className={pathname === "/" ? "active" : ""}>
          <Link href="/">Home</Link>
        </li>
        <li className={pathname === "/pages/tournaments" ? "active" : ""}>
          <Link href="../../pages/tournaments">Tournaments</Link>
        </li>
        <li className={pathname === "/pages/login" ? "active" : ""}>
          <Link href="../../pages/login">Login</Link>
        </li>
        <li className={pathname === "/pages/admin" ? "active" : ""}>
          <Link href="../../pages/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

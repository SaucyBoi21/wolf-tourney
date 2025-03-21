import Navbar from "./components/Navbar/navbar";
import type { ReactNode } from "react";
import "./globals.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout

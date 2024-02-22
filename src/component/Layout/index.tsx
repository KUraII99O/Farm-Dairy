// Layout.tsx
import React, { ReactNode } from "react";
import Header from "../Header";
import Footer from "../footer";
import Sidebar from "../sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="overflow-hidden flex h-screen">
      <Sidebar />
      <div className="overflow-y-auto flex flex-col w-full">
        <Header />
        {/* Main content goes here */}
        <div className="p-4">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

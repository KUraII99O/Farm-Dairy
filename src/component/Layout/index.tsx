// Layout.tsx
import React, { ReactNode } from "react";
import Header from "../Header";
import Footer from "../footer";
import Sidebar from "../sidebar";
import { EmployeeSalaryProvider } from "../EmployeeSalary/Provider";

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
        <EmployeeSalaryProvider>
          <div className="p-4">{children}</div>
        </EmployeeSalaryProvider>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

import React, { ReactNode } from "react";
import { useTranslation } from "../Translator/Provider";
import Header from "../Header";
import Footer from "../footer";
import Sidebar from "../sidebar";
import "./index.css"; // Import CSS file for layout styles

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language } = useTranslation();

  return (
    <div className={`overflow-hidden flex h-screen ${language === "ar" ? "flex-row-reverse" : ""}`}>
      <Sidebar />
      <div className={`overflow-y-auto flex flex-col w-full ${language === "ar" ? "rtl-scrollbar" : "ltr-scrollbar"}`}>
        <Header />
        {/* Main content goes here */}
        <div className="p-4">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Route and Routes from react-router-dom
import Header from "./component/Header";
import DashboardPage from "./Pages/DashboardPage";
import SettingsPage from "./Pages/SettingPage";
import Footer from "./component/footer";
import Sidebar from "./component/sidebar";
import ProfileSettingPage from "./Pages/ProfileSettingPage";






const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <div className="p-4">
            <Routes> {/* Use Routes instead of Route */}
              <Route path="/" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/Profile" element={<ProfileSettingPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;

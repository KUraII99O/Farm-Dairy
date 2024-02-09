// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Route and Routes from react-router-dom
import DashboardPage from "./Pages/DashboardPage";
import SettingsPage from "./Pages/SettingPage";
import ProfileSettingPage from "./Pages/ProfileSettingPage";
import Layout from "./component/Layout";
import AddStaff from "./Pages/AddStaff";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {" "}
          {/* Use Routes instead of Route */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/Profile" element={<ProfileSettingPage />} />
          <Route path="/AddStaff" element={<AddStaff />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import SettingPage from "./Pages/SettingPage";
import ProfileSettingPage from "./Pages/ProfileSettingPage";
import Layout from "./component/Layout";
import { StaffProvider } from "./component/Staff/Provider";
import { UserProvider } from "./component/User/Provider";
import { EmployeeProvider } from "./component/Employee/Provider";
import { MilkProvider } from "./component/Milk/Provider"; // Import MilkProvider
import EditStaffPage from "./Pages/EditStaffPage";
import StaffListPage from "./Pages/StaffListPage";
import UserListPage from "./Pages/UserListPage";
import EditUserPage from "./Pages/EditUserPage";
import EmloyeeListPage from "./Pages/EmloyeeListPage";
import EditEmployeePage from "./Pages/EditEmployeePage";
import MilkListPage from "./Pages/MilkListPage"; // Import MilkListPage

const App: React.FC = () => {
  return (
    <UserProvider>
      <StaffProvider>
        <EmployeeProvider>
          <MilkProvider>
            {" "}
            {/* Wrap with MilkProvider */}
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/settings" element={<SettingPage />} />
                  <Route path="/edit-staff/:id" element={<EditStaffPage />} />
                  <Route path="/add-staff" element={<EditStaffPage />} />
                  <Route path="/edit-user/:id" element={<EditUserPage />} />
                  <Route path="/add-user" element={<EditUserPage />} />
                  <Route path="/Profile" element={<ProfileSettingPage />} />
                  <Route path="/Staff" element={<StaffListPage />} />
                  <Route path="/User" element={<UserListPage />} />
                  <Route path="/Employee" element={<EmloyeeListPage />} />
                  <Route
                    path="/edit-employee/:id"
                    element={<EditEmployeePage />}
                  />
                  <Route
                    path="/edit-employee/"
                    element={<EditEmployeePage />}
                  />
                  <Route path="/Milk" element={<MilkListPage />} />{" "}
                  {/* Add Route for MilkListPage */}
                </Routes>
              </Layout>
            </Router>
          </MilkProvider>
        </EmployeeProvider>
      </StaffProvider>
    </UserProvider>
  );
};

export default App;

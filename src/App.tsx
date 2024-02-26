import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import SettingPage from "./Pages/SettingPage";
import ProfileSettingPage from "./Pages/ProfileSettingPage";
import Layout from "./component/Layout";
import { StaffProvider } from "./component/Staff/Provider";
import { UserProvider } from "./component/User/Provider";
import { EmployeeProvider } from "./component/Employee/Provider";
import { MilkProvider } from "./component/Milk/Provider";
import EditStaffPage from "./Pages/EditStaffPage";
import StaffListPage from "./Pages/StaffListPage";
import UserListPage from "./Pages/UserListPage";
import EditUserPage from "./Pages/EditUserPage";
import EmloyeeListPage from "./Pages/EmloyeeListPage";
import EditEmployeePage from "./Pages/EditEmployeePage";
import MilkListPage from "./Pages/MilkListPage";
import EditMilkPage from "./Pages/EditMilkPage";
import MilkSaleListPage from "./Pages/MilkSaleListPage";
import { MilkSaleProvider } from "./component/MilkSale/Provider";
import EditMilkSalePage from "./Pages/EditMilkSalePage";
import MilkSaleInvoicePage from "./Pages/MilkSaleInvoicePage";
import { CowFeedProvider } from "./component/CowFeed/Provider";
import CowFeedList from "./Pages/CowFeedList";
import EditCowFeedPage from "./Pages/EditCowFeedPage";
import LogInPage from "./Pages/LogInPage";
import SignUpPage from "./Pages/SignUpPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import PhoneVereficationPage from "./Pages/PhoneVereficationPage";
import NewPasswordPage from "./Pages/NewPasswordPage";

const App: React.FC = () => {
  return (
    <UserProvider>
      <StaffProvider>
        <EmployeeProvider>
          <MilkProvider>
            <MilkSaleProvider>
              <CowFeedProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<LogInPage />} />
                    <Route path="/Signup" element={<SignUpPage />} />
                    <Route path="/LogIn" element={<LogInPage />} />
                    <Route path="/Rest-Password" element={<ResetPasswordPage />} />
                    <Route path="/phone-verification" element={<PhoneVereficationPage />} />
                    <Route path="/new-password" element={<NewPasswordPage />} />
                    <Route
                      path="/dashboard"
                      element={
                        <RequireAuthentication>
                          <DashboardPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/cow-feed"
                      element={
                        <RequireAuthentication>
                          <CowFeedList />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/edit-cow-feed/:id"
                      element={
                        <RequireAuthentication>
                          <EditCowFeedPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/Add-cow-feed/"
                      element={
                        <RequireAuthentication>
                          <EditCowFeedPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/milk"
                      element={
                        <RequireAuthentication>
                          <MilkListPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/edit-milk/:id"
                      element={
                        <RequireAuthentication>
                          <EditMilkPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/milk-sale"
                      element={
                        <RequireAuthentication>
                          <MilkSaleListPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/edit-milk-sale/:id"
                      element={
                        <RequireAuthentication>
                          <EditMilkSalePage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/milk-sale-invoice/:id"
                      element={
                        <RequireAuthentication>
                          <MilkSaleInvoicePage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/add-milk-sale"
                      element={
                        <RequireAuthentication>
                          <EditMilkSalePage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/employee"
                      element={
                        <RequireAuthentication>
                          <EmloyeeListPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/edit-employee/:id"
                      element={
                        <RequireAuthentication>
                          <EditEmployeePage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/staff"
                      element={
                        <RequireAuthentication>
                          <StaffListPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/edit-staff/:id"
                      element={
                        <RequireAuthentication>
                          <EditStaffPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/add-staff"
                      element={
                        <RequireAuthentication>
                          <EditStaffPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/user"
                      element={
                        <RequireAuthentication>
                          <UserListPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/edit-user/:id"
                      element={
                        <RequireAuthentication>
                          <EditUserPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/add-user"
                      element={
                        <RequireAuthentication>
                          <EditUserPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <RequireAuthentication>
                          <ProfileSettingPage />
                        </RequireAuthentication>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <RequireAuthentication>
                          <SettingPage />
                        </RequireAuthentication>
                      }
                    />
                  </Routes>
                </Router>
              </CowFeedProvider>
            </MilkSaleProvider>
          </MilkProvider>
        </EmployeeProvider>
      </StaffProvider>
    </UserProvider>
  );
};

const RequireAuthentication = ({ children }) => {
  // Check if user is authenticated, if not redirect to login
  const isAuthenticated = true; // Replace with your authentication logic

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

export default App;

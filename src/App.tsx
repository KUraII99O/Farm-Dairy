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
import MilkListPage from "./Pages/MilkListPage";
import EditMilkPage from "./Pages/EditMilkPage";
import MilkSaleListPage from "./Pages/MilkSaleListPage";
import { MilkSaleProvider } from "./component/MilkSale/Provider";
import EditMilkSalePage from "./Pages/EditMilkSalePage";
import MilkSaleInvoicePage from "./Pages/MilkSaleInvoicePage";
import { CowFeedProvider } from "./component/CowFeed/Provider";
import CowFeedList from "./Pages/CowFeedList";

const App: React.FC = () => {
  return (
    <UserProvider>
      <StaffProvider>
        <EmployeeProvider>
          <MilkProvider>
            <MilkSaleProvider>
              <CowFeedProvider> {/* Wrap App component with CowFeedProvider */}
                <Router>
                  <Layout>
                    <Routes>
                      <Route path="/cow-feed" element={<CowFeedList />} /> {/* Route for CowFeedList */}
                      <Route path="/Milk" element={<MilkListPage />} />
                      <Route path="/Edit-Milk/:id" element={<EditMilkPage />} />
                      <Route path="/Collect-Milk" element={<EditMilkPage />} />
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/settings" element={<SettingPage />} />
                      <Route path="/edit-staff/:id" element={<EditStaffPage />} />
                      <Route path="/add-staff" element={<EditStaffPage />} />
                      <Route path="/edit-user/:id" element={<EditUserPage />} />
                      <Route path="/add-user" element={<EditUserPage />} />
                      <Route path="/Profile" element={<ProfileSettingPage />} />
                      <Route path="/Staff" element={<StaffListPage />} />
                      <Route path="/User" element={<UserListPage />} />
                      <Route path="/Milk-Sale" element={<MilkSaleListPage />} />
                      <Route path="/Edit-Milk-sale/:id" element={<EditMilkSalePage />} />
                      <Route path="/Milk-Sale-invoice/:id" element={<MilkSaleInvoicePage />} />
                      <Route path="/Add-milk-Sale" element={<EditMilkSalePage />} />
                      <Route path="/Employee" element={<EmloyeeListPage />} />
                      <Route
                        path="/edit-employee/:id"
                        element={<EditEmployeePage />}
                      />
                    </Routes>
                  </Layout>
                </Router>
              </CowFeedProvider>
            </MilkSaleProvider>
          </MilkProvider>
        </EmployeeProvider>
      </StaffProvider>
    </UserProvider>
  );
};

export default App;

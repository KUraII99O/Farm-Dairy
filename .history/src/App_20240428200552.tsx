import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import RoutineMonitorPage from "./Pages/RoutineMonitorPage";
import { RoutineMonitorProvider } from "./component/RoutineMonitor/Provider"; // Import RoutineMonitorProvider
import EditRoutineMonitorPage from "./Pages/EditRoutineMonitorPage";
import VaccineMonitorPage from "./Pages/VaccineMonitorPage";
import { VaccineMonitorProvider } from "./component/VaccineMonitor/Provider";
import EditVaccineMonitorPage from "./Pages/EditVaccineMonitorPage";
import ManageCowPage from "./Pages/ManageCowPage";
import { ManageCowProvider } from "./component/Cow/Provider";
import EditCowPage from "./Pages/EditCowPage";
import EditCowPregnancyPage from "./Pages/EditCowPregnancyPage";
import StallListPage from "./Pages/StallListPage";
import { ManageStallProvider } from "./component/ManageStall/Provider";
import SuppliersListPage from "./Pages/suppliersListPage";
import { SupplierProvider } from "./component/Suppliers/Provider";
import CowCalfListPage from "./Pages/CowCalfListPage";
import { ManageCowCalfProvider } from "./component/ManageCowCalf/Provider";
import EditCowCalfPage from "./Pages/EditCowCalfPage";
import CowSaleListPage from "./Pages/CowSaleListPage";
import { SaleListProvider } from "./component/CowSale/provider";
import EditCowSalePage from "./Pages/EditCowSalePage";
import { ExpenseProvider } from "./component/FarmExpense/Provider";
import FarmExpenseListPgae from "./Pages/FarmExpenseListPgae";
import PurposeListPage from "./Pages/PurposeListPage";
import { ExpensePurposeProvider } from "./component/ExpensePurpose/Provider";
import BranchListPage from "./Pages/BranchListPage";
import { ManageBranchProvider } from "./component/Branch/Provider";
import DesignationListPage from "./Pages/DesignationListPage";
import { ManageDesignationProvider } from "./component/Designation/Provider";
import ColorListPage from "./Pages/ColorListPage";
import { ManageColorProvider } from "./component/Color/Provider";
import AnimalListPage from "./Pages/AnimalTypeListPage";
import { ManageAnimalTypeProvider } from "./component/Animaltype/Provider";
import VaccineList from "./component/Vaccine/List";
import { ManageVaccineProvider } from "./component/Vaccine/Provider";
import FoodUnitListPage from "./Pages/FoodUnitListPage";
import { FoodUnitProvider } from "./component/FoodUnit/Provider";
import FoodItemListPage from "./Pages/FoodItemListPage";
import { FoodItemProvider } from "./component/FoodItem/Provider";
import MonitoringServiceListPage from "./Pages/MonitoringServiceListPage";
import { MonitoringServiceProvider } from "./component/MonitoringServices/Provider";
import UserTypeListPage from "./Pages/UserTypeListPage";
import { UserTypeProvider } from "./component/UserType/Provider";
import {  ManagePregnancyProvider } from "./component/CowPregnancy/Provider";
import CowSaleInvoicePage from "./Pages/CowSaleInvoicePage";

const App: React.FC = () => {
  return (
    <UserProvider>
      <ManageStaffProvider>
        <EmployeeProvider>
          <MilkProvider>
            <MilkSaleProvider>
              <CowFeedProvider>
                <RoutineMonitorProvider>
                  <VaccineMonitorProvider>
                    <ManageCowProvider>
                      <ManageStallProvider>
                        <SupplierProvider>
                          <ManageCowCalfProvider>
                            <SaleListProvider>
                              <ExpenseProvider>
                                <ExpensePurposeProvider>
                                  <ManageBranchProvider>
                                    <ManageDesignationProvider>
                                      <ManageColorProvider>
                                        <ManageAnimalTypeProvider>
                                          <ManageVaccineProvider>
                                            <FoodUnitProvider>
                                              <FoodItemProvider>
                                                <MonitoringServiceProvider>
                                                  <UserTypeProvider>
                                                  <ManagePregnancyProvider>
                                                      <Router>
                                                        <Routes>
                                                          <Route
                                                            path="/"
                                                            element={
                                                              <LogInPage />
                                                            }
                                                          />
                                                          <Route
                                                            path="/Signup"
                                                            element={
                                                              <SignUpPage />
                                                            }
                                                          />
                                                          <Route
                                                            path="/LogIn"
                                                            element={
                                                              <LogInPage />
                                                            }
                                                          />
                                                          <Route
                                                            path="/Rest-Password"
                                                            element={
                                                              <ResetPasswordPage />
                                                            }
                                                          />
                                                          <Route
                                                            path="/phone-verification"
                                                            element={
                                                              <PhoneVereficationPage />
                                                            }
                                                          />
                                                          <Route
                                                            path="/new-password"
                                                            element={
                                                              <NewPasswordPage />
                                                            }
                                                          />
                                                          <Route
                                                            path="/dashboard"
                                                            element={
                                                              <RequireAuthentication>
                                                                <DashboardPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Animal-Pregnancy"
                                                            element={
                                                              <RequireAuthentication>
                                                                <EditCowPregnancyPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Add-routine-monitor"
                                                            element={
                                                              <RequireAuthentication>
                                                                <EditRoutineMonitorPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/manage-cow"
                                                            element={
                                                              <RequireAuthentication>
                                                                <ManageCowPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Edit-Cow/:id"
                                                            element={
                                                              <RequireAuthentication>
                                                                <EditCowPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Add-cow"
                                                            element={
                                                              <RequireAuthentication>
                                                                <EditCowPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Edit-Routine-Monitor/:id"
                                                            element={
                                                              <RequireAuthentication>
                                                                <EditRoutineMonitorPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Routine-Monitor"
                                                            element={
                                                              <RequireAuthentication>
                                                                <RoutineMonitorPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Edit-Vaccine-Monitor/:id"
                                                            element={
                                                              <RequireAuthentication>
                                                                <EditVaccineMonitorPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Add-Vaccine-Monitor"
                                                            element={
                                                              <RequireAuthentication>
                                                                <EditVaccineMonitorPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Vaccine-Monitor"
                                                            element={
                                                              <RequireAuthentication>
                                                                <VaccineMonitorPage />
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
                                                            path="/Collect-Milk"
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
                                                          <Route
                                                            path="/manage-stall"
                                                            element={
                                                              <RequireAuthentication>
                                                                <StallListPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/suppliers"
                                                            element={
                                                              <RequireAuthentication>
                                                                <SuppliersListPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/manage-cow-calf"
                                                            element={
                                                              <RequireAuthentication>
                                                                <CowCalfListPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Edit-Calf/:id"
                                                            element={
                                                              <RequireAuthentication>
                                                                <EditCowCalfPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Add-Calf"
                                                            element={
                                                              <RequireAuthentication>
                                                                <EditCowCalfPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Cow-Sale-List"
                                                            element={
                                                              <RequireAuthentication>
                                                                <CowSaleListPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />

<Route
                                                            path="/cow-sale-invoice/:id"
                                                            element={
                                                              <RequireAuthentication>
                                                                <CowSaleInvoicePage />
                                                              </RequireAuthentication>
                                                            }
                                                          />

                                                          <Route
                                                            path="/Edit-Sale/:id"
                                                            element={
                                                              <RequireAuthentication>
                                                                <EditCowSalePage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Add-sale"
                                                            element={
                                                              <RequireAuthentication>
                                                                <EditCowSalePage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Expense-List"
                                                            element={
                                                              <RequireAuthentication>
                                                                <FarmExpenseListPgae />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Purpose-List"
                                                            element={
                                                              <RequireAuthentication>
                                                                <PurposeListPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Branch-List"
                                                            element={
                                                              <RequireAuthentication>
                                                                <BranchListPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Designation-List"
                                                            element={
                                                              <RequireAuthentication>
                                                                <DesignationListPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Color-List"
                                                            element={
                                                              <RequireAuthentication>
                                                                <ColorListPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Animal-Type"
                                                            element={
                                                              <RequireAuthentication>
                                                                <AnimalListPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Vaccine-List"
                                                            element={
                                                              <RequireAuthentication>
                                                                <VaccineList />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Food-Unit-List"
                                                            element={
                                                              <RequireAuthentication>
                                                                <FoodUnitListPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/Food-Item-List"
                                                            element={
                                                              <RequireAuthentication>
                                                                <FoodItemListPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />

                                                          <Route
                                                            path="/Monitoring-Service-List"
                                                            element={
                                                              <RequireAuthentication>
                                                                <MonitoringServiceListPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                          <Route
                                                            path="/User-Type-List"
                                                            element={
                                                              <RequireAuthentication>
                                                                <UserTypeListPage />
                                                              </RequireAuthentication>
                                                            }
                                                          />
                                                        </Routes>
                                                      </Router>
                                                  </ManagePregnancyProvider>
                                                  </UserTypeProvider>
                                                </MonitoringServiceProvider>
                                              </FoodItemProvider>
                                            </FoodUnitProvider>
                                          </ManageVaccineProvider>
                                        </ManageAnimalTypeProvider>
                                      </ManageColorProvider>
                                    </ManageDesignationProvider>
                                  </ManageBranchProvider>
                                </ExpensePurposeProvider>
                              </ExpenseProvider>
                            </SaleListProvider>
                          </ManageCowCalfProvider>
                        </SupplierProvider>
                      </ManageStallProvider>
                    </ManageCowProvider>
                  </VaccineMonitorProvider>
                </RoutineMonitorProvider>
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

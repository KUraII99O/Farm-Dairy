// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Route and Routes from react-router-dom
import DashboardPage from "./Pages/DashboardPage";
import SettingsPage from "./Pages/SettingPage";
import ProfileSettingPage from "./Pages/ProfileSettingPage";
import Layout from "./component/Layout";
import AddStaff from "./Pages/AddStaffPage";
import StaffList from "./Pages/StaffListPage";
import EmployeeSalary from "./Pages/EmployeeSalaryPage";
import EmployeeSalaryPage from "./Pages/CreateEmployeeSalary";
import CollectMilk from "./Pages/CollectMilkPage";
import MilkSale from "./Pages/MilkSalePage";
import EditMilkCollect from "./Pages/EditMilkCollection";
import UserList from "./Pages/UserListPage";
import EditUser from "./Pages/EditUserList";

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
          <Route path="/StaffList" element={<StaffList />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/EmployeeSalary" element={<EmployeeSalary />} />
          <Route path="/salary/create" element={<EmployeeSalaryPage />} />
          <Route path="/salary/:id/edit/" element={<EmployeeSalaryPage />} />
          <Route path="/user/:id/edit/" element={<EditUser />} />
          <Route path="/CollectMilk" element={<CollectMilk />} />
          <Route path="/MilkSale" element={<MilkSale />} />
          <Route path="/EditMilkCollection" element={<EditMilkCollect />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

import React from "react";
import RequireAuth from "../Components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import EmployManagement from "../Pages/AdminViews/EmployManagement";
import RegisterdHrms from "../Pages/CompanyRegisterd/Registerd_Hrms";
import ProfileView from "../Pages/AdminViews/ProfileView";
// dasboard wrapper
import Superadmin from "../Pages/SuperAdmin";
import Congratulation from "../Pages/CompanyRegisterd/Congrat";
import EmployLogin from "../Pages/Login/EmployLogin";
import LandingPage from "../Pages/LandingPage";
import AddUser from "../Pages/AdminViews/AddUser";
// import { useSelector } from 'react-redux';
import Attends from '../Pages/Attends'
import Layout from "../Components/Layout";
// import AdminRequest from "../Pages/AdminViews/Request";
// import Adminoverview from "../Pages/AdminViews/AdminOverViews";
// import Adminpersmision from "../Pages/AdminViews/Permissions";
import AdminProfile from "../Pages/AdminViews/Profileinfo";
import Adminsetting from "../Pages/AdminViews/Settings";
import Employsetting from "../Pages/EmployeeViews/Settings";
import OverviewPage from "../Pages/Overview";
import ProfileInfo from "../Pages/ProfileInfo";
import HrempAttends from "../Pages/HrAttends/index";
import MyRequest from "../Pages/Request";
import AdminOverview from "../Pages/AdminViews/AdminOverViews";
import ForgetPassword from "../Components/forgetPasswordScreen";
import ResetPassword from "../Components/ResetPasswordPage";

const ROLES = {
  ADMIN: 'Admin,CTO ,HR, CEO, HOD',
  EMPLOYEE: 'Employee ,CTO ,HR ,Team Lead, CEO, HOD'}
const AppRouter = () => {

  // const loginInfo = useSelector((state) => state?.user?.isLogin);

  return (
    <div>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="registration" element={<RegisterdHrms />}></Route>
        <Route path="superadmin" element={<Superadmin />}></Route>
        <Route path="congratulation" element={<Congratulation />}></Route>
        <Route path={`employlogin`} element={<EmployLogin />}></Route>
        <Route path={`employlogin/:id`} element={<EmployLogin />}></Route>
        <Route path='forgetpassword' element={<ForgetPassword />}></Route>
        <Route path={`resetpassword/:id`} element={<ResetPassword />}></Route>

        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth Role={ROLES.ADMIN} />}>
            <Route path='addEmploy' element={<AddUser />}></Route>
            <Route path='admin-overview' element={<AdminOverview />}></Route>
            <Route path='admin-profile' element={<AdminProfile />}></Route>
            <Route path='admin-setting' element={<Adminsetting />}></Route>
            <Route path='management' element={<EmployManagement />}></Route>
            <Route path='profile' element={<ProfileView />}></Route>
            <Route path='emp-attendance' element={<HrempAttends />}></Route>
          </Route>
          <Route element={<RequireAuth Role={ROLES.EMPLOYEE} />}>
            <Route path='overview' element={<OverviewPage />}></Route>
            <Route path="attendance" element={<Attends />}></Route>
            <Route path='request' element={<MyRequest />}></Route>
            <Route path='emp-settings' element={<Employsetting />}></Route>
            <Route path='user-profile' element={<ProfileInfo />}></Route>
            <Route path='emp-attendance' element={<HrempAttends />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;

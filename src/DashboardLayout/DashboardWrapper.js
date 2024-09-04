import React from 'react'
import Dashboard from './index'
import { useLocation,Navigate,Outlet } from "react-router-dom";

export default function DashboardWrapper({children}) {
  return <Dashboard children={children}>
    <Outlet/>
  </Dashboard>
}


import { Outlet } from "react-router-dom"
import DashboardWrapper from "../DashboardLayout/DashboardWrapper"

const Layout = () => {
    return (
        <main className="App">
            <DashboardWrapper>
            <Outlet />
            </DashboardWrapper>
        </main>
    )
}

export default Layout

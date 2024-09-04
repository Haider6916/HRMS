import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const RequireAuth = ({Role}) => {
    
    const { auth } = useAuth();
    const location = useLocation();
    const res =JSON.parse(localStorage.getItem("AuthObj"))
    let AuthRole = res?.role

    return (
        Role.includes(AuthRole)
            ?
            <Outlet />
            :
            auth?.user ?
                alert('unauthorized') :
                <Navigate to='/employlogin' state={{ from: location.pathname }} replace />
    );
}
export default RequireAuth;

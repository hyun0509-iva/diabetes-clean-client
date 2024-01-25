import { Navigate, Outlet } from "react-router-dom";
import userState from "store/userState";
export const PrivateRoutes = () => {
  const { isAuth } = userState();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

import { Navigate, Outlet } from "react-router-dom";
import userState from "store/userState";
export const LoggedInRoutes = () => {
  const { isAuth } = userState();
  console.log({ isAuth });
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default LoggedInRoutes;

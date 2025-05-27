import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks";

const RequireAuth = ({ allowedRoles }) => {
  const { roles } = useAuth();
  let content = null;

  if (roles.some((role) => allowedRoles.includes(role))) {
    return (content = <Outlet />);
  } else {
    return (content = (
      <Navigate
        to={"/unauthorized"}
        state={{
          message: "You are not authorized to view this page",
        }}
        replace
      />
    ));
  }
};

export default RequireAuth;

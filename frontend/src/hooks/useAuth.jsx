import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const { token } = useSelector((state) => state.auth);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";
  let username = "";
  let roles = [];

  if (token && typeof token === "string") {
    const decode = jwtDecode(token);
    const { username: decodedUsername, roles: decodedRoles } = decode.userInfo;

    username = decodedUsername;
    roles = decodedRoles;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";
  }

  return { username, roles, status, isManager, isAdmin };
};

export default useAuth;

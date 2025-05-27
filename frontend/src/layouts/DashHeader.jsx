import React from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logOutAuth } from "../redux/fetures/authSlice";
import { LuLogOut } from "../assets/icons";
import { useLocalStorage } from "../hooks";
import Navigation from "./Navigation";

const DashHeader = () => {
  return (
    <header className="py-4 px-4 w-full flex items-center justify-between border-b border-white">
      <NavLink
        to="/dash"
        className={({ isActive }) =>
          `${isActive ? `text-blue-400` : `text-white`} text-3xl`
        }
      >
        TechNotes
      </NavLink>

      <nav className="flex items-center gap-4">
        <Navigation />
        <LogOut />
      </nav>
    </header>
  );
};

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [_, setPersist] = useLocalStorage("persist", false);

  const onLogOut = async () => {
    await toast.promise(dispatch(logOutAuth()), {
      pending: "Logout...",
      success: "Logout success",
      error: "Logout failed",
    });
    setPersist(false);
    navigate("/");
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <button
      onClick={onLogOut}
      className="text-xl cursor-pointer"
      data-tooltip-id="my-tooltip"
      data-tooltip-content="Logout"
      data-tooltip-variant="info"
    >
      <LuLogOut />
    </button>
  );
};

export default DashHeader;

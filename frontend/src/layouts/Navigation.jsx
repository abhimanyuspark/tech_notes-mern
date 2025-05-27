import React from "react";
import { useAuth } from "../hooks";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router";
import {
  FaNoteSticky,
  FaNotesMedical,
  FaUserPlus,
  FaUsers,
} from "../assets/icons";

const Navigation = () => {
  const { isAdmin, isManager } = useAuth();
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();

  const isDashPage = /^\/dash(\/)?$/.test(location.pathname);
  const isOnNotesPage = /^\/dash\/notes(\/)?$/.test(location.pathname);
  const isOnUsersPage = /^\/dash\/users(\/)?$/.test(location.pathname);

  const onClassActive = ({ isActive }) => {
    return `${
      isActive ? "text-blue-400 text-2xl" : "text-white text-xl"
    } cursor-pointer hover:scale-125`;
  };

  let note;
  if (!isOnNotesPage && !isDashPage) {
    note = (
      <li className="">
        <NavLink
          to="/dash/notes"
          className={onClassActive}
          data-tooltip-id="my-tooltip"
          data-tooltip-content={"Notes"}
          data-tooltip-variant="light"
        >
          <FaNoteSticky className="inline-block" />
        </NavLink>
      </li>
    );
  }

  let noteAdd;
  if (isOnNotesPage) {
    noteAdd = (
      <li className="">
        <NavLink
          to="/dash/notes/new"
          className={onClassActive}
          data-tooltip-id="my-tooltip"
          data-tooltip-content={"Add Note"}
          data-tooltip-variant="light"
        >
          <FaNotesMedical className="inline-block" />
        </NavLink>
      </li>
    );
  }

  let user;
  if ((isManager || isAdmin) && !isOnUsersPage && !isDashPage) {
    user = (
      <li className="">
        <NavLink
          to="/dash/users"
          className={onClassActive}
          data-tooltip-id="my-tooltip"
          data-tooltip-content={"Users"}
          data-tooltip-variant="light"
        >
          <FaUsers className="inline-block" />
        </NavLink>
      </li>
    );
  }

  let userAdd;
  if ((isManager || isAdmin) && isOnUsersPage) {
    userAdd = (
      <li className="">
        <NavLink
          to="/dash/users/new"
          className={onClassActive}
          data-tooltip-id="my-tooltip"
          data-tooltip-content={"Add User"}
          data-tooltip-variant="light"
        >
          <FaUserPlus className="inline-block" />
        </NavLink>
      </li>
    );
  }

  let content = null;
  if (loading) {
    content = <div>Loading...</div>;
  } else {
    content = (
      <ul className="flex items-center gap-4">
        {note}
        {noteAdd}
        {user}
        {userAdd}
      </ul>
    );
  }

  return content;
};

export default Navigation;

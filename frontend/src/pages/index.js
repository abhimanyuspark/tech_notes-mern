import { lazy } from "react";

const Home = lazy(() => import("./__root/Home"));
const Login = lazy(() => import("./__auth/Login"));
const NotFound = lazy(() => import("./__auth/NotFound"));
const UnAuthorized = lazy(() => import("./__auth/UnAuthorized"));

const Welcome = lazy(() => import("./__root/Welcome"));

const UsersList = lazy(() => import("./__root/users/UsersList"));
const NotesList = lazy(() => import("./__root/notes/NotesList"));
const UserForm = lazy(() => import("./__root/users/UserForm"));
const NoteForm = lazy(() => import("./__root/notes/NoteForm"));

export {
  Home,
  Login,
  NotFound,
  UnAuthorized,
  Welcome,
  UsersList,
  NotesList,
  UserForm,
  NoteForm,
};

import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { refreshAuth } from "../redux/fetures/authSlice";
import { Button, Loader } from "../components";

const Persist = () => {
  const dispatch = useDispatch();
  const [persist] = useLocalStorage("persist");
  const { token, error, loading } = useSelector((state) => state.auth);

  const [trueSuccess, setTrueSuccess] = useState(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        //const response =
        await dispatch(refreshAuth());
        //const { accessToken } = response.data
        setTrueSuccess(true);
        console.log("[persist] verifying refresh token.");
      } catch (err) {
        console.error(err);
      }
    };

    if (!token && persist) {
      verifyRefreshToken();
    }
  }, [dispatch, token, persist]);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <Login />;
  } else if (token && trueSuccess) {
    content = <Outlet />;
  } else if (token && persist) {
    content = <Outlet />;
  }

  return content;
};

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen">
      <h1 className="text-2xl font-bold">Please login to continue</h1>
      <Button
        text="Login"
        onClick={() => {
          navigate("/login");
        }}
      />
    </div>
  );
};
export default Persist;

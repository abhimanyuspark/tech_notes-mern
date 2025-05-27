import React, { useState } from "react";
import { toast } from "react-toastify";
import { validation } from "../../utils/validation";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, CheckBox, Input, Loader } from "../../components";
import { loginAuth } from "../../redux/fetures/authSlice";
import { useLocalStorage } from "../../hooks";
import { loginToast } from "../../config/toastParams";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    username: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [persist, setPersist] = useLocalStorage("persist", false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "active" ? value === "true" : value,
    });
    setFormError({
      ...formError,
      [name]: "",
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const validate = validation(formData);
    const isValid = Object.values(validate).length === 0;

    if (isValid) {
      try {
        await toast.promise(
          dispatch(loginAuth(formData)).then((res) => {
            const data = res?.payload;
            if (res.error) {
              throw new Error(data);
            }
            navigate("/dash", { replace: true });
            setFormData({ ...formData, username: "", password: "" });
          }),
          loginToast
        );
      } catch (error) {
        if (!error.status) {
          setFormError({ ...formError, username: "No server response" });
        } else if (error.status === 401) {
          setFormError({ ...formError, username: "unauthorized" });
        } else {
          setFormError({ ...formError, username: error?.data?.message });
        }
      }
    } else {
      setFormError(validate);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 p-8 sm:p-0 w-full sm:w-100">
        {loading ? <Loader /> : ""}

        <h2 className="text-3xl text-center p-4">Login</h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <Input
            important
            label="Username"
            name="username"
            value={formData.username}
            error={formError.username}
            onChange={onChange}
          />

          <Input
            important
            label="Password"
            name="password"
            type={show ? "text" : "password"}
            show={show}
            setShow={() => {
              setShow(!show);
            }}
            value={formData.password}
            error={formError.password}
            onChange={onChange}
          />

          <CheckBox
            label="Remember Me"
            name="persist"
            className="py-2"
            checked={persist}
            onChange={() => {
              setPersist(!persist);
            }}
          />

          <Button text="Submit" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;

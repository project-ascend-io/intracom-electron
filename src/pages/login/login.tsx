import React, { useState } from "react";
import Input from "../../components/input/input";
import { Link , useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormType, loginSchema } from "../../types/login";
import { loginUser } from "../../services/auth";
import { useAuth } from "../../context/auth-context";
import "./login.css";

const Login = () => {
  const [authError, setAuthError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    setAuthError("");
    const userData = await loginUser(data);

    if (userData.success) {
      setUser(userData.responseObject);
      reset();
      navigate("/");
    } else {
      setAuthError(userData.message);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });
  return (
    <section className="page-container">
      <h1 className="title">Login</h1>
      {authError && <p className="error">{authError}</p>}
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          errors={errors}
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          register={register}
          errors={errors}
          helperText="Password must be at least 8 characters long and include one uppercase letter and one number"
        />
        <Link className="link" to="">
          Forgot Password?
        </Link>
        <button className="form-button">Login</button>
      </form>
    </section>
  );
};

export default Login;

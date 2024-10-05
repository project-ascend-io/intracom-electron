import React, { useState } from "react";
import Input from "../../Components/input/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormType, loginSchema } from "../../types/login";
import { loginUser } from "../../services/auth";
import { useAuth } from "../../context/auth-context";
import "./login.css";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    setAuthError("");
    setIsLoading(true);
    const userData = await loginUser(data);

    if (userData.success) {
      setUser(userData.responseObject);
      reset();
      setIsLoading(false);
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
    <section className="grid h-[55vh] place-items-center pt-16">
      <div className="min-w-96">
        <h1 className="text-xl text-center font-bold">Login</h1>
        {authError && <p className="error">{authError}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
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
          />
          <Link className="link block my-4" to="">
            Forgot Password?
          </Link>
          <button className="form-button block w-full">
            {isLoading && <BeatLoader color="white" size={8} />}Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;

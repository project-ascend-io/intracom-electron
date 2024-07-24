import React from "react";
import Input from "../../components/input/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { LoginFormType, loginSchema } from "../../types/login";
import { loginUser } from "../../services/auth";
import { useAuth } from "../../context/auth-context";

const Login = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    console.log(data);
    //TODO: Validate result from backend
    // const userData = await loginUser(data);
    setUser({ email: "test@gmail.com", password: "helloWordl12!" });
    reset();
    navigate("/");
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
    <section>
      {/* TODO: Remove later */}
      <h1>Login {user ? `${user.email}` : `no user`}</h1>
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
        <button>Login</button>
      </form>
    </section>
  );
};

export default Login;

import React from "react";
import Input from "../../components/input/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Login = () => {
  const loginSchema = z.object({
    email: z
      .string({ required_error: "Please enter a email address" })
      .email("Invalid email address"),
    password: z
      .string({ required_error: "Please enter a password" })
      .min(8, { message: "Password must be at least 8 characters" })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value) => /[^a-zA-Z0-9]/.test(value), {
        message:
          "Password must contain at least one non-alphanumeric character",
      }),
  });

  //convert zod schema into typescript type
  type LoginFormType = z.infer<typeof loginSchema>;

  const onSubmit: SubmitHandler<LoginFormType> = (data: any) => {
    //TODO: add fetch function
    console.log(data);
    reset();
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
      <h1>Login</h1>
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
        <button onClick={handleSubmit(onSubmit)}>Login</button>
      </form>
    </section>
  );
};

export default Login;

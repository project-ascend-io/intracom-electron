import React, { useState } from "react";
import "./Sign-up.css";

const CreateAccount = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password") {
      const passwordValidation =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordValidation.test(value)) {
        setPasswordError(
          "Password must be minimum eight characters, at least one letter, one number and one special character"
        );
        return;
      } else {
        setPasswordError(null);
      }
    }
    if (name === "email") {
      const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValidation.test(value)) {
        setEmailError("Please enter a valid email address");
        return;
      } else if (value.length < 6) {
        setEmailError("Email should be at least 6 characters long");
        return;
      } else {
        setEmailError(null);
      }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (passwordError) {
      alert(passwordError);
      return;
    }
    console.log("Form submitted", form);
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-header">
        <h1>Create an Intracom account</h1>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          {emailError && <p>{emailError}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Create a password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {passwordError && <p>{passwordError}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm your password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group terms">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={form.termsAccepted}
            onChange={handleChange}
            required
          />
          <label htmlFor="termsAccepted">
            I agree to the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </label>
        </div>

        <button type="submit" className="signup-btn">
          Create account
        </button>

        <p className="terms-info">
          By clicking 'Create account', you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          You may receive email communications from us and can opt out at any
          time.
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;

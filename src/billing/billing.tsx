import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, redirect } from "react-router-dom";
import Input from "./components/input";
import Dropdown from "./components/dropdown";
import { BillingForm } from "./types";
import "./billing.css";

export function Billing() {
  const [form, setForm] = useState<BillingForm>({
    "street address": { value: "", error: false },
    city: { value: "", error: false },
    state: { value: "", error: false },
    "postal code": { value: "", error: false },
    country: { value: "", error: false },
  });

  const mutation = useMutation({
    mutationFn: (newPost: any) =>
      fetch("", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newPost),
      }).then((res) => res.json()),
  });
  const checkErrors = (clear: boolean = false) =>
    Object.keys(form).forEach((key) =>
      setForm((prev) => {
        const err = clear
          ? false
          : prev[key].value.trim().length
          ? false
          : true;
        return {
          ...prev,
          [key]: { value: prev[key].value, error: err },
        };
      })
    );
  const submitForm = () => {
    //clear out previous
    checkErrors(true);

    //check if form is filled
    const formFilled = Object.keys(form).every((field) =>
      form[field].value.trim()
    );
    if (formFilled) {
      //send data
      mutation.mutate({
        streetAddress: form["street address"].value,
        city: form.city.value,
        state: form.state.value,
        postalCode: form["postal code"].value,
        country: form.country.value,
      });

      if (mutation.isSuccess) return redirect("/billing-success");
    } else {
      // display errors for empty forms
      checkErrors();
    }
  };
  return (
    <section className="window">
      <header>
        <Link className="nav-link logo-group" to="/">
          <img src="" alt="" />
          <h1>Acme Co</h1>
        </Link>
        <nav>
          <ul>
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/">
              Projects
            </Link>
            <Link className="nav-link" to="/">
              Messages
            </Link>
            <Link className="nav-link" to="/">
              Notifications
            </Link>
            <Link className="nav-link" to="/">
              <img src="" alt="" />
            </Link>
          </ul>
        </nav>
      </header>
      <section className="screen">
        <h2>Billing</h2>
        <h3>Billing Address</h3>
        {mutation.isError && (
          <p className="error-message">
            {" "}
            Something went wrong: {mutation.error.message}
          </p>
        )}
        <div className="input-container">
          <Input
            name={"street address"}
            fields={form}
            setFields={setForm}
            placeholder="Enter street address"
          />
          <Input
            name={"city"}
            fields={form}
            setFields={setForm}
            placeholder="Enter city"
          />
          <Dropdown
            name="state"
            options={["New York", "Massachusetts", "Connecticut", "Maryland"]}
            fields={form}
            setFields={setForm}
            placeholder="Choose a state"
          />
          <Input
            name={"postal code"}
            fields={form}
            setFields={setForm}
            placeholder="Enter postal code"
          />
          <Dropdown
            name="country"
            options={["United States"]}
            fields={form}
            setFields={setForm}
            placeholder="Choose a country"
          />
          <button className="align-end" onClick={submitForm}>
            Save
          </button>
        </div>
      </section>
    </section>
  );
}

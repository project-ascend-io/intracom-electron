import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "./components/input";
import Dropdown from "./components/dropdown";
import { BillingForm } from "./types";

export function Billing() {
  const [form, setForm] = useState<BillingForm>({
    "street address": { value: "", error: false },
    city: { value: "", error: false },
    state: { value: "", error: false },
    "postal code": { value: "", error: false },
    country: { value: "", error: false },
  });

  const displayErrors = (clear: boolean = false) =>
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
    const formFilled = Object.keys(form).every((field) =>
      form[field].value.trim()
    );
    if (formFilled) {
      //send Data
    } else {
      // display errors for empty forms
      displayErrors();
    }
  };
  return (
    <section>
      <header>
        <Link to="/">
          <img src="" alt="" />
          <h1>ACME</h1>
        </Link>
        <nav>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/">Projects</Link>
            <Link to="/">Messages</Link>
            <Link to="/">Notifications</Link>
            <Link to="/">
              <img src="" alt="" />
            </Link>
          </ul>
        </nav>
      </header>
      <section>
        <h2>Billing</h2>
        <h3>Billing Address</h3>
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
        <button onClick={submitForm}>Save</button>
      </section>
    </section>
  );
}

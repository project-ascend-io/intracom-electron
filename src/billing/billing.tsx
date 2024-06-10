import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "./components/input";
import Dropdown from "./components/dropdown";

export function Billing() {
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
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
          text={streetAddress}
          setText={setStreetAddress}
        />
        <Input name={"city"} text={city} setText={setCity} />
        <Dropdown
          name="state"
          options={["New York", "Massachusetts", "Connecticut", "Maryland"]}
          selected={state}
          setSelected={setState}
        />
        <Input name={"postal code"} text={postal} setText={setPostal} />
        <Dropdown
          name="country"
          options={["United States"]}
          selected={country}
          setSelected={setCountry}
        />
        <button>Save</button>
      </section>
    </section>
  );
}

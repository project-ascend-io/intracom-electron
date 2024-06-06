import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "./components/input";

export function Billing() {
  return (
    <div>
      <Link to="/">Back To Home</Link>
      <Input name={"name"} />
    </div>
  );
}

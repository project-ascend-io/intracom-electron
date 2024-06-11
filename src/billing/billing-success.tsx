import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./billing.css";

export function BillingSuccess() {
  return (
    <section className="window">
      <div className="screen success-screen">
        <h2>Address Saved</h2>
        <p>Your billing address has been saved.</p>
        <Link to={"/billing"} className="success-btn">
          <button>Done</button>
        </Link>
      </div>
    </section>
  );
}

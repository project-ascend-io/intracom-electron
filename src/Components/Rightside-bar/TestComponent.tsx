import React, { useState } from "react";

const TestComponent: React.FC = () => {
  const api_url = process.env.REACT_APP_API_URL || "http://localhost:8080";
  const [responseMessage, setResponseMessage] = useState("");

  const testApi = async () => {
    try {
      const response = await fetch(`${api_url}/email-settings/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          server: "smtp.example.com",
          port: 587,
          username: "user@example.com",
          password: "securepassword",
          securityType: "TLS",
          email: "test@example.com",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponseMessage(data.message || "Success");
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  return (
    <div>
      <button onClick={testApi}>Test API</button>
      <p>Response: {responseMessage}</p>
    </div>
  );
};

export default TestComponent;

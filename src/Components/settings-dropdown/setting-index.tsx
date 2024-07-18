// import React, { useState } from "react";
// import "./settings.css";

// const SettingIndex: React.FC = () => {
//   const handleEdit = () => {
//     // Add logic to Edit the configuration
//     console.log("Saving configuration...");
//   };

//   return (
//     <div className="container">
//       <h2>Organization Settings</h2>
//       <div className="section">
//         {" "}
//         <p>View Your current Settings</p>
//         <h3>General</h3>
//         <div className="organization-name fetched">
//           <p>Organization Name:</p>
//           <p>
//             <strong>ACME</strong>
//           </p>
//         </div>
//         <div className="user-info fetched">
//           <p>Admin: </p>
//           <p>
//             <strong>admin@acme.com</strong>
//           </p>
//         </div>
//       </div>

//       <div className="section">
//         {" "}
//         <div className="actionButtons">
//           <button onClick={handleEdit}>Edit</button>
//         </div>
//         <h3>Email Settings</h3>
//         <div className="formGroup">
//           <div className="fetched">Server:smtp.acme.com</div>
//           <div className="fetched">Port:465</div>
//           <div className="fetched">Username:admin</div>
//           <div className="fetched">Password:........</div>
//           <div className="fetched">Security Type:TLS</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingIndex;

import React from "react";
import "./settings.css";

const SettingsIndex: React.FC = () => {
  const handleEdit = () => {
    // Add logic to edit the configuration
    console.log("Editing configuration...");
  };

  return (
    <div className="container">
      <h2 className="heading">Organization Settings</h2>
      <p className="subHeading">View your current settings.</p>
      <div className="section">
        <h3>General</h3>
        <div className="infoRow">
          <span className="label">Organization Name:</span>
          <span className="value">Acme</span>
        </div>
        <div className="infoRow">
          <span className="label">Admin:</span>
          <span className="value">admin@acme.com</span>
        </div>
      </div>

      <div className="section">
        {/* <button className="editButton" onClick={handleEdit}>
          Edit
        </button> */}
        <div className="actionButtons">
          <button onClick={handleEdit}>Edit</button>
        </div>
        <h3>Email Settings</h3>
        <div className="emailSettings">
          <div className="infoRow">
            <span className="label">Server:</span>
            <span className="value">smtp.acme.com</span>
          </div>
          <div className="infoRow">
            <span className="label">Port:</span>
            <span className="value">465</span>
          </div>
          <div className="infoRow">
            <span className="label">Username:</span>
            <span className="value">admin</span>
          </div>
          <div className="infoRow">
            <span className="label">Password:</span>
            <span className="value">********</span>
          </div>
          <div className="infoRow">
            <span className="label">Security Type:</span>
            <span className="value">SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsIndex;

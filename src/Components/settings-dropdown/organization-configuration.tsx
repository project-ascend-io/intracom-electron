import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";

const OrganiziationConfig = () => {
  const { user } = useAuth();
  const organizationId = user.organization._id;
  const [organizationName, setOrganizationName] = useState<string>("");
  useEffect(() => {
    console.log(user);
    setOrganizationName(user.organization.name);
  }, [organizationId]);
  return (
    <div className="flex-grow mx-auto align-middle text-left p-4 pr-8">
      <h2 className="text-2xl font-bold mb-2.5">Organization Settings</h2>
      <p className="text-gray-600 text-sm">View your current settings.</p>
      <div className="flex flex-col mt-5">
        <h3 className="text-lg font-semibold">General</h3>
        <div className="flex flex-col gap-2.5 border-b py-2.5 border-gray-300 text-base">
          <span className="text-[#96ACC1]">Organization Name:</span>
          <span className="text-gray-700">{organizationName}</span>
        </div>
      </div>
    </div>
  );
};

export default OrganiziationConfig;

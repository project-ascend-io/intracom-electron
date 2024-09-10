// import { useState, useEffect } from "react";
// import { getOrganizationSettings } from "../../services/email-settings-service"; // Assuming this service exists
// import { EmailSettingsFormValues } from "../../types/email-configuration";

// export const useOrganizationSettings = (organizationId: string) => {
//   const [settings, setSettings] = useState<EmailSettingsFormValues | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const data = await getOrganizationSettings(organizationId);
//         setSettings(data);
//       } catch (error: any) {
//         setError(error.message || "An error occurred while fetching settings.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSettings();
//   }, [organizationId]);

//   return { settings, isLoading, error };
// };

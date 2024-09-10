import { useState, useEffect } from "react";
import { getEmailSettings } from "../../services/email-settings-service";

export const useEmailSettings = (organizationId: string) => {
  const [emailSettings, setEmailSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmailSettings = async () => {
      try {
        const response = await getEmailSettings(organizationId);
        console.log(response);
        if (response.success) {
          setEmailSettings(response.responseObject); // Extract the email settings
        } else {
          setError(response.message || "Failed to fetch email settings");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch email settings");
      } finally {
        setLoading(false);
      }
    };

    fetchEmailSettings();
  }, [organizationId]);

  return { emailSettings, loading, error };
};

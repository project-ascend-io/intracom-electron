import { useState, useEffect } from "react";
import { getEmailSettings } from "../../services/email-settings-service";

export const useEmailSettings = (organizationId: string) => {
  const [emailSettings, setEmailSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmailSettings = async () => {
      try {
        const data = await getEmailSettings(organizationId);
        setEmailSettings(data.responseObject || {});
      } catch (error: any) {
        console.error("getEmailSettings error:", error);
        setEmailSettings({});
        setError(null); // Do not set an error message
      } finally {
        setLoading(false);
      }
    };

    fetchEmailSettings();
  }, [organizationId]);

  return { emailSettings, loading, error };
};

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getEmailSettings } from "../services/email-settings-service";

interface EmailSettingsContextProps {
  emailSettings: any;
  loading: boolean;
  error: string | null;
  shouldFetchEmailSettings: boolean;
  setShouldFetchEmailSettings: (value: boolean) => void;
}

const EmailSettingsContext = createContext<
  EmailSettingsContextProps | undefined
>(undefined);

export const EmailSettingsProvider: React.FC<{
  children: ReactNode;
  organizationId: string;
}> = ({ children, organizationId }) => {
  const [emailSettings, setEmailSettings] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldFetchEmailSettings, setShouldFetchEmailSettings] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchEmailSettings = async () => {
      try {
        const data = await getEmailSettings(organizationId);
        if (data) {
          setEmailSettings(data);
          setShouldFetchEmailSettings(true);
        } else {
          setShouldFetchEmailSettings(false);
        }
      } catch (error: any) {
        setError(error.message);
        setShouldFetchEmailSettings(false);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailSettings();
  }, [organizationId]);

  return (
    <EmailSettingsContext.Provider
      value={{
        emailSettings,
        loading,
        error,
        shouldFetchEmailSettings,
        setShouldFetchEmailSettings,
      }}
    >
      {children}
    </EmailSettingsContext.Provider>
  );
};

export const useEmailSettingsContext = (): EmailSettingsContextProps => {
  const context = useContext(EmailSettingsContext);
  if (!context) {
    throw new Error(
      "useEmailSettingsContext must be used within an EmailSettingsProvider",
    );
  }
  return context;
};

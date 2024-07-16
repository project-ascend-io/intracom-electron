const BASE_URL = "http://localhost:8080/email-settings";

// // Get the email settings for the given organization.
//  interface EmailSettings {
//   _id: string;
//   server: string;
//   port: number;
//   username: string;
//   password: string;
//   securityType: string;
//   organization: string;
// }

// export const getEmailSettings = async (
//   organizationId: string
// ): Promise<EmailSettings> => {
//   try {
//     const response = await fetch(`${BASE_URL}/${organizationId}`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!response.ok) {
//       const errorBody = await response.text();
//       throw new Error(`Failed to get email settings: ${response.status} ${errorBody}`);
//     }

//     const data: EmailSettings = await response.json();
//     return data;
//   } catch (error) {
//     console.error("getEmailSettings error:", error);
//     throw error;
//   }
// };

/**
 * Get the email settings for the given organization.
 * @param {string} organizationId - The ID of the organization to get email settings for.
 * @returns {Promise<any>} The response from the server.
 */
export const getEmailSettings = async (
  organizationId: string
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${organizationId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Failed to get email settings: ${response.status} ${errorBody}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getEmailSettings error:", error);
    throw error;
  }
};

/**
 * Send a test email using the provided email settings.
 * @param {string} server - The email server.
 * @param {number} port - The email server port.
 * @param {string} username - The email server username.
 * @param {string} password - The email server password.
 * @param {string} securityType - The email server security type.
 * @param {string} email - The email address to send the test email to.
 * @returns {Promise<any>} The response from the server.
 */
export const testEmailSettings = async (
  server: string,
  port: number,
  username: string,
  password: string,
  securityType: string,
  email: string
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        server,
        port,
        username,
        password,
        securityType,
        email,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send test email");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("sendTestEmail error:", error);
    throw error;
  }
};

/**
 * Save the email settings for the given organization.
 * @param {string} server - The email server.
 * @param {number} port - The email server port.
 * @param {string} username - The email server username.
 * @param {string} password - The email server password.
 * @param {string} securityType - The email server security type.
 * @param {string} organizationId - The ID of the organization to save email settings for.
 * @param {string} organization - The name of the organization.
 * @returns {Promise<any>} The response from the server.
 */
export const saveEmailSettings = async (
  server: string,
  port: number,
  username: string,
  password: string,
  securityType: string,
  organizationId: string,
  organization: string
): Promise<any> => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        server,
        port,
        username,
        password,
        securityType,
        organizationId,
        organization,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save email settings");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("saveEmailSettings error:", error);
    throw error;
  }
};
//updateEmailSettings
/**
 * Update the email settings for the given organization.
 * @param {string} server - The email server.
 * @param {number} port - The email server port.
 * @param {string} username - The email server username.
 * @param {string} password - The email server password.
 * @param {string} securityType - The email server security type.
 * @param {string} organizationId - The ID of the organization to update email settings for.
 * @param {string} organization - The name of the organization.
 * @returns {Promise<any>} The response from the server.
 */
export const updateEmailSettings = async (
  server: string,
  port: number,
  username: string,
  password: string,
  securityType: string,
  organizationId: string,
  organization: string
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${organizationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        server,
        port,
        username,
        password,
        securityType,
        organizationId,
        organization,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update email settings");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("updateEmailSettings error:", error);
    throw error;
  }
};

/**
 * Validate the email settings.
 * @param {string} server - The email server.
 * @param {number} port - The email server port.
 * @param {string} username - The email server username.
 * @param {string} password - The email server password.
 * @param {string} securityType - The email server security type.
 * @returns {boolean} True if the email settings are valid, false otherwise.
 */
export const validateEmailSettings = (
  server: string,
  port: number,
  username: string,
  password: string,
  securityType: string
): boolean => {
  if (!server || !port || !username || !password || !securityType) {
    return false;
  }
  return true;
};

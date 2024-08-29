const Base_URL = process.env.API_URL;
// we are using the URL directly for now, but we have to configure the BASE_URL variable to make it more dynamic using the environment variables.
//@todo: replace the URL with the BASE_URL variable once the dotenv configuration is done.

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
  organizationId: string, // Add organizationId as a parameter
  server: string,
  port: number,
  username: string,
  password: string,
  securityType: string,
  email: string,
): Promise<any> => {
  try {
    const response = await fetch(
      `${Base_URL}/organizations/${organizationId}/email-settings/test`,
      {
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
      },
    );

    if (!response.ok) {
      // If the response is not OK, log the status and statusText
      console.error("Error response:", response.status, response.statusText);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
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
 * @param {string} organization - The ID of the organization to save email settings for.
//  * @param {string} organization - The name of the organization.
 * @returns {Promise<any>} The response from the server.
 */
export const saveEmailSettings = async (
  server: string,
  port: number,
  username: string,
  password: string,
  securityType: string,
  organization: string,
): Promise<any> => {
  try {
    const response = await fetch(
      `${Base_URL}/organizations/${organization}/email-settings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          server,
          port,
          username,
          password,
          securityType,
          organization,
        }),
      },
    );

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
  securityType: string,
): boolean => {
  if (!server || !port || !username || !password || !securityType) {
    return false;
  }
  return true;
};

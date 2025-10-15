const API_BASE_URL = "http://localhost:5118/api/student";

/**
 * Sends a clock in/out request to the API
 * @param {Object} payload - The data to send
 * @param {string} payload.firstName
 * @param {boolean} payload.inOut
 * @param {number} payload.lat
 * @param {number} payload.lon
 * @returns {Promise<Object>} API response
 */
export async function clockStudent(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/clock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error in clockStudent:", error);
    throw error;
  }
}

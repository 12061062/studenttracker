import "./Student.css";
import { useState } from "react";
import { clockStudent } from "../services/StudentService";


export default function Student() {
  const [inOut, setInout] = useState(null);
  const [coords, setCoords] = useState(null); // { lat, lon }
  const [locStatus, setLocStatus] = useState("Your location is:");
  const [locLoading, setLocLoading] = useState(false);

  const getLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocStatus("Geolocation is not supported by this browser.");
      return;
    }

    setLocLoading(true);
    setLocStatus("Getting your location…");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lon: longitude });
        setLocStatus(
          `Your location is: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
        );
        setLocLoading(false);
      },
      (err) => {
        // Common errors: permission denied, timeout, position unavailable
        setLocStatus(`Couldn't get location: ${err.message}`);
        setLocLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1>Student Page</h1>

      <textarea
        className="student-textarea"
        placeholder="Enter your first name here..."
      ></textarea>

      <div className="student-questions">
        <h2>Do you want to clock in or out?</h2>
        <button className="student-button" onClick={() => setInout(true)}>
          Clock In
        </button>
        <button className="student-button" onClick={() => setInout(false)}>
          Clock Out
        </button>
        <p>
          {inOut === null
            ? "Please select an option."
            : inOut
            ? "You want to clock in."
            : "You want to clock out."}
        </p>
      </div>

        <h2>Please verify your location</h2>
      <button
        className="get-location"
        onClick={getLocation}
        disabled={locLoading}
        title="Request your current location"
      >
        {locLoading ? "Getting Location..." : "Get Location"}
      </button>

      <p>{locStatus}</p>

      {/* You can use coords in your submit handler */}
<button
  className="student-submit-button"
  onClick={async () => {
    const firstName = document.querySelector(".student-textarea")?.value || "";

    const payload = {
      firstName,
      inOut,
      lat: coords?.lat,
      lon: coords?.lon,
    };

    try {
      const data = await clockStudent(payload);
      console.log("✅ Response from API:", data);
      alert(data.message || "Clock event recorded successfully!");
    } catch (err) {
      alert("❌ Failed to submit. Check console for details.");
    }
  }}
>
  Submit
</button>
    </div>
  );
}
import "./Student.css";
import { useState, useEffect } from "react";
import { clockStudent } from "../services/StudentService";
import etsuLogo from "../etsu-logo.png";



export default function Student() {
  const [inOut, setInout] = useState(null);
  const [coords, setCoords] = useState(null); // { lat, lon }
  const [locStatus, setLocStatus] = useState("Your location is:");
  const [locLoading, setLocLoading] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [searchName, setSearchName] = useState("");    // typing buffer
  const [appliedName, setAppliedName] = useState("");  // the name we actually fetch with
  const [showRecords, setShowRecords] = useState(false);
    const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    useEffect(() => {
      if (!showRecords) return;
  
      const fetchRecords = async () => {
        try {
          setLoading(true);
          setError("");
  
          const name = appliedName.trim();
          const url = name
            ? `http://localhost:5118/api/professor/attendance/${encodeURIComponent(name)}`
            : `http://localhost:5118/api/professor/attendance`;
  
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          setRecords(data);
        } catch (e) {
          console.error(e);
          setRecords([]);
          setError(
            appliedName
              ? `No records found for "${appliedName}".`
              : "Failed to load attendance records."
          );
        } finally {
          setLoading(false);
        }
      };
  
      fetchRecords();
    }, [showRecords, appliedName]);
  

  const handleSearch = () => {
    if (!searchName.trim()) {
      alert("Please enter a name!");
    } else {
      setAppliedName(searchName);  // apply the filter
    }
  };

  const clearSearch = () => {
    setSearchName("");
    setAppliedName("");            // revert to “all”
  };

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

        <div className="ETSU-banner">
        <img src={etsuLogo} alt="ETSU logo" />  
        </div>

        <h1>Student Page</h1>

        <button onClick={() => setShowSurvey((s) => !s)} className="student-search">
          {showSurvey ? "Hide" : "Show"} Clock In/Out
        </button>

{showSurvey && (
  <>
    <h2>Please fill out the survey below:</h2>
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

        if (!coords || !coords.lat || !coords.lon) {
          alert("⚠️ Please click 'Get Location' and wait for your location to load before submitting.");
          return;
        }

        if (!firstName.trim()) {
          alert("⚠️ Please enter your first name.");
          return;
        }

        try {
          const data = await clockStudent(payload);
          console.log("✅ Response from API:", data);
          alert(data.message || "Clock event recorded successfully!");
        } catch (err) {
          console.error("❌ Error submitting clock data:", err);
          alert("❌ Failed to submit. Check console for details.");
        }
      }}
    >
      Submit
    </button>
  </>
)}

      <div className="professor-search">
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter student name..."
        />
        <button onClick={() => { handleSearch(); setShowRecords(true); }}>Search by Name</button>
      </div>

      {showRecords && (
        <>
          <h1>{appliedName ? `Attendance: ${appliedName}` : "Attendance Records"}</h1>

          {loading && <p>Loading attendance records...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && records.length === 0 && (
            <p>No attendance records found.</p>
          )}

          {!loading && !error && records.length > 0 && (
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>First Name</th>
                  <th>Action</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={i}>
                    <td>{r.timestamp || r.Timestamp}</td>
                    <td>{r.firstName || r.FirstName}</td>
                    <td>{r.action || r.Action}</td>
                    <td>{r.latitude || r.Latitude}</td>
                    <td>{r.longitude || r.Longitude}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}




    </div>
  );
}
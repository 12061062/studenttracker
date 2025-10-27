import { useEffect, useState } from "react";
import "./Professor.css";
import etsuLogo from "../etsu-logo.png";



export default function Professor() {
  const [showRecords, setShowRecords] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch only when the section is opened
  useEffect(() => {
    if (!showRecords) return;

    const fetchRecords = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("http://localhost:5118/api/professor/attendance");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRecords(data);
      } catch (e) {
        console.error(e);
        setError("Failed to load attendance records.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [showRecords]);

  return (
    <div className="professor-page">
              <div className="ETSU-banner">
        <img src={etsuLogo} alt="ETSU logo" />  
        </div>

      <button onClick={() => setShowRecords((s) => !s)}>
        {showRecords ? "Hide" : "Show"} All Attendance Records
      </button>

      {showRecords && (
        <>
          <h1>Attendance Records</h1>

          {loading && <p>Loading attendance records...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && records.length === 0 && (
            <p>No attendance records found yet.</p>
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

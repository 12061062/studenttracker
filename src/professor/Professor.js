import { useEffect, useState } from "react";
import "./Professor.css";
import etsuLogo from "../etsu-logo.png";

export default function Professor() {
  const [showRecords, setShowRecords] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchName, setSearchName] = useState("");    // typing buffer
  const [appliedName, setAppliedName] = useState("");  // the name we actually fetch with

  // Fetch when the panel is open AND appliedName changes
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
    setShowRecords(true);          // ensure the table is visible
  };

  const clearSearch = () => {
    setSearchName("");
    setAppliedName("");            // revert to “all”
    setShowRecords(true);
  };

  // ✅ Export to CSV feature
  const exportToCSV = () => {
    if (!records.length) {
      alert("No records available to export!");
      return;
    }

    // Define CSV headers
    const headers = ["Timestamp", "First Name", "Action", "Latitude", "Longitude"];
    const rows = records.map((r) => [
      r.timestamp || r.Timestamp,
      r.firstName || r.FirstName,
      r.action || r.Action,
      r.latitude || r.Latitude,
      r.longitude || r.Longitude,
    ]);

    // Convert to CSV string
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) =>
            value !== undefined && value !== null
              ? `"${String(value).replace(/"/g, '""')}"`
              : ""
          )
          .join(",")
      ),
    ].join("\n");

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      appliedName
        ? `attendance_${appliedName.replace(/\s+/g, "_")}.csv`
        : "attendance_records.csv"
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="professor-page">
      <div className="ETSU-banner">
        <img src={etsuLogo} alt="ETSU logo" />
      </div>

      <div className="professor-search">
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter student name..."
        />
        <button onClick={handleSearch}>Search by Name</button>
        {appliedName && (
          <button onClick={clearSearch}>Clear</button>
        )}
        <button onClick={() => setShowRecords((s) => !s)}>
          {showRecords ? "Hide" : "Show"} {appliedName ? `Results for "${appliedName}"` : "All Attendance Records"}
        </button>
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
            <>
              <button onClick={exportToCSV} className="export-button">
                Export to CSV
              </button>

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
            </>
          )}
        </>
      )}
    </div>
  );
}

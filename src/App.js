import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Student from "./student/Student";

function Home() {
  const [choice, setChoice] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/student");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Title">Are you a student or a professor?</h1>

        <div className="ChoiceGroup" role="group" aria-label="Choose your role">
          <button
            className="ChoiceButton"
            onClick={() => { setChoice("Student"); handleNavigate(); }}
          >
            I'm a Student
          </button>
          <button
            className="ChoiceButton"
            onClick={() => setChoice("Professor")}
          >
            I'm a Professor
          </button>
        </div>

        {choice && (
          <p className="ChoiceNote">
            You chose: <strong>{choice}</strong>
          </p>
        )}
      </header>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student" element={<Student />} />
    </Routes>
  );
}

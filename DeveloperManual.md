# **Glossary of Important Terms**

API (Application Programming Interface)
A set of rules that allows different software components to communicate. In this project, the React frontend communicates with the .NET backend through API endpoints.

Endpoint
A specific URL where the backend exposes functionality. Examples include /api/student/clock and /api/professor/attendance.

Frontend
The client-side portion of the system built with React, responsible for user interaction, input collection, and displaying results.

Backend
The server-side .NET Web API that processes requests, saves records, and returns data to the frontend.

CSV (Comma-Separated Values)
A lightweight file format used to store attendance records. Each row represents a single clock-in or clock-out event.

Controller
A backend component that handles incoming HTTP requests and returns responses. Each controller maps to specific endpoints.

Service Layer
Backend classes (e.g., StudentProcessor, ProfessorProcessor) that contain the business logic for writing and reading attendance data.

HTTP Methods
Actions used when calling an API.

GET retrieves data.

POST submits data.

JSON (JavaScript Object Notation)
The data format used to send information between the frontend and backend.

State
Information stored in React components that updates the UI when changed (e.g., search input, student location, attendance results).

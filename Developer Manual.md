# **Development Environment & Setup**
This project is set up into two directories, the frontend and backend. 
API URL can be found at: https://github.com/12061062/StudentTrackerAPI

**Frontend**

The front end utilizes the React framework, a JavaScript library. To run this project, you must have Node.js installed. It can be installed at https://nodejs.org/ (recommended version Node 18+). This installs React, React DOM, your fetch API utilities, and any other dependencies in package.json. Once installed, in the project directory, you can run: 

npm start

Which runs the app in development mode. If it doesn’t open automatically, open http://localhost:3000 in your browser to view it. The page will reload when you make changes locally. You may also see any lint errors in the console.

**Backend**

Before running, ensure .NET SDK 8.0+ is installed, which can be downloaded at: https://dotnet.microsoft.com/en-us/download/dotnet/8.0. Once installed, in the project directory, you can run:
dotnet restore
dotnet run
The first command installs necessary dependencies, and the second runs the application. If successful, you should get a message similar to this:
Now listening on: http://localhost:5118
Application started.
Press Ctrl+C to shut down.
Submission test endpoints can be used with Swagger or Postman, and the endpoints:
POST /api/student/clock 
GET /api/professor/attendance/{name}
The backend uses a CSV file to represent the database. The file path can be found at:
C:\Users<YourName>\Downloads\StudentClockRecords.csv



# **Glossary of Important Terms**

**API (Application Programming Interface):**
A set of rules that allows different software components to communicate. In this project, the React frontend communicates with the .NET backend through API endpoints.

**Endpoint:**
A specific URL where the backend exposes functionality. Examples include /api/student/clock and /api/professor/attendance.

**Frontend:**
The client-side portion of the system built with React, responsible for user interaction, input collection, and displaying results.

**Backend:**
The server-side .NET Web API that processes requests, saves records, and returns data to the frontend.

**CSV (Comma-Separated Values):**
A lightweight file format used to store attendance records. Each row represents a single clock-in or clock-out event.

**Controller:**
A backend component that handles incoming HTTP requests and returns responses. Each controller maps to specific endpoints.

**Service Layer:**
Backend classes (e.g., StudentProcessor, ProfessorProcessor) that contain the business logic for writing and reading attendance data.

**HTTP Methods:**
Actions used when calling an API.

**GET:** retrieves data.

**POST:** submits data.

**JSON (JavaScript Object Notation):**
The data format used to send information between the frontend and backend.

**State:**
Information stored in React components that updates the UI when changed (e.g., search input, student location, attendance results).



# **Coding Standards**
All code in this project follows common industry best practices to ensure readability, maintainability, and consistency. Descriptive and meaningful variable names are used throughout both the frontend and backend to clearly indicate purpose and intent. Code is organized into logical modules—React components for UI, services for API communication, and controllers and processors for backend logic—to support separation of concerns.

Frontend React components follow a functional component style with hooks (useState, useEffect) for state management. JSX is formatted consistently with proper indentation, and CSS classes follow a clear naming convention. API calls are centralized in service files to avoid duplication.

The backend follows standard .NET conventions, including PascalCase for class and method names, camelCase for parameters and variables, and organizing business logic within service classes rather than controllers. Error handling is included to prevent failed operations from crashing the system, and JSON data models follow consistent property naming.

Together, these standards help keep the project clean, organized, and easy for future developers to understand and extend.

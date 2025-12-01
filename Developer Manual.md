# **Development Environment & Setup**
This project is set up into two directories, the frontend and backend. 
API URL can be found at: https://github.com/12061062/StudentTrackerAPI

### **Frontend**

The front end utilizes the React framework, a JavaScript library. To run this project, you must have Node.js installed. It can be installed at https://nodejs.org/ (recommended version Node 18+). This installs React, React DOM, your fetch API utilities, and any other dependencies in package.json. Once installed, in the project directory, you can run: 

npm start

Which runs the app in development mode. If it doesn’t open automatically, open http://localhost:3000 in your browser to view it. The page will reload when you make changes locally. You may also see any lint errors in the console.

### **Backend**

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



# **Data Dictionary**

StudentClockRequest (API Input)
| Field       | Type    | Description                                   |
| ----------- | ------- | --------------------------------------------- |
| `firstName` | string  | The student's first name. Required.           |
| `inOut`     | boolean | `true` = Clock In, `false` = Clock Out.       |
| `lat`       | number  | GPS latitude provided by the student device.  |
| `lon`       | number  | GPS longitude provided by the student device. |

AttendanceRecord (CSV Storage Format)
| Column      | Type   | Description                                                 |
| ----------- | ------ | ----------------------------------------------------------- |
| `Timestamp` | string | Date and time the event was recorded (YYYY-MM-DD HH:mm:ss). |
| `FirstName` | string | The student's first name.                                   |
| `Action`    | string | “Clock In” or “Clock Out”.                                  |
| `Latitude`  | string | Latitude value stored as text.                              |
| `Longitude` | string | Longitude value stored as text.                             |



# **Testing Reports**
Postman was used to test the functionality of the submissions. It was also used to test the endpoints for retrieving the records by name and getting all records.

Testing Reports:
Student Submission
URL: http://localhost:5118/api/student/clock
<img width="748" height="467" alt="PostmanSubmission" src="https://github.com/user-attachments/assets/1c1b7148-10fe-4f17-8288-54cbb35616c5" />

Retrieve all Records
URL: http://localhost:5118/api/professor/attendance/
<img width="747" height="463" alt="PostmanAttendance" src="https://github.com/user-attachments/assets/b5026c21-be10-4658-828f-40264e28aed6" />

Retrieve Records by Name:
URL: http://localhost:5118/api/professor/attendance/<Name>
<img width="748" height="466" alt="image" src="https://github.com/user-attachments/assets/559701e6-a5f4-4402-a42a-a6970e632eb4" />





# **Logic and Rationale**
Several design decisions were made to keep the system simple, portable, and easy to maintain. The use of a CSV file instead of a database allows the application to run without any external dependencies, making it ideal for classroom environments or small-scale deployments. Each attendance entry is appended to the file with a timestamp to preserve an immutable record of student activity. The separation between controllers and processor classes in the backend ensures that business logic remains isolated from HTTP request handling, improving readability and making future changes easier.

On the frontend, React was chosen to provide a clean and responsive interface with minimal complexity. State hooks are used to manage user input, form validation, and API results, which keeps component logic easy to follow. API calls are abstracted into service functions for reuse and clarity. The UI design follows ETSU-inspired colors to maintain a consistent and recognizable look for users. These decisions prioritize clarity, maintainability, and ease of understanding for developers who may work on the project later.



# **Project Management Tool**
Our team used a Jira board to manage tasks and track progress throughout the project. Jira allowed us to create user stories, assign tasks, monitor workflow status, and maintain clear visibility on project milestones. This helped ensure efficient collaboration and organized task management across all development phases.



# **Build and Deployment Procedure**
The application is built using standard Node.js tooling. To build the project, install dependencies with npm install and run npm run build. Deployment involves uploading the generated build output to the target hosting environment and ensuring environment variables are configured properly.

# **Video Demonstration Link**
https://youtu.be/wJjV91utq9M

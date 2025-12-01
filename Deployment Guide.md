# **Deployment Guide**

This project consists of two parts:

Frontend: React application (Student + Professor interfaces)

Backend: ASP.NET Core Web API (StudentTrackerAPI) that reads/writes a CSV file

For the system to work, both must be running and the frontend must point to the correct API URL.



1. Prerequisites

Before deployment or running in a new environment, ensure:

Node.js (v18+ recommended) is installed

Download: https://nodejs.org

.NET SDK 8.0+ is installed

Download: https://dotnet.microsoft.com/en-us/download/dotnet/8.0



2. Backend Deployment (.NET API)
2.1 Build / Publish the API

From the backend project folder (where the .csproj is located):

dotnet restore
dotnet publish -c Release -o ./publish


This:

Restores dependencies

Builds the API in Release mode

Outputs the deployable files into the publish folder



2.2 Run the API

From the publish folder:

dotnet StudentTrackerAPI.dll


You should see console output similar to:

Now listening on: http://localhost:5118
Application started. Press Ctrl+C to shut down.


The app writes the CSV file to the current user’s Downloads folder as:
StudentClockRecords.csv

If you want to host the API on another server or port (e.g. behind IIS or a reverse proxy), configure the URL/port in your hosting setup and update the frontend API URL to match.



3. Frontend Deployment (React App)
3.1 Install Dependencies

From the frontend project folder:

npm install



3.2 Configure API URL (if needed)

By default, your React services are calling something like:

http://localhost:5118/api/...


If you deploy the backend to a different URL (for example, https://yourserver.com), update the API base URLs in your frontend service files (e.g. StudentService, ProfessorService) or use an environment variable (e.g. REACT_APP_API_BASE_URL).



3.3 Build the Frontend
npm run build


This creates an optimized production build in a build folder.



3.4 Host the Frontend

You can deploy the contents of the build folder to any static web host, such as:

A simple static web server (Nginx, Apache, IIS)

A cloud host (Netlify, Vercel, etc.)

Or served from the same machine that runs the API

Make sure:

The frontend is reachable at something like http://your-frontend-url

The frontend API URLs point to the backend (e.g. http://your-backend-url:5118)



4. Final Verification Checklist

After deployment:

Open the frontend in a browser.

Student side:

Enter a name

Clock In and Get Location

Submit and confirm no errors

Confirm the CSV file is created/updated in the Downloads folder of the API host user.

Professor side:

View all attendance records

Search by student name

Confirm records match the CSV contents

If all of the above work, your deployment is successful.

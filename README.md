VaxMS - Vaccine Management System

VaxMS is a comprehensive vaccine management system designed for vaccination centers. It enables customers to explore, book, and manage their vaccination schedules through a modern web interface, while also supporting real-time communication between staff and clients. The system is developed using a full-stack architecture with Java Spring Boot for the backend and React.js for the frontend.

✨ Key Features

✉ Customer login and registration

🔍 Vaccine browsing with disease type and pricing info

📅 Online appointment booking and payment

⚕️ Admin scheduling for vaccination sessions with doctors and nurses

🏥 On-site check-in and direct payment support

🤖 Real-time chat with staff

🤖 AI-powered chatbot for automated support

📚 System Overview

Frontend: React.js (in client-fe/ folder)

Backend: Java Spring Boot (in server/ folder)

Database: MySQL (via phpMyAdmin)

🚀 Getting Started

1. Database Setup

Import the provided vaxms.sql file into phpMyAdmin (port 3306).

This will initialize the database schema and seed data required to run the system.

2. Backend (Spring Boot)

Navigate to the server/ directory:

cd server

Make sure you have Java and Maven installed, then run:

./mvnw spring-boot:run

The backend will launch and connect to the configured MySQL database.

3. Frontend (React App)

Navigate to the client-fe/ directory:

cd client-fe

Install dependencies:

npm install

Start the frontend app:

npm start

The application will automatically open in your default browser at the appropriate localhost address (usually something like http://localhost:3000).

📖 Project Structure

VaxMS_FA24.SE34/
├── client-fe/        # React frontend (user interface)
├── server/           # Spring Boot backend (API, logic, DB connection)
├── vaxms.sql         # MySQL database dump
└── README.md         # Project documentation

🔧 Developer Notes

Use environment files or configuration classes to update DB credentials.

Ensure port 3306 is available and MySQL is running.

For deployment, consider Dockerizing the backend and frontend services.

🌎 Authors & Contributors

Developed by the VaxMS FA24.SE34 team. For contributions, please fork the repository and open a pull request.

✨ License

This project is licensed under the MIT License. See LICENSE for more details.


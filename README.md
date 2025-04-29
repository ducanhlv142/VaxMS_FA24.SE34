# VaxMS - Vaccine Management System

**VaxMS** is a full-stack web application developed as a team capstone project for managing vaccination scheduling and operations at a vaccination center. The system provides an end-to-end solution allowing customers to view vaccine information, book appointments, and communicate with staff, while enabling administrators and medical personnel to manage schedules and patient interactions efficiently.

---

## ✨ Key Features

- Secure customer registration and login
- Vaccine catalog with detailed descriptions and pricing
- Online appointment booking and scheduling interface
- Integrated online and in-person payment methods
- Admin dashboard for managing appointments and vaccine stock
- Real-time chat support between staff and customers
- AI chatbot for common customer inquiries
- ... and many more features designed for streamlined vaccination management

---

## 📚 Tech Stack

- **Frontend:** React.js
- **Backend:** Java Spring Boot
- **Database:** MySQL
- **Real-time Chat:** WebSocket
- **AI Chatbot:** (integrated via custom logic)

---

## 🚀 Getting Started

### 1. Database Setup

1. Open **phpMyAdmin** on port `3306`.
2. Import the provided `vaxms.sql` file to initialize the database schema and seed data.

### 2. Backend Setup (Spring Boot)

Navigate to the `server/` directory:

```bash
cd server
```

Then run:

```bash
./mvnw spring-boot:run
```

Ensure Java and Maven are properly installed. The backend will connect to the configured MySQL instance.

### 3. Frontend Setup (React.js)

Navigate to the `client-fe/` directory:

```bash
cd client-fe
```

Install the dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The app will automatically open in your browser at the appropriate `localhost` address (usually `http://localhost:3000`).

---

## 📁 Project Structure

```
VaxMS_FA24.SE34/
├── client-fe/        → React frontend (user interface)
├── server/           → Spring Boot backend (API, logic, DB connection)
├── vaxms.sql         → MySQL database schema & seed data
└── README.md         → Project documentation
```

---

## 🛠 Developer Notes

- Ensure MySQL is running on port `3306`.
- Update database credentials as needed in application properties.
- Consider Docker for deployment (optional).

---

## 👨‍💻 Authors & Contributors

Developed by the **VaxMS FA24.SE34** project team as part of a university group assignment.

For improvements or bug fixes, please fork this repository and open a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
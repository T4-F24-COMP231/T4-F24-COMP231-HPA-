# 🏥 Health Progress App (HPA)

AI-powered health monitoring platform for real-time patient tracking and predictive analytics.

---

## 📌 Overview

The **Health Progress App (HPA)** is a full-stack healthcare application designed to help doctors monitor patient health in real time, detect early warning signs using AI-driven analytics, and improve patient outcomes through proactive care.

Patients submit health data manually or via connected devices, while healthcare providers access insights through a secure dashboard. The system is designed with scalability, security, and cloud deployment in mind.

This project demonstrates **real-world system design**, **backend API development**, **frontend integration**, and **healthcare-focused architecture**, making it suitable for Software Engineering, DevOps, SRE, and Platform Engineering roles.

---

## 📁 Repository Structure
T4-F24-COMP231-HPA-/
├── health-progress-backend/   # Backend API
├── my-app/                    # Frontend application
├── .gitignore
└── README.md
---

## 🧠 System Architecture
Frontend (my-app)
|
| REST API (JWT-secured)
v
Backend (health-progress-backend)
|
| Secure Database Access
v
Health Data Storage
|
| (Planned)
v
AI / Predictive Analytics Engine
---

## ✨ Features

### 👤 Patient Features
- Secure login and authentication
- Input vital health metrics (heart rate, blood pressure, glucose, temperature, SpO₂)
- View health trends over time
- Communicate with healthcare providers
- Appointment scheduling (planned)

### 🩺 Healthcare Provider Features
- View real-time patient data
- Monitor trends and abnormal readings
- Access patient history
- Receive alerts for critical conditions
- Manage appointments (planned)

### 🛠 IT & System Support (Planned)
- System health monitoring
- Issue and ticket reporting
- Performance visibility

---

## 🛠 Tech Stack

### Frontend
- React or Flutter
- Charting libraries for health visualization

### Backend
- ASP.NET Core or Node.js
- RESTful API architecture
- JWT authentication
- Role-based access control

### Database
- SQL-based relational database
- Normalized schema for users, patients, health metrics, and alerts

### AI / Analytics (Planned)
- Python
- TensorFlow / Scikit-learn
- Predictive health risk analysis
- Anomaly detection

### Cloud & DevOps
- Azure-ready architecture
- CI/CD-friendly project structure
- Secure data handling (HIPAA-aware design)

---

## 🔐 Security Considerations

- JWT-based authentication
- Role-based authorization
- Encrypted data in transit
- Separation of frontend, backend, and data layers
- Healthcare data privacy awareness

---

## 🚀 Getting Started

### Prerequisites
- Node.js or .NET SDK
- SQL Server or PostgreSQL
- Git
- npm or yarn

---

### ▶️ Backend Setup

```bash
cd health-progress-backend
npm install
npm start

---

## ✨ Features

### 👤 Patient Features
- Secure login and authentication
- Input vital health metrics (heart rate, blood pressure, glucose, temperature, SpO₂)
- View health trends over time
- Communicate with healthcare providers
- Appointment scheduling (planned)

### 🩺 Healthcare Provider Features
- View real-time patient data
- Monitor trends and abnormal readings
- Access patient history
- Receive alerts for critical conditions
- Manage appointments (planned)

### 🛠 IT & System Support (Planned)
- System health monitoring
- Issue and ticket reporting
- Performance visibility

---

## 🛠 Tech Stack

### Frontend
- React or Flutter
- Charting libraries for health visualization

### Backend
- ASP.NET Core or Node.js
- RESTful API architecture
- JWT authentication
- Role-based access control

### Database
- SQL-based relational database
- Normalized schema for users, patients, health metrics, and alerts

### AI / Analytics (Planned)
- Python
- TensorFlow / Scikit-learn
- Predictive health risk analysis
- Anomaly detection

### Cloud & DevOps
- Azure-ready architecture
- CI/CD-friendly project structure
- Secure data handling (HIPAA-aware design)

---

## 🔐 Security Considerations

- JWT-based authentication
- Role-based authorization
- Encrypted data in transit
- Separation of frontend, backend, and data layers
- Healthcare data privacy awareness

---

## 🚀 Getting Started

### Prerequisites
- Node.js or .NET SDK
- SQL Server or PostgreSQL
- Git
- npm or yarn

---

### ▶️ Frontend Setup

```bash
cd my-app
npm install
npm start

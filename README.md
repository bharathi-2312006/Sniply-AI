🏴‍☠️ BlackFlag
Smart URL Shortener & Analytics Platform

BlackFlag is a full-stack web application that allows users to shorten URLs, create custom aliases, generate QR codes, and track link performance through an interactive analytics dashboard.

🎥 Demo Video

Project Walkthrough:
[https://youtube.com/shorts/7IaPmPRSA1g?si=dW7xCijx4xoRJf5i]

✨ Features
🔗 URL Shortening
🎯 Custom Aliases
🤖 Smart Alias Suggestions
📱 QR Code Generation & Download
📊 Click Tracking
📈 Analytics Dashboard
🥧 Click Distribution Pie Chart
📄 PDF Analytics Export
🔍 Search & Manage Links
📋 One-Click Copy
🗑️ Delete Links
🛠️ Tech Stack
Frontend
React
React Router
Axios
Recharts
QRCode React
Framer Motion
Backend
FastAPI
SQLAlchemy
SQLite
Uvicorn
🚀 Getting Started
Backend
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn main:app --reload

Runs on:

http://127.0.0.1:8000
Frontend
cd frontend

npm install

npm run dev

Runs on:

http://localhost:5173
📂 Project Structure
BlackFlag
│
├── backend
│   ├── routes
│   ├── models.py
│   ├── database.py
│   └── main.py
│
├── frontend
│   ├── components
│   ├── pages
│   ├── charts
│   ├── services
│   └── App.jsx
│
└── README.md
📡 API Endpoints
POST   /api/shorten
GET    /api/urls
DELETE /api/urls/{code}
GET    /api/analytics
🎯 Key Highlights
Real-time click tracking
Interactive analytics charts
QR code support
PDF report generation
Responsive modern UI
Custom URL aliases
👨‍💻 Team

Project: BlackFlag
Category: URL Shortener & Analytics Platform

🔮 Future Scope
User Authentication
Geo Analytics
Device Analytics
Custom Domains
Team Workspaces

This version is the ideal length for GitHub and hackathon submissions.
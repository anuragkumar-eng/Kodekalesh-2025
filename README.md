🌌 MindWatch + AuroraAuth
A Modern Wellbeing Dashboard + Beautiful Auth System — Now Live on AWS Amplify
<p align="center"> <a href="https://main.d3n51jttgr0w71.amplifyapp.com/"> <img src="https://img.shields.io/badge/Live%20Demo-Open%20App-brightgreen?style=for-the-badge" /> </a> <img src="https://img.shields.io/badge/Hosted%20On-AWS%20Amplify-orange?style=for-the-badge" /> <img src="https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JS-blue?style=for-the-badge" /> <img src="https://img.shields.io/badge/Auth-AuroraAuth-purple?style=for-the-badge" /> </p>
🧠 MindWatch — Track Your Mood, Wellness & Daily Habits

MindWatch is a clean, modern, offline-first wellbeing dashboard.
It helps users track mood, stress, sleep patterns, and personal notes – while giving real-time insights, trends, streaks, and a 30-day mood calendar.

✨ Fully responsive
✨ Zero backend
✨ Beautiful UI
✨ Runs 100% locally
✨ Deployed on AWS Amplify

🔐 AuroraAuth — The Login & Register System

Your project includes a stylish, glassmorphic authentication system with:

Login & Register pages

SHA-256 password hashing (client-side demo)

LocalStorage database

Toast notifications

Auto-redirect to dashboard

“Show Password” toggle

⚠️ This is a demo auth system for hackathons. For production, use AWS Cognito.

🚀 Live Demo

👉 MindWatch App:
https://main.d3n51jttgr0w71.amplifyapp.com/

Try signing up, logging in, making check-ins, viewing charts, etc. Everything works fully in the browser.

✨ Core Features
📝 Daily Check-Ins

Track in one click:

Mood (emoji scale 😄 → 😢)

Stress (0–100 slider)

Sleep hours

Notes

📊 Analytics & Insights

Wellbeing Score Ring

Mood Trend Chart

Stress Trend Chart

Latest check-in summary

Auto-generated “AI-style” insights

Streak tracking

🗓️ 30-Day Mood Calendar

Clean, color-coded mood heatmap:
🟢 Good • 🟡 Neutral • 🔴 Low • ⚪ No entry

⚡ Motivation Tools

“Take a deep breath”

“Go for a walk”

Optional daily reminder notification

📤 Data Management

Export as CSV

Clear all data

Works 100% offline

🌈 Screenshots (optional section)

If you want, I can generate UI mockups & screenshots for this section.
Just say "Generate screenshots".

🧩 Tech Stack
Layer	Tech
Hosting	AWS Amplify
Frontend	HTML, CSS, JavaScript
Charts	Chart.js
Auth	Custom SHA-256 LocalStorage system
Storage	LocalStorage
UI	Glassmorphic Login + Modern Dashboard
📁 Project Structure
📦 Project
│── login.html                 # AuroraAuth login
│── register.html              # Create account
│── auth.js                    # SHA-256 auth logic
│
│── index.html                 # MindWatch dashboard
│── index-style.css            # Styling & layout
│── index-app.js               # App logic + charts
│
│── login-register-styles.css  # Auth UI styles
└── README.md

🛠️ Development Setup
1️⃣ Clone the repo
git clone <repo-url>
cd project-folder

2️⃣ Open the app

Simply open:

login.html


or

index.html


That’s it. No build tools. No backend.

☁️ Deployment (Already Done!)

This project is live on:
👉 AWS Amplify Hosting
https://main.d3n51jttgr0w71.amplifyapp.com/

Amplify automatically:

Deploys from your GitHub

Gives you HTTPS

Handles versioning

Provides fast global CDN

🌱 Future Enhancements

Dark mode

Weekly / monthly analytics

Cloud backup (S3 or DynamoDB)

Tagging system for notes

Real AI-generated insights

Multi-user support

👨‍💻 Developer

Team Aphelion

⭐ Star this repo if you like the project!

🌌 MindWatch + AuroraAuth
A Modern Wellbeing Dashboard with a Beautiful Auth System — Built for Hackathons
<p align="center"> <img src="https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JS-blue?style=for-the-badge" /> <img src="https://img.shields.io/badge/Auth-AuroraAuth-purple?style=for-the-badge" /> <img src="https://img.shields.io/badge/Charts-Chart.js-yellow?style=for-the-badge" /> <img src="https://img.shields.io/badge/Storage-LocalStorage-orange?style=for-the-badge" /> </p>
🧠 MindWatch — Your Personal Wellness Tracker

MindWatch is a sleek, modern, offline-first wellbeing monitoring dashboard.
Users can track mood, stress, sleep and personal notes — while getting real-time insights, trends, calendars, visual analytics and streak tracking.

Everything is beautifully styled, responsive, and runs directly in the browser.
No backend required.

🔐 AuroraAuth — The Login & Register System

Along with the dashboard, this project includes a dedicated auth module:

✔ Beautiful glassmorphism UI

✔ Login + Register pages

✔ Password hashing using SHA-256 (demo only)

✔ LocalStorage-based user management

✔ Smooth toast notifications

✔ Auto-redirect after login

✔ Fully offline demo authentication

This is perfect for hackathons where you need quick authentication without a backend.

✨ Major Features
📝 1. Daily Check-ins

Track your wellbeing:

Mood (emoji scale 😄 → 😢)

Stress (range slider 0–100)

Sleep hours

Quick personal notes

Check-ins instantly update the dashboard.

📊 2. Real-time Analytics

MindWatch includes:

Dynamic Wellbeing Score Ring

Mood trend chart (Chart.js)

Stress trend chart

Auto-generated AI-like insights

Daily streak calculation

Latest stats panel

Everything updates live as soon as you save a check-in.

🗓️ 3. Mood Calendar (30 Days)

A clean, color-coded mood calendar:

Color	Meaning
🟢 Green	Good mood
🟡 Yellow	Neutral mood
🔴 Red	Low mood
⚪ Grey	No check-in

Helps visualize emotional patterns at a glance.

⚡ 4. Motivation Tools

“Breathe” quick action

“Take a Walk” quick action

Optional browser notification reminders

Onboarding modal for new users

🧩 5. Full Auth System (AuroraAuth)
Register

Name, email, password

Stored securely using SHA-256 hash

Redirect to login after signup

Login

Email + password

Password visibility toggle

Supports “remember me”

Redirects to dashboard

Error toast on wrong credentials

Security Note

This system is demo-only and uses LocalStorage.
For production, use AWS Cognito or a backend.

🎨 6. Premium UI & UX

MindWatch + AuroraAuth use:

Clean gradients

Smooth card shadows

Poppins & Inter fonts

Glassmorphism login screens

Responsive layout

Modern sidebar navigation

Animated mood picker

Beautiful score ring

Looks extremely polished for hackathons.

📁 Project Structure
📦 KodeKalesh-2025
│
├── login.html                 # AuroraAuth login page
├── register.html              # AuroraAuth signup page
├── auth.js                    # Hashed LocalStorage auth system
│
├── index.html                 # MindWatch app main UI
├── index-style.css            # MindWatch UI styling
├── index-app.js               # App logic: charts, insights, storage
│
├── login-register-styles.css  # Auth UI styles
└── README.md                  # This file

🛠️ Tech Stack
Layer	Tools
Frontend	HTML, CSS, JavaScript
UI	Custom gradients, glassmorphism, responsive design
Charts	Chart.js
Storage	LocalStorage
Auth	SHA-256 hashing with SubtleCrypto API
🚀 Run Locally

No dependencies. No server.
Just open the files.

1. Clone the repo
git clone https://github.com/<your-username>/<repo>.git

2. Open the project

Just double-click:

login.html


or

index.html


Works 100% offline.

🧠 How AuroraAuth Works

AuroraAuth is a simple client-side authentication module used for demos.

✔ Passwords are hashed
sha256(password + "::" + email)

✔ Users stored securely in LocalStorage
localStorage.setItem("aurora_users", JSON.stringify(users))

✔ Login verification

Hashes the input password

Compares with stored hash

Creates a session token

Redirects to index.html

✔ Works offline

No API calls.
Perfect for hackathons.

📈 How MindWatch Works
✔ Saves daily entries to LocalStorage
✔ Generates analytics from data:

Score calculation

3-day insights

Streak counter

Charts (Chart.js)

Mood calendar

✔ Exports CSV

Download all mood logs instantly.

🌱 Future Enhancements

Dark mode toggle

Weekly / monthly reports

AI-based mood predictions

Optional cloud sync with AWS

Shared mood journals

Multi-user support

👨‍💻 Developed By

Team Aphelion — Code Kalesh Edition
Crafted for hackathons with clean UI & beautiful interactions.

⭐ If you like this project, consider giving it a star!

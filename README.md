# 🤖 AI Personal Assistant

A modern, full-stack AI Personal Assistant web application powered by **Groq API** (`openai/gpt-oss-120b`), built with a **React 19 + TypeScript** frontend and a **Python / Flask** backend API.

Features:
- **Ask Anything (Chat)** — Interactive AI assistant chat interface with real-time streaming-like responses.
- **Summarize Email** — Instant email condenser that distills long emails into concise 2–3 sentence summaries.
- **Floating Glassmorphism UI** — Custom pill navbar design system built with SCSS modules and responsive layout.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, SCSS Modules |
| **Backend** | Python 3, Flask, Gunicorn, Flask-CORS, python-dotenv |
| **AI Model** | Groq API (`openai/gpt-oss-120b`) |
| **Frontend Deployment** | **Vercel** |
| **Backend Deployment** | **Render** |

---

## 📁 Project Structure

```text
AI-Personal-Assistant/
├── backend/                  ← Python Flask API
│   ├── main.py               ← API Endpoints (/ask, /summarize) with CORS security
│   ├── requirements.txt      ← Dependencies (Flask, Groq, dotenv, CORS, Gunicorn)
│   ├── .env.example          ← Template environment variables
│   └── .env                  ← Environment variables (ignored by Git)
├── frontend/                 ← React + TypeScript SPA
│   ├── src/
│   │   ├── components/       ← Navbar, floating glass UI components
│   │   ├── pages/            ← ChatPage, SummarizePage
│   │   ├── styles/           ← SCSS design tokens & global styles
│   │   ├── App.tsx           ← React Router setup
│   │   └── main.tsx          ← SPA Entry point
│   ├── vercel.json           ← SPA routing config
│   ├── index.html            ← App HTML shell (Inter font)
│   ├── vite.config.ts        ← Dev proxy configuration
│   └── package.json          ← Frontend dependencies & build scripts
├── start.sh                  ← Local monorepo launcher script
├── vercel.json               ← Root Vercel deployment configuration
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **Python 3.9+**
- **Groq API Key** (Get a free key at [console.groq.com/keys](https://console.groq.com/keys))

---

### 2. Backend Setup (`venv`)

Navigate to the `backend` directory, create a virtual environment, activate it, and install dependencies:

#### Windows (PowerShell):
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

#### macOS / Linux:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

### 3. Environment Variables Configuration

Create a `.env` file inside the `backend/` directory based on `.env.example`:

```bash
# In backend/.env
GROQ_API_KEY=your_actual_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-120b
FLASK_DEBUG=true
ALLOWED_ORIGINS=http://localhost:5173
```

---

### 4. Run the Application

#### Option A: Running separately

**Backend Terminal:**
```bash
cd backend
python main.py
# Runs on http://localhost:5000
```

**Frontend Terminal:**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

#### Option B: Running with `start.sh` (Linux / macOS / Git Bash)
```bash
chmod +x start.sh
./start.sh
```

---

## 🌐 API Reference

### 1. Ask Anything Chat
- **Endpoint**: `POST /ask`
- **Body** (`multipart/form-data` or `x-www-form-urlencoded`):
  - `question`: String (Required)
- **Response**: `200 OK`
  ```json
  { "response": "AI generated answer..." }
  ```

### 2. Email Summarizer
- **Endpoint**: `POST /summarize`
- **Body**:
  - `email`: String (Required)
- **Response**: `200 OK`
  ```json
  { "response": "2-3 sentence email summary..." }
  ```

---

## ☁️ Deployment Guide

### 1. Backend Deployment (Render)

1. Log in to [Render](https://dashboard.render.com/) and click **New → Web Service**.
2. Connect your GitHub repository.
3. Set the following settings:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn main:app`
4. Add **Environment Variables** in Render Settings:
   - `GROQ_API_KEY` = `your_groq_api_key`
   - `GROQ_MODEL` = `openai/gpt-oss-120b`
   - `ALLOWED_ORIGINS` = `https://your-vercel-domain.vercel.app` (restricts API access to your frontend)
5. Click **Deploy**.

---

### 2. Frontend Deployment (Vercel)

1. Log in to [Vercel](https://vercel.com/) and import your repository.
2. Configure **Environment Variables** in Vercel Settings:
   - `VITE_API_BASE_URL` = `https://your-render-backend-url.onrender.com`
3. Configure **Build & Development Settings**:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

---

## 📜 License

MIT License — free to use and modify for personal and commercial projects.

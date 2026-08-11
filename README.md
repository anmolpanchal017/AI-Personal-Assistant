# 🤖 AI Personal Assistant

A modern, full-stack AI Personal Assistant web application powered by **Groq API** (`openai/gpt-oss-120b`), built with a **React 19 + TypeScript** frontend and a **Python / Flask** backend API.

Features:
- **Ask Anything (Chat)** — Interactive AI assistant chat interface with real-time responses.
- **Summarize Email** — Instant email condenser that distills long emails into concise 2–3 sentence summaries.
- **Floating Glassmorphism UI** — Custom pill navbar design system built with SCSS modules.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, SCSS Modules |
| **Backend** | Python 3, Flask, Flask-CORS, python-dotenv |
| **AI Model** | Groq API (`openai/gpt-oss-120b`) |
| **Monorepo Runner**| `start.sh` (Bash background process manager) |
| **Deployment** | Vercel (Production Serverless) & AWS (EC2 / App Runner / S3+CloudFront) |

---

## 📁 Project Structure

```text
AI-Personal-Assistant/
├── backend/                  ← Python Flask API
│   ├── main.py               ← API Endpoints (/ask, /summarize)
│   ├── requirements.txt      ← Dependencies (Flask, Groq, dotenv, CORS)
│   └── .env                  ← Environment variables (GROQ_API_KEY)
├── frontend/                 ← React + TypeScript SPA
│   ├── src/
│   │   ├── components/       ← Navbar, floating glass UI components
│   │   ├── pages/            ← ChatPage, SummarizePage
│   │   ├── styles/           ← SCSS design tokens & global styles
│   │   ├── App.tsx           ← React Router setup
│   │   └── main.tsx          ← SPA Entry point
│   ├── index.html            ← App HTML shell (Inter font)
│   ├── vite.config.ts        ← Dev proxy configuration
│   └── package.json          ← Frontend packages
├── start.sh                  ← One-command launcher script
├── vercel.json               ← Vercel build & route rewrites config
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **Python 3.9+**
- **Groq API Key** (Get a free key at [console.groq.com/keys](https://console.groq.com/keys))

---

### 2. Environment Setup

Create a `.env` file inside the `backend/` directory:

```bash
# In backend/.env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-120b
```

---

### 3. Install Dependencies

#### Install Backend Requirements:
```bash
cd backend
pip install -r requirements.txt
cd ..
```

#### Install Frontend Packages:
```bash
cd frontend
npm install
cd ..
```

---

### 4. Run Project with One Command

Run the [`start.sh`](./start.sh) script from the root directory:

```bash
chmod +x start.sh
./start.sh
```

This single command automatically starts:
- 🐍 **Flask Backend** at `http://localhost:5000`
- ⚡ **React Frontend** at `http://localhost:5173`

Press `Ctrl + C` in the terminal to cleanly shut down both backend and frontend processes.

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

### Option 1: Vercel (Recommended — Serverless)

The project includes a pre-configured [`vercel.json`](./vercel.json) file for zero-config Vercel deployment.

1. **Push your code** to GitHub / GitLab / Bitbucket.
2. Log into [Vercel](https://vercel.com/) and click **"New Project"**.
3. Import your repository.
4. Add Environment Variable in **Settings → Environment Variables**:
   - `GROQ_API_KEY` = `your_groq_api_key`
5. Click **Deploy**.

Vercel automatically executes `cd frontend && npm install && npm run build`, routes static assets from `frontend/dist`, and serves `/ask` and `/summarize` as serverless Python functions from `backend/main.py`.

---

### Option 2: AWS Deployment

#### Method A: AWS EC2 (Virtual Server with Nginx & Gunicorn)

1. **Launch EC2 Instance**:
   - Create an Ubuntu 22.04 LTS instance (e.g., `t3.micro` or `t3.small`).
   - Allow ports `80` (HTTP), `443` (HTTPS), and `22` (SSH) in Security Groups.

2. **Connect & Install Packages**:
   ```bash
   sudo apt update && sudo apt install -y python3-pip python3-venv nginx nodejs npm
   ```

3. **Clone & Setup App**:
   ```bash
   git clone https://github.com/your-username/AI-Personal-Assistant.git
   cd AI-Personal-Assistant
   
   # Setup Backend
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt gunicorn
   echo "GROQ_API_KEY=your_actual_key" > .env
   cd ..

   # Build Frontend
   cd frontend
   npm install
   npm run build
   cd ..
   ```

4. **Configure Systemd Service for Flask (Gunicorn)**:
   Create `/etc/systemd/system/flask-backend.service`:
   ```ini
   [Unit]
   Description=AI Personal Assistant Flask API
   After=network.target

   [Service]
   User=ubuntu
   WorkingDirectory=/home/ubuntu/AI-Personal-Assistant/backend
   Environment="PATH=/home/ubuntu/AI-Personal-Assistant/backend/venv/bin"
   ExecStart=/home/ubuntu/AI-Personal-Assistant/backend/venv/bin/gunicorn --bind 127.0.0.1:5000 main:app

   [Install]
   WantedBy=multi-user.target
   ```
   Start & enable service:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl start flask-backend
   sudo systemctl enable flask-backend
   ```

5. **Configure Nginx**:
   Update `/etc/nginx/sites-available/default`:
   ```nginx
   server {
       listen 80;
       server_name _;

       # Serve React Static Build
       location / {
           root /home/ubuntu/AI-Personal-Assistant/frontend/dist;
           try_files $uri $uri/ /index.html;
       }

       # Proxy API requests to Flask Backend
       location /ask {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }

       location /summarize {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```
   Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

---

#### Method B: AWS App Runner + S3 / Amplify
1. Push backend image or code repository to **AWS App Runner** providing `GROQ_API_KEY` in environment configuration.
2. Deploy frontend static build (`frontend/dist`) to **AWS S3 + CloudFront** or **AWS Amplify**.

---

## 📜 License

MIT License — free to use and modify for personal and commercial projects.

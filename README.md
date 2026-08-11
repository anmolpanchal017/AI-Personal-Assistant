# AI Personal Assistant (React + Flask + Groq)

A monorepo web app with two AI-powered features, using a **React + TypeScript** frontend and a **Flask** API backend, powered by an LLM through the Groq API:

- **Ask Anything** — a general-purpose chat assistant
- **Summarize Email** — condenses pasted email text into 2-3 sentences

## Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Frontend   | React 19, TypeScript, Vite, SCSS  |
| Backend    | Python / Flask                    |
| AI         | Groq API (`openai/gpt-oss-120b`) |
| Deployment | Vercel (static + serverless)      |

## Project Structure

```
AI-Personal-Assistant/
├── frontend/             ← React + Vite + TypeScript
│   ├── src/
│   │   ├── components/   ← Header, AskAnything, SummarizeEmail, Loader
│   │   ├── styles/       ← SCSS modules & design tokens
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── backend/              ← Flask JSON API
│   ├── main.py
│   └── requirements.txt
├── vercel.json
└── README.md
```

## Local Setup

### 1. Backend (Flask API)

```bash
cd backend
python -m venv venv
venv\Scripts\activate           # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt

# Create a .env file with your Groq API key
echo GROQ_API_KEY=your_key_here > .env

python main.py                  # Runs on http://127.0.0.1:5000
```

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev                     # Runs on http://localhost:5173
```

Open `http://localhost:5173` in your browser. The Vite dev proxy forwards `/ask` and `/summarize` to Flask automatically.

### Getting a Groq API Key

Get a free API key at [console.groq.com/keys](https://console.groq.com/keys).

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. In **Project Settings → Environment Variables**, add:
   - `GROQ_API_KEY` = your Groq API key
4. Deploy — `vercel.json` handles the build and routing automatically.

### Notes

- The frontend builds via `cd frontend && npm run build` (configured in `vercel.json`).
- API routes (`/ask`, `/summarize`) are rewritten to the Flask serverless function.
- All other routes serve the React SPA.
- `vercel.json` sets a 30-second function timeout for Flask routes.

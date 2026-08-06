# AI Personal Assistant (Flask + Groq)

A Flask web app with two features, powered by an LLM through the Groq API:
- **Ask Anything** — a general-purpose chat assistant
- **Summarize Email** — condenses pasted email text into 2-3 sentences

## Tech Stack
- Python / Flask
- Groq API (`openai/gpt-oss-120b`)
- HTML / CSS / vanilla JavaScript

## Local Setup

```bash
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env          # then paste your real GROQ_API_KEY into .env
python main.py
```

Visit `http://127.0.0.1:5000`.

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo. Vercel auto-detects the Flask app from `main.py`.
3. In **Project Settings → Environment Variables**, add:
   - `GROQ_API_KEY` = your Groq API key
4. Deploy.

No other configuration is needed — `vercel.json` and `requirements.txt` are already set up.

### Notes
- Static assets live in `public/` (not `static/`), since Vercel serves `public/**` directly from its CDN rather than through Flask's static file handler.
- `vercel.json` sets a 30-second function timeout for the `/ask` and `/summarize` routes, since LLM responses can take a few seconds. Vercel's Hobby (free) plan allows up to 60s.
- Get a free Groq API key at [console.groq.com/keys](https://console.groq.com/keys).

import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from groq import Groq

# Load environment variables from .env when running locally.
# On Vercel, environment variables are injected directly, so this is a no-op there.
load_dotenv()

# Flask is now a pure JSON API — the React frontend handles all UI rendering.
# No static_folder or template_folder is needed.
app = Flask(__name__)

# Allow CORS so the React dev server (localhost:5173) can call the API
# during local development. In production on Vercel, both frontend and
# backend share the same origin, so CORS headers are harmless but not required.
CORS(app)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
# llama-3.3-70b-versatile was deprecated by Groq (announced June 17, 2026) and
# no longer serves requests. openai/gpt-oss-120b is Groq's recommended
# replacement for that model.
MODEL_NAME = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")

client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None


def _missing_api_key_response():
    return (
        jsonify(
            {
                "error": "Server is missing GROQ_API_KEY. Set it in your .env "
                "file locally, or in your Vercel project's Environment "
                "Variables settings."
            }
        ),
        500,
    )


@app.route("/ask", methods=["POST"])
def ask():
    if client is None:
        return _missing_api_key_response()

    question = (request.form.get("question") or "").strip()
    if not question:
        return jsonify({"error": "Please type a question before submitting."}), 400

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "Act like a helpful personal assistant"},
                {"role": "user", "content": question},
            ],
            temperature=0.7,
            max_tokens=512,
        )
        answer = response.choices[0].message.content
        return jsonify({"response": answer}), 200
    except Exception as exc:  # noqa: BLE001 - surface a clean error to the client
        app.logger.exception("Groq API call failed in /ask")
        return jsonify({"error": f"AI request failed: {exc}"}), 502


@app.route("/summarize", methods=["POST"])
def summarize():
    if client is None:
        return _missing_api_key_response()

    email_text = (request.form.get("email") or "").strip()
    if not email_text:
        return jsonify({"error": "Please paste an email before submitting."}), 400

    prompt = f"Summarize the following email in 2-3 sentences:\n\n{email_text}"

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "Act like an expert email assistant"},
                {"role": "user", "content": prompt},
            ],
            temperature=0.3,
            max_tokens=512,
        )
        summary = response.choices[0].message.content
        return jsonify({"response": summary}), 200
    except Exception as exc:  # noqa: BLE001
        app.logger.exception("Groq API call failed in /summarize")
        return jsonify({"error": f"AI request failed: {exc}"}), 502


if __name__ == "__main__":
    # Debug mode is controlled by an env var so it can never accidentally
    # ship "on" to production. Vercel never runs this block at all - it
    # imports `app` directly - so this only affects local `python main.py` runs.
    debug_mode = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=debug_mode)

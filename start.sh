#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "Starting AI Personal Assistant..."
echo "  Backend  -> http://localhost:5000"
echo "  Frontend -> http://localhost:5173"
echo ""

cd "$ROOT/backend"
python main.py &
BACKEND_PID=$!

cd "$ROOT/frontend"
npm run dev &
FRONTEND_PID=$!

cleanup() {
  echo ""
  echo "Stopping AI Personal Assistant background services..."
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

wait

#!/bin/bash

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_DIR="$ROOT_DIR/.pids"

echo "============================================================"
echo " Stopping Vidya-Sampadana Spring Boot Microservice Stack"
echo "============================================================"

SERVICES=(
  "about-us-service"
  "neet-updates"
  "notification-service"
  "user-service"
  "iamservice"
  "chat-service"
  "payment-service"
  "kcet-updates"
  "student-service"
  "api-gateway"
  "service-registry"
)

for svc in "${SERVICES[@]}"; do
  pid_file="$PID_DIR/$svc.pid"
  if [ -f "$pid_file" ]; then
    pid="$(cat "$pid_file")"
    if kill -0 "$pid" 2>/dev/null; then
      echo "[STOP] Stopping $svc (PID $pid)..."
      kill "$pid" 2>/dev/null || true
    fi
    rm -f "$pid_file"
  fi
done

echo "All tracked Spring Boot services stopped."

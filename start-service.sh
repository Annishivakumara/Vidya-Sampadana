#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$ROOT_DIR/logs"
PID_DIR="$ROOT_DIR/.pids"

mkdir -p "$LOG_DIR" "$PID_DIR"

echo "============================================================"
echo " Starting Vidya-Sampadana Spring Boot Microservice Stack"
echo "============================================================"

run_service() {
  local svc_dir="$1"
  local svc_port="$2"
  echo "[START] $svc_dir (port $svc_port)..."
  (
    cd "$ROOT_DIR/$svc_dir"
    if [ -x "./mvnw" ]; then
      nohup ./mvnw spring-boot:run > "$LOG_DIR/$svc_dir.log" 2>&1 &
    else
      nohup mvn spring-boot:run > "$LOG_DIR/$svc_dir.log" 2>&1 &
    fi
    echo $! > "$PID_DIR/$svc_dir.pid"
  )
}

# 1. Start Eureka Service Registry first (8761)
run_service "service-registry" "8761"
sleep 8

# 2. Start API Gateway (8080)
run_service "api-gateway" "8080"
sleep 5

# 3. Start Domain Microservices
run_service "student-service" "8082"
run_service "kcet-updates" "8083"
run_service "payment-service" "8084"
run_service "chat-service" "8085"
run_service "iamservice" "8086"
run_service "user-service" "8087"
run_service "notification-service" "8088"
run_service "neet-updates" "8089"
run_service "about-us-service" "8090"

echo "============================================================"
echo " All 11 Spring Boot microservices launched."
echo " Logs: $LOG_DIR/*.log"
echo " PIDs: $PID_DIR/*.pid"
echo "============================================================"

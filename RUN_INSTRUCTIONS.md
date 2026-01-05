# 🚀 Vidya-Sampadana - Setup & Run Instructions

A comprehensive guide to set up, build, and run the **Vidya-Sampadana** microservices-based school management platform locally and in production.

---

## 📚 Table of Contents

- [⚙️ Prerequisites](#prerequisites)
- [🔧 Local Development Setup](#local-development-setup)
- [🐳 Docker Setup](#docker-setup)
- [🏃 Running Individual Services](#running-individual-services)
- [🌐 Frontend Setup](#frontend-setup)
- [✅ Verification Checklist](#verification-checklist)
- [🐛 Troubleshooting](#troubleshooting)
- [🌍 Production Deployment](#production-deployment)

---

## ⚙️ Prerequisites

### Required Software

Before you begin, ensure you have the following installed:

#### **1. Java 17+ (JDK)**

**Windows:**
```bash
# Download from: https://www.oracle.com/java/technologies/downloads/
# OR using Chocolatey:
choco install openjdk17

# Verify installation
java -version
javac -version
```

**macOS:**
```bash
# Using Homebrew:
brew install openjdk@17

# Verify installation
java -version
javac -version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install openjdk-17-jdk

# Verify installation
java -version
javac -version
```

#### **2. Maven 3.8+**

**Windows:**
```bash
# Download from: https://maven.apache.org/download.cgi
# Extract to: C:\Program Files\Apache\maven
# Add to PATH: C:\Program Files\Apache\maven\bin

# Verify installation
mvn -version
```

**macOS:**
```bash
brew install maven

# Verify installation
mvn -version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install maven

# Verify installation
mvn -version
```

#### **3. Git**

**Windows:**
```bash
# Download from: https://git-scm.com/download/win
# Follow installer

# Verify installation
git --version
```

**macOS:**
```bash
brew install git

# Verify installation
git --version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install git

# Verify installation
git --version
```

#### **4. Docker & Docker Compose**

**Download from:** https://www.docker.com/products/docker-desktop

**Windows & macOS:**
```bash
# Download Docker Desktop and install
# Docker Desktop includes Docker Compose

# Verify installation
docker --version
docker-compose --version
```

**Linux (Ubuntu/Debian):**
```bash
# Install Docker
sudo apt update
sudo apt install docker.io docker-compose

# Add user to docker group (avoid using sudo)
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker-compose --version
```

#### **5. Node.js 16+ (For Frontend)**

**Windows:**
```bash
# Download from: https://nodejs.org/
# OR using Chocolatey:
choco install nodejs

# Verify installation
node --version
npm --version
```

**macOS:**
```bash
brew install node

# Verify installation
node --version
npm --version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

#### **6. IDE (Recommended)**

- **IntelliJ IDEA** - Best for Spring Boot projects
  - Download: https://www.jetbrains.com/idea/
  - Community Edition is free!
  
- **VS Code** - Good for frontend and quick edits
  - Download: https://code.visualstudio.com/

---

## 🔧 Local Development Setup

### Step 1: Clone the Repository

```bash
# Navigate to your desired directory
cd C:\projects\
# or
cd ~/projects/

# Clone the repository
git clone https://github.com/YOUR_USERNAME/vidya-sampadana.git

# Navigate into project
cd vidya-sampadana

# Verify structure
ls  # macOS/Linux
dir # Windows
```

**Expected output:**
```
student-service/
course-service/
mentor-service/
user-service/
payment-service/
notification-service/
frontend/
docker-compose.yml
README.md
```

### Step 2: Verify Java & Maven Installation

```bash
# Check Java version (should be 17+)
java -version

# Check Maven version (should be 3.8+)
mvn -version

# Output should show:
# Apache Maven 3.8.x
# Java version: 17.x.x
```

### Step 3: Start Databases (Docker)

```bash
# Navigate to project root
cd vidya-sampadana

# Start MySQL and MongoDB containers
docker-compose up -d mysql mongodb redis

# Verify containers are running
docker-compose ps

# Expected output:
# CONTAINER ID   IMAGE       STATUS      PORTS
# xxxxx          mysql:8.0   Up 2 mins   3306->3306/tcp
# xxxxx          mongo:5.0   Up 2 mins   27017->27017/tcp
# xxxxx          redis:6.0   Up 2 mins   6379->6379/tcp
```

**Verify database connections:**

```bash
# MySQL - Open new terminal
mysql -h 127.0.0.1 -u root -proot

# Type in MySQL prompt:
SHOW DATABASES;

# MongoDB - Open new terminal
mongosh mongodb://localhost:27017

# Type in MongoDB prompt:
show databases
```

---

## 🏃 Running Individual Services

### 🎓 **Student Service** (Port 8001)

```bash
# Navigate to student-service
cd student-service

# Build the project
mvn clean install

# Run the service (Option 1 - Maven)
mvn spring-boot:run

# OR Run as JAR (Option 2)
# First package it:
mvn package
# Then run:
java -jar target/student-service-1.0.0.jar

# Expected output:
# Started StudentServiceApplication in X.XXX seconds
# Tomcat started on port(s): 8001 (http)
```

**Verify Student Service is running:**

```bash
# Open browser or use curl:
curl http://localhost:8001/api/students

# Or visit in browser:
http://localhost:8001/swagger-ui.html

# Expected: Swagger UI loads OR API returns student list (empty initially)
```

### 📚 **Course Service** (Port 8002)

```bash
# In a NEW terminal window:
cd course-service

# Build and run
mvn clean install
mvn spring-boot:run

# Expected output:
# Started CourseServiceApplication in X.XXX seconds
# Tomcat started on port(s): 8002 (http)

# Verify:
curl http://localhost:8002/api/courses
```

### 👨‍🏫 **Mentor Service** (Port 8003)

```bash
# In a NEW terminal window:
cd mentor-service

# Build and run
mvn clean install
mvn spring-boot:run

# Verify:
curl http://localhost:8003/api/mentors
```

### 👥 **User Service** (Port 8004)

```bash
# In a NEW terminal window:
cd user-service

# Build and run
mvn clean install
mvn spring-boot:run

# Verify:
curl http://localhost:8004/api/users
```

### 💳 **Payment Service** (Port 8005)

```bash
# In a NEW terminal window:
cd payment-service

# Build and run
mvn clean install
mvn spring-boot:run

# Verify:
curl http://localhost:8005/api/payments
```

### 🔔 **Notification Service** (Port 8006)

```bash
# In a NEW terminal window:
cd notification-service

# Build and run
mvn clean install
mvn spring-boot:run

# Verify:
curl http://localhost:8006/api/notifications
```

---

## 🌐 Frontend Setup

### Option 1: Simple HTML/CSS/JavaScript (No Build)

```bash
# Navigate to frontend
cd frontend

# Option A: Open directly in browser
# Just open frontend/index.html in your browser

# Option B: Use VS Code Live Server
# 1. Install "Live Server" extension in VS Code
# 2. Right-click on index.html
# 3. Click "Open with Live Server"
# 4. Browser opens at http://localhost:5500

# Option C: Use Python server (if installed)
python -m http.server 8080
# Access at http://localhost:8080

# Option D: Use Node.js http-server
npm install -g http-server
http-server -p 8080
# Access at http://localhost:8080
```

### Option 2: React (For Future Migration)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Expected output:
# webpack compiled with X warnings
# Compiled successfully!
# On Your Network: http://192.168.x.x:3000
# Local: http://localhost:3000

# Access at http://localhost:3000
```

### Update API URLs in Frontend

Before testing, update the API base URL to match your backend:

**File:** `frontend/js/api/config.js`

```javascript
// Update to match your local services
const API_CONFIG = {
  development: {
    STUDENT_SERVICE: 'http://localhost:8001/api',
    COURSE_SERVICE: 'http://localhost:8002/api',
    MENTOR_SERVICE: 'http://localhost:8003/api',
    USER_SERVICE: 'http://localhost:8004/api',
    PAYMENT_SERVICE: 'http://localhost:8005/api',
  },
  production: {
    BASE_URL: 'https://api.vidyasampadana.com/api',
  }
};
```

---

## 🐳 Docker Setup

### Run All Services with Docker Compose

**Option 1: Start Everything**

```bash
# Navigate to project root
cd vidya-sampadana

# Start all services (databases + backend services)
docker-compose up

# This runs in foreground - you see all logs
# Press Ctrl+C to stop all services
```

**Option 2: Start in Background**

```bash
# Start all services in background
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f student-service

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

**Verify all services are running:**

```bash
docker-compose ps

# Expected output:
# CONTAINER ID   IMAGE                    STATUS      PORTS
# xxxxx          vidya-sampadana-student  Up 2 mins   0.0.0.0:8001->8001/tcp
# xxxxx          vidya-sampadana-course   Up 2 mins   0.0.0.0:8002->8002/tcp
# xxxxx          vidya-sampadana-mentor   Up 2 mins   0.0.0.0:8003->8003/tcp
# xxxxx          mysql:8.0                Up 2 mins   0.0.0.0:3306->3306/tcp
# xxxxx          mongo:5.0                Up 2 mins   0.0.0.0:27017->27017/tcp
# xxxxx          redis:6.0                Up 2 mins   0.0.0.0:6379->6379/tcp
```

### Custom Docker Compose for Production

```bash
# Use production docker-compose file
docker-compose -f docker-compose.prod.yml up -d

# Check services
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

---

## ✅ Verification Checklist

After starting all services, verify everything is working:

### Databases

```bash
# MySQL Test
mysql -h 127.0.0.1 -u root -proot -e "SHOW DATABASES;"

# Expected output: information_schema, mysql, performance_schema, vidya_sampadana

# MongoDB Test
mongosh mongodb://localhost:27017 --eval "db.adminCommand('ping')"

# Expected output: { ok: 1 }

# Redis Test
redis-cli ping

# Expected output: PONG
```

### Backend Services

Test each service:

```bash
# Student Service
curl -X GET http://localhost:8001/api/students

# Course Service
curl -X GET http://localhost:8002/api/courses

# Mentor Service
curl -X GET http://localhost:8003/api/mentors

# User Service
curl -X GET http://localhost:8004/api/users

# Payment Service
curl -X GET http://localhost:8005/api/payments

# Notification Service
curl -X GET http://localhost:8006/api/notifications

# Expected response: Empty array [] or 200 OK status
```

### Swagger UI (API Documentation)

Visit in browser:

```
http://localhost:8001/swagger-ui.html  → Student Service
http://localhost:8002/swagger-ui.html  → Course Service
http://localhost:8003/swagger-ui.html  → Mentor Service
http://localhost:8004/swagger-ui.html  → User Service
http://localhost:8005/swagger-ui.html  → Payment Service
http://localhost:8006/swagger-ui.html  → Notification Service
```

### Frontend

```bash
# Simple HTML version
http://localhost:5500  # If using Live Server
http://localhost:8080  # If using http-server
http://localhost:3000  # If using React

# You should see:
# ✓ Navigation bar with logo
# ✓ "Add Student" button
# ✓ Students table (empty)
# ✓ Search bar
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Problem: Port 8001 is already in use
# Solution 1: Kill process using that port

# Windows:
netstat -ano | findstr :8001
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :8001
kill -9 <PID>

# Solution 2: Change port in application.properties
# Edit: student-service/src/main/resources/application.properties
server.port=8011  # Use different port
```

### MySQL Connection Error

```bash
# Problem: Can't connect to MySQL
# Error: Connection refused

# Solution 1: Start MySQL with Docker
docker-compose up -d mysql

# Solution 2: Verify MySQL is running
docker-compose ps mysql

# Solution 3: Check MySQL logs
docker-compose logs mysql

# Solution 4: Rebuild MySQL container
docker-compose rm mysql
docker-compose up -d mysql

# Wait 30 seconds for MySQL to start
sleep 30
```

### MongoDB Connection Error

```bash
# Problem: Can't connect to MongoDB

# Solution 1: Start MongoDB with Docker
docker-compose up -d mongodb

# Solution 2: Verify MongoDB is running
docker-compose ps mongodb

# Solution 3: Check logs
docker-compose logs mongodb

# Solution 4: Test MongoDB connection
mongosh mongodb://localhost:27017
```

### Build Fails (Maven Error)

```bash
# Problem: "BUILD FAILURE"

# Solution 1: Clean and rebuild
mvn clean install -DskipTests

# Solution 2: Clear Maven cache
rm -rf ~/.m2/repository

# Then rebuild:
mvn clean install

# Solution 3: Check Java version
java -version
# Must be 17 or higher

# Solution 4: Update Maven
mvn --version
# Should be 3.8+
```

### Frontend Not Loading

```bash
# Problem: Frontend shows blank page or 404

# Solution 1: Ensure you're in frontend folder
cd frontend

# Solution 2: Try different server options
# Option A: Live Server in VS Code
# Option B: Python server
python -m http.server 8080

# Option C: Node server
npx http-server -p 8080

# Solution 3: Check browser console for errors
# Press F12 in browser → Console tab
# Look for red error messages
```

### API Returns 404

```bash
# Problem: curl http://localhost:8001/api/students returns 404

# Solution 1: Verify service is running
# Should see in terminal: "Tomcat started on port(s): 8001"

# Solution 2: Check application.properties
# File: student-service/src/main/resources/application.properties
# Should have: server.port=8001

# Solution 3: Check if Spring Boot started correctly
# Look for: "Started StudentServiceApplication"

# Solution 4: Verify database is running
docker-compose ps
```

---

## 🌍 Production Deployment

### Deploy with Kubernetes

```bash
# Prerequisites
# 1. Kubernetes cluster (AWS EKS, Google GKE, etc.)
# 2. kubectl installed
# 3. Docker images pushed to registry

# Apply manifests
kubectl apply -f kubernetes/

# Check deployments
kubectl get deployments
kubectl get services
kubectl get pods

# View logs
kubectl logs -f deployment/student-service

# Scale a service
kubectl scale deployment/student-service --replicas=3

# Update a service
kubectl set image deployment/student-service \
  student-service=yourusername/student-service:v1.1.0
```

### Deploy to AWS

```bash
# Using ECS (Elastic Container Service)
# 1. Push images to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin YOUR_ECR_URI

docker tag student-service:latest YOUR_ECR_URI/student-service:latest
docker push YOUR_ECR_URI/student-service:latest

# 2. Create ECS tasks and services
# 3. Setup load balancer
# 4. Configure auto-scaling
```

### Environment Variables for Production

Create `.env.production`:

```bash
# Database
DB_HOST=prod-mysql.example.com
DB_PORT=3306
DB_NAME=vidya_sampadana_prod
DB_USER=produser
DB_PASSWORD=secure_password_here

MONGO_HOST=prod-mongodb.example.com
MONGO_PORT=27017
MONGO_DB=vidya_sampadana_prod

# Redis
REDIS_HOST=prod-redis.example.com
REDIS_PORT=6379

# API Gateway
API_GATEWAY_URL=https://api.vidyasampadana.com

# Security
JWT_SECRET=your_jwt_secret_key
CORS_ALLOWED_ORIGINS=https://vidyasampadana.com

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=notifications@vidyasampadana.com
SMTP_PASSWORD=email_password

# Payment Gateway
PAYMENT_API_KEY=stripe_api_key_here
PAYMENT_SECRET=stripe_webhook_secret
```

---

## 📋 Quick Reference Commands

```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f

# Build student-service
cd student-service && mvn clean install && mvn spring-boot:run

# Build course-service
cd course-service && mvn clean install && mvn spring-boot:run

# Test API
curl http://localhost:8001/api/students

# Check running services
docker-compose ps

# View database
mysql -h 127.0.0.1 -u root -proot
mongosh mongodb://localhost:27017

# Clean all (careful!)
docker-compose down -v
```

---

## 📞 Need Help?

- **GitHub Issues**: https://github.com/YOUR_USERNAME/vidya-sampadana/issues
- **Documentation**: See [README.md](./README.md)
- **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Email**: support@vidyasampadana.com

---

## ✅ Summary Checklist

- [ ] Java 17+ installed and verified
- [ ] Maven 3.8+ installed and verified
- [ ] Git installed
- [ ] Docker & Docker Compose installed
- [ ] Repository cloned
- [ ] Databases started (MySQL, MongoDB, Redis)
- [ ] Student Service running on port 8001
- [ ] Course Service running on port 8002
- [ ] Mentor Service running on port 8003
- [ ] Frontend accessible at http://localhost:5500 or :3000
- [ ] All services verified with curl commands
- [ ] Swagger UI loaded successfully
- [ ] Ready to start development! 🚀

---

**Happy Coding!** 🎉

For step-by-step troubleshooting, check the [Troubleshooting](#troubleshooting) section above.

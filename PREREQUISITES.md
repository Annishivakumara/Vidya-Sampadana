# ⚙️ Vidya-Sampadana - Complete Prerequisites Guide

A detailed, step-by-step guide to install all required software for **Vidya-Sampadana** development on Windows, macOS, and Linux.

---

## 📚 Table of Contents

- [🎯 Overview](#overview)
- [1️⃣ Java 17+ (JDK)](#java-17-jdk)
- [2️⃣ Maven 3.8+](#maven-38)
- [3️⃣ Git](#git)
- [4️⃣ Docker & Docker Compose](#docker--docker-compose)
- [5️⃣ Node.js 16+ (Frontend)](#nodejs-16-frontend)
- [6️⃣ IDE (Recommended)](#ide-recommended)
- [7️⃣ Postman (API Testing)](#postman-api-testing)
- [✅ Verification Steps](#verification-steps)
- [🐛 Installation Troubleshooting](#installation-troubleshooting)
- [📋 Complete Checklist](#complete-checklist)

---

## 🎯 Overview

| Software | Version | Purpose | Link |
|----------|---------|---------|------|
| **Java (JDK)** | 17+ | Backend development | https://www.oracle.com/java/ |
| **Maven** | 3.8+ | Build automation | https://maven.apache.org/ |
| **Git** | Latest | Version control | https://git-scm.com/ |
| **Docker** | Latest | Containerization | https://www.docker.com/ |
| **Docker Compose** | Latest | Multi-container orchestration | https://docs.docker.com/compose/ |
| **Node.js** | 16+ | Frontend runtime | https://nodejs.org/ |
| **IntelliJ IDEA** | Latest | IDE (Optional) | https://www.jetbrains.com/idea/ |

---

## 1️⃣ Java 17+ (JDK)

### Why Java?
- Required for Spring Boot microservices development
- Vidya-Sampadana is built on Java 17+
- Long-term support (LTS) release with security updates

### Windows Installation

#### **Option A: Using Oracle JDK (Recommended)**

```bash
# Step 1: Download
# Visit: https://www.oracle.com/java/technologies/downloads/
# Select: Java SE 17 LTS (or latest)
# Download: Windows x64 Installer

# Step 2: Run installer
# Double-click: jdk-17_windows-x64_bin.exe
# Follow installation wizard
# Default path: C:\Program Files\Java\jdk-17.x.x

# Step 3: Add to PATH (Environment Variables)
# Windows Key + R → Type "sysdm.cpl" → Press Enter
# Click "Environment Variables" button
# System variables → Click "Path" → Edit
# Click "New" → Add: C:\Program Files\Java\jdk-17.x.x\bin
# Click OK → Apply

# Step 4: Verify installation
java -version
javac -version

# Expected output:
# java version "17.x.x" LTS
# Java(TM) SE Runtime Environment (build 17.x.x+X)
# Java HotSpot(TM) 64-Bit Server VM (build 17.x.x+X, mixed mode, sharing)
```

#### **Option B: Using Chocolatey**

```bash
# Prerequisites: Chocolatey must be installed
# If not installed, visit: https://chocolatey.org/install

# Install Java
choco install openjdk17

# Verify
java -version
javac -version
```

#### **Option C: Using Windows Subsystem for Linux (WSL2)**

```bash
# Install WSL2 first
# Then use Linux instructions below
```

### macOS Installation

#### **Option A: Using Homebrew (Recommended)**

```bash
# Step 1: Ensure Homebrew is installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Step 2: Install Java 17
brew install openjdk@17

# Step 3: Add to PATH (add to ~/.zshrc or ~/.bash_profile)
# For Apple Silicon (M1/M2):
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# For Intel Mac:
echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile

# Step 4: Verify
java -version
javac -version
```

#### **Option B: Using Oracle JDK**

```bash
# Download from: https://www.oracle.com/java/technologies/downloads/
# Select: macOS Installer
# Double-click installer and follow wizard

# Verify
java -version
```

### Linux Installation (Ubuntu/Debian)

```bash
# Step 1: Update package manager
sudo apt update

# Step 2: Install Java 17
sudo apt install openjdk-17-jdk

# Step 3: Verify
java -version
javac -version

# Expected output:
# openjdk version "17.x.x"
# OpenJDK Runtime Environment (build 17.x.x+x-Ubuntu-0ubuntu0.xx.04)
# OpenJDK 64-Bit Server VM (build 17.x.x+x-Ubuntu-0ubuntu0.xx.04, mixed mode, sharing)

# Step 4: Set JAVA_HOME (optional but recommended)
echo "export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64" >> ~/.bashrc
source ~/.bashrc

# Verify
echo $JAVA_HOME
```

### Verify Java Installation

```bash
# Check Java version
java -version

# Check compiler version
javac -version

# Check JAVA_HOME
echo $JAVA_HOME  # macOS/Linux
echo %JAVA_HOME% # Windows

# Expected: Path to your Java installation
```

---

## 2️⃣ Maven 3.8+

### Why Maven?
- Build automation tool for Java projects
- Manages dependencies
- Used by all Vidya-Sampadana backend services

### Windows Installation

#### **Option A: Manual Installation (Recommended)**

```bash
# Step 1: Download Maven
# Visit: https://maven.apache.org/download.cgi
# Download: apache-maven-3.9.x-bin.zip

# Step 2: Extract
# Extract to: C:\Program Files\Apache\maven-3.9.x
# Rename folder to: C:\Program Files\Apache\maven (optional)

# Step 3: Add to PATH
# Windows Key + R → Type "sysdm.cpl" → Press Enter
# Click "Environment Variables"
# System variables → Click "Path" → Edit
# Click "New" → Add: C:\Program Files\Apache\maven\bin
# Click OK → Apply

# Step 4: Verify
mvn -version

# Expected output:
# Apache Maven 3.9.x
# Maven home: C:\Program Files\Apache\maven
# Java version: 17.x.x
```

#### **Option B: Using Chocolatey**

```bash
choco install maven

# Verify
mvn -version
```

### macOS Installation

#### **Option A: Using Homebrew (Recommended)**

```bash
# Install Maven
brew install maven

# Verify
mvn -version

# Expected output:
# Apache Maven 3.9.x
# Maven home: /usr/local/Cellar/maven/3.9.x/libexec
# Java version: 17.x.x
```

#### **Option B: Manual Installation**

```bash
# Download from: https://maven.apache.org/download.cgi
# Extract to: ~/apache-maven-3.9.x

# Add to PATH (~/.zshrc or ~/.bash_profile)
echo "export M2_HOME=~/apache-maven-3.9.x" >> ~/.zshrc
echo "export PATH=$M2_HOME/bin:$PATH" >> ~/.zshrc
source ~/.zshrc

# Verify
mvn -version
```

### Linux Installation (Ubuntu/Debian)

```bash
# Update package manager
sudo apt update

# Install Maven
sudo apt install maven

# Verify
mvn -version

# Expected output:
# Apache Maven 3.9.x
# Java version: 17.x.x
```

### Configure Maven (Optional)

```bash
# Edit Maven settings (optional, for corporate proxies)
# Windows: C:\Users\<YOUR_USERNAME>\.m2\settings.xml
# macOS/Linux: ~/.m2/settings.xml

# For standard setup, this is usually not needed
```

---

## 3️⃣ Git

### Why Git?
- Version control system
- Clone Vidya-Sampadana repository
- Push code to GitHub

### Windows Installation

```bash
# Step 1: Download
# Visit: https://git-scm.com/download/win
# Download: Git installer

# Step 2: Run installer
# Double-click: Git-2.x.x-64-bit.exe
# Follow wizard (default settings are fine)

# Step 3: Verify
git --version

# Expected output:
# git version 2.x.x.windows.x
```

### macOS Installation

#### **Option A: Using Homebrew**

```bash
brew install git

# Verify
git --version
```

#### **Option B: Using Xcode Command Line Tools**

```bash
# Install Xcode CLI
xcode-select --install

# Verify
git --version
```

### Linux Installation (Ubuntu/Debian)

```bash
# Update package manager
sudo apt update

# Install Git
sudo apt install git

# Verify
git --version

# Expected output:
# git version 2.x.x
```

### Configure Git (Recommended)

```bash
# Set global username
git config --global user.name "Your Name"

# Set global email
git config --global user.email "your.email@example.com"

# Verify
git config --list

# Optional: Setup SSH key for GitHub
ssh-keygen -t ed25519 -C "your.email@example.com"
# Then add public key to GitHub Settings → SSH Keys
```

---

## 4️⃣ Docker & Docker Compose

### Why Docker?
- Run databases (MySQL, MongoDB, Redis) locally
- Containerize microservices
- Consistent development environment

### Windows Installation

#### **Step 1: Download Docker Desktop**

```bash
# Visit: https://www.docker.com/products/docker-desktop
# Download: Docker Desktop for Windows

# Requirements:
# - Windows 10/11 Pro, Enterprise, or Education
# - WSL 2 (Windows Subsystem for Linux 2) enabled
```

#### **Step 2: Enable WSL 2**

```bash
# Open PowerShell as Administrator and run:
wsl --install

# Restart your computer

# Verify WSL 2
wsl --list --verbose
# Should show: * Ubuntu 22.04 Running 2
```

#### **Step 3: Install Docker Desktop**

```bash
# Run the Docker Desktop installer
# Follow wizard
# Default settings are fine

# After installation, restart computer
```

#### **Step 4: Verify Installation**

```bash
# Open PowerShell or Command Prompt
docker --version
docker-compose --version

# Expected output:
# Docker version 24.x.x
# Docker Compose version 2.x.x
```

### macOS Installation

#### **Step 1: Download Docker Desktop**

```bash
# Visit: https://www.docker.com/products/docker-desktop
# Download: Docker Desktop for Mac

# For Intel Macs: Docker Desktop for Mac with Intel chip
# For Apple Silicon (M1/M2): Docker Desktop for Mac with Apple Silicon
```

#### **Step 2: Install**

```bash
# Drag Docker icon to Applications folder
# Open Applications → Double-click Docker.app
# Enter password when prompted

# Allow Docker to be added to PATH
```

#### **Step 3: Verify**

```bash
docker --version
docker-compose --version

# Expected:
# Docker version 24.x.x
# Docker Compose version 2.x.x
```

### Linux Installation (Ubuntu/Debian)

```bash
# Step 1: Update package manager
sudo apt update

# Step 2: Install Docker
sudo apt install docker.io docker-compose

# Step 3: Add your user to docker group (avoid sudo)
sudo usermod -aG docker $USER
newgrp docker

# Step 4: Start Docker service
sudo systemctl start docker
sudo systemctl enable docker  # Start on boot

# Step 5: Verify
docker --version
docker-compose --version

# Expected:
# Docker version 24.x.x
# Docker Compose version 2.x.x
```

### Test Docker Installation

```bash
# Run test container
docker run hello-world

# Expected output:
# Hello from Docker!
# This message shows that your installation appears to be working correctly.

# Clean up
docker rm <container_id>
```

---

## 5️⃣ Node.js 16+ (Frontend)

### Why Node.js?
- Required for frontend development
- npm for managing JavaScript dependencies
- Needed for React (future migration)

### Windows Installation

#### **Option A: Using Installer (Recommended)**

```bash
# Step 1: Download
# Visit: https://nodejs.org/
# Download: LTS version (16+ or latest)

# Step 2: Run installer
# Double-click: node-v18.x.x-x64.msi
# Follow wizard

# Step 3: Verify
node --version
npm --version

# Expected output:
# v18.x.x (or higher)
# 9.x.x (or higher)
```

#### **Option B: Using Chocolatey**

```bash
choco install nodejs

# Verify
node --version
npm --version
```

### macOS Installation

#### **Option A: Using Homebrew**

```bash
brew install node

# Verify
node --version
npm --version
```

#### **Option B: Using Installer**

```bash
# Download from: https://nodejs.org/
# Run installer and follow wizard

# Verify
node --version
npm --version
```

### Linux Installation (Ubuntu/Debian)

```bash
# Step 1: Update package manager
sudo apt update

# Step 2: Install Node.js and npm
sudo apt install nodejs npm

# Step 3: Verify
node --version
npm --version

# Expected output:
# v18.x.x (or higher)
# 9.x.x (or higher)

# Optional: Install latest npm
sudo npm install -g npm@latest
```

### Update npm (Optional)

```bash
# Update npm to latest version
npm install -g npm@latest

# Verify
npm -version
```

---

## 6️⃣ IDE (Recommended)

### Option A: IntelliJ IDEA (Best for Backend)

```bash
# Download Community Edition (Free!)
# Visit: https://www.jetbrains.com/idea/download/

# Select your OS (Windows/macOS/Linux)
# Install and run

# Advantages:
# ✅ Best Spring Boot support
# ✅ Excellent debugging
# ✅ Great refactoring tools
# ✅ Built-in Git integration
# ✅ Free Community Edition
```

#### **First Launch Setup**

```bash
# 1. Install Git integration
#    File → Settings → Plugins → Search "Git"

# 2. Configure Java SDK
#    File → Project Structure → SDK
#    Select Java 17

# 3. Import Maven projects
#    File → Open → Select pom.xml
#    Click "Open as Project"
```

### Option B: VS Code (Good for Frontend & Quick Edits)

```bash
# Download: https://code.visualstudio.com/

# Essential Extensions to install:
# 1. Extension Pack for Java (Microsoft)
# 2. Spring Boot Extension Pack (Vmware)
# 3. Live Server (Ritwick Dey) - for frontend
# 4. Thunder Client (Ranga) - API testing

# Setup:
# Ctrl+Shift+X → Search extension → Click Install
```

### Option C: Eclipse

```bash
# Download Eclipse IDE for Enterprise Java Developers
# Visit: https://www.eclipse.org/downloads/

# Note: Less recommended than IntelliJ or VS Code
```

---

## 7️⃣ Postman (API Testing)

### Why Postman?
- Test backend APIs
- Verify responses
- Save API collections

### Installation

```bash
# Download: https://www.postman.com/downloads/

# Choose your OS (Windows/macOS/Linux)

# Installation steps vary by OS, but generally:
# 1. Run installer
# 2. Create Postman account (free)
# 3. Launch Postman
```

### Basic Usage

```bash
# Test Student Service API:
# 1. Open Postman
# 2. Method: GET
# 3. URL: http://localhost:8001/api/students
# 4. Click "Send"
# 5. View response
```

---

## ✅ Verification Steps

### Verify All Prerequisites

```bash
# Java
java -version
javac -version

# Maven
mvn -version

# Git
git --version

# Docker
docker --version
docker-compose --version

# Node.js
node --version
npm --version

# All should show versions without errors!
```

### Create Test Script (Optional)

**Windows (test-prerequisites.bat):**

```batch
@echo off
echo === Checking Prerequisites ===
echo.
echo Java:
java -version
echo.
echo Maven:
mvn -version
echo.
echo Git:
git --version
echo.
echo Docker:
docker --version
docker-compose --version
echo.
echo Node.js:
node --version
npm --version
echo.
echo === All checks complete ===
```

**macOS/Linux (test-prerequisites.sh):**

```bash
#!/bin/bash
echo "=== Checking Prerequisites ==="
echo ""
echo "Java:"
java -version
echo ""
echo "Maven:"
mvn -version
echo ""
echo "Git:"
git --version
echo ""
echo "Docker:"
docker --version
docker-compose --version
echo ""
echo "Node.js:"
node --version
npm --version
echo ""
echo "=== All checks complete ==="
```

---

## 🐛 Installation Troubleshooting

### Java Installation Issues

```bash
# Problem: "java: command not found"
# Solution 1: Check JAVA_HOME
echo $JAVA_HOME  # macOS/Linux
echo %JAVA_HOME% # Windows

# Solution 2: Manually set JAVA_HOME
# Windows: Use Environment Variables (see above)
# macOS: Add to ~/.zshrc: export JAVA_HOME=/usr/libexec/java_home -v 17
# Linux: Add to ~/.bashrc: export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Solution 3: Reinstall Java
# Completely uninstall Java first
# Then download and install fresh from oracle.com
```

### Maven Issues

```bash
# Problem: "mvn: command not found"
# Solution: Add Maven to PATH (see installation steps)

# Problem: "BUILD FAILURE"
# Solution 1: Clear cache
rm -rf ~/.m2/repository

# Solution 2: Rebuild
mvn clean install -DskipTests

# Solution 3: Check Java version
java -version  # Must be 17+
```

### Docker Issues

```bash
# Problem: Docker daemon not running (Windows/macOS)
# Solution: Start Docker Desktop application

# Problem: "Cannot connect to Docker daemon"
# Linux solution:
sudo systemctl start docker

# Problem: Permission denied
# Linux solution:
sudo usermod -aG docker $USER
newgrp docker

# Then retry without sudo
```

### Git Issues

```bash
# Problem: "git: command not found"
# Solution: Reinstall Git (see installation steps)

# Problem: SSH key issues with GitHub
# Solution 1: Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Solution 2: Add to GitHub
# Visit: GitHub Settings → SSH Keys → New SSH Key
# Copy content of: ~/.ssh/id_ed25519.pub
# Paste into GitHub
```

---

## 📋 Complete Checklist

Use this checklist to verify everything is installed:

```bash
✅ Java 17+
   [ ] java -version returns version 17 or higher
   [ ] javac -version returns version 17 or higher
   [ ] JAVA_HOME environment variable is set

✅ Maven 3.8+
   [ ] mvn -version returns version 3.8 or higher
   [ ] Can run mvn commands from terminal

✅ Git
   [ ] git --version returns a version number
   [ ] Git username configured: git config user.name
   [ ] Git email configured: git config user.email

✅ Docker
   [ ] docker --version shows version 20+
   [ ] docker run hello-world works
   [ ] Docker Desktop is running (Windows/macOS)

✅ Docker Compose
   [ ] docker-compose --version shows version 2+
   [ ] Can run docker-compose commands

✅ Node.js
   [ ] node --version returns version 16+
   [ ] npm --version returns version 9+

✅ IDE
   [ ] IntelliJ IDEA or VS Code installed
   [ ] IDE can open and run Java projects

✅ Git Repository
   [ ] GitHub account created
   [ ] vidya-sampadana repository cloned
   [ ] Can navigate to project folder
```

---

## 🚀 Next Steps

After completing all prerequisites:

1. ✅ Clone Vidya-Sampadana repository
2. ✅ Follow [RUN_INSTRUCTIONS.md](./RUN_INSTRUCTIONS.md)
3. ✅ Start backend services
4. ✅ Launch frontend
5. ✅ Begin development!

---

## 📞 Need Help?

- **Java Help**: https://www.oracle.com/java/technologies/java-se-glance.html
- **Maven Help**: https://maven.apache.org/guides/
- **Git Help**: https://git-scm.com/book/
- **Docker Help**: https://docs.docker.com/
- **GitHub Issues**: https://github.com/YOUR_USERNAME/vidya-sampadana/issues

---

**All prerequisites installed? Great! You're ready to build Vidya-Sampadana! 🚀**

Next: Follow [RUN_INSTRUCTIONS.md](./RUN_INSTRUCTIONS.md) to start the project.

# 🎓 Vidya-Sampadana

**Vidya-Sampadana** is a comprehensive, microservices-based **School Management & Learning Platform** designed to streamline student admissions, course management, mentor coordination, and educational outcomes. Built with modern technologies (Java Spring Boot, MongoDB, MySQL), it provides scalable APIs for students, mentors, courses, payments, and notifications. The platform features a clean, responsive user interface (currently HTML/CSS/JavaScript, planned React migration) and enterprise-grade architecture suitable for educational institutions of any size.

---

## 📚 Table of Contents

- [🎯 Features](#features)
- [🏗️ Architecture](#architecture)
- [💻 Tech Stack](#tech-stack)
- [📁 Project Structure](#project-structure)
- [📝 License](#license)

---

## 🎯 Features

### Core Functionalities

#### **📚 Student Management**
- ✅ Complete student registration and admission workflow
- ✅ Student profile management (personal, academic, health metrics)
- ✅ Contact information, parent/guardian details
- ✅ Academic tracking (current class, board, stream, scores)
- ✅ Health monitoring (sleep, stress, motivation levels)
- ✅ Address management (current, permanent, guardian)
- ✅ Exam score tracking and performance analytics

#### **🎓 Course Management**
- ✅ Course creation and categorization
- ✅ Subject-wise course organization
- ✅ Course assignment to students
- ✅ Course prerequisites and dependencies
- ✅ Course performance tracking

#### **👨‍🏫 Mentor Management**
- ✅ Mentor profile and qualification management
- ✅ Mentor-student assignment
- ✅ Performance tracking and ratings
- ✅ Availability scheduling
- ✅ Specialization tracking

#### **💳 Payment Processing**
- ✅ Secure payment gateway integration
- ✅ Fee management and billing
- ✅ Payment history and receipts
- ✅ Refund processing
- ✅ Invoice generation

#### **🔔 Notifications**
- ✅ Real-time notifications for admissions
- ✅ Course enrollment alerts
- ✅ Payment reminders
- ✅ Academic performance updates
- ✅ Multi-channel delivery (email, SMS, push)

#### **👥 User Management**
- ✅ Role-based access control (Admin, Student, Mentor, Parent)
- ✅ User authentication and authorization
- ✅ Profile management
- ✅ Secure password management

---

## 🏗️ Architecture

### Microservices Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY                            │
│              (Single Entry Point for Clients)               │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    ┌────────┐   ┌────────┐   ┌────────┐
    │Student │   │Course  │   │Mentor  │
    │Service │   │Service │   │Service │
    └────┬───┘   └───┬────┘   └────┬───┘
         │           │             │
    ┌────▼───────────▼─────────────▼────┐
    │      Shared Services               │
    ├─────────────────────────────────────┤
    │ • User Service                      │
    │ • Payment Service                   │
    │ • Notification Service              │
    │ • Analytics Service                 │
    └──────────┬──────────────────────────┘
               │
    ┌──────────▼──────────┐
    │   Data Layer        │
    ├─────────────────────┤
    │ • MongoDB (NoSQL)   │
    │ • MySQL (SQL)       │
    │ • Cache (Redis)     │
    └─────────────────────┘
```

### Key Principles

- **Microservices**: Each service is independently deployable and scalable
- **API Gateway**: Single entry point for all client requests
- **Database per Service**: Services have their own databases (where applicable)
- **Asynchronous Communication**: Message queues for inter-service communication
- **Scalability**: Each service can be scaled independently based on demand

---

## 💻 Tech Stack

### Backend

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | Spring Boot | 3.0+ |
| **Language** | Java | 17+ |
| **Build Tool** | Maven | 3.8+ |
| **ORM** | Spring Data JPA, Hibernate | Latest |
| **Database (SQL)** | MySQL | 8.0+ |
| **Database (NoSQL)** | MongoDB | 5.0+ |
| **API Documentation** | Swagger/SpringDoc OpenAPI | 2.0+ |
| **Validation** | Bean Validation | Latest |
| **Logging** | SLF4J, Logback | Latest |
| **Cache** | Redis | 6.0+ |

### Frontend

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Current** | HTML5, CSS3, Vanilla JavaScript | UI Development |
| **Styling** | Tailwind CSS | CSS Framework |
| **Planned** | React 18+ | Component-based UI |
| **State Management** | Redux / Context API | State Management |
| **HTTP Client** | Fetch API / Axios | API Communication |

### DevOps & Infrastructure

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Containerization** | Docker | Container management |
| **Orchestration** | Docker Compose | Local orchestration |
| **CI/CD** | GitHub Actions | Continuous Integration |
| **Version Control** | Git/GitHub | Code management |
| **API Gateway** | Spring Cloud Gateway / Kong | Request routing |
| **Service Discovery** | Eureka / Consul | Service registry |

---

## 📁 Project Structure

```
vidya-sampadana/
│
├─ 📦 BACKEND MICROSERVICES (Java Spring Boot)
│  │
│  ├─ student-service/
│  │  ├─ src/main/java/
│  │  │  └─ com/vidyasampadana/student/
│  │  │     ├─ controller/          # REST API Controllers
│  │  │     ├─ service/             # Business Logic
│  │  │     ├─ repository/          # Database Access
│  │  │     ├─ entity/              # JPA Entities (11 tables)
│  │  │     ├─ dto/                 # Data Transfer Objects
│  │  │     ├─ exception/           # Custom Exceptions
│  │  │     └─ StudentServiceApplication.java
│  │  ├─ src/main/resources/
│  │  │  ├─ application.properties
│  │  │  ├─ db/migration/           # Flyway migrations
│  │  │  └─ schema.sql
│  │  ├─ pom.xml
│  │  ├─ Dockerfile
│  │  └─ README.md
│  │
│  ├─ course-service/
│  │  ├─ src/main/java/
│  │  ├─ pom.xml
│  │  └─ Dockerfile
│  │
│  ├─ mentor-service/
│  │  ├─ src/main/java/
│  │  ├─ pom.xml
│  │  └─ Dockerfile
│  │
│  ├─ user-service/
│  │  ├─ src/main/java/
│  │  ├─ pom.xml
│  │  └─ Dockerfile
│  │
│  ├─ payment-service/
│  │  ├─ src/main/java/
│  │  ├─ pom.xml
│  │  └─ Dockerfile
│  │
│  ├─ notification-service/
│  │  ├─ src/main/java/
│  │  ├─ pom.xml
│  │  └─ Dockerfile
│  │
│  ├─ activity-logging-service/
│  ├─ analytics-service/
│  ├─ chat-service/
│  ├─ document-service/
│  ├─ iamservice/
│  └─ session-service/
│
├─ 🎨 FRONTEND (HTML/CSS/JavaScript)
│  └─ frontend/
│     ├─ index.html                 # Main entry point
│     ├─ pages/                     # HTML pages
│     │  ├─ students.html
│     │  ├─ courses.html
│     │  ├─ mentors.html
│     │  ├─ users.html
│     │  ├─ payments.html
│     │  ├─ dashboard.html
│     │  └─ login.html
│     ├─ js/
│     │  ├─ api/                    # API service layer
│     │  │  ├─ config.js
│     │  │  ├─ studentApi.js
│     │  │  ├─ courseApi.js
│     │  │  ├─ mentorApi.js
│     │  │  └─ userApi.js
│     │  ├─ pages/                  # Page logic
│     │  ├─ utils/                  # Utility functions
│     │  └─ components/             # Reusable components
│     ├─ css/
│     │  ├─ styles.css
│     │  ├─ responsive.css
│     │  └─ animations.css
│     ├─ assets/
│     │  ├─ images/
│     │  ├─ icons/
│     │  └─ logos/
│     ├─ package.json               # For future React migration
│     ├─ .env.local
│     ├─ .env.production
│     ├─ Dockerfile
│     └─ README.md
│
├─ 🐳 DOCKER & DEPLOYMENT
│  ├─ docker-compose.yml            # Local development setup
│  ├─ docker-compose.prod.yml       # Production setup
│  ├─ .dockerignore
│  └─ kubernetes/
│     ├─ student-service-deployment.yaml
│     ├─ course-service-deployment.yaml
│     ├─ frontend-deployment.yaml
│     ├─ mongodb-statefulset.yaml
│     ├─ mysql-statefulset.yaml
│     └─ ingress.yaml
│
├─ 📚 DOCUMENTATION
│  ├─ README.md                     # This file
│  ├─ ARCHITECTURE.md               # Detailed architecture
│  ├─ API-DOCS.md                   # API documentation
│  ├─ CONTRIBUTING.md               # Contribution guidelines
│  ├─ SETUP.md                      # Installation guide
│  └─ TROUBLESHOOTING.md            # Common issues
│
├─ 🔧 PROJECT CONFIG
│  ├─ .gitignore
│  ├─ .env.example
│  ├─ .github/
│  │  └─ workflows/
│  │     ├─ student-service-ci.yml
│  │     ├─ frontend-ci.yml
│  │     └─ deploy.yml
│  └─ LICENSE
```

---


#### **Step 5: Access the Application**

- **Frontend**: http://localhost:3000 (React) or open `frontend/index.html` (HTML)
- **Student Service API**: http://localhost:8001/api/students
- **Course Service API**: http://localhost:8002/api/courses
- **Swagger API Docs**: http://localhost:8001/swagger-ui.html

---


## 📡 API Documentation

### Base URLs

| Environment | URL |
|------------|-----|
| Development | `http://localhost:8001/api` |
| Production | `https://api.vidyasampadana.com/api` |
| API Gateway | `http://localhost:8080/api` |


### Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

```bash
# General workflow
1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit changes (git commit -m 'Add AmazingFeature')
4. Push to branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
```

---

## 📊 Project Statistics

- **Total Microservices**: 13+
- **Database Tables** (Student Service): 11
- **API Endpoints**: 100+
- **Current Status**: Active Development
- **Frontend Framework**: HTML/CSS/JS (Migrating to React)

---

## 📚 Additional Resources

- [Architecture Documentation](./ARCHITECTURE.md)
- [API Documentation](./API-DOCS.md)
- [Setup Guide](./SETUP.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

---

## 🔒 Security

- All API endpoints are protected with JWT authentication
- Sensitive data (passwords, tokens) stored securely
- Database credentials stored in environment variables
- HTTPS enforced in production
- Input validation and sanitization on all endpoints

---

## 📈 Roadmap

### Phase 1: Foundation (Current)
- ✅ Microservices architecture setup
- ✅ Student Service with 11 entities
- ✅ Course and Mentor services
- ✅ HTML/CSS/JS frontend
- 🔄 User and Payment services

### Phase 2: Enhancement (Next)
- 📋 React migration for frontend
- 📋 Advanced analytics dashboard
- 📋 Real-time notifications (WebSocket)
- 📋 Mobile app (Flutter/React Native)

### Phase 3: Optimization (Future)
- 📋 AI-powered student recommendations
- 📋 Automated report generation
- 📋 Video streaming integration
- 📋 Advanced security features (2FA, OAuth)

---

## 📞 Support

For issues, questions, or suggestions:

- **GitHub Issues**: [Create an issue](https://github.com/YOUR_USERNAME/vidya-sampadana/issues)
- **Email**: ashivu656@gmail.com
- **Slack Channel**: #vidya-sampadana-dev

---

## 📝 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- Special thanks to all team members for their contributions
- Inspired by modern microservices best practices
- Built with open-source technologies

---

## 📅 Last Updated

**January 5, 2026** | **Version 1.0.0**

---

**Happy Coding! 🚀** 

For questions or feedback, please reach out through mail or create an issue on GitHub.

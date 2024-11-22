# 💪 Gym Buddy: Your Personal Fitness Connection Platform

![Dynamic Gym Community](https://img.shields.io/badge/community-dynamic-orange)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Unit Tests](https://img.shields.io/badge/unit--tests-100%25-brightgreen)
![E2E Tests](https://img.shields.io/badge/e2e--tests-100%25-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

## 🚀 Project Vision

**Gym Buddy** transforms fitness discovery and gym management into a seamless, intelligent experience. We're not just an app—we're your personal gateway to a more connected, accessible fitness world.

### 🔥 Why Gym Buddy?

- **Instant Gym Discovery**: Find your perfect workout spot in seconds
- **Smart Check-ins**: Validate your presence with intelligent geolocation
- **Personal Fitness Tracking**: Monitor your gym journey effortlessly

## ✨ Key Features

### 👤 User Management

- [x] Secure user registration and authentication
- [x] JWT-based session management
- [x] Profile management for logged users
- [x] Comprehensive check-in history

### 🏢 Gym Features

- [x] Proximity-based gym search (10km radius)
- [x] Gym name search functionality
- [x] Smart check-in system with geolocation validation
- [x] Admin-only gym registration

### ⚡ Business Rules

- [x] Duplicate email prevention
- [x] Once-per-day check-in limit
- [x] Geolocation validation (100m radius)
- [x] 20-minute check-in validation window
- [x] Admin-restricted actions

## 🛠 Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Fastify](https://img.shields.io/badge/Fastify-Latest-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-purple)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)

### Core Technologies

- **Runtime**: Node.js
- **Framework**: Fastify
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Language**: TypeScript

### Quality Assurance

- **Unit Tests**: Vitest
- **E2E Tests**: Supertest
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint & Prettier

## 🚀 CI/CD Pipeline

### Continuous Integration

- ✅ Automated unit tests on every push
- ✅ E2E tests with PostgreSQL integration
- ✅ Code quality checks
- ✅ TypeScript compilation verification

### Test Coverage

- Unit Tests: Comprehensive business logic coverage
- E2E Tests: Full API endpoint testing
- Database: Isolated test environment
- Authentication: Complete JWT workflow testing

## 💻 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/gym-buddy
cd gym-buddy

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start database
docker compose up -d

# Run migrations
npx prisma migrate dev

# Run tests
npm run test        # Unit tests
npm run test:e2e    # E2E tests

# Start development server
npm run dev
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /users` - Register new user
- `POST /sessions` - User authentication
- `GET /me` - Get user profile

### Check-in Endpoints

- `POST /gyms/:gymId/check-ins` - Create check-in
- `PATCH /check-ins/:checkInId/validate` - Validate check-in
- `GET /check-ins/history` - User's check-in history
- `GET /check-ins/metrics` - User's check-in metrics

### Gym Endpoints

- `GET /gyms/search` - Search gyms by name
- `GET /gyms/nearby` - Find nearby gyms
- `POST /gyms` - Register new gym (admin only)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Run tests (`npm run test && npm run test:e2e`)
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## 📜 License

MIT License - Feel free to use this project as you wish!

---

<p align="center">
  Made with 💪 by <a href="https://github.com/yourusername">Rafael dias Zendron</a>
</p>

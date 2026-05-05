<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=FFCA28&height=180&section=header&text=Gym%20Buddy&fontSize=42&fontColor=fff&animation=fadeIn&fontAlignY=35&desc=Clean%20Architecture%20%7C%20DDD%20%7C%20Gamification&descSize=18&descAlignY=52"/>

<a href="https://github.com/rafaumeu/gym-buddy/generate"><img src="https://img.shields.io/badge/Use_This_Template-FFCA28?style=for-the-badge&logo=github&logoColor=white" alt="Use this template"/></a>

</div>

## Badges

![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-4.x-000000?logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?logo=postgresql&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Unit%20%2B%20E2E-6E9F18?logo=vitest&logoColor=white)
![Clean Architecture](https://img.shields.io/badge/Clean_Architecture-SOLID-brightgreen)
![DDD](https://img.shields.io/badge/DDD-Domain_Driven-9B59B6)

---

## About

**Gym Buddy** is a backend-only fitness platform built with **Clean Architecture** and **Domain-Driven Design** principles. It provides a robust API for gym discovery, smart geolocation-based check-ins, and a full gamification engine that rewards consistency with XP, levels, streaks, and badges.

This project demonstrates production-grade backend engineering: SOLID adherence, repository pattern, factory-based dependency injection, comprehensive test coverage, and a domain model free of framework coupling.

---

## Architecture

```
src/
├── http/
│   ├── controllers/        # Presentation Layer — route handlers
│   │   ├── users/          #   User & auth endpoints
│   │   ├── check-ins/      #   Check-in endpoints
│   │   └── gyms/           #   Gym endpoints
│   └── middlewares/         #   JWT verification, role guards
│
├── use-cases/              # Application Layer — business orchestration
│   ├── factories/          #   Factory functions (dependency injection)
│   ├── errors/             #   Domain-specific error types
│   └── utils/              #   Shared use-case utilities
│
├── repositories/           # Data Layer — data access contracts
│   ├── in-memory/          #   In-memory implementations (tests)
│   └── prisma/             #   Prisma ORM implementations
│
├── env/                    # Environment validation (Zod)
├── app.ts                  # Fastify app setup
└── server.ts               # HTTP server entry point
```

### Clean Architecture Layers

| Layer | Directory | Responsibility |
| :--- | :--- | :--- |
| **Presentation** | `src/http/controllers/` | HTTP request/response handling, input validation via Zod schemas. Depends on Application layer. |
| **Application** | `src/use-cases/` | Pure business orchestration — each use case encapsulates a single application action. No framework dependencies. |
| **Domain** | `src/use-cases/errors/` | Domain error types (`MaxDistanceError`, `LateCheckInValidateError`, etc.). |
| **Data** | `src/repositories/` | Abstract interfaces (contracts) + concrete implementations (Prisma for production, In-Memory for tests). Repository Pattern in full effect. |
| **Infrastructure** | `src/env/`, `src/app.ts` | Framework bootstrapping, env validation, middleware registration. |

**Key patterns applied:**
- **Repository Pattern** — data access behind interfaces, swappable implementations
- **Factory Pattern** — each use case is created via a factory function (`make-*-use-case.ts`) for DI
- **SOLID Principles** — single responsibility per use case, open/closed via interfaces
- **Domain Errors** — typed error classes instead of generic throws

---

## Features

### User Management
- [x] Secure registration with bcrypt password hashing
- [x] JWT authentication with access + refresh token flow
- [x] Cookie-based refresh token rotation (7-day expiry)
- [x] Role-based access control (`ADMIN` / `MEMBER`)
- [x] Profile retrieval for authenticated users

### Gym Discovery
- [x] Proximity-based gym search (10 km radius from user coordinates)
- [x] Gym search by name (paginated)
- [x] Admin-only gym registration with latitude/longitude

### Smart Check-ins
- [x] Geolocation-validated check-ins (must be within 100 m of gym)
- [x] One check-in per gym per day enforcement
- [x] Admin validation of check-ins (20-minute window)
- [x] Paginated check-in history
- [x] Personal check-in metrics (total count)

### Gamification System
- [x] **XP System** — 1 XP per check-in, displayed on profile
- [x] **Level Progression** — level = floor(XP / 10) + 1, starting at level 1
- [x] **Streak Tracking** — current and best consecutive-day streaks calculated from check-in dates
- [x] **Badge Achievements** — unlocked automatically based on milestones:

| Badge | Condition | Description |
| :--- | :--- | :--- |
| **First Step** | 1+ check-ins | Completed your first check-in |
| **Dedicated** | 10+ check-ins | Completed 10 check-ins |
| **Centurion** | 100+ check-ins | Completed 100 check-ins |
| **Unstoppable** | 30+ day streak | Achieved a 30-day streak |

---

## API Endpoints

### Authentication

| Method | Path | Description | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/users` | Register a new user | No |
| `POST` | `/sessions` | Authenticate and receive JWT + refresh cookie | No |
| `PATCH` | `/token/refresh` | Refresh access token via cookie | No |
| `GET` | `/me` | Get authenticated user profile | Yes |

### Check-ins

| Method | Path | Description | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/gyms/:gymId/check-ins` | Create a check-in (geolocation validated) | Yes |
| `PATCH` | `/check-ins/:checkInId/validate` | Validate a check-in (admin only, 20-min window) | Admin |
| `GET` | `/check-ins/history` | Get paginated check-in history | Yes |
| `GET` | `/check-ins/metrics` | Get total check-in count | Yes |

### Gyms

| Method | Path | Description | Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/gyms/search` | Search gyms by name (paginated) | Yes |
| `GET` | `/gyms/nearby` | Find gyms within 10 km radius | Yes |
| `POST` | `/gyms` | Register a new gym (admin only) | Admin |

### Gamification

| Method | Path | Description | Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/me/gamification` | Get XP, level, streaks, and badges | Yes |

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Runtime** | Node.js 18+ |
| **Framework** | Fastify 4.x |
| **Language** | TypeScript 5.0+ |
| **ORM** | Prisma 4.x |
| **Database** | PostgreSQL 15+ |
| **Validation** | Zod |
| **Auth** | @fastify/jwt + @fastify/cookie |
| **Testing** | Vitest + Supertest |
| **Build** | tsup |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn
- Docker & Docker Compose

### Setup

```bash
# Clone the repository
git clone https://github.com/rafaumeu/gym-buddy.git
cd gym-buddy

# Install dependencies
yarn install

# Copy environment variables
cp .env.example .env

# Start PostgreSQL
docker compose up -d

# Run Prisma migrations
npx prisma migrate dev

# Start development server
yarn start:dev
```

### Environment Variables

Create a `.env` file based on `.env.example`:

| Variable | Required | Description |
| :--- | :---: | :--- |
| `NODE_ENV` | Yes | `dev`, `test`, or `production` |
| `JWT_SECRET` | Yes | Secret key for signing JWT tokens |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `PORT` | No | Server port (default: 3333) |

---

## Testing

The project has comprehensive test coverage at both the unit and end-to-end levels.

### Unit Tests

Test individual use cases in isolation using in-memory repositories:

```bash
yarn test               # Run all unit tests
yarn test:watch         # Watch mode
yarn test:coverage      # Generate coverage report
yarn test:ui            # Vitest UI dashboard
```

### E2E Tests

Full HTTP integration tests against a real database:

```bash
yarn test:e2e           # Run all E2E tests
yarn test:e2e:watch     # Watch mode
```

### Test Architecture

- **Unit tests** (`src/use-cases/*.spec.ts`) — use in-memory repository implementations, zero database dependency
- **E2E tests** (`src/http/**/*.spec.ts`) — exercise full HTTP stack via Supertest with a dedicated Prisma test environment
- **Factory pattern** enables instant swapping between in-memory (fast) and Prisma (integration) repositories

---

## Project Structure Decisions

- **No framework coupling in business logic** — use cases import only repository interfaces, never Prisma types
- **Domain errors over HTTP status codes** — each business rule violation throws a typed error (e.g., `MaxDistanceError`, `MaxNumberOfCheckInsError`)
- **Factory-based DI** — `src/use-cases/factories/` wires dependencies at composition root, keeping use case constructors clean
- **In-memory repos for speed** — unit tests run against in-memory repositories, avoiding database I/O entirely

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Run tests (`yarn test && yarn test:e2e`)
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

---

## License

MIT License — feel free to use this project as a template for your own Clean Architecture backends.

---

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=FFCA28&height=100&section=footer"/>

Built with 💪 by [Rafael Zendron](https://github.com/rafaumeu) · [Portfolio](https://portfoliodev-blush-pi.vercel.app)

</div>

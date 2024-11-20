# Gym Buddy

![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![Node.js Version](https://img.shields.io/badge/node.js-v16.0.0-green)  ![PostgreSQL Version](https://img.shields.io/badge/postgresql-v13.0-blue)  ![TypeScript Version](https://img.shields.io/badge/typescript-v4.0.0-blue)

## Project Description

**Gym Buddy** is an innovative application that connects users to gyms, offering a seamless and practical experience for those seeking to stay fit. With features allowing user registration, authentication, gym search, check-ins, and much more, this project is focused on efficiency and usability.

Our goal is to simplify the lives of those wanting to exercise by making it easier to find gyms and manage check-ins.

## Key Features

- **User Registration**: Allows new users to register with a unique email.
- **Secure Authentication**: Ensures that only registered users can access their information.
- **User Profile**: Users can view and manage their profile, including their check-in history.
- **Gym Search**: Users can search for nearby gyms or search by name.
- **Check-ins**: Users can check in at gyms with distance validation.
- **Check-in History**: Tracks the history of check-ins made by the user.

## Functional Requirements (RFs)

- [X] Users must be able to register.
- [X] Users must be able to authenticate.
- [X] Users must be able to access their logged-in profile.
- [X] Users must be able to view the number of check-ins they’ve made.
- [X] Users must be able to access their check-in history.
- [X] Users must be able to search for gyms within 10 km.
- [X] Users must be able to search gyms by name.
- [X] Users must be able to check in at a gym.
- [X] Check-ins must be validated for users.
- [X] Users must be able to register a gym.

## Business Rules (RNs)

- [X] Users cannot register with a duplicate email.
- [X] Users cannot check in more than once on the same day.
- [X] Users cannot check in if they are not within 100 meters of the gym.
- [X] Check-ins can only be validated within 20 minutes after being created.
- [ ] Check-ins can only be validated by administrators.
- [ ] Gyms can only be registered by administrators.

## Non-Functional Requirements (RNFs)

- [X] User passwords must be encrypted.
- [X] Data must be persisted in a PostgreSQL database.
- [X] All data lists must be paginated with 20 items per page.
- [ ] Users must be identified by a JWT (JSON Web Token).

## Technologies Used

- **Node.js**: Development platform.
- **Fastify**: Web framework for building APIs.
- **Prisma**: ORM for interacting with the PostgreSQL database.
- **TypeScript**: Programming language that brings static typing to JavaScript.
- **Vitest**: Testing framework to ensure code quality.

## How to Contribute

1. Fork this repository.
2. Create a branch for your feature (`git checkout -b feature/feature-name`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to the remote repository (`git push origin feature/feature-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

## Preliminary Release

### Current Phase: Use Case Development

### Objective: Create a robust API that meets the needs of users seeking gyms and managing check-ins.

### Use Cases Implemented So Far

- **User Registration**: Implemented with unique email validation.
- **User Authentication**: Ensuring user data security.
- **Gym Search**: Functionality allowing the search for nearby gyms and by name.
- **Gym Check-in**: Check-in logic implementation.

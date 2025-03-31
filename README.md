# Coding Family Platform

A full-stack platform for creating, sharing, and exploring coding tutorials. Built with React, Node.js/Express, and MongoDB.

## Features

- **User Authentication**: Sign in with email, GitHub, or Google OAuth
- **Tutorial Management**: Create, edit, and browse coding tutorials
- **Tag System**: Organize and discover tutorials by tags
- **Markdown Support**: Write rich tutorial content with Markdown
- **Responsive Design**: Works seamlessly across devices

## Project Structure

```
coding-family/
├── .github/ # GitHub Actions workflows
├── backend/ # Express.js backend
│ ├── public/ # Static assets
│ ├── src/ # Source code
│ │ ├── config/ # Configuration files
│ │ ├── models/ # Database models
│ │ ├── routes/ # API routes
│ │ ├── services/ # Business logic
│ │ └── views/ # Server-side templates
│ ├── .env.example # Environment variables example
│ └── package.json # Backend dependencies
├── frontend/ # React frontend
│ ├── App/ # Main application components
│ ├── common/ # Shared utilities and components
│ ├── features/ # Feature-based modules
│ │ ├── auth-flow/ # Authentication components
│ │ ├── tutorials/ # Tutorial-related components
│ │ └── user-section/ # User profile components
│ ├── package.json # Frontend dependencies
│ └── vite.config.js # Vite configuration
└── package.json # Root
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Yarn package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/coding-family.git
   cd coding-family
   ```
2. Install dependencies:
   ```
   yarn app:install
   ```
3. Set up environment variables:
   ```
   cp backend/.env.example backend/.env.development
   cp frontend/.env.local.example frontend/.env.local
   ```
4. Start development servers:
   ```
   yarn app:dev
   ```
5. Open http://localhost:2002 in your browser

### Development

- Backend server runs on port 2001
- Frontend development server runs on port 2002
- API documentation is available at http://localhost:2001/api

### Deployment

The application is set up for CI/CD with GitHub Actions. On push to the main branch, the workflow:

1. Installs dependencies
2. Builds frontend and backend
3. Restarts the PM2 processes

### License

This project is proprietary and not licensed for public use.

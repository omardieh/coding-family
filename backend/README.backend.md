# Coding Family Backend

Express.js API server for the Coding Family platform, providing authentication, user management, and tutorial CRUD operations.

## Technology Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB/Mongoose** - Database and ODM
- **JSON Web Tokens** - Authentication
- **Nodemailer** - Email service
- **Multer/Cloudinary** - File uploads
- **OAuth** - GitHub and Google integration

## Project Structure

```
backend/
├── public/ # Static files (frontend build)
│ └── api/ # API-specific assets
├── src/ # Source code
│ ├── config/ # Configuration modules
│ ├── middlewares/ # Express middlewares
│ ├── models/ # Mongoose models
│ │ ├── User.model.ts
│ │ ├── Tutorial.model.ts
│ │ └── TutorialTag.model.ts
│ ├── routes/ # API routes
│ │ ├── auth.routes/
│ │ ├── tutorials.routes/
│ │ └── user.routes/
│ ├── services/ # Business logic
│ ├── types/ # TypeScript types
│ ├── views/ # HBS templates
│ ├── App.ts # Express application setup
│ └── index.ts # Entry point
├── .env.example # Example environment variables
├── .env.development # Development environment variables
├── .env.production # Production environment variables
├── nodemon.json # Nodemon configuration
├── package.json # Dependencies and scripts
└── tsconfig.json # TypeScript configuration
```

## Available Scripts

- `yarn dev` - Start development server with Nodemon
- `yarn build` - Build TypeScript to JavaScript
- `yarn start` - Start production server
- `yarn test` - Run tests
- `yarn lint` - Run ESLint
- `yarn format` - Fix formatting with ESLint

## API Endpoints

### Authentication

| Method | Endpoint               | Description                    | Auth Required |
| ------ | ---------------------- | ------------------------------ | ------------- |
| POST   | /api/auth/signup       | Register new user              | No            |
| POST   | /api/auth/login        | Login with credentials         | No            |
| GET    | /api/auth/logout       | Logout and invalidate tokens   | Yes           |
| POST   | /api/auth/google       | Authenticate with Google OAuth | No            |
| POST   | /api/auth/github       | Authenticate with GitHub OAuth | No            |
| POST   | /api/auth/verify/token | Verify JWT token               | Yes           |

### User Management

| Method | Endpoint          | Description         | Auth Required |
| ------ | ----------------- | ------------------- | ------------- |
| GET    | /api/user/profile | Get user profile    | Yes           |
| PATCH  | /api/user/profile | Update user profile | Yes           |

### Tutorials

| Method | Endpoint                  | Description                       | Auth Required |
| ------ | ------------------------- | --------------------------------- | ------------- |
| GET    | /api/tutorials            | Get all tutorials with pagination | No            |
| POST   | /api/tutorials            | Create new tutorial               | Yes           |
| GET    | /api/tutorials/:slug      | Get tutorial by slug              | No            |
| PATCH  | /api/tutorials/:slug      | Update tutorial                   | Yes           |
| GET    | /api/tutorials/tags       | Get all tutorial tags             | No            |
| GET    | /api/tutorials/tags/:slug | Get tutorials by tag              | No            |

## Database Models

### User Model

Stores user information, authentication details, and relations to tutorials.

### Tutorial Model

Stores tutorial content with fields for title, content, description, author reference, and more.

### TutorialTag Model

Manages tags that can be applied to tutorials for categorization.

## Authentication

The application uses JWT for authentication with both access tokens and refresh tokens.

Access tokens are sent in the Authorization header:

```
Authorization: Bearer <token>
```

Refresh tokens are stored in an HTTP-only cookie.

## Environment Variables

Required environment variables (see .env.example):

```
SERVER_PORT=2001
SERVER_HOST=localhost
CLIENT_URL=http://localhost:2002
MONGODB_URL=mongodb://localhost:27017/db-coding-family
JWT_TOKEN_SECRET=your_jwt_secret
MAIL_HOST=smtp.example.com
MAIL_PORT=465
MAIL_USER=user@example.com
MAIL_PASS=password
MAIL_FROM="Coding Family"
GITHUB_CLIENT_ID=github_client_id
GITHUB_CLIENT_SECRET=github_client_secret
GITHUB_REDIRECT_URI=http://localhost:2002/login/github
GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:2002/login/google
```

## Security Features

- CORS protection
- HTTP-only cookies for sensitive tokens
- Rate limiting
- IP filtering for suspicious activity
- Content Security Policy

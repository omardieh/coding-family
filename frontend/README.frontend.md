# Coding Family Frontend

The React frontend for the Coding Family platform, built with Vite, React Router, and Material UI.

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Material UI** - Component library
- **React Router DOM** - Page routing
- **SWR** - Data fetching and caching
- **MDEditor** - Markdown editor for tutorials
- **Styled Components** - CSS-in-JS styling
- **React Toastify** - Toast notifications
- **Socket.io Client** - Real-time communication

## Project Structure

```
frontend/
├── App/ # Core application setup
│ ├── App.jsx # Main application component
│ ├── main.jsx # Application entry point
│ ├── main.css # Global styles
│ └── routes/ # Route definitions
├── common/ # Shared code
│ ├── assets/ # Static assets and styles
│ ├── components/ # Reusable components
│ ├── contexts/ # Shared context providers
│ ├── hooks/ # Custom React hooks
│ └── services/ # API services
├── features/ # Feature modules
│ ├── auth-flow/ # Authentication features
│ ├── error-boundaries/ # Error handling
│ ├── global-layout/ # Layout components
│ ├── landing-page/ # Home page
│ ├── tutorials/ # Tutorial features
│ └── user-section/ # User profile features
├── public/ # Static files
├── .env.local.example # Example environment variables
├── build.sh # Build script
├── index.html # HTML entry point
├── jsconfig.json # JavaScript configuration
├── package.json # Dependencies and scripts
└── vite.config.js # Vite configuration
```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production and copy to backend
- `yarn lint` - Run ESLint
- `yarn format` - Fix formatting with ESLint
- `yarn preview` - Preview production build locally

## Key Features

### Routing Structure

Tutorial-related routes:

```jsx
// From frontend/features/tutorials/pages/index.jsx
export default [
  {
    path: "/tutorials",
    element: <TutorialsList />,
    children: [
      {
        path: "/tutorials/:slug",
        element: <TutorialDetails />,
        children: [
          {
            path: "/tutorials/:slug/edit",
            element: <TutorialEdit />,
            scope: "user",
          },
        ],
      },
      {
        path: "/tutorials/create",
        element: <TutorialCreate />,
        scope: "user",
      },
      {
        path: "/tutorials/tags",
        element: <TutorialTagsList />,
        children: [
          {
            path: "/tutorials/tags/:slug",
            element: <TutorialTagDetails />,
          },
        ],
      },
    ],
  },
];
```

### Authentication

The application uses multiple authentication methods:

- Email/password login
- GitHub OAuth
- Google OAuth

### Tutorial Creation

The application allows users to create tutorials with Markdown content, tags, and rich formatting.

### Environment Variables

Create a .env.local file with the following variables:

```
VITE_SERVER_URL=http://localhost:2001/api
VITE_WEBSOCKET_SERVER_URL=http://localhost:2001
VITE_GOOGLE_CAPTCHA_KEY=VITE_GOOGLE_CAPTCHA_KEY
```

### Build Process

The `build.sh` script performs the following steps:

- Backs up necessary files from the backend's public directory
- Removes the existing backend public directory
- Recreates the public directory
- Restores backed up files
- Copies the frontend build to the backend public directory

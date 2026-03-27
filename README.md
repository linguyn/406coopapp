# App Setup

## 1. Quick Project Structural Breakdown
* This project is divided into two main sections: backend and frontend
* In the backend folder you will find the express server and all of the resources the backend and database teams create
* In the frontend folder you will find the vite app and all of the resources the frontend team creates
* Each section, including the root, has a unique package.json which serves as a "recipe" containing related metadata, scripts, and dependencies
* By following the instructions below, these recipes will tell node the dependencies that it needs to install or the files it should run when you use the developer commands
* Please do not hesitate to reach out if you encounter an issue or need help understanding how something works

Here is a neat visual:

```text
406coopapp/
├── backend/                # Express Server
│   ├── .env                # Backend secrets (PORT, KEYS, etc.)
│   ├── package.json        # Backend dependencies
│   └── src/
│       └── server.js       # Entry point for backend
├── frontend/               # Vite Server
│   ├── .env                # Frontend secrets (PORT, etc.)
│   ├── package.json        # Frontend dependencies
│   └── src/                # Entry point for frontend
├── .gitignore              # To ignore node_modules (locally installed files) and .envs (secrets)
├── package.json            # Root scripts to run both apps simultaneously or separately
└── README.md               # You are here!
```

## 2. Prerequisites

* **Node.js**: [Download Node.js](https://nodejs.org/) (node: v25.8.0, npm: v11.11.0)
* **MongoDB**: A local instance or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (ignore this for now)

## 3. Quick Setup

### Clone Repository
navigate to the directory where you want to create the cloned directory

```bash
git clone https://github.com/IsAlexAvailable/406coopapp
cd <project-directory>
```

### Install Dependencies

```bash
cd <project-directory>
npm run install-all
```

### Configure Frontend and Backend Environment Variables
Note: the port number you use should be the same in both .env files

```bash
cd <project-directory>/backend
```

create a .env file and add the following to it:

```bash
BACKEND_PORT=5000
FRONTEND_PORT=5173

ACCESS_TOKEN_SECRET=<paste-your-access-token-key-here>
REFRESH_TOKEN_SECRET=<paste-your-refresh-token-key-here>

MONGO_URI=mongodb://localhost:27017/406_Project
```
```bash
cd <project-directory>/frontend
```

create a .env file and add the following to it:

```bash
API_URL= # Ignore this for now
```

## 4. Developer Commands

```bash
npm run dev         # Start frontend and backend simultaneously
npm run server      # Start backend only with nodemon
npm run client      # Start frontend only with vite

npm run install-all                                  # Installs the dependencies needed for each directory
npm install <dependency> --prefix <directory-name>   # Installs a dependency in the specified directory (please use the prefix otherwise this command may affect the wrong package.json)
npm uninstall <dependency> --prefix <directory-name> # Uninstalls a dependency in the specified directory
```

## 5. Accessing Swagger API documentation

After starting the backend server, find a deatiled view of the API by navigating to:

```bash
http://localhost:<BACKEND_PORT>/api-docs/   # replace <BACKEND_PORT> with the port your server is running on (likely 5000 or 5005)
```

This documentation allows you to see request/response requirements for the api endpoints and test them with sample input.

Note: most of the endpoints (except: /api/auth/login and /api/auth/register) require authentication tokens. When you are testing them, obtain an access token from the login or refresh endpoints, click the "Authorize" button, and paste your key there

## 6. Database and Postman


# App Setup

## 1. Quick Project Structural Breakdown
* This project is divided into two main sections: backend and frontend
* In the backend folder you will find the express server and all of the resources the backend and database teams create
* In the frontend folder you will find the react app and all of the resources the frontend team creates
* Each section, including the root, has a unique package.json which serves as a "recipe" containing related metadata, scripts, and dependencies
* By following the instructions below, these recipes will tell node the dependencies that it needs to install or the files it should run when you use the developer commands
* We have installed a react dependency in the frontend folder, but the frontend team should determine which dependencies they actually need and install/uninstall accordingly
* Please do not hesitate to reach out if you encounter an issue or need help understanding how something works

Here is a neat visual:

```text
406coopapp/
├── backend/                # Express Server (Node.js)
│   ├── models/             # Mongoose Schemas
│   ├── .env                # Backend secrets (PORT, MONGO_URI)
│   ├── server.js           # Entry point for backend
│   └── package.json        # Backend dependencies
├── frontend/               # React App
│   ├── index.js            # Very temporary frontend entry point
│   ├── .env                # Frontend environment variables (API_URL)
│   └── package.json        # Frontend dependencies
├── .gitignore              # To ignore node_modules (the stuff you install) and .env files
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
PORT=5000
MONGO_URI=<paste-your-mongodb-link-here> (ignore this for now)
```
```bash
cd <project-directory>/frontend
```

create a .env file and add the following to it:

```bash
API_URL=http://localhost:5000 (you will use this to access the api)
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


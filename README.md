# App Setup

## 1. Quick Project Structural Breakdown
* This project is divided into two main sections: backend and frontend
* The frontend folder contains the frontend Vite development server
* The backend folder contains the backend Express server
* Both servers require .env files in their respective folders, which contain URLs and secrets information
* This project uses a local connection to MongoDB
* The following instructions will tell you how to get the project running by installing the right software and setting up the .env files

Project layout:

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
* **MongoDB**: A local instance of [MongoDB Community Server](https://www.mongodb.com/try/download/community)

## 3. Quick Setup

### Clone Repository
Navigate to the directory where you want to clone the repository

```bash
cd <project-directory>
git clone https://github.com/IsAlexAvailable/406coopapp
```

### Install Dependencies
Navigate to the root directory of the project and install all dependencies

```bash
cd <project-directory>
npm run install-all
```

### Configure Frontend and Backend Environment Variables
Navigate to the backend directory

```bash
cd <project-directory>/backend
```

create a .env file and add the following to it:

```bash
BACKEND_PORT=5000
FRONTEND_PORT=5173

ACCESS_TOKEN_SECRET=<paste-your-access-token-key-here> # This can be any string e.g. 3cbc4a2cbaff2f6dcc1d348d651ec88b99ef0178cc699c887b5843719713010e
REFRESH_TOKEN_SECRET=<paste-your-refresh-token-key-here> # This can be any string (different from ACCESS_TOKEN_SECRET) e.g. 67fc98beb00eaff20763a137e336af06033208f7c119727ebc15cc1e54b57a84

MONGO_URI=mongodb://localhost:27017/406_Project # Give your database the same name as the last part of this URL and run it on the same port
```

Navigate to the frontend directory
```bash
cd <project-directory>/frontend
```

create a .env file and add the following to it:

```bash
VITE_API_URL=http://localhost:5000/api
```

You may now run both servers and navigate to the URL of your frontend server to play around with the app. Have fun!

## 4. Developer Commands

```bash
npm run dev         # Start frontend and backend simultaneously
npm run server      # Start backend only
npm run client      # Start frontend only

npm run install-all                                  # Installs the dependencies needed for each directory
npm install <dependency> --prefix <directory-name>   # Installs a dependency in the specified directory (please use the prefix otherwise this command may affect the wrong package.json)
npm uninstall <dependency> --prefix <directory-name> # Uninstalls a dependency in the specified directory
```

## 5. Accessing Swagger API documentation (not required for TA and prof)

After starting the backend server, you can find a detailed view of the API by navigating to:

```bash
http://localhost:<BACKEND_PORT>/api-docs/   # replace <BACKEND_PORT> with the port your server is running on (likely 5000 or 5005)
```

This documentation allows you to see request/response requirements for the api endpoints and test them with sample input.

Note: most of the endpoints (except: login, register, and refresh-token) require access tokens. When you are testing them, obtain an access token from the login or refresh endpoints, click the "Authorize" button, and paste your key there.

## 6. Database

This application uses MongoDB, which must be downloaded as shown in step 2. Once it is downloaded, create a connection with the same Mongo URI (mongodb://localhost:27017/). 

To clarify:

1. Navigate to https://www.mongodb.com/try/download/community.
2. Install the community local version (select your OS).
3. Select the "complete" version when opening the installer (recommended by MongoDB).
4. MongoDB Compass should also open. This is the interactive, UI version of MongoDB.
5. Create a new connection with the Mongo URI above. 
6. Create a database (name should match to the backend .env file)
7. Create a dummy collection (if it requires you to)
8. Done! When running npm run dev, the database should update (after reloading) and should show all of the new collections that the application will use.

## 7. Testing Coordinator

You may notice (as stated in the video, or when navigating to the "Create account" section in the top left of the main page) that there is no registration option for a coordinator. We decided to omit this due to the sensitive information and operations available to the coordinator, and we assumed that the coordinator would already have an account automatically created for them when using the website.

When using our website for the first time, there will be no coordinator account to log in to. To be able to log in to a coordinator account, open MongoDB Compass, connect to the database, and navigate to the "coordinators" collection/folder. It should say the collection has no data, so click the green "+ ADD DATA" dropdown button. Click insert document, delete the entire placeholder text, and copy and paste the text below:

{
  "_id": {
    "$oid": "69cad4552cde95a0a1b6f83a"
  },
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "janedoe@torontomu.ca",
  "password": "password1234",
  "isAdmin": true,
  "role": "coordinator",
  "__v": 0
}

After pasting, click insert. This should have added a coordinator entry into the database. Now you may log in as a coordinator, using the credentials above, on the sign in page of the website. If you would like to add multiple coordinators, repeat the process, but change the "$oid" field and the "email" field.


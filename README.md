# URL Shortener Service

## Overview
Full-Stack application built as a part of technical assignment.

## Tech Stack
-React (TypeScript and TailwindCSS)

-Node.js

-Express (TypeScript)

-MongoDB

## 1.Setup Instructions
### Prerequisites
Make sure you have the following installed:

##### 1. Visual Studio Code
##### 2. Node.js (v18+ recommended)
##### 3. npm

#### step-1 (Project Setup):
```powershell
git clone https://github.com/mahbub47/url_shortener_service.git

cd url_shortener_service/backend

npm install

cd url_shortener_service/frontend

npm install
```

#### step-2 (Environment variables):

Create a .env file in the backend root folder then create these variables

`PORT`: Your backend port (e g. 5000)

`MONGO_URI` Your MongoDB database uri or connection string

`JWT_SECRET`: JWT secret string
`JWT_EXPIRY`: JWT expiry time (e g. 1d)

`EMAIL_USER`:Your email for sending otp to the user
`EMAIL_PASS`:Your app password for that email

#### step-3 (Run Project):
To run the server:

go to the `\backend` folder using `cd backend` from the root directory of the project

and then run `npm run dev`

To run the client:

go to the `\frontend` folder using `cd frontend` from the root directory of the project

and then run `npm run dev`

### CONGRATULATIONS! You have run the project successfully

## 2.Project Structure

```project-structure
url_shortener_service/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── types/
|   |   ├── utils/
|   |   ├── server.ts
│   │   └── app.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── main.css
│   │   └── main.tsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── style.css
│   ├── tsconfig.json
│   ├── vite.config.json
│   └── package.json
│
└── README.md
```
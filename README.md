
# Cloud MS

## Project Description
Cloud MS is a web application for managing cloud service data. It provides functionality to search, view, edit, and delete records from a SQLite database. The application includes user authentication to protect routes that allow editing and deleting data. The frontend is built using React, with Material-UI for the UI components, and the backend is built with Node.js, Express.js, and SQLite3.

## Technologies Used
- **React**: A JavaScript library for building user interfaces. It allows for creating reusable UI components and managing the state of the application efficiently.
- **Material-UI**: A popular React UI framework for implementing Google's Material Design. It provides a set of components that are easy to use and customize.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. It is used for building the backend server.
- **Express.js**: A minimal and flexible Node.js web application framework. It provides a robust set of features to build web and mobile applications.
- **SQLite3**: A self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. It is used to store the application data.
- **JWT (JSON Web Tokens)**: Used for securely transmitting information between parties as a JSON object. It is used to handle user authentication and authorization.

## Features
- **User Authentication**: Secure login and logout functionality using JWT.
- **Protected Routes**: Only authenticated users can access routes that allow editing and deleting data.
- **CRUD Operations**:
  - **Create**: Add new records to the database.
  - **Read**: View records from the database.
  - **Update**: Edit existing records in the database.
  - **Delete**: Remove records from the database.
- **Search Functionality**: Search records based on various categories such as account ID, name, services, contract status, and expiry date.

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/Cloud-MS.git
   cd Cloud-MS
   ```

2. Install the dependencies for the backend:
   ```sh
   cd server-side
   npm install
   ```

3. Install the dependencies for the frontend:
   ```sh
   cd ../client-side
   npm install
   ```

4. Set up the environment variables:
   Create a `.env` file in the `server` directory and add the following:
   ```plaintext
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

5. Start the backend server:
   ```sh
   cd server-side
   npm start
   ```

6. Start the frontend server:
   ```sh
   cd ../client-side
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`.

## Usage
1. **Login**: Use the login page to authenticate.
2. **Search**: Use the search bar and select a category to search for records.
3. **View Records**: Browse the list of records.
4. **Edit/Delete**: Go to /edit to use the edit and delete buttons to modify or remove records (accessible only to authenticated users).
5. **Add Records**: Use the add button to create new records.

## Folder Structure
```
Cloud-MS/
│
├── client/                 # React frontend
│   ├── public/             # Public assets
│   └── src/                # Source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── App.js          # Main app component
│       └── index.js        # Entry point
│
├── server/                 # Node.js backend
│   ├── routes/             # Express routes
│   ├── controllers/        # Route handlers
│   ├── models/             # Database models
│   ├── middlewares/        # Middleware functions
│   ├── config/             # Configuration files
│   └── index.js            # Entry point
│
├── .gitignore              # Git ignore file
├── README.md               # Project README file
└── package.json            # Project metadata and dependencies
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any features, bugs, or improvements.

## License
This project is licensed under the MIT License.


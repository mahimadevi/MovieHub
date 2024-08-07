# Movie Web App

This project is a React application for managing movie and TV show information, favorites, and user accounts. It utilizes Redux for state management and React Router for navigation.This project also implements a backend API for a movie/TV show application. It utilizes Express for the server framework, Mongoose for database interaction (MongoDB), and various validation and security features.

# Features:

1. Browse popular and top-rated movies and TV shows.
2. Search for movies, TV shows, and people.
3. View detailed information for each media item.
4. Add and remove favorites from your list.
5. Manage user account (optional, implementation not included).
6. User Management:
   1. Signup, signin, and update password functionalities with validation.
   2. Retrieve logged-in user information.
   3. Manage favorite movies/TV shows.
7. Media & Person:
   1. Search for movies/TV shows. (Functionality not implemented in provided code)
   2. Retrieve details of a specific movie/TV show.
   3. Get genres list for movies/TV shows. (Functionality not implemented in provided code)
   4. Get media recommendations. (Functionality not implemented in provided code)
   5. Get details of a person (actor, director, etc.).
   6. Retrieve a person's filmography (movies/TV shows they appeared in).
8. Reviews:
   1. Create, retrieve, and delete reviews for movies/TV shows by the logged-in user

# Tech Stack:

1. HTML
2. CSS
3. JAVASCRIPT
4. React
5. Redux Toolkit
6. React Router DOM
7. Material UI (or your preferred styling library)
8. TMDB API (or your chosen API)
9. Backend: Node.js, Express
10. Database: MongoDB, Mongoose
11. Validation: Express Validator
12. Security: JWT (for authentication)
13. External API: TMDB API (for movie/TV show data)

# Code Structure:
For Frontend
1. src: Contains the React application code.
2. components: Houses reusable React components for pages and UI elements.
3. store: Contains Redux logic with reducers, slices, and actions.
4. utils: Holds utility functions for common tasks (optional).
5. App.js: The main application entry point.
6. routes.js: Defines routing configurations.
7. public: Stores static assets like images or fonts.

For Backend
1. src/
   1. controllers/: This folder contains controllers for handling different functionalities like user management, media, reviews, favorites, etc. Each controller file manages a specific set of routes and their logic.
   2. middlewares/: This folder houses middleware functions used for various purposes like authentication, request validation, and error handling. These functions are reused across different routes for consistent behavior.
   3. models/: This folder contains Mongoose models representing data structures for users, reviews, favorites, etc. These models define the schema for data stored in the database.
   4. routes/: This folder is the central hub for routing. It defines all the API endpoints and maps them to the corresponding controller functions.
   5. utils/: This folder contain utility functions used across the application for common tasks.
   6. axios/: This folder likely contains configuration for the Axios library used to make HTTP requests to the TMDB API for movie/TV show data.
   7. tmdb.endpoints.js: This file defines endpoints used for interacting with the TMDB API.
2. index.js: This is the main entry point for the server. It configures the Express app, middleware, routes, and database connection.

# Redux Setup:

The application utilizes Redux Toolkit for state management. The store is configured in store/index.js and combines reducers defined in separate slice files within the store directory. This promotes modularity and separation of concerns.

# Routing:

React Router is used for navigation. Routes are defined in routes.js and utilize dynamic segments for media type and ID. Protected routes can be implemented to restrict access to specific pages for logged-in users.

# API Integration:

The application (currently) assumes you'll integrate with an API like TMDB to fetch movie and TV show data. Components will handle fetching data and dispatching actions to update the Redux store.

# Getting Started:

1. Clone this repository.

2. Install dependencies:
   ``` npm install ```

3. Create a ```.env``` file in the project root directory and add the following environment variables:
   
    ``` MONGODB_URL: Your MongoDB connection string.
        TMDB_BASE_URL: TMDB API base URL.
        TMDB_KEY: Your TMDB API key.
        MONGODB_URL: Your MongoDB connection string.
    ```
4. Start the server:
   ``` npm start ```
   

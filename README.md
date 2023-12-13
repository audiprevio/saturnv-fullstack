
# Saturn V: Fullstack Google Maps-based Task Manager

## Table of Contents
1. [Overview](#overview)
2. [SaturnV's Features](#saturnvs-features)
3. [Tech Stack](#tech-stack)
   - [Frontend](#frontend)
   - [Backend](#backend)
4. [Setup and Installation](#setup-and-installation)
5. [Running the Application](#running-the-application)
   - [Backend](#backend-1)
   - [Frontend](#then-run-the-frontend)
6. [Frontend Documentation](#frontend-documentation)
   - [Disclaimer: Initializing Google Maps API](#disclaimer-initializing-google-maps-api)
   - [Project Structure](#project-structure)
      - [Folder - Contexts](#folder-contexts)
      - [Folder - Providers](#folder-providers)
      - [Folder - Pages](#folder-pages)
      - [Folder - Map and Sidebar Containers](#folder-map-and-sidebar-containers)
      - [Folder - Sidebar Containers](#folder-sidebar-containers)
      - [Other components](#other-components)
      - [hoc](#hoc)
7. [API Documentation](#api-documentation)
   - [Tasks API](#tasks-api)
   - [Users API](#users-api)
8. [Known Issues](#known-issues)
9. [Credits](#credits)

## Overview

SaturnV is a geospatial task manager application that takes the advantage of the power of Google Maps API & UI. SaturnV is powered by Vite on the front-end and Python on the back-end.

## SaturnV's Features:
- Google Maps feature integration: Street View, Satellite view, Layering, and more.
- Task-panning by clicking "See Task".
- Create, Read, Update, and Soft-delete Tasks using the front-end GUI.
   - Tasks that are detected to be overdue (deadline date > datenow) will automatically be rendered in the "Overdue" Tab.
- React Google Autocomplete that can input the task coordinates even on the lowest level like street names.
- Zoom in the task location by clicking on the marker in the Google Maps.
- Role-based Access Control: "Admin" role can see all tasks, meanwhile "Staff" role can only see tasks that they are assigned to.
   - Task assignment is done by using the valid email.

## Tech Stack
### Frontend
- Vite
- Tailwind CSS
- Material Tailwind
- @react-google-maps/api
- Google Map API key
- Yup
- Formik
- react-toastify
- Fontawesome

### Backend
- Python 3.10/3.11
- Flask
- Flask-JWT-Extended
- PyMongo
- Bcrypt
- Marshmallow
- An active MongoDB instance

## Setup and Installation

1. **Clone the Repository**:
   ```
   git clone this repository
   ```

2. **Install Dependencies**:
   Navigate to the project directory and install the required Python packages:
   ```
   Frontend:
   1. npm install
   ```
   
   
   ```
   Backend:
   1. pipenv install
   2. pipenv shell
   3. pipenv run flask run --debug
   ```

3. **Environment Variables**:
   Set up the required environment variables, including `JWT_SECRET_KEY`, Google Maps API and MongoDB connection details

4. **Database Configuration**:
   Ensure MongoDB is running and accessible as per your configuration.

## Running the Application

Execute the following command in the project root directory:

   ```
   Backend:
   1. pipenv shell
   2. pipenv run flask run
   ```

   ```
   Then, run the Frontend:
   1. npm run dev
   ```

## Frontend Documentation

### Disclaimer: Initializing Google Maps API

During the development, I found out that you have to check for and initialize the Google Maps API Key on a page component that can wrap a parent components that require google maps API to function. 

For instance, 

```
[page - init here] --->     GoogleMapsLoader.jsx
                                      |
[parent]   --->             AddTaskContainer.jsx
                                      |
                         ----------------------------
                         |                          |
                         V                          V
[children]  --->       MainMapComponent         Taskform
                       .jsx                      .jsx
```

Initially, I tried to just render `MainMap` and `TaskForm` inside the `TaskContainer`, but that raised a problem. Both the `MainMap` and `TaskForm` each conducted API calls which breaks the application because in a single page, there cannot be two application calling the API at once.

### Project Structure

### Folder - Contexts :
- Context APIs that manages data across components.

### Folder - Providers:
- `MapCenterProvider` -> wrapper provider that enables the map to pan to a task location by transferring the coordinates between components

### Folder - Pages:
- Self explanatory, these are also where GoogleAPI are checked and initialized to be used in the children components

### Folder - Map and Sidebar Containers:
- Containers that wraps renders the Google Map and task CRUD containers

### Folder - Sidebar Containers:
- CRUD containers for task management

### Other components:
- Smallest bits of components that constitutes the CRUD containers

### hoc:
- Checker function to ensure that user is logged in. Else, they are kicked to the login page.


## API Documentation

### Tasks API

1. **Create Task** - `POST /tasks/`
   - Creates a new task.
   - Requires JWT authentication.
   - Request body should contain task details.

2. **Get Task** - `GET /tasks/<task_id>`
   - Retrieves a specific task by its ID.
   - Requires JWT authentication.

3. **Update Task** - `PUT /tasks/<task_id>`
   - Updates an existing task.
   - Requires JWT authentication.

4. **Soft Delete Task** - `PUT /tasks/softdelete/<task_id>`
   - Soft-deletes a task by setting its `isDeleted` flag.
   - Requires JWT authentication.

5. **Change Task Status** - `PUT /tasks/<task_id>/change_status`
   - Changes the status of a task.
   - Requires JWT authentication.

6. **Get All Tasks** - `GET /tasks/`
   - Retrieves all tasks.
   - Requires JWT authentication.

### Users API

1. **Register User** - `POST /users/register`
   - Registers a new user.

2. **Login User** - `POST /users/login`
   - Authenticates a user and returns a JWT token.

3. **Update User Password** - `PUT /users/update_password`
   - Updates a user's password.

4. **Get Current User** - `GET /users/me`
   - Retrieves the currently logged-in user's details.
   - Requires JWT authentication.

5. **Get All Users** - `GET /users`
   - Retrieves a list of all users.
   - Requires JWT authentication.


## Known Issues

- Performance optimization is needed to ensure far more efficient API call from the front-end.
- Jittery map dragging. Sometimes when dragging the Google Maps component, the task labels on the map, for a split second, are rendered in the wrong position. However, task zoom-in and panning still works fine
- Checker functions

Looking forward to see forks that can assist with those problems!


## Credits
- Big thanks to my mentor/team leader in RevoU Fullstack Software Engineering bootcamp, Mas Dion M.W.

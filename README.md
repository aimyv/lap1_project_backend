# Server

## Description

- This is the server-side code of a journaling website named Maulorum.

## Deployment

- <a href="https://maulers-server.onrender.com/" target="_blank">Render</a>

## Technologies

### JavaScript/Express.js

JavaScript was used to fetch and send data to the API. It was used to create a REST API with `get`, `post`, `put` and `delete` routes for entries and comments for specific entries. This allowed the application to:

- fetch all entries,
- fetch a specific entry,
- fetch all comments for a specific post,
- fetch a specific comment for a specific post,
- react to a post positively or negatively from a choice of 3 emojis,
- publish a new entry,
- and delete an entry.

---

## Local Host (deprecated)

### Installation

- Download this repository or clone it by entering `git clone https://github.com/aimyv/lap1_project_backend.git` in your terminal.
- Navigate to the `lap1-project-backend` folder.
- Install all dependencies with `npm install`.

### Usage

- Run `npm run dev` to launch the server.
- Go to <a href="http://localhost:3000/" target="_blank">local host</a> to access the backend.

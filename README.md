# Capstone Starter Project

A basic Node.js + Express web server, built as the starting point for my capstone project. This project is part of Week 1 setup: getting my toolchain (Node.js, Git, Cursor) working end-to-end.

The app includes a simple task manager with an in-memory API and a browser form for creating tasks.

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express** — minimal web server framework
- **Plain JavaScript** — no frontend libraries

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- npm (comes bundled with Node.js)

### Installation

1. Clone this repository:
  ```
   git clone https://github.com/Tayyaba-tz/FlyRank-capstone1.git
  ```
2. Navigate into the project folder:
  ```
   cd flyrank-capstone1
  ```
3. Install dependencies:
  ```
   npm install
  ```



### Running the server

```
npm start
```

Then open your browser and go to `http://localhost:3000`.

For auto-restart on file changes during development:

```
npm run dev
```



### Running tests

```
npm test
```

Tests cover form validation (empty, short, and valid titles) and the tasks API (POST then GET).

## Routes


| Route        | Method | Description                                |
| ------------ | ------ | ------------------------------------------ |
| `/`          | GET    | Homepage with a task creation form         |
| `/about`     | GET    | Short description of the project           |
| `/health`    | GET    | Health check (`status`, `uptime`)          |
| `/api/tasks` | GET    | Returns all tasks from the in-memory store |
| `/api/tasks` | POST   | Creates a new task (`{ "title": "..." }`)  |




### Task object shape

```json
{
  "id": 1,
  "title": "Set up toolchain",
  "done": false
}
```



### Example API usage

Create a task:

```
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries"}'
```

List all tasks:

```
curl http://localhost:3000/api/tasks
```



## Frontend

The homepage (`public/index.html`) includes a task creation form:

- Title must be at least 3 characters
- Empty or short titles show an inline red error and block submission
- Valid submissions POST to `/api/tasks` and show a success message

Client logic lives in `public/index.js` (plain JavaScript, no external libraries).

## Project Structure

```
flyrank-capstone1/
├── index.js              # Express server and API routes
├── package.json          # Project metadata, scripts, and dependencies
├── public/
│   ├── index.html        # Homepage and task form
│   └── index.js          # Form validation and API calls
├── test/
│   ├── task-form.test.js # Validation tests
│   └── tasks-api.test.js # POST/GET integration test
├── README.md             # This file
├── CLAUDE.md             # AI assistant conventions and stack notes
├── LICENSE
└── .gitignore
```



## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
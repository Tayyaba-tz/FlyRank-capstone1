# FlyRank Capstone Starter

This is a basic Node.js web server using Express. Entry point is `index.js`. Start with `npm start` (`node index.js`). The server listens on port 3000.

Use CommonJS (`require` / `module.exports`), not ES modules, unless the project is later migrated.

## File naming

- JavaScript files: `kebab-case.js` (e.g. `user-routes.js`, `error-handler.js`).
- Keep the app entry as `index.js`.
- Route modules: `*-routes.js` (e.g. `about-routes.js`).
- Middleware: `*-middleware.js` or a short purpose name (`logger.js`).
- Do not use spaces, camelCase, or PascalCase for file names.

## Route organization

- Keep `index.js` thin: create the app, apply middleware, mount routers, call `app.listen`.
- Define routes in Express `Router` modules under a `routes/` folder, then `app.use("/", homeRouter)` (or a path prefix) from `index.js`.
- Group related endpoints in one router file. One concern per file.
- Use HTTP verbs that match the action (`GET` for reads, `POST` for creates). Keep path names lowercase and hyphenated (`/about`, `/health-check`).
- Send clear responses. Prefer `res.status(...).json(...)` for APIs; `res.send(...)` is fine for simple text pages like the current homepage.

Example:

```js
// routes/home-routes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World! My capstone project server is running.");
});

module.exports = router;
```

```js
// index.js
const homeRoutes = require("./routes/home-routes");
app.use("/", homeRoutes);
```

## Code style

- Use `const` by default; `let` only when reassignment is needed.
- Prefer async/await over nested callbacks when adding I/O.
- Do not commit `node_modules/` or `.env` files.
- Read port from `process.env.PORT` with a fallback (`const PORT = process.env.PORT || 3000`).

## Git commits (Conventional Commits)

Format: `type(optional-scope): short description`

Types:

- `feat`: new user-facing behavior (new route, new feature)
- `fix`: bug fix
- `docs`: README or comments only
- `refactor`: code change with no behavior change
- `chore`: tooling, dependencies, config

Rules:

- Use lowercase type; imperative mood (`add`, not `added` or `adds`).
- Keep the subject to about 72 characters; no period at the end.
- Scope is optional (`feat(routes): add about page`).

Examples:

- `feat: add about route`
- `fix(server): read port from environment`
- `docs: describe npm start in readme`
- `chore: add express dependency`

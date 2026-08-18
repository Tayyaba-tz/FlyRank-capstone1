const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const app = require("../index.js");

let server;
let baseUrl;

before(() => {
  server = app.listen(0);
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(() => {
  server.close();
});

test("POST a new task then GET /api/tasks includes it", async () => {
  const title = `Integration test task ${Date.now()}`;

  const postResponse = await fetch(`${baseUrl}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  assert.equal(postResponse.status, 201);
  const postData = await postResponse.json();
  assert.equal(postData.task.title, title);
  assert.ok(postData.task.id);

  const getResponse = await fetch(`${baseUrl}/api/tasks`);
  assert.equal(getResponse.status, 200);

  const tasks = await getResponse.json();
  const createdTask = tasks.find((task) => task.id === postData.task.id);

  assert.ok(createdTask);
  assert.equal(createdTask.title, title);
  assert.equal(createdTask.done, false);
});

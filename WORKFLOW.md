## What I Built

A task creation form with validation. It is connected to the already existing `/api/tasks` route.

---

## Round 1 — Simple/Vague Prompt

**Prompt I used:** "Add a form to submit tasks."

**Time I spent:** 15 minutes

**What it gave me:** It made a simple form using HTML's built-in `required` and `maxlength="200"`. It also added a small JS check that removes extra spaces from the input and rejects it if it is empty after that. But it did not check for minimum length, so even a single letter like `"a"` was accepted. Tasks were saved in memory, and after every successful submission, the full task list was fetched and shown again below the form. No test files were made in this round.

---

## Round 2 — Detailed/Precise Prompt

**Prompt I used:** "In public/index.html and index.js, add a task creation form with a text input for the task title. If the title is empty or under 3 characters, show an inline red error message and block submission. On valid submit, send a POST request to /api/tasks with the title, and show a success message. Use plain JavaScript only, no external libraries. After writing the code, write test cases for empty input, short input, and valid input, run them, and tell me the results."

**Time I spent:** 30 minutes

**What it gave me:** This time the form had proper inline validation. It also created a separate `public/index.js` file with 77 new lines for client-side logic, and two test files. `test/task-form.test.js` had 21 lines and `test/tasks-api.test.js` had 41 lines. These tests covered form validation and the API route. It also trimmed extra spaces before saving, so `" hello "` was saved as `"hello"`. But there was one problem in the first version. the POST route was showing the task in the response but not actually saving it. I had to ask again to fix this, and then it worked correctly.

---

## Comparison

### Correctness

Both rounds removed extra spaces before checking for empty input, so something like `" "` was correctly rejected in both. The real difference was the minimum length check. Round 1 only checked if the input was empty after trimming, so a single character like `"a"` passed through without any problem. Round 2 properly rejected anything under 3 characters, which makes more sense.

Round 2 had a bug in its first output. the POST route was sending back the task in the response but never actually saving it in the memory array. So when I checked `GET /api/tasks`, it kept showing the same 3 old tasks no matter what I submitted. I caught this by testing the route manually in the browser, and then fixed it with one more follow-up prompt. Interestingly, Round 1 never had this problem. it saved tasks correctly from the very beginning.

### Accessibility

Neither round was fully accessible, but they both failed in different ways.

Round 1 used the HTML `required` attribute, which screen readers can detect automatically. But the input had no proper `<label>`, only a placeholder. This is a problem because placeholders disappear when the user starts typing, and not all screen readers read them properly. Also, the status message had no `aria-live` region, so screen reader users would not hear the error or success messages when they appeared.

Round 2 had a proper `<label for="task-title">` connected to the input, which is the better approach. But it used `<form novalidate>`, which turns off the browser's built-in validation and depends only on custom JS. Its error messages also had no `aria-live` or `role="alert"`, so screen reader users still would not be notified of errors automatically.

To summarize, Round 2's proper label is the bigger win, but both rounds share the same gap. error and status messages are not announced to assistive technology without an `aria-live` region.

### Edge Cases

Both rounds handled whitespace correctly, so `" "` was rejected by both. The main gap was minimum length. Round 1 accepted any non-empty title including a single character, while Round 2 rejected anything under 3 characters.

Round 2 also had a proper test suite covering three cases. empty input, short input, and valid input, plus a test confirming the submitted task actually appears in `GET /api/tasks` afterward. Round 1 had no tests at all, so edge cases could only be found by testing manually.

Neither round tested very long titles on the server side, or special characters and emojis. These are gaps that should be handled in future rounds.

### Review Effort

Round 1 was quick to finish and easy to accept. But its shallow validation would only become a problem later, since nothing automatically caught it. I would have had to notice it myself by trying different inputs manually.

Round 2 took more time to prompt and review. Its first version even had a bug that I only caught by manually hitting the API route in the browser. One follow-up prompt fixed it. After that, the 62-line test suite gave me confidence in the rest of the behavior without having to re-test everything by hand.

### Mistakes the AI Made

In Round 2, the first version of `POST /api/tasks` never actually saved the task into the memory array. It just sent the task back in the response, so `GET /api/tasks` kept returning the same 3 old tasks every time. The form showed a success message, but the task was silently being thrown away. I caught this by checking the live route directly, and fixed it with a follow-up prompt.

It is worth noting that Round 1, even though it used a vague prompt, never had this bug. It saved tasks correctly from the start. Its only real weakness was in validation, not in saving data.

---

## Diff Summary


| File                     | Changes                    |
| ------------------------ | -------------------------- |
| `index.js`               | 32 additions, 13 deletions |
| `package.json`           | 2 additions, 1 deletion    |
| `public/index.html`      | 44 additions, 1 deletion   |
| `public/index.js`        | 77 additions (new file)    |
| `test/task-form.test.js` | 21 additions (new file)    |
| `test/tasks-api.test.js` | 41 additions (new file)    |


Round 2 added two new test files with 62 lines total and a separate client-side JS file. None of these existed after Round 1. Some of these changes also include the fix I applied after catching the persistence bug, not just the original output.

---

## Key Takeaway

After completing this assignment, I noticed that even with a precise prompt and a request for tests, Round 2's version didn't store the titles in memory. Round 1, on the other hand, handled persistence correctly with just a six-word prompt which is simply a reminder that a more detailed prompt doesn't automatically mean a more correct result, and manual verification still matters regardless of how careful the prompt was.

---


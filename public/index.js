function validateTaskTitle(title) {
  const trimmed = String(title ?? "").trim();

  if (trimmed.length === 0) {
    return { valid: false, message: "Title cannot be empty." };
  }

  if (trimmed.length < 3) {
    return { valid: false, message: "Title must be at least 3 characters." };
  }

  return { valid: true, value: trimmed };
}

function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.hidden = false;
}

function hideError(errorElement) {
  errorElement.textContent = "";
  errorElement.hidden = true;
}

function showSuccess(successElement, message) {
  successElement.textContent = message;
  successElement.hidden = false;
}

function hideSuccess(successElement) {
  successElement.textContent = "";
  successElement.hidden = true;
}

if (typeof document !== "undefined") {
  const form = document.getElementById("task-form");
  const titleInput = document.getElementById("task-title");
  const errorElement = document.getElementById("task-title-error");
  const successElement = document.getElementById("task-success");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideSuccess(successElement);

    const result = validateTaskTitle(titleInput.value);

    if (!result.valid) {
      showError(errorElement, result.message);
      return;
    }

    hideError(errorElement);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: result.value }),
      });

      if (!response.ok) {
        const data = await response.json();
        showError(errorElement, data.error || "Failed to create task.");
        return;
      }

      showSuccess(successElement, "Task created successfully!");
      titleInput.value = "";
    } catch (err) {
      showError(errorElement, "Network error. Please try again.");
    }
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { validateTaskTitle };
}

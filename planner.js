const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const error = document.querySelector("#task-error");
const summary = document.querySelector("#task-summary");
let tasks = [];
let nextId = 1;

function updateSummary() {
  const completed = tasks.filter((task) => task.done).length;
  summary.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"} · ${completed} completed`;
}

function renderTasks() {
  list.replaceChildren();
  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.style.cssText = "display:flex;align-items:center;gap:.75rem;padding:.85rem;border:1px solid var(--line);border-radius:10px;background:var(--bg)";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `Mark ${task.title} as ${task.done ? "not completed" : "completed"}`);
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      renderTasks();
    });
    const title = document.createElement("span");
    title.textContent = task.title;
    title.style.cssText = "flex:1;overflow-wrap:anywhere";
    if (task.done) title.style.textDecoration = "line-through";
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "button button-secondary";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", `Remove ${task.title}`);
    remove.addEventListener("click", () => {
      tasks = tasks.filter((candidate) => candidate.id !== task.id);
      renderTasks();
    });
    item.append(checkbox, title, remove);
    list.append(item);
  });
  updateSummary();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) {
    error.textContent = "Please enter a task before adding it.";
    input.focus();
    return;
  }
  error.textContent = "";
  tasks.push({ id: nextId++, title, done: false });
  input.value = "";
  renderTasks();
  input.focus();
});
input.addEventListener("input", () => { error.textContent = ""; });

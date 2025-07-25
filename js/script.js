const form = document.getElementById("todo-form");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const statusFilter = document.getElementById("statusFilter");
const dateFilter = document.getElementById("dateFilter");
const todoList = document.getElementById("todoList");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let todos = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = taskInput.value.trim();
  const date = taskDate.value;

  if (task === "" || date === "") return;

  todos.push({ task, date, status: "pending" });

  taskInput.value = "";
  taskDate.value = "";

  renderTodos();
});

function renderTodos() {
  todoList.innerHTML = "";

  const statusVal = statusFilter.value;
  const dateVal = dateFilter.value;

  const filteredTodos = todos.filter((todo) => {
    const matchStatus = statusVal === "all" || todo.status === statusVal;
    const matchDate = dateVal === "" || todo.date === dateVal;
    return matchStatus && matchDate;
  });

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;">Tidak ada tugas ditemukan.</td>
      </tr>
    `;
    return;
  }

  filteredTodos.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.status === "pending" ? "pending" : "Selesai"}</td>
      <td>
        <button onclick="toggleStatus(${index})">
          ${todo.status === "pending" ? "Tandai Selesai" : "Tandai Belum"}
        </button>
        <button onclick="deleteTodo(${index})">Hapus</button>
      </td>
    `;

    todoList.appendChild(row);
  });
}

function toggleStatus(index) {
  todos[index].status =
    todos[index].status === "pending" ? "completed" : "pending";
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

deleteAllBtn.addEventListener("click", function () {
  if (confirm("Apakah kamu yakin ingin menghapus semua tugas?")) {
    todos = [];
    renderTodos();
  }
});

statusFilter.addEventListener("change", renderTodos);
dateFilter.addEventListener("change", renderTodos);

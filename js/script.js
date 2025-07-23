const form = document.getElementById("todo-form");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("taskDate");
const filterBtn = document.getElementById("filterBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const table = document.querySelector("table");


let tbody = document.createElement("tbody");
table.appendChild(tbody);

form.addEventListener("submit", function (e) {
  e.preventDefault();


  const clickedButton = e.submitter;
  if (clickedButton === filterBtn || clickedButton === deleteAllBtn) return;

  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Silakan isi task dan tanggal terlebih dahulu!");
    return;
  }

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${task}</td>
    <td>${date}</td>
    <td>Pending</td>
    <td>
      <button class="done-btn">Selesai</button>
      <button class="delete-btn">Hapus</button>
    </td>
  `;

  tbody.appendChild(row);

  taskInput.value = "";
  dateInput.value = "";
});

tbody.addEventListener("click", function (e) {
  const row = e.target.closest("tr");

  if (e.target.classList.contains("done-btn")) {
    row.children[2].textContent = "Selesai";
    e.target.remove();
  }

  if (e.target.classList.contains("delete-btn")) {
    const confirmDelete = confirm("Yakin ingin menghapus task ini?");
    if (confirmDelete) {
      row.remove();
    }
  }
});

filterBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const filter = prompt(
    "Filter tugas: ketik 'pending' atau 'selesai'"
  ).toLowerCase();

  const rows = tbody.querySelectorAll("tr");
  rows.forEach((row) => {
    const status = row.children[2].textContent.toLowerCase();
    if (filter === "pending" || filter === "selesai") {
      row.style.display = status === filter ? "" : "none";
    } else {
      row.style.display = "";
    }
  });
});

deleteAllBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const confirmDelete = confirm("Yakin ingin menghapus semua task?");
  if (confirmDelete) {
    tbody.innerHTML = "";
  }
});

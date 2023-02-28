const addInput = document.querySelector("#todotext");
const addTodo = document.querySelector("#sendcircle");
const deleteTodo = document.querySelector("#trashcan-photo");
const todoList = document.querySelector(".ul-list");
const cardbodyİnputSend = document.querySelector(".todoinput-sendcircle");
const cardbodyList = document.querySelector(".todolist");
const cardbodyTodolist = document.querySelector(".todocard");
const form = document.querySelector("#form");

let todos = [];
runEvents();

function runEvents() {
  form.addEventListener("submit", AddingTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  cardbodyList.addEventListener("click", removeTodoToUI);
  deleteTodo.addEventListener("click", allTodosEveryWhere);
}

function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function allTodosEveryWhere() {
  const todoListesi = document.querySelectorAll(".checked");
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      todo.remove();
    });
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    alert("Başarılı bir şekilde tüm öğeler silindi.");
  } else {
    alert("Silinecek öğe bulunamadı.");
  }
}

function removeTodoToUI(e) {
  if (e.target.className === "checked") {
    const todo = e.target;
    todo.remove();
    removoTodoToStorage(todo.textContent);
  }
}

function AddingTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    alert("Lütfen bir değer giriniz.");
  } else {
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
  }
  e.preventDefault();
}

function removoTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  li.className = "checked";
  li.textContent = newTodo;

  const i = document.createElement("i");
  i.className = "fa fa-remove";
  li.appendChild(i);
  todoList.appendChild(li);
  addInput.value = "";
}

function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

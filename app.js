class TODOItem {
	constructor(text, status) {
		this.text = text;
		this.status = status;
	}
}

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

const UNCOMPLETED = "UNCOMPLETED";
const COMPLETED = "COMPLETED";

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function deleteCheck(e) {	
	const item = e.target;
	
	if (item.classList[0] === "trash-btn") {
		const todo = item.parentElement;
		
		todo.classList.add("fall");
		removeLocalTodos(todo.children[0].innerText);
		todo.addEventListener("transitionend", function () {
			todo.remove();
		});
	}


	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
		saveLocalTodos(new TODOItem(todo.children[0].innerText, COMPLETED));
	}
}

function addTodo(event) {
	event.preventDefault();

	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	
	saveLocalTodos(new TODOItem(todoInput.value, UNCOMPLETED));

	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);

	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);

	todoList.appendChild(todoDiv);
	todoInput.value = "";
}

function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if (todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "uncompleted":
				if (!todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

function saveLocalTodos(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	const itemIndex = todos.findIndex((element, index) => {
		if (element.text === todo.text) {
			return true;
		}
	});
	if (itemIndex == -1) {
		todos.push(todo);
	} else {
		if (todos[itemIndex].status === COMPLETED) {
			todo.status = UNCOMPLETED;
		} else if (todos[itemIndex].status === UNCOMPLETED) {
			todo.status = COMPLETED;
		}
		todos[itemIndex] = todo;
	}
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach((todo) => createTodoItem(todo));
}

function createTodoItem(todo) {
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");

	const newTodo = document.createElement("li");
	newTodo.innerText = todo.text;
	newTodo.classList.add("todo-item");
	if (todo.status === COMPLETED) {
		todoDiv.classList.toggle("completed");
	}
	todoDiv.appendChild(newTodo);

	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);

	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);

	todoList.appendChild(todoDiv);
}

function removeLocalTodos(todoText) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	const itemIndex = todos.findIndex((element, index) => {
		if (element.text === todoText) {
			return true;
		}
	});

	if (itemIndex != -1) {
		todos.splice(itemIndex, 1);
	}
	localStorage.setItem("todos", JSON.stringify(todos));
}
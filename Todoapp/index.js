const inputBox = document.getElementById('inputBox');
const addbtn = document.getElementById('addbtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// Load todos from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.forEach(todoText => {
        addTodoElement(todoText);
    });
});

// Function to add todo
const addTodo = () => {
    const inputText = inputBox.value.trim();

    if (inputText.length <= 0) {
        alert("Write Something in your todo");
        return;
    }

    if (addbtn.value === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = inputText;
        updateLocalTodos();
        addbtn.value = "Add";
        inputBox.value = "";
    } else {
        addTodoElement(inputText);
        saveLocalTodos(inputText);
        inputBox.value = "";
    }
};

// Function to create and add todo item to list
const addTodoElement = (todoText) => {
    const li = document.createElement("li");
    const p = document.createElement("p");

    p.innerHTML = todoText;
    li.appendChild(p);

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "editBtn");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "deleteBtn");
    deleteBtn.innerText = "Remove";
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
};

// Save todo in localStorage
const saveLocalTodos = (todoText) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove todo from localStorage
const removeLocalTodo = (todoText) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => todo !== todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Update localStorage when todos are edited
const updateLocalTodos = () => {
    let todos = [...todoList.getElementsByTagName("p")].map(p => p.innerText);
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Handle edit & delete events
const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        let todoText = e.target.previousElementSibling.previousElementSibling.innerHTML;
        removeLocalTodo(todoText);
        todoList.removeChild(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addbtn.value = "Edit";
        editTodo = e;
    }
};

// Event listeners
addbtn.addEventListener('click', addTodo);
todoList.addEventListener("click", updateTodo);

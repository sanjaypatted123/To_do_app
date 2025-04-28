// Select DOM elements
const todoInput = document.getElementById('todo-input');
const addTaskButton = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');

// Task storage array
let tasks = [];

// Save tasks to localStorage
const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Load tasks from localStorage
const loadTasks = () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  renderTasks();
};

// Add task function
const addTask = () => {
  const taskText = todoInput.value.trim();
  if (taskText !== "") {
    tasks.push(taskText);
    todoInput.value = "";
    saveTasks();
    renderTasks();
  }
};

// Delete task function
const deleteTask = (index) => {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
};

// Edit task function
const editTask = (index) => {
  const newTaskText = prompt("Edit your task:", tasks[index]);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    tasks[index] = newTaskText;
    saveTasks();
    renderTasks();
  }
};

// Render tasks
const renderTasks = () => {
  todoList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.textContent = task;
    li.appendChild(taskText);

    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.addEventListener('click', () => editTask(index));
    li.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', () => deleteTask(index));
    li.appendChild(deleteButton);

    todoList.appendChild(li);
  });
};

// Initial load
loadTasks();

// Add task button event
addTaskButton.addEventListener('click', addTask);

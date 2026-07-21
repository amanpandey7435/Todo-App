
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render existing tasks
    tasks.forEach(task => renderTask(task));

    addTaskButton.addEventListener('click', addTask);

    todoInput.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText
        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = "";

        console.log(tasks);
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        li.classList.add('todo-item');

        li.innerHTML = `
            <div class="addlist">
                <span class="task-text">${task.text}</span>
                <button type="button" class="btn btn-danger delete-btn">Delete</button>
            </div>
        `;

        // Delete functionality
        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
        });

        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
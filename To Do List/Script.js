const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    createTaskElement(taskText, false);
    
    taskInput.value = "";
    
    saveTasks();
}

function createTaskElement(text, isCompleted) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">×</button>
    `;

    if (isCompleted) {
        listItem.classList.add('completed');
    }

    listItem.addEventListener('click', function() {
        listItem.classList.toggle('completed');
        saveTasks();
    });

    const deleteBtn = listItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        taskList.removeChild(listItem);
        saveTasks();
    });

    taskList.appendChild(listItem);
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(listItem => {
        tasks.push({
            text: listItem.querySelector('span').innerText,
            completed: listItem.classList.contains('completed')
        });
    });

    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('todoTasks');

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }
}

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
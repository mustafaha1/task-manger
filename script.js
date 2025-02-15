// script.js
/*
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskImage = document.getElementById('taskImage');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const imageFile = taskImage.files[0];

        if (taskText !== '' || imageFile) {
            addTask(taskText, imageFile);
            taskInput.value = '';
            taskImage.value = ''; // Clear the file input
            saveTasks();
        }
    });

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            const imageFile = taskImage.files[0];

            if (taskText !== '' || imageFile) {
                addTask(taskText, imageFile);
                taskInput.value = '';
                taskImage.value = ''; // Clear the file input
                saveTasks();
            }
        }
    });

    function addTask(taskText, imageFile, isCompleted = false) {
        const li = document.createElement('li');
        if (isCompleted) {
            li.classList.add('completed');
        }

        // Add task text
        if (taskText) {
            const taskTextElement = document.createElement('span');
            taskTextElement.textContent = taskText;
            li.appendChild(taskTextElement);
        }

        // Add image if available
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                li.appendChild(img);
            };
            reader.readAsDataURL(imageFile);
        }

        // Add edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        editBtn.addEventListener('click', function() {
            const newTaskText = prompt('Edit your task', taskText);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                li.querySelector('span').textContent = newTaskText.trim();
                saveTasks();
            }
        });

        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            saveTasks();
        });

        // Toggle completed status
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(li) {
            const taskText = li.querySelector('span') ? li.querySelector('span').textContent : '';
            const imageSrc = li.querySelector('img') ? li.querySelector('img').src : '';
            tasks.push({
                text: taskText,
                image: imageSrc,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            if (task.image) {
                // Convert base64 image to a file object
                fetch(task.image)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], 'task-image.png', { type: 'image/png' });
                        addTask(task.text, file, task.completed);
                    });
            } else {
                addTask(task.text, null, task.completed);
            }
        });
    }
});*/
// script.js
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskImage = document.getElementById('taskImage');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const shareTaskBtn = document.getElementById('shareTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const imageFiles = taskImage.files;

        if (taskText !== '' || imageFiles.length > 0) {
            addTask(taskText, imageFiles);
            taskInput.value = '';
            taskImage.value = ''; // Clear the file input
            saveTasks();
        }
    });

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            const imageFiles = taskImage.files;

            if (taskText !== '' || imageFiles.length > 0) {
                addTask(taskText, imageFiles);
                taskInput.value = '';
                taskImage.value = ''; // Clear the file input
                saveTasks();
            }
        }
    });

    shareTaskBtn.addEventListener('click', function() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (tasks.length === 0) {
            alert('No tasks to share!');
            return;
        }

        // Convert tasks to a readable format
        let shareText = 'Task List:\n\n';
        tasks.forEach((task, index) => {
            shareText += `${index + 1}. ${task.text} (${task.completed ? 'Completed' : 'Pending'})\n`;
        });

        // Use the Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: 'My Task List',
                text: shareText,
            }).catch((error) => {
                console.error('Error sharing:', error);
            });
        } else {
            // Fallback: Copy to clipboard or open email client
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Task list copied to clipboard!');
            }).catch(() => {
                const subject = encodeURIComponent('My Task List');
                const body = encodeURIComponent(shareText);
                window.location.href = `mailto:?subject=${subject}&body=${body}`;
            });
        }
    });

    function addTask(taskText, imageFiles, isCompleted = false) {
        const li = document.createElement('li');
        if (isCompleted) {
            li.classList.add('completed');
        }

        // Add task text
        if (taskText) {
            const taskTextElement = document.createElement('span');
            taskTextElement.textContent = taskText;
            li.appendChild(taskTextElement);
        }

        // Add images if available
        if (imageFiles && imageFiles.length > 0) {
            for (const file of imageFiles) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    li.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        }

        // Add edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        editBtn.addEventListener('click', function() {
            const newTaskText = prompt('Edit your task', taskText);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                li.querySelector('span').textContent = newTaskText.trim();
                saveTasks();
            }
        });

        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            saveTasks();
        });

        // Toggle completed status
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(li) {
            const taskText = li.querySelector('span') ? li.querySelector('span').textContent : '';
            const images = [];
            li.querySelectorAll('img').forEach(img => images.push(img.src));
            tasks.push({
                text: taskText,
                images: images,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            if (task.images && task.images.length > 0) {
                const imageFiles = [];
                task.images.forEach(imageSrc => {
                    fetch(imageSrc)
                        .then(res => res.blob())
                        .then(blob => {
                            const file = new File([blob], 'task-image.png', { type: 'image/png' });
                            imageFiles.push(file);
                            if (imageFiles.length === task.images.length) {
                                addTask(task.text, imageFiles, task.completed);
                            }
                        });
                });
            } else {
                addTask(task.text, null, task.completed);
            }
        });
    }
});
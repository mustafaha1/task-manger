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
/*
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
});*/

// script.js

/*
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskImage = document.getElementById('taskImage');
    const taskDateTime = document.getElementById('taskDateTime');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const shareTaskBtn = document.getElementById('shareTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const imageFiles = taskImage.files;
        const dueDateTime = taskDateTime.value;

        if (taskText !== '' || imageFiles.length > 0) {
            addTask(taskText, imageFiles, dueDateTime);
            taskInput.value = '';
            taskImage.value = ''; // Clear the file input
            taskDateTime.value = ''; // Clear the date and time input
            saveTasks();
        }
    });

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            const imageFiles = taskImage.files;
            const dueDateTime = taskDateTime.value;

            if (taskText !== '' || imageFiles.length > 0) {
                addTask(taskText, imageFiles, dueDateTime);
                taskInput.value = '';
                taskImage.value = ''; // Clear the file input
                taskDateTime.value = ''; // Clear the date and time input
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
            shareText += `${index + 1}. ${task.text} (Due: ${task.dueDateTime || 'No due date'})\n`;
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

    function addTask(taskText, imageFiles, dueDateTime, isCompleted = false) {
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

        // Add due date and time
        if (dueDateTime) {
            const dueDateElement = document.createElement('div');
            dueDateElement.textContent = `Due: ${new Date(dueDateTime).toLocaleString()}`;
            li.appendChild(dueDateElement);

            // Set a notification for the due date and time
            setNotification(taskText, dueDateTime);
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

    function setNotification(taskText, dueDateTime) {
        const dueDate = new Date(dueDateTime).getTime();
        const now = new Date().getTime();
        const timeUntilDue = dueDate - now;

        if (timeUntilDue > 0) {
            setTimeout(() => {
                showNotification(taskText);
            }, timeUntilDue);
        }
    }

    function showNotification(taskText) {
        if (Notification.permission === 'granted') {
            new Notification('Task Due', {
                body: `Task: ${taskText} is due now!`,
                icon: 'icon.png', // Add an icon if needed
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Task Due', {
                        body: `Task: ${taskText} is due now!`,
                        icon: 'icon.png', // Add an icon if needed
                    });
                }
            });
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(li) {
            const taskText = li.querySelector('span') ? li.querySelector('span').textContent : '';
            const dueDateTime = li.querySelector('div') ? li.querySelector('div').textContent.replace('Due: ', '') : '';
            const images = [];
            li.querySelectorAll('img').forEach(img => images.push(img.src));
            tasks.push({
                text: taskText,
                dueDateTime: dueDateTime,
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
                                addTask(task.text, imageFiles, task.dueDateTime, task.completed);
                            }
                        });
                });
            } else {
                addTask(task.text, null, task.dueDateTime, task.completed);
            }
        });
    }

    // Request notification permission on page load
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
});*/
/*
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskImage = document.getElementById('taskImage');
    const taskDateTime = document.getElementById('taskDateTime');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const shareTaskBtn = document.getElementById('shareTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    // Request notification permission on page load
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else {
                console.log('Notification permission denied.');
            }
        });
    }

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const imageFiles = taskImage.files;
        const dueDateTime = taskDateTime.value;

        if (taskText !== '' || imageFiles.length > 0) {
            addTask(taskText, imageFiles, dueDateTime);
            taskInput.value = '';
            taskImage.value = ''; // Clear the file input
            taskDateTime.value = ''; // Clear the date and time input
            saveTasks();
        }
    });

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            const imageFiles = taskImage.files;
            const dueDateTime = taskDateTime.value;

            if (taskText !== '' || imageFiles.length > 0) {
                addTask(taskText, imageFiles, dueDateTime);
                taskInput.value = '';
                taskImage.value = ''; // Clear the file input
                taskDateTime.value = ''; // Clear the date and time input
                saveTasks();
            }
        }
    });

    function addTask(taskText, imageFiles, dueDateTime, isCompleted = false) {
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

        // Add due date and time
        if (dueDateTime) {
            const dueDateElement = document.createElement('div');
            dueDateElement.textContent = `Due: ${new Date(dueDateTime).toLocaleString()}`;
            li.appendChild(dueDateElement);

            // Set a notification for the due date and time
            setNotification(taskText, dueDateTime);
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

    function setNotification(taskText, dueDateTime) {
        const dueDate = new Date(dueDateTime).getTime();
        const now = new Date().getTime();
        const timeUntilDue = dueDate - now;

        console.log(`Due Date: ${new Date(dueDateTime).toLocaleString()}`);
        console.log(`Current Time: ${new Date(now).toLocaleString()}`);
        console.log(`Time Until Due: ${timeUntilDue} ms`);

        if (timeUntilDue > 0) {
            console.log(`Notification set for task: ${taskText} at ${new Date(dueDateTime).toLocaleString()}`);
            setTimeout(() => {
                showNotification(taskText);
            }, timeUntilDue);
        } else {
            console.log('Due date is in the past. No notification set.');
        }
    }

    function showNotification(taskText) {
        if (Notification.permission === 'granted') {
            console.log('Showing notification for task:', taskText);
            new Notification('Task Due', {
                body: `Task: ${taskText} is due now!`,
            });
        } else {
            console.log('Notification permission not granted.');
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(li) {
            const taskText = li.querySelector('span') ? li.querySelector('span').textContent : '';
            const dueDateTime = li.querySelector('div') ? li.querySelector('div').textContent.replace('Due: ', '') : '';
            const images = [];
            li.querySelectorAll('img').forEach(img => images.push(img.src));
            tasks.push({
                text: taskText,
                dueDateTime: dueDateTime,
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
                                addTask(task.text, imageFiles, task.dueDateTime, task.completed);
                            }
                        });
                });
            } else {
                addTask(task.text, null, task.dueDateTime, task.completed);
            }
        });
    }
});*/

//satrt with service-worker from here
/*
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskImage = document.getElementById('taskImage');
    const taskDateTime = document.getElementById('taskDateTime');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const shareTaskBtn = document.getElementById('shareTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    // Register the Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const imageFiles = taskImage.files;
        const dueDateTime = taskDateTime.value;

        if (taskText !== '' || imageFiles.length > 0) {
            addTask(taskText, imageFiles, dueDateTime);
            taskInput.value = '';
            taskImage.value = ''; // Clear the file input
            taskDateTime.value = ''; // Clear the date and time input
            saveTasks();
        }
    });

    function addTask(taskText, imageFiles, dueDateTime, isCompleted = false) {
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

        // Add due date and time
        if (dueDateTime) {
            const dueDateElement = document.createElement('div');
            dueDateElement.textContent = `Due: ${new Date(dueDateTime).toLocaleString()}`;
            li.appendChild(dueDateElement);

            // Set a notification for the due date and time
            setNotification(taskText, dueDateTime);
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

    function setNotification(taskText, dueDateTime) {
        const dueDate = new Date(dueDateTime).getTime();
        const now = new Date().getTime();
        const timeUntilDue = dueDate - now;

        if (timeUntilDue > 0) {
            console.log(`Notification set for task: ${taskText} at ${new Date(dueDateTime).toLocaleString()}`);
            setTimeout(() => {
                sendPushNotification(taskText);
            }, timeUntilDue);
        } else {
            console.log('Due date is in the past. No notification set.');
        }
    }

    function sendPushNotification(taskText) {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then(registration => {
                registration.active.postMessage({
                    title: 'Task Due',
                    body: `Task: ${taskText} is due now!`,
                });
            });
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(li) {
            const taskText = li.querySelector('span') ? li.querySelector('span').textContent : '';
            const dueDateTime = li.querySelector('div') ? li.querySelector('div').textContent.replace('Due: ', '') : '';
            const images = [];
            li.querySelectorAll('img').forEach(img => images.push(img.src));
            tasks.push({
                text: taskText,
                dueDateTime: dueDateTime,
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
                                addTask(task.text, imageFiles, task.dueDateTime, task.completed);
                            }
                        });
                });
            } else {
                addTask(task.text, null, task.dueDateTime, task.completed);
            }
        });
    }
});*/

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskImage = document.getElementById('taskImage');
    const taskDateTime = document.getElementById('taskDateTime');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const shareTaskBtn = document.getElementById('shareTaskBtn');
    const shareMethod = document.getElementById('shareMethod');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const imageFiles = taskImage.files;
        const dueDateTime = taskDateTime.value;

        if (taskText !== '' || imageFiles.length > 0) {
            addTask(taskText, imageFiles, dueDateTime);
            taskInput.value = '';
            taskImage.value = ''; // Clear the file input
            taskDateTime.value = ''; // Clear the date and time input
            saveTasks();
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
            shareText += `${index + 1}. ${task.text} (Due: ${task.dueDateTime || 'No due date'})\n`;
        });

        const selectedMethod = shareMethod.value;

        switch (selectedMethod) {
            case 'email':
                shareViaEmail(shareText);
                break;
            case 'social':
                shareViaSocialMedia(shareText);
                break;
            case 'copy':
                copyToClipboard(shareText);
                break;
            default:
                alert('Invalid sharing method.');
        }
    });

    function shareViaEmail(shareText) {
        const subject = encodeURIComponent('My Task List');
        const body = encodeURIComponent(shareText);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }

    function shareViaSocialMedia(shareText) {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(shareText);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }

    function copyToClipboard(shareText) {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Task list copied to clipboard!');
        }).catch(() => {
            alert('Failed to copy task list.');
        });
    }

    function addTask(taskText, imageFiles, dueDateTime, isCompleted = false) {
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

        // Add due date and time
        if (dueDateTime) {
            const dueDateElement = document.createElement('div');
            dueDateElement.textContent = `Due: ${new Date(dueDateTime).toLocaleString()}`;
            li.appendChild(dueDateElement);

            // Set a notification for the due date and time
            setNotification(taskText, dueDateTime);
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

    function setNotification(taskText, dueDateTime) {
        const dueDate = new Date(dueDateTime).getTime();
        const now = new Date().getTime();
        const timeUntilDue = dueDate - now;

        if (timeUntilDue > 0) {
            console.log(`Notification set for task: ${taskText} at ${new Date(dueDateTime).toLocaleString()}`);
            setTimeout(() => {
                showNotification(taskText);
            }, timeUntilDue);
        } else {
            console.log('Due date is in the past. No notification set.');
        }
    }

    function showNotification(taskText) {
        if (Notification.permission === 'granted') {
            console.log('Showing notification for task:', taskText);
            new Notification('Task Due', {
                body: `Task: ${taskText} is due now!`,
            });
        } else {
            console.log('Notification permission not granted.');
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(li) {
            const taskText = li.querySelector('span') ? li.querySelector('span').textContent : '';
            const dueDateTime = li.querySelector('div') ? li.querySelector('div').textContent.replace('Due: ', '') : '';
            const images = [];
            li.querySelectorAll('img').forEach(img => images.push(img.src));
            tasks.push({
                text: taskText,
                dueDateTime: dueDateTime,
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
                                addTask(task.text, imageFiles, task.dueDateTime, task.completed);
                            }
                        });
                });
            } else {
                addTask(task.text, null, task.dueDateTime, task.completed);
            }
        });
    }
});
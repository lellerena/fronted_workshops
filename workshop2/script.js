/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} date
 * @property {boolean} done
 */

/** @type {Task[]} */
const tasks = []

document
    .getElementById('todo-form')
    .addEventListener('submit', function (event) {
        event.preventDefault()
        const taskInput = document.getElementById('task-input')
        const taskTitle = taskInput.value.trim()
        const taskDateValue = new Date().toLocaleDateString()
        const taskId = new Date().toISOString()
        if (taskTitle !== '') {
            tasks.push({
                id: taskId,
                title: taskTitle,
                date: taskDateValue,
                done: false
            })
            updateTaskList()
            taskInput.value = ''
        }
    })

function updateTaskList() {
    const todoList = document.getElementById('todo-list')
    const completedList = document.getElementById('completed-list')
    todoList.innerHTML = ''
    completedList.innerHTML = ''
    tasks.forEach(function (task, index) {
        const li = document.createElement('li')
        li.innerHTML = `
			<strong>${task.title}</strong> <br>
			<em>${task.date}</em> <br>
			<label>
				<input type="checkbox" ${
                    task.done ? 'checked' : ''
                } onchange="toggleTaskDone(${index})">
				Done
			</label>
			<button onclick="deleteTask(${index})">Delete</button>
		`
        if (task.done) {
            completedList.appendChild(li)
        } else {
            todoList.appendChild(li)
        }
    })
    console.log(tasks)
}

function toggleTaskDone(index) {
    tasks[index].done = !tasks[index].done
    updateTaskList()
}

function deleteTask(index) {
    tasks.splice(index, 1)
    updateTaskList()
}

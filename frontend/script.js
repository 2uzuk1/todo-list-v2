const add_button = document.querySelector('button')
const input_txt = document.querySelector('input')

function addTaskToList(task) {
    const ul = document.querySelector('#task-list')
    const li = document.createElement('li')
    li.className = "py-2 px-2"
    li.id = `task-${task.id}`

    const span = document.createElement('span')
    span.textContent = task.title
    span.className = "break-all max-w-[325px]"

    li.appendChild(span)
    ul.appendChild(li)
}

add_button.addEventListener('click', function() {
    const title = input_txt.value

    if (title === '') return

    fetch('http://127.0.0.1:8000/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: title, complete: false})
    })
    .then(response => response.json())
    .then(task => {
        addTaskToList(task)
        input_txt.value = ''
    })
})

function loadTasks() {
    fetch('http://127.0.0.1:8000/tasks')
    .then(response => response.json())
    .then(tasks => {
        console.log(tasks)

        tasks.forEach(task => addTaskToList(task))
    })
}

loadTasks()
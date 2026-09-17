const add_button = document.querySelector('#add-btn')
const input_txt = document.querySelector('input')

function addTaskToList(task) {
    const ul = document.querySelector('#task-list')
    const li = document.createElement('li')
    li.className = "py-2 px-2 flex justify-between items-center"
    li.id = `task-${task.id}`

    const span = document.createElement('span')
    span.textContent = task.title
    span.className = "break-all max-w-[325px]"

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'x'
    deleteBtn.className = 'text-[#0891b2] bg-[#f5f3ff] rounded-md px-3 py-1 font-bold transition duration-300 ease-in-out hover:scale-110 active:scale-100 active:opacity-100'
    deleteBtn.addEventListener('click', function() {
        deleteTask(task.id)
    })

    const rightDiv = document.createElement('div')
    rightDiv.className = 'flex items-center gap-2'
    rightDiv.append(deleteBtn)

    li.append(span)
    li.append(rightDiv)
    ul.append(li)
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

function deleteTask(id) {
    fetch(`http://127.0.0.1:8000/tasks/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        document.querySelector(`#task-${id}`).remove()
    })
}

loadTasks()
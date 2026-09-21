const add_button = document.querySelector('#add-btn')
const input_txt = document.querySelector('input')

function addTaskToList(task) {
    const ul = document.querySelector('#task-list')
    const li = document.createElement('li')
    li.className = "py-2 px-2 flex justify-between items-center gap-4"
    li.id = `task-${task.id}`

    const span = document.createElement('span')
    span.textContent = task.title
    span.className = "break-all max-w-[325px]"

    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    deleteBtn.className = 'text-[#0891b2] bg-[#f5f3ff] cursor-pointer rounded-md h-8 w-8 transition duration-300 ease-in-out hover:scale-110 active:scale-100'
    deleteBtn.addEventListener('click', function() {
        deleteTask(task.id)
    })

    const checkBtn = document.createElement('input')
    checkBtn.type = 'checkbox'
    checkBtn.className = 'hidden'
    checkBtn.id = `check-${task.id}`
    checkBtn.checked = task.complete

    const customCheck = document.createElement('div')
    customCheck.className = 'w-8 h-8 rounded-md border-2 border-[#f5f3ff] cursor-pointer flex items-center justify-center text-[#0891b2] font-bold transition duration-300 ease-in-out hover:scale-110 active:scale-100'

    if (task.complete) {
        customCheck.classList.add('bg-[#f5f3ff]')
        customCheck.textContent = '✓'
        span.classList.add('line-through', 'opacity-50')
    }

    customCheck.addEventListener('click', function() {
        checkBtn.checked = !checkBtn.checked
        fetch(`http://127.0.0.1:8000/tasks/${task.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: task.title, complete: checkBtn.checked})
        })
        if (checkBtn.checked) {
            customCheck.classList.add('bg-[#f5f3ff]')
            customCheck.innerHTML = '<i class="fa-solid fa-check"></i>'
            span.classList.add('line-through', 'opacity-50')
        } else {
            customCheck.classList.remove('bg-[#f5f3ff]')
            customCheck.textContent = ''
            span.classList.remove('line-through', 'opacity-50')
        }
    })
        
    const editTask = document.createElement('button')
    editTask.innerHTML = '<i class="fa-solid fa-pen"></i>'
    editTask.className = 'w-8 h-8 bg-[#f5f3ff] rounded-md cursor-pointer transition duration-300 ease-in-out hover:scale-110 active:scale-100 text-[#0891b2]'
    editTask.addEventListener('click', function(){
        
    })

    const rightDiv = document.createElement('div')
    rightDiv.className = 'flex items-center gap-2'
    rightDiv.append(customCheck)
    rightDiv.append(editTask)
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
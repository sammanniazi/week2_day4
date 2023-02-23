const addTaskInput = document.querySelector('#add-task');
const newTasks = document.querySelector('.new-tasks');

let taskList = [];

// Load task list from local storage, if available
if (localStorage.getItem('taskList')) {
  taskList = JSON.parse(localStorage.getItem('taskList'));
  taskList.forEach((todo) => {
    addTodoToDOM(todo);
  });
  updateTodo();
}

addTaskInput.addEventListener('keydown', function(event) {
  let todo = event.target.value;
  if (event.key === 'Enter' && todo.trim() !== '') {
    const newTask = {
      id: Date.now(),
      text: todo,
    };
    taskList.push(newTask);
    addTodoToDOM(newTask);
    event.target.value = '';
    updateTodo();

    // Store updated task list in local storage
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }
});

function addTodoToDOM(task) {
  let todoTask = ` 

    <div class="task ${task.completed ? 'completed' : ''}" data-id="${task.id}">
      <input type="text" class="added-task" disabled value="${task.text}">
      <div>
      
        <input type="button" value="✔️" class="update-task">
        <input type="button" value="✏️" class="rename-task">
        <input type="button" value="❎" class="del-task">
        
        <input type="button" value="Done" class="don-task">
      </div>
      
    </div>
  `;
  newTasks.insertAdjacentHTML('beforeend', todoTask);
}

function updateTodo() {
  let tasks = document.querySelectorAll('.task');

  tasks.forEach((task) => {
    let addedTask = task.querySelector('.added-task');
    let updateButton = task.querySelector('.update-task');
    let renameButton = task.querySelector('.rename-task');
    let deleteButton = task.querySelector('.del-task');
    let donebutton = task.querySelector('.don-task');


    let completedTask = task.querySelector('.completed-task');

    addedTask.addEventListener('input', (e) => {
      const taskId = task.dataset.id;
      const taskIndex = taskList.findIndex((t) => t.id == taskId);
      taskList[taskIndex].text = e.target.value;
    });

    updateButton.addEventListener('click', (e) => {
      addedTask.disabled = true;
      const taskId = task.dataset.id;
      const taskIndex = taskList.findIndex((t) => t.id == taskId);
      localStorage.setItem('taskList', JSON.stringify(taskList));
    });

    let originalTaskText = addedTask.value;
    renameButton.addEventListener('click', (e) => {
      addedTask.disabled = false;
      addedTask.focus();
    });

    addedTask.addEventListener('blur', (e) => {
      if (addedTask.value !== originalTaskText) {
        const taskId = task.dataset.id;
        const taskIndex = taskList.findIndex((t) => t.id == taskId);
        taskList[taskIndex].text = addedTask.value;
        localStorage.setItem('taskList', JSON.stringify(taskList));
      }
      addedTask.disabled = true;
    });

    deleteButton.addEventListener('click', (e) => {
      const taskId = task.dataset.id;
      const taskIndex = taskList.findIndex((t) => t.id == taskId);
      taskList = taskList.filter((t) => t.id != taskId);
      task.remove();
      localStorage.setItem('taskList', JSON.stringify(taskList));
    });
    donebutton.addEventListener('click', (e) => {
      const taskId = task.dataset.id;
      const taskIndex = taskList.findIndex((t) => t.id == taskId);
      const isCompleted = taskList[taskIndex].completed;
      taskList[taskIndex].completed = !isCompleted;
      if (isCompleted) {
        task.classList.remove('completed');
      } else {
        task.classList.add('completed');
      }
      localStorage.setItem('taskList', JSON.stringify(taskList));
    });
    

  });
}

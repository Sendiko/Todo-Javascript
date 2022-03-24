//* Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//* Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);

//* Functions
function addTodo(event){
    event.preventDefault();
    console.log('hello');

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');    

    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function deleteTodo(e){
    const item = e.target;

    if(item.classList[0] === 'trash-btn'){
        const parent = item.parentElement;
        parent.classList.add('fall');
        // parent.addEventListener("transition", function() {
        //     parent.remove()
        // });
        parent.remove();
    }

    if(item.classList[0] === 'complete-btn'){
        const parent = item.parentElement;
        parent.classList.toggle('completed');
    }
}

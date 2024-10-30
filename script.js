const addBtn = document.querySelector('#add-btn');
const taskInput = document.querySelector('#taskinput');
const listContainer = document.querySelector('#list-container');
const countValue = document.querySelector('.count-value');
const error = document.querySelector('#error');

let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};


const addTask = (event) => {
    event.preventDefault();

    const taskName = taskInput.value.trim();
    if(!taskName){
        error.style.display = 'block';
        error.innerHTML = 'Input must not be empty!';
        setTimeout(() => {
            error.style.display = 'none';
        }, 700);
        return;
    }

    const task = 
     `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">
        <img class="editimg" src="imgs/edit.png">
        </button>
        <button class="delete">
        <img class="deleteimg" src="imgs/delete.png">
        </button>
    <div/>`

    listContainer.insertAdjacentHTML('beforeend', task);

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((deletebtn) => {
        deletebtn.onclick = () => {
            deletebtn.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount); 
            updateTasks();
        }; 
    });

    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach((editbtn) => {
        editbtn.onclick = (e) => {
            let targetElement = e.target;
            if(!(e.target.className == 'edit')){
                targetElement = e.target.parentElement;
            }

            taskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount); 
            updateTasks();
        };
    });

    const taskCheck = document.querySelectorAll('.task-check');
    taskCheck.forEach((checkbox) => {
        checkbox.onchange = () => {
            checkbox.nextElementSibling.classList.toggle('completed');
            if(checkbox.checked) {
                taskCount -= 1;
            }else{
                taskCount += 1;
            }
            displayCount(taskCount);
            updateTasks();
        };  
    });

    taskCount += 1;
    displayCount(taskCount);
    taskInput.value ='';
    updateTasks();
   
};

addBtn.addEventListener('click', addTask)

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    taskInput.value ='';
    updateTasks();
}

function updateTasks () {
    localStorage.setItem('tasks', listContainer.innerHTML);
}

// function showTasks () {
//     taskCount += 1;
//     displayCount(taskCount);
//     listContainer.innerHTML = localStorage.getItem('tasks');
// }
// showTasks();
/*DECLARE THE VARIABLES IN THE DOM*/

const taskInput = document.getElementById("task");
const taskBtn = document.getElementById("btn");
const searchTask = document.getElementById("filter");
const  taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clear");

/** ADD EVENT ON THE BUTTON */

taskBtn.addEventListener('click', function(e){
    e.preventDefault();
    const task = taskInput.value.trim();

    if(task === ""){
        alert("Add the Task for Today!");
        return;

    }
        addTaskToDom(task);
        saveTaskToLocalStorage(task);

        taskInput.value = "";
   
});

/** Add task to the DOM */
function addTaskToDom(task){
//  creating the list element and adding it inside the ul
  const list = document.createElement("li");
  list.textContent = task ;  
  taskList.appendChild(list);
  list.style.backgroundColor = "#583da1";
  list.style.padding = '20px';
  taskInput.value = "";


//   creating a delete icon in a span element

const deleteTask = document.createElement("span");
deleteTask.innerHTML =`<i class="fa-solid fa-delete-left delete-icon"></i>`;
deleteTask.style.cursor="pointer";

list.appendChild(deleteTask);



}
taskList.addEventListener('click', function(e){

    if(e.target.classList.contains('delete-icon')){
        const li =e.target.closest("li");
        const taskToDelete = li.firstChild.textContent.trim();
        li.remove();
        deleteFromLocalStorage(taskToDelete);

    }

    
});
// to filter word
searchTask.addEventListener('keyup',function(){
const typed = searchTask.value.toLowerCase();
const filter = document.querySelectorAll('#taskList li');

filter.forEach(function(taskList){
    const listOfTask=taskList.textContent.toLowerCase();

    if(listOfTask.includes(typed)){
        taskList.style.display ="list-item";
    }
    else{
        taskList.style.display = "none";
    }
})

})
function saveTaskToLocalStorage(task){
    let tasks= JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));

}

function deleteFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks"))|| [];
    tasks = tasks.filter(t=>t!==task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    
}
clearBtn.addEventListener('click', function(){
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
})




document.addEventListener('DOMContentLoaded', function(){
    let task = JSON.parse(localStorage.getItem('tasks'));
    task.forEach(function (task){
addTaskToDom(task);
    })
})


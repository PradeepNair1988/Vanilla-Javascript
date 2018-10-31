const taskitem = document.querySelector("#task");
const filter = document.querySelector("#filter");
const clrtsk= document.querySelector("#cleartask");
const form= document.querySelector("form");
const collection = document.querySelector(".collection");

lodadEventlistner();
getLocalstorage();

function lodadEventlistner(){
    form.addEventListener('submit', addTask);
    collection.addEventListener("click", removeTask)
    clrtsk.addEventListener("click", clearTask)
    filter.addEventListener("keyup",filterTask)
}


function addTask(e) {
    storeToLocalStorage(taskitem.value);
    createElementli(taskitem.value);
    e.preventDefault();
}


function createElementli(task){
    if(task !== ""){
        const li= document.createElement("li");
        const link = document.createElement("a");
        li.className="collection-item";
        li.appendChild(document.createTextNode(task));
        link.className ="delete-item secondary-content";
        link.innerHTML="X";
        li.appendChild(link);
        collection.appendChild(li);
    }else{
        alert("Please Enter the Task");
    }
    
}

function storeToLocalStorage(data){
  let localtasks;
  if(localStorage.getItem("Tasklist") !== null){
    localtasks = JSON.parse(localStorage.getItem("Tasklist"));
  }else{
    localtasks=[];
  }
  localtasks.push(JSON.stringify(data));
  localStorage.setItem("Tasklist",JSON.stringify(localtasks));
}

function getLocalstorage(){
    if(localStorage.getItem("Tasklist")){
        let localtasks = JSON.parse(localStorage.getItem("Tasklist"));
        if(localtasks !== null){
            localtasks.forEach(function(tsk){
                createElementli(JSON.parse(tsk));
            });
        }
    }
    
}


function removeTask(e){
    if (e.target.classList.contains("delete-item")){
       removeFromLocalStorage( e.target.parentElement.firstChild.textContent);
        e.target.parentElement.remove();

    }
}

function clearTask(e) {
    if(collection.childElementCount > 0 ) {
        clearLocalStorage();
        collection.innerHTML="";
        e.preventDefault(); 
    }else {
        alert("No task available to clear");
    }
    
}

function filterTask(e){
    document.querySelectorAll(".collection-item").forEach(function(task){
        if(task.textContent.indexOf(filter.value) > -1 ){
            task.style.display = "block";
        }else {
            task.style.display = "none";
        }
    });
}

function removeFromLocalStorage(task){
    let tasklist = JSON.parse(localStorage.getItem("Tasklist"));
    tasklist.forEach(function (taskitm, index){
        if(JSON.parse(taskitm) === task) {
            tasklist.splice(index,1);
        }
    });
    localStorage.setItem("Tasklist",JSON.stringify(tasklist));
}

function clearLocalStorage(){
   // let tasklist = JSON.parse(localStorage.getItem("Tasklist"));
   localStorage.removeItem("Tasklist");
}
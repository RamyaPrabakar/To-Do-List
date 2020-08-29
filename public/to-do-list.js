const input = document.querySelector('.input');
const addButton = document.querySelector('.addButton');
var container = document.querySelector('.container');


function createDiv(taskName, task_ID){

    let task = document.createElement('input');
    task.value = taskName;
    task.disabled = true;
    task.classList.add('viewTask');
    task.type = "text";

    let edit = document.createElement('button');
    edit.innerHTML = "EDIT";
    edit.classList.add('editButton');

    let remove = document.createElement('button');
    remove.innerHTML = "REMOVE";
    remove.classList.add('removeButton');

    let taskBox = document.createElement('div');
    taskBox.classList.add('viewStage');

    let taskID = document.createElement('input');
    taskID.value = task_ID;
    taskID.disabled = true;
    taskID.classList.add('hiddentext');

    container.appendChild(taskBox);
    taskBox.appendChild(taskID);
    taskBox.appendChild(task);
    taskBox.appendChild(edit);
    taskBox.appendChild(remove);

    edit.addEventListener('click', function(){
        task.disabled = !task.disabled;

        if(task.disabled == true){
            editTaskInDB(task.value, task_ID);
        }
    });

    remove.addEventListener('click', function(){
        removeTaskFromDB(task_ID);
        container.removeChild(taskBox);
    });

}

function addTaskToDB(tName)
{
  var userRequest = new XMLHttpRequest();
  userRequest.open('post', '/addTask');
  userRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  userRequest.send(JSON.stringify({'taskName':tName}));

  userRequest.onreadystatechange = function() {
    if (userRequest.readyState == 4 && userRequest.status == 200)
    {
    //console.log(userRequest.responseText);
    var text = (userRequest.responseText).toString();
    var pj = JSON.parse(text);
    console.log(pj[0].task_id);
    createDiv(tName, pj[0].task_id);
    }
}

}

function editTaskInDB(tName, tID)
{
  console.log("Came to editTaskInDB");
  const userRequest = new XMLHttpRequest();
  userRequest.open('post', '/editTask');
  userRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  userRequest.send(JSON.stringify({'taskName':tName , 'taskID':tID}));

}

function removeTaskFromDB(task_id)
{
  const userRequest = new XMLHttpRequest();
  userRequest.open('post', '/removeTask');
  userRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  userRequest.send(JSON.stringify({'taskID':task_id}));
}

function getTasks(){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",'/getTasks',false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

 function verify(){
    var str = input.value.trim();
    if(str != ""){
       addTaskToDB(str);
       input.value = "";
    }
}

function main(){
    addButton.addEventListener('click', verify);
    document.addEventListener("DOMContentLoaded", function() {
        var json_obj = JSON.parse(getTasks());

        json_obj.forEach((item) => {
            createDiv(item.task_name, item.task_id);
        });
});
}

main();

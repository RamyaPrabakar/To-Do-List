const input = document.querySelector('.input');
const addButton = document.querySelector('.addButton');
var container = document.querySelector('.container');


function createDiv(taskName){

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

    container.appendChild(taskBox);
    taskBox.appendChild(task);
    taskBox.appendChild(edit);
    taskBox.appendChild(remove);

    edit.addEventListener('click', function(){
        task.disabled = !task.disabled;
    });

    remove.addEventListener('click', function(){
        container.removeChild(taskBox);
    });
}


 function verify(){
    var str = input.value.trim();
    if(str != ""){
        createDiv(str);
        input.value = "";
    }
}

function main(){
    addButton.addEventListener('click', verify);
}

main();

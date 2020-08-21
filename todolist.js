const addButton = document.querySelector('.addButton');
var inputValue = document.querySelector('.input');
const container = document.querySelector('.container');

class toDo{
    constructor(taskName){
        this.createDiv(taskName);
    }

    createDiv(taskName){
        let input = document.createElement('input');
        input.value = taskName;
        input.disabled = true;
        input.classList.add('viewTask');
        input.type = "text";

        let taskBox = document.createElement('div');
        taskBox.classList.add('viewStage');

        let editButton = document.createElement('button');
        editButton.innerHTML = "EDIT";
        editButton.classList.add('editButton');

        let removeButton = document.createElement('button');
        removeButton.innerHTML = "REMOVE";
        removeButton.classList.add('removeButton');

        container.appendChild(taskBox);

        taskBox.appendChild(input);
        taskBox.appendChild(editButton);
        taskBox.appendChild(removeButton);

    }
}

new toDo("Sports");

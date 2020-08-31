/* eslint-disable linebreak-style */
const input = document.querySelector('.input');
const addButton = document.querySelector('.addButton');
const container = document.querySelector('.container');

function editTaskInDB(tName, tID) {
  const userRequest = new XMLHttpRequest();
  userRequest.open('post', '/editTask');
  userRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  userRequest.send(JSON.stringify({ taskName: tName, taskID: tID }));
}

function removeTaskFromDB(tId) {
  const userRequest = new XMLHttpRequest();
  userRequest.open('post', '/removeTask');
  userRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  userRequest.send(JSON.stringify({ taskID: tId }));
}

function createDiv(taskName, tID) {
  const task = document.createElement('input');
  task.value = taskName;
  task.disabled = true;
  task.classList.add('viewTask');
  task.type = 'text';

  const edit = document.createElement('button');
  edit.innerHTML = 'EDIT';
  edit.classList.add('editButton');

  const remove = document.createElement('button');
  remove.innerHTML = 'REMOVE';
  remove.classList.add('removeButton');

  const taskBox = document.createElement('div');
  taskBox.classList.add('viewStage');

  const taskID = document.createElement('input');
  taskID.value = tID;
  taskID.disabled = true;
  taskID.classList.add('hiddentext');

  container.appendChild(taskBox);
  taskBox.appendChild(taskID);
  taskBox.appendChild(task);
  taskBox.appendChild(edit);
  taskBox.appendChild(remove);

  edit.addEventListener('click', () => {
    task.disabled = !task.disabled;

    if (task.disabled === true) {
      editTaskInDB(task.value, tID);
    }
  });

  remove.addEventListener('click', () => {
    removeTaskFromDB(tID);
    container.removeChild(taskBox);
  });
}

function addTaskToDB(tName) {
  const userRequest = new XMLHttpRequest();
  userRequest.open('post', '/addTask');
  userRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  userRequest.send(JSON.stringify({ taskName: tName }));

  userRequest.onreadystatechange = () => {
    if (userRequest.readyState === 4 && userRequest.status === 200) {
      const text = (userRequest.responseText).toString();
      const pj = JSON.parse(text);
      createDiv(tName, pj[0].task_id);
    }
  };
}

function getTasks() {
  const Httpreq = new XMLHttpRequest();
  Httpreq.open('GET', '/getTasks', false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function verify() {
  const str = input.value.trim();
  if (str !== '') {
    addTaskToDB(str);
    input.value = '';
  }
}

function main() {
  addButton.addEventListener('click', verify);
  document.addEventListener('DOMContentLoaded', () => {
    const jsonObj = JSON.parse(getTasks());

    jsonObj.forEach((item) => {
      createDiv(item.task_name, item.task_id);
    });
  });
}

main();

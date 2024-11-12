'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setData = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const todoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

const render = function() {

  todoCompleted.innerHTML = '';
  todoList.innerHTML = '';

  todoData.forEach (function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + '<div class="todo-buttons">' + '<button class="todo-remove">' + '</button>' + '<button class="todo-complete">' + '</button>' + '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    };

    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed;
      localStorage.setItem("todoData", JSON.stringify(todoData));
      render();
    });
    li.querySelector('.todo-remove').addEventListener('click', function () {
      const itemId = todoData.indexOf(item);
      todoData.splice(itemId, 1);
      render();
      localStorage.setItem("todoData", JSON.stringify(todoData));
    });
  });
};
render();
todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
}
if (headerInput.value !== '') {
    todoData.push(newToDo)
    headerInput.value = ''
    render()
    localStorage.setItem("todoData", JSON.stringify(todoData));
}

})
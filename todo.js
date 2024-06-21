let todoItemsContainer = document.getElementById("todoItemsContainer");

let addButton = document.getElementById("addButton");
let saveButton = document.getElementById("saveButton");



function getTodoListFromLocalstorage() {
    let stringifyedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifyedTodoList);

    if(parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalstorage();

saveButton.onclick = function(){
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

let todoLength = todoList.length;

function onDeleteTodo(todoId){
    let todoElement = document.getElementById(todoId)
    todoItemsContainer.removeChild(todoElement);

    let deleteItemIndex = todoList.findIndex(function(eachItem){
        let eachTodoId = eachItem.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }
    })

    todoList.splice(deleteItemIndex,1);
    
}

function createAndAppendTodo(todo){
    let todoId = todo.uniqueNo;
    let todoEl = document.createElement("li");
    todoEl.classList.add("todo-element","d-flex", "flex-row")
    todoEl.id = todoId;
todoItemsContainer.appendChild(todoEl);

let checkboxEl = document.createElement("input");
checkboxEl.type= "checkbox";
checkboxEl.id="checkboxId"+todoId;
checkboxEl.classList.add("checkbox-input")
todoEl.appendChild(checkboxEl);

let labelContainer = document.createElement("div");
labelContainer.classList.add("label-container","d-flex", "flex-row");
todoEl.appendChild(labelContainer);

let labelEl = document.createElement("label");
labelEl.textContent = todo.text;
labelEl.htmlFor = "checkboxId"+todoId;
labelEl.classList.add("checkbox-label");
if(todo.isChecked){
   labelEl.classList.add("checked");
   checkboxEl.checked = true;
} 
labelContainer.appendChild(labelEl);

checkboxEl.onclick = function(){
    labelEl.classList.toggle("checked");
    if(todo.isChecked){
        todo.isChecked= false; 
     } else{
        todo.isChecked = true;
     }
}

let deleteIconContainer = document.createElement("div");
deleteIconContainer.classList.add("delete-icon-container");
labelContainer.appendChild(deleteIconContainer);

let deleteIcon = document.createElement("i");
deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
deleteIconContainer.appendChild(deleteIcon);

deleteIcon.onclick = function(){
    onDeleteTodo(todoId);
}
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}
function addTodo(){
    let inputElement = document.getElementById("inputElement");
    let inputValue = inputElement.value;
    todoLength = todoLength + 1;

    if (inputValue === ""){
        alert("Enter valid text");
        return;
    }
    let newTodo = {
        text: inputValue,
        uniqueNo: todoLength,
        isChecked: false
    }
    todoList.push(newTodo);

    createAndAppendTodo(newTodo);

    inputElement.value = "";

}

addButton.onclick = function(){
    addTodo();
}
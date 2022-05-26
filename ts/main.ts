// @ts-ignore: ignore datepicker issue
const picker = datepicker("#dueDate");
picker.setMin(new Date()); //Today's date

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;
}

window.onload = function(){
    let addItem = document.getElementById("add");
    addItem.onclick = main;

    // Load saved item
    loadSavedItems();
}

function loadSavedItems(){
    let itemArray = getToDoItems(); //read from storage

    for(let i = 0; i < itemArray.length; i++){
        let currItem = itemArray[i];
        displayToDoItem(currItem);
    }   
}

function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}

function isValid():boolean{
    return true;
}

/**
 * Get all input off form and wrap in
 * a ToDoItem object
 */
function getToDoItem():ToDoItem{
    let newItem = new ToDoItem();

    //title
    let titleInput = getInput("title");
    newItem.title = titleInput.value;

    //due date
    let dueDateInput = getInput("dueDate");
    newItem.dueDate = new Date(dueDateInput.value);

    //isCompleted
    let isCompleted = getInput("checkbox");
    newItem.isCompleted = isCompleted.checked;


    return newItem;
}

function getInput(id):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}

/**
 * Display given ToDoItem on the webpage
 * @param item item containing title, Date, 
 * and completion status
 */
function displayToDoItem(item:ToDoItem):void{
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    let itemDate = document.createElement("p");

    //itemDate.innerText = item.dueDate.toString();
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();
    
    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsComplete;

    itemDiv.classList.add("todo");
    if(item.isCompleted){
        itemDiv.classList.add("completed");
    }


    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.isCompleted){
        let completedToDos = document.getElementById("completeItems");
        completedToDos.appendChild(itemDiv);
    }
    else{
        let incompleteToDos = document.getElementById("incompleteItems");
        incompleteToDos.appendChild(itemDiv);
    }
    /*
    //local storage (currently only stores 1 item at a time)
    let itemString = JSON.stringify(item);
    localStorage.setItem("item", itemString);*/
}


function markAsComplete(){
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("completed");
    itemDiv.style.color = "green";

    let completedItems = document.getElementById("completeItems");
    console.log(completedItems);
    completedItems.appendChild(itemDiv);
}

// Task: Store ToDoItems in web storage

function saveToDo(item:ToDoItem):void{
    let currItems = getToDoItems();
    if(currItems == null){ //No items found
        currItems = new Array();
    }

    currItems.push(item); //Add new item to the curr item list

    let currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}

const todokey = "todo";

/**
 * Get stored ToDo items or return null if none
 * are found.
 */
function getToDoItems():ToDoItem[]{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem[] = JSON.parse(itemString);
    return item;
}
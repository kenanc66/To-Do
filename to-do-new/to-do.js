// UI vars 
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;
// load items
loadItems();
// call event listeners
eventListeners();
//functions
function eventListeners() {
    // submit event
    form.addEventListener('submit', addNewItem);

    // delete an item
    taskList.addEventListener('click', deleteItem);

    // delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}
function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}
function getItemsFromLS() {// get items from Local Storage
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
function setItemToLS(text) {    // set item to Local Storage
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}
function deleteItemFromLS(text) {// delete item from LS
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}
function createItem(text) {
    // create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times close"></i>';

    // add a to li
    li.appendChild(a);

    // add li to ul
    taskList.appendChild(li);

}
function addNewItem(e) {// add new item
    if (input.value === '') {
        alert('add new item');
    }

    // create item
    createItem(input.value);

    // save to LS
    setItemToLS(input.value);

    // clear input
    input.value = '';

    e.preventDefault();

}
function deleteItem(e) {// delete an item
    if (e.target.className === 'fas fa-times') {
        if (confirm('are you sure ?')) {
            e.target.parentElement.parentElement.remove();

            // delete item from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}
function deleteAllItems(e) {// delete all items

    if (confirm('are you sure ?')) {
        // taskList.innerHTML='';
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}

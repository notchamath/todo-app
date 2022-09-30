//MVC(Model-Visual-Controller) Design


//**Model Section**

//Populate
let todos;
let savedTodos = JSON.parse(localStorage.getItem('todos'));

if(savedTodos && Array.isArray(savedTodos)){
    //from Storage
    todos = savedTodos;
}
else{

    //from Array
    todos = [{
        title: 'Eat',
        dueDate:'2021-03-04',
        id: 'id1',
        isDone: false,
        isEditing: false
    }, {
        title: 'Sleep',
        dueDate:'2021-03-04',
        id: 'id2',
        isDone: false,
        isEditing: false
    }, {
        title: 'Repeat',
        dueDate:'2021-03-04',
        id: 'id3',
        isDone: false,
        isEditing: false
    }];
} 

//Delete
const removeTodo = idToDelete => {

    todos = todos.filter(todo => {
        return todo.id != idToDelete;
    });

    saveTodos();
}

//Create
const createTodo = (title, dueDate) => {

    let id = new Date().getTime();

    todos.push({
        title: title,
        dueDate: dueDate,
        id: ''+id,
        isDone: false,
        isEditing: false
    });

    saveTodos();
}

//Record if Todo is done
const isDone = (todoId, checked) => {

    todos.forEach(todo=>{
        if(todo.id == todoId) todo.isDone = checked;
    });

    saveTodos();
}

//Edit
const editingTodo = todoId => {

    todos.forEach(todo=>{
        if(todo.id == todoId) todo.isEditing = true;
    });
}

//Update
const updatingTodo = (todoId, title, dueDate) => {

    todos.forEach(todo=>{
        if(todo.id == todoId){
            todo.title = title;
            todo.dueDate = dueDate;
            todo.isEditing = false;
        }
    });
    
    saveTodos();
}

//Save
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}


//**Controller Section**

//Add button
const addTodo = () => {

    let textbox = document.querySelector('#todo-title');
    let title = textbox.value;

    let datePicker = document.querySelector('#date-picker');
    let dueDate = datePicker.value;
    
    createTodo(title, dueDate);
    location.reload();
    render();
}

//Delete button
const deleteTodo = event => {

    let deleteBtn = event.target;
    let idToDelete = deleteBtn.id;

    removeTodo(idToDelete);
    render();
}

//Checkbox
const checkTodo = event => {

    let checkbox = event.target;
    let todoId = checkbox.dataset.id;
    let checked = checkbox.checked;

    isDone(todoId, checked);
    render();
}

//Edit Button
const editTodo = event => {

    editingTodo(event.target.id);
    render();
}

//Update Button
const updateTodo = event => {

    let todoId = event.target.id;

    let textbox = document.querySelector(`#textbox${todoId}`);
    let title = textbox.value;
    
    let datePicker = document.querySelector(`#date${todoId}`);
    let dueDate = datePicker.value;

    updatingTodo(todoId, title, dueDate);
    render();
}


//**View Section**

//render page
const render = () => {

    //reset output
    document.querySelector('#todo-list').innerText = '';

    //render list
    todos.forEach(todo => {
        
        let element = document.createElement('div');

        if(todo.isEditing === true) {

            let textBox = document.createElement('input');
            textBox.type = 'textbox';
            textBox.value = todo.title;
            textBox.id = 'textbox' + todo.id;
            element.appendChild(textBox);

            let datePicker = document.createElement('input');
            datePicker.type = 'date';
            datePicker.value = todo.dueDate;
            datePicker.id = 'date' + todo.id;
            element.appendChild(datePicker);
            
            let updateBtn = document.createElement('button');
            updateBtn.innerText = 'Update';
            updateBtn.id = todo.id;
            updateBtn.className = 'update-btn';
            updateBtn.onclick = updateTodo;
            element.appendChild(updateBtn);                
            
        } else {
            // display each todo span - this span will hold the todo text and date
            let todoLabel = document.createElement('span');

            // todo text span
            let labelText = document.createElement('span');
            labelText.innerText = todo.title;
            todoLabel.appendChild(labelText);
           
            // todo date span
            let labelDate = document.createElement('span');
            labelDate.innerText = todo.dueDate;
            todoLabel.appendChild(labelDate);

            element.appendChild(todoLabel);
            
            let editBtn = document.createElement('button');
            editBtn.innerText = 'Edit';
            editBtn.onclick = editTodo;
            editBtn.id = todo.id;
            element.appendChild(editBtn);

            let deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.onclick = deleteTodo;
            // deleteBtn.onclick = onDelete(todo.id);   //this is closures example
            deleteBtn.id = todo.id;
            element.appendChild(deleteBtn);

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.id = todo.id;
            checkbox.checked = todo.isDone;
            checkbox.onchange = checkTodo;
            element.prepend(checkbox);

        }
        
        let todoList = document.querySelector('#todo-list');
        todoList.appendChild(element);
    });  
}

render();



// **Extra - Closures practice**
function onDelete(todoToDelete){

    return () => {
        removeTodo(todoToDelete);
        render();
    }
}
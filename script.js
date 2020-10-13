const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const todosEl = document.getElementById("todos-list");

const toDos = JSON.parse(localStorage.getItem('toDos'));

if (toDos){
fetchToDos(toDos);
}

function fetchToDos(toDos){
    toDos.forEach(toDo => {
        if (toDo){
            addToToDo(toDo);
        }
    });
}

formEl.addEventListener("submit",(e)=>{

    e.preventDefault();
    addToToDo();
    
});

function addToToDo(toDo = {text: inputEl.value, done: false}){
    
    const newToDo = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button"
    deleteButton.classList.add("delete");
    if(inputEl.value != "" || toDo.text !=""){
        newToDo.innerHTML = `${inputEl.value}`
        newToDo.innerText = toDo.text ;
        inputEl.value = '';
        deleteButton.innerHTML = `<i class="fas fa-eraser"></i>`;
        newToDo.appendChild(deleteButton);
        if(toDo.done){
            newToDo.classList.add("done");
        }
        todosEl.appendChild(newToDo);
    }

    //left click
    newToDo.addEventListener("click",(e)=>{
        e.preventDefault();
        console.log(newToDo)
        newToDo.classList.toggle("done")
        updateLS()
    });

    //right click
    newToDo.addEventListener("contextmenu",(e)=>{
        e.preventDefault();
        newToDo.remove();
        updateLS()
    });
    const deleteBtn = newToDo.querySelector(".delete");
    

    deleteBtn.addEventListener("click", ()=>{
        newToDo.remove();
        updateLS()
    });
    updateLS()
}


function updateLS(){
    const toDoListText = document.querySelectorAll('li');
    const toDoListArray = [] ;
    toDoListText.forEach(toDo =>{
        toDoListArray.push({
            text: toDo.innerText,
            done: toDo.classList.contains('done')});
    });
    localStorage.setItem('toDos',JSON.stringify(toDoListArray));

}
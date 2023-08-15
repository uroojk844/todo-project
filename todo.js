let listView = document.querySelector(".list");
let todoList = Object.assign({}, JSON.parse(localStorage.getItem("todoList")));

let count = Math.max(...Object.keys(todoList)) ?? 0;

function countListItems() {
    document.querySelector("#listCount").innerText = listView.childElementCount;
}

function updateLocalStorage(){
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function addItem(e, check=false, textData="", index=null) {
    e.preventDefault();

    let textVal = document.querySelector("#text").value;
    
    if (textVal.length){
        todoList[++count] = {checked: check, text: textVal};
        updateLocalStorage();
    }

    let listItem = document.createElement("div");
    listItem.setAttribute("class", "list-item");
    
    let state = document.createElement("div");
    
    if (check)
        state.setAttribute("class", "state icon checked");
    else
        state.setAttribute("class", "state icon");

    state.setAttribute("onclick", `completedTask(this,i=${index ?? count})`);
    
    let icon = document.createElement("i");
    
    if (check)
        icon.className = "bx bx-check";
    else
        icon.className = "bx bx-checkbox";
    
    state.appendChild(icon);
    
    let text = document.createElement("div");
    text.className = "text";
    
    if (textData.length){
        text.innerText = textData;
    }else if(textVal.length){
        text.innerText = textVal;
    }
    
    text.onclick = function(){
        text.parentElement.classList.toggle("opened");
    }

    let delBtn = document.createElement("div");
    delBtn.className = "delBtn icon";

    let delIcon = document.createElement("i");
    delIcon.className = "bx bx-trash";
    delBtn.appendChild(delIcon);
    delBtn.setAttribute("onclick", `delItem(this,i=${index ?? count})`);

    listItem.appendChild(state);
    listItem.appendChild(text);
    listItem.appendChild(delBtn);
    listView.appendChild(listItem);

    countListItems();

    document.forms[0].reset();
}

function delItem(e,key){
    e.parentElement.remove();
    delete todoList[key];
    updateLocalStorage();
    countListItems();
};

function completedTask(elem, key){
    elem.classList.toggle("checked")

    if(elem.classList.contains("checked")){
        elem.innerHTML = "<i class='bx bx-check'></i>";
        todoList[key??count].checked=true;
    }else{
        elem.innerHTML = "<i class='bx bx-checkbox'></i>";
        todoList[key??count].checked=false;
    }
    updateLocalStorage();
}

window.onload = function () {
    let todoList = localStorage.getItem("todoList");
    todoList = JSON.parse(todoList);

    for(const key in todoList){
        let {checked, text} = todoList[key];
        addItem(event, checked, text, key);
    };
}
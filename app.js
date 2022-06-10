const taskInput = document.querySelector('.taskInput');
const addBtn = document.querySelector('.addBtn');
const taskList = document.querySelector('.taskList');

const done = document.querySelector('.numberDone');
const undone = document.querySelector('.numberTask');
const All = document.querySelector('.numberAll');
const btn = document.querySelectorAll('.btnFilter');
const clearBtn = document.querySelector('.clearBtn');


const getBanco = () => JSON.parse(localStorage.getItem('task')) ?? [];
const setBanco = (banco) => localStorage.setItem('task', JSON.stringify(banco));


const criarItem = (tarefa, status, indice) => {
    
    const item = document.createElement('div');
    item.classList.add('taskItem', 'container', 'bg-primary', 'text-light', 'd-flex', 'justify-content-between', 'align-items-center', 'col-sm-8', 'p-2', 'mb-2');
    item.innerHTML = `
    <input class="form-check-input" ${status} type="checkbox"  data-item=${indice} aria-label="...">
    <div class="mx-2">${tarefa}</div>
    <button type="button" data-item=${indice} class="btn btn-close bg-danger p-2"></button>
    `
    taskList.appendChild(item);

    taskInput.value = '';
    
}


const inserirItem = () => {
    if(taskInput.value === ''){
        alert('Write something!');
    }else{
        const banco = getBanco();
        banco.push({'tarefa': taskInput.value, 'status': ''});
        setBanco(banco);
    atualizarTela();
    }
    
}




const hideTask = (todo) => {
    todo.forEach(item => {
        item.classList.remove('d-flex')
        item.classList.add('hide')
    });
}

const filteredUndone = () => {
    
    const todo = Array.from(taskList.children).filter(task => {
        return task.childNodes[1].checked;
    });
    hideTask(todo)
}

const filteredDone = () => {
    
    const todo = Array.from(taskList.children).filter(task => {
        return !task.childNodes[1].checked;
    });
    hideTask(todo)
}

const resetItems = () => {
    btn.forEach(item => 
        item.classList.remove('active')
    );
}

const filterItems = () => {
    if(btn[1].classList.contains('active')){
        filteredUndone();
    }else if(btn[2].classList.contains('active')){
        filteredDone();
    }
}

btn.forEach(item => {
    item.addEventListener('click', ()=>{
	resetItems()
	item.classList.add('active');
    atualizarTela();
    });
});


const limparTela = () => {
    taskList.innerHTML = ''
}

const atualizarTela = () => {
    limparTela();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));

    let doneTask = banco.filter(item => item.status == 'checked');
    let undoneTask = banco.filter(item => item.status == '');

    done.innerHTML = doneTask.length;
    undone.innerHTML = undoneTask.length;
    All.innerHTML = banco.length;

    filterItems()

}

const removeItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (event) => {
    const element = event.target
    if(element.type === 'button'){
        const indice = element.dataset.item;
        removeItem(indice);
    }else if(element.type === 'checkbox'){
        const indice = element.dataset.item;
        atualizarItem(indice);
    }
}

const clearAll = () => {
    let answer = confirm('Are you sure you want clear all tasks?');
    if(answer == true){
        localStorage.removeItem('task')
        atualizarTela();
    }
    
};


addBtn.addEventListener('click', inserirItem);
taskList.addEventListener('click', clickItem);
clearBtn.addEventListener('click', clearAll);

atualizarTela();



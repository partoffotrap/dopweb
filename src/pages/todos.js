import Auth from "../services/auth.js";
import Form from "../components/form.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import Todos from "../services/todos.js";

const init = async () => {
    const { ok: isLogged } = await Auth.me();
    if (!isLogged) {
        return location.login();
    }
    loading.stop();
    makeToDo();
    const formEl = document.getElementById('todo-form');
    new Form(formEl, {
        description: () => false,
    }, (values) => {
        addTodo(values.description);
    });
};

function createToDoPosition(todo) {
    const listToDo = document.createElement('div');
    listToDo.classList.add('todo');

    const description = document.createElement('span');
    description.classList.add('todo__description');
    description.innerText = todo.description;

    const deleteBut = document.createElement('button');
    deleteBut.classList.add('todo__remove');
    deleteBut.innerText = 'Удалить';
    deleteBut.onclick = async function(e) {
        const response = confirm('Вы уверены?');
        if (response) {
            loading.start();
            await Todos.delete(todo.id);
            makeToDo();
        }
    };

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('todo__checkbox');
    checkbox.checked = todo.completed;
    checkbox.onchange = async function(e) {
        try {
            loading.start();
            const checkboxValue = e.target.checked;
            e.target.checked = !e.target.checked;
            const response = await Todos.update(todo.id, checkboxValue);
            loading.stop();
            if (response) {
                e.target.checked = !e.target.checked;
            } else {
                throw new Error();
            }
        } catch (error) {
            alert('Ошибка в отправке запроса');
        }
    };

    listToDo.appendChild(checkbox);
    listToDo.appendChild(description);
    listToDo.appendChild(deleteBut);
    return listToDo;
}

const makeToDo = async () => {
    const todos = await Todos.getAll();
    const queryToDo = document.querySelector('.todos');
    queryToDo.innerHTML = '';
    loading.stop();
    todos.forEach(todo => {
        const pos = createToDoPosition(todo);
        queryToDo.appendChild(pos);
    });
};
    const addTodo = async (description) => {
        loading.start();
        const response = await Todos.create(description);
        if (response && response.ok) {
            makeToDo();
        } else {
            console.error('Ошибка в создании todo');
        }
    };

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

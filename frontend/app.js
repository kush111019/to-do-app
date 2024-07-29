const apiUrl = 'http://localhost:5000/todos'; // Adjust this URL if needed

document.addEventListener('DOMContentLoaded', loadTodos);
document.getElementById('todo-form').addEventListener('submit', addTodo);

async function loadTodos() {
    try {
        const response = await fetch(apiUrl);
        const todos = await response.json();
        const todoList = document.getElementById('todo-list');

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            todoList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading todos:', error);
    }
}

async function addTodo(event) {
    event.preventDefault();

    const input = document.getElementById('todo-input');
    const todoText = input.value.trim();

    if (todoText === '') return;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: todoText })
        });

        if (response.ok) {
            const todo = await response.json();
            const li = document.createElement('li');
            li.textContent = todo.text;
            document.getElementById('todo-list').appendChild(li);
            input.value = '';
        } else {
            console.error('Error adding todo:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

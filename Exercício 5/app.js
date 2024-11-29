// Carregar as tarefas do localStorage quando a página é carregada
document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");

    // Função para carregar tarefas do localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = '';
        tasks.forEach(task => {
            createTaskElement(task);
        });
    }

    // Função para adicionar uma tarefa
    function addTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        createTaskElement(newTask);
    }

    // Função para criar o elemento de uma tarefa
    function createTaskElement(task) {
        const taskItem = document.createElement("li");
        taskItem.className = "flex justify-between items-center p-3 bg-gray-700 rounded-md";

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.className = task.completed ? "line-through" : "";

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.className = "ml-2 p-1 bg-yellow-500 text-black rounded hover:bg-yellow-600";
        editButton.onclick = () => editTask(task, taskItem);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.className = "ml-2 p-1 bg-red-500 text-white rounded hover:bg-red-600";
        deleteButton.onclick = () => deleteTask(task, taskItem);

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Desmarcar" : "Concluir";
        completeButton.className = "ml-2 p-1 bg-green-500 text-white rounded hover:bg-green-600";
        completeButton.onclick = () => toggleTaskCompletion(task, taskItem);

        taskItem.appendChild(taskText);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(completeButton);

        taskList.appendChild(taskItem);
    }

    // Editar uma tarefa
    function editTask(task, taskItem) {
        const newText = prompt("Edite a tarefa:", task.text);
        if (newText !== null) {
            task.text = newText;
            saveTasks();
            loadTasks();
        }
    }

    // Excluir uma tarefa
    function deleteTask(task, taskItem) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskItem.remove();
    }

    // Alternar o status de conclusão de uma tarefa
    function toggleTaskCompletion(task, taskItem) {
        task.completed = !task.completed;
        saveTasks();
        loadTasks();
    }

    // Salvar as tarefas no localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(taskItem => {
            const task = {
                text: taskItem.querySelector("span").textContent,
                completed: taskItem.querySelector("span").classList.contains("line-through")
            };
            tasks.push(task);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Adicionar nova tarefa ao clicar no botão
    addButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = ''; // Limpa o campo de entrada
        }
    });

    // Carregar tarefas ao iniciar
    loadTasks();
});

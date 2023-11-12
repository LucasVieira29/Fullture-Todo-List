let arrayTarefas = [];

function adicionarTarefas() {
    let textoTarefa = document.getElementById("input-tarefa").value;

    if (textoTarefa === "") {
        return;
    }

    let novaTarefa = {
        id: `${Date.now()}`,
        name: textoTarefa,
        status: "uncompleted",
    };

    arrayTarefas.push(novaTarefa);
    localStorage.setItem("tarefas", JSON.stringify(arrayTarefas));
    atualizarDom();
}

function removerTarefas(e) {
    let id = e.target.id;
    arrayTarefas = arrayTarefas.filter(function (tarefa) {
        return tarefa.id !== id;
    })

    localStorage.setItem("tarefas", JSON.stringify(arrayTarefas));
    atualizarDom();
}

function finalizarTarefa(e) {
    let id = e.target.id;
    arrayTarefas.find((tarefa) => tarefa.id === id).status = "completed";
    localStorage.setItem("tarefas", JSON.stringify(arrayTarefas));
    atualizarDom();
}

function atualizarDom () {
    let divTarefas = document.getElementById("tarefas");
    divTarefas.innerHTML = "";

    let filtro = document.getElementById("filtros").value;
    let tarefasFiltradas = arrayTarefas.filter((item) => filtro === "all" || item.status === filtro);

    tarefasFiltradas.forEach((tarefa) => {
        let divTarefa = document.createElement("div");
        
        if (tarefa.status === "completed"){
            divTarefa.classList.add("completed");
        }

        divTarefa.innerHTML =`
        <div class="todo">
                    <li class="todo-item">${tarefa.name}</li>
                    <button onclick="finalizarTarefa(window.event)" id=${tarefa.id} class="check-btn"><i class="fas fa-check" aria-hidden="true"></i></button>
                    <button onclick="removerTarefas(window.event)" id=${tarefa.id} class="trash-btn"><i class="fas fa-trash" aria-hidden="true"></i></button>
                </div>
        `;
        
    divTarefas.appendChild(divTarefa);
    });
}

window.addEventListener("load", function () {
    if (this.sessionStorage.getItem("logged")) {
        arrayTarefas = JSON.parse(this.localStorage.getItem("tarefas") || "[]");
        atualizarDom();
    } else {
        window.location.href = "index.html";
    }
})
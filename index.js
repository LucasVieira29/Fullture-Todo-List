function login() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
  
    let listaUsers = JSON.parse(localStorage.getItem("users") || "[]");
    let logged = listaUsers.find(
      (item) => item.user == user && item.pass == pass
    );
    if (logged) {
      sessionStorage.setItem("logged", true);
      sessionStorage.getItem("logged");
      window.location.href = "./tarefas.html";
    } else {
      alert("Usuário ou senha inválidos");
    }
}

function cadastrar() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
  
    let listaUsers = JSON.parse(localStorage.getItem("users") || "[]");
  
    listaUsers.push({ user, pass });
  
    localStorage.setItem("users", JSON.stringify(listaUsers));
  }
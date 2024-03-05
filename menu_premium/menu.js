'use strict'

const container_tarefa = document.getElementById('container_tarefa')

async function validarTarefas() {
    const listUsers = await pegarUsuarios()

    listUsers.forEach(async user => {

        if(user.id != localStorage.getItem('IdUsuario') && user.premium == true) {

            const tarefaContainer = document.createElement('div');
            tarefaContainer.classList.add('tarefa');
    
            const infoPerfil = document.createElement('div');
            infoPerfil.classList.add('info_perfil');
    
            const imagemPerfil = document.createElement('img');
            imagemPerfil.src = "../img/image 34.png";
            imagemPerfil.alt = "";
    
            const tituloTarefa = document.createElement('h1');
            tituloTarefa.textContent = `Tarefas de ${user.nome}`;
    
            infoPerfil.appendChild(imagemPerfil);
            infoPerfil.appendChild(tituloTarefa);
    
            const quantidadeTarefas = document.createElement('h2');
            quantidadeTarefas.textContent = `Possui: ${await contagemTarefas(user.id)}`;
    
            tarefaContainer.appendChild(infoPerfil);
            tarefaContainer.appendChild(quantidadeTarefas);
    
            container_tarefa.appendChild(tarefaContainer);
    
            const linhaRoxa = document.createElement('div');
            linhaRoxa.classList.add('linha_roxa');
            container_tarefa.appendChild(linhaRoxa);

            tarefaContainer.addEventListener('click', function(){

                localStorage.setItem('NomeUsuarioTarefa', user.nome)
                localStorage.setItem('IdUsuarioTarefa', user.id)

                window.location.href = '../perfil_visitado/perfil.html'
            })
        }
    });
}

async function contagemTarefas(idUsuario) {
    let contagem_tarefas = 0;
    const listTasks = await pegarTarefas()
    listTasks.forEach(task => {
        if(task.idUsuario == idUsuario) {
            contagem_tarefas++;
        }
    });
    return contagem_tarefas;
}

async function pegarTarefas() {
    const endpoint = 'http://localhost:5080/tarefas';
    const userApi = await fetch(endpoint);
    const listTasks = await userApi.json();
    return listTasks;
}

async function pegarUsuarios() {
    const endpoint = 'http://localhost:5080/usuario';
    const userApi = await fetch(endpoint);
    const listUsers = await userApi.json();
    return listUsers;
}

validarTarefas()

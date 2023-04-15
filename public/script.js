var socket = io();

var msgInput = document.querySelector('#msg'); //formulario
var msgUser = document.querySelector(".user");


const urlSearch = new URLSearchParams(window.location.search);
const userName = urlSearch.get('name');
const room = urlSearch.get('salas');

console.log(userName, room);

var data = {}


socket.emit('selectRoom', {
    userName,
    room
},
(response) => {
   console.log("Response: ");
   console.log(response)
   response.messages.forEach(element => {
       creatMessage(element);
   });
   atualizaStatus(response.status);

});

msgInput.addEventListener('keypress', (e) => {
    
    if (e.key === 'Enter'){
        const message = e.target.value;

        const data = {
            room, 
            message,
            userName,
            cor:cor
        }

        socket.emit('message', data);

        e.target.value = "";
    }
    
});


socket.on('message', data => {
    console.log(data);
    creatMessage(data);
   
});


function creatMessage(data){
    console.log(cor)
    msgUser.innerHTML += `
    
    <div class="msg-user">
    <div class="nome-user">
    <span style="color: ${data.cor}">Nome: ${data.userName} </span>
    </div>
    <div class="msg">
    <span>msg: ${data.message} </span>
    </div>
    </div>
    `
}
function atualizaStatus(data) {
    if(!data) return;

    var div = document.createElement('div');
    div.classList.add('status');
    var el = document.createElement('span');
    el.textContent = 'Status: Conectado';
    div.appendChild(el);
    document.querySelector('.formulario').appendChild(div);
}

function generateColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
    
}

const cor = generateColor()

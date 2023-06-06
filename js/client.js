document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:8000');
  
    const firstLabelMsg = document.getElementById('firstLabelMsg');
    const form = document.getElementById('send-container');
    const msgInp = document.getElementById('msgInp');
    const msgContainer = document.querySelector('.container');
  
    const append = (message, position) => {
      const msgElement = document.createElement('div');
      msgElement.innerText = message;
      msgElement.classList.add('message');
      msgElement.classList.add(position);
      msgContainer.append(msgElement);
      firstLabelMsg.style.display="none";
    };
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const msg = msgInp.value;
        append(`You : ${msg}`,'right');
        socket.emit('send',msg);
        msgInp.value = '';
    });
    const name = prompt('Enter your name to join');
    // const name = '';

    socket.emit('new-user-joined', name);
    socket.on('received',data => {
        append(`${data.name} : ${data.message}`,'left');
    });
  
    socket.on('user-joined', name => {
      append(`${name} joined the chat`, 'right');
    });

    // disconnect event
    socket.on('left',data=>{
        append(`${data.name} has left the chat.`,'left');
    });
  
    // Rest of your client.js code...
  });
  
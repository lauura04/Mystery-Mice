class ChatManager {
    constructor(){
        this.chatContainer = document.getElementById('chat-container');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.chatSend = document.getElementById('chat-send');

        //listeners
        this.chatSend.addEventListener('click', ()=>this.sendMessage());
        this.chatInput.addEventListener('keypress', (e)=>{
            if(e.key === 'Enter') this.sendMessage();
        });

        this.messageLog = [];
    }

    sendMessage(){
        const message = this.chatInput.value.trim();
        if(message){
            fetch('http://localhost:8080/api/chat',{
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({message}),
            })
            .then(()=>{
                this.chatInput.value = '';
                this.fetchMessages();
            })
            .catch((error)=>console.error('Error sending messages: ', error));
        }
    }

    fetchMessages(){
        fetch(`http://localhost:8080/api/chat?since=${this.lastMessageId}`)
        .then((response) => response.json())
        .then((data)=>{
            if(data.messages && data.messages.length > 0){
                this.messageLog.push(...data.messages);
                this.lastMessageId = data.timestamp;
                this.updateChatWindow();
            }
        })
        .catch((error)=> console.error('Error al obetener los mensajes: ', error));
    }

    updateChatWindow(){
        this.chatMessages.innerHTML='';
        this.messageLog.forEach((msg)=>{
            const messageDiv = document.createElement('div');
            messageDiv.textContent = msg;
            this.chatMessages.appendChild(messageDiv);
        });

        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    startFetchingMessages(){
        //actualiza chat cada 2 segundos
        setInterval(()=>this.fetchMessages(), 2000);
    }
}

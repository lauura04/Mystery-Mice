export default class ChatManager {
    constructor() {
        this.chatContainer = $('#chat-container');
        this.chatMessages = $('#chat-messages');
        this.chatInput = $('#chat-input');
        this.chatSend = $('#chat-send');
        this.userCount = $('#users-count');

        this.lastMessageId = 0;
        this.userId =  localStorage.getItem('chatUserId') || null;
        
        // Listeners
        this.chatSend.on('click', () => this.sendMessage());
        this.chatInput.on('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        if (this.userId) {
            // Ya tenemos userId guardado, solo iniciamos heartbeat y fetch
            this.startHeartbeat();
        } else {
            this.connectUser();
        }

        this.startFetchingMessages();
        this.startFetchingUsers();

          // Desconectar al cerrar la pestaña o ventana
        $(window).on('beforeunload', () => {
            this.disconnectUser();
        });
    }

    sendMessage() {
        const message = this.chatInput.val().trim();
        if (message) {
            $.post("/api/chat", { message: message })
                .done(() => {
                    this.chatInput.val('');
                    this.fetchMessages();
                })
                .fail((error) => console.error('Error al enviar el mensaje:', error));
        }
    }

    fetchMessages() {
        $.get("/api/chat", { since: this.lastMessageId })
            .done((data) => {
                if (data.messages && data.messages.length > 0) {
                    data.messages.forEach((msg) => {
                        this.chatMessages.append(`<div>${msg}</div>`);
                    });
                    this.chatMessages.scrollTop(this.chatMessages.prop('scrollHeight'));
                    this.lastMessageId = data.timestamp;
                }
            })
            .fail((error) => console.error('Error al obtener los mensajes:', error));
    }

    fetchConnectedUsers() {
        $.get("/api/chat/activeClients")
            .done((data) => {
                this.userCount.text(`Usuarios conectados: ${data}`);
            })
            .fail((error) => console.error('Error al obtener usuarios conectados:', error));
    }

    connectUser() {
       $.post("/api/chat/connect")
        .done((data)=>{
            this.userId = data; // guardar userId asignado por servidor
            localStorage.setItem('chatUserId', data);
            console.log(`Usuario conectado con ID: ${this.userId}`);
             console.log(`Usuario conectado con ID: ${this.userId}`);
            this.startHeartbeat(); // iniciar heartbeat
        })
        .fail((error)=>{
            console.error('Error al conectar usuario: ', error);
        });
    }

    disconnectUser() {
        if(this.userId){
            $.post("/api/chat/disconnect", {userId: this.userId})
                .done((updatedCount)=>{
                    this.userCount.text(`Usuarios conectados: ${updatedCount}`);
                    localStorage.removeItem('chatUserId');
                    this.userId = null;
                })
                .fail((error)=> console.error('Error al desconectar el usuario: ', error));
        }
    }

    startHeartbeat(){
        this.heartbeatInterval = setInterval(()=>{
            this.sendHeartbeat();
        }, 3000); // cada 3 segundos
    }

    sendHeartbeat(){
        if(this.userId){
            $.post("/api/char/heartbeat", {userId: this.userId})
            .fail((error)=>console.error('Error en el heartbeat:', error));
        }
    }

    startFetchingMessages() {
        setInterval(() => this.fetchMessages(), 2000);
    }

    startFetchingUsers() {
        setInterval(() => this.fetchConnectedUsers(), 2000);
    }
}

$(document).ready(() => {
    const chatManager = new ChatManager();

    $(window).on('beforeunload', ()=>{
        chatManager.disconnectUser();
    });
});


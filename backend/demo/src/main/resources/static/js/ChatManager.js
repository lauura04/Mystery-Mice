export default class ChatManager {
    constructor() {
        this.chatContainer = $('#chat-container');
        this.chatMessages = $('#chat-messages');
        this.chatInput = $('#chat-input');
        this.chatSend = $('#chat-send');
        this.userCount = $('#users-count');

        this.lastMessageId = 0;

        // Listeners
        this.chatSend.on('click', () => this.sendMessage());
        this.chatInput.on('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        this.connectUser();
        this.startFetchingMessages();
        this.startFetchingUsers();
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
        $.post("/api/chat/connect", () => {
            console.log('Usuario conectado');
        }).fail((error) => {
            console.error('Error al conectar usuario:', error);
        });
    }

    disconnectUser() {
        $.post("/api/chat/disconnect")
            .fail((error) => console.error('Error al desconectar usuario:', error));
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
});


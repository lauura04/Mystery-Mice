class ChatManager {
    constructor() {
        this.chatContainer = $('#chat-container'); // jQuery selector
        this.chatMessages = $('#chat-messages');
        this.chatInput = $('#chat-input');
        this.chatSend = $('#chat-send');

        this.lastMessageId = 0; // Timestamp de último mensaje

        // Listeners para enviar mensajes
        this.chatSend.on('click', () => this.sendMessage());
        this.chatInput.on('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        this.startFetchingMessages(); // Iniciar actualización periódica
    }

    sendMessage() {
        const message = this.chatInput.val().trim(); // Obtener mensaje del input
        if (message) {
            $.post("/api/chat", { message: message }, () => {
                this.chatInput.val(''); // Limpiar input
                this.fetchMessages(); // Actualizar chat
            }).fail((error) => {
                console.error('Error al enviar el mensaje:', error);
            });
        }
    }

    fetchMessages() {
        $.get("/api/chat", { since: this.lastMessageId }, (data) => {
            if (data.messages && data.messages.length > 0) {
                data.messages.forEach((msg) => {
                    this.chatMessages.append(`<div>${msg}</div>`); // Añadir mensajes
                });

                // Scroll automático
                this.chatMessages.scrollTop(this.chatMessages.prop('scrollHeight'));
                this.lastMessageId = data.timestamp; // Actualizar último timestamp
            }
        }).fail((error) => {
            console.error('Error al obtener los mensajes:', error);
        });
    }

    startFetchingMessages() {
        setInterval(() => this.fetchMessages(), 2000); // Llama a fetchMessages cada 2 segundos
    }
}

export default ChatManager;

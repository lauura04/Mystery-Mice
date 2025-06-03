class LoginScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoginScene' });
    }

    preload() {
        // carga de audios
        this.load.audio("boton", 'assets/Clickar_Boton.wav');

        //carga de imágenes
        this.load.image("fondo", 'assets/menu.png');
        this.load.image("libro", 'assets/Libro.png');
        this.load.image("sombraLibro", 'assets/SombraLibro.png');
        this.load.image("periodicoM", 'assets/Menu_inicialPeri.png');

    }

    create() {
        //variables para meter las imagenes a posteriori
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // montaje de la escena
        const background_menu = this.add.image(centerX, centerY, "fondo");
        // interfaz del libro
        const sombraLibro = this.add.image(0.618 * centerX, 1.2 * centerY, "sombraLibro");
        const libro = this.add.image(0.65 * centerX, 1.2 * centerY, "libro");


        //Recuadro usuario
        let nombre = document.createElement('input');
        nombre.type= 'text';
        nombre.placeholder = 'Usuario';
        nombre.style.position= 'absolute';
        nombre.style.left=`${0.6*centerX}px`;
        nombre.style.top=`${0.45*centerY}px`;
        nombre.style.width= '200px';
        nombre.style.font= '40px mousy';
        nombre.style.backgroundColor = 'rgba(162, 208, 158, 0.39)';
        nombre.style.color='#42240e';
        document.body.appendChild(nombre);

        //Recuadro contraseña
        let contra = document.createElement('input');
        contra.type= 'password';
        contra.placeholder = 'Contraseña';
        contra.style.position= 'absolute';
        contra.style.left=`${0.6*centerX}px`;
        contra.style.top=`${0.6*centerY}px`;
        contra.style.width= '200px';
        contra.style.font= '40px mousy';
        contra.style.backgroundColor = 'rgba(162, 208, 158, 0.39)';
        contra.style.color='#42240e';
        contra.style.font= '40px mousy';
        document.body.appendChild(contra);



        //Botón para ir al inicio
        const logText = this.add.text(0.7 * centerX, 1.15 * centerY, 'Iniciar sesion', {
            font: '70px mousy',
            color: '#42240e',
            align: 'center'
        }).setInteractive()
            .on('pointerdown', () => {
                this.IniciarSesion(nombre.value, contra.value);
            });

        //Botón para ir al registrarse
        const regText = this.add.text(0.7 * centerX, 1.4 * centerY, 'Registrarse', {
            font: '70px mousy',
            color: '#42240e',
            align: 'center'
        }).setInteractive()
            .on('pointerdown', () => {
                this.registrar(nombre.value, contra.value);
            });

    }

    // Función para iniciar sesión
    login(user, password) {
        fetch("http://localhost:8090/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user, 
                password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Inicio de sesión exitoso");
                this.scene.stop("LoginScene");
                this.scene.start("IntroScene");  // Vamos a la escena de inicio de juego
                this.sound.play("boton");
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => console.error("Error en el login:", error));
    }

    // Función para registrar usuario
    registrar(nombre, contra) {
        if (!nombre || !contra) {
            alert("Por favor completa todos los campos.");
            return;
        }
        fetch("http://localhost:8090/usuario/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: nombre, password: contra })
        })
        .then(async response => {
        const data = await response.json().catch(() => ({})); 
        if (response.ok && data.success) {
            alert(data.message || "Usuario registrado correctamente");
            this.scene.stop("LoginScene");
            this.scene.start("IntroScene");
            this.sound.play("boton");
        } else {
            alert("Error: " + (data.message || "No se pudo registrar"));
        }
    })
    .catch(error => {
        console.error("Error en el registro:", error);
        alert("Error al conectar con el servidor");
    });
    }
}

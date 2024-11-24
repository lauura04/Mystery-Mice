class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene', physics: { default: 'arcade' } });
    }

    preload() {
        this.load.spritesheet('Sighttail', 'assets/Sightail_spritesheet.png', {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet('Scentpaw', 'assets/Scentpaw-spritesheet.png', {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.image('tiles', 'assets/Tilemap.png');

        this.load.spritesheet('Cazador', 'assets/cazador_spritesheet.png', {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.image('pause', 'assets/Boton_Pausa.png');
        this.load.image('gas', 'assets/Gas.png');
        this.load.image("vision", 'assets/Supervision.png');
        this.load.image("olfato", 'assets/Superolfato.png');
        this.load.image("frame1", 'assets/Flechas_F1.png');
        this.load.image("frame2", 'assets/Flechas_F2.png');
        this.load.image("frame3", 'assets/Flechas_F3.png');
        this.load.image("frame4", 'assets/Flechas_F4.png');
        this.load.image("frame5", 'assets/Flechas_F5.png');

        this.load.audio("laberinto", 'assets/MusicaLaberinto.mp3');

    }

    create() {
        const backgroundMusic1 = this.registry.get("backgroundMusic");
        if (backgroundMusic1) {
            backgroundMusic1.stop();
        }

        if (!this.sound.get('laberinto')) {
            this.music = this.sound.add("laberinto", { loop: true, volume: 0.5 });
            this.music.play();
        } else {
            this.music = this.sound.get('laberinto');
        }
        //variables para meter las imagenes a posteriori
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.dialogPuerta = false;
        this.cargaOlfato = 10000;
        this.cargaVista = 10000;
        this.durOlfato = 3000;
        this.durVista = 3000;//por ver 

        this.sighttailGas = 0;
        this.scentpawGas = 0;

        //estado de los poderes
        this.vistaDisp = true;
        this.olfatoDisp = true;

        this.vidas = 3;

        const tileSize = 64;

        this.gas = [];
        this.flechas = [];

        const mapData = [
            // Aquí va  matriz mapData
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 0, 1, 1, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 1, 1, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 0, 1, 1, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 5, 7, 7, 7, 7, 3, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 4, 4, 4, 4, 8, 1, 1, 1, 1, 6, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 1, 1, 1, 1, 1, 1, 1, 6, 4, 4, 4, 8, 1, 1, 1, 1, 1, 1, 1, 2],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 1, 1, 1, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 3, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],

        ];

        const map = this.make.tilemap({
            data: mapData,
            tileWidth: tileSize,
            tileHeight: tileSize,
        });

        const tileset = map.addTilesetImage('tiles');
        const layer = map.createLayer(0, tileset, 0, 0);

        // Configurar límites de la cámara al tamaño del mapa
        const worldWidth = map.widthInPixels;
        const worldHeight = map.heightInPixels;
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
        this.cameras.main.setZoom(1);

        // Configurar colisiones en el mapa
        layer.setCollision([7]);


        // Crear los sprites de los jugadores con físicas
        this.sighttail = this.physics.add.sprite(3.5 * centerX, 4 * centerY, 'Sighttail')
            .setScale(2)
            .setSize(40, 35)
            .setOffset(12, 25);

        this.scentpaw = this.physics.add.sprite(3.3 * centerX, 4 * centerY, 'Scentpaw')
            .setScale(2)
            .setSize(40, 35)
            .setOffset(12, 25);

        this.cazador = this.physics.add.sprite(3.2 * centerX, 4.5 * centerY, 'Cazador')
            .setScale(2)
            .setSize(40, 40)
            .setOffset(12, 20)
            .setImmovable(true);

        this.anims.create({
            key: 'flechas',
            frames: [
                { key: 'frame1' },
                { key: 'frame2' },
                { key: 'frame5' },
            ],
            frameRate: 10,
            repeat: -1,
        });

        this.createFlecha(1.9 * centerX, 6.3 * centerY, 2000, { minX: 1.9 * centerX, maxX: 2.7 * centerX });
        this.createFlecha(3.2 * centerX, 3 * centerY, 3000, { minX: 3.2 * centerX, maxX: 3.45 * centerX });
        this.createFlecha(3.2 * centerX, 2.5 * centerY, 1000, { minX: 3.2 * centerX, maxX: 3.45 * centerX });
        this.createFlecha(3.2 * centerX, 2 * centerY, 4000, { minX: 3.2 * centerX, maxX: 3.45 * centerX });


        this.time.addEvent({
            delay: 100,
            callback: ()=>{
                this.checkGasCollision(this.sighttail, 'Sighttail');
                this.checkGasCollision(this.scentpaw, 'Scentpaw');
            },
            loop: true
        });

        this.gas1 = this.physics.add.image(2.5 * centerX, 8 * centerY, 'gas').setScale(5).setVisible(false);
        this.gas2 = this.physics.add.image(2 * centerX, 8 * centerY, 'gas').setScale(5).setVisible(false);
        this.gas3 = this.physics.add.image(1.5 * centerX, 8 * centerY, 'gas').setScale(5).setVisible(false);
        this.gas4 = this.physics.add.image(centerX, 8 * centerY, 'gas').setScale(5).setVisible(false);
        this.gas5 = this.physics.add.image(1.85 * centerX, 2.0 * centerY, 'gas').setScale(5).setVisible(false);
        this.gas6 = this.physics.add.image(1.85 * centerX, 1.2 * centerY, 'gas').setScale(5).setVisible(false);

        this.gas7 = this.physics.add.image(2.5 * centerX, 0.38 * centerY, 'gas').setScale(5).setVisible(false);
        this.gas8 = this.physics.add.image(3 * centerX, 0.38 * centerY, 'gas').setScale(5).setVisible(false);
        this.gas9 = this.physics.add.image(2 * centerX, 0.38 * centerY, 'gas').setScale(5).setVisible(false);

        this.gas.push(this.gas1,this.gas2,this.gas3,this.gas4,this.gas5,this.gas6,this.gas7,this.gas8,this.gas9);

        this.gas.forEach((gasCloud) =>{
            this.physics.add.overlap(this.sighttail, gasCloud, ()=>{
                this.sighttailInGas = true;
            });
            this.physics.add.overlap(this.scentpaw, gasCloud, ()=>{
                this.scentpawInGas = true;
            });
        });

        this.sighttailInGas = false;
        this.scentpawInGas = false;

        const pausa = this.add.image(0.54 * centerX, 0.55 * centerY, 'pause').setScrollFactor(0).setScale(0.09)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.launch("PauseScene");
            });
        // Crear las animaciones para los jugadores
        this.createAnimations('Sighttail');
        this.createAnimations('Scentpaw');
        this.createAnimations('Cazador');



        // Habilitar colisiones entre los jugadores y los tiles del mapa
        this.physics.add.collider(this.sighttail, layer);
        this.physics.add.collider(this.scentpaw, layer);

        //colisiones entre jugadores y cazador
        this.physics.add.collider(this.sighttail, this.cazador);
        this.physics.add.collider(this.scentpaw, this.cazador);

        

        // Controles
        this.controls1 = this.input.keyboard.addKeys({
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D',
            power: 'E'
        });

        this.controls2 = this.input.keyboard.addKeys({
            up: 'UP',
            down: 'DOWN',
            left: 'LEFT',
            right: 'RIGHT',
            power: 'SPACE'
        });

        this.lastDirection1 = 'down';
        this.lastDirection2 = 'down';

        //icono de los poderes
        this.vision = this.add.image(0.56 * centerX, 1.4 * centerY, 'vision').setScrollFactor(0);
        this.olfato = this.add.image(0.56 * centerX, 1.25 * centerY, 'olfato').setScrollFactor(0);

        this.capaV = this.add.circle(0.56 * centerX, 1.4 * centerY, 32, 0x000000, 0.5).setScrollFactor(0).setVisible(false);
        this.capaO = this.add.circle(0.56 * centerX, 1.25 * centerY, 32, 0x000000, 0.5).setScrollFactor(0).setVisible(false);

        

    }


    checkCazadorCollision(player, playerKey){
        if(playerKey === 'Sighttail'){
            if(this.controls1.power.isDown){
                this.launchDialogueScene(4);
            }
        }
        if(playerKey === 'Scentpaw'){
            if(this.controls2.power.isDown){
                this.launchDialogueScene(4);
            }
        }
    }

    checkGasCollision(player, playerKey){
        if(playerKey==='Sighttail'){
            if(this.sighttailInGas){
                this.sighttailGas+=100;
                if(this.sighttailGas >=7000){
                    this.vidas-=1;
                    this.sighttailGas=0;
                    console.log("Una vida menos");
                    console.log(this.sighttailGas);
                    console.log(this.sighttailInGas);
                }
            } 
            else{
                this.sighttailGas=0;
            }
            this.sighttailInGas = false;
        }
        if(playerKey==='Scentpaw'){
            if(this.scentpawInGas){
                this.scentpawGas+=100;
                if(this.scentpawGas >=7000){
                    this.vidas-=1;
                    this.scentpawGas=0;
                }
            } 
            else{
                this.scentpawGas=0;
            }
            this.scentpawInGas = false;
        }

        if(this.vidas<=0){
            this.scene.stop('GameScene');
            this.scene.start('GameScene');
        }


    }

    handleFlechaCollision(playerkey, flecha) {
        if (flecha.yaColisiono) {
            return;
        }
        flecha.yaColisiono = true;
        console.log(`${playerkey} ha sido alcanzado por una flecha`);
        this.vidas -= 1;

        flecha.setVelocity(0);
        flecha.setVisible(false);
        this.time.delayedCall(flecha.delay,()=>{
            flecha.setPosition(flecha.posicionInicial.x, flecha.posicionInicial.y);
            flecha.play('flechas');
            flecha.setVelocityX(200);
            flecha.setVelocityY(0);
            flecha.yaColisiono = false;
        });
        


        if (this.vidas <= 0) {
            this.scene.stop('GameScene');
            this.scene.start('GameScene');
        }
    }

    createFlecha(startX, startY, delay, rangoX) {
        const flecha = this.physics.add.sprite(startX, startY, 'frame1').setScale(2).setVisible(false);
        flecha.play('flechas');
        flecha.setVelocityX(200);
        flecha.rangoX = rangoX;
        flecha.posicionInicial = { x: startX, y: startY };
        flecha.delay = delay;
        flecha.yaColisiono = false;
        this.flechas.push(flecha);

        this.physics.add.collider(flecha, this.sighttail, () => {
            this.handleFlechaCollision('Sighttail', flecha);
        });

        this.physics.add.collider(flecha, this.scentpaw, () => {
            this.handleFlechaCollision('Scentpaw', flecha);
        });

    }

    launchDialogueScene(caseId) {
        let startIndex = 0;
        let endIndex = 0;


        switch (caseId) {
            // game
            case 0: // dialogo sobre trampas
                startIndex = 12;
                endIndex = 13;
                break;

            case 1: // dialogo sobre flechas
                startIndex = 14;
                endIndex = 15;
                break;

            case 2: // dialogo sobre neblina
                startIndex = 16;
                endIndex = 17;
                break;

            case 3: // dialogo sobre paredes
                startIndex = 18;
                endIndex = 19;
                break;

            case 4: // dialogo cazador
                startIndex = 20;
                endIndex = 35;
                break;

            case 5: // dialogo de la carta
                startIndex = 36;
                endIndex = 53;
                break;

            default: // Caso por defecto
                console.error("Invalid caseId provided:", caseId);
                return;

        }

        this.scene.pause();
        this.scene.launch('DialogueScene', { startIndex, endIndex, callingScene: this.scene.key });
    }

    createAnimations(playerkey) {
        this.anims.create({
            key: `${playerkey}-idleUp`,
            frames: this.anims.generateFrameNumbers(playerkey, { start: 286, end: 287 }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: `${playerkey}-idleLeft`,
            frames: this.anims.generateFrameNumbers(playerkey, { start: 299, end: 300 }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: `${playerkey}-idleDown`,
            frames: this.anims.generateFrameNumbers(playerkey, { start: 312, end: 313 }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: `${playerkey}-idleRight`,
            frames: this.anims.generateFrameNumbers(playerkey, { start: 325, end: 326 }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: `${playerkey}-walk-up`,
            frames: this.anims.generateFrameNumbers(playerkey, { start: 104, end: 112 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: `${playerkey}-walk-down`,
            frames: this.anims.generateFrameNumbers(playerkey, { start: 130, end: 138 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: `${playerkey}-walk-left`,
            frames: this.anims.generateFrameNumbers(playerkey, { start: 117, end: 125 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: `${playerkey}-walk-right`,
            frames: this.anims.generateFrameNumbers(playerkey, { start: 143, end: 151 }),
            frameRate: 10,
            repeat: -1,
        });
    }

    update() {
        this.lastDirection1 = this.handlePlayerMovement(
            this.sighttail,
            this.controls1,
            'Sighttail',
            this.lastDirection1
        );

        this.lastDirection2 = this.handlePlayerMovement(
            this.scentpaw,
            this.controls2,
            'Scentpaw',
            this.lastDirection2
        );
        this.flechas.forEach((flecha) => {
            if (flecha.x >= flecha.rangoX.maxX) {
                flecha.setVelocityX(0);
                flecha.stop('flechas');


                // Retrasar el reinicio usando el delay almacenado
                this.time.delayedCall(flecha.delay, () => {
                    flecha.setPosition(flecha.posicionInicial.x, flecha.posicionInicial.y);

                    flecha.play('flechas');
                    flecha.setVelocityX(200); // Reinicia el movimiento
                });
            }
        });
        if (this.vistaDisp && this.controls1.power.isDown) {
            console.log("Jugador 1 usó poder");
            this.vistaDisp = false;
            this.flechas.forEach(flecha => {
                flecha.setVisible(true);
            });

            this.capaV.setVisible(true);

            //logica del timer 
            this.time.delayedCall(this.durVista, () => {
                this.flechas.forEach(flecha => {
                    flecha.setVisible(false);
                });

            });

            this.time.delayedCall(this.cargaVista, () => {
                this.vistaDisp = true;
                this.capaV.setVisible(false);
                console.log("vista disponible");
            });
        }

        if (this.olfatoDisp && this.controls2.power.isDown) {
            console.log("Jugador 2 usó poder");
            this.olfatoDisp = false;
            this.gas.forEach(gas => {
                gas.setVisible(true);
            });

            this.capaO.setVisible(true);

            this.time.delayedCall(this.durOlfato, () => {
                this.gas.forEach(gas => {
                    gas.setVisible(false);
                });
            });

            this.time.delayedCall(this.cargaOlfato, () => {
                this.olfatoDisp = true;
                this.capaO.setVisible(false);
                console.log("olfato disponible");
            });

        }

        //this.checkCazadorCollision(this.sighttail, 'Sighttail');
        //this.checkCazadorCollision(this.scentpaw, 'Scentpaw');
        // Centrar cámara entre los dos jugadores
        const centerjX = (this.sighttail.x + this.scentpaw.x) / 2;
        const centerjY = (this.sighttail.y + this.scentpaw.y) / 2;
        this.cameras.main.centerOn(centerjX, centerjY);
    }

    handlePlayerMovement(player, controls, playerkey, lastDirection) {
        let isMoving = false;

        player.setVelocity(0); // Detener movimiento al principio del frame

        if (controls.down.isDown) {
            player.setVelocityY(100);
            player.anims.play(`${playerkey}-walk-down`, true);
            lastDirection = 'down';
            isMoving = true;
        } else if (controls.up.isDown) {
            player.setVelocityY(-100);
            player.anims.play(`${playerkey}-walk-up`, true);
            lastDirection = 'up';
            isMoving = true;
        } else if (controls.left.isDown) {
            player.setVelocityX(-100);
            player.anims.play(`${playerkey}-walk-left`, true);
            lastDirection = 'left';
            isMoving = true;
        } else if (controls.right.isDown) {
            player.setVelocityX(100);
            player.anims.play(`${playerkey}-walk-right`, true);
            lastDirection = 'right';
            isMoving = true;
        }

        if (!isMoving) {
            switch (lastDirection) {
                case 'down':
                    player.anims.play(`${playerkey}-idleDown`, true);
                    break;
                case 'up':
                    player.anims.play(`${playerkey}-idleUp`, true);
                    break;
                case 'left':
                    player.anims.play(`${playerkey}-idleLeft`, true);
                    break;
                case 'right':
                    player.anims.play(`${playerkey}-idleRight`, true);
                    break;
            }
        }
        return lastDirection;
    }
}

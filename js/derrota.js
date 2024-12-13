class LoseScene extends Phaser.Scene{
    constructor() {
        super({ key: 'LoseScene' });
    }

    preload(){
        //Cargamos las imagenes que componen el fondo
        this.load.image("fondo", 'assets/menu.png');
        this.load.image("boton", 'assets/salir.png');
    }

    create(){
        //variables para meter las imagenes a posteriori
        this.centerX = this.scale.width / 2;
        this.centerY = this.scale.height / 2;

        //Imagen del fondo
        const background_lose = this.add.image(centerX,centerY, "fondo");

        //Botón para volver al menú inicial
        const volver = this.add.image(0.9 * centerX, 0.9 * centerY, "salir").setInteractive()
            .on('pointerdown', () => {
                this.scene.stop("LoseScene");
                this.scene.start("IntroScene");
            });
    }
}
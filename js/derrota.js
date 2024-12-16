class LoseScene extends Phaser.Scene{
    constructor(){
        super({key: 'LoseScene'});
    }

    preload(){
        //Cargamos las imagenes que componen el fondo
        this.load.image("fondo", 'assets/Pantallla_Derrota.png');
        this.load.image("botonS", 'assets/Salir.png');
    }

    create(){
        //variables para meter las imagenes a posteriori
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        //Imagen del fondo
        const background_lose = this.add.image(centerX,centerY, "fondo");

        //Botón para volver al menú inicial
        const volver = this.add.image(0.9 * centerX, 0.9 * centerY, "botonS").setInteractive()
            .on('pointerdown', () => {
                this.scene.stop("LoseScene");
                this.scene.start("IntroScene");
            });
    }
}
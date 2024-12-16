class LoseScene extends Phaser.Scene{
    constructor(){
        super({key: 'LoseScene'});
    }

    preload(){
        //Cargamos las imagenes que componen el fondo
        this.load.image("fondoD", 'assets/Pantallla_Derrota.png');
        this.load.image("botonS", 'assets/Salir.png');
    }

    create(){
        //variables para meter las imagenes a posteriori
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        //Imagen del fondo
        const background_lose = this.add.image(centerX,centerY, "fondoD");

        //Texto derrota
        const LoseText = this.add.text(0.4*centerX, 0.3*centerY, 'El enemigo se ha ' + 'salido con la suya',{
            font: '70px mousy',
            color: '#e4be9a',
            align: 'center'
        });

        //Botón para volver al menú inicial
        const volver = this.add.image(1 * centerX, 1.4 * centerY, "botonS").setInteractive()
            .on('pointerdown', () => {
                this.scene.stop("LoseScene");
                this.scene.start("IntroScene");
            });
    }
}

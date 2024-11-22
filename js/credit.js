class CreditScene extends Phaser.Scene{
    constructor(){
        super({key: 'CreditScene'});
    }

    preload() {
        //carga de audios
        this.load.audio("button", 'assets/Clickar_Boton.wav')

        // carga de imagenes
        this.load.image("backgroundCredit", 'assets/backgroundcontrol.png');
        this.load.image("back", 'assets/backbutton.png');
        
    }

    create(){
        const centerX = this.scale.width/2;
        const centerY = this.scale.height/2;

        const backgroundCredit = this.add.image(centerX, centerY, "backgroundCredit");

        const backButton = this.add.image(0.3*centerX, 1.6*centerY, "back")
        .setInteractive()
        .on('pointerdown', ()=>{
            this.scene.stop("CreditScene");
            this.scene.start("IntroScene");
            this.sound.play("button");
        } );
        
        backButton.setScale(0.5);
    }
}
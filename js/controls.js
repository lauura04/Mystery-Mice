class ControlScene extends Phaser.Scene{
    constructor(){
        super({key: 'ControlScene'});
    }

    preload() {
        //carga de audios
        this.load.audio("button", 'assets/Clickar_Boton.wav')

        // carga de imagenes
        this.load.image("backgroundcontrol", 'assets/backgroundcontrol.png');
        this.load.image("backControlButton", 'assets/backbutton.png');
        this.load.image("staticSighttail", 'assets/SightailDialogue.png');
        this.load.image("staticScentpaw", 'assets/ScentpawDialogue.png');
        this.load.image("control1", 'assets/Controles_awse.png');
        this.load.image("control2", 'assets/Controles_flechas.png');
    }

    create(){

        const centerX = this.scale.width/2;
        const centerY = this.scale.height/2;

        const backgroundControl = this.add.image(centerX, centerY, "backgroundcontrol");

        const backcontrolButton = this.add.image(0.3*centerX, 1.6*centerY, "backControlButton")
        .setInteractive()
        .on('pointerdown', ()=>{
            this.scene.stop("ControlScene");
            this.scene.start("IntroScene");
            this.sound.play("button");
        } );
        
        backcontrolButton.setScale(0.5);

        
        const sighttailAsset = this.add.image(0.5*centerX,0.6*centerY, "staticSighttail");
        sighttailAsset.setScale(0.4);

        const control1 = this.add.image(0.7*centerX, 0.8*centerY, "control1");
        control1.setScale(1.2);

        // hacer lo mismo que con sighttail para scentpaw pero con los assets de las flechas
        const scentpawAsset = this.add.image(1.4*centerX, 0.6*centerY,"staticScentpaw" );
        scentpawAsset.setScale(-0.45, 0.45);

        const control2 = this.add.image(1.5*centerX, 0.9*centerY, "control2");
        control2.setScale(1.2);
       
        // meter lo de los poderes -> teclas por poder


    }
    
}
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

        const controlASighttail = this.add.text(0.55*centerX, 0.65*centerY, " A ", {
            font: '70px mousy',
            color: '#FFFFFF',
            backgroundColor: '#000',
            align: 'center'
        });

        const controlWSighttail = this.add.text(0.65*centerX, 0.5*centerY, "W", {
            font: '70px mousy',
            color: '#FFFFFF',
            backgroundColor: '#000',
            align: 'center'
        });

        const controlDSighttail = this.add.text(0.72*centerX, 0.65*centerY, " D ", {
            font: '70px mousy',
            color: '#FFFFFF',
            backgroundColor: '#000',
            align: 'center'
        });

        const controlSSighttail = this.add.text(0.65*centerX, 0.8*centerY, " S ", {
            font: '70px mousy',
            color: '#FFFFFF',
            backgroundColor: '#000',
            align: 'center'
        });

        // hacer lo mismo que con sighttail para scentpaw pero con los assets de las flechas
        const scentpawAsset = this.add.image(1.4*centerX, 0.6*centerY,"staticScentpaw" );
        scentpawAsset.setScale(-0.45, 0.45);
       
        // meter lo de los poderes -> teclas por poder

        const textBack = this.add.text(0.2*centerX, 1.45*centerY, 'Volver', {
            font: '40px mousy',
            color: '#FFFFFF',
            align: 'center'
        });

    }
    
}
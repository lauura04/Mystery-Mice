class ControlScene extends Phaser.Scene{
    constructor(){
        super({key: 'ControlScene'});
    }

    preload() {
        this.load.image("backgroundcontrol", 'assets/backgroundcontrol.png');
        this.load.image("backControlButton", 'assets/backbutton.png');
        this.load.image("staticSighttail", 'assets/SightailDialogue.png')
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
        } );
        
        backcontrolButton.setScale(0.5);

        

        const textBack = this.add.text(0.2*centerX, 1.45*centerY, 'Volver', {
            font: '40px mousy',
            color: '#FFFFFF',
            align: 'center'
        });

    }
    
}
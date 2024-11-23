class PauseScene extends Phaser.Scene{
    constructor(){
        super({key: 'PauseScene'});
    }

    preload(){
        this.load.image("backgroundP", 'assets/backgroundcontrol.png');
        this.load.image("backP", 'assets/backbutton.png');
    }

    create(){
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        const backgroundPause = this.add.image(centerX, centerY, "backgroundP");
        const backPButton = this.add.image(0.2*centerX, 1.7*centerY, "backP").setScale(0.3)
        .setInteractive()
        .on('pointerdown', ()=>{
            this.scene.stop("PauseScene");
            this.scene.resume("TutorialScene");
        }); 
    }
}
class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    preload() {
        this.load.image("backgroundP", 'assets/backgroundcontrol.png');
        this.load.image("reanudar", 'assets/Reanudar.png');
        this.load.image("rat1", 'assets/Rat.png');
        this.load.image("rat2", 'assets/Rat2.png');


        this.load.image("credits", 'assets/Créditos.png');

        this.load.image("salir", 'assets/Salir.png');
        this.load.image("hilos", 'assets/Hilos.png');
        this.load.image("sighttailP", 'assets/SightailDialogue.png');
        this.load.image("scentpawP", 'assets/ScentpawDialogue.png');
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        const backgroundPause = this.add.image(centerX, centerY, "backgroundP");

        const reanudar = this.add.image(0.28 * centerX, 0.4 * centerY, "reanudar").setInteractive()
            .on('pointerdown', () => {
                this.scene.stop("PauseScene");
                this.returnToCallingScene();
            });

        const salir = this.add.image(0.4 * centerX, 0.9 * centerY, "salir").setInteractive()
            .on('pointerdown', () => {
                this.scene.stop("PauseScene");
                this.stopCallingScene();
                this.scene.start("IntroScene");
            });

        const credits = this.add.image(0.6 * centerX, 1.5 * centerY, "credits").setInteractive()
            .on('pointerdown', () => {
                this.scene.pause("PauseScene");
                this.scene.launch('CreditScene', { callingScene: this.scene.key });
            });

        const sighttailImg = this.add.image(1.1 * centerX, 0.9 * centerY, "rat1");
        const sighttailAs = this.add.image(1.23*centerX, 0.85*centerY, "sighttailP").setScale(0.4);

        const scentpawImg = this.add.image(1.7*centerX, centerY, "rat2");
        const scentpawAs = this.add.image(1.5*centerX, 0.95*centerY, "scentpawP").setScale(0.4);

        const hilos = this.add.image(centerX, centerY, "hilos");

        this.callingScene = this.scene.settings.data?.callingScene || null;
    }

    //funcion para manejar la llamada entre distintas escenas
    returnToCallingScene() {
        if (this.callingScene) {
            this.scene.stop(); // Detén la escena de controles
            this.scene.resume(this.callingScene); // Reanuda la escena llamante
        } else {
            console.error("No callingScene provided");
        }
    }

    stopCallingScene(){
        if(this.callingScene){
            this.scene.stop(this.callingScene);
        }
    }
}
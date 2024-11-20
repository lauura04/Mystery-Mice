class DialogueScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DialogueScene' });
    }

    //se va a ir llamando a las funciones de forma paralela -> sin fondo

    preload() {
        this.load.image("scentpaw", 'assets/ScentpawDialogue.png');
        this.load.image("sighttail", 'assets/SightailDialogue.png');
        this.load.image("name", 'assets/Dialogo_nombre.png');
        this.load.image("dial_dhc", 'assets/Dialogo_dcha.png');
        this.load.image("dial_izq", 'assets/Dialogo_izqd.png');
    }

    create() {
        //variables para meter las imagenes a posteriori
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

<<<<<<< Updated upstream
        let 
=======
        let see = true; // true -> derecha, false -> izquierda
>>>>>>> Stashed changes

        const rectDialogue = this.add.image(centerX,1.2*centerY, "dial_dhc");
        rectDialogue.setScale(0.8);
        const scentpaw = this.add.image(1.45*centerX, 1.2*centerY, "scentpaw");
        scentpaw.setScale(0.8);
        const sighttail = this.add.image(0.5*centerX, 1.2*centerY, "sighttail");
        sighttail.setScale(0.8);
<<<<<<< Updated upstream
=======
        const rectNameIz = this.add.image(centerX, 1.1*centerY, "name");
>>>>>>> Stashed changes
        
    }
}
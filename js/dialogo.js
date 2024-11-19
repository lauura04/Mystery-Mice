class DialogueScene extends Phaser.Scene{
    constructor(){
        super({key:'DialogueScene'});
    }

    //se va a ir llamando a las funciones de forma paralela -> sin fondo

    preload(){
        this.load.image("scentpaw", 'assets/ScentpawDialogue.png');
        this.load.image("sightail", 'assets/SightailDialogue.png');
        
    }
}
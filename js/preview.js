class PreviewScene extends Phaser.Scene{
    constructor(){
        super({key: 'PreviewScene'});
    }

    preload(){
        // cargar imagen del periodico
    }

    create(){

        const centerX = this.scale.width/2;
        const centerY = this.scale.height/2;
        //variable del fondo del periodico

        //meter texto -> background chulo
        this.scene.launch("DialogueScene"); //de prueba para ver (no sería necesario)

        var cont = 0;
        const resetTime = 500;

        const message = this.add.text(1.3*centerX, 1.8*centerY, '', {
            font: '50px mousy',
            color: '#FFFFFF',
            backgroundColor: '#000',
            align: 'center'
        });

        this.input.keyboard.on('keydown-SPACE', ()=>{
            message.setText('Pulsa otra vez para saltar');
            cont++;

            this.time.delayedCall(resetTime, () => {
                message.setText('');
                cont = 0;
            });

            if(cont>1){
                this.scene.stop("PreviewScene");
                this.scene.start("GameScene");
            }
        });

        
    }
}
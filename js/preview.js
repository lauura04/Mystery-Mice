class PreviewScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreviewScene' });
    }

    preload() {
        // cargar imagen del periodico
        this.load.image('periodico', 'assets/periodico.png');
    }

    create() {
        
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        //variable del fondo del periodico
        this.periodico = this.add.image(centerX, centerY, 'periodico')
            .setInteractive()
            .on('pointerdown', () => {
                message.setText('Pulsa otra vez para saltar');
                cont++;

                this.time.delayedCall(resetTime, () => {
                    message.setText('');
                    cont = 0;
                });

                if (cont > 1) {
                    this.scene.stop("PreviewScene");
                    this.scene.start("TutorialScene");
                }
            });

        //meter texto 
        const tit = this.add.text(0.65 * centerX, 0.6 * centerY, '¡Aumentan los sucesos paranormales en Villa Cheddar!', {
            font: '55px mousy',
            color: '#42240e',
            align: 'left',
            //width: '800px',
            fontStyle: 'bold',
            wordWrap: { width: 700 }
        });

        const noticia = this.add.text(0.65 * centerX, 0.85 * centerY, 'VillaCheddar está en estado de alarma. Tras el reciente eclipse de la Luna de Roquefort, un fenómeno que ocurre una vez cada cien años, ' +
            'los habitantes han sido testigos de un incremento alarmante en los eventos paranormales. Para combatir esta oleada de actividad sobrenatural, la alcaldesa del pueblo ha contratado a Mystery Mice,' +
            'la famosa empresa de cazarratafantasmas liderada por los hermanos Sighttail y Scentpaw de la familia Arat.' +
            ' La calma en Villa Cheddar pende de un hilo. ¿Será Mystery Mice capaz de poner fin a esta pesadilla paranormal?', {
            font: '40px mousy',
            color: '#42240e',
            align: 'left',
            wordWrap: { width: 700 }
        });
        //this.scene.launch("DialogueScene"); //de prueba para ver (no sería necesario)

        var cont = 0;
        const resetTime = 500;

        const readingTime = 25000;

        const message = this.add.text(1.3 * centerX, 1.8 * centerY, '', {
            font: '50px mousy',
            color: '#FFFFFF',
            backgroundColor: '#000',
            align: 'center'
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            message.setText('Pulsa otra vez para saltar');
            cont++;

            this.time.delayedCall(resetTime, () => {
                message.setText('');
                cont = 0;
            });

            if (cont > 1) {
                this.scene.stop("PreviewScene");
                this.scene.start("TutorialScene");
            }
        });

        this.time.delayedCall(readingTime,()=>{
            this.scene.stop("PreviewScene");
            this.scene.start("TutorialScene");
        })


    }
}
class DialogueScene extends Phaser.Scene {
        constructor() {
                super({ key: 'DialogueScene' });
        }

        //se va a ir llamando a las funciones de forma paralela -> sin fondo

        preload() {
                this.load.image("scentpaw", 'assets/ScentpawDialogue.png');
                this.load.image("sighttail", 'assets/SightailDialogue.png');
                this.load.image("cazador", 'assets/cazador.png');
                this.load.image("nameIm", 'assets/Dialogo_nombre.png');
                this.load.image("dialog", 'assets/Dialogo_dcha.png');

        }

        create() {
                //variables para meter las imagenes a posteriori
                this.centerX = this.scale.width / 2;
                this.centerY = this.scale.height / 2;

                this.isRightSide = true; // true -> derecha, false -> izquierda


                this.scentpaw = this.add.image(1.45 * this.centerX, 1.2 * this.centerY, "scentpaw").setScale(0.8);
                this.sighttail = this.add.image(0.5 * this.centerX, 1.2 * this.centerY, "sighttail").setScale(0.8);
                this.rectDialogue = this.add.image(this.centerX, 1.2 * this.centerY, "dialog").setScale(-0.8, 0.8);
                this.rectName = this.add.image(this.centerX, 1.1 * this.centerY, "nameIm");
                this.nameText = this.add.text(0.289 * this.centerX, 1.457 * this.centerY, "Sighttail", {
                        font: '50px mousy',
                        color: '#FFFFFF',
                        align: 'center'
                }).setOrigin(0,0);

                this.dialogueText = this.add.text(0.4 * this.centerX, 1.6 * this.centerY, "", {
                        font: '50px mousy',
                        color: '#FFFFFF',
                        
                }).setOrigin(0,0);

                this.dialogueData = [
                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "Hola, ¿cómo estás?",
                                side: "left",
                        },
                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "Bien ¿y tú?",
                                side: "rigth",
                        },
                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "Yo bien, ¿cómo llevas el caso?",
                                side: "left",
                        }, 
                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "no sé si podremos con ello",
                                side: "rigth",
                        },

                ];

                this.currentDialogueIndex = 0;
                this.updateDialogue();

                this.input.on('pointerdown', () => {
                        this.nextDialogue();
                });
                

        }

        updateDialogue() {
                const dialogue = this.dialogueData[this.currentDialogueIndex];
                
                if (dialogue.side === 'left') {
                        this.rectDialogue.setScale(0.8);
                        this.rectName.setPosition(this.centerX, 1.1 * this.centerY, "nameIm");
                        this.nameText.setPosition(0.289 * this.centerX, 1.457 * this.centerY).setText("Sighttail");
                }
                else {
                        this.rectDialogue.setScale(-0.8, 0.8);
                        this.rectName.setPosition(2.25 * this.centerX, 1.1 * this.centerY, "nameIm");
                        this.nameText.setPosition(1.52 * this.centerX, 1.457 * this.centerY).setText("Scentpaw");
                }
                this.dialogueText.setText(dialogue.text);
                console.log(this.currentDialogueIndex);
        }

        nextDialogue(){
                this.currentDialogueIndex++;
                if(this.currentDialogueIndex < this.dialogueData.length){
                        this.updateDialogue();
                } 
        }
}
        




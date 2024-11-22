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
                this.cazador = this.add.image(1.45 * this.centerX, 1.2*this.centerY, "cazador").setScale(0.8);
                this.rectDialogue = this.add.image(this.centerX, 1.2 * this.centerY, "dialog").setScale(-0.8, 0.8);
                this.rectName = this.add.image(this.centerX, 1.1 * this.centerY, "nameIm");
                this.nameText = this.add.text(0.289 * this.centerX, 1.457 * this.centerY, "Sighttail", {
                        font: '50px mousy',
                        color: '#FFFFFF',
                        align: 'center'
                }).setOrigin(0, 0);

                this.dialogueText = this.add.text(0.4 * this.centerX, 1.605 * this.centerY, "", {
                        font: '45px mousy',
                        color: '#FFFFFF',
                        wordWrap: { width: this.centerX + 150 },

                }).setOrigin(0, 0);

                this.dialogueData = [
                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "¿Sabes, Scentpaw? No puedo dejar de pensar por qué este lugar en concreto es tan importante para nuestra investigación.",
                                side: "left",

                        },
                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "A esta cripta se la relaciona con los primeros asentamientos de VillaCheddar.",
                                side: "rigth",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "Es el epicentro de las energías que he estado rastreando desde hace semanas. Todas las señales apuntan a este lugar.",
                                side: "rigth",
                        },

                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "Tiene lógica, pero... hay algo que me da mala espina. Jamás he oido a nadie en VillaCheddar hablar de ella.",
                                side: "left",
                        },

                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "Apenas queda rastro de su existencia en los mapas del pueblo. ¿Por qué alguien querría mantener este lugar en secreto?",
                                side: "left",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "Quizá porque aquí ocurrió algo que nadie quiere recordar.",
                                side: "rigth",
                        },

                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "Entonces más nos vale estar preparados. Algo me dice que aquí hay algo más que simples piedras y huesos.",
                                side: "left",
                        },

                        // dialogo de la puerta
                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "Está cerrada... parece que alguien no quiere visitas.",
                                side: "left",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "Perfecto, cuanto más raro, más cerca estamos de descubrir la verdad.",
                                side: "rigth",
                        },

                        //dialogo de agujero
                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "¡Aquí hay algo! Parece un hueco lo suficientemente grande para que pasemos.",
                                side: "left",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "Bien visto. Aunque… esto me huele aún peor de lo que esperaba. Prepárate, seguro que no será camino de rosas.",
                                side: "rigth",
                        },
                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: " ¿Y cuándo lo es? Vamos, Scentpaw.",
                                side: "left",
                        },

                        //dialogo sobre trampas
                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "Cuidado, Sighttail, no podemos bajar la guardia. Este lugar huele a maldad… algo no está bien aquí, puede que haya trampas.",
                                side: "rigth",
                        },

                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: " Lo sé. No me gusta esto. Noto algo en el aire… y las paredes… parece que nos están observando. Mantente alerta.",
                                side: "left",
                        },

                        // dialogo sobre flechas
                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "¡Espera! Veo algo… hay un brillo en las paredes.",
                                side: "left",
                        },
                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "Sí, lo huelo también. Es como si estas flechas estuvieran hechas de puro odio. Tenemos que movernos rápido, pero con cuidado.",
                                side: "rigth",
                        },

                        //dialogo sobre neblina
                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "¡Para! Hay algo en el aire… es esa maldita niebla. Está por todas partes.",
                                side: "rigth",
                        },
                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "Ya lo veo. Vamos, buscaré un camino alternativo. No podemos quedarnos aquí por mucho tiempo.",
                                side: "left",
                        },

                        //dialogo sobre paredes
                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "Noto algo moverse… Son las paredes, están cambiando de lugar.",
                                side: "rigth",
                        },
                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "Perfecto, justo lo que nos faltaba. Tranquilo, si seguimos tu rastro llegaremos al centro.",
                                side: "left",
                        },

                        // ver cómo hacer lo del cazador --> if(currentIndex) -> aparicion y recolocacion de todo
                        {
                                character: "cazador",
                                name: "Cazador",
                                text: "¿Quién osa perturbar mi eterno descanso? ¿Sois enviados de ese maldito traidor?",
                                side: "right",
                        },

                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "¿Quién... quién eres tú? ¿Eres el espíritu que habita esta cripta?",
                                side: "left",
                        },

                        {
                                character: "cazador",
                                name: "Cazador",
                                text: "Soy más que un simple espíritu, pequeñajo. Fui un cazador, y de los buenos, uno de los mejores de VillaCheddar.",
                                side: "right",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "Tu energía es fuerte, más que la de otros fantasmas que hemos encontrado. ¿Por qué sigues aquí, atrapado?",
                                side: "rigth",
                        },

                        {
                                character: "cazador",
                                name: "Cazador",
                                text: "Porque fui traicionado. Mi muerte no fue un simple accidente, sino un acto deliberado de un cobarde que me temía. ",
                                side: "right",
                        },
                        {
                                character: "cazador",
                                name: "Cazador",
                                text: "Yo protegía este pueblo, pero mi lealtad fue pagada con una daga en la espalda.",
                                side: "right",
                        },

                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "¿Traicionado? ¿Quién te hizo esto?",
                                side: "left",
                        },

                        {
                                character: "cazador",
                                name: "Cazador",
                                text: "Alguien con influencia suficiente para manipular todo a su favor... Recuerdo vagamente una figura... ",
                                side: "right",
                        },

                        {
                                character: "cazador",
                                name: "Cazador",
                                text: "Quizá era alguien que temía lo que sabía… o lo que podía descubrir.",
                                side: "right",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "Entonces, si esto fue una conspiración, tal vez tenga que ver con los fantasmas que están retenidos en el pueblo.",
                                side: "rigth",
                        },

                        {
                                character: "cazador",
                                name: "Cazador",
                                text: "Es posible. Algo oscuro ha caído sobre VillaCheddar. Las energías que percibo no son normales...",
                                side: "right",
                        },

                        {
                                character: "cazador",
                                name: "Cazador",
                                text: " Alguien o algo está usando el dolor y la ira de las almas para un propósito mayor.",
                                side: "right",
                        },

                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "Nuestros padres también investigaban algo relacionado con las viejas tradiciones y los fantasmas antes de morir.",
                                side: "left",
                        },

                        {
                                character: "cazador",
                                name: "Cazador",
                                text: "Los secretos que guarda esta cripta podrían aclarar muchas cosas. Quizá aquí encontréis las respuestas.",
                                side: "right",
                        },

                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "Gracias por tu ayuda. Prometemos averiguar que está pasando y hacer justicia por lo que te hicieron.",
                                side: "left",
                        },

                        {
                                character: "cazador",
                                name: "Cazador",
                                text: "Os deseo suerte, jóvenes. Quizás vuestra valentía sea lo que finalmente traiga la paz que este lugar ha perdido.",
                                side: "right",
                        },

                        // dialogo de la carta
                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "Scentpaw, aquí... Parece una carta vieja.",
                                side: "left",
                        },
                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "Déjame ver... La tinta está descolorida, pero todavía es legible. Esta letra… ¡Es de papá!",
                                side: "rigth",
                        },
                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "¿De papá? No puede ser... Entonces, estuvieron aquí antes que nosotros. ¿Qué dice?",
                                side: "left",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "Queridos Sighttail y Scentpaw, si estáis leyendo esto, significa que nuestra investigación nos ha llevado demasiado lejos,",
                                side: "rigth",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: " y no hemos tenido más opción que dejar esta advertencia para vosotros. Los fantasmas que atormentan el pueblo no son simples almas perdidas.",
                                side: "rigth",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: " Son víctimas de un oscuro ciclo que alguien está perpetuando. Una figura en las sombras controla a estos seres,",
                                side: "rigth",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: " usando el miedo y el dolor para sus propios fines.",
                                side: "rigth",
                        },

                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text: "¿Una figura en las sombras? ¿Se refiere a la misma persona que el cazador mencionó? Todo empieza a encajar.",
                                side: "left",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "‘No podemos afirmar nada con certeza, pero todas nuestras sospechas apuntan… a la alcaldesa.’",
                                side: "rigth",
                        },

                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text:"¿Qué? ¿La alcaldesa? ¡No puede ser! Siempre nos dijo que quería ayudar, que estaba preocupada por los fantasmas.",
                                side: "left",
                        },

                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text:"Pero si ella está implicada... ¿por qué?",
                                side: "left",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "‘Si llegáis a esta carta, significa que ya sabéis lo que está pasando. Debéis tener cuidado.",
                                side: "rigth",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "La verdad puede ser más peligrosa de lo que imaginamos. Si no podemos detener lo que se avecina,",
                                side: "rigth",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "al menos esperamos que vosotros podáis hacerlo.’",
                                side: "rigth",
                        },

                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text:"No quiero creerlo, pero todo encaja. Alguien con influencia... Tenemos que llegar al fondo de esto.",
                                side: "left",
                        },

                        {
                                character: "sighttail",
                                name: "Sighttail",
                                text:"Si papá y mamá tenían razón, la alcaldesa está jugando con algo mucho más grande de lo que imaginábamos.",
                                side: "left",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "No nos detendremos hasta descubrir la verdad. Por mamá y papá. Y por VillaCheddar.",
                                side: "rigth",
                        },

                        {
                                character: "scentpaw",
                                name: "Scentpaw",
                                text: "No dejaremos que se salgan con la suya.",
                                side: "rigth",
                        },

                ];

                const startIndex = this.scene.settings.data?.startIndex || 0; // Por defecto, empieza en 0
                const endSceneIndex = this.scene.settings.data?.endSceneIndex || 0;
                this.currentDialogueIndex = startIndex;
                this.updateDialogue();

                this.input.on('pointerdown', () => {
                        this.nextDialogue();
                });


        }

        updateDialogue() {
                const dialogue = this.dialogueData[this.currentDialogueIndex];

                if (dialogue.side === 'left') {
                        this.rectDialogue.setScale(-0.8, 0.8);
                        this.rectName.setPosition(this.centerX, 1.1 * this.centerY, "nameIm");
                        this.nameText.setPosition(0.289 * this.centerX, 1.457 * this.centerY).setText("Sighttail");
                }
                else {
                        this.rectDialogue.setScale(0.8);
                        this.rectName.setPosition(2.25 * this.centerX, 1.1 * this.centerY, "nameIm");
                        this.nameText.setPosition(1.52 * this.centerX, 1.457 * this.centerY).setText("Scentpaw");
                }
                this.dialogueText.setText(dialogue.text);
                console.log(this.currentDialogueIndex);
        }

        nextDialogue() {
                this.currentDialogueIndex++;
                if (this.currentDialogueIndex < this.dialogueData.length) {
                        this.updateDialogue();
                }
        }
}





class IntroScene extends Phaser.Scene{
    constructor(){
        super({key: 'IntroScene'});
    }

    preload(){
        // carga de audios
        this.load.audio("button", 'assets/Clickar_Boton.wav');
        this.load.audio("backgroundsound", 'assets/musicMenu.mp3');


        //carga de imágenes
        this.load.image("background", 'assets/menu.png');
        this.load.image("book", 'assets/Libro.png');
        this.load.image("shadowBook", 'assets/SombraLibro.png');
    }

    create(){
        //variables para meter las imagenes a posteriori
        const centerX = this.scale.width/2;
        const centerY = this.scale.height/2;
        
        // activacion de sonidos
        if (!this.sound.get('backgroundsound')) {
            this.music = this.sound.add("backgroundsound", { loop: true, volume: 0.5 });
            this.music.play();
        } else {
            this.music = this.sound.get('backgroundsound');
        }

        
        const background_menu = this.add.image(centerX,centerY, "background");

        const title = this.add.text(0.1*centerX, 0.05*centerY, 'Mystery Mice', {
            font: '200px mousy',
            color: '#CDC1BF',
            backgroundColor: '#42240e80',
            align: 'center'
        });

        // interfaz del libro
        const shadowBook = this.add.image(0.618*centerX, 1.2*centerY, "shadowBook");
        const book = this.add.image(0.65*centerX, 1.2*centerY, "book");
        
        
        const startText = this.add.text(0.72*centerX, 0.65*centerY, 'Empezar',{
            font: '70px mousy',
            color: '#42240e',
            align: 'center'
        }).setInteractive()
        .on('pointerdown', ()=>{
            this.scene.stop("IntroScene");
            this.scene.start("PreviewScene"); 
            this.music.stop();           
            this.sound.play("button");
        });


        const textControl = this.add.text(0.72*centerX, 0.9*centerY, 'Controles', {
            font: '70px mousy',
            color: '#42240e',
            align: 'center'
        }).setInteractive()
        .on('pointerdown', () =>{
            this.scene.stop("IntroScene");
            this.scene.start("ControlScene");
            this.sound.play("button");
        });

        const textCredit = this.add.text(0.72*centerX, 1.15*centerY, 'Créditos', {
            font: '70px mousy',
            color: '#42240e',
            align: 'center'
        }).setInteractive()
        .on('pointerdown', () =>{
            this.scene.stop("IntroScene");
            this.scene.start("CreditScene");
            this.sound.play("button");
        });

        const exitText = this.add.text(0.78*centerX, 1.4*centerY, 'Salir', {
            font: '70px mousy',
            color: '#42240e',
            align: 'center'
        }).setInteractive()
        .on('pointerdown', ()=>{
            this.sound.play("button");
            this.game.destroy(true);
        });
    }

    
}

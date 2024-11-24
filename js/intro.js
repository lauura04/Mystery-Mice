class IntroScene extends Phaser.Scene{
    constructor(){
        super({key: 'IntroScene'});
    }

    preload(){
        // carga de audios
        this.load.audio("boton", 'assets/Clickar_Boton.wav');
        this.load.audio("musicaFondo", 'assets/musicMenu.mp3');


        //carga de imágenes
        this.load.image("fondo", 'assets/menu.png');
        this.load.image("libro", 'assets/Libro.png');
        this.load.image("sombraLibro", 'assets/SombraLibro.png');
        this.load.image("periodicoM", 'assets/Menu_inicialPeri.png');
    }

    create(){
        //variables para meter las imagenes a posteriori
        const centerX = this.scale.width/2;
        const centerY = this.scale.height/2;
        
        // activacion de sonidos
        if (!this.sound.get('musicaFondo')) {
            this.music = this.sound.add("musicaFondo", { loop: true, volume: 0.5 });
            this.music.play();
            this.registry.set("musicaFondo", this.music);
        } else {
            this.music = this.sound.get('musicaFondo');
        }

        // montaje de la escena
        const background_menu = this.add.image(centerX,centerY, "fondo");

        const title = this.add.text(0.1*centerX, 0.05*centerY, 'Mystery Mice', {
            font: '200px mousy',
            color: '#CDC1BF',
            backgroundColor: '#42240e80',
            align: 'center'
        });


        // interfaz del libro
        const sombraLibro = this.add.image(0.618*centerX, 1.2*centerY, "sombraLibro");
        const libro = this.add.image(0.65*centerX, 1.2*centerY, "libro");
        
        // botones del menu
        const startText = this.add.text(0.72*centerX, 0.65*centerY, 'Empezar',{
            font: '70px mousy',
            color: '#42240e',
            align: 'center'
        }).setInteractive()
        .on('pointerdown', ()=>{
            this.scene.stop("IntroScene");
            this.scene.start("PreviewScene");            
            this.sound.play("boton");
        });


        const textControl = this.add.text(0.72*centerX, 0.9*centerY, 'Controles', {
            font: '70px mousy',
            color: '#42240e',
            align: 'center'
        }).setInteractive()
        .on('pointerdown', () =>{
            this.scene.pause("IntroScene");
            this.scene.launch('ControlScene', { callingScene: this.scene.key });
            this.sound.play("boton");
        });

        const textCredit = this.add.text(0.72*centerX, 1.15*centerY, 'Créditos', {
            font: '70px mousy',
            color: '#42240e',
            align: 'center'
        }).setInteractive()
        .on('pointerdown', () =>{
            this.scene.pause("IntroScene");
            this.scene.launch('CreditScene', { callingScene: this.scene.key });
            this.sound.play("boton");
        });

        const exitText = this.add.text(0.78*centerX, 1.4*centerY, 'Salir', {
            font: '70px mousy',
            color: '#42240e',
            align: 'center'
        }).setInteractive()
        .on('pointerdown', ()=>{
            this.sound.play("boton");
            this.game.destroy(true);
        });

        this.periodicoM = this.add.image(centerX, centerY, "periodicoM");
    }

    
}

class IntroScene extends Phaser.Scene{
    constructor(){
        super({key: 'IntroScene'});
    }

    preload(){
        // carga de audios
        this.load.audio("button", 'assets/Clickar_Boton.wav')

        //carga de imágenes
        this.load.image("background", 'assets/menu.png');
        this.load.image("start", 'assets/startbutton.png');
        this.load.image("config", 'assets/configbutton.png');
        this.load.image("control", 'assets/controlbutton.png');
        this.load.image("exit", 'assets/exitbutton.png');
    }

    create(){
        //variables para meter las imagenes a posteriori
        const centerX = this.scale.width/2;
        const centerY = this.scale.height/2;
        
        // activacion de sonidos

        const background_menu = this.add.image(centerX,centerY, "background");

        const title = this.add.text(0.4*centerX, 0.15*centerY, 'Mystery Mice', {
            font: '200px mousy',
            color: '#FFFFFF',
            backgroundColor: '#000',
            align: 'center'
        });
        
        //boton start -> funcionamiento y reajuste de tamaño
        const startbutton = this.add.image(1.6*centerX,0.5*centerY,"start")
        .setInteractive()
        .on('pointerdown', ()=>{
            this.scene.stop("IntroScene");
            this.scene.start("PreviewScene");
            this.sound.play("button");
        });
        startbutton.setScale(0.5);

        const startText = this.add.text(1.55*centerX, 0.5*centerY, 'Empezar',{
            font: '40px mousy',
            color: '#FFFFFF',
            align: 'center'
        });


        //boton controles 
        const controlbutton = this.add.image(1.6*centerX, 1.2*centerY, "control")
        .setInteractive()
        .on('pointerdown', () =>{
            this.scene.stop("IntroScene");
            this.scene.start("ControlScene");
            this.sound.play("button");
        })
        controlbutton.setScale(0.4);

        const textControl = this.add.text(1.55*centerX, 1.15*centerY, 'Controles', {
            font: '40px mousy',
            color: '#FFFFFF',
            align: 'center'
        });
       

        //boton exit -> determinar si volver al inicio o eliminar todo
        const exitbutton = this.add.image(1.6*centerX, 1.9*centerY, "exit")
        .setInteractive()
        .on('pointerdown', ()=>{
            this.sound.play("button");
            this.game.destroy(true);
        });
        exitbutton.setScale(0.5);

        const exitText = this.add.text(1.58*centerX, 1.65*centerY, 'Salir', {
            font: '40px mousy',
            color: '#FFFFFF',
            align: 'center'
        });
    }

    
}
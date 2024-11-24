class CreditScene extends Phaser.Scene{
    constructor(){
        super({key: 'CreditScene'});
    }

    preload() {
        //carga de audios
        this.load.audio("button", 'assets/Clickar_Boton.wav')

        // carga de imagenes
        this.load.image("backgroundCredit", 'assets/backgroundcontrol.png');
        this.load.image("back", 'assets/backbutton.png');
        this.load.image("creditos", 'assets/créditos.png');
        this.load.image("rat",'assets/rat.png');
        
    }

    create(){
        const centerX = this.scale.width/2;
        const centerY = this.scale.height/2;

        //Fondo
        const backgroundCredit = this.add.image(centerX, centerY, "backgroundCredit");
        //Hojas
        const creditos=this.add.image(0.95*centerX,0.4*centerY,"creditos");
        const hoja1 = this.add.image(0.35*centerX, centerY, "rat");
        const hoja2 = this.add.image(0.95*centerX, 1.35*centerY, "rat");
        const hoja3 = this.add.image(1.55*centerX, centerY, "rat");

        //Textos de los créditos
        const dA= this.add.text(0.23*centerX,0.6*centerY, 'Arte 2D', {
            font: '65px mousy',
            color: '#42240e',
            align: 'center'

        })
        const mari=this.add.text(0.15*centerX,0.85*centerY, 'María de Andrés Jarandilla', {
            font: '35px mousy',
            color: '#42240e',
            align: 'center'

        })

        const dav=this.add.text(0.15*centerX,centerY,'David del Castillo Enríquez',{
            font: '35px mousy',
            color: '#42240e',
            align: 'center'
        })

        const prog= this.add.text(1.37*centerX,0.6*centerY, 'Programación', {
            font: '65px mousy',
            color: '#42240e',
            align: 'center'

        })

        const mari2=this.add.text(1.35*centerX,0.85*centerY, 'María de Andrés Jarandilla', {
            font: '35px mousy',
            color: '#42240e',
            align: 'center'

        })

        const dav2=this.add.text(1.36*centerX,centerY,'David del Castillo Enríquez',{
            font: '35px mousy',
            color: '#42240e',
            align: 'center'
        })

        const dan3=this.add.text(1.38*centerX,1.15*centerY, 'Daniel Duque Rodríguez', {
            font: '35px mousy',
            color: '#42240e',
            align: 'center'

        })

        const lau=this.add.text(1.38*centerX,1.3*centerY, 'Laura Facenda Estrella', {
            font: '35px mousy',
            color: '#42240e',
            align: 'center'

        })

        const son= this.add.text(0.75*centerX,0.95*centerY, 'Sonido y Música', {
            font: '65px mousy',
            color: '#42240e',
            align: 'center'

        })

        const dan=this.add.text(0.77*centerX,1.15*centerY, 'Daniel Duque Rodríguez', {
            font: '35px mousy',
            color: '#42240e',
            align: 'center'

        })

        const gam= this.add.text(0.77*centerX,1.35*centerY, 'Game Desing', {
            font: '65px mousy',
            color: '#42240e',
            align: 'center'

        })

        const dan2=this.add.text(0.77*centerX,1.55*centerY, 'Daniel Duque Rodríguez', {
            font: '35px mousy',
            color: '#42240e',
            align: 'center'

        })

       

        const backButton = this.add.image(0.2*centerX, 1.7*centerY, "back")
        .setInteractive()
        .on('pointerdown', ()=>{
            this.scene.stop("CreditScene");
            this.scene.start("IntroScene");
            this.sound.play("button");
        } );
        
        backButton.setScale(0.3);
    }
}
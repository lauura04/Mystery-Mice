class EndScene extends Phaser.Scene{
    constructor(){
        super({key:'EndScene'});
    }

    preload(){
        this.load.image("periodicoF", 'assets/periodico.png');
    }

    create(){
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
        this.periodicoF = this.add.image(centerX, centerY, 'periodicoF');

        this.textoF = this.add.text(0.75*centerX, centerY, 'Fin... ¿O no?', {
            font: '120px mousy',
            color: '#42240e',
            align: 'center'
        });
    }
}
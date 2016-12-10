//DEPRECATED


class SimpleGame {

    constructor() {
        //this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        //this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update, render: this.render }, false, false);
        //this.player = new Player(this);

    }

    resizeTimer: number;

    preload() {
    }

    create() {
        

    }

    update() {
        /* 
        Ben's Note: This isn't the right way to do this.
        if(this.game.width != window.innerWidth && this.game.height != window.innerHeight){
            this.resizeTimer && clearTimeout(this.resizeTimer); //still unsure how to make the clearTimeout work
            this.resizeTimer = setTimeout(SimpleGame.resizeGameAndLayer(this), 3000);
        }
        */

    }

    /*
    static resizeGameAndLayer(s: SimpleGame){
        s.game.scale.setGameSize(window.innerWidth, window.innerHeight);
        s.layer.resize(s.game.width, s.game.height);
        console.log("The game has just been resized to: " + s.game.width + " x " + s.game.height);
        // clearTimeout(s.resizeTimer);
        // console.log(s.resizeTimer);
    }
    */

    render() {

    }

}
class SimpleGame {

    constructor() {
        //this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: this.preload, create: this.create, update: this.update, render: this.render }, false, false);

    }

    game: Phaser.Game;

    map: Phaser.Tilemap;
    layer: any;
    collisionLayer: any;

    cursors: Phaser.CursorKeys;
    //sprite: Phaser.Sprite;
    collisionGroup: Phaser.Group;

    car: Phaser.Sprite;

    player: Player;

    static subscribers: any[] = [];

    resizeTimer: number;

    preload() {
        //this.game.load.image('ground', '../res/img/test.jpg');
        
        this.game.stage.backgroundColor = "#336600";

        this.game.load.tilemap('testmap', '../res/map/testmap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', '../res/map/testset.png');
        this.game.load.image('car', '../res/sprite/car90.png');
        this.game.load.image('space', '../res/img/space.jpg');
    }

    create() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.map = this.game.add.tilemap('testmap');

        this.map.addTilesetImage('testset', 'tiles');

        this.layer = this.map.createLayer('ground');
        this.collisionLayer = this.map.createLayer('collision');
        this.collisionLayer.setScale(2,2);
        
        this.map.setCollisionByExclusion([],true,'collision');

        (this.layer as Phaser.TilemapLayer).setScale(2,2);

        this.layer.resizeWorld();

        //Wall objects
        this.car = this.game.add.sprite(16,16,'car');
        this.car.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.car);
        arcb(this.car).collideWorldBounds = true;
        //(this.car.body as Phaser.Physics.Arcade.Body).immovable = true;
        //arcb(this.car).moves = false;


        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.player = new Player(this.game, this.cursors);

        this.collisionGroup = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        this.collisionGroup.add(this.car)
        this.collisionGroup.add(this.player.playerSprite);

        this.game.camera.follow(this.player.playerSprite);


        this.game.input.onDown.addOnce(() => this.map.replace(31,46,undefined,undefined,undefined,undefined));

        //Add overhead layers?
        this.map.createLayer('overhead').setScale(2,2);
        this.map.createLayer('overhead2').setScale(2,2);

        
    }

    update() {

        for (let obj of SimpleGame.subscribers) if (obj.update) obj.update();

        /* 
        Ben's Note: We can't be calling this in update.
        if(this.game.width != window.innerWidth && this.game.height != window.innerHeight){
            this.resizeTimer && clearTimeout(this.resizeTimer); //still unsure how to make the clearTimeout work
            this.resizeTimer = setTimeout(SimpleGame.resizeGameAndLayer(this), 3000);
        }
        */

        this.game.physics.arcade.collide(this.collisionGroup);        
        this.game.physics.arcade.collide(this.player.playerSprite,this.collisionLayer);      

    }

    static resizeGameAndLayer(s: SimpleGame){
        s.game.scale.setGameSize(window.innerWidth, window.innerHeight);
        s.layer.resize(s.game.width, s.game.height);
        console.log("The game has just been resized to: " + s.game.width + " x " + s.game.height);
        // clearTimeout(s.resizeTimer);
        // console.log(s.resizeTimer);
    }


    render() {

        for (let obj of SimpleGame.subscribers) if (obj.render) obj.render();
        /*
        this.game.debug.text('Click to replace tiles', 32, 32, 'rgb(0,0,0)');
        this.game.debug.text('Tile X: ' + this.layer.getTileX(this.sprite.x), 32, 48, 'rgb(0,0,0)');
        this.game.debug.text('Tile Y: ' + this.layer.getTileY(this.sprite.y), 32, 64, 'rgb(0,0,0)');
        */

        // this.game.debug.bodyInfo(this.sprite, 32, 32);
        // this.game.debug.body(this.sprite);

        // this.game.debug.bodyInfo(this.player.playerSprite, 32, 32);
        // this.game.debug.body(this.player.playerSprite);
        
        // this.game.debug.bodyInfo(this.car, 32, 300);
        // this.game.debug.body(this.car);


    }

}

window.onload = () => {

    let game = new SimpleGame();

};
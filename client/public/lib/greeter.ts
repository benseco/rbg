class SimpleGame {

    constructor() {
        //this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update, render: this.render }, false, false);
    }

    game: Phaser.Game;

    map: Phaser.Tilemap;
    layers: Phaser.TilemapLayer[] = [];
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
        //TILED PLUGIN


        this.game.stage.backgroundColor = "#336600";

        this.game.load.tilemap('testmap', '../res/map/testmap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', '../res/map/testset.png');
        this.game.load.image('car', '../res/sprite/car90.png');
        this.game.load.image('space', '../res/img/space.jpg');
        this.game.load.spritesheet('testplayer', '../res/sprite/testplayer.png',16,32);
    }

    create() {
        //TESTING
        this.game.time.advancedTiming = true;
        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        //TESTING


        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.map = this.game.add.tilemap('testmap');

        this.map.addTilesetImage('testset', 'tiles');

        this.layers = [];
        this.layers.push(this.map.createLayer('ground'));

        this.collisionLayer = this.map.createLayer('collision');
        this.map.setCollisionByExclusion([],true,'collision');
        this.layers.push(this.collisionLayer);
        

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

        //Add overhead layers?
        this.layers.push(this.map.createLayer('overhead'));
        this.layers.push(this.map.createLayer('overhead2'));

        //All layers
        for (let l of this.layers)
        {
            l.setScale(2,2);
            l.renderSettings.enableScrollDelta = true;
        }
        this.layers[0].resizeWorld();

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

        for (let obj of SimpleGame.subscribers) if (obj.render) obj.render();

        
        this.game.debug.text(this.game.time.fps.toString(), 32, 32, 'rgb(255,255,255)');
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
class SimpleGame {

    constructor() {
        //this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: this.preload, create: this.create, update: this.update, render: this.render });
    }

    game: Phaser.Game;

    map: Phaser.Tilemap;
    layer: any;

    cursors: Phaser.CursorKeys;
    //sprite: Phaser.Sprite;
    collisionGroup: Phaser.Group;

    car: Phaser.Sprite;

    player: Player;


    preload() {
        //this.game.load.image('ground', '../res/img/test.jpg');

        this.game.load.tilemap('desert', '../res/map/desert.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', '../res/map/tmw_desert_spacing.png');
        this.game.load.image('car', '../res/sprite/car90.png');
    }

    create() {
        //let logo = this.game.add.sprite(0, 0, 'ground');
        //logo.anchor.setTo(0.5, 0.5);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //this.map = this.game.add.tilemap('desert');

        //this.map.addTilesetImage('Desert', 'tiles');

        //this.layer = this.map.createLayer('Ground');

        //this.layer.resizeWorld();

        //Wall objects
        this.car = this.game.add.sprite(100,100,'car');
        this.car.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.car);
        arcb(this.car).collideWorldBounds = true;
        //(this.car.body as Phaser.Physics.Arcade.Body).immovable = true;
        arcb(this.car).moves = false;


        //this.sprite = this.game.add.sprite(450, 80, 'car');
        this.player = new Player(this.game);

        //this.sprite.anchor.setTo(0.5, 0.5);
        //this.game.physics.enable(this.sprite);
        
        //(this.sprite.body as Phaser.Physics.Arcade.Body).collideWorldBounds = true;
        this.collisionGroup = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        this.collisionGroup.addChild(this.car);
        this.collisionGroup.addChild(this.player.playerSprite);

        //this.game.physics.enable(this.sprite);

        //this.game.camera.follow(this.sprite);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.game.input.onDown.addOnce(() => this.map.replace(31,46,undefined,undefined,undefined,undefined));
    }

    update() {
       this.player.update(this.cursors);
        this.game.physics.arcade.collide(this.collisionGroup);


        //(this.sprite.body as Phaser.Physics.Arcade.Body).velocity.set(0,0);
/*
        if (this.cursors.left.isDown)
        {
            this.sprite.angle = 180;
            (this.sprite.body as Phaser.Physics.Arcade.Body).position.add(-5,0);
            //(this.sprite.body as Phaser.Physics.Arcade.Body).velocity.set(-100,0);
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite.angle = 0;
            (this.sprite.body as Phaser.Physics.Arcade.Body).position.add(5,0);
            //(this.sprite.body as Phaser.Physics.Arcade.Body).velocity.set(100,0);
        }

        if (this.cursors.up.isDown)
        {
            this.sprite.angle = 270;
            (this.sprite.body as Phaser.Physics.Arcade.Body).position.add(0,-5);
            //(this.sprite.body as Phaser.Physics.Arcade.Body).velocity.set(0,-100);
        }
        else if (this.cursors.down.isDown)
        {
            this.sprite.angle = 90;
            (this.sprite.body as Phaser.Physics.Arcade.Body).position.add(0,5);
            //(this.sprite.body as Phaser.Physics.Arcade.Body).velocity.set(0,100);
        }

        this.game.physics.arcade.collide(this.sprite,this.car);
*/

    }

    render() {
        /*
        this.game.debug.text('Click to replace tiles', 32, 32, 'rgb(0,0,0)');
        this.game.debug.text('Tile X: ' + this.layer.getTileX(this.sprite.x), 32, 48, 'rgb(0,0,0)');
        this.game.debug.text('Tile Y: ' + this.layer.getTileY(this.sprite.y), 32, 64, 'rgb(0,0,0)');
        */

       // this.game.debug.bodyInfo(this.sprite, 32, 32);
        //this.game.debug.body(this.sprite);

        this.game.debug.bodyInfo(this.player.playerSprite, 32, 32);
        this.game.debug.body(this.player.playerSprite);
        
        this.game.debug.bodyInfo(this.car, 32, 300);
        this.game.debug.body(this.car);


    }

}

window.onload = () => {

    let game = new SimpleGame();

};
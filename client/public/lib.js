function arcb(sprite) { return sprite.body; }
;
var SimpleGame = (function () {
    function SimpleGame() {
        //this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: this.preload, create: this.create, update: this.update, render: this.render }, false, false);
    }
    SimpleGame.prototype.preload = function () {
        //this.game.load.image('ground', '../res/img/test.jpg');
        this.game.stage.backgroundColor = "#336600";
        this.game.load.tilemap('testmap', '../res/map/testmap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', '../res/map/testset.png');
        this.game.load.image('car', '../res/sprite/car90.png');
        this.game.load.image('space', '../res/img/space.jpg');
    };
    SimpleGame.prototype.create = function () {
        var _this = this;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.map = this.game.add.tilemap('testmap');
        this.map.addTilesetImage('testset', 'tiles');
        this.layer = this.map.createLayer('ground');
        this.collisionLayer = this.map.createLayer('collision');
        this.collisionLayer.setScale(2, 2);
        this.map.setCollisionByExclusion([], true, 'collision');
        this.layer.setScale(2, 2);
        this.layer.resizeWorld();
        //Wall objects
        this.car = this.game.add.sprite(16, 16, 'car');
        this.car.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.car);
        arcb(this.car).collideWorldBounds = true;
        //(this.car.body as Phaser.Physics.Arcade.Body).immovable = true;
        //arcb(this.car).moves = false;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.player = new Player(this.game, this.cursors);
        this.collisionGroup = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        this.collisionGroup.add(this.car);
        this.collisionGroup.add(this.player.playerSprite);
        this.game.camera.follow(this.player.playerSprite);
        this.game.input.onDown.addOnce(function () { return _this.map.replace(31, 46, undefined, undefined, undefined, undefined); });
        //Add overhead layers?
        this.map.createLayer('overhead').setScale(2, 2);
        this.map.createLayer('overhead2').setScale(2, 2);
    };
    SimpleGame.prototype.update = function () {
        for (var _i = 0, _a = SimpleGame.subscribers; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.update)
                obj.update();
        }
        /*
        Ben's Note: We can't be calling this in update.
        if(this.game.width != window.innerWidth && this.game.height != window.innerHeight){
            this.resizeTimer && clearTimeout(this.resizeTimer); //still unsure how to make the clearTimeout work
            this.resizeTimer = setTimeout(SimpleGame.resizeGameAndLayer(this), 3000);
        }
        */
        this.game.physics.arcade.collide(this.collisionGroup);
        this.game.physics.arcade.collide(this.player.playerSprite, this.collisionLayer);
    };
    SimpleGame.resizeGameAndLayer = function (s) {
        s.game.scale.setGameSize(window.innerWidth, window.innerHeight);
        s.layer.resize(s.game.width, s.game.height);
        console.log("The game has just been resized to: " + s.game.width + " x " + s.game.height);
        // clearTimeout(s.resizeTimer);
        // console.log(s.resizeTimer);
    };
    SimpleGame.prototype.render = function () {
        for (var _i = 0, _a = SimpleGame.subscribers; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.render)
                obj.render();
        }
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
    };
    SimpleGame.subscribers = [];
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
/**
 * Player file
 */
var Player = (function () {
    function Player(game, cursors) {
        this.playerSprite = new Phaser.Sprite(game, 450, 80, 'car');
        this.playerSprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.playerSprite);
        arcb(this.playerSprite).collideWorldBounds = true;
        this.cursors = cursors;
        SimpleGame.subscribers.push(this);
    }
    Player.prototype.update = function () {
        if (this.cursors.left.isDown) {
            this.playerSprite.angle = 180;
            arcb(this.playerSprite).position.add(-5, 0);
        }
        else if (this.cursors.right.isDown) {
            this.playerSprite.angle = 0;
            arcb(this.playerSprite).position.add(5, 0);
        }
        if (this.cursors.up.isDown) {
            this.playerSprite.angle = 270;
            arcb(this.playerSprite).position.add(0, -5);
        }
        else if (this.cursors.down.isDown) {
            this.playerSprite.angle = 90;
            arcb(this.playerSprite).position.add(0, 5);
        }
    };
    return Player;
}());

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseActor = (function () {
    function BaseActor(state, priority) {
        if (priority === void 0) { priority = 0; }
        G.preload.add(this.Preload, this);
        G.create.add(this.Create, this);
        G.update.add(this.Update, this);
        G.render.add(this.Render, this);
        G.shutdown.add(this.Shutdown, this);
    }
    BaseActor.prototype.setMainSprite = function (sprite, collides) {
        if (collides === void 0) { collides = true; }
        this.mainSprite = sprite;
        arcb(this.mainSprite).collideWorldBounds = true;
    };
    BaseActor.prototype.destroy = function () {
        G.preload.remove(this.Preload, this);
        G.create.remove(this.Create, this);
        G.update.remove(this.Update, this);
        G.render.remove(this.Render, this);
        G.shutdown.remove(this.Shutdown, this);
        this.mainSprite = undefined;
        this.battleSprite = undefined;
    };
    return BaseActor;
}());
var BaseState = (function (_super) {
    __extends(BaseState, _super);
    function BaseState() {
        _super.call(this);
        G.preload.add(this.Preload, this);
        G.create.add(this.Create, this, 1);
        G.update.add(this.Update, this);
        G.render.add(this.Render, this);
        G.shutdown.add(this.Shutdown, this);
    }
    BaseState.prototype.init = function () {
        G.init.dispatch();
    };
    BaseState.prototype.preload = function () {
        G.preload.dispatch();
    };
    BaseState.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        G.mainCollision = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        G.mainCollision.z = 100;
        G.friendlyFireCollision = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        G.friendlyFireCollision.z = 200;
        // this.friendlyFire = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        // this.friendlyFire.z = 200;
        // this.enemyFire = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        // this.enemyFire.z = 201;
        //ADD UNNIVERSAL CODE HERE
        this.game.stage.backgroundColor = "#336600";
        this.game.time.advancedTiming = true;
        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        //END OF UNIVERSAL CODE
        G.create.dispatch();
        this.world.sort();
    };
    BaseState.prototype.update = function () {
        G.update.dispatch();
        this.game.physics.arcade.collide(G.mainCollision, G.layerCollision);
        this.game.physics.arcade.collide(G.mainCollision);
        this.game.physics.arcade.collide(G.friendlyFireCollision, G.layerCollision, this.onCollide);
        //this.game.physics.arcade.collide(this.friendlyFire);
        // this.mainCollision.sort('y',Phaser.Group.SORT_ASCENDING);
        // this.friendlyFire.sort('y',Phaser.Group.SORT_ASCENDING);
        // this.enemyFire.sort('y',Phaser.Group.SORT_ASCENDING);
    };
    BaseState.prototype.render = function () {
        G.render.dispatch();
        //ADD UNNIVERSAL CODE HERE
        this.game.debug.text(this.game.time.fps.toString(), 32, 32, 'rgb(255,255,255)');
        //END OF UNIVERSALE CODE
    };
    BaseState.prototype.shutdown = function () {
        G.shutdown.dispatch();
    };
    BaseState.prototype.onCollide = function (sprite, maptile) {
        arcb(sprite).onCollide.dispatch();
    };
    return BaseState;
}(Phaser.State));
/// <reference path="../base/BaseActor.ts" />
var BasicEnemy = (function (_super) {
    __extends(BasicEnemy, _super);
    function BasicEnemy() {
        _super.apply(this, arguments);
    }
    BasicEnemy.prototype.Preload = function () {
        G.game.load.spritesheet('basicenemy', '../res/sprite/testplayer.png', 16, 25);
    };
    BasicEnemy.prototype.Create = function () {
        var sprite = G.getSprite('basicenemy', 200, 80);
        sprite.anchor.setTo(0.5, 0.5);
        G.game.physics.enable(sprite);
        arcb(sprite).collideWorldBounds = true;
        arcb(sprite).setSize(16, 16, 0, 16);
        sprite.animations.add('leftright', [2, 3], 5, true);
        sprite.animations.add('idlefront', [0]);
        sprite.animations.add('idleback', [1]);
        sprite.animations.add('forward', [4, 5], 5, true);
        sprite.animations.add('backward', [6, 7], 5, true);
        this.setMainSprite(sprite);
        // G.game.camera.follow(this.mainSprite);
        //Temporary hack
        G.mainCollision.add(sprite);
    };
    BasicEnemy.prototype.Update = function () {
        this.mainSprite.scale.setTo(2, 2);
        arcb(this.mainSprite).velocity.set(0, 0);
        G.game.physics.arcade.moveToObject(this.mainSprite, this.player.mainSprite, 50);
        if (Math.random() > 0.8) {
            if (Math.random() > 0.8) {
                //this.playerSprite.angle = 180;
                //arcb(this.playerSprite).position.add(-5,0);
                arcb(this.mainSprite).velocity.add(-50, 0);
                this.mainSprite.scale.setTo(-2, 2);
                this.mainSprite.animations.play('leftright');
            }
            else if (Math.random() <= 0.3) {
                //this.playerSprite.angle = 0;
                //arcb(this.playerSprite).position.add(5,0);
                arcb(this.mainSprite).velocity.add(50, 0);
                this.mainSprite.animations.play('leftright');
            }
            if (Math.random() > 0.8) {
                //this.playerSprite.angle = 270;
                //arcb(this.playerSprite).position.add(0,-5);
                arcb(this.mainSprite).velocity.add(0, -50);
                this.mainSprite.animations.play('backward');
            }
            else if (Math.random() <= 0.3) {
                //this.playerSprite.angle = 90;
                //arcb(this.playerSprite).position.add(0,5);
                arcb(this.mainSprite).velocity.add(0, 50);
                this.mainSprite.animations.play('forward');
            }
        }
        else {
            this.mainSprite.animations.play('idlefront');
        }
        // arcb(this.mainSprite).velocity.normalize().multiply(200,200);
    };
    BasicEnemy.prototype.Render = function () {
    };
    BasicEnemy.prototype.Shutdown = function () {
    };
    return BasicEnemy;
}(BaseActor));
//DEPRECATED
var SimpleGame = (function () {
    function SimpleGame() {
        //this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        //this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update, render: this.render }, false, false);
        //this.player = new Player(this);
    }
    SimpleGame.prototype.preload = function () {
    };
    SimpleGame.prototype.create = function () {
    };
    SimpleGame.prototype.update = function () {
        /*
        Ben's Note: This isn't the right way to do this.
        if(this.game.width != window.innerWidth && this.game.height != window.innerHeight){
            this.resizeTimer && clearTimeout(this.resizeTimer); //still unsure how to make the clearTimeout work
            this.resizeTimer = setTimeout(SimpleGame.resizeGameAndLayer(this), 3000);
        }
        */
    };
    /*
    static resizeGameAndLayer(s: SimpleGame){
        s.game.scale.setGameSize(window.innerWidth, window.innerHeight);
        s.layer.resize(s.game.width, s.game.height);
        console.log("The game has just been resized to: " + s.game.width + " x " + s.game.height);
        // clearTimeout(s.resizeTimer);
        // console.log(s.resizeTimer);
    }
    */
    SimpleGame.prototype.render = function () {
    };
    return SimpleGame;
}());
/// <reference path="../base/BaseState.ts" />
var Level1 = (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        _super.apply(this, arguments);
    }
    Level1.prototype.Preload = function () {
    };
    Level1.prototype.Create = function () {
    };
    Level1.prototype.Update = function () {
    };
    Level1.prototype.Render = function () {
    };
    Level1.prototype.Shutdown = function () {
    };
    return Level1;
}(BaseState));
/// <reference path="../base/BaseState.ts" />
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.layers = [];
        this.player = new Player(this);
        var basicEnemy = new BasicEnemy(this);
        basicEnemy.player = this.player;
    }
    Main.prototype.Preload = function () {
        this.game.load.tilemap('testmap', '../res/map/testmap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', '../res/map/testset.png');
        this.game.load.image('car', '../res/sprite/car90.png');
    };
    Main.prototype.Create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.map = this.game.add.tilemap('testmap');
        this.map.addTilesetImage('testset', 'tiles');
        this.layers = [];
        this.layers.push(this.map.createLayer('ground'));
        G.layerCollision = this.map.createLayer('collision');
        this.map.setCollisionByExclusion([], true, 'collision');
        this.layers.push(G.layerCollision);
        //Wall objects
        //this.car = this.game.add.sprite(16,16,'car');
        //this.car.anchor.setTo(0.5, 0.5);
        //this.game.physics.enable(this.car);
        //arcb(this.car).collideWorldBounds = true;
        //arcb(this.car).immovable = true;
        //arcb(this.car).moves = false;
        //Add overhead layers?
        var ol1 = this.map.createLayer('overhead');
        ol1.z = 1000;
        this.layers.push(ol1);
        var ol2 = this.map.createLayer('overhead2');
        ol2.z = 2000;
        this.layers.push(ol2);
        //All layers
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var l = _a[_i];
            l.setScale(2, 2);
            l.renderSettings.enableScrollDelta = true;
        }
        this.layers[0].resizeWorld();
    };
    Main.prototype.Update = function () {
    };
    Main.prototype.Render = function () {
    };
    Main.prototype.Shutdown = function () {
    };
    return Main;
}(BaseState));
function arcb(sprite) { return sprite.body; }
;
function tml(l) { return l; }
;
/// <reference path="./base/BaseActor.ts" />
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.apply(this, arguments);
    }
    Player.prototype.Preload = function () {
        G.game.load.spritesheet('testplayer', '../res/sprite/testplayer.png', 16, 32);
    };
    Player.prototype.Create = function () {
        var sprite = G.getSprite('testplayer', 450, 80);
        sprite.anchor.setTo(0.5, 0.5);
        G.game.physics.enable(sprite);
        arcb(sprite).collideWorldBounds = true;
        arcb(sprite).setSize(16, 16, 0, 16);
        this.cursors = G.game.input.keyboard.createCursorKeys();
        sprite.animations.add('leftright', [2, 3], 5, true);
        sprite.animations.add('idlefront', [0]);
        sprite.animations.add('idleback', [1]);
        sprite.animations.add('forward', [4, 5], 5, true);
        sprite.animations.add('backward', [6, 7], 5, true);
        this.setMainSprite(sprite);
        G.game.camera.follow(this.mainSprite);
        //Temporary hack
        G.mainCollision.add(sprite);
        this.isShooting = false;
    };
    Player.prototype.Update = function () {
        this.mainSprite.scale.setTo(2, 2);
        arcb(this.mainSprite).velocity.set(0, 0);
        if (G.game.input.keyboard.isDown(Phaser.Keyboard.S) || G.game.input.keyboard.isDown(Phaser.Keyboard.W) ||
            G.game.input.keyboard.isDown(Phaser.Keyboard.A) || G.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            if (G.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                //this.playerSprite.angle = 180;
                //arcb(this.playerSprite).position.add(-5,0);
                arcb(this.mainSprite).velocity.add(-100, 0);
                this.mainSprite.scale.setTo(-2, 2);
                this.mainSprite.animations.play('leftright');
            }
            else if (G.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                //this.playerSprite.angle = 0;
                //arcb(this.playerSprite).position.add(5,0);
                arcb(this.mainSprite).velocity.add(100, 0);
                this.mainSprite.animations.play('leftright');
            }
            if (G.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                //this.playerSprite.angle = 270;
                //arcb(this.playerSprite).position.add(0,-5);
                arcb(this.mainSprite).velocity.add(0, -100);
                if (!G.game.input.keyboard.isDown(Phaser.Keyboard.D) && !G.game.input.keyboard.isDown(Phaser.Keyboard.A))
                    this.mainSprite.animations.play('backward');
            }
            else if (G.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                //this.playerSprite.angle = 90;
                //arcb(this.playerSprite).position.add(0,5);
                arcb(this.mainSprite).velocity.add(0, 100);
                if (!G.game.input.keyboard.isDown(Phaser.Keyboard.D) && !G.game.input.keyboard.isDown(Phaser.Keyboard.A))
                    this.mainSprite.animations.play('forward');
            }
        }
        else {
            this.mainSprite.animations.play('idlefront');
        }
        if (G.game.input.activePointer.leftButton.isDown) {
            if (!this.isShooting) {
                new Bullet(this.mainSprite.x, this.mainSprite.y);
                this.isShooting = true;
            }
        }
        else {
            this.isShooting = false;
        }
        arcb(this.mainSprite).velocity.normalize().multiply(200, 200);
    };
    Player.prototype.Render = function () {
    };
    Player.prototype.Shutdown = function () {
    };
    return Player;
}(BaseActor));
/// <reference path="../base/BaseActor.ts" />
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y) {
        _super.call(this, null);
        this.x = x;
        this.y = y;
        this.Preload();
        this.Create();
    }
    Bullet.prototype.Preload = function () {
        // G.game.load.spritesheet('bullets', '../../res/sprite/testplayer.png',2,2);
    };
    Bullet.prototype.Create = function () {
        var sprite = G.getSprite('basicenemy', this.x, this.y);
        sprite.anchor.setTo(0.5, 0.5);
        G.game.physics.enable(sprite);
        arcb(sprite).collideWorldBounds = true;
        arcb(sprite).setSize(2, 2, 0, 2);
        // sprite.animations.add('leftright',[2,3],5,true);
        // sprite.animations.add('idlefront',[0]);
        // sprite.animations.add('idleback',[1]);
        // sprite.animations.add('forward',[4,5],5,true);
        // sprite.animations.add('backward',[6,7],5,true);
        this.setMainSprite(sprite);
        this.mainSprite.scale.setTo(2, 2);
        // arcb(this.mainSprite).velocity.set(this.x1 - this.x0, this.y1 - this.y0);
        G.game.physics.arcade.moveToPointer(this.mainSprite, 400);
        // arcb(this.mainSprite).velocity.normalize().multiply(400,400);
        //Temporary hack
        G.friendlyFireCollision.add(sprite);
        // G.mainCollision.add(sprite);
        //blocked: potential bug with collideSpriteVsTilemapLayer()
        this.mainSprite.body.onCollide = new Phaser.Signal();
        this.mainSprite.body.onCollide.add(this.onCollide, this);
    };
    Bullet.prototype.onCollide = function () {
        G.killSprite(this.mainSprite);
        this.destroy();
    };
    Bullet.prototype.Update = function () {
        // G.game.physics.arcade.moveToObject(this.mainSprite, this.player.mainSprite, 100)
        // if (Math.random() > 0.8)
        // {
        //     if (Math.random() > 0.8)
        //     {
        //         //this.playerSprite.angle = 180;
        //         //arcb(this.playerSprite).position.add(-5,0);
        //         arcb(this.mainSprite).velocity.add(-50,0);
        //         this.mainSprite.scale.setTo(-2,2);
        //         this.mainSprite.animations.play('leftright');
        //     }
        //     else if (Math.random() <= 0.3)
        //     {
        //         //this.playerSprite.angle = 0;
        //         //arcb(this.playerSprite).position.add(5,0);
        //         arcb(this.mainSprite).velocity.add(50,0);
        //         this.mainSprite.animations.play('leftright');
        //     }
        //     if (Math.random() > 0.8)
        //     {
        //         //this.playerSprite.angle = 270;
        //         //arcb(this.playerSprite).position.add(0,-5);
        //         arcb(this.mainSprite).velocity.add(0,-50);
        //         this.mainSprite.animations.play('backward');
        //     }
        //     else if (Math.random() <= 0.3)
        //     {
        //         //this.playerSprite.angle = 90;
        //         //arcb(this.playerSprite).position.add(0,5);
        //         arcb(this.mainSprite).velocity.add(0,50);
        //         this.mainSprite.animations.play('forward');
        //     }
        // }
        // else
        // {
        //     this.mainSprite.animations.play('idlefront');
        // }
        // arcb(this.mainSprite).velocity.normalize().multiply(200,200);
    };
    Bullet.prototype.Render = function () {
    };
    Bullet.prototype.Shutdown = function () {
    };
    return Bullet;
}(BaseActor));
var Genesis = (function () {
    function Genesis() {
        throw new Error("CANNOT INSTANTIATE STATIC CLASS");
    }
    Genesis.begin = function (game) {
        Genesis.game = game;
        Genesis.init = new Phaser.Signal();
        Genesis.preload = new Phaser.Signal();
        Genesis.create = new Phaser.Signal();
        Genesis.update = new Phaser.Signal();
        Genesis.render = new Phaser.Signal();
        Genesis.shutdown = new Phaser.Signal();
        Genesis.recyclables = {};
    };
    Genesis.getSprite = function (key, x, y) {
        var sprite;
        var sprites = Genesis.recyclables[key];
        if (sprites && sprites.length > 0) {
            sprite = sprites.pop();
            sprite.x = x || 0;
            sprite.y = y || 0;
            sprite.revive();
        }
        else {
            sprite = Genesis.game.add.sprite(x, y, key);
        }
        return sprite;
    };
    Genesis.killSprite = function (sprite) {
        if (sprite) {
            sprite.kill();
            if (!Genesis.recyclables[sprite.key]) {
                Genesis.recyclables[sprite.key] = [];
            }
            Genesis.recyclables[sprite.key].push(sprite);
        }
    };
    return Genesis;
}());
var G = Genesis;
//# sourceMappingURL=lib.js.map
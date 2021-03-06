/*
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

var user = new Student("Jane", "M.", "Qser");

document.body.innerHTML = greeter(user);
*/
var SimpleGame = (function () {
    function SimpleGame() {
        //this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: this.preload, create: this.create, update: this.update, render: this.render });
    }
    SimpleGame.prototype.preload = function () {
        //this.game.load.image('ground', '../res/img/test.jpg');
        this.game.load.tilemap('desert', '../res/map/desert.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', '../res/map/tmw_desert_spacing.png');
        this.game.load.image('car', '../res/sprite/car90.png');
    };
    SimpleGame.prototype.create = function () {
        //let logo = this.game.add.sprite(0, 0, 'ground');
        //logo.anchor.setTo(0.5, 0.5);
        var _this = this;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.map = this.game.add.tilemap('desert');
        this.map.addTilesetImage('Desert', 'tiles');
        this.layer = this.map.createLayer('Ground');
        this.layer.resizeWorld();
        this.sprite = this.game.add.sprite(450, 80, 'car');
        this.sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.sprite);
        this.game.camera.follow(this.sprite);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.onDown.addOnce(function () { return _this.map.replace(31, 46); });
    };
    SimpleGame.prototype.update = function () {
        /*
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.sprite.body.angularVelocity = 0;

        if (this.cursors.left.isDown)
        {
            this.sprite.body.angularVelocity = -200;
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite.body.angularVelocity = 200;
        }

        if (this.cursors.up.isDown)
        {
            this.sprite.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.sprite.angle, 300));
        }
        */
        if (this.cursors.left.isDown) {
            this.sprite.angle = 180;
            this.sprite.x -= 5;
        }
        else if (this.cursors.right.isDown) {
            this.sprite.angle = 0;
            this.sprite.x += 5;
        }
        if (this.cursors.up.isDown) {
            this.sprite.angle = 270;
            this.sprite.y -= 5;
        }
        else if (this.cursors.down.isDown) {
            this.sprite.angle = 90;
            this.sprite.y += 5;
        }
    };
    SimpleGame.prototype.render = function () {
        this.game.debug.text('Click to replace tiles', 32, 32, 'rgb(0,0,0)');
        this.game.debug.text('Tile X: ' + this.layer.getTileX(this.sprite.x), 32, 48, 'rgb(0,0,0)');
        this.game.debug.text('Tile Y: ' + this.layer.getTileY(this.sprite.y), 32, 64, 'rgb(0,0,0)');
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=greeter.js.map
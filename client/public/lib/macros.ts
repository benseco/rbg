
//function arcb(sprite: Phaser.Sprite): Phaser.Physics.Arcade.Body { return sprite.body as Phaser.Physics.Arcade.Body };

function b2d(sprite: Phaser.Sprite): Phaser.Physics.Box2D.Body { return sprite.body as Phaser.Physics.Box2D.Body };

function tml(l: any): Phaser.TilemapLayer { return l as Phaser.TilemapLayer };
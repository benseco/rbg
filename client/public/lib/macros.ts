
//function arcb(sprite: Phaser.Sprite): Phaser.Physics.Arcade.Body { return sprite.body as Phaser.Physics.Arcade.Body };

function b2d(sprite: Phaser.Sprite): Phaser.Physics.Box2D.Body { return sprite.body as Phaser.Physics.Box2D.Body };

function tml(l: any): Phaser.TilemapLayer { return l as Phaser.TilemapLayer };

function encase(body: Phaser.Physics.Box2D.Body, shell: any) { (body as any).shell = shell };

function shell(body: Phaser.Physics.Box2D.Body): any { return (body as any).shell; }
class Genesis
{

    constructor() { throw new Error("CANNOT INSTANTIATE STATIC CLASS"); }

    static game: Phaser.Game;
    static init: Phaser.Signal;
    static preload: Phaser.Signal;
    static create: Phaser.Signal;
    static update: Phaser.Signal;
    static render: Phaser.Signal;
    static shutdown: Phaser.Signal;

    static begin(game: Phaser.Game) 
    {
        Genesis.game = game;
        Genesis.init = new Phaser.Signal();
        Genesis.preload = new Phaser.Signal();
        Genesis.create = new Phaser.Signal();
        Genesis.update = new Phaser.Signal();
        Genesis.render = new Phaser.Signal();
        Genesis.shutdown = new Phaser.Signal();

    }

    // TEMPORARY
    static mainCollision: Phaser.Group;
    static layerCollision: Phaser.TilemapLayer;


}

var G = Genesis;
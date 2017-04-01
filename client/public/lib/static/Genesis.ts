class Genesis
{

    constructor() { throw new Error("CANNOT INSTANTIATE STATIC CLASS GENESIS"); }

    static game: Phaser.Game;
    static init: Phaser.Signal;
    static preload: Phaser.Signal;
    static create: Phaser.Signal;
    static pauseUpdate: Phaser.Signal;
    static update: Phaser.Signal;
    static render: Phaser.Signal;
    static shutdown: Phaser.Signal;

    static player: Player;

    static begin(game: Phaser.Game) 
    {
        Genesis.game = game;
        Genesis.init = new Phaser.Signal();
        Genesis.preload = new Phaser.Signal();
        Genesis.create = new Phaser.Signal();
        Genesis.pauseUpdate = new Phaser.Signal();
        Genesis.update = new Phaser.Signal();
        Genesis.render = new Phaser.Signal();
        Genesis.shutdown = new Phaser.Signal();

        Genesis.recyclables = {};
        
        this.player = new Player();

    }

    private static recyclables: { [key: string]: Array<Phaser.Sprite>; };
    static getSprite(key?: string, x?: number, y?: number): Phaser.Sprite
    {
        let sprite: Phaser.Sprite;
        let sprites = Genesis.recyclables[key];
        if (sprites && sprites.length > 0)
        {
            sprite = sprites.pop();
            sprite.x = x || 0;
            sprite.y = y || 0;
            sprite.revive();
        }
        else
        {
            sprite = Genesis.game.add.sprite(x, y, key);
        }
        return sprite;
    }

    static killSprite(sprite: Phaser.Sprite)
    {
        if (sprite)
        {
            sprite.kill();
            if (!Genesis.recyclables[sprite.key as string]) 
            {
                Genesis.recyclables[sprite.key as string] = [];
            }
            Genesis.recyclables[sprite.key as string].push(sprite);
        }
    }

    //TEMPORARY
    static layerCollision: Phaser.TilemapLayer;

    static nearestInteractable: BaseInteracts;

}

var G = Genesis;
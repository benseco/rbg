abstract class BaseActor {

    mainSprite: Phaser.Sprite;
    battleSprite: Phaser.Sprite;

    constructor(state: BaseState, priority: number = 0)
    {

        G.preload.add(this.Preload, this);
        G.create.add(this.Create, this);
        G.update.add(this.Update, this);
        G.render.add(this.Render, this);
        G.shutdown.add(this.Shutdown, this);
    }

    abstract Preload(): void;
    abstract Create(): void;
    abstract Update(): void;
    abstract Render(): void;
    abstract Shutdown(): void;

    setMainSprite(sprite: Phaser.Sprite, collides = true) {
        this.mainSprite = sprite;
        arcb(this.mainSprite).collideWorldBounds = true;
    }

}
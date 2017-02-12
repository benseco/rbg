abstract class BaseActor {

    mainSprite: Phaser.Sprite;
    battleSprite: Phaser.Sprite;

    constructor()
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
        p2b(this.mainSprite).collideWorldBounds = true;
    }

    destroy()
    {
        G.preload.remove(this.Preload, this);
        G.create.remove(this.Create, this);
        G.update.remove(this.Update, this);
        G.render.remove(this.Render, this);
        G.shutdown.remove(this.Shutdown, this);
        this.mainSprite = undefined;
        this.battleSprite = undefined;
    }

    /*
    drag()
    {
        let drag = (new Phaser.Point()).copyFrom(arcb(this.mainSprite).velocity).multiply(10,10);
        arcb(this.mainSprite).velocity.x -= drag.x * G.game.time.physicsElapsed;
        arcb(this.mainSprite).velocity.y -= drag.y * G.game.time.physicsElapsed;
    }
    */

}
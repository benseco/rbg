abstract class BaseActor {

    mainSprite: Phaser.Sprite;
    battleSprite: Phaser.Sprite;
    hitPoints: number;

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
        b2d(this.mainSprite).collideWorldBounds = true;
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

    thrustDirectional(power: number, x: number, y: number)
    {
        let body = b2d(this.mainSprite);
        let magnitude = body.world.pxm(power) * body.data.GetMass();
        
        let force = new box2d.b2Vec2();
        body.toWorldVector(force,
                        (new box2d.b2Vec2(x,y))
                        .SelfNormalize()
                        .SelfMul(body.world.pxm(power) * body.data.GetMass()));
        
        body.data.ApplyForce( force, body.data.GetWorldCenter(), true );

    }

}
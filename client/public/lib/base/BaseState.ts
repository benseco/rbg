abstract class BaseState extends Phaser.State
{
    collisionLayer: Phaser.TilemapLayer;

    constructor() {
        super();

        G.preload.add(this.Preload, this);
        G.create.add(this.Create, this, 1);
        G.update.add(this.Update, this);
        G.render.add(this.Render, this);
        G.shutdown.add(this.Shutdown, this);

    }

    abstract Preload(): void;
    abstract Create(): void;
    abstract Update(): void;
    abstract Render(): void;
    abstract Shutdown(): void;

    init() {
        G.init.dispatch();
    }

    preload() {
        G.preload.dispatch();
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.BOX2D);

        //ADD UNNIVERSAL CODE HERE
        this.game.stage.backgroundColor = "#dddddd";

        //this.game.time.advancedTiming = true;
        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.clearBeforeRender = false;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        //END OF UNIVERSAL CODE

        G.create.dispatch();

        this.world.sort();
    }

    update() {
        G.update.dispatch();        
        G.game.world.sort('y',Phaser.Group.SORT_ASCENDING);
    }

    render() {
        G.render.dispatch();

        //ADD UNNIVERSAL CODE H
        //(this.game.debug as any).box2dWorld();
        //this.game.debug.text(this.game.time.fps.toString(), 32, 32, 'rgb(255,255,255)');
        //END OF UNIVERSALE CODE
        
    }

    shutdown() {
        G.shutdown.dispatch();
    }

    pauseUpdate()
    {
        G.pauseUpdate.dispatch();
    }

}
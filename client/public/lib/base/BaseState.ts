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
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        //this.game.physics.p2.setImpactEvents(true);

        this.game.physics.p2.world.defaultContactMaterial.restitution = 0;
        this.game.physics.p2.world.setGlobalStiffness(1e7);
        this.game.physics.p2.world.setGlobalRelaxation(3);


        G.physicCollision = this.game.physics.p2.createCollisionGroup();
        G.enemyHitboxes = this.game.physics.p2.createCollisionGroup();
        G.enemyFire = this.game.physics.p2.createCollisionGroup();
        G.allyHitboxes = this.game.physics.p2.createCollisionGroup();
        G.allyFire = this.game.physics.p2.createCollisionGroup();

        this.game.physics.p2.updateBoundsCollisionGroup();
        // G.enemyHitboxes.z = 0; 
        // G.allyHitboxes.z = 1; 
        // G.physicCollision.z = 2; 
        // G.allyFire.z = 3; 
        // G.enemyFire.z = 4;

        //ADD UNNIVERSAL CODE HERE
        this.game.stage.backgroundColor = "#dddddd";

        //this.game.time.advancedTiming = true;
        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.clearBeforeRender = false;
        //Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        //END OF UNIVERSAL CODE

        G.create.dispatch();

        this.world.sort();
    }

    update() {
        G.update.dispatch();

        //this.game.physics.arcade.collide(G.physicCollision);
        //this.game.physics.arcade.collide(G.enemyHitboxes, G.allyFire);
        //this.game.physics.arcade.collide(G.allyHitboxes, G.enemyFire);
        
        G.game.world.sort('y',Phaser.Group.SORT_ASCENDING);
    }

    render() {
        G.render.dispatch();

        //ADD UNNIVERSAL CODE HERE
        //this.game.debug.text(this.game.time.fps.toString(), 32, 32, 'rgb(255,255,255)');
        //END OF UNIVERSALE CODE
        
    }

    shutdown() {
        G.shutdown.dispatch();
    }

}
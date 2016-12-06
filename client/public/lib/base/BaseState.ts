abstract class BaseState extends Phaser.State
{
    mainCollision: Phaser.Group;
    friendlyFire: Phaser.Group;
    enemyFire: Phaser.Group;
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
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        G.mainCollision = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        G.mainCollision.z = 100;
        // this.friendlyFire = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        // this.friendlyFire.z = 200;
        // this.enemyFire = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        // this.enemyFire.z = 201;

        //ADD UNNIVERSAL CODE HERE
        this.game.stage.backgroundColor = "#336600";

        this.game.time.advancedTiming = true;
        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        //END OF UNIVERSAL CODE

        G.create.dispatch();

        this.world.sort();
    }

    update() {
        G.update.dispatch();

        this.game.physics.arcade.collide(G.mainCollision, G.layerCollision)
        this.game.physics.arcade.collide(G.mainCollision);
        //this.game.physics.arcade.collide(this.friendlyFire);

        // this.mainCollision.sort('y',Phaser.Group.SORT_ASCENDING);
        // this.friendlyFire.sort('y',Phaser.Group.SORT_ASCENDING);
        // this.enemyFire.sort('y',Phaser.Group.SORT_ASCENDING);
        
    }

    render() {
        G.render.dispatch();

        //ADD UNNIVERSAL CODE HERE
        this.game.debug.text(this.game.time.fps.toString(), 32, 32, 'rgb(255,255,255)');
        //END OF UNIVERSALE CODE
        
    }

    shutdown() {
        G.shutdown.dispatch();
    }
}
abstract class BaseState extends Phaser.State
{
    subscribers: BaseActor[] = [];
    mainCollision: Phaser.Group;
    friendlyFire: Phaser.Group;
    enemyFire: Phaser.Group;
    collisionLayer: Phaser.TilemapLayer;

    constructor() {
        super();
    }

    abstract Preload(): void;
    abstract Create(): void;
    abstract Update(): void;
    abstract Render(): void;
    abstract Shutdown(): void;

    init() {
        for (let s of this.subscribers) s.init(this.game);
    }

    preload() {
        for (let s of this.subscribers) s.preload();

        this.Preload();
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.mainCollision = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        this.mainCollision.z = 100;
        this.friendlyFire = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        this.friendlyFire.z = 200;
        this.enemyFire = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        this.enemyFire.z = 201;

        for (let s of this.subscribers) {
            s.create();
            if (s.mainSprite) this.mainCollision.add(s.mainSprite);
        }

        //ADD UNNIVERSAL CODE HERE
        this.game.stage.backgroundColor = "#336600";

        this.game.time.advancedTiming = true;
        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        //END OF UNIVERSAL CODE

        this.Create();
        this.world.sort();
    }

    update() {
        for (let s of this.subscribers) s.update();

        this.Update();
        this.game.physics.arcade.collide(this.mainCollision, this.collisionLayer)
        this.game.physics.arcade.collide(this.mainCollision);
        this.game.physics.arcade.collide(this.friendlyFire);

        this.mainCollision.sort('y',Phaser.Group.SORT_ASCENDING);
        this.friendlyFire.sort('y',Phaser.Group.SORT_ASCENDING);
        this.enemyFire.sort('y',Phaser.Group.SORT_ASCENDING);
    }

    render() {
        for (let s of this.subscribers) s.render();

        //ADD UNNIVERSAL CODE HERE
        this.game.debug.text(this.game.time.fps.toString(), 32, 32, 'rgb(255,255,255)');
        //END OF UNIVERSALE CODE

        this.Render();
    }

    shutdown() {
        for (let s of this.subscribers) s.shutdown();

        this.Shutdown();
    }
}
abstract class BaseState extends Phaser.State
{
    subscribers: BaseActor[] = [];

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
        for (let s of this.subscribers) s.create();

        //ADD UNNIVERSAL CODE HERE
        this.game.stage.backgroundColor = "#336600";

        this.game.time.advancedTiming = true;
        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        //END OF UNIVERSALE CODE

        this.Create();
    }

    update() {
        for (let s of this.subscribers) s.update();

        this.Update();
    }

    render() {
        for (let s of this.subscribers) s.render();

        this.Render();
    }

    shutdown() {
        for (let s of this.subscribers) s.shutdown();
        
        //ADD UNNIVERSAL CODE HERE
        this.game.debug.text(this.game.time.fps.toString(), 32, 32, 'rgb(255,255,255)');
        //END OF UNIVERSALE CODE

        this.Shutdown();
    }
}
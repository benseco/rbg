abstract class BaseActor {

    game: Phaser.Game;

    constructor(state: BaseState, subscribes = true)
    {
        if (subscribes) state.subscribers.push(this);
    }

    abstract Preload(): void;
    abstract Create(): void;
    abstract Update(): void;
    abstract Render(): void;
    abstract Shutdown(): void;

    init(game: Phaser.Game) {
        this.game = game;
    }

    preload() {

        this.Preload();
    }

    create() {

        this.Create();
    }

    update() {

        this.Update();
    }

    render() {

        this.Render();
    }

    shutdown() {
        
        this.Shutdown();
    }

}
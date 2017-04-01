class Dialogue
{

    times: number = 0;
    sprite: Phaser.Sprite;

    // Temporary isAdvancing flag
    isAdvancing: boolean = false;

    constructor(key?: string) 
    {

        G.game.paused = true;

        this.sprite = G.getSprite('testplayer', 0, 0);
        this.sprite.fixedToCamera = true;
        

        this.times = 0;
        
        G.pauseUpdate.add(this.PauseUpdate, this);
    }

    PauseUpdate()
    {
        if (G.game.input.keyboard.isDown(Phaser.Keyboard.E))
        {
            // Temporary isAdvancing flag
            if (!this.isAdvancing)
            {
                this.times++;

                if (this.times > 5)
                {
                    this.end();
                }

                // Temporary isAdvancing flag
                this.isAdvancing = true;

            }
        }
        else this.isAdvancing = false; // Temporary isAdvancing flag
    }

    private end()
    {
        this.sprite.kill();
        G.game.paused = false;
        G.pauseUpdate.remove(this.PauseUpdate, this);
    }

}
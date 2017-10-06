class Dialogue
{

    times: number = 0;
    //sprite: Phaser.Sprite;
    text: Phaser.Text;
    style: any;

    constructor(key?: string) 
    {

        G.game.paused = true;

        //this.sprite = G.getSprite('testplayer', 0, 0);
        //this.sprite.fixedToCamera = true;

        this.style = { font: 'bold 60pt Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 450 };
        this.text = G.game.add.text(0, 0, "(0/5) phaser with a sprinkle of pixi dust", this.style);
        this.text.fixedToCamera = true;

        this.times = 0;
        
        G.pauseUpdate.add(this.PauseUpdate, this);
    }

    PauseUpdate()
    {
        if (Input.pressed(Action.Interact))
        {
            this.times++;

            if (this.times > 5)
            {
                this.end();
            }
            
            this.text.text = "(" + this.times + "/5) " + "phaser with a sprinkle of pixi dust";

        }
    }

    private end()
    {
        this.text.kill();
        G.game.paused = false;
        G.pauseUpdate.remove(this.PauseUpdate, this);
    }

}
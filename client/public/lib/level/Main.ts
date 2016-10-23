/// <reference path="../base/BaseState.ts" />
class Main extends BaseState
{

    player: Player;
    map: Phaser.Tilemap;
    layers: Phaser.TilemapLayer[] = [];

    constructor()
    {
        super();
        this.player = new Player(this);
    }
    
    Preload()
    {
        this.game.load.tilemap('testmap', '../res/map/testmap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', '../res/map/testset.png');
        this.game.load.image('car', '../res/sprite/car90.png');
        this.game.load.image('space', '../res/img/space.jpg');
    }

    Create()
    {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.map = this.game.add.tilemap('testmap');
        this.map.addTilesetImage('testset', 'tiles');

        this.layers = [];
        this.layers.push(this.map.createLayer('ground'));

        this.collisionLayer = this.map.createLayer('collision');
        this.map.setCollisionByExclusion([],true,'collision');
        this.layers.push(this.collisionLayer);

        

        //Wall objects
        //this.car = this.game.add.sprite(16,16,'car');
        //this.car.anchor.setTo(0.5, 0.5);
        //this.game.physics.enable(this.car);
        //arcb(this.car).collideWorldBounds = true;
        //(this.car.body as Phaser.Physics.Arcade.Body).immovable = true;
        //arcb(this.car).moves = false;

        //Add overhead layers?
        let ol1 = this.map.createLayer('overhead');
        ol1.z = 1000;
        this.layers.push(ol1);

        let ol2 = this.map.createLayer('overhead2');
        ol2.z = 2000;
        this.layers.push(ol2);

        //All layers
        for (let l of this.layers)
        {
            l.setScale(2,2);
            l.renderSettings.enableScrollDelta = true;
        }
        this.layers[0].resizeWorld();
    }

    Update()
    { 

    }
    
    Render()
    {
        
    }
    
    Shutdown()
    {
        
    }


    
}
/// <reference path="../base/BaseState.ts" />
class Main extends BaseState
{

    player: Player;
    map: Phaser.Tilemap;
    layers: Phaser.TilemapLayer[] = [];
    collisionLayer: Phaser.TilemapLayer;
    collisionGroup: Phaser.Group;

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


        this.collisionGroup = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        //this.collisionGroup.add(this.car)
        this.collisionGroup.add(this.player.sprite);

        this.game.camera.follow(this.player.sprite);

        //Add overhead layers?
        this.layers.push(this.map.createLayer('overhead'));
        this.layers.push(this.map.createLayer('overhead2'));

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
        this.game.physics.arcade.collide(this.collisionGroup);        
        this.game.physics.arcade.collide(this.player.sprite,this.collisionLayer);      

    }
    
    Render()
    {
        
    }
    
    Shutdown()
    {
        
    }


    
}
/// <reference path="../base/BaseState.ts" />
class Main extends BaseState
{

    player: Player;
    map: Phaser.Tilemap;
    layers: Phaser.TilemapLayer[] = [];

    constructor()
    {
        super();
        let basicEnemy = new BasicEnemy();
    }
    
    Preload()
    {
        this.game.load.tilemap('testmap', '../res/map/testmap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', '../res/map/testset.png');
        this.game.load.image('car', '../res/sprite/car90.png');

        
        this.game.load.image('map1', '../res/map/testmap.png');


    }

    Create()
    {
        
        //this.game.physics.p2.contactMaterial.restitution = 0;
        //this.game.physics.p2.contactMaterial.stiffness = Number.MAX_VALUE;
        //this.useTestMap();

        this.game.add.image(0,0,"map1");
        this.game.world.resize(4000,4000)

        

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

    useTestMap()
    {
        this.map = this.game.add.tilemap('testmap');
        this.map.addTilesetImage('testset', 'tiles');

        this.layers = [];
        this.layers.push(this.map.createLayer('ground'));

        G.layerCollision = this.map.createLayer('collision');
        this.map.setCollisionByExclusion([],true,'collision');
        this.layers.push(G.layerCollision);

        

        //Wall objects
        //this.car = this.game.add.sprite(16,16,'car');
        //this.car.anchor.setTo(0.5, 0.5);
        //this.game.physics.enable(this.car);
        //arcb(this.car).collideWorldBounds = true;
        //arcb(this.car).immovable = true;
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

    
}
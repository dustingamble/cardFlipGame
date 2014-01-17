var GameScene = cc.Scene.extend({
    ctor:function (rows, columns)
    {
        this._super();
        var myGameLayer = new GameLayer(rows, columns);
        this.addChild(myGameLayer);
    }
});


var GameLayer = cc.Layer.extend({
    _tilesInPlay:[],
    _tilesSelected:[],
    _tilesLayer:null,
    _spriteBatch:null,

    ctor:function (rows, columns)
    {
        this._super();
        console.log("You made a new GameLayer! YAY!");

        this._tilesInPlay = new Array();
        this._tilesSelected = new Array();
        this._tilesLayer = null;
        this._spriteBatch = null;

        var winSize = cc.Director.getInstance().getWinSize();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(p_Heroes);
        this._spriteBatch = cc.SpriteBatchNode.create(s_Heroes);

        var maxTiles = (rows * columns) / 2;

        // contain tiles to be placed
        var tilesAvailable = new Array();
        var tilePadding = 10;

        for (t = 1; t <= maxTiles; t++) {
            for (i = 1; i <= 2; i++) {
                //var tileSpr = cc.Sprite.createWithSpriteFrameName("tile" + t + ".jpg");
                var tileSpr = new Tile("tile" + t + ".jpg");
                tileSpr.setAnchorPoint(0,0);
                tilesAvailable.push(tileSpr);
            }
        }

        var tileSize = tilesAvailable[0].getContentSize();
        console.log("Created " + tilesAvailable.length + " Sprites");

        this._tilesLayer = cc.Layer.create();
        this._tilesLayer.setAnchorPoint(0,0);
        this.addChild(this._tilesLayer);

        var tilesWidth = (tileSize.width * columns) + (tilePadding * (columns - 1));
        var tilesHeight = (tileSize.height * rows) + (tilePadding * (rows - 1));
        this._tilesLayer.setPosition(cc.p((winSize.width-tilesWidth)/2, (winSize.height - tilesHeight)/2));

        this._tilesLayer.addChild(this._spriteBatch);

        // draw sprites to screen
        for (row = 0; row < rows; row++) {
            for (col = 0; col < columns; col++) {
                var randNum = Math.floor(Math.random()*tilesAvailable.length);
                var tileSpr = tilesAvailable.splice(randNum, 1)[0];

                var xPos = col * (tileSize.width + tilePadding);
                var yPos = row * (tileSize.height + tilePadding);

                tileSpr.setPosition(cc.p(xPos, yPos));
                this._spriteBatch.addChild(tileSpr);

                this._tilesInPlay.push(tileSpr);
            }
        }

        var backLbl = cc.LabelTTF.create("Exit", "Helvetica", 32);
        var backItm = cc.MenuItemLabel.create(backLbl, this.showMenu);
        var backMenu = cc.Menu.create(backItm);
        this.addChild(backMenu);

        backItm.setAnchorPoint(cc.p(1, 0));
        backMenu.setPosition(cc.p(winSize.width - 40, 40));

        if (sys["capabilities"].hasOwnProperty('mouse')) {
            this.setMouseEnabled(true);
        }

        if (sys["capabilities"].hasOwnProperty('touches')) {
            this.setTouchEnabled(true);
        }

    },

    showMenu:function ()
    {
        var menuScene = new MyScene();
        cc.Director.getInstance().replaceScene(menuScene);
    },

    onMouseUp:function(event) {
        this.flipTileAt(event.getLocation());
    },

    onTouchEnded:function(touch, event) {
        this.flipTileAt(touch.getLocation());
    },



    flipTileAt:function(location) {
        console.log("Flip tile at" + location.x + ", " + location.y);

        // check if the player has already cicked 2 tiles
        if (this._tilesSelected.length >= 2) {
            console.log("Player has 2 tiles selected");
            return;
        } else {
            for (i = 0; i < this._tilesInPlay.length; i++) {
                console.log("checking tile " + i);

                var tile = this._tilesInPlay[i];
                var rect = cc.RectMake(0, 
                                       0, 
                                       tile.getBoundingBox().size.width, 
                                       tile.getBoundingBox().size.height);
                // convert location to tile space
                var locTileSpace = tile.convertToNodeSpace(location);

                if (cc.rectContainsPoint(rect, locTileSpace) && !tile.isFaceUp ) {
                    tile.flipTile();
                    this._tilesSelected.push(tile);

                    if (this._tilesSelected.length == 2) {
                        //this.checkMatch();
                        cc.Director.getInstance().getScheduler().scheduleCallbackForTarget(
                            this, this.checkMatch, 1, 0);
                    }

                }
            }
        }
    },

    checkMatch:function() {
        var tileA = this._tilesSelected[0];
        var tileB = this._tilesSelected[1];

        if (tileA.faceSpriteName == tileB.faceSpriteName) {
            this._spriteBatch.removeChild(tileA);
            this._spriteBatch.removeChild(tileB);
        } else {
            tileA.flipTile();
            tileB.flipTile();
        }

        this._tilesSelected = [];
    }


});
















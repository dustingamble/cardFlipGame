var MyLayer = cc.Layer.extend({

    ctor:function ()
    {
        this._super();
        // GAME CODE STARTS
        var winSize = cc.Director.getInstance().getWinSize();

        var bgColor = new cc.Color4B(255, 128, 0, 255);
        var bgLayer = cc.LayerColor.create(bgColor, winSize.width, winSize.height);
        this.addChild(bgLayer);

        var titleLbl = cc.LabelTTF.create("Scene Switcher", "Helvetica", 64);
        titleLbl.setPosition(cc.p(winSize.width/2, winSize.height/2));
        this.addChild(titleLbl);

        var easyLbl = cc.LabelTTF.create("Easy", "Helvetica", 32);
        var easyItm = cc.MenuItemLabel.create(easyLbl, this.startEasy);

        var normalLbl = cc.LabelTTF.create("Normal", "Helvetica", 32);
        var normalItm = cc.MenuItemLabel.create(normalLbl, this.startNormal);

        var hardLbl = cc.LabelTTF.create("Hard", "Helvetica", 32);
        var hardItm = cc.MenuItemLabel.create(hardLbl, this.startHard);

        var startMenu = cc.Menu.create(easyItm, normalItm, hardItm);
        this.addChild(startMenu);

        startMenu.setPosition(cc.p(winSize.width/2, winSize.height/4));

        startMenu.alignItemsVerticallyWithPadding(10);
    },

    startEasy:function ()
    {
        console.log("START EASY!!");
        var myGameScene = new GameScene(3, 2);
        cc.Director.getInstance().replaceScene(myGameScene);
    },

    startNormal:function ()
    {
        console.log("START Normal!!");
        var myGameScene = new GameScene(4, 3);
        cc.Director.getInstance().replaceScene(myGameScene);
    },

    startHard:function ()
    {
        console.log("START HARD!!");
        var myGameScene = new GameScene(5, 4);
        cc.Director.getInstance().replaceScene(myGameScene);
    }
    
});

var MyScene = cc.Scene.extend({

    ctor:function ()
    {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
    }

});
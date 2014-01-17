var Tile = cc.Sprite.extend({
	faceSpriteName:null,
	tileRow:0,
	tileColumn:0,
	isFaceUp:false,

	ctor:function(sprName) {
		this._super();
		console.log("created new Tile");
		this.faceSpriteName = sprName;
		this.initWithSpriteFrameName("CardBack.png");
	},

	showFace:function() {
		console.log("Show Tile Face");
		var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(this.faceSpriteName);
		this.setDisplayFrame(frame);
		this.isFaceUp = true;
	},

	showBack:function() {
		console.log("Show Tile Back");
		var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("CardBack.png");
		this.setDisplayFrame(frame);
		this.isFaceUp = false;
	},

	changeTile:function() {
		if (this.isFaceUp) {
			this.showBack();
		} else {
			this.showFace();
		}
	},

	flipTile:function() {
		var aniTime = 0.5;

		var scaleDown = cc.ScaleTo.create(aniTime/2, 0, 1);
		var callFunction = cc.CallFunc.create(this.changeTile, this);
		var scaleUp = cc.ScaleTo.create(aniTime/2, 1, 1);

		var flipSequence = cc.Sequence.create(scaleDown, callFunction, scaleUp);
		this.runAction(flipSequence);
	}
});

/*
var heartShapedCookie = cookie.extend({
	ctor:function(color) {
		this.color = color;
	}
});

var pinkHeartCookie = new heartShapedCookie("pink");

cookie
|
Heart shaped cookie
|
Pink heartshaped cookie
*/
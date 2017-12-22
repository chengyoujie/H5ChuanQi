
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"polyfill/promise.js",
	"bin-debug/engin/avater/Unit.js",
	"bin-debug/engin/avater/MoveableUnit.js",
	"bin-debug/engin/avater/Role.js",
	"bin-debug/engin/map/MapData.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/engin/avater/AvaterLayer.js",
	"bin-debug/engin/avater/HeroAvater.js",
	"bin-debug/engin/common/FrameClip.js",
	"bin-debug/engin/common/FrameRes.js",
	"bin-debug/engin/common/FrameResManager.js",
	"bin-debug/engin/event/UnitEvent.js",
	"bin-debug/engin/map/Map2DSetting.js",
	"bin-debug/engin/map/Map2DSettingString.js",
	"bin-debug/engin/map/MapCell.js",
	"bin-debug/Config.js",
	"bin-debug/engin/map/MapLayer.js",
	"bin-debug/Facade.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/utils/ActionState.js",
	"bin-debug/utils/DataParser.js",
	"bin-debug/utils/Direction.js",
	"bin-debug/utils/Loader.js",
	"bin-debug/utils/LoaderManager.js",
	"bin-debug/utils/ResData.js",
	"bin-debug/utils/Shared.js",
	"bin-debug/view/View.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};
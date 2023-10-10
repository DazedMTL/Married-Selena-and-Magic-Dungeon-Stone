var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Saba;
(function (Saba) {
    var Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        if (command == 'selectDest') {
            SceneManager.push(Scnee_DestSelect);
            return;
        }
        ;
        Game_Interpreter_prototype_pluginCommand.call(this, command, args);
    };
    var _Spriteset_Map_prototype_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function () {
        _Spriteset_Map_prototype_createLowerLayer.call(this);
        this.createWarpSprite();
    };
    var _Spriteset_Map_prototype_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function () {
        _Spriteset_Map_prototype_update.call(this);
        this._warpSprite.update();
    };
    Spriteset_Map.prototype.createWarpSprite = function () {
        this._warpSprite = new Sprite_Warp();
        this._warpSprite.position.x = 900;
        this._warpSprite.position.y = 10;
        this.addChild(this._warpSprite);
    };
    var _Scene_Map_prototype_updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function () {
        _Scene_Map_prototype_updateScene.call(this);
        if (this.isWarpEnabled()) {
            if (this._spriteset._warpSprite) {
                this._spriteset._warpSprite.warpEnabled(true);
            }
            if (Input.isTriggered('pagedown')) {
                this.warpCalling = true;
            }
            if (this.warpCalling && !$gamePlayer.isMoving()) {
                SoundManager.playOk();
                $gameTemp.reserveCommonEvent(42);
            }
        }
        else {
            if (this._spriteset._warpSprite) {
                this._spriteset._warpSprite.warpEnabled(false);
            }
            this.warpCalling = false;
        }
    };
    Scene_Map.prototype.isWarpEnabled = function () {
        if (!this.isMenuEnabled()) {
            return false;
        }
        if ($gameSwitches.value(1)) {
            return false;
        }
        if (!$gameSwitches.value(10)) {
            return false;
        }
        if ($gameSwitches.value(5)) {
            // 夜
            return false;
        }
        if ($gameVariables.value(8) != 1) {
            //return false;
        }
        return true;
    };
    var Sprite_Warp = /** @class */ (function (_super) {
        __extends(Sprite_Warp, _super);
        function Sprite_Warp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_Warp.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.refresh();
        };
        Sprite_Warp.prototype.update = function () {
            _super.prototype.update.call(this);
            if ($gameSwitches.value(1)) {
                this.visible = false;
                return;
            }
            if (!this._timeSprite) {
                return;
            }
            if (!$gameSwitches.value(528)) {
                this._timeSprite.visible = false;
                return;
            }
            this.visible = true;
            this._timeSprite.visible = true;
            if ($gameSwitches.value(5)) {
                if (this._lastType != 0) {
                    this.refresh();
                }
            }
            else if ($gameSwitches.value(6)) {
                if (this._lastType != 1) {
                    this.refresh();
                }
            }
            else if ($gameSwitches.value(7)) {
                if (this._lastType != 2) {
                    this.refresh();
                }
            }
            else {
                if (this._lastType != -1) {
                    this.refresh();
                }
            }
        };
        Sprite_Warp.prototype.refresh = function () {
            var baseTexture = Saba.getSystemBaseTexture('warp');
            this.destroyAndRemoveChildren();
            this._warpSprite = new PIXI.Sprite(new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 0, 200, 30)));
            this._warpSprite.x = -110;
            this._warpSprite.y = 70;
            this.addChild(this._warpSprite);
            return;
            var yy;
            this._lastType = -1;
            if ($gameSwitches.value(6)) {
                this._lastType = 1;
                yy = 80;
            }
            if ($gameSwitches.value(7)) {
                this._lastType = 2;
                yy = 40;
            }
            if ($gameSwitches.value(5)) {
                yy = 120;
                this._lastType = 0;
            }
            if (this._lastType == -1) {
                return;
            }
            this._timeSprite = new PIXI.Sprite(new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, yy, 200, 30)));
            this._timeSprite.y = 0;
            this.addChild(this._timeSprite);
        };
        Sprite_Warp.prototype.warpEnabled = function (b) {
            if (this._warpSprite) {
                this._warpSprite.visible = b;
            }
        };
        return Sprite_Warp;
    }(Sprite_Base));
    var Sprite_CharacterMap = /** @class */ (function (_super) {
        __extends(Sprite_CharacterMap, _super);
        function Sprite_CharacterMap() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.updatePosition = function () {
            };
            return _this;
        }
        return Sprite_CharacterMap;
    }(Sprite_Character));
    var _Scene_MenuBase_update = Scene_MenuBase.prototype.update;
    var Scnee_DestSelect = /** @class */ (function (_super) {
        __extends(Scnee_DestSelect, _super);
        function Scnee_DestSelect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scnee_DestSelect.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createDestWindow();
            this.createPlayer();
        };
        Scnee_DestSelect.prototype.createBackground = function () {
            if ($gameSwitches.value(5)) {
                this._backgroundSprite2 = Saba.getSystemImage('bg2');
            }
            else {
                this._backgroundSprite2 = Saba.getSystemImage('bg');
            }
            this.addChild(this._backgroundSprite2);
        };
        Scnee_DestSelect.prototype.update = function () {
            _Scene_MenuBase_update.call(this);
            $gamePlayer.update();
        };
        Scnee_DestSelect.prototype.createDestWindow = function () {
            this._destWindow = new Window_DestSelect();
            this._destWindow.setHandler('ok', this.onOk.bind(this));
            this._destWindow.setHandler('cancel', this.onCancel.bind(this));
            this._destWindow.setHandler('change', this.onSelect.bind(this));
            this.addWindow(this._destWindow);
        };
        Scnee_DestSelect.prototype.createPlayer = function () {
            $gamePlayer.setStepAnime(true);
            this._player = new Sprite_CharacterMap($gamePlayer);
            $gamePlayer.setDirection(2);
            this.addChild(this._player);
        };
        Scnee_DestSelect.prototype.onOk = function () {
            this._destWindow.deactivate();
            var id = this._destWindow.selectedId();
            $gameVariables.setValue(20, id);
            $gamePlayer.setStepAnime(false);
            this.popScene();
        };
        Scnee_DestSelect.prototype.onSelect = function () {
            var id = this._destWindow.selectedId();
            switch (id) {
                case Saba.HOME:
                    this._player.position = new PIXI.Point(180, 642);
                    break;
                case Saba.CITY:
                    this._player.position = new PIXI.Point(180, 688);
                    break;
                case Saba.SHOP:
                    this._player.position = new PIXI.Point(384, 442);
                    break;
                case Saba.GUILD:
                    this._player.position = new PIXI.Point(426, 642);
                    break;
                case Saba.FAVELA:
                    this._player.position = new PIXI.Point(260, 640);
                    break;
                case Saba.DUNGEON:
                    this._player.position = new PIXI.Point(624, 650);
                    break;
                case Saba.LAB:
                    this._player.position = new PIXI.Point(344, 442);
                    break;
            }
        };
        Scnee_DestSelect.prototype.onCancel = function () {
            $gameVariables.setValue(20, 0);
            $gamePlayer.setStepAnime(false);
            this.popScene();
        };
        Scnee_DestSelect.prototype.start = function () {
            Scene_MenuBase.prototype.start.call(this);
            this._destWindow.refresh();
            this._destWindow.activate();
            this._destWindow.select(0);
        };
        ;
        return Scnee_DestSelect;
    }(Scene_MenuBase));
    Saba.Scnee_DestSelect = Scnee_DestSelect;
    Saba.HOME = 1;
    Saba.SHOP = 2;
    Saba.DUNGEON = 3;
    Saba.GUILD = 4;
    Saba.FAVELA = 5;
    Saba.INN = 6;
    Saba.LAB = 7;
    Saba.VAGRANT = 8;
    Saba.CITY = 9;
    var Window_DestSelect = /** @class */ (function (_super) {
        __extends(Window_DestSelect, _super);
        function Window_DestSelect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_DestSelect.prototype.initialize = function () {
            _super.prototype.initialize.call(this, 600, 50, this.windowWidth(), this.windowHeight());
        };
        Window_DestSelect.prototype.windowWidth = function () {
            return Graphics.boxWidth - 300 * 2;
        };
        ;
        Window_DestSelect.prototype.makeDestList = function () {
            if (this._destList) {
                return;
            }
            this._destList = [];
            var d = this._destList;
            d.push(Saba.HOME);
            if ($gameSwitches.value(105)) {
                // リン暗殺イベント中
                d.push(Saba.GUILD);
                return;
            }
            if (!$gameSwitches.value(274)) {
                d.push(Saba.CITY);
            }
            if ($gameSwitches.value(436) && !$gameSwitches.value(437)) {
                d.push(Saba.GUILD);
                return;
            }
            if ($gameSwitches.value(436) && $gameSwitches.value(437) && $gameSwitches.value(274)) {
                d.push(Saba.GUILD);
                d.push(Saba.DUNGEON);
                d.push(Saba.SHOP);
                return;
            }
            if ($gameSwitches.value(287)) {
                d.push(Saba.GUILD);
                return;
            }
            if ($gameSwitches.value(274)) {
                d.push(Saba.DUNGEON);
                return;
            }
            if ($gameSwitches.value(247) && !$gameSwitches.value(248)) {
                d.push(Saba.LAB);
                return;
            }
            if ($gameSwitches.value(61)) {
                d.push(Saba.SHOP);
            }
            if ($gameSwitches.value(62)) {
                d.push(Saba.FAVELA);
            }
            if ($gameSwitches.value(7) && $gameSwitches.value(248)) {
                d.push(Saba.LAB);
            }
            if ($gameSwitches.value(63) && $gameSwitches.value(7)) {
                //d.push(DUNGEON);
            }
            if ($gameSwitches.value(65)) {
                d.push(Saba.VAGRANT);
            }
            d.push(Saba.GUILD);
        };
        Window_DestSelect.prototype.windowHeight = function () {
            this.makeDestList();
            return this._destList.length * this.lineHeight() + 18 * 2;
        };
        Window_DestSelect.prototype.selectedId = function () {
            return this._destList[this.index()];
        };
        Window_DestSelect.prototype.drawItem = function (index) {
            var destId = this._destList[index];
            var rect = this.itemRect(index);
            this.drawText(this.getDestName(destId), rect.x, rect.y, 350, 'left');
        };
        Window_DestSelect.prototype.getDestName = function (destId) {
            return getPlaceName(destId);
        };
        Window_DestSelect.prototype.maxItems = function () {
            if (!this._destList) {
                return 0;
            }
            return this._destList.length;
        };
        Window_DestSelect.prototype.maxCols = function () {
            return 1;
        };
        return Window_DestSelect;
    }(Window_Selectable));
    Saba.Window_DestSelect = Window_DestSelect;
})(Saba || (Saba = {}));

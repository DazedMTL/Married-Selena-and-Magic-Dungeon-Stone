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
    var _Scene_Map_prototype_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
        _Scene_Map_prototype_createAllWindows.call(this);
        if (!$gamePlayer.is3D()) {
            SceneManager.clearBackgroundSprite();
            return;
        }
        this._autoMapWindow = new Window_AutoMap();
        this.addWindow(this._autoMapWindow);
        this._statusWindow = new Window_BattleStatus();
        this._statusWindow.x = this._autoMapWindow.windowWidth();
        this.addWindow(this._statusWindow);
        this._statusWindow.openness = 256;
        this._statusWindow.open();
        this._autoMapWindow.open();
    };
    var _Scene_Map_prototype_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_prototype_update.call(this);
        if (this._statusWindow) {
            if ($gameTemp.hideStatus) {
                this._statusWindow.visible = false;
                this._autoMapWindow.visible = false;
            }
            else {
                this._statusWindow.visible = true;
                this._autoMapWindow.visible = true;
            }
        }
    };
    function showStatusWindow() {
        SceneManager._scene.showStatus();
    }
    Saba.showStatusWindow = showStatusWindow;
    Scene_Map.prototype.showStatus = function () {
        this._statusWindow.visible = true;
        this._autoMapWindow.visible = true;
    };
    var AutoMapType;
    (function (AutoMapType) {
        AutoMapType[AutoMapType["Empty"] = 0] = "Empty";
        AutoMapType[AutoMapType["Fill"] = 1] = "Fill";
    })(AutoMapType || (AutoMapType = {}));
    Saba.isGate = function (x, y, d) {
        var gate = Saba.isGateInternal($gameMap.tileId(x, y, 2), d) || Saba.isGateInternal($gameMap.tileId(x, y, 3), d);
        if (gate) {
            return true;
        }
        switch (d) {
            case 2:
                return Saba.isGateInternal($gameMap.tileId(x, y + 1, 2), 8) || Saba.isGateInternal($gameMap.tileId(x, y + 1, 3), 8);
            case 8:
                return Saba.isGateInternal($gameMap.tileId(x, y - 1, 2), 2) || Saba.isGateInternal($gameMap.tileId(x, y - 1, 3), 2);
            case 4:
                return Saba.isGateInternal($gameMap.tileId(x - 1, y, 2), 6) || Saba.isGateInternal($gameMap.tileId(x - 1, y, 3), 6);
            case 6:
                return Saba.isGateInternal($gameMap.tileId(x + 1, y, 2), 4) || Saba.isGateInternal($gameMap.tileId(x + 1, y, 3), 4);
        }
    };
    Saba.isGateInternal = function (tileId, d) {
        switch (tileId) {
            case 22:
                if (d == 8) {
                    return true;
                }
                break;
            case 23:
                if (d == 2) {
                    return true;
                }
                break;
            case 30:
                if (d == 4) {
                    return true;
                }
                break;
            case 31:
                if (d == 6) {
                    return true;
                }
                break;
        }
        return false;
    };
    var Window_AutoMap = /** @class */ (function (_super) {
        __extends(Window_AutoMap, _super);
        function Window_AutoMap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_AutoMap.prototype.initialize = function () {
            var height = this.windowHeight();
            var w = this.windowWidth();
            _super.prototype.initialize.call(this, 0, Graphics.boxHeight - height, w, height);
            Saba.$autoMap.setCallback(this.onChange, this);
        };
        Window_AutoMap.prototype.windowWidth = function () {
            return 264;
        };
        Window_AutoMap.prototype.windowHeight = function () {
            return this.fittingHeight(6);
        };
        Window_AutoMap.prototype.lineHeight = function () {
            return Window_BattleStatus.prototype.lineHeight.call(this);
        };
        Window_AutoMap.prototype.update = function () {
            var d = $gamePlayer.direction();
            if (this._lastDirection != d) {
                this.refresh();
            }
            this._lastDirection = d;
            Window_Base.prototype.update.call(this);
            if ($gameMap.isEventRunning()) {
                this.visible = false;
            }
            else {
                this.visible = true;
            }
        };
        Window_AutoMap.prototype.onChange = function () {
            this.refresh();
        };
        Window_AutoMap.prototype.drawStamina = function () {
            if (this._destroyed) {
                return;
            }
            if ($gameSwitches.value(878)) {
                // ラスボス前
                return;
            }
            if (this.bar) {
                this.bar.destroy({
                    children: true,
                    texture: true
                });
                this.removeChild(this.bar);
                this.bar = null;
                this.bg.destroy({
                    children: true,
                    texture: true
                });
                this.removeChild(this.bg);
                this.bg = null;
                this._foodSprite.destroy({
                    children: true,
                    texture: true
                });
                this.removeChild(this._foodSprite);
                this._foodSprite = null;
            }
            var food = $gamePlayer._food;
            if (!food) {
                return;
            }
            if (!$gameSwitches.value(238)) {
                return;
            }
            var x = 30;
            var bg = new PIXI.Graphics();
            bg.y = -11;
            bg.beginFill(0x000000);
            bg.drawRect(14 + x, 0, $gamePlayer._maxFood * 2 + 2, 10);
            bg.endFill();
            this.addChild(bg);
            this.bg = bg;
            var bar = new PIXI.Graphics();
            bar.y = -10;
            bar.beginFill(0xff9822);
            bar.drawRect(15 + x, 0, food * 2, 8);
            bar.endFill();
            this.addChild(bar);
            this.bar = bar;
            var texture = this.getTexture(29);
            var sprite = new PIXI.Sprite(texture);
            sprite.x = 8;
            sprite.y = -30;
            this.addChild(sprite);
            this._foodSprite = sprite;
        };
        Window_AutoMap.prototype.refresh = function () {
            //p('refresh')
            this._windowContentsSprite.destroyAndRemoveChildren();
            var mask = new PIXI.Graphics();
            mask.beginFill(0x000000);
            mask.drawRect(-10, -10, 248, 200);
            mask.endFill();
            this._windowContentsSprite.mask = mask;
            this._windowContentsSprite.addChild(mask);
            var info = Saba.$autoMap;
            var range = 4;
            for (var x = -range; x <= range; x++) {
                var xx = x + $gamePlayer.x;
                for (var y = -range; y <= range; y++) {
                    var yy = y + $gamePlayer.y;
                    if (info.isFilled(xx, yy)) {
                        this.drawMass(AutoMapType.Fill, xx, yy, x, y);
                    }
                    else {
                        this.drawMass(AutoMapType.Empty, xx, yy, x, y);
                    }
                }
            }
            this.drawPlayer();
            this.drawStamina();
        };
        Window_AutoMap.prototype.drawPlayer = function () {
            var baseTexture = Saba.getSystemBaseTexture('AutoMapPlayer');
            var w = baseTexture.width / 2;
            var h = w;
            var index;
            switch ($gamePlayer.direction()) {
                case 8:
                    index = 0;
                    break;
                case 2:
                    index = 1;
                    break;
                case 4:
                    index = 2;
                    break;
                case 6:
                    index = 3;
                    break;
            }
            var xx = index % 2;
            var yy = Math.floor(index / 2);
            var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(w * xx, h * yy, w, h));
            var sprite = new PIXI.Sprite(texture);
            sprite.position = this.getPos(this.getPlayerX(), this.getPlayerY());
            sprite.position.x -= 4;
            sprite.position.y -= 4;
            this._windowContentsSprite.addChild(sprite);
        };
        Window_AutoMap.prototype.getPlayerX = function () {
            return 0;
        };
        Window_AutoMap.prototype.getPlayerY = function () {
            return 0;
        };
        Window_AutoMap.prototype.drawMass = function (type, xx, yy, x, y) {
            this.drawBg(type, x, y);
            if (type == AutoMapType.Empty) {
                this.drawEvent2(xx, yy, x, y);
                return;
            }
            this.drawWallTop(xx, yy, x, y);
            this.drawWallLeft(xx, yy, x, y);
            this.drawWallRight(xx, yy, x, y);
            this.drawWallBottom(xx, yy, x, y);
            this.drawEvent(xx, yy, x, y);
        };
        Window_AutoMap.prototype.drawEvent = function (xx, yy, x, y) {
            var events = $gameMap.eventsXy(xx, yy);
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var event = events_1[_i];
                var data = event.event();
                var map = parseInt(data.meta['map']);
                if (map > 0) {
                    var texture = this.getTexture(map, event);
                    this.drawWall(texture, x, y);
                }
            }
        };
        Window_AutoMap.prototype.drawEvent2 = function (xx, yy, x, y) {
            var events = $gameMap.eventsXy(xx, yy);
            for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
                var event = events_2[_i];
                var data = event.event();
                if (data.meta['question']) {
                    var texture = this.getTexture(60, event);
                    this.drawWall(texture, x, y);
                }
            }
        };
        Window_AutoMap.prototype.drawWall = function (texture, x, y) {
            var sprite = new PIXI.Sprite(texture);
            sprite.position = this.getPos(x, y);
            this._windowContentsSprite.addChild(sprite);
        };
        Window_AutoMap.prototype.drawWallTop = function (xx, yy, x, y) {
            var texture;
            if (!$gameMap.isPassable(xx, yy, 8) || !$gameMap.isPassable(xx, yy - 1, 2)) {
                texture = this.getTexture(2);
            }
            else if (this.isGate(xx, yy, 8) || this.isGate(xx, yy - 1, 2)) {
                texture = this.getTexture(6);
            }
            else {
                return;
            }
            this.drawWall(texture, x, y);
        };
        Window_AutoMap.prototype.drawWallLeft = function (xx, yy, x, y) {
            var texture;
            if (!$gameMap.isPassable(xx, yy, 4) || !$gameMap.isPassable(xx - 1, yy, 6)) {
                texture = this.getTexture(4);
            }
            else if (this.isGate(xx, yy, 4) || this.isGate(xx - 1, yy, 6)) {
                texture = this.getTexture(8);
            }
            else {
                return;
            }
            this.drawWall(texture, x, y);
        };
        Window_AutoMap.prototype.drawWallBottom = function (xx, yy, x, y) {
            var texture;
            if (!$gameMap.isPassable(xx, yy, 2) || !$gameMap.isPassable(xx, yy + 1, 8)) {
                texture = this.getTexture(3);
            }
            else if (this.isGate(xx, yy, 2) || this.isGate(xx, yy + 1, 8)) {
                texture = this.getTexture(7);
            }
            else {
                return;
            }
            this.drawWall(texture, x, y);
        };
        Window_AutoMap.prototype.drawWallRight = function (xx, yy, x, y) {
            var texture;
            if (!$gameMap.isPassable(xx, yy, 6) || !$gameMap.isPassable(xx + 1, yy, 4)) {
                texture = this.getTexture(5);
            }
            else if (this.isGate(xx, yy, 6) || this.isGate(xx + 1, yy, 4)) {
                texture = this.getTexture(9);
            }
            else {
                return;
            }
            this.drawWall(texture, x, y);
        };
        Window_AutoMap.prototype.getPos = function (x, y) {
            var size = 32;
            return new PIXI.Point(x * size + 98, y * size + 72);
        };
        Window_AutoMap.prototype.isGate = function (x, y, d) {
            return Saba.isGate(x, y, d);
        };
        Window_AutoMap.prototype.drawBg = function (type, x, y) {
            var texture;
            if (type == AutoMapType.Empty) {
                texture = this.getTexture(0);
            }
            else {
                texture = this.getTexture(1);
            }
            var bg = new PIXI.Sprite(texture);
            bg.position = this.getPos(x, y);
            this._windowContentsSprite.addChild(bg);
        };
        Window_AutoMap.prototype.getTexture = function (index, event) {
            var isGot = false;
            if (event) {
                if (!event.page()) {
                    return null;
                }
                if (event.page().list.length <= 1) {
                    isGot = true;
                }
            }
            switch (index) {
                case 30:
                    if (isGot) {
                        index = 15;
                    }
                    else {
                        index = 20;
                    }
                    break;
                case 40:
                    if (isGot) {
                        index = 19;
                    }
                    else {
                        index = 20;
                    }
                    break;
                case 60:
                    index = 30;
                    break;
            }
            var baseTexture = Saba.getSystemBaseTexture('AutoMapTile');
            var w = baseTexture.width / 2;
            var h = w;
            var xx = index % 2;
            var yy = Math.floor(index / 2);
            var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(w * xx, h * yy, w, h));
            return texture;
        };
        return Window_AutoMap;
    }(Window_Base));
    var _Scene_Map_prototype_updateCallMenu = Scene_Map.prototype.updateCallMenu;
    Scene_Map.prototype.updateCallMenu = function () {
        _Scene_Map_prototype_updateCallMenu.call(this);
        if (this.isMenuEnabled()) {
            if (!$gamePlayer.is3D()) {
                return;
            }
            if (this.isAutoMapCalled()) {
                this.autoMapCalling = true;
            }
            if (this.autoMapCalling && !$gamePlayer.isMoving()) {
                this.callAutoMap();
            }
        }
        else {
            this.autoMapCalling = false;
        }
    };
    Scene_Map.prototype.isAutoMapCalled = function () {
        return Input.isTriggered('pagedown');
    };
    Scene_Map.prototype.callAutoMap = function () {
        SoundManager.playOk();
        SceneManager.push(Scene_AutoMap);
        $gameTemp.clearDestination();
        this._mapNameWindow.hide();
    };
    var Window_WholeAutoMap = /** @class */ (function (_super) {
        __extends(Window_WholeAutoMap, _super);
        function Window_WholeAutoMap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_WholeAutoMap.prototype.windowWidth = function () {
            return Graphics.boxWidth;
        };
        Window_WholeAutoMap.prototype.windowHeight = function () {
            return Graphics.boxHeight - 80;
        };
        Window_WholeAutoMap.prototype.refresh = function () {
            this._windowContentsSprite.destroyAndRemoveChildren();
            var info = Saba.$autoMap;
            for (var x = 0; x < $gameMap.width(); x++) {
                for (var y = 0; y < $gameMap.height(); y++) {
                    if (info.isFilled(x, y)) {
                        this.drawMass(AutoMapType.Fill, x, y, x, y);
                    }
                    else {
                        this.drawMass(AutoMapType.Empty, x, y, x, y);
                    }
                }
            }
            this.drawPlayer();
        };
        Window_WholeAutoMap.prototype.getPos = function (x, y) {
            var size = 32;
            return new PIXI.Point((Graphics.boxWidth - $gameMap.width() * size) / 2 + x * size, (Graphics.boxHeight - 80 - $gameMap.height() * size) / 2 + y * size - 16);
        };
        Window_WholeAutoMap.prototype.getPlayerX = function () {
            return $gamePlayer.x;
        };
        Window_WholeAutoMap.prototype.getPlayerY = function () {
            return $gamePlayer.y;
        };
        return Window_WholeAutoMap;
    }(Window_AutoMap));
    var Window_MapName = /** @class */ (function (_super) {
        __extends(Window_MapName, _super);
        function Window_MapName() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_MapName.prototype.initialize = function () {
            var x = 100;
            _super.prototype.initialize.call(this, x, 0, (Graphics.boxWidth - x * 2), 70);
            this.refresh();
        };
        Window_MapName.prototype.refresh = function () {
            var name = $gameMap.displayName();
            this.contents.drawText(name + ' (踏破率 ' + this.getPercent() + '%)', 0, 0, Graphics.boxWidth - 220, 32, 'center');
        };
        Window_MapName.prototype.getPercent = function () {
            var data = $gameMap.data();
            var w = $gameMap.width();
            var total = 0;
            for (var x = 0; x < w; x++) {
                for (var y = 0; y < $gameMap.height(); y++) {
                    //p(data[x + y * w])
                    if (data[x + y * w] == 1537) {
                        total++;
                    }
                }
            }
            var info = Saba.$autoMap.getMapInfo();
            var mapped = 0;
            for (var i in info) {
                mapped++;
            }
            return Math.round(mapped / total * 100);
        };
        return Window_MapName;
    }(Window_Base));
    var Scene_AutoMap = /** @class */ (function (_super) {
        __extends(Scene_AutoMap, _super);
        function Scene_AutoMap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_AutoMap.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createMapWindow();
            this.createNameWindow();
        };
        Scene_AutoMap.prototype.createNameWindow = function () {
            this._nameWindow = new Window_MapName();
            this.addWindow(this._nameWindow);
        };
        Scene_AutoMap.prototype.createMapWindow = function () {
            this._mapWindow = new Window_WholeAutoMap();
            this.addWindow(this._mapWindow);
        };
        Scene_AutoMap.prototype.update = function () {
            Scene_MenuBase.prototype.update.call(this);
            if (Input.isTriggered('ok') || Input.isPressed('cancel') || Input.isTriggered('pagedown')) {
                SoundManager.playCancel();
                this.popScene();
            }
        };
        Scene_AutoMap.prototype.start = function () {
            Scene_MenuBase.prototype.start.call(this);
            this._mapWindow.refresh();
        };
        return Scene_AutoMap;
    }(Scene_MenuBase));
})(Saba || (Saba = {}));

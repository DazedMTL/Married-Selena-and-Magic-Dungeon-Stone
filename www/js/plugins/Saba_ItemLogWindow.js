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
    var ItemLogWindow;
    (function (ItemLogWindow) {
        Window_Base.prototype.addIcon = function (iconIndex, x, y) {
            var baseTexture = PIXI.utils.BaseTextureCache['system/IconSet'];
            if (!baseTexture) {
                var bitmap = ImageManager.loadSystem('IconSet');
                baseTexture = new PIXI.BaseTexture(bitmap._image, PIXI.SCALE_MODES.DEFAULT);
                baseTexture.imageUrl = 'system/IconSet';
                PIXI.utils.BaseTextureCache['system/IconSet'] = baseTexture;
            }
            var pw = Window_Base._iconWidth;
            var ph = Window_Base._iconHeight;
            var sx = iconIndex % 16 * pw;
            var sy = Math.floor(iconIndex / 16) * ph;
            var texture = new PIXI.Texture(baseTexture);
            texture.frame = new PIXI.Rectangle(sx, sy, pw, ph);
            var sprite = new PIXI.Sprite(texture);
            sprite.position.x = x;
            sprite.position.y = y;
            this._windowContentsSprite.addChild(sprite);
        };
        var Window_ItemLog = /** @class */ (function (_super) {
            __extends(Window_ItemLog, _super);
            function Window_ItemLog(item, yIndex, callback) {
                var _this = _super.call(this, 0, yIndex * 80 + 4, Graphics.boxWidth, 100) || this;
                _this.padding = 0;
                _this._updateContents();
                _this._item = item;
                _this.yIndex = yIndex;
                _this.callback = callback;
                _this._windowFrameSprite.visible = false;
                _this._height = 70;
                _this._windowBackSprite.setFrame(0, 30, Graphics.boxWidth, 90 - 53);
                _this._windowBackSprite.y = 28;
                _this.backOpacity = 255;
                _this.opacity = 0;
                _this.contentsOpacity = 0;
                _this.refresh();
                _this.appearFrame = 12;
                _this.waitFrame = 90;
                _this.eraseFrame = 30;
                return _this;
            }
            Window_ItemLog.prototype._refreshBack = function () {
                var m = this._margin;
                if (this._windowskin.height > 192) {
                    m += 2;
                }
                var w = this._width - m * 2;
                var h = this._height = 70;
                this._windowBackSprite.setFrame(0, 0, w, h);
                this._windowBackSprite.move(m, m);
                this._windowBackSprite._toneFilter = new ToneFilter();
                if (w > 0 && h > 0 && this._windowskin) {
                    this._windowBackSprite.destroyAndRemoveChildren();
                    var baseTexture = this.getBaseTexture();
                    if (this._windowskin.height <= 192) {
                        var p = 96;
                        var texture = new PIXI.Texture(baseTexture);
                        texture.frame = new PIXI.Rectangle(0, 0, p, p);
                        var backSprite = new PIXI.Sprite(texture);
                        backSprite.width = w;
                        backSprite.height = h;
                        this._windowBackSprite.addChild(backSprite);
                        // bitmap.blt(this._windowskin, 0, 0, p, p, 0, 0, w, h);
                        var tileTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, p, p, p));
                        var tilingSprite = new PIXI.extras.TilingSprite(tileTexture, w, h);
                        this._windowBackSprite.addChild(tilingSprite);
                        var tone = this._colorTone;
                        this._windowBackSprite._toneFilter.reset();
                        this._windowBackSprite._toneFilter.adjustTone(tone[0], tone[1], tone[2]);
                        //bitmap.adjustTone(tone[0], tone[1], tone[2]);
                    }
                    else {
                        var p = 192;
                        var tileTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, p, p, p));
                        var tilingSprite = new PIXI.extras.TilingSprite(tileTexture, w, h);
                        this._windowBackSprite.addChild(tilingSprite);
                    }
                }
            };
            ;
            Window_ItemLog.prototype.refresh = function () {
                this.contents.clear();
                var item = this._item;
                var xx = 40;
                var yy = 30;
                this.contents.textColor = '#ff88aa';
                this.contents.fontSize = 24;
                var name = item.name;
                if (item.exp2) {
                    this.contents.drawText('経験値ゲット‼︎', xx - 20, 0, 300, 30, 'left');
                    AudioManager.playSe({ name: 'Item2', volume: 80, pitch: 100, pan: 0 });
                }
                else if (item.ero) {
                    this.contents.drawText('淫欲Ｐゲット‼︎', xx - 20, 0, 300, 30, 'left');
                    AudioManager.playSe({ name: 'Item2', volume: 80, pitch: 100, pan: 0 });
                }
                else if (item.id == 12) {
                    name = $gameVariables.value(20) + ' EXP';
                    this.contents.drawText('宝箱経験値ゲット‼︎', xx - 20, 0, 300, 30, 'left');
                    AudioManager.playSe({ name: 'Chime2', volume: 90, pitch: 100, pan: 0 });
                }
                else if (item.weaponId) {
                    var weapon = $dataWeapons[item.weaponId];
                    var weaponName = weapon.name;
                    if (!weapon.identified) {
                        switch (weapon.wtypeId) {
                            case 2:
                                name = '？剣';
                                break;
                            case 1:
                                name = '？爪';
                                break;
                            case 7:
                                name = '？弓';
                                break;
                            case 3:
                                name = '？杖';
                                break;
                        }
                    }
                    else if (item.plus > 0) {
                        name = weapon.name + ' +' + item.plus;
                    }
                    else {
                        name = weapon.name;
                    }
                    item = weapon;
                    this.contents.drawText('武器ゲット‼︎', xx - 20, 0, 300, 30, 'left');
                    if (weapon.wtypeId == 2) {
                        AudioManager.playSe({ name: 'Sword5', volume: 80, pitch: 100, pan: 0 });
                    }
                    else {
                        AudioManager.playSe({ name: 'put2', volume: 85, pitch: 100, pan: 0 });
                    }
                }
                else if (item.etypeId > 0) {
                    if (item.id >= 500) {
                        AudioManager.playSe({ name: 'put2', volume: 80, pitch: 100, pan: 0 });
                        this.contents.drawText('勲章ゲット‼︎', xx - 20, 0, 300, 30, 'left');
                    }
                    else {
                        AudioManager.playSe({ name: 'put2', volume: 80, pitch: 100, pan: 0 });
                        //this.contents.drawText('エロパーツゲット‼︎', xx - 20, 0, 300, 30, 'left');
                        this._windowBackSprite.y = 0;
                        name = name + ' ゲット！';
                        yy -= 30;
                    }
                }
                else {
                    if (item.id == 11) {
                        name = $gameVariables.value(20) + ' Ｇ';
                        this.contents.drawText('お金ゲット‼︎', xx - 20, 0, 300, 30, 'left');
                    }
                    else {
                        this.contents.drawText('アイテムゲット‼︎', xx - 20, 0, 300, 30, 'left');
                    }
                }
                this.contents.textColor = '#ffffff';
                this.contents.fontSize = 30;
                this.addIcon(item.iconIndex, 2 + xx, 1 + yy);
                this.drawTextEx(name, 43 + xx, 1 + yy, 280, 30);
                var text = item.description;
                if (item.meta && item.meta.get) {
                    text = item.meta.get;
                }
                this.drawTextEx(text, 343 + xx, 1 + yy, 600);
            };
            Window_ItemLog.prototype.update = function () {
                _super.prototype.update.call(this);
                this.appearFrame--;
                if (this.appearFrame > 0) {
                    this.opacity += 25;
                    this.contentsOpacity += 25;
                    return;
                }
                this.waitFrame--;
                if (this.waitFrame > 0) {
                    return;
                }
                this.eraseFrame--;
                this.opacity -= 25;
                this.contentsOpacity -= 25;
                this.y -= 3;
                if (this.eraseFrame === 0) {
                    this.callback();
                }
            };
            return Window_ItemLog;
        }(Window_Base));
        var Window_EroLog = /** @class */ (function (_super) {
            __extends(Window_EroLog, _super);
            function Window_EroLog(type, value, lastLv, lv, yIndex, callback) {
                var _this = _super.call(this, 0, yIndex * 40 + 4, Graphics.boxWidth, 70) || this;
                _this._margin = 0;
                _this.padding = 0;
                _this._updateContents();
                _this._type = type;
                _this._value = value;
                _this.lastLv = lastLv;
                _this.lv = lv;
                _this.yIndex = yIndex;
                _this.callback = callback;
                _this._windowFrameSprite.visible = false;
                _this._windowBackSprite.setFrame(0, 0, Graphics.boxWidth, 90 - 53);
                _this._windowBackSprite.y = 0;
                _this.backOpacity = 255;
                _this.opacity = 0;
                _this.contentsOpacity = 0;
                _this.refresh();
                _this.appearFrame = 12;
                _this.waitFrame = 90;
                _this.eraseFrame = 30;
                return _this;
            }
            Window_EroLog.prototype._refreshBack = function () {
                var m = this._margin;
                if (this._windowskin.height > 192) {
                    m += 2;
                }
                var w = this._width - m * 2;
                var h = this._height = 38;
                this._windowBackSprite.setFrame(0, 0, w, h);
                this._windowBackSprite.move(m, m);
                this._windowBackSprite._toneFilter = new ToneFilter();
                if (w > 0 && h > 0 && this._windowskin) {
                    this._windowBackSprite.destroyAndRemoveChildren();
                    var baseTexture = this.getBaseTexture();
                    if (this._windowskin.height <= 192) {
                        var p = 96;
                        var texture = new PIXI.Texture(baseTexture);
                        texture.frame = new PIXI.Rectangle(0, 0, p, p);
                        var backSprite = new PIXI.Sprite(texture);
                        backSprite.width = w;
                        backSprite.height = h;
                        this._windowBackSprite.addChild(backSprite);
                        // bitmap.blt(this._windowskin, 0, 0, p, p, 0, 0, w, h);
                        var tileTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, p, p, p));
                        var tilingSprite = new PIXI.extras.TilingSprite(tileTexture, w, h);
                        this._windowBackSprite.addChild(tilingSprite);
                        var tone = this._colorTone;
                        this._windowBackSprite._toneFilter.reset();
                        this._windowBackSprite._toneFilter.adjustTone(tone[0], tone[1], tone[2]);
                        //bitmap.adjustTone(tone[0], tone[1], tone[2]);
                    }
                    else {
                        var p = 192;
                        var tileTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, p, p, p));
                        var tilingSprite = new PIXI.extras.TilingSprite(tileTexture, w, h);
                        this._windowBackSprite.addChild(tilingSprite);
                    }
                }
            };
            ;
            Window_EroLog.prototype.refresh = function () {
                AudioManager.playSe({ name: 'Chime2', volume: 90, pitch: 100, pan: 0 });
                this.contents.clear();
                var item = this._item;
                var xx = 40;
                var yy = 30;
                this.contents.textColor = '#ff88aa';
                this.contents.fontSize = 24;
                var text;
                var icon = 84;
                switch (this._type) {
                    case 0:
                        text = '経験人数 ' + this._value + ' 人増加!!';
                        icon = Saba.KEIKEN_ICON;
                        break;
                    case 1:
                        text = '中出し回数 ' + this._value + ' 回アップ!!';
                        icon = 1711;
                        break;
                    case 2:
                        text = '口内射精回数 ' + this._value + ' 回アップ!!';
                        icon = 1708;
                        break;
                    case 3:
                        text = 'アナル射精回数 ' + this._value + ' 回アップ!!';
                        icon = 1710;
                        break;
                    case 4:
                        text = 'ぶっかけ回数 ' + this._value + ' 回アップ!!';
                        icon = 1707;
                        break;
                    case 5:
                        text = 'キス回数 ' + this._value + ' 回アップ!!';
                        icon = 1681;
                        break;
                    case 6:
                        text = '膣イキ回数 ' + this._value + ' 回アップ!!';
                        icon = 1700;
                        break;
                    case 7:
                        text = 'クリイキ回数 ' + this._value + ' 回アップ!!';
                        icon = 1698;
                        break;
                    case 8:
                        text = '乳首イキ回数 ' + this._value + ' 回アップ!!';
                        icon = 1696;
                        break;
                    case 9:
                        text = 'アナルイキ回数 ' + this._value + ' 回アップ!!';
                        icon = 1710;
                        break;
                    case 20:
                        text = '膣開発度 ' + this._value + ' ptアップ!!';
                        icon = Saba.KAIRAKU_ICON;
                        break;
                    case 21:
                        text = 'クリ開発度 ' + this._value + ' ptアップ!!';
                        icon = Saba.KAIRAKU_ICON;
                        break;
                    case 22:
                        text = '乳首開発度 ' + this._value + ' ptアップ!!';
                        icon = Saba.KAIRAKU_ICON;
                        break;
                    case 23:
                        text = 'アナル開発度 ' + this._value + ' ptアップ!!';
                        icon = Saba.KAIRAKU_ICON;
                        break;
                    case 24:
                        text = 'Ｍっ気 ' + this._value + ' ptアップ!!';
                        icon = 100;
                        break;
                }
                this.contents.textColor = '#ffffff';
                this.contents.fontSize = 30;
                this.drawIcon(icon, 2 + xx, 1);
                this.drawTextEx(text, 43 + xx, 1);
            };
            Window_EroLog.prototype.update = function () {
                _super.prototype.update.call(this);
                this.appearFrame--;
                if (this.appearFrame > 0) {
                    this.opacity += 25;
                    this.contentsOpacity += 25;
                    return;
                }
                this.waitFrame--;
                if (this.waitFrame > 0) {
                    return;
                }
                this.eraseFrame--;
                this.opacity -= 25;
                this.contentsOpacity -= 25;
                this.y -= 3;
                if (this.eraseFrame === 0) {
                    this.callback();
                }
            };
            return Window_EroLog;
        }(Window_Base));
        Game_Temp.prototype.addEroLog = function (item) {
            this._eroLog = this._eroLog || [];
            this._eroLog.push(item);
        };
        Game_Temp.prototype.nextEroLog = function () {
            this._eroLog = this._eroLog || [];
            if (this._eroLog.length === 0) {
                return null;
            }
            return this._eroLog.shift();
        };
        Game_Temp.prototype.addItemLog = function (item) {
            this._itemLog = this._itemLog || [];
            this._itemLog.push(item);
        };
        Game_Temp.prototype.nextItemLog = function () {
            this._itemLog = this._itemLog || [];
            if (this._itemLog.length === 0) {
                return null;
            }
            return this._itemLog.shift();
        };
        var _Game_Party_gainItem = Game_Party.prototype.gainItem;
        Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
            if (amount > 0 && $gameSwitches.value(1)) {
                $gameTemp.addItemLog(item);
            }
            _Game_Party_gainItem.call(this, item, amount, includeEquip);
        };
        var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
        Scene_Map.prototype.updateMain = function () {
            _Scene_Map_updateMain.call(this);
            if (this._waitLog > 0) {
                this._waitLog--;
                return;
            }
            var window;
            var logItem = $gameTemp.nextItemLog();
            if (logItem) {
                this._logWindowList = this._logWindowList || [];
                var yIndex = this.getLogWindowY();
                window = new Window_ItemLog(logItem, yIndex, onFinish);
                this._logWindowList.push(window);
                this.addWindow(window);
                var self = this;
                function onFinish() {
                    //window.returnCanvas();
                    self._windowLayer.removeChild(window);
                    self._logWindowList.splice(self._logWindowList.indexOf(window), 1);
                    window.destroyAndRemoveChildren();
                }
                ;
            }
            else {
                var logItem = $gameTemp.nextEroLog();
                if (logItem) {
                    this._logWindowList = this._logWindowList || [];
                    var yIndex = this.getLogWindowY();
                    window = new Window_EroLog(logItem[0], logItem[1], logItem[2], logItem[3], yIndex, onFinish2);
                    this._logWindowList.push(window);
                    this.addWindow(window);
                    var self = this;
                    function onFinish2() {
                        //window.returnCanvas();
                        self._windowLayer.removeChild(window);
                        self._logWindowList.splice(self._logWindowList.indexOf(window), 1);
                        window.destroyAndRemoveChildren();
                    }
                    ;
                    this._waitLog = 4;
                }
            }
        };
        Scene_Map.prototype.getLogWindowY = function () {
            for (var i = 0; i < 14; i++) {
                var found = false;
                for (var _i = 0, _a = this._logWindowList; _i < _a.length; _i++) {
                    var log = _a[_i];
                    if (log.yIndex === i) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    return i;
                }
            }
            return 0;
        };
    })(ItemLogWindow || (ItemLogWindow = {}));
})(Saba || (Saba = {}));

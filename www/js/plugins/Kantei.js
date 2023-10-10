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
    Game_Interpreter.prototype.hasKanteiItem = function () {
        var weapons = $gameParty.weapons();
        for (var _i = 0, weapons_1 = weapons; _i < weapons_1.length; _i++) {
            var weapon = weapons_1[_i];
            if (!weapon.weapon.identified) {
                return true;
            }
        }
        return false;
    };
    var Scene_Kantei = /** @class */ (function (_super) {
        __extends(Scene_Kantei, _super);
        function Scene_Kantei() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_Kantei.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createMedalWindow();
        };
        Scene_Kantei.prototype.update = function () {
            _super.prototype.update.call(this);
            if (Input.isTriggered('ok') || Input.isTriggered('cancel')) {
                if (this._kanteiWindow.isFinished()) {
                    SoundManager.playOk();
                    this.popScene();
                }
            }
        };
        Scene_Kantei.prototype.createMedalWindow = function () {
            this._kanteiWindow = new Window_Kantei();
            this._kanteiWindow.refresh();
            this.addWindow(this._kanteiWindow);
        };
        return Scene_Kantei;
    }(Scene_MenuBase));
    Saba.Scene_Kantei = Scene_Kantei;
    var WAIT_FRAME = 30;
    var Window_Kantei = /** @class */ (function (_super) {
        __extends(Window_Kantei, _super);
        function Window_Kantei() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_Kantei.prototype.initialize = function () {
            _super.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
        };
        Window_Kantei.prototype.refresh = function () {
            this.createItemList();
            _super.prototype.refresh.call(this);
            this.changeTextColor(this.crisisColor());
            if (this.isFinished()) {
                SoundManager.playShop();
                this.drawText('完了しました！', 30, 30, 400);
            }
            else {
                this.drawText('未識別アイテムを識別します', 30, 30, 400);
            }
        };
        Window_Kantei.prototype.isFinished = function () {
            return this._identifyIndex >= this.maxItems() && this._waitFrame == 0;
        };
        Window_Kantei.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._waitFrame > 0) {
                this._waitFrame--;
                if (this._waitFrame == 0) {
                    if (this.isFinished()) {
                        this.refresh();
                        return;
                    }
                    this._waitFrame = WAIT_FRAME;
                    var weapon = this._weaponList[this._identifyIndex];
                    weapon.weapon.identified = true;
                    if (weapon.obj().meta['rare']) {
                        $gameMedals.onRare();
                    }
                    this._identifyIndex++;
                    this.refresh();
                    AudioManager.playSe({ name: 'button57', volume: 80, pitch: 100, pan: 0 });
                }
            }
        };
        Window_Kantei.prototype.createItemList = function () {
            if (this._weaponList) {
                return;
            }
            this._weaponList = [];
            var weapons = $gameParty.weapons();
            for (var _i = 0, weapons_2 = weapons; _i < weapons_2.length; _i++) {
                var weapon = weapons_2[_i];
                if (!weapon.weapon.identified) {
                    this._weaponList.push(weapon);
                }
            }
            this._identifyIndex = 0;
            this._waitFrame = WAIT_FRAME;
        };
        Window_Kantei.prototype.maxItems = function () {
            if (!this._weaponList) {
                return 0;
            }
            return this._weaponList.length;
        };
        Window_Kantei.prototype.maxCols = function () {
            return 2;
        };
        Window_Kantei.prototype.drawItem = function (index) {
            var rect = this.itemRect(index);
            var weapon = this._weaponList[index];
            this.drawWeaponName(weapon, rect.x, rect.y, 300);
        };
        Window_Kantei.prototype.itemRect = function (index) {
            var rect = _super.prototype.itemRect.call(this, index);
            rect.x += 80;
            rect.y += 100;
            return rect;
        };
        Window_Kantei.prototype.itemWidth = function () {
            return _super.prototype.itemWidth.call(this) - 80;
        };
        return Window_Kantei;
    }(Window_Selectable));
})(Saba || (Saba = {}));

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
    var Scene_WeaponPowerup = /** @class */ (function (_super) {
        __extends(Scene_WeaponPowerup, _super);
        function Scene_WeaponPowerup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_WeaponPowerup.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createHelpWindow();
            this.createPowerupWindow();
            this.createConfitmWindow();
            this._notice = new Sprite_Notice();
            this.addChild(this._notice);
            this.refreshNotice();
        };
        Scene_WeaponPowerup.prototype.createConfitmWindow = function () {
            this._confirmWindow = new Saba.Window_Confirm();
            this._confirmWindow.setText('強化しますか？');
            this._confirmWindow.setHandler('ok', this.onConfirmOk.bind(this));
            this._confirmWindow.setHandler('cancel', this.onConfirmCancel.bind(this));
            this._confirmWindow.deactivate();
            this.addWindow(this._confirmWindow);
            this._confirmWindow.hide();
        };
        Scene_WeaponPowerup.prototype.createPowerupWindow = function () {
            this._powerupWindow = new Window_WeaponPowerup(this._helpWindow.y + this._helpWindow.height);
            this.addWindow(this._powerupWindow);
            this._powerupWindow.setHandler('change', this.onChange.bind(this));
            this._powerupWindow.setHandler('ok', this.onOk.bind(this));
            this._powerupWindow.setHandler('cancel', this.onCancel.bind(this));
            this._powerupWindow.activate();
            this._powerupWindow.select(0);
        };
        Scene_WeaponPowerup.prototype.createHelpWindow = function () {
            this._helpWindow = new Window_Help();
            this._helpWindow.y = 44;
            this.addWindow(this._helpWindow);
        };
        Scene_WeaponPowerup.prototype.onChange = function () {
            this._helpWindow.setItem(this._powerupWindow.item());
        };
        Scene_WeaponPowerup.prototype.onOk = function () {
            if (this._baseWeapon == null) {
                this._baseWeapon = this._powerupWindow.item();
                if (this._baseWeapon.isMax()) {
                    SoundManager.playBuzzer();
                    this._baseWeapon = null;
                    this._powerupWindow.activate();
                    return;
                }
                this._powerupWindow.setBase(this._baseWeapon);
                this._powerupWindow.activate();
            }
            else {
                var materialWeapon = this._powerupWindow.item();
                if (!this._powerupWindow.isEnabled(materialWeapon) || materialWeapon.weapon.id == this._baseWeapon.weapon.id) {
                    SoundManager.playBuzzer();
                    this._powerupWindow.activate();
                    return;
                }
                this._materialWeapon = materialWeapon;
                this._confirmWindow.setInfo(true);
                this._confirmWindow.show();
                this._confirmWindow.activate();
            }
            SoundManager.playOk();
            this.refreshNotice();
        };
        Scene_WeaponPowerup.prototype.onCancel = function () {
            if (this._materialWeapon) {
                this._materialWeapon = null;
            }
            else if (this._baseWeapon) {
                this._baseWeapon = null;
                this._powerupWindow.setBase(null);
            }
            else {
                this.popScene();
                return;
            }
            this._powerupWindow.activate();
            this.refreshNotice();
        };
        Scene_WeaponPowerup.prototype.onConfirmOk = function () {
            SoundManager.playShop();
            this._confirmWindow.hide();
            this._confirmWindow.deactivate();
            this._baseWeapon.weapon.plus++;
            $gameParty.loseItem(this._materialWeapon, 1);
            this._materialWeapon = null;
            this._powerupWindow.refresh();
            this._powerupWindow.activate();
        };
        Scene_WeaponPowerup.prototype.onConfirmCancel = function () {
            this._confirmWindow.deactivate();
            this._confirmWindow.hide();
            this._materialWeapon = null;
            this._powerupWindow.activate();
            this.refreshNotice();
        };
        Scene_WeaponPowerup.prototype.refreshNotice = function () {
            if (this._baseWeapon == null) {
                this._notice.drawText('強化のベースとなる武器を選択してください');
            }
            else if (this._materialWeapon == null) {
                this._notice.drawText('素材となる武器を選択してください');
            }
        };
        return Scene_WeaponPowerup;
    }(Scene_MenuBase));
    Saba.Scene_WeaponPowerup = Scene_WeaponPowerup;
    var Sprite_Notice = /** @class */ (function (_super) {
        __extends(Sprite_Notice, _super);
        function Sprite_Notice() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_Notice.prototype.initialize = function () {
            _super.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, 44);
            this.bitmap = new Bitmap(Graphics.boxWidth, 44);
            this.bitmap.textColor = '#FF0';
        };
        Sprite_Notice.prototype.drawText = function (text) {
            this.bitmap.clear();
            this.bitmap.drawText(text, 8, 5, 1000, 32, 'left');
        };
        return Sprite_Notice;
    }(Sprite_Base));
    var Window_WeaponPowerup = /** @class */ (function (_super) {
        __extends(Window_WeaponPowerup, _super);
        function Window_WeaponPowerup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_WeaponPowerup.prototype.initialize = function (y) {
            _super.prototype.initialize.call(this, 0, y, Graphics.boxWidth, Graphics.boxHeight - y);
            this.refresh();
        };
        Window_WeaponPowerup.prototype.setBase = function (weapon) {
            this._baseWeapon = weapon;
            this.refresh();
        };
        Window_WeaponPowerup.prototype.refresh = function () {
            this.makeItemList();
            this.createContents();
            this.drawAllItems();
            if (this._index >= this.maxItems()) {
                this._index--;
            }
        };
        Window_WeaponPowerup.prototype.item = function () {
            var i = this._items[this._index];
            if (i) {
                return i[0];
            }
            else {
                return null;
            }
        };
        Window_WeaponPowerup.prototype.makeItemList = function () {
            var items = [];
            var weapon;
            for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
                var actor = _a[_i];
                for (var _b = 0, _c = actor.weapons(); _b < _c.length; _b++) {
                    weapon = _c[_b];
                    if (weapon) {
                        items.push([weapon, actor]);
                    }
                }
            }
            for (var _d = 0, _e = $gameParty.weapons(); _d < _e.length; _d++) {
                weapon = _e[_d];
                if (weapon && weapon.weapon.identified) {
                    items.push([weapon, null]);
                }
            }
            this._items = items;
        };
        Window_WeaponPowerup.prototype.drawItem = function (index) {
            var item = this._items[index];
            if (item) {
                var rect = this.itemRect(index);
                rect.width -= this.textPadding();
                this.drawItemName2(item, rect);
            }
        };
        Window_WeaponPowerup.prototype.maxItems = function () {
            if (!this._items) {
                return 0;
            }
            return this._items.length;
        };
        Window_WeaponPowerup.prototype.getFaceSprite = function (actor) {
            var face = Saba.getSystemBaseTexture('face_01');
            var index = actor.actorId();
            return new PIXI.Sprite(new PIXI.Texture(face, new PIXI.Rectangle(118 * (index - 1) + 10, 14, 44, 42)));
        };
        Window_WeaponPowerup.prototype.maxCols = function () {
            return 2;
        };
        Window_WeaponPowerup.prototype.itemHeight = function () {
            return 44;
        };
        Window_WeaponPowerup.prototype.drawItemName2 = function (array, rect) {
            var x = rect.x;
            var y = rect.y;
            var width = rect.width;
            if (array) {
                var item = array[0];
                if (this._baseWeapon) {
                    if (item.weapon.id == this._baseWeapon.weapon.id) {
                        this.contents.fillRect(x, y, width + 5, rect.height, 'rgba(255, 255, 0, 0.6)');
                    }
                }
                var actor = array[1];
                var enable = this.isEnabled(item);
                this.changePaintOpacity(enable);
                var iconBoxWidth = Window_Base._iconWidth + 4;
                if (actor) {
                    var s = this.getFaceSprite(actor);
                    s.x = x + 2;
                    s.y = y + 2;
                    if (!enable) {
                        s.alpha = 10;
                    }
                    this._windowContentsSprite.addChild(s);
                }
                this.drawWeaponName(item, x + 2 + 48, y + 2);
                this.changePaintOpacity(true);
                //this.resetTextColor();
                //this.drawIcon(item.iconIndex(), x + 2 + 48, y + 4);
                //this.drawText(item.name(), x + iconBoxWidth + 48, y + 2, width - iconBoxWidth);
            }
        };
        Window_WeaponPowerup.prototype.isEnabled = function (weapon) {
            if (!this._baseWeapon) {
                if (weapon.isMax()) {
                    return false;
                }
                return true;
            }
            if (weapon == this._baseWeapon) {
                return false;
            }
            return weapon.obj().wtypeId == this._baseWeapon.obj().wtypeId;
        };
        Window_WeaponPowerup.prototype.playOkSound = function () {
        };
        return Window_WeaponPowerup;
    }(Window_Selectable));
})(Saba || (Saba = {}));

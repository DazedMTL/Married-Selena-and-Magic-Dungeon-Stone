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
//=============================================================================
// Saba_BattleTachie.js
//=============================================================================
/*:ja
 * @author Sabakan
 * @plugindesc 戦闘中に立ち絵を表示するプラグインです
 *
 * @param appearX
 * @desc アクターコマンド選択中の x 座標です
 * @default 400
 *
 * @param hiddenX
 * @desc アクターコマンド非選択中の x 座標です
 * @default 900
 *
 * @param speed
 * @desc 立ち絵が移動する時の速度です
 * @default 150
 *
 * @help
 * Ver
 *
 */
var Saba;
(function (Saba) {
    var BattleTachie;
    (function (BattleTachie) {
        var parameters = PluginManager.parameters('Saba_BattleTachie');
        var appearX = parseInt(parameters['appearX']);
        var hiddenX = parseInt(parameters['hiddenX']);
        var speed = parseInt(parameters['speed']);
        var _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
        Scene_Battle.prototype.createActorCommandWindow = function () {
            this._tachieSprite = new TachieSprite();
            this._spriteset.addChild(this._tachieSprite);
            _Scene_Battle_createActorCommandWindow.call(this);
            this._tachieSprite.setActorCommandWindow(this._actorCommandWindow);
        };
        var _Scene_Battle_prototype_createItemWindow = Scene_Battle.prototype.createItemWindow;
        Scene_Battle.prototype.createItemWindow = function () {
            _Scene_Battle_prototype_createItemWindow.call(this);
            this._tachieSprite.setSkillWindow(this._skillWindow);
            this._tachieSprite.setItemWindow(this._itemWindow);
        };
        var _Scene_Battle_create = Scene_Battle.prototype.create;
        Scene_Battle.prototype.create = function () {
            _Scene_Battle_create.call(this);
            for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
                var actor = _a[_i];
                actor.preloadTachie();
            }
        };
        var TachieSprite = /** @class */ (function (_super) {
            __extends(TachieSprite, _super);
            function TachieSprite() {
                var _this = this;
                var bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
                _this = _super.call(this) || this;
                _this.hiddenX = hiddenX;
                _this.appearedX = appearX + 40;
                _this.speed = speed;
                _this.bitmap = bitmap;
                _this.x = _this.hiddenX;
                _this.y = 20;
                return _this;
            }
            TachieSprite.prototype.setActorCommandWindow = function (commandWindow) {
                this._commandWindow = commandWindow;
            };
            TachieSprite.prototype.setSkillWindow = function (skillWindow) {
                this._skillWindow = skillWindow;
            };
            TachieSprite.prototype.setItemWindow = function (itemWindow) {
                this._itemWindow = itemWindow;
            };
            TachieSprite.prototype.update = function () {
                this.moveToTargetPosition();
                _super.prototype.update.call(this);
                this.updateTachie();
            };
            TachieSprite.prototype.updateTachie = function () {
                if (!this._commandWindow || !this._commandWindow._actor) {
                    return;
                }
                var id = this._commandWindow._actor.actorId();
                if (id == 2 && !$gameSwitches.value(436)) {
                    if (!$gameSwitches.value(568)) {
                        id = 5;
                    }
                }
                if (id != this.actorId) {
                    if (this.x == this.hiddenX) {
                        this.bitmap.clear();
                        if (id > 0) {
                            var face = 3;
                            switch (id) {
                                case 1:
                                    face = 11;
                                    break;
                                case 2:
                                    face = 3;
                                    break;
                                case 3:
                                    face = 3;
                                    break;
                                case 4:
                                    face = 8;
                                    break;
                            }
                            var actor = $gameActors.actor(id);
                            if (!actor.isMercenary() && actor.defaultFaceId > 1) {
                                face = actor.defaultFaceId;
                            }
                            var success = this.drawTachieActor(actor, null, 0, 0, null, face, 1, true);
                            if (success) {
                                this.actorId = id;
                            }
                        }
                    }
                    else if (this.x == this.appearedX) {
                        this.hidden = true;
                    }
                }
                else {
                    if (this.actorId >= 14) {
                        this.hidden = true;
                    }
                    else if ($gameTemp.analyze) {
                        this.hidden = true;
                    }
                    else if ($gameTroop.isEventRunning()) {
                        this.hidden = true;
                    }
                    else if (this._skillWindow.active || this._itemWindow.active) {
                        this.hidden = false;
                    }
                    else if (!this._commandWindow || !this._commandWindow.active) {
                        this.hidden = true;
                    }
                    else {
                        this.hidden = false;
                    }
                }
            };
            TachieSprite.prototype.moveToTargetPosition = function () {
                if (this.hidden) {
                    if (Math.abs(this.hiddenX - this.x) < this.speed) {
                        this.x = this.hiddenX;
                    }
                    else if (this.hiddenX > this.x) {
                        this.x += this.speed;
                    }
                    else {
                        this.x -= this.speed;
                    }
                }
                else {
                    if (Math.abs(this.appearedX - this.x) < this.speed) {
                        this.x = this.appearedX;
                    }
                    else if (this.appearedX > this.x) {
                        this.x += this.speed;
                    }
                    else {
                        this.x -= this.speed;
                    }
                }
            };
            return TachieSprite;
        }(Sprite_Base));
    })(BattleTachie = Saba.BattleTachie || (Saba.BattleTachie = {}));
})(Saba || (Saba = {}));

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
    var _Game_Enemy_prototype_performDamage = Game_Enemy.prototype.performDamage;
    Game_Enemy.prototype.performDamage = function () {
        _Game_Enemy_prototype_performDamage.call(this);
        if (this._damageHandler) {
            //this._damageHandler();
        }
    };
    var _Game_Enemy_prototype_initMembers = Game_Enemy.prototype.initMembers;
    Game_Enemy.prototype.initMembers = function () {
        _Game_Enemy_prototype_initMembers.call(this);
        this._stun = 0;
    };
    Sprite_Enemy.prototype.updateStateSprite = function () {
        this._stateIconSprite.y = -50;
    };
    Game_Battler.prototype.stunRate = function () {
        return 0;
    };
    Game_Battler.prototype.clearStun = function () {
        this._stun = 0;
    };
    Game_Enemy.prototype.stunRate = function () {
        var rate = this._stun / this.luk;
        if (rate > 1) {
            return 1;
        }
        return rate;
    };
    var Sprite_EnemyHp = /** @class */ (function (_super) {
        __extends(Sprite_EnemyHp, _super);
        function Sprite_EnemyHp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_EnemyHp.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            var members = $gameTroop.aliveMembers();
            for (var i = 0; i < members.length; i++) {
                var enemy = members[i];
                enemy._damageHandler = this.refresh.bind(this);
            }
            this.bitmap = new Bitmap(1024, 768);
            this._updated = true;
            this.refresh();
        };
        Sprite_EnemyHp.prototype.update = function () {
            this._updated = true;
            _super.prototype.update.call(this);
        };
        Sprite_EnemyHp.prototype.refresh = function () {
            if ($gameSwitches.value(26)) {
                return;
            }
            if (!this._updated) {
                return;
            }
            this._updated = false;
            var baseY = 490 + 10;
            this.bitmap.clear();
            this.destroyAndRemoveChildren();
            var members = $gameTroop.aliveMembers();
            for (var i = 0; i < members.length; i++) {
                var enemy = members[i];
                this._drawEnemy(enemy, baseY);
            }
        };
        Sprite_EnemyHp.prototype._drawEnemy = function (enemy, baseY) {
            var x = enemy.screenX();
            this._drawBg(enemy, x, baseY);
            x -= 15;
            this._drawHp(enemy, x, baseY);
            this._drawStun(enemy, x, baseY);
            this._drawIcon(enemy, x, baseY);
            if ($gameTemp.analyze) {
                this._drawEnemyAction(enemy, x, baseY);
            }
        };
        Sprite_EnemyHp.prototype._drawEnemyAction = function (enemy, screenX, baseY) {
            var y = baseY - 320;
            var w = 200;
            var x = screenX - w / 2;
            this.bitmap.fontSize = 20;
            var h = 34;
            var ww = 10;
            var e = enemy.enemy();
            for (var i = 0; i < 3; i++) {
                this._drawEnemyStatus(enemy, i, x, y, w, h, ww);
                y += h;
            }
            y += 20;
            for (var _i = 0, _a = e.actions; _i < _a.length; _i++) {
                var action = _a[_i];
                this.bitmap.fontSize = 20;
                var skill = $dataSkills[action.skillId];
                if (!skill) {
                    continue;
                }
                this.bitmap.fillRect(x - ww, y, w + ww * 2, h, 'rgba(0, 0, 0, 0.6)');
                var iconIndex;
                if (skill.hitType == 0) {
                    iconIndex = 127;
                }
                else if (skill.hitType == 1) {
                    iconIndex = 76;
                }
                else {
                    iconIndex = 79;
                }
                this.drawIcon(iconIndex, x - 1, y + 2);
                this.bitmap.drawText(skill.name, x + 34, y, 140, h, 'left');
                /*if (skill.meta['駆動']) {
                    var hh = 20;
                    var sprite = getSystemImage('clock');
                    sprite.x = x + 168;
                    sprite.y = y + 9;
                    this.addChild(sprite);
                    this.bitmap.fontSize = 14;
                    this.bitmap.drawText(skill.meta['駆動'], x + 186, y + 7, 140, hh, 'left');
                }*/
                y += h;
            }
        };
        Sprite_EnemyHp.prototype._drawEnemyStatus = function (enemy, type, x, y, w, h, ww) {
            var n = 0;
            var name = '';
            switch (type) {
                case 0:
                    n = enemy.atk2();
                    name = '攻撃力';
                    break;
                case 1:
                    n = enemy.def2();
                    name = '防御力';
                    break;
                case 2:
                    n = enemy.mdf2();
                    name = '魔防力';
                    break;
                case 3:
                    n = enemy.agi;
                    name = '素早さ';
                    break;
            }
            this.bitmap.fillRect(x - ww, y, w + ww * 2, h, 'rgba(0, 0, 0, 0.6)');
            this.bitmap.drawText(name, x, y, w, h, 'left');
            this.bitmap.drawText(n + '', x, y, 85, h, 'right');
            var gauge = n;
            switch ($gameVariables.value(2)) {
                case 0:
                case 1:
                    gauge *= 8;
                    break;
                case 2:
                    gauge *= 1.5;
                    break;
                case 3:
                    gauge *= 1.5;
                    break;
            }
            var color = 12;
            if (gauge > 110) {
                gauge = 110;
                color = 2;
            }
            this.bitmap.gradientFillRect(x + 92, y + 11, gauge, 10, this.textColor(color), this.textColor(color));
        };
        Sprite_EnemyHp.prototype._drawBg = function (enemy, screenX, baseY) {
            var baseTexture = Saba.getSystemBaseTexture('hp_back');
            var h = 51;
            if (enemy.luk == 1) {
                h = 40;
            }
            var bg = new PIXI.Sprite(new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 0, 200, h)));
            bg.x = screenX - 110;
            bg.y = baseY - 4;
            this.addChild(bg);
        };
        Sprite_EnemyHp.prototype._drawHp = function (enemy, screenX, baseY) {
            var x = screenX;
            //this.drawHP(x - 60, baseY - 4, 0);
            var gauge = Saba.getSystemBaseTexture('stun_gauge');
            var text = new PIXI.Sprite(new PIXI.Texture(gauge, new PIXI.Rectangle(40, 30, 40, 10)));
            text.x = x - 41;
            text.y = baseY + 19;
            this.addChild(text);
            if (enemy.mhp >= 100) {
                x += 24;
            }
            this.drawNumber(enemy.hp, x - 58, baseY, 90, 'right');
        };
        Sprite_EnemyHp.prototype._drawStun = function (enemy, screenX, baseY) {
            if (enemy.luk == 1) {
                return;
            }
            var w = enemy.luk * 3;
            switch ($gameVariables.value(1)) {
                case 1:
                    w = enemy.luk * 5;
                    break;
                case 2:
                    w = enemy.luk * 2;
                    break;
                case 3:
                    w = enemy.luk * 1.6;
                    break;
                case 4:
                    w = enemy.luk * 1;
                    break;
                case 5:
                    w = enemy.luk * 1;
                    break;
                case 6:
                    w = enemy.luk * 1;
                    break;
            }
            if (w > 100) {
                w = 100;
            }
            w = Math.floor(w);
            var isStun = enemy.stunRate() == 1;
            var yy = baseY + 33;
            var xx = screenX - 18;
            var gauge = Saba.getSystemBaseTexture('stun_gauge');
            if (isStun) {
                var text = new PIXI.Sprite(new PIXI.Texture(gauge, new PIXI.Rectangle(80, 32, 40, 8)));
            }
            else {
                var text = new PIXI.Sprite(new PIXI.Texture(gauge, new PIXI.Rectangle(0, 32, 40, 8)));
            }
            text.x = xx - 40;
            text.y = yy;
            this.addChild(text);
            var bg = new PIXI.Sprite(new PIXI.Texture(gauge, new PIXI.Rectangle(0, 0, w, 8)));
            bg.x = xx;
            bg.y = yy;
            this.addChild(bg);
            var barBack = new PIXI.Sprite(new PIXI.Texture(gauge, new PIXI.Rectangle(0, 22, w - 2, 6)));
            barBack.x = xx + 1;
            barBack.y = yy + 1;
            this.addChild(barBack);
            var ww = w * enemy.stunRate() - 2;
            if (ww > 0) {
                if (isStun) {
                    var bar = new PIXI.Sprite(new PIXI.Texture(gauge, new PIXI.Rectangle(0, 42, ww, 6)));
                }
                else {
                    var bar = new PIXI.Sprite(new PIXI.Texture(gauge, new PIXI.Rectangle(0, 12, ww, 6)));
                }
                bar.x = xx + 1;
                bar.y = yy + 1;
                this.addChild(bar);
            }
        };
        Sprite_EnemyHp.prototype._drawIcon = function (enemy, screenX, baseY) {
            var icons = enemy.allIcons();
            var x = screenX - 60;
            var states = enemy.states().map(function (state) {
                return state;
            }).filter(function (state) {
                return state.iconIndex > 0;
            });
            var interval = 34;
            for (var _i = 0, states_1 = states; _i < states_1.length; _i++) {
                var state = states_1[_i];
                var iconIndex = state.iconIndex;
                var sprite = getIconSprite(iconIndex, false);
                var turn = enemy._stateTurns[state.id];
                sprite.x = x;
                sprite.y = baseY - 36;
                this.addChild(sprite);
                if (state.autoRemovalTiming > 0) {
                    this.drawNumber(turn, x + 7, sprite.y + 2, 40, 'left', 9);
                }
                x += interval;
            }
            for (var paramId = 0; paramId < enemy._buffs.length; paramId++) {
                var buffLevel = enemy._buffs[paramId];
                if (buffLevel == 0) {
                    continue;
                }
                var turn = enemy._buffTurns[paramId];
                if (turn <= 0) {
                    continue;
                }
                var iconIndex = 0;
                ;
                if (buffLevel > 0) {
                    iconIndex = Game_BattlerBase.ICON_BUFF_START + (buffLevel - 1) * 8 + paramId;
                }
                else {
                    iconIndex = Game_BattlerBase.ICON_DEBUFF_START + (-buffLevel - 1) * 8 + paramId;
                }
                var sprite = getIconSprite(iconIndex, false);
                sprite.x = x;
                sprite.y = baseY - 36;
                this.addChild(sprite);
                this.drawNumber(turn, x + 7, sprite.y + 2, 40, 'left', 9);
                x += interval;
            }
        };
        return Sprite_EnemyHp;
    }(Sprite_Base));
    Saba.Sprite_EnemyHp = Sprite_EnemyHp;
    /*
        Game_BattlerBase.prototype.buffIcons = function () {
            var icons = [];
            for (var i = 0; i < this._buffs.length; i++) {
                if (this._buffs[i] !== 0 && this._buffTurns[i] > 0) {
                    icons.push(this.buffIconIndex(this._buffs[i], i));
                }
            }
            return icons;
        };
    */
    function getIconSprite(iconIndex, isSmall) {
        var pw, ph;
        var file;
        if (isSmall) {
            pw = ph = 24;
            file = 'IconSetMini';
            if (iconIndex >= 1600) {
                iconIndex = 0;
            }
        }
        else {
            file = 'IconSet';
            pw = ph = 32;
        }
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        var baseTexture = Saba.getSystemBaseTexture(file);
        var rect = new PIXI.Rectangle(sx, sy, pw, ph);
        return new PIXI.Sprite(new PIXI.Texture(baseTexture, rect));
    }
    Saba.getIconSprite = getIconSprite;
    var _Spriteset_Battle_prototype_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer = function () {
        _Spriteset_Battle_prototype_createLowerLayer.call(this);
        var enemyHp = new Sprite_EnemyHp();
        this.addChild(enemyHp);
        this._enemyHpSprite = enemyHp;
    };
    Spriteset_Battle.prototype.refreshHp = function () {
        this._enemyHpSprite.refresh();
    };
    Sprite_Enemy.prototype.damageOffsetY = function () {
        return -50;
    };
    Sprite_Enemy.prototype.createStateIconSprite = function () {
        this._stateIconSprite = new Sprite_StateIcon();
    };
})(Saba || (Saba = {}));

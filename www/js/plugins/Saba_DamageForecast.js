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
    var Sprite_DamageForecast = /** @class */ (function (_super) {
        __extends(Sprite_DamageForecast, _super);
        function Sprite_DamageForecast() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_DamageForecast.prototype.initialize = function () {
            Sprite_Base.prototype.initialize.call(this);
            this.createBitmap();
            this.update();
            this.visible = true;
            var self = this;
            this.on('removed', function () {
                Saba.putContentsCache(self.bitmap, self.bitmap.width, self.bitmap.height);
            });
        };
        Sprite_DamageForecast.prototype.createBitmap = function () {
            var b = Saba.getContentsCache(1024, 348);
            if (b) {
                this.bitmap = b;
                this.bitmap.clear();
            }
            else {
                this.bitmap = new Bitmap(1024, 348);
            }
            this.windowskin = ImageManager.loadSystem('Window');
            this.numBase = new PIXI.Sprite();
            this.addChild(this.numBase);
        };
        Sprite_DamageForecast.prototype.showEnemy = function (actor, item, enemy) {
            this.show();
            this.y = 270;
            this.bitmap.clear();
            this.numBase.destroyAndRemoveChildren();
            if ([2].contains(item.scope) || [3, 4, 5, 6].contains(item.scope)) {
                for (var _i = 0, _a = $gameTroop.aliveMembers(); _i < _a.length; _i++) {
                    var e = _a[_i];
                    var ee = e;
                    this.showEnemyOne(actor, item, ee);
                }
            }
            else {
                this.showEnemyOne(actor, item, enemy);
            }
        };
        Sprite_DamageForecast.prototype.changePaintOpacity = function (enabled) {
            this.bitmap.paintOpacity = enabled ? 255 : 160;
        };
        Sprite_DamageForecast.prototype.showEnemyOne = function (actor, item, enemy) {
            this.setNormalColor();
            var width = 160;
            var x = enemy.screenX() - width / 2;
            if (enemy.enemy().meta['hp']) {
                x = Math.floor(enemy.enemy().meta['hp']) - width / 2;
            }
            var color = 'rgba(0,0,0,0.5)';
            var action = actor.currentAction();
            var damage = 0;
            var hit = Math.floor((action.itemHit(enemy) - action.itemEva(enemy)) * 100);
            var alwaysHit = action.isAlwaysHit();
            if (alwaysHit) {
                if (action.isPhysical() && hit < 0) {
                    alwaysHit = false;
                }
                else {
                    hit = 100;
                }
            }
            if (action.isHpEffect()) {
                damage = action.makeDamageValue(enemy, false);
                damage *= item.repeats;
            }
            var yy = 30;
            this.bitmap.fillRect(x, yy, width, 200, color);
            var y = 38 + yy;
            this.bitmap.fontSize = 46;
            //this.bitmap.drawText(damage + '', x + 30, 4, 50, 40, 'right');
            this.drawNumber(damage, x - 30, 4 + yy, 110, 'right', 7);
            //this.bitmap.fontFace = 'MyricaM';
            this.bitmap.fontSize = 14;
            this.bitmap.drawText(TextManager.damage, x + 84, 4 + 8 + yy, 100, 40, 'left');
            var left = x + 10;
            var center = x + 90;
            var right = x + 34;
            var interval = 32;
            this.bitmap.fontSize = 20;
            if (true) {
                this.bitmap.drawText(TextManager.hitRate, left, y, 100, 40, 'left');
                this.bitmap.drawText(':', center, y - 1, 100, 40, 'left');
                if (!enemy.canMove() || alwaysHit) {
                    this.setYellowColor();
                    this.bitmap.drawText(TextManager.alwaysHit, right + 6, y, 104, 40, 'right');
                }
                else if (hit >= 100) {
                    this.drawNumber(hit, right, y, 104, 'right', 9);
                    this.drawPercent(right + 98, y, 2);
                }
                else {
                    if (hit < 0) {
                        hit = 0;
                    }
                    this.drawNumber(hit, right, y, 104, 'right', 8);
                    this.drawPercent(right + 98, y, 1);
                }
                //this.bitmap.drawText('%', right, y, 115, 40, 'right');
                y += interval;
            }
            /*if (action.isAlwaysCri(enemy, hit)) {
                this.setYellowColor();
                this.bitmap.drawText('狙い撃ち', left, y - 104, 100, 40, 'left');
            }
            if (action.getGonosen(enemy) > 1) {
                this.setYellowColor();
                this.bitmap.drawText('後の先', left, y - 104, 100, 40, 'left');
            }
            if (action.getComboAttack(enemy) > 1) {
                this.setYellowColor();
                this.bitmap.drawText('羅刹斬', left, y - 104, 100, 40, 'left');
            }*/
            this.setNormalColor();
            var showStun = false;
            if (this.isStun(actor, damage, enemy, item)) {
                showStun = true;
                this.bitmap.drawText('スタン', left, y, 100, 40, 'left');
                this.bitmap.drawText(':', center, y - 1, 100, 40, 'left');
                if (hit >= 100) {
                    this.drawNumber(100, right, y, 104, 'right', 9);
                    this.drawPercent(right + 98, y, 2);
                }
                else {
                    this.drawNumber(100, right, y, 104, 'right', 8);
                    this.drawPercent(right + 98, y, 1);
                }
                y += interval;
            }
            var showIce = false;
            for (var _i = 0, _a = item.effects; _i < _a.length; _i++) {
                var effect = _a[_i];
                if (effect.code == 21) {
                    this.setNormalColor();
                    var state = $dataStates[effect.dataId];
                    if (!state) {
                        continue;
                    }
                    if (effect.dataId == 20 && showStun) {
                        continue;
                    }
                    var upRate = 0; // actor.stateUpRate(effect.dataId);
                    var hit2 = Math.min(100, Math.floor(effect.value1 * 100 * enemy.stateRateName(state.name) + upRate));
                    if (enemy.isStateResist(state.id)) {
                        hit2 = 0;
                        this.changePaintOpacity(false);
                    }
                    this.bitmap.drawText(state.name, left, y + 1, 100, 40, 'left');
                    this.bitmap.drawText(':', center, y, 100, 40, 'left');
                    this.drawPercentValue(right, y, hit2, hit >= 100 && hit2 == 100);
                    this.changePaintOpacity(true);
                    y += interval;
                    if (state.name == $dataStates[21].name && enemy.ice > 0) {
                        this.bitmap.drawText('氷-３', left, y + 1, 100, 40, 'left');
                        this.bitmap.drawText(':', center, y, 100, 40, 'left');
                        this.drawPercentValue(right, y, 100, true);
                        this.changePaintOpacity(true);
                        y += interval;
                        showIce = true;
                    }
                }
                else if (effect.code == 32) {
                    var name = effect.dataId + '';
                    switch (effect.dataId) {
                        case 2:
                            name = TextManager.attackDown;
                            break;
                        case 3:
                            name = TextManager.defDown;
                            break;
                        case 4:
                            name = TextManager.mgcDown;
                            break;
                        case 5:
                            name = TextManager.mdfDown;
                            break;
                    }
                    this.bitmap.drawText(name, left, y + 1, 100, 40, 'left');
                    this.bitmap.drawText(':', center, y, 100, 40, 'left');
                    var hit2 = 100;
                    this.drawPercentValue(right, y, hit2, hit >= 100 && hit2 == 100);
                    y += interval;
                }
            }
            if (enemy.ice > 0 && item.id >= 1300 && !showIce) {
                this.bitmap.drawText('氷-２', left, y + 1, 100, 40, 'left');
                this.bitmap.drawText(':', center, y, 100, 40, 'left');
                this.drawPercentValue(right, y, 100, true);
                this.changePaintOpacity(true);
                y += interval;
            }
            this.setNormalColor();
            if (this.isCancel(item, enemy)) {
                this.bitmap.drawText(TextManager.cancelSkill, left, y + 1, 70, 40, 'left');
                this.bitmap.drawText(':', center, y, 100, 40, 'left');
                this.setYellowColor();
                this.drawPercentValue(right, y, 100, true);
                y += interval;
            }
            this.setNormalColor();
            var delay = this.getDelay(item);
            if (delay > 0) {
                var rate = item.meta['delayRate'] || 100;
                if (enemy.isAntiDelay()) {
                    rate = 0;
                    this.changePaintOpacity(false);
                }
                this.bitmap.drawText(TextManager.delay + delay, left, y + 1, 90, 40, 'left');
                this.bitmap.drawText(':', center, y, 100, 40, 'left');
                if (item.meta['ineffectiveBoss'] && enemy.isBoss()) {
                    rate = 0;
                }
                this.drawPercentValue(right, y, rate, rate == 100 && hit >= 100);
                this.changePaintOpacity(true);
                y += interval;
                /*} else if (actor.delayRate() > 0) {
                    this.bitmap.drawText(TextManager.delay + 1, left, y + 1, 90, 40, 'left');
                    this.bitmap.drawText(':', center, y, 100, 40, 'left');
    
                    var hit = Math.floor(actor.delayRate() * 100);
                    this.drawPercentValue(right, y, hit, hit >= 100);
                    y += interval;*/
            }
            this.bitmap.clearRect(x - 1, y + 10, width + 1, 200);
        };
        Sprite_DamageForecast.prototype.drawPercentValue = function (x, y, percent, isHit) {
            if (percent == 0) {
                this.bitmap.drawText('無効', x, y, 110, 40, 'right');
            }
            else if (isHit) {
                this.drawNumber(percent, x, y, 104, 'right', 9);
                this.drawPercent(x + 98, y, 2);
            }
            else {
                this.drawNumber(percent, x, y, 104, 'right', 8);
                this.drawPercent(x + 98, y, 1);
            }
        };
        Sprite_DamageForecast.prototype.setYellowColor = function () {
            this.bitmap.textColor = this.textColor(17);
        };
        Sprite_DamageForecast.prototype.setNormalColor = function () {
            this.bitmap.textColor = this.textColor(0);
        };
        Sprite_DamageForecast.prototype.isStun = function (actor, value, enemy, item) {
            var luk = enemy.luk2();
            if (luk == 1 || enemy._stun < 0) {
                return false;
            }
            if (enemy._stun >= luk) {
                return false;
            }
            if (enemy.isStateAffected(11)) {
                //return false;
            }
            var itemStunRate = 1;
            if (item.meta['stunDown']) {
                itemStunRate -= item.meta['stunDown'] / 100;
            }
            if (item.meta['stunUp']) {
                itemStunRate += item.meta['stunUp'] / 100;
            }
            value = Math.floor(value * itemStunRate);
            return enemy._stun + value >= luk;
        };
        Sprite_DamageForecast.prototype.getDelay = function (item) {
            return Math.floor(item.meta['delay']);
        };
        Sprite_DamageForecast.prototype.isCancel = function (item, enemy) {
            if (!item.meta['キャンセル']) {
                return false;
            }
            var coma = BattleManager.orderManager.findComa(enemy);
            return coma.isPreparation();
        };
        Sprite_DamageForecast.prototype.textColor = function (n) {
            var px = 96 + (n % 8) * 12 + 6;
            var py = 144 + Math.floor(n / 8) * 12 + 6;
            return this.windowskin.getPixel(px, py);
        };
        return Sprite_DamageForecast;
    }(Sprite_Base));
    var _Window_Selectable_prototype_select = Window_Selectable.prototype.select;
    Window_Selectable.prototype.select = function (index) {
        var last = this._index;
        _Window_Selectable_prototype_select.call(this, index);
        if (this._index != last) {
            this.callHandler('change');
        }
    };
    var _Window_Selectable_prototype_activate = Window_Selectable.prototype.activate;
    Window_Selectable.prototype.activate = function () {
        _Window_Selectable_prototype_activate.call(this);
        this.callHandler('change');
    };
    var _Scene_Battle_prototype_createEnemyWindow = Scene_Battle.prototype.createEnemyWindow;
    Scene_Battle.prototype.createEnemyWindow = function () {
        _Scene_Battle_prototype_createEnemyWindow.call(this);
        this._enemyWindow.setHandler('change', this.onEnemyChange.bind(this));
        this._enemyWindow._helpWindow = this._helpWindow;
        this._enemyWindow._statusWindow = this._statusWindow;
        this._forecastSprite = new Sprite_DamageForecast();
        this.addChild(this._forecastSprite);
    };
    Scene_Battle.prototype.onEnemyChange = function () {
        var enemy = $gameTroop.members()[this._enemyWindow.enemyIndex()];
        var actor = BattleManager.actor();
        var item = actor.currentAction().item();
        this._forecastSprite.showEnemy(actor, item, enemy);
    };
    var _Scene_Battle_prototype_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Scene_Battle.prototype.onEnemyOk = function () {
        _Scene_Battle_prototype_onEnemyOk.call(this);
        this._forecastSprite.hide();
    };
    var _Scene_Battle_prototype_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function () {
        _Scene_Battle_prototype_onEnemyCancel.call(this);
        this._forecastSprite.hide();
        switch (this._actorCommandWindow.currentSymbol()) {
            case 'attack1':
                this._actorCommandWindow.activate();
                this._actorCommandWindow.select(0);
                break;
            case 'attack2':
                this._actorCommandWindow.activate();
                this._actorCommandWindow.select(1);
                break;
        }
    };
    var _Scene_Battle_prototype_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
    Scene_Battle.prototype.selectEnemySelection = function () {
        this._enemyWindow.refresh();
        //this._enemyWindow.hide();
        this._enemyWindow.select(0);
        this._enemyWindow.activate();
        var action = BattleManager.inputtingAction();
        this._enemyWindow.setItem(action.item());
    };
    Game_BattlerBase.prototype.stateRateName = function (stateName) {
        for (var _i = 0, $dataStates_1 = $dataStates; _i < $dataStates_1.length; _i++) {
            var state = $dataStates_1[_i];
            if (!state) {
                continue;
            }
            if (state.name == stateName) {
                return this.traitsPi(Game_BattlerBase.TRAIT_STATE_RATE, state.id);
            }
        }
        return 0;
    };
    Game_Action.prototype.itemEffectAddAttackState = function (target, effect) {
        var state = $dataStates[effect.dataId];
        this.subject().attackStates().forEach(function (stateId) {
            var chance = effect.value1;
            chance *= target.stateRateName(state.name);
            chance *= this.subject().attackStatesRate(stateId);
            if (Math.random() < chance) {
                target.addState(stateId);
                this.makeSuccess(target);
            }
        }.bind(this), target);
    };
    Game_Action.prototype.itemEffectAddNormalState = function (target, effect) {
        var chance = effect.value1;
        var state = $dataStates[effect.dataId];
        chance *= target.stateRateName(state.name);
        //chance += this.subject().stateUpRate(state.id) / 100;
        if (Math.random() < chance) {
            target.addState(effect.dataId);
            this.makeSuccess(target);
        }
    };
    Window_BattleEnemy.prototype.initialize = function (x, y) {
        this._enemies = [];
        var width = 1024;
        var height = 500;
        Window_Selectable.prototype.initialize.call(this, x, 0, width, height);
        // this.refresh();
        this.hide();
    };
    Window_BattleEnemy.prototype.itemRect = function (index) {
        var mem = $gameTroop.aliveMembers();
        if (mem.length <= index) {
            return new Rectangle();
        }
        var enemy = mem[index];
        if (SceneManager._scene._spriteset) {
            var sprites = SceneManager._scene._spriteset._enemySprites;
            for (var _i = 0, sprites_1 = sprites; _i < sprites_1.length; _i++) {
                var s = sprites_1[_i];
                if (s._enemy == enemy) {
                    var offset = 40;
                    var rect = new Rectangle();
                    rect.x = s.x - s._frame.width / 2 - offset;
                    rect.y = s.y - s._frame.height - offset;
                    rect.width = s._frame.width + offset * 2;
                    rect.height = s._frame.height + offset * 2;
                    return rect;
                }
            }
        }
        return new Rectangle();
    };
    var _Window_BattleEnemy_prototype_select = Window_BattleEnemy.prototype.select;
    Window_BattleEnemy.prototype.select = function (index) {
        /*if (this._item) {
            if ([3, 4, 5, 6].contains(this._item.scope)) {
                return;
            }
            if ([2].contains(this._item.scope)) {
                return;
            }
        }*/
        _Window_BattleEnemy_prototype_select.call(this, index);
        this.clearActorDamageForecast();
        if (this._helpWindow) {
            var enemy = this.enemy();
            if (!enemy) {
                return;
            }
            var text = enemy.name();
            text += '　 \\C[16](攻撃力:' + enemy.atk + ')\\C[0]\n';
            /*var targets = enemy.getTargets();
            if (targets) {
                for (var member of $gameParty.members()) {
                    member.setDamageForecast(0);
                }
                var target = targets[0];
                var actor: Game_Actor;
                var item: DataManager.UsableItem = coma.item();
                var action = new Game_Action(enemy);
                action.setSkill(item.id);
                if (! target) {
                    return;
                }
                var iconIndex;
                if (item.hitType == 0) {
                    iconIndex = 127;
                }
                else if (item.hitType == 1) {
                    iconIndex = 76;
                }
                else {
                    iconIndex = 79;
                }
                var iconText = '\\I[' + iconIndex + ']';

                if (target.isActor()) {
                    actor = <Game_Actor> target;
                    if (targets.length == 1) {
                        var damage = action.makeDamageValue(target, false);
                        text += iconText + '\\C[14]' + item.name + '→ \\C[2]' + target.name() + '(' + damage + 'ダメージ)';
                        actor.setDamageForecast(damage);
                    } else if (action.isForAll()) {
                        text += iconText + '\\C[14]' + item.name + '→ \\C[2]全体';
                        
                        for (var b of targets) {
                            actor = <Game_Actor> b;
                            var damage = action.makeDamageValue(actor, false);
                            actor.plusDamageForecast(damage);
                        }
                    } else {
                        text += iconText + '\\C[14]' + item.name + '→';
                        for (var b of targets) {
                            actor = <Game_Actor>b;
                            var damage = action.makeDamageValue(actor, false);
                            actor.plusDamageForecast(damage);
                            text += '\\C[2]' + actor.name() + '(' + damage + 'ダメージ) ';
                        }
                    }
                } else {
                    if (targets.length == 1) {
                        text += iconText + '\\C[14]' + item.name + '→ \\C[2]' + target.name();
                    } else if (action.isForAll()) {
                        text += iconText + '\\C[14]' + item.name + '→ \\C[2]全体';

                    }
                }
            }*/
            this._helpWindow.setSkill(null);
            this._helpWindow.setText(text);
            //this._helpWindow.refresh();
            this._statusWindow.refresh();
        }
    };
    var _Window_BattleEnemy_prototype_hide = Window_BattleEnemy.prototype.hide;
    Window_BattleEnemy.prototype.hide = function () {
        _Window_BattleEnemy_prototype_hide.call(this);
        this.clearActorDamageForecast();
        if (this._helpWindow) {
            this._helpWindow.hide();
            this._statusWindow.refresh();
        }
    };
    Window_BattleEnemy.prototype.clearActorDamageForecast = function () {
        for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
            var actor = _a[_i];
            var changed = actor.setDamageForecast(0);
            if (changed) {
                try {
                    BattleManager.orderManager.findComaReverse(actor).refresh();
                }
                catch (e) {
                }
            }
        }
    };
    Window_BattleEnemy.prototype.setItem = function (item) {
        this._item = item;
        this._helpWindow.show();
        if ([2].contains(item.scope)) {
            $gameTroop.selectAll();
            this._helpWindow.setText('全体');
            return;
        }
        if ([3, 4, 5, 6].contains(this._item.scope)) {
            $gameTroop.selectAll();
            if (this._item.scope == 4) {
                this._helpWindow.setText('ランダムな敵２体');
            }
            else if (this._item.scope == 5) {
                this._helpWindow.setText('ランダムな敵３体');
            }
            else {
                this._helpWindow.setText('ランダム');
            }
            return;
        }
        this.select(0);
    };
    Window_BattleEnemy.prototype.deactivate = function () {
        this.active = false;
    };
    Game_Unit.prototype.selectAll = function () {
        this.aliveMembers().forEach(function (member) {
            member.select();
        });
    };
    Game_Actor.prototype.plusDamageForecast = function (n) {
        this._damageForecast += n;
        return true;
    };
    Game_Actor.prototype.setDamageForecast = function (n) {
        if (this._damageForecast == n) {
            return false;
        }
        this._damageForecast = n;
        return true;
    };
    Game_Actor.prototype.getDamageForecast = function () {
        return this._damageForecast;
    };
    var _Window_BattleStatus_prototype_refresh = Window_BattleStatus.prototype.refresh;
    Window_BattleStatus.prototype.refresh = function () {
        if (!this.numBase) {
            this.numBase = new PIXI.Sprite();
            this.addChild(this.numBase);
        }
        this._windowContentsSprite.destroyAndRemoveChildren();
        this._windowContentsSprite.paintOpacity = 256;
        _Window_BattleStatus_prototype_refresh.call(this);
    };
    Window_BattleStatus.prototype.drawActorHp = function (actor, x, y, width) {
        width = width || 186;
        var color1 = this.hpGaugeColor1();
        var color2 = this.hpGaugeColor2();
        var damage = actor.getDamageForecast();
        if (damage > actor.hp) {
            damage = actor.hp;
        }
        var rate = (actor.hp - damage) / actor.mhp;
        this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
        if (damage > 0) {
            //this.drawGauge(Math.floor(x + width * rate), y, width, damage / actor.mhp, this.deathColor(), this.deathColor());
            var gaugeY = y + this.lineHeight() - this.gaugeHeight() + 1;
            this.contents.gradientFillRect(Math.floor(x + width * rate) + 1, gaugeY, (width) * damage / actor.mhp, this.gaugeHeight() - 2, this.deathColor(), this.deathColor());
        }
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.hpA, x, y, 44);
        if (damage > 0) {
            this.drawCurrentAndMax(actor.hp - damage, actor.mhp, x, y, width, this.hpColor(actor), this.normalColor());
        }
        else {
            this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width, this.hpColor(actor), this.normalColor());
        }
    };
    Window_Base.prototype.gaugeHeight = function () {
        return 8;
    };
})(Saba || (Saba = {}));

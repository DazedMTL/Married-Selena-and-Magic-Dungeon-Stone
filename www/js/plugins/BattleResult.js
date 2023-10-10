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
    BattleManager.gainExp = function () {
        var exp = this._rewards.exp;
        $gameParty.allMembers().forEach(function (actor) {
            if (actor.isMercenary()) {
                actor.gainExpMercenary(exp);
            }
            else {
                actor.gainExp(exp);
            }
        });
    };
    function getRandomBattleItem() {
        return null;
        /*
        var itemRate = 50;
        itemRate += $gameParty.getParamTotal('drop');
        if (Math.random() * 100 < itemRate) {
            return null;
        }
        var items = [1,3,4,5,6,7];
        var dice = Math.floor(Math.random() * items.length);
        return items[dice];*/
    }
    var Window_BattleResult = /** @class */ (function (_super) {
        __extends(Window_BattleResult, _super);
        function Window_BattleResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_BattleResult.prototype.initialize = function (rewards) {
            this._rewards = rewards;
            this._seWait = 0;
            var exp = rewards.exp;
            _super.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight - 214);
            this._resultList = [];
            var i = 0;
            for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
                var actor = _a[_i];
                if (actor.actorId() >= 10) {
                    continue;
                }
                var rect = this.itemRect(i);
                var result = new ActorResult(actor, exp, rect);
                this.addChild(result);
                this._resultList.push(result);
                i++;
            }
            this.start();
            if ($gameSwitches.value(249) && !$gameSwitches.value(250)) {
                $gameTemp.reserveCommonEvent(204);
            }
        };
        Window_BattleResult.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
            var base = Saba.getSystemBaseTexture('result');
            var texture = new PIXI.Texture(base, new PIXI.Rectangle(0, 0, 240, 60));
            var s = new PIXI.Sprite(texture);
            s.x = 30;
            s.y = 30;
            this.addChild(s);
            var texture2 = new PIXI.Texture(base, new PIXI.Rectangle(0, 120, 160, 50));
            var s2 = new PIXI.Sprite(texture2);
            s2.x = 30;
            s2.y = 400;
            this.addChild(s2);
            var texture3 = new PIXI.Texture(base, new PIXI.Rectangle(80, 60, 80, 50));
            var s3 = new PIXI.Sprite(texture3);
            s3.x = 80;
            s3.y = 446;
            this.addChild(s3);
            this.drawNumber(this._rewards.exp, 110, 426, 100, 'right', 3);
            var texture4 = new PIXI.Texture(base, new PIXI.Rectangle(160, 60, 80, 50));
            var s4 = new PIXI.Sprite(texture4);
            s4.x = 80;
            s4.y = 488;
            this.addChild(s4);
            this.drawNumber(this._rewards.gold, 110, 466, 100, 'right', 3);
            var texture5 = new PIXI.Texture(base, new PIXI.Rectangle(240, 60, 80, 50));
            var s5 = new PIXI.Sprite(texture5);
            s5.x = 430;
            s5.y = s3.y;
            this.addChild(s5);
            if ($gameTemp.isNodamage) {
                $gameMedals.onNoDamage();
                var texture6 = new PIXI.Texture(base, new PIXI.Rectangle(160, 120, 260, 50));
                var s6 = new PIXI.Sprite(texture6);
                s6.x = 250;
                s6.y = 40;
                this.addChild(s6);
                var texture7 = new PIXI.Texture(base, new PIXI.Rectangle(320, 60, 40, 50));
                var s7 = new PIXI.Sprite(texture7);
                s7.x = 230;
                s7.y = s3.y;
                this.addChild(s7);
                var s8 = new PIXI.Sprite(texture7);
                s8.x = s7.x;
                s8.y = s4.y;
                this.addChild(s8);
            }
            else if ($gameTemp.is1damage) {
                var texture6 = new PIXI.Texture(base, new PIXI.Rectangle(160, 250, 260, 50));
                var s6 = new PIXI.Sprite(texture6);
                s6.x = 250;
                s6.y = 40;
                this.addChild(s6);
                var texture7 = new PIXI.Texture(base, new PIXI.Rectangle(370, 60, 60, 50));
                var s7 = new PIXI.Sprite(texture7);
                s7.x = 230;
                s7.y = s3.y;
                this.addChild(s7);
                var s8 = new PIXI.Sprite(texture7);
                s8.x = s7.x;
                s8.y = s4.y;
                this.addChild(s8);
            }
            else if ($gameTemp.is2damage) {
                var texture6 = new PIXI.Texture(base, new PIXI.Rectangle(160, 300, 260, 40));
                var s6 = new PIXI.Sprite(texture6);
                s6.x = 250;
                s6.y = 40;
                this.addChild(s6);
                var texture7 = new PIXI.Texture(base, new PIXI.Rectangle(432, 60, 61, 50));
                var s7 = new PIXI.Sprite(texture7);
                s7.x = 230;
                s7.y = s3.y;
                this.addChild(s7);
                var s8 = new PIXI.Sprite(texture7);
                s8.x = s7.x;
                s8.y = s4.y;
                this.addChild(s8);
            }
            var items = this._rewards.items;
            if (items && items.length > 0) {
                var yy = 426;
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    this.drawItemName(item, 480, yy, 300);
                    yy += 30;
                }
            }
        };
        Window_BattleResult.prototype.maxItems = function () {
            return $gameParty.battleMembers().length;
        };
        Window_BattleResult.prototype.itemHeight = function () {
            return 70;
        };
        Window_BattleResult.prototype.itemRect = function (index) {
            var rect = _super.prototype.itemRect.call(this, index);
            rect.y += 100;
            return rect;
        };
        Window_BattleResult.prototype.start = function () {
            for (var _i = 0, _a = this._resultList; _i < _a.length; _i++) {
                var result = _a[_i];
                result.start();
            }
        };
        Window_BattleResult.prototype.update = function () {
            _super.prototype.update.call(this);
            var isOk = true;
            if (!this._updateFinished) {
                for (var _i = 0, _a = this._resultList; _i < _a.length; _i++) {
                    var result = _a[_i];
                    if (!result.update()) {
                        isOk = false;
                    }
                }
                if (isOk) {
                    this._updateFinished = true;
                }
            }
            if (Input.isTriggered('ok') || Input.isPressed('shift') || TouchInput.isTriggered()) {
                for (var _b = 0, _c = this._resultList; _b < _c.length; _b++) {
                    var result = _c[_b];
                    if (!result.finish()) {
                        isOk = false;
                    }
                }
                if ((this._updateFinished || isOk) && !this._finished) {
                    this._finished = true;
                    this.callHandler('onFinish');
                }
                else {
                    this._updateFinished = true;
                }
            }
            if (this._seWait > 0) {
                this._seWait--;
            }
            else {
                if (!this._updateFinished) {
                    AudioManager.playStaticSe({ name: 'button57', volume: 80, pitch: 100, pan: 0 });
                }
                this._seWait = 3;
            }
        };
        return Window_BattleResult;
    }(Window_Selectable));
    var MAX_FRAME_NUM = 150;
    var ActorResult = /** @class */ (function (_super) {
        __extends(ActorResult, _super);
        function ActorResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActorResult.prototype.initialize = function (actor, gainExp, rect) {
            _super.prototype.initialize.call(this);
            this.numBase = new PIXI.Sprite();
            this._windowContentsSprite = new PIXI.Sprite();
            this.bitmap = new Bitmap(1000, 200);
            this._actor = JsonEx.makeDeepCopy(actor);
            this._gainExp = gainExp;
            this._frameNum = 0;
            this._currentExp = 0;
            this._levelUpFrame = 0;
            this._lastExp = 0;
            this._rect = rect;
            this._isStart = true;
            this._initialRate = this._actor.calcExpRate(0);
            this._rate = this._initialRate;
            this.x = rect.x;
            this.y = rect.y;
            this._levelUpParam = 0;
        };
        ActorResult.prototype.update = function () {
            if (this._isEnd) {
                return true;
            }
            if (!this._isStart) {
                return false;
            }
            if (this._levelUpFrame > 0) {
                this._levelUpFrame--;
                if (this._levelUpFrame == 0) {
                }
                else {
                    return false;
                }
            }
            this._rate += 0.001;
            var rate = this._rate;
            if (this._actor.calcRealExp(this._rate) + this._lastExp >= this._gainExp) {
                this._isEnd = true;
                this._rate = this._actor.calcExpRate(this._gainExp - this._lastExp);
            }
            if (this._rate >= 1) {
                this._lastExp = this._actor.calcRealExp(1);
                this._actor.changeExp(this._actor.nextLevelExp(), false);
                this.playLevelUp();
                this._levelUpFrame = 22;
                this._rate = 0;
                rate = 1;
            }
            this.draw(rate);
            return false;
        };
        ActorResult.prototype.playLevelUp = function () {
            /*if ($gameSwitches.value(56 + this._actor.actorId())) {
                AudioManager.playSe({ name: 'cs_3', volume: 90, pitch: 100, pan: 0 });
            } else {*/
            AudioManager.playSe({ name: 'Item2', volume: 90, pitch: 100, pan: 0 });
            //}
            var level = this._actor.level - 1;
            var param = Saba.LEVELUP_PARAMS[this._actor.actorId()][level];
            this._levelUpParam = param;
        };
        ActorResult.prototype.start = function () {
            this._isStart = true;
        };
        ActorResult.prototype.finish = function () {
            if (this._isEnd) {
                return true;
            }
            var lastLevel = this._actor.level;
            var exp = this._actor.currentExp();
            this._actor.changeExp(exp + this._gainExp - this._lastExp, false);
            var rate = this._actor.calcExpRate(0);
            if (lastLevel < this._actor.level) {
                this.playLevelUp();
            }
            if (rate >= 1) {
                rate = 1;
            }
            this._isEnd = true;
            this.draw(rate);
        };
        ActorResult.prototype.draw = function (rate) {
            this.numBase.destroyAndRemoveChildren();
            this._windowContentsSprite.destroyAndRemoveChildren();
            this.removeChildren();
            this.addChild(this._windowContentsSprite);
            this.addChild(this.numBase);
            if (!this._sprite3) {
                var base2 = Saba.getSystemBaseTexture('result_face');
                var texture2 = new PIXI.Texture(base2, new PIXI.Rectangle(338 * (this._actor.actorId() - 1) + 0, 0, 280, 60));
                var s3 = new PIXI.Sprite(texture2);
                s3.x = 30;
                s3.y = 0;
                this._sprite3 = s3;
            }
            this.addChild(this._sprite3);
            var base = Saba.getSystemBaseTexture('result');
            if (!this._sprite1) {
                var texture = new PIXI.Texture(base, new PIXI.Rectangle(0, 60, 80, 30));
                var s = new PIXI.Sprite(texture);
                s.x = 530;
                s.y = 14;
                this._sprite1 = s;
            }
            this.addChild(this._sprite1);
            if (!this._sprite2) {
                var texture2 = new PIXI.Texture(base, new PIXI.Rectangle(80, 60, 80, 30));
                var s2 = new PIXI.Sprite(texture2);
                s2.x = 630;
                s2.y = 14;
                this._sprite2 = s;
            }
            this.addChild(this._sprite2);
            this.bitmap.fillRect(26, 0, 972, 60, 'rgba(0, 0, 0, 0.6)');
            if (rate == 1) {
                this.drawGauge(694, 18, 280, rate, this.crisisColor(), this.crisisColor());
            }
            else {
                this.drawGauge(694, 18, 280, rate, this.textColor(28), this.textColor(29));
            }
            this.drawNumber(this._actor.level, 550, 12, 70, 'right', 2);
            this.drawTextImage(320, 10, 10 + this._actor.actorId());
            if (this._levelUpParam && !this._sprite5) {
                var xx = (this._levelUpParam - 1) % 3;
                var yy = Math.floor((this._levelUpParam - 1) / 3);
                var texture = new PIXI.Texture(base, new PIXI.Rectangle(xx * 150, 170 + yy * 40, 150, 30));
                var s2 = new PIXI.Sprite(texture);
                s2.x = 560;
                s2.y = -16;
                this._sprite5 = s2;
            }
            if (this._sprite5) {
                this.addChild(this._sprite5);
            }
        };
        ActorResult.prototype.drawGauge = function (x, y, width, rate, color1, color2) {
            if (isNaN(rate)) {
                p('Error: rate is NaN');
                return;
            }
            var fillW = Math.floor(width * rate);
            var gaugeY = y + this.lineHeight() - 8;
            this.bitmap.fillRect(x, gaugeY, width, 6, this.gaugeBackColor());
            this.bitmap.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
        };
        ActorResult.prototype.gaugeBackColor = function () {
            return '#000000';
        };
        ActorResult.prototype.lineHeight = function () {
            return 16;
        };
        return ActorResult;
    }(Sprite_Base));
    Game_Actor.prototype.calcExpRate = function (gainExp) {
        var value1 = this.currentExp();
        if (this._level > 1) {
            value1 -= this.expForLevel(this._level);
        }
        var value2 = this.nextLevelExp() - this.currentLevelExp();
        //p(value1 + gainExp + ' ' + value2)
        return (value1 + gainExp) / value2;
    };
    Game_Actor.prototype.calcRealExp = function (rate) {
        var value1 = this.currentExp();
        if (this._level > 1) {
            value1 -= this.expForLevel(this._level);
        }
        var value2 = this.nextLevelExp() - this.currentLevelExp();
        return (value2 * rate) - value1;
    };
    Scene_Battle.prototype.showBattleResult = function (rewards) {
        if ($gameTroop._troopId == 185) {
            return;
        }
        this.isShowResult = true;
        this._partyCommandWindow.deactivate();
        this._actorCommandWindow.deactivate();
        this._skillWindow.deactivate();
        this._itemWindow.deactivate();
        this._actorWindow.deactivate();
        this._enemyWindow.deactivate();
        this._resultWindow = new Window_BattleResult(rewards);
        this._resultWindow.refresh();
        var self = this;
        this._resultWindow.setHandler('onFinish', function () {
            self.isShowResult = false;
            BattleManager.gainRewards();
        });
        this.addWindow(this._resultWindow);
    };
    BattleManager.processVictory = function () {
        $gameParty.removeBattleStates();
        $gameParty.performVictory();
        this.playVictoryMe();
        this.replayBgmAndBgs();
        this.makeRewards();
        //this.displayVictoryMessage();
        this.displayRewards();
        //this.gainRewards();
        this.endBattle(0);
    };
    BattleManager.isBusy = function () {
        return ($gameMessage.isBusy() || this._spriteset.isBusy() ||
            this._logWindow.isBusy() || SceneManager._scene.isShowResult);
    };
    BattleManager.displayRewards = function () {
        SceneManager._scene.showBattleResult(this._rewards);
    };
})(Saba || (Saba = {}));

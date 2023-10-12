var Saba;
(function (Saba) {
    function getSystemBaseTexture(file) {
        var baseTexture = PIXI.utils.BaseTextureCache['system/' + file];
        if (!baseTexture) {
            var bitmap = ImageManager.loadSystem(file);
            if (!bitmap.isReady()) {
                return;
            }
            baseTexture = new PIXI.BaseTexture(bitmap._image);
            baseTexture.imageUrl = 'system/' + file;
            PIXI.utils.BaseTextureCache['system/' + file] = baseTexture;
        }
        return baseTexture;
    }
    Saba.getSystemBaseTexture = getSystemBaseTexture;
    function getSystemImage(file) {
        var baseTexture = getSystemBaseTexture(file);
        return new PIXI.Sprite(new PIXI.Texture(baseTexture));
    }
    Saba.getSystemImage = getSystemImage;
    /*var _Window_ActorCommand_prototype_processNormalCharacter = Window_ActorCommand.prototype.processNormalCharacter;
    Window_ActorCommand.prototype.processNormalCharacter = function (textState) {
        var c = textState.text[textState.index++];
        var w = this.textWidth(c);
        var d = (16 - w) / 2;
        textState.x += d / 2;
        this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
        textState.x += w;
        textState.x += 1 + d / 2;
    };*/
    Window_BattleLog.prototype.startAction2 = function (subject, action, targets) {
        var item = action.item();
        this.push('waitForMovement');
        this.push('addText', '%1 is Preparing %2!'.format(subject.name(), item.name));
        this.push('waitForNewLine');
        this.push('wait');
    };
    Window_BattleLog.prototype.showDamage = function (subject, damage, callback) {
        this.push('waitForMovement');
        this.push('popupDamage', subject);
        this.push('addText', '%1 took %2 damage!'.format(subject.name(), damage));
        this.push('waitForNewLine');
        this.displayAffectedStatus(subject);
        this.push('wait');
        this.push('waitForNewLine');
        this.push('callback');
        this.push('clear');
        this._callback = callback;
    };
    Window_BattleLog.prototype.callback = function () {
        this._callback();
    };
    Window_BattleLog.prototype.displayActionResults = function (subject, target) {
        if (target.result().used) {
            this.push('pushBaseLine');
            this.displayCritical(target);
            this.push('popupDamage', target);
            this.push('popupDamage', subject);
            this.displayDamage(target);
            this.displayAffectedStatus(target);
            this.displayCancel(target);
            this.displayDelay(target);
            this.displayFailure(target);
            this.push('waitForNewLine');
            this.push('popBaseLine');
        }
    };
    Window_BattleLog.prototype.displayCancel = function (target) {
        if (target.result().canceled) {
            this.push('waitForNewLine');
            this.push('addText', 'Cancelled %1!'.format(target.name()));
            this.push('waitForNewLine');
        }
    };
    Window_BattleLog.prototype.displayDelay = function (target) {
        if (target.result().delay) {
            this.push('waitForNewLine');
            this.push('addText', 'Celayed %1!'.format(target.name(), target.result().delay));
            this.push('waitForNewLine');
        }
    };
    var _Game_ActionResult_prototype_clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function () {
        _Game_ActionResult_prototype_clear.call(this);
        this.canceled = false;
        this.delay = 0;
        this.hitCount = 0;
        this.totalCount = 0;
    };
    Game_Action.prototype.apply = function (target) {
        var result = target.result();
        this.subject().clearResult();
        result.clear();
        result.used = this.testApply(target);
        if (!this.isAlwaysHit()) {
            if (this.subject().isEnemy()) {
                //p(this.itemHit(target))
                //p(this.itemEva(target))
            }
            result.missed = (result.used && Math.random() >= this.itemHit(target) - this.itemEva(target));
        }
        else {
            if (this.isPhysical() && this.itemHit(target) - this.itemEva(target) < 0) {
                result.missed = result.used;
            }
        }
        if (this.subject().isActor()) {
            if ($gameVariables.value(31) == 2) {
                result.missed = false;
            }
        }
        if (this.isPhysical() && this.subject().isActor() && this.subject().isMercenary() && !this.isAlwaysHit()) {
            var members = this.subject().getAliveMembers();
            var hitCount = 0;
            for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
                var m = members_1[_i];
                if (Math.random() < this.itemHit(target) - this.itemEva(target)) {
                    hitCount++;
                }
            }
            if ($gameVariables.value(31) == 2) {
                hitCount = members.length;
            }
            //p(hitCount)
            if (hitCount == 0) {
                result.missed = true;
            }
            else {
                result.missed = false;
                result.hitCount = hitCount;
                result.totalCount = members.length;
            }
        }
        if (this.subject().isActor() && this.subject().currentClass().id == 14) {
            result.missed = false;
        }
        //result.missed = false;
        result.physical = this.isPhysical();
        result.drain = this.isDrain();
        if (result.isHit()) {
            if (this.item().damage.type > 0) {
                result.critical = (Math.random() < this.itemCri(target));
                var value = this.makeDamageValue(target, result.critical);
                if (result.hitCount > 0) {
                    value *= result.hitCount / result.totalCount;
                    value = Math.ceil(value);
                }
                this.executeDamage(target, value);
                //if (this.item().id >= 10) {
                /*if (target.isDead()) {
                    result.skillFinish = 1;
                    this.subject().gainMp(1);
                }*/
                //}
                if (target instanceof Game_Enemy) {
                    if (target.luk > 1 && target._stun < target.luk) {
                        if (value > 0) {
                            var itemStunRate = 1;
                            if (this.item().meta['stunDown']) {
                                itemStunRate -= this.item().meta['stunDown'] / 100;
                            }
                            if (this.item().meta['stunUp']) {
                                itemStunRate += this.item().meta['stunUp'] / 100;
                            }
                            target.addStun(Math.floor(value * itemStunRate));
                        }
                    }
                }
            }
            if (this.item().meta['キャンセル']) {
                if (BattleManager.orderManager.cancel(target)) {
                    result.canceled = true;
                }
            }
            this.item().effects.forEach(function (effect) {
                this.applyItemEffect(target, effect);
            }, this);
            this.applyItemUserEffect(target);
        }
    };
    Window_BattleLog.prototype.displayHpDamage = function (target) {
        if (target.result().hpAffected) {
            if (target.result().hpDamage > 0 && !target.result().drain) {
                this.push('performDamage', target);
            }
            if (target.result().hpDamage < 0) {
                this.push('performRecovery', target);
            }
            if (target.result().hitCount > 0) {
                this.push('addText', target.result().hitCount + 'Double hit!');
            }
            this.push('addText', this.makeHpDamageText(target));
        }
    };
    Game_Enemy.prototype.addStun = function (n) {
        if (this.luk > 1 && this._stun < this.luk) {
            this._stun += n;
            if (this._stun >= this.luk) {
                this.addState(11);
            }
        }
    };
    Game_Battler.prototype.onTurnEnd2 = function () {
        var isStun = this.hasState(11);
        this.regenerateAll();
        //if (this.isEnemy() && this.enemy().meta['スタン']) {
        if (this.isEnemy() && isStun) {
            this._stun = 0;
        }
    };
    Game_Battler.prototype.hasState = function (id) {
        for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
            var state = _a[_i];
            if (state.id == id) {
                return true;
            }
        }
        return false;
    };
    Game_Battler.prototype.onTurnEnd3 = function () {
        this.updateBuffTurns();
        this.removeBuffsAuto();
        this.updateStateTurns();
        this.removeStatesAuto(1);
        this.removeStatesAuto(2);
    };
    var _Game_Battler_prototype_addState = Game_Battler.prototype.addState;
    Game_Battler.prototype.addState = function (stateId) {
        _Game_Battler_prototype_addState.call(this, stateId);
        if ($gameParty.inBattle() && !this.canMove()) {
            if (BattleManager.isBattleEnd()) {
                return;
            }
            try {
                var coma = BattleManager.orderManager.findComa(this);
                if (coma.isPreparation()) {
                    var cancel = coma.cancel();
                    if (cancel && this.isAlive()) {
                        this._result.canceled = true;
                    }
                }
            }
            catch (e) {
            }
        }
    };
    var _Game_Battler_prototype_startDamagePopup = Game_Battler.prototype.startDamagePopup;
    Game_Battler.prototype.startDamagePopup = function () {
        _Game_Battler_prototype_startDamagePopup.call(this);
        this.updated = true;
    };
    /* Game_Actor.prototype.equips = function () {
         var list = this._equips.map(function (item) {
             return item ? item.object() : null;
         });
         var weapon1 = this.weapon1();
         var weapon2 = this.weapon2();
         if (weapon1) {
             list[0] = weapon1.obj();
         }
         if (weapon2) {
             list[1] = weapon2.obj();
         }
         return list;
     };*/
    Game_Battler.prototype.regenerateHp = function () {
        var value = Math.floor(this.hrg * 100);
        //value = Math.max(value, -this.maxSlipDamage());
        if (value !== 0) {
            this.gainHp(value);
        }
    };
    var _Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
    Scene_Boot.loadSystemImages = function () {
        _Scene_Boot_loadSystemImages.call(this);
        ImageManager.reserveSystem('number');
        ImageManager.reserveSystem('stun_gauge');
        ImageManager.reserveSystem('skill_tree');
        ImageManager.reserveSystem('gauge');
        ImageManager.reserveSystem('icon_mark');
        ImageManager.reserveSystem('result');
        ImageManager.reserveSystem('result_face');
        ImageManager.reserveSystem('black');
        ImageManager.reserveSystem('warp');
        ImageManager.reserveSystem('IconSet');
        ImageManager.reserveSystem('IconSetMini');
        ImageManager.reserveSystem('hp_back');
        ImageManager.reserveSystem('auto_battle');
        ImageManager.reserveSystem('ninshin');
        ImageManager.reserveSystem('mapShadow');
        ImageManager.reserveSystem('AutoMapTile');
        ImageManager.reserveSystem('AutoMapPlayer');
        ImageManager.reserveSystem('bg');
        ImageManager.reserveSystem('bg2');
        ImageManager.reserveSystem('mer');
        ImageManager.reserveSystem('mer2');
        ImageManager.reserveSystem('0aka_aka');
        ImageManager.reserveSystem('skill_bg');
        for (var i = 1; i <= 9; i++) {
            var file = 'img/tachie/actor' + i.padZero(2) + '.json';
            ImageManager.loadSpriteSheet(file);
        }
        ImageManager.loadSpriteSheet('img/tachie/actor11.json');
        ImageManager.loadSpriteSheet('img/tachie/actor13.json');
        ImageManager.loadSpriteSheet('img/tachie/actor14.json');
        ImageManager.loadSpriteSheet('img/tachie/actor16.json');
        ImageManager.loadSpriteSheet('img/tachie/actor21.json');
        AudioManager.loadStaticSe({ name: 'button57', volume: 80, pitch: 100, pan: 0 });
    };
})(Saba || (Saba = {}));

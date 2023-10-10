var Saba;
(function (Saba) {
    BattleManager.processTurn = function () {
        var subject = this._subject;
        var action = subject.currentAction();
        if (action) {
            action.prepare();
            if (action.isValid()) {
                this.startAction();
            }
            subject.removeCurrentAction();
        }
        else {
            subject.onAllActionsEnd();
            this.refreshStatus();
            //this._logWindow.displayAutoAffectedStatus(subject);
            //this._logWindow.displayCurrentState(subject);
            //this._logWindow.displayRegeneration(subject);
            this._lastSubject = subject;
            this._subject = this.getNextSubject();
        }
    };
    BattleManager.onEncounter = function () {
        this._preemptive = false;
        this._surprise = false;
    };
    Game_Actor.prototype.stepsForTurn = function () {
        return 2;
    };
    Game_Actor.prototype.performMapDamage = function () {
        if (!$gameParty.inBattle()) {
            $gameScreen.startFlashForDamage();
            if (SceneManager._scene._statusWindow) {
                SceneManager._scene._statusWindow.refresh();
            }
        }
    };
    Sprite_Enemy.prototype.startCollapse = function () {
        this._effectDuration = 16;
        this._appeared = false;
    };
    var _Window_BattleLog_prototype_push = Window_BattleLog.prototype.push;
    Window_BattleLog.prototype.push = function (methodName) {
        switch (methodName) {
            case 'addText':
            case 'waitForNewLine':
            case 'wait':
            case 'pushBaseLine':
            case 'popBaseLine':
                if (isMob()) {
                    //return;
                }
        }
        var methodArgs = Array.prototype.slice.call(arguments, 1);
        this._methods.push({ name: methodName, params: methodArgs });
    };
    Window_BattleLog.prototype.addText = function (text) {
        if (isMob()) {
            //return;
        }
        this._lines.push(text);
        this.refresh();
        this.wait();
    };
    Window_BattleLog.prototype.messageSpeed = function () {
        if (isMob()) {
            return 0;
        }
        if (isBattleFast()) {
            return 2;
        }
        else {
            return 8;
        }
    };
    var _Game_Action_prototype_prepare = Game_Action.prototype.prepare;
    Game_Action.prototype.prepare = function () {
        _Game_Action_prototype_prepare.call(this);
        this.prepared = true;
    };
    function isMob() {
        if (Saba._isAutoBattle) {
            return true;
        }
        var s = BattleManager._subject || BattleManager._lastSubject;
        if (s) {
            if (s && s.isActor() && s.actorId() >= 14) {
                if (BattleManager._action) {
                    //p(BattleManager._action.item().id)
                    if (BattleManager._action.item().id > 500) {
                        return false;
                    }
                }
                return true;
            }
        }
        else {
        }
        return false;
    }
    ;
    var _Spriteset_Battle_prototype_isBusy = Spriteset_Battle.prototype.isBusy;
    Spriteset_Battle.prototype.isBusy = function () {
        if (isMob()) {
            //return false;
        }
        return _Spriteset_Battle_prototype_isBusy.call(this);
    };
    Scene_Battle.prototype.changeInputWindow = function () {
        if (BattleManager.isInputting()) {
            if (BattleManager.actor()) {
                this.startActorCommandSelection();
            }
            else {
                BattleManager.selectNextCommand();
                this.startActorCommandSelection();
            }
        }
        else {
            this.endCommandSelection();
        }
    };
    Scene_Battle.prototype.selectNextCommand = function () {
        var actor = BattleManager.actor();
        actor.turnFinished = true;
        actor.onTurnEnd2();
        BattleManager.startTurn();
        actor.onTurnEnd3();
    };
    var _Scene_Base_prototype_start = Scene_Base.prototype.start;
    Scene_Battle.prototype.start = function () {
        _Scene_Base_prototype_start.call(this);
        this.startFadeIn(this.fadeSpeed(), false);
        BattleManager.playBattleBgm();
        BattleManager.startBattle();
    };
    Game_Actor.prototype.isMob = function () {
        switch (this.actorId()) {
            case 15:
            case 16:
            case 17:
                return true;
        }
        return false;
    };
    Scene_Battle.prototype.changeInputWindow = function () {
        if (this._inTurn) {
            return;
        }
        this._spriteset._enemyHpSprite.refresh();
        if (BattleManager.isInputting()) {
            if (BattleManager.actor()) {
                BattleManager.actor().makeActions();
                if (BattleManager.actor().isAutoBattle()) {
                    this._statusWindow.select(BattleManager.actor().index());
                    this._partyCommandWindow.close();
                    this._actorCommandWindow.setup(BattleManager.actor());
                    this._actorCommandWindow.active = false;
                    var action = BattleManager.inputtingAction();
                    if (action) {
                        action.setTarget($gameTroop.randomTarget().index());
                    }
                    this.selectNextCommand();
                }
                else {
                    this.startActorCommandSelection();
                }
            }
            else {
                this.nextEnemy();
            }
        }
        else {
            this.endCommandSelection();
        }
    };
    Scene_Map.prototype.updateEncounterEffect = function () {
        if (this._encounterEffectDuration > 0) {
            this._encounterEffectDuration--;
            var speed = this.encounterEffectSpeed();
            var n = speed - this._encounterEffectDuration;
            if (n === 1) {
                this.snapForBattleBackground();
                BattleManager.playBattleBgm();
                this.toBattle = true;
                this.startFadeOut(this.fadeSpeed());
            }
        }
    };
    var _Scene_Base_prototype_updateFade = Scene_Base.prototype.updateFade;
    Scene_Base.prototype.updateFade = function () {
        if (!this.toBattle) {
            return _Scene_Base_prototype_updateFade.call(this);
        }
        if (this._fadeDuration > 0) {
            var d = this._fadeDuration;
            if (this._fadeSign > 0) {
                this._fadeSprite.opacity -= this._fadeSprite.opacity / d;
            }
            else {
                this._fadeSprite.opacity += (125 - this._fadeSprite.opacity) / d;
            }
            this._fadeDuration--;
        }
    };
    Scene_Map.prototype.encounterEffectSpeed = function () {
        return 20;
    };
    Scene_Battle.prototype.nextEnemy = function () {
        this._statusWindow.select(-1);
        var enemy = BattleManager.enemy();
        if (!enemy) {
            this._phase = 'start';
            $gameTroop.increaseTurn();
            $gameParty.clearActions();
            //$gameTroop.makeActions();
            for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
                var m = _a[_i];
                m.turnFinished = false;
            }
            for (var _b = 0, _c = $gameTroop.members(); _b < _c.length; _b++) {
                var m = _c[_b];
                m.turnFinished = false;
            }
            return;
        }
        this.onTurnEnd2(enemy);
    };
    Scene_Battle.prototype.onTurnEnd2 = function (subject) {
        var lastHp = subject.hp;
        subject.onTurnEnd2();
        //p('onTurnEnd2')
        subject.makeActions();
        subject.onTurnEnd3();
        if (lastHp != subject.hp) {
            this._spriteset._enemyHpSprite.update();
            this._spriteset._enemyHpSprite.refresh();
            this._inTurn = true;
            var result = subject.result();
            result.hpAffected = true;
            result.hpDamage = lastHp - subject.hp;
            var self = this;
            this._logWindow.showDamage(subject, result.hpDamage, function () {
                self.turnAction(subject);
            });
        }
        else {
            this.turnAction(subject);
        }
    };
    Scene_Battle.prototype.turnAction = function (subject) {
        subject.turnFinished = true;
        BattleManager.startTurn();
        this._inTurn = false;
    };
    BattleManager.startTurn = function () {
        this._phase = 'turn';
        this.clearActor();
        this.makeActionOrders();
        $gameParty.requestMotionRefresh();
        this._logWindow.startTurn();
    };
    BattleManager.endTurn = function () {
        this._phase = 'turnEnd';
        this._preemptive = false;
        this._surprise = false;
        this.allBattleMembers().forEach(function (battler) {
            this.refreshStatus();
            //this._logWindow.displayAutoAffectedStatus(battler);
            //this._logWindow.displayRegeneration(battler);
        }, this);
        if (this.isForcedTurn()) {
            this._turnForced = false;
        }
    };
    BattleManager.makeActionOrders = function () {
        var battlers = [];
        if (!this._surprise) {
            for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
                var m = _a[_i];
                if (m.numActions() > 0) {
                    battlers.push(m);
                }
            }
        }
        if (!this._preemptive) {
            for (var _b = 0, _c = $gameTroop.members(); _b < _c.length; _b++) {
                var m = _c[_b];
                if (m.numActions() > 0) {
                    battlers.push(m);
                }
            }
        }
        battlers.forEach(function (battler) {
            battler.makeSpeed();
        });
        battlers.sort(function (a, b) {
            return b.speed() - a.speed();
        });
        this._actionBattlers = battlers;
    };
    Game_Actor.prototype.makeAutoBattleActions = function () {
        for (var i = 0; i < this.numActions(); i++) {
            var list = this.makeActionList();
            var maxValue = -100;
            for (var j = 0; j < list.length; j++) {
                var value = list[j].evaluate();
                if (value > maxValue) {
                    maxValue = value;
                    this.setAction(i, list[j]);
                }
            }
        }
        this.setActionState('waiting');
    };
    Game_Party.prototype.leader = function () {
        for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
            var actor = _a[_i];
            if (actor.actorId() == 1) {
                return actor;
            }
        }
        for (var _b = 0, _c = this.battleMembers(); _b < _c.length; _b++) {
            var actor = _c[_b];
            if (actor.actorId() == 2) {
                return actor;
            }
        }
        return this.battleMembers()[0];
    };
    BattleManager.actor = function () {
        for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
            var m = _a[_i];
            if (!m.turnFinished) {
                return m;
            }
        }
        return null;
    };
    BattleManager.enemy = function () {
        for (var _i = 0, _a = $gameTroop.members(); _i < _a.length; _i++) {
            var m = _a[_i];
            if (!m.turnFinished) {
                return m;
            }
        }
        return null;
    };
    BattleManager.startBattle = function () {
        this._phase = 'start';
        $gameSystem.onBattleStart();
        $gameParty.onBattleStart();
        $gameTroop.onBattleStart();
        this.displayStartMessages();
        $gameTroop.increaseTurn();
        $gameParty.makeActions();
        //$gameTroop.makeActions();
        for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
            var m = _a[_i];
            m.turnFinished = false;
        }
        for (var _b = 0, _c = $gameTroop.members(); _b < _c.length; _b++) {
            var m = _c[_b];
            m.turnFinished = false;
        }
    };
    Game_Battler.prototype.onTurnEnd3 = function () {
        this.updateBuffTurns();
        this.removeBuffsAuto();
        this.updateStateTurns();
        this.removeStatesAuto(1);
        this.removeStatesAuto(2);
    };
    BattleManager.startInput = function () {
        //p('startInput')
        this._phase = 'input';
        $gameParty.clearActions();
        this.update();
        if (this.actor() && !this.actor().canMove()) {
            var actor = this.actor();
            actor.turnFinished = true;
            actor.onTurnEnd3();
            this.startTurn();
            SceneManager._scene._statusWindow.refresh();
            return;
        }
        if (Saba._isAutoBattle) {
            if (!this.actor()) {
                return;
            }
            this.actor().makeActions();
            if (!this.actor().inputtingAction()) {
                this.actor().turnFinished = true;
                this.startTurn();
                SceneManager._scene._statusWindow.refresh();
                return;
            }
            SceneManager._scene._statusWindow.select(BattleManager.actor().index());
            this.actor().inputtingAction().setAttack();
            this.actor().inputtingAction().setTarget(0);
            this.startTurn();
            this.actor().turnFinished = true;
            SceneManager._scene._statusWindow.refresh();
        }
    };
    var _Scene_Battle_prototype_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
    Scene_Battle.prototype.selectEnemySelection = function () {
        _Scene_Battle_prototype_selectEnemySelection.call(this);
        this.onEnemySelect();
    };
    var _Game_BattlerBase_meetsItemConditions = Game_BattlerBase.prototype.meetsItemConditions;
    Game_BattlerBase.prototype.meetsItemConditions = function (item) {
        if (item && item.id == 15) {
            // 白旗
            if ($gameSwitches.value(12)) {
                return false;
            }
        }
        return _Game_BattlerBase_meetsItemConditions.call(this, item);
    };
    var _Game_Actor_prototype_meetsSkillConditions = Game_Actor.prototype.meetsSkillConditions;
    Game_Actor.prototype.meetsSkillConditions = function (skill) {
        if ($gameParty.inBattle()) {
            if (skill && skill.id == 144) {
                // ウツセミ
                if ($gameSwitches.value(13)) {
                    return false;
                }
            }
        }
        return _Game_Actor_prototype_meetsSkillConditions.call(this, skill);
    };
    /*var _Scene_Battle_prototype_createEnemyWindow = Scene_Battle.prototype.createEnemyWindow;
    Scene_Battle.prototype.createEnemyWindow = function () {
        _Scene_Battle_prototype_createEnemyWindow.call(this);
        this._enemyWindow.y = Graphics.boxHeight;
        this._enemyWindow.setHandler('change', this.onEnemySelect.bind(this));
    };
    Scene_Battle.prototype.onEnemySelect = function() {
        var enemy = $gameTroop.members()[this._enemyWindow.enemyIndex()];
        if (this._helpWindow) {
            this._helpWindow.show();
            this._helpWindow.setText(this.getHelpWindowText(enemy));
        }
    };
    Scene_Battle.prototype.getHelpWindowText = function (enemy: Game_Enemy) {
        return enemy.name();
    };

    var _Scene_Battle_prototype_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function () {
        _Scene_Battle_prototype_onEnemyCancel.call(this);
        if (this._helpWindow) {
            this._helpWindow.hide();
        }
    };*/
    Scene_Battle.prototype.createMessageWindow = function () {
        this._messageWindow = new Saba.Tachie.Window_TachieMessage();
        this.addWindow(this._messageWindow);
        this._messageWindow.subWindows().forEach(function (window) {
            this.addWindow(window);
        }, this);
    };
    var _Game_BattlerBase_prototype_setHp = Game_BattlerBase.prototype.setHp;
    Game_BattlerBase.prototype.setHp = function (hp) {
        if (this.isEnemy()) {
            if (this.enemy().id == 185 || this.enemy().id == 182) {
                if (hp < 1) {
                    hp = 1;
                }
            }
        }
        _Game_BattlerBase_prototype_setHp.call(this, hp);
    };
    var _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function () {
        if ($gameTroop._troopId == 185) {
            return;
        }
        _BattleManager_displayStartMessages.call(this);
    };
})(Saba || (Saba = {}));

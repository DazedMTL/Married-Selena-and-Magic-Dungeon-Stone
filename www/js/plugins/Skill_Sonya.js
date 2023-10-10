var Saba;
(function (Saba) {
    var _BattleManager_invokeNormalAction = BattleManager.invokeNormalAction;
    BattleManager.invokeNormalAction = function (subject, target) {
        if (!target.isCounterAttack()) {
            return _BattleManager_invokeNormalAction.call(this, subject, target);
        }
        var attacker = subject;
        var actor = target;
        subject = target;
        var weapon1 = actor.weapon1();
        subject.makeActions();
        var action = subject.currentAction();
        action.setSkill(1);
        this._logWindow.startCounterAttackAction(subject, action);
        this._subject = subject;
        this._phase = 'action';
        this._action = action;
        this._targets = [attacker];
        $gameMedals.onCounterAttack();
        subject.useItem(action.item());
        this._action.applyGlobal();
        this.refreshStatus();
        this._logWindow.startAction(subject, action, [attacker]);
    };
    Window_BattleLog.prototype.startCounterAttackAction = function (subject, action) {
        //AudioManager.playSe({ name: 'Skill3', volume: 80, pitch: 100, pan: 0 });
        AudioManager.playSe({ name: 'Hammer', volume: 80, pitch: 100, pan: 0 });
        var item = action.item();
        this.push('clear');
        this.push('addText', subject.name() + 'のカウンターストレート！');
        //this.push('displayActionResults', subject, targets[0]);
    };
    Game_Unit.prototype.targetIndex = function (battler) {
        var tgrRand = Math.random() * this.tgrSum();
        var target = null;
        this.aliveMembers().forEach(function (member) {
            tgrRand -= member.tgr;
            if (tgrRand <= 0 && !target) {
                target = member;
            }
        });
        return target;
    };
    Game_Battler.prototype.isCounterAttack = function () {
        for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
            var state = _a[_i];
            if (state.meta['conterAttack']) {
                return true;
            }
        }
        return false;
    };
    Game_Battler.prototype.getLethalAttack = function () {
        return 0;
    };
    Game_Actor.prototype.getLethalAttack = function () {
        var n = 0;
        for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
            var skill = _a[_i];
            var s = skill;
            if (s.meta['とどめ'] > 0) {
                n += parseInt(s.meta['とどめ']);
            }
        }
        return n;
    };
    var _Game_Actor_prototype_onBattleStart = Game_Actor.prototype.onBattleStart;
    Game_Actor.prototype.onBattleStart = function () {
        _Game_Actor_prototype_onBattleStart.call(this);
        this.rushAttackEnabled = true;
    };
    var _Game_Actor_prototype_meetsSkillConditions = Game_Actor.prototype.meetsSkillConditions;
    Game_Actor.prototype.meetsSkillConditions = function (skill) {
        if ($gameParty.inBattle()) {
            if (skill.meta['rushAttack']) {
                if (!this.rushAttackEnabled) {
                    return false;
                }
            }
        }
        return _Game_Actor_prototype_meetsSkillConditions.call(this, skill);
    };
    var _Game_Actor_prototype_paySkillCost = Game_Actor.prototype.paySkillCost;
    Game_Actor.prototype.paySkillCost = function (skill) {
        _Game_Actor_prototype_paySkillCost.call(this, skill);
        if (skill.meta['rushAttack']) {
            this.rushAttackEnabled = false;
        }
        else {
            this.rushAttackEnabled = true;
        }
    };
    BattleManager.checkLethal = function () {
        var subject = this._subject;
        if (this.orderManager.topBattler() != subject) {
            return;
        }
        var n = subject.getLethalAttack();
        if (n == 0) {
            return;
        }
        var targets = [];
        for (var _i = 0, _a = $gameTroop.aliveMembers(); _i < _a.length; _i++) {
            var enemy = _a[_i];
            if (enemy.hp <= n) {
                targets.push(enemy);
            }
        }
        if (targets.length == 0) {
            return;
        }
        var actor = subject;
        var weapon1 = actor.weapon1();
        subject.makeActions();
        var action = subject.currentAction();
        action.setSkill(n - 5 + 273);
        this.invokeLethalAction(subject, action);
        $gameMedals.onLethalAttack(targets.length);
        this._phase = 'action';
        this._action = action;
        this._targets = targets;
        subject.useItem(action.item());
        this._action.applyGlobal();
        this.refreshStatus();
        this._logWindow.startAction(subject, action, targets);
        //this.invokeLethalAction(subject, action, targets, weapon1);
        return true;
    };
    BattleManager.invokeLethalAction = function (subject, action, targets, weapon) {
        this._logWindow.push('pushBaseLine');
        this._logWindow.startLethalAction(subject, action, targets, weapon);
        this._logWindow.push('popBaseLine');
        this.refreshStatus();
    };
    Window_BattleLog.prototype.startLethalAction = function (subject, action, targets) {
        //AudioManager.playSe({ name: 'Skill3', volume: 80, pitch: 100, pan: 0 });
        AudioManager.playSe({ name: 'Sword3', volume: 80, pitch: 100, pan: 0 });
        var item = action.item();
        this.push('clear');
        this.push('addText', subject.name() + 'のリーサルアタック！');
        //this.push('displayActionResults', subject, targets[0]);
    };
    Game_Battler.prototype.isLearnTensionUp = function () {
        return false;
    };
    Game_Actor.prototype.isLearnTensionUp = function () {
        for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
            var skill = _a[_i];
            if (skill.meta['tensionUp']) {
                return true;
            }
        }
        return false;
    };
    var _Game_Action_prototype_getDamageRate = Game_Action.prototype.getDamageRate;
    Game_Action.prototype.getDamageRate = function (target) {
        var base = _Game_Action_prototype_getDamageRate.call(this, target);
        if (this.subject().isEnemy()) {
            return base;
        }
        if (this.subject().actorId() != 2) {
            return base;
        }
        var atkBuff = this.subject()._buffs[2];
        if (atkBuff <= 0) {
            return base;
        }
        for (var _i = 0, _a = this.subject().skills(); _i < _a.length; _i++) {
            var skill = _a[_i];
            if (skill.meta['sacrid']) {
                return base * (100 + parseInt(skill.meta['sacrid'])) / 100;
            }
        }
        return base;
    };
    var _Game_Action_prototype_getDamageRate2 = Game_Action.prototype.getDamageRate;
    Game_Action.prototype.getDamageRate = function (target) {
        var base = _Game_Action_prototype_getDamageRate2.call(this, target);
        if (this.subject().isEnemy()) {
            return base;
        }
        if (this.subject().actorId() != 2) {
            return base;
        }
        if (!this.subject().isCounterAttack()) {
            return base;
        }
        for (var _i = 0, _a = this.subject().skills(); _i < _a.length; _i++) {
            var skill = _a[_i];
            if (skill.meta['counterAttack']) {
                return base * (parseInt(skill.meta['counterAttack'])) / 100;
            }
        }
        return base;
    };
    Game_Battler.prototype.removeInstantStates = function () {
        for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
            var state = _a[_i];
            if (state.meta['instant']) {
                this.eraseState(state.id);
                this.removeInstantStates();
                return;
            }
        }
    };
    Game_Battler.prototype.isAddBuff = function () {
        return false;
    };
    Game_Actor.prototype.isAddBuff = function () {
        if (this.actorId() != 2) {
            return false;
        }
        for (var _i = 0, _a = this.skills; _i < _a.length; _i++) {
            var skill = _a[_i];
            if (skill.meta['tensionUp']) {
                return true;
            }
        }
        return false;
    };
})(Saba || (Saba = {}));
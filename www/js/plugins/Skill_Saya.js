var Saba;
(function (Saba) {
    BattleManager.invokeNormalAction = function (subject, target) {
        var realTarget = this.applySubstitute(target);
        if (subject.isEnemy() && target.isActor() && !$gameParty.guardFinished) {
            if (!subject.isStateAffected(5)) {
                if ($gameParty.aliveMembers().contains($gameActors.actor(1))) {
                    if (this._action.item().id == 1) {
                        if ($gameActors.actor(1).isLearnedSkill(151)) {
                            this._logWindow.displayGuardResults(subject, realTarget);
                            return;
                        }
                    }
                }
            }
        }
        this._action.apply(realTarget);
        this._logWindow.displayActionResults(subject, realTarget);
    };
    Window_BattleLog.prototype.displayGuardResults = function (subject, target) {
        $gameParty.guardFinished = true;
        this.push('wait');
        this.push('wait');
        AudioManager.playSe({ name: 'Hammer', volume: 80, pitch: 100, pan: 0 });
        this.push('wait');
        this.push('addText', 'サヤの神皇寺流守護術が発動！');
        this.push('addText', '剣でダメージを無効化した！');
        this.push('wait');
    };
    Game_Party.prototype.onBattleStart = function () {
        Game_Unit.prototype.onBattleStart.call(this);
        this.guardFinished = false;
    };
    var _Game_Actor_prototype_onBattleStart = Game_Actor.prototype.onBattleStart;
    Game_Actor.prototype.onBattleStart = function () {
        _Game_Actor_prototype_onBattleStart.call(this);
        this.fudanfuEnabled = false;
    };
    var _Game_Actor_prototype_setHp = Game_Actor.prototype.setHp;
    Game_Actor.prototype.setHp = function (hp) {
        var isOver50 = (this._hp / this.mhp) >= 0.5;
        _Game_Actor_prototype_setHp.call(this, hp);
        var isUnder50 = (this._hp / this.mhp) < 0.5;
        if (isOver50 && isUnder50) {
            this.fudanfuEnabled = true;
        }
    };
    Game_Action.prototype.getGonosen = function (enemy) {
        if (enemy.isActor()) {
            return 1;
        }
        var subject = this.subject();
        if (subject.isEnemy()) {
            return 1;
        }
        if (subject.actorId() != 1) {
            return 1;
        }
        var coma = BattleManager.orderManager.findComa(enemy);
        if (!coma.isPreparation()) {
            return 1;
        }
        for (var _i = 0, _a = subject.skills(); _i < _a.length; _i++) {
            var skill = _a[_i];
            if (skill.meta['gonosen']) {
                return 1 + parseInt(skill.meta['gonosen']) / 100;
            }
        }
        return 1;
    };
    var _Game_Action_prototype_targetsForOpponents = Game_Action.prototype.targetsForOpponents;
    Game_Action.prototype.targetsForOpponents = function () {
        var targets = _Game_Action_prototype_targetsForOpponents.call(this);
        if (!targets || !this.item().meta['delay'] || targets.length <= 1) {
            return targets;
        }
        var map = {};
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var target = targets_1[_i];
            var index = BattleManager.orderManager.findComa(target).index();
            map[target.screenX()] = index;
        }
        targets = targets.sort(function (a, b) {
            return map[b.screenX()] - map[a.screenX()];
        });
        return targets;
    };
    function roulelle(rate) {
        return rate > Math.random() * 100;
    }
    Saba.roulelle = roulelle;
    var Game_Action_prototype_getDamageRate = Game_Action.prototype.getDamageRate;
    Game_Action.prototype.getDamageRate = function (target) {
        var rate = Game_Action_prototype_getDamageRate.call(this, target);
        return rate * this.getComboAttack(target) * this.getInvalidBoss(target);
    };
    Game_Action.prototype.getComboAttack = function (target) {
        var item = this.item();
        if (!item) {
            return 1;
        }
        if (!item.meta['comboAttack']) {
            return 1;
        }
        var targets = BattleManager.lastFriendTargets;
        if (!targets) {
            return 1;
        }
        if (!targets.contains(target)) {
            return 1;
        }
        var comboRate = (parseInt(item.meta['comboAttack']) + 100) / 100;
        return comboRate;
    };
    Game_Action.prototype.getInvalidBoss = function (target) {
        var item = this.item();
        if (!item) {
            return 1;
        }
        if (!item.meta['ineffectiveBoss']) {
            return 1;
        }
        if (!target || target.isActor() || !target.enemy().meta['boss']) {
            return 1;
        }
        return 0;
    };
    Game_Troop.prototype.isBoss = function () {
        for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
            var enemy = _a[_i];
            if (enemy.enemy().meta['boss']) {
                return true;
            }
        }
        return false;
    };
    var _Game_Actor_prototype_meetsSkillConditions = Game_Actor.prototype.meetsSkillConditions;
    Game_Actor.prototype.meetsSkillConditions = function (skill) {
        if ($gameParty.inBattle()) {
            if (skill.meta['ineffectiveBossBattle']) {
                if ($gameTroop.isBoss()) {
                    return false;
                }
            }
            if (skill.meta['kyuchi']) {
                if (!this.fudanfuEnabled) {
                    return false;
                }
            }
        }
        return _Game_Actor_prototype_meetsSkillConditions.call(this, skill);
    };
    var _Game_Actor_prototype_paySkillCost = Game_Actor.prototype.paySkillCost;
    Game_Actor.prototype.paySkillCost = function (skill) {
        _Game_Actor_prototype_paySkillCost.call(this, skill);
        if (skill.meta['kyuchi']) {
            this.fudanfuEnabled = false;
        }
    };
    Game_Actor.prototype.skillTpCost = function (skill) {
        return skill.tpCost * 10;
    };
})(Saba || (Saba = {}));
//# sourceMappingURL=Skill_Saya.js.map
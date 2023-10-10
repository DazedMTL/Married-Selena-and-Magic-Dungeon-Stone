var Saba;
(function (Saba) {
    var _Game_Actor_prototype_onBattleEnd = Game_Actor.prototype.onBattleEnd;
    Game_Actor.prototype.onBattleEnd = function () {
        _Game_Actor_prototype_onBattleEnd.call(this);
        if (this.isLearnedSkill(461)) {
            this.gainMp(1);
        }
        if (this.isLearnedSkill(462)) {
            this.gainMp(1);
        }
        if (this.isLearnedSkill(463)) {
            this.gainMp(1);
        }
    };
    var _Game_Action_prototype_getDamageRate = Game_Action.prototype.getDamageRate;
    Game_Action.prototype.getDamageRate = function (target) {
        var base = _Game_Action_prototype_getDamageRate.call(this, target);
        if (this.subject().isEnemy()) {
            return base;
        }
        if (!this.isMagical()) {
            return base;
        }
        var stateCount = target.allIcons().length;
        var stateUp = this.subject().calcExStatus('stateUp');
        return base + (stateCount * stateUp) / 100;
    };
    Game_Party.prototype.partyMdf = function () {
        var actor = $gameActors.actor(4);
        for (var _i = 0, _a = actor.skills(); _i < _a.length; _i++) {
            var skill = _a[_i];
            if (skill.meta['partyMdf']) {
                return parseInt(skill.meta['partyMdf']);
            }
        }
        return 0;
    };
    var _Game_Actor_prototype_mdf2 = Game_Actor.prototype.mdf2;
    Game_Actor.prototype.mdf2 = function () {
        return _Game_Actor_prototype_mdf2.call(this) + $gameParty.partyMdf();
    };
    Game_Party.prototype.recoverDeadMembers = function () {
        for (var _i = 0, _a = this.deadMembers(); _i < _a.length; _i++) {
            var member = _a[_i];
            member.gainHp(1);
            member.gainMp(-99);
            member.gainTp(-999);
        }
    };
})(Saba || (Saba = {}));
//# sourceMappingURL=Skill_Shiori.js.map
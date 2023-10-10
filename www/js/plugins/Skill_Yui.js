var Saba;
(function (Saba) {
    var _Game_Action_prototype_itemCri = Game_Action.prototype.itemCri;
    Game_Action.prototype.itemCri = function (target) {
        var hit = Math.floor((this.itemHit(target) - this.itemEva(target)) * 100);
        if (this.isAlwaysCri(target, hit)) {
            return 200;
        }
        return _Game_Action_prototype_itemCri.call(this, target);
    };
    Game_Action.prototype.isAlwaysCri = function (target, hit) {
        if (this.subject().isActor()) {
            var actor = this.subject();
            if (actor.actorId() == 3) {
                if (!this.isPhysical()) {
                    return false;
                }
                if (!target.canMove()) {
                    return true;
                }
                if (hit >= 100) {
                    return true;
                }
            }
        }
        return false;
    };
    var _Game_Actor_prototype_canPaySkillCost = Game_Actor.prototype.canPaySkillCost;
    Game_Actor.prototype.canPaySkillCost = function (skill) {
        if (!_Game_Actor_prototype_canPaySkillCost.call(this, skill)) {
            return false;
        }
        if (skill.meta['bullet']) {
            var weapon = this.weapon2();
            if (!weapon || weapon.bullet() < skill.meta['bullet']) {
                return false;
            }
        }
        return true;
    };
    var _Game_Actor_prototype_paySkillCost = Game_Actor.prototype.paySkillCost;
    Game_Actor.prototype.paySkillCost = function (skill) {
        _Game_Actor_prototype_paySkillCost.call(this, skill);
        if (skill.meta['bullet']) {
            var weapon = this.weapon2();
            for (var i = 0; i < skill.meta['bullet']; i++) {
                weapon.fire();
            }
        }
    };
    var _Window_BattleLog_prototype_showNormalAnimation = Window_BattleLog.prototype.showNormalAnimation;
    Window_BattleLog.prototype.showNormalAnimation = function (targets, animationId, mirror) {
        if (animationId == 179 || animationId == 182) {
            targets = [targets[0]];
        }
        _Window_BattleLog_prototype_showNormalAnimation.call(this, targets, animationId, mirror);
    };
    Saba.Game_BattlerComa.prototype.calcStiffMinusTime = function () {
        var a = this._battler;
        if (a.isActor()) {
            if (this._item.itypeId > 0) {
                for (var _i = 0, _a = a.skills(); _i < _a.length; _i++) {
                    var s = _a[_i];
                    if (s.meta['item']) {
                        return Math.floor(s.meta['item']);
                    }
                }
            }
        }
        return 0;
    };
})(Saba || (Saba = {}));
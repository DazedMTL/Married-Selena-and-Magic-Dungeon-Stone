var Saba;
(function (Saba) {
    var _Game_Action_prototype_targetsForOpponents = Game_Action.prototype.targetsForOpponents;
    Game_Action.prototype.targetsForOpponents = function () {
        var targets = [];
        var item = this.item();
        var unit = this.opponentsUnit();
        if (this.isForRandom()) {
            for (var i = 0; i < this.numTargets(); i++) {
                if (item.meta['前列狙い']) {
                    targets.push(unit.randomFrontTarget());
                }
                else if (item.meta['後列狙い']) {
                    targets.push(unit.randomBackTarget());
                }
                else {
                    targets.push(unit.randomTarget());
                }
            }
        }
        else if (this.isForOne()) {
            if (this._targetIndex < 0) {
                if (item.meta['前列狙い']) {
                    targets.push(unit.randomFrontTarget());
                }
                else if (item.meta['後列狙い']) {
                    targets.push(unit.randomBackTarget());
                }
                else {
                    targets.push(unit.randomTarget());
                }
            }
            else {
                targets.push(unit.smoothTarget(this._targetIndex));
            }
        }
        else {
            return _Game_Action_prototype_targetsForOpponents.call(this);
        }
        return targets;
    };
    Game_Unit.prototype.randomFrontTarget = function () {
        var tgrRand = Math.random() * this.tgrSumFront();
        var target = null;
        this.aliveFrontMembers().forEach(function (member) {
            tgrRand -= member.tgr;
            if (tgrRand <= 0 && !target) {
                target = member;
            }
        });
        return target;
    };
    Game_Unit.prototype.tgrSumFront = function () {
        return this.aliveFrontMembers().reduce(function (r, member) {
            return r + member.tgr;
        }, 0);
    };
    Game_Unit.prototype.aliveFrontMembers = function () {
        return this.aliveMembers();
    };
    Game_Party.prototype.aliveFrontMembers = function () {
        var members = this.members().filter(function (member) {
            if (member.isActor()) {
                var actor = $dataActors[member.actorId()];
                if (!actor.meta['前衛']) {
                    return false;
                }
            }
            return member.isAlive();
        });
        if (members.length == 0) {
            return this.aliveMembers();
        }
        else {
            return members;
        }
    };
    Game_Unit.prototype.randomBackTarget = function () {
        var tgrRand = Math.random() * this.tgrSumBack();
        var target = null;
        this.aliveBackMembers().forEach(function (member) {
            tgrRand -= member.tgr;
            if (tgrRand <= 0 && !target) {
                target = member;
            }
        });
        return target;
    };
    Game_Unit.prototype.tgrSumBack = function () {
        return this.aliveBackMembers().reduce(function (r, member) {
            return r + member.tgr;
        }, 0);
    };
    Game_Unit.prototype.aliveBackMembers = function () {
        return this.aliveMembers();
    };
    Game_Party.prototype.aliveBackMembers = function () {
        var members = this.members().filter(function (member) {
            if (member.isActor()) {
                var actor = $dataActors[member.actorId()];
                if (actor.meta['前衛']) {
                    return false;
                }
            }
            return member.isAlive();
        });
        if (members.length == 0) {
            return this.aliveMembers();
        }
        else {
            return members;
        }
    };
    Game_Troop.prototype.meetsConditions = function (page) {
        var c = page.conditions;
        if (!c.turnEnding && !c.turnValid && !c.enemyValid &&
            !c.actorValid && !c.switchValid) {
            return false; // Conditions not set
        }
        if (c.turnEnding) {
            if (!BattleManager.isTurnEnd()) {
                return false;
            }
        }
        if (c.turnValid) {
            var n = this._turnCount;
            var a = c.turnA;
            var b = c.turnB;
            if ((b === 0 && n !== a)) {
                return false;
            }
            if ((b > 0 && (n < 1 || n < a || n % b !== a % b))) {
                return false;
            }
        }
        if (c.enemyValid) {
            var enemy = $gameTroop.members()[c.enemyIndex];
            if (!enemy || enemy.hp > c.enemyHp) {
                return false;
            }
        }
        if (c.actorValid) {
            var actor = $gameActors.actor(c.actorId);
            if (!actor || actor.hpRate() * 100 > c.actorHp) {
                return false;
            }
        }
        if (c.switchValid) {
            if (!$gameSwitches.value(c.switchId)) {
                return false;
            }
        }
        return true;
    };
})(Saba || (Saba = {}));

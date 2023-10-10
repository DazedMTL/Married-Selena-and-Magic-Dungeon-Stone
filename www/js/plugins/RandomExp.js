var Saba;
(function (Saba) {
    var EXP_TABLE_ZAKO = [20, 28, 36, 42, 46, 50];
    var EXP_TABLE_BOSS = [40, 50, 62, 75, 90, 110];
    var _Game_Troop_prototype_isAllDead = Game_Troop.prototype.isAllDead;
    Game_Troop.prototype.isAllDead = function () {
        if (this.isBoss()) {
            for (var _i = 0, _a = this.aliveMembers(); _i < _a.length; _i++) {
                var enemy = _a[_i];
                if (enemy.isBoss()) {
                    return false;
                }
            }
            return true;
        }
        return _Game_Troop_prototype_isAllDead.call(this);
    };
    Game_Troop.prototype.isBoss = function () {
        for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
            var enemy = _a[_i];
            if (enemy.isBoss()) {
                return true;
            }
        }
        return false;
    };
    var _Game_Enemy_exp = Game_Enemy.prototype.exp;
    Game_Enemy.prototype.exp = function () {
        var exp = _Game_Enemy_exp.call(this);
        if (exp > 6) {
            return exp;
        }
        if (this.isCenter()) {
            return EXP_TABLE_BOSS[exp - 1];
        }
        else {
            return EXP_TABLE_ZAKO[exp - 1];
        }
    };
    Game_Enemy.prototype.isBoss = function () {
        return this.enemy().meta.boss;
    };
    Game_Enemy.prototype.isCenter = function () {
        return this.enemy().name.contains('★');
    };
    function getExpRate(floor) {
        switch (floor) {
            case 1: return 5;
            case 2: return 10;
            case 3: return 17;
            case 4: return 25;
            case 5: return 40;
            default: return 1;
        }
    }
    function getGoldRate(floor) {
        switch (floor) {
            case 1: return 5;
            case 2: return 8;
            case 3: return 12;
            case 4: return 18;
            case 5: return 25;
            default: return 4;
        }
    }
    var _Game_Troop_expTotal = Game_Troop.prototype.expTotal;
    Game_Troop.prototype.expTotal = function () {
        var exp = _Game_Troop_expTotal.call(this);
        var rate = 100 + $gameParty.getParamTotal('expUp');
        var total = Math.floor(exp * getExpRate($gameVariables.value(2)) / 50 * rate / 100);
        if (Game_Temp.prototype.isNodamage) {
            total *= 2;
        }
        else if (Game_Temp.prototype.is1damage) {
            total *= 1.5;
        }
        else if (Game_Temp.prototype.is2damage) {
            total *= 1.2;
        }
        total = Math.floor(total);
        p('exp rate:' + rate + ' ' + total + '  ' + $gameVariables.value(5));
        $gameMedals.onExp(total);
        return total;
    };
    var _Game_Enemy_gold = Game_Enemy.prototype.gold;
    Game_Enemy.prototype.gold = function () {
        var gold = _Game_Enemy_gold.call(this);
        if (gold > 6) {
            return gold;
        }
        if (this.isCenter()) {
            return EXP_TABLE_BOSS[gold - 1];
        }
        else {
            return EXP_TABLE_ZAKO[gold - 1];
        }
    };
    var _Game_Troop_goldTotal = Game_Troop.prototype.goldTotal;
    Game_Troop.prototype.goldTotal = function () {
        var gold = _Game_Troop_goldTotal.call(this);
        var rate = 100 + $gameParty.getParamTotal('goldUp');
        p('goldRate:' + rate);
        var total = Math.floor(gold * getGoldRate($gameVariables.value(2)) / 20 * rate / 100);
        if ($gameTemp.isNodamage) {
            total *= 2;
        }
        return total;
    };
    BattleManager.displayExp = function () {
        var exp = this._rewards.exp;
        var gold = this._rewards.gold;
        if (exp > 0) {
            var text = TextManager.obtainExp.format(exp, TextManager.exp) + TextManager.obtainGold.format(gold);
            $gameMessage.add('\\.' + text);
        }
    };
    BattleManager.displayGold = function () {
    };
    Game_Actor.prototype.shouldDisplayLevelUp = function () {
        return false;
    };
    Game_Party.prototype.gainTreasureExp = function (num) {
        if (num <= 0) {
            return;
        }
        var level = Math.max(($gameVariables.value(1) - 1) * 8 + $gameVariables.value(2) + 2, 3);
        var exp = $gameActors.actor(1).expForLevel(level) - $gameActors.actor(1).expForLevel(level - 1);
        var gainExp = Math.floor(exp / 18 * num);
        this.allMembers().forEach(function (actor) {
            actor.gainExp(gainExp);
        });
        $gameTemp.addItemLog({ name: '＋' + gainExp + ' Exp', exp: gainExp, iconIndex: 210, meta: {} });
    };
    var _Game_Actor_prototype_gainHp = Game_Actor.prototype.gainHp;
    Game_Actor.prototype.gainHp = function (value) {
        if (value < 0) {
            if ($gameTemp.isNodamage) {
                $gameTemp.isNodamage = false;
            }
            else if ($gameTemp.is1damage) {
                $gameTemp.is1damage = false;
            }
            else {
                $gameTemp.is2damage = false;
            }
        }
        if (value > 0) {
            if (this.mhp - this.hp < value) {
                value = this.mhp - this.hp;
            }
        }
        _Game_Actor_prototype_gainHp.call(this, value);
    };
})(Saba || (Saba = {}));

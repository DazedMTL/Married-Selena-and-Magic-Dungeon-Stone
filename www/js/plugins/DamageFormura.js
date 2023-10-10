var Saba;
(function (Saba) {
    Saba.HP_PER_VIT = 2;
    Saba.HP_PER_VIT_MER = 1.5;
    Game_Action.prototype.applyVariance = function (damage, variance) {
        return damage;
    };
    Game_Action.prototype.needsSelection = function () {
        //return this.checkItemScope([1, 7, 9]);
        return true;
    };
    Game_Enemy.prototype.mat2 = function () {
        return this.mat;
    };
    Game_Enemy.prototype.mdf2 = function () {
        return this.mdf;
    };
    Game_Enemy.prototype.atk2 = function () {
        return this.atk;
    };
    Game_Enemy.prototype.def2 = function () {
        return this.def;
    };
    Game_Enemy.prototype.hit2 = function () {
        return this.hit;
    };
    Game_Enemy.prototype.luk2 = function () {
        if (this._luk2) {
            return this._luk2;
        }
        return this.luk;
    };
    Game_Enemy.prototype.agi2 = function () {
        return this.agi;
    };
    Game_Actor.prototype.atk2 = function (weapon) {
        if (this._actorId == 10) {
            return 10;
        }
        var n = this.getParam('str') * 2;
        for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
            var armor = _a[_i];
            if (!armor) {
                continue;
            }
            n += armor.params[2];
        }
        return n;
    };
    Game_Actor.prototype.hit2 = function (weapon) {
        if (this._actorId == 10) {
            return 10;
        }
        var n = Math.floor(this.getParam('agi') * 1.5 + this.getParam('luk') + 75);
        if (!weapon) {
            weapon = this.currentWeapon();
        }
        if (weapon) {
            var list = weapon.traits.filter(function (trait) {
                return trait.code === 22 && trait.dataId === 0;
            });
            if (list.length > 0) {
                n += list[0].value * 100;
            }
        }
        for (var _i = 0, _a = this.armors(); _i < _a.length; _i++) {
            var armor = _a[_i];
            if (!armor) {
                continue;
            }
            var list = armor.traits.filter(function (trait) {
                return trait.code === 22 && trait.dataId === 0;
            });
            if (list.length > 0) {
                n += list[0].value * 100;
            }
        }
        return n / 100;
    };
    Game_Actor.prototype.currentWeapon = function () {
        return this.weapons()[0];
    };
    Game_Actor.prototype.mat2 = function () {
        if (this._actorId == 10) {
            return 10;
        }
        var n = this.getParam('mgc') * 1 - 1;
        return n + this.mat;
    };
    Game_Actor.prototype.mdf2 = function () {
        return this.getParam('mnd') + this.mdf - 1;
    };
    Game_Actor.prototype.def2 = function () {
        var plus = 0;
        if (this.weapon()) {
            plus = this.weapon().params[3];
        }
        if (this.isMercenary()) {
            plus += Math.floor(this.getParam('vit') / 2);
        }
        else {
            plus += this.getParam('vit');
        }
        return this.def + plus;
    };
    Game_Actor.prototype.agi2 = function () {
        return this.getParam('agi');
    };
    Object.defineProperties(Game_Actor.prototype, {
        hp: {
            get: function () {
                return this._hp;
            },
            configurable: true
        },
        mhp: {
            get: function () {
                if (this.isMercenary()) {
                    var n = 0;
                    var members = this.getAliveMembers();
                    for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
                        var m = members_1[_i];
                        var h = Saba.getMercenaryHp(m);
                        n += h;
                    }
                    return n;
                }
                return Math.floor(this.level / 3 + this.param(0) + this.getParam('vit') * Saba.HP_PER_VIT_MER);
            }, configurable: true
        },
        eva: {
            get: function () {
                if (this.actorId() == 2) {
                    return this.xparam(1) + this.getParam('agi') * 0.05;
                }
                return this.xparam(1) + this.getParam('agi') * 0.02;
            }, configurable: true
        }
    });
    Game_Battler.prototype.defRate = function () {
        if (this._actorId == 10) {
            return 1;
        }
        this._defRates = this._defRates || [];
        var d = this.def;
        if (this.isActor()) {
            d = Math.max(d, 0);
        }
        if (this._defRates[d] == null) {
            if (this.isActor()) {
                this._defRates[d] = Math.pow((35.0 / 36), d);
            }
            else {
                this._defRates[d] = Math.pow((35.0 / 36), d);
            }
        }
        return this._defRates[d];
    };
    Game_Battler.prototype.mdfRate = function () {
        if (this._actorId == 10) {
            return 1;
        }
        this._mdfRates = this._mdfRates || [];
        var d = this.mdf2();
        if (this.isActor()) {
            d = Math.max(d, 0);
        }
        if (this._mdfRates[d] == null) {
            this._mdfRates[d] = Math.pow((35.0 / 36), d);
        }
        return this._mdfRates[d];
    };
    Object.defineProperty(Game_Actor.prototype, 'def', {
        get: function () {
            var paramId = 3;
            var value = this.paramPlus(paramId);
            if (this.param(7) > 30) {
                value += (this.param(7) - 30) / 10;
            }
            value *= this.paramRate(paramId) * this.paramBuffRate(paramId);
            value = Math.min(value, this.paramMax(paramId));
            return Math.floor(Math.max(value, 0));
        }
    });
    Object.defineProperty(Game_Actor.prototype, 'cri', {
        get: function () {
            var plus = 0;
            return this.xparam(2) + plus;
        }
    });
    Game_Actor.prototype.maxTp = function () {
        return 300;
    };
    Game_BattlerBase.prototype.param = function (paramId) {
        var value = this.paramBase(paramId) + this.paramPlus(paramId);
        value *= this.paramRate(paramId);
        var maxValue = this.paramMax(paramId);
        var minValue = this.paramMin(paramId);
        return Math.round(value.clamp(minValue, maxValue));
    };
    Game_Action.prototype.evalDamageFormula = function (target) {
        var item = this.item();
        var a = this.subject();
        var resultRate = 100;
        var b = target;
        var v = $gameVariables._data;
        var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
        try {
            var formula = item.damage.formula;
            if (this.isMagical()) {
                formula = formula.replace(/defRate/, 'mdfRate');
            }
            var value = Math.max(eval(formula), 0) * sign;
            var atkBuff = 0;
            var defBuff = 0;
            if (this.isPhysical()) {
                atkBuff = a._buffs[2];
                defBuff = target._buffs[3];
            }
            if (this.isMagical()) {
                atkBuff = a._buffs[4];
                defBuff = target._buffs[5];
            }
            if (defBuff == -1) {
                value *= 1.25;
            }
            if (defBuff == -2) {
                value *= 1.5;
            }
            if (atkBuff == -1) {
                value *= 0.5;
            }
            if (atkBuff == -2) {
                value *= 0.25;
            }
            if (atkBuff == 1) {
                value *= 1.5;
            }
            if (atkBuff == 2) {
                value *= 2;
            }
            value *= this.getDamageRate(target);
            value *= resultRate / 100;
            if (isNaN(value))
                value = 0;
            return value;
        }
        catch (e) {
            p(e.stack);
            Yanfly.Util.displayError(e, item.damage.formula, 'DAMAGE FORMULA ERROR');
            return 0;
        }
    };
    Game_Action.prototype.getDamageRate = function (target) {
        var a = this.subject();
        if (a.isActor() && a.isMercenary()) {
            return a.getMercenaryDamageUp();
        }
        return 1;
    };
    Game_Action.prototype.applyCritical = function (damage) {
        return damage * 1.5;
    };
    Game_Action.prototype.makeDamageValue = function (target, critical, isRound) {
        if (isRound === void 0) { isRound = true; }
        var item = this.item();
        var baseValue = this.evalDamageFormula(target);
        var value = baseValue * this.calcElementRate(target);
        if (baseValue < 0) {
            value *= target.rec;
        }
        if (critical) {
            value = this.applyCritical(value);
        }
        value = this.applyVariance(value, item.damage.variance);
        value = this.applyGuard(value, target);
        value -= target.getParamTotal('reduceDamage');
        if (this.subject().isActor()) {
            if ($gameVariables.value(31) == 1) {
                value *= 1.5;
                value = Math.round(value);
            }
            if ($gameVariables.value(31) == 2) {
                value *= 5;
            }
        }
        if (isRound) {
            value = Math.round(value);
        }
        return value;
    };
    Game_Actor.prototype.calcExStatus = function (name) {
        var n = 0;
        for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
            var skill = _a[_i];
            if (skill && skill.meta[name]) {
                n += parseInt(skill.meta[name]);
            }
        }
        for (var _b = 0, _c = this.armors(); _b < _c.length; _b++) {
            var armor = _c[_b];
            if (armor && armor.meta[name]) {
                n += parseInt(armor.meta[name]);
            }
        }
        return n;
    };
    Game_Action.prototype.isAlwaysHit = function () {
        if (this.subject().isActor() && $gameVariables.value(31) == 2) {
            return true;
        }
        if (this.subject().isStateAffected(5) && this.item().id == 1) {
            return false;
        }
        /*if (this.subject().isEnemy()) {
            return true;
        }*/
        if (this.isPhysical()) {
            if (this.item().id == 10) {
                return true;
            }
            if (this.item().id < 100) {
                return false;
            }
            if (this.item().meta['normalHit']) {
                return false;
            }
            if (this.item().id > 1000) {
                return false;
            }
        }
        return true;
    };
    Game_Action.prototype.itemHit = function (target) {
        if (this.subject().isStateAffected(5) && this.item().id == 1) {
            return 0;
        }
        if (this.isAlwaysHit()) {
            return this.item().successRate * 0.01;
        }
        else {
            return this.item().successRate * 0.01 * this.subject().hit2();
        }
    };
})(Saba || (Saba = {}));

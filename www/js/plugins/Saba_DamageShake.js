/*:
 * @plugindesc Plugin used to
 * @author さば缶
 *
 *
 * @param shakeDuration
 * @default 12
 *
* @param shakeSpeed
 * @default 10
 */
var Saba;
(function (Saba) {
    function toNumber(str, def) {
        return isNaN(str) ? def : +(str || def);
    }
    var parameters = PluginManager.parameters('Saba_DamageShake');
    var shakeDuration = toNumber(parameters['shakeDuration'], 12);
    var shakeSpeed = toNumber(parameters['shakeSpeed'], 10);
    /*
     * シェイクの強さです。
     * 最大HPに対する与えたダメージの割合（単位パーセント）と、
     * シェイクの強さのマップ
     */
    var shakePowerRates = {
        0: 2,
        10: 8,
        20: 12,
        30: 16,
        40: 20,
        50: 24 // 一度に 50 % ダメージですごくシェイク
    };
    var Game_Enemy_prototype_performDamage = Game_Enemy.prototype.performDamage;
    Game_Enemy.prototype.performDamage = function (skip) {
        var damage = this.result().hpDamage;
        if (damage <= 0) {
            return;
        }
        if (this.mhp <= 0) {
            return;
        }
        var rate = damage * 100 / this.mhp;
        if (this.result().critical) {
            rate = 1;
        }
        var power = 0;
        for (var per in shakePowerRates) {
            if (per > rate) {
                continue;
            }
            if (shakePowerRates[per] < power) {
                continue;
            }
            power = shakePowerRates[per];
        }
        this.shakePower = power;
        Game_Battler.prototype.performDamage.call(this);
        if (!skip) {
            SoundManager.playEnemyDamage();
        }
        else {
        }
        this.requestEffect('shake');
    };
    var _Sprite_Battler_prototype_setupDamagePopup = Sprite_Battler.prototype.setupDamagePopup;
    Sprite_Battler.prototype.setupDamagePopup = function () {
        if (this._battler.isDamagePopupRequested()) {
            if (this._battler.isSpriteVisible()) {
                if (this._battler.isEnemy()) {
                    this._battler.performDamage(true);
                }
            }
        }
        _Sprite_Battler_prototype_setupDamagePopup.call(this);
    };
    var _Sprite_Enemy_prototype_startEffect = Sprite_Enemy.prototype.startEffect;
    Sprite_Enemy.prototype.startEffect = function (effectType) {
        this._effectType = effectType;
        switch (this._effectType) {
            case 'shake':
                this.startShake();
                break;
        }
        _Sprite_Enemy_prototype_startEffect.call(this, effectType);
    };
    var _Sprite_Enemy_prototype_updateEffect = Sprite_Enemy.prototype.updateEffect;
    Sprite_Enemy.prototype.updateEffect = function () {
        var lastDuration = this._effectDuration;
        _Sprite_Enemy_prototype_updateEffect.call(this);
        if (lastDuration > 0) {
            switch (this._effectType) {
                case 'shake':
                    this.updateShake();
                    break;
            }
        }
    };
    Sprite_Enemy.prototype.startShake = function () {
        this._effectDuration = shakeDuration;
        this._shakeSpeed = shakeSpeed;
        this._shake = 0;
        this._shakeDirection = 1;
    };
    Sprite_Enemy.prototype.updateShake = function () {
        var delta = (this._enemy.shakePower * this._shakeSpeed * this._shakeDirection) / 10.0;
        if (this._effectDuration <= 1 /*&& this._shake * (this._shake + delta) < 0*/) {
            this._shake = 0;
        }
        else {
            this._shake += delta;
        }
        if (this._shake > this._enemy.shakePower * 2) {
            this._shakeDirection = -1;
        }
        if (this._shake < -this._enemy.shakePower * 2) {
            this._shakeDirection = 1;
        }
        var x_value = Math.random() * (this._shake) * randomDirection();
        var xx = this._enemy.screenX();
        this.x = xx + x_value;
        var y_value = Math.random() * (this._shake) * randomDirection();
        this.y = this._enemy.screenY() + y_value;
    };
    function randomDirection() {
        if (Math.random() < 0.5) {
            return 1;
        }
        else {
            return -1;
        }
    }
})(Saba || (Saba = {}));

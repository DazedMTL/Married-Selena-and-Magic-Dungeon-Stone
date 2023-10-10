var Saba;
(function (Saba) {
    var _Game_Enemy_prototype_setup = Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup = function (enemyId, x, y) {
        _Game_Enemy_prototype_setup.call(this, enemyId, x, y);
        this._originalName = this.enemy().name;
        if (this._originalName.indexOf('★') == 0) {
            this._originalName = this._originalName.substring(1);
            this.centerEnemy = true;
        }
    };
    var _Game_Enemy_prototype_originalName = Game_Enemy.prototype.originalName;
    Game_Enemy.prototype.originalName = function () {
        return this._originalName || _Game_Enemy_prototype_originalName.call(this);
    };
})(Saba || (Saba = {}));

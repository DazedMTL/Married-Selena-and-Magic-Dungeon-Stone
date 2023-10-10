var Saba;
(function (Saba) {
    var _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function () {
        _Scene_Battle_update.call(this);
        if (!$gameTemp.isPlaytest()) {
            return;
        }
        if (Input.isTriggered('debug')) {
            var members = $gameTroop.members();
            for (var i = 0; i < members.length; i++) {
                members[i].setHp(0);
            }
            BattleManager.processVictory();
        }
        if (Input.isTriggered('debug2')) {
            BattleManager.processDefeat();
        }
    };
})(Saba || (Saba = {}));

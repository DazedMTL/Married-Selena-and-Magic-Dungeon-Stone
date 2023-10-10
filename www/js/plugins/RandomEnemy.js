var Saba;
(function (Saba) {
    Game_Troop.prototype.setup = function (troopId) {
        this.clear();
        this._troopId = troopId;
        this._enemies = [];
        this.troop().members.forEach(function (member) {
            if ($dataEnemies[member.enemyId]) {
                var enemyId = member.enemyId;
                var x = member.x;
                var y = member.y;
                var enemyData = $dataEnemies[member.enemyId];
                if (enemyData.meta['y']) {
                    y = Math.floor(enemyData.meta['y']);
                }
                if (enemyData.meta['x']) {
                    x = Math.floor(enemyData.meta['x']);
                }
                var enemy = new Game_Enemy(enemyId, x, y);
                if (member.hidden) {
                    enemy.hide();
                }
                this._enemies.push(enemy);
            }
        }, this);
        this.makeUniqueNames();
    };
    var _Game_Troop_prototype_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function (troopId) {
        var eventId = this._interpreter._eventId;
        this.clear();
        this._troopId = troopId;
        var troop = $dataTroops[troopId];
        if (!$gameMap.isRandomEnemy() || troop.name.contains('☆')) {
            _Game_Troop_prototype_setup.call(this, troopId);
            return;
        }
        this._enemies = [];
        var candidates = this.enemyCandidates();
        p(candidates);
        var enemyNum = this.decideNum();
        var t = null; //$gameMap.getAnotherTroops();
        var anotherId = -1;
        if (t && t.length > 0) {
            for (var i = 0; i < t.length; i++) {
                var troop = $dataTroops[t[i]];
                anotherId = troop.members[0].enemyId;
                enemyNum++;
            }
        }
        //p('evemy' + enemyNum)
        //p('anotherId:' + anotherId);
        var baseX = -150;
        var totalNum = enemyNum + 1;
        var interval = (Graphics.boxWidth + 45) / (totalNum + 1);
        var center = Math.floor(enemyNum / 2 - 0.5 + Math.random());
        if (enemyNum == 2) {
            center = 1;
        }
        for (var i = 0; i < totalNum; i++) {
            var enemyId;
            var enemyData;
            if (i == center) {
                enemyId = this.troop().members[0].enemyId;
                enemyData = $dataEnemies[enemyId];
            }
            else {
                var enemyData = this.choiceEnemy(candidates);
                enemyId = enemyData.id;
            }
            var x = baseX + interval * (i + 1);
            var y = 370;
            if (enemyData.meta['y']) {
                y = Math.floor(enemyData.meta['y']);
            }
            var enemy = new Game_Enemy(enemyId, x, y);
            this._enemies.push(enemy);
            if (anotherId > 0 && i == center) {
                i++;
                enemyData = $dataEnemies[anotherId];
                var x = baseX + interval * (i + 1);
                var y = 370;
                if (enemyData.meta['y']) {
                    y = Math.floor(enemyData.meta['y']);
                }
                var enemy = new Game_Enemy(anotherId, x, y);
                this._enemies.push(enemy);
            }
        }
        /*this.troop().members.forEach(function(member) {
            if ($dataEnemies[member.enemyId]) {
                var enemyId = member.enemyId;
                var x = member.x;
                var y = member.y;
                var enemy = new Game_Enemy(enemyId, x, y);
                if (member.hidden) {
                    enemy.hide();
                }
                this._enemies.push(enemy);
            }
        }, this);*/
        this.makeUniqueNames();
    };
    Game_Troop.prototype.decideNum = function () {
        var numList = $gameMap.enemyNum();
        var dice = Math.floor(numList.length * Math.random());
        if (!$gameSwitches.value(241)) {
            return numList[dice] - 1;
        }
        return numList[dice];
    };
    Game_Troop.prototype.enemyCandidates = function () {
        var regionId = $gameMap.regionId($gamePlayer.x, $gamePlayer.y);
        var lvList = $gameMap.enemyLvByPos(regionId);
        var result = [];
        for (var _i = 0, $dataEnemies_1 = $dataEnemies; _i < $dataEnemies_1.length; _i++) {
            var enemy = $dataEnemies_1[_i];
            if (!enemy) {
                continue;
            }
            if (!enemy.meta['LV']) {
                continue;
            }
            if (lvList.indexOf(enemy.meta['LV']) >= 0) {
                result.push(enemy);
            }
        }
        return result;
    };
    Game_Troop.prototype.choiceEnemy = function (enemyList) {
        return enemyList[Math.floor(enemyList.length * Math.random())];
    };
    Game_Map.prototype.isRandomEnemy = function () {
        if (this._enemyLv == null) {
            return false;
        }
        return this._enemyLv.length > 0;
    };
    Game_Map.prototype.enemyLv = function () {
        return this._enemyLv;
    };
    Game_Map.prototype.enemyLvByPos = function (regionId) {
        return this._enemyLvByPos[regionId];
    };
    Game_Map.prototype.enemyNum = function () {
        return this._enemyNum;
    };
    var _Game_Map_prototype_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function (mapId) {
        _Game_Map_prototype_setup.call(this, mapId);
        this.setupEnemyLv1(mapId);
        this.setupEnemyLv2(mapId);
    };
    Game_Map.prototype.setupEnemyLv2 = function (mapId) {
        this._enemyLvByPos = {};
        for (var i = 1; i <= 5; i++) {
            var enemyLv = [];
            this._enemyLvByPos[i] = enemyLv;
            var lv = $dataMap.meta['LV' + i];
            if (!lv) {
                continue;
            }
            var arr = lv.split(',');
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var l = arr_1[_i];
                enemyLv.push(l);
            }
        }
    };
    Game_Map.prototype.setupEnemyLv1 = function (mapId) {
        this._enemyLv = [];
        this._enemyNum = [];
        var lv = $dataMap.meta['LV'];
        if (!lv) {
            return;
        }
        var arr = lv.split(',');
        for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
            var l = arr_2[_i];
            this._enemyLv.push(l);
        }
        var num = $dataMap.meta['num'];
        if (!num) {
            return;
        }
        arr = num.split(',');
        for (var _a = 0, arr_3 = arr; _a < arr_3.length; _a++) {
            var n = arr_3[_a];
            this._enemyNum.push(Math.floor(n));
        }
    };
})(Saba || (Saba = {}));

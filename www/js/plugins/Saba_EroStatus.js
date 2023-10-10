var Saba;
(function (Saba) {
    var ERO_UP_PARAM = [
        //  ID,  淫欲P  H回数 快楽  評判 中出し　　お金
        [19, 1000, 1, 6, 0, 0, 0],
        [6, 1000, 1, 12, 0, 0, 60],
        [5, 2000, 1, 15, 0, 0, 60],
        [17, 2000, 1, 15, 0, 0, 60],
        [51, 500, 1, 6, 10, 0, 35],
        [61, 500, 1, 6, 0, 0, 0],
        [10, 2500, 1, 20, 0, 5, 0],
        [201, 1200, 1, 12, 0, 0, 0],
        [207, 1200, 1, 12, 0, 17, 0],
        [205, 2200, 1, 30, 0, 12, 0],
        [251, 1200, 1, 10, 10, 0, 20],
        [306, 1100, 1, 12, 0, 0, 0],
        [301, 1100, 1, 12, 0, 0, 0],
        [307, 1200, 1, 12, 0, 0, 0],
        [311, 2500, 1, 16, 0, 1, 0],
        [303, 2500, 1, 25, 0, 1, 0],
        [321, 2500, 1, 25, 0, 1, 0],
        [402, 1200, 1, 6, 0, 0, 0],
        [401, 1500, 1, 20, 0, 0, 0],
        [405, 2000, 1, 20, 0, 1, 0],
        [404, 2000, 1, 20, 0, 3, 0],
        [421, 2500, 1, 25, 0, 1, 0],
    ];
    Game_Interpreter.prototype.otomari = function (actorId) {
        var ero = $gameSystem.getEro(actorId);
        ero.sexCount += 1;
        var actor = $gameActors.actor(actorId);
        actor.eroPoint += 1000;
    };
    Game_Interpreter.prototype.eroUp = function (num) {
        p('eroUp' + num);
        num = Math.floor(num);
        var rate = 1;
        if ($gameSwitches.value(num + 900)) {
            rate = 2;
        }
        var actorId = 1;
        if (num < 200) {
            actorId = 1;
        }
        else if (num < 300) {
            actorId = 2;
        }
        else if (num < 400) {
            actorId = 3;
        }
        else if (num < 500) {
            actorId = 4;
        }
        for (var _i = 0, ERO_UP_PARAM_1 = ERO_UP_PARAM; _i < ERO_UP_PARAM_1.length; _i++) {
            var array = ERO_UP_PARAM_1[_i];
            if (array[0] === num) {
                var time = 150;
                for (var i = 1; i < array.length; i++) {
                    if (array[i] > 0) {
                        time += 40;
                    }
                }
                this.plusSexCount(actorId, array[2]);
                this.plusSens(actorId, Math.floor(array[3] / rate));
                this.plusFame(actorId, array[4]);
                this.plusNakadashi(actorId, array[5]);
                //this.plusMoney(actorId, array[6]);
                var exp = array[1];
                plusEro(actorId, exp);
                this.wait(time);
                return;
            }
        }
        console.error(num + 'のエロアップが存在しません');
    };
    function plusEro(actorId, n) {
        var actor = $gameActors.actor(actorId);
        p('淫欲Pアップ:' + n);
        actor.eroPoint += n;
        $gameTemp.addItemLog({ 'ero': n, iconIndex: 84, 'description': '', name: n + 'P' });
    }
    function calcEroExp() {
        var level = $gameActors.actor(1).level;
        if (level == 1) {
            level = 2;
        }
        var exp = $gameActors.actor(1).expForLevel(level) - $gameActors.actor(1).expForLevel(level - 1);
        return Math.floor(exp * 0.5);
    }
    Game_Interpreter.prototype.plusMoney = function (actorId, n) {
        if (n === 0) {
            return;
        }
        var upRate = $gameSystem.addBudget(n);
        $gameTemp.addEroLog([8, n]);
    };
    Game_Interpreter.prototype.plusSexCount = function (actorId, n) {
        if (n === 0) {
            Î;
            return;
        }
        var ero = $gameSystem.getEro(actorId);
        ero.sexCount += n;
        $gameTemp.addEroLog([7, n]);
    };
    Game_Interpreter.prototype.plusNakadashi = function (actorId, n) {
        if (n === 0) {
            return;
        }
        var ero = $gameSystem.getEro(actorId);
        ero.nakadashi += n;
        $gameTemp.addEroLog([6, n]);
    };
    /*Game_Interpreter.prototype.plusAnal = function (actorId, n) {
        if (n === 0) {
            return;
        }
        var ero = $gameSystem.getEro(1);
        var lastLv = ero.analLv();
        ero.anal += n;
        var lv = ero.analLv();
        if (lastLv != lv) {
            $gameTemp.addEroLog([2, n, lastLv, lv]);
        } else {
            $gameTemp.addEroLog([2, n]);
        }
    };*/
    Game_Interpreter.prototype.plusSens = function (actorId, n) {
        if (n === 0) {
            return;
        }
        var ero = $gameSystem.getEro(actorId);
        ero.eroLevel += n;
        $gameTemp.addEroLog([0, n]);
    };
    Game_Interpreter.prototype.plusFame = function (actorId, n) {
        if (n === 0) {
            return;
        }
        var ero = $gameSystem.getEro(actorId);
        ero.fame += n;
        $gameTemp.addEroLog([3, n]);
    };
    Game_Interpreter.prototype.isAllFirstEroFinished = function () {
        var switches = [919, 931, 956, 972];
        for (var i = 0; i < switches.length; i++) {
            if (!$gameSwitches.value(switches[i])) {
                return false;
            }
        }
        return true;
    };
})(Saba || (Saba = {}));

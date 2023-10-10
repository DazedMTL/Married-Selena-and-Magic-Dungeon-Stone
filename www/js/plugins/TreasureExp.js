Game_Interpreter.prototype.gainTreasureExp = function () {
    var exp = ($gameVariables.value(5) * (20 + $gameVariables.value(2))) / 40;
    exp *= $gameVariables.value(12);
    exp = Math.floor(exp);
    if (exp == 0) {
        return;
    }
    p('宝箱経験値:' + exp);
    $gameParty.allMembers().forEach(function (actor) {
        actor.gainExp(exp);
    });
    $gameVariables.setValue(20, exp);
    $gameTemp.addItemLog($dataItems[12]);
};
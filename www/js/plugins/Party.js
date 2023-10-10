var Saba;
(function (Saba) {
    function changeParty2() {
        if ($gameSystem.party1) {
            return;
        }
        var copy = $gameParty._actors.concat();
        $gameSystem.party1 = copy;
        $gameParty._actors = [];
        $gameParty.addActor(2);
    }
    Saba.changeParty2 = changeParty2;
    function changeParty1() {
        $gameParty._actors = $gameSystem.party1;
        $gameSystem.party1 = null;
    }
    Saba.changeParty1 = changeParty1;
})(Saba || (Saba = {}));

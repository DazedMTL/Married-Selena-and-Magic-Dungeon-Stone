var Saba;
(function (Saba) {
    function calcMapMedal() {
    }
    Saba.calcMapMedal = calcMapMedal;
    function calcMapMedalFloor(gameMap, info) {
        var medalId = 0;
        switch (gameMap.mapId()) {
            case 3:
                medalId = 600;
                break;
            case 5:
                medalId = 601;
                break;
            case 6:
                medalId = 602;
                break;
            case 39:
                medalId = 603;
                break;
            case 40:
                medalId = 604;
                break;
            default:
                return;
        }
        if ($gameMedals.hasMedal(medalId)) {
            return;
        }
        var data = gameMap.data();
        var w = gameMap.width();
        var total = 0;
        for (var x = 0; x < w; x++) {
            for (var y = 0; y < gameMap.height(); y++) {
                //p(data[x + y * w])
                if (data[x + y * w] == 1537) {
                    total++;
                }
            }
        }
        var mapped = 0;
        for (var i in info) {
            mapped++;
        }
        if (total <= mapped) {
            $gameMedals.addMedal(medalId);
        }
        /*p(total)
        p(mapped)*/
    }
    Saba.calcMapMedalFloor = calcMapMedalFloor;
})(Saba || (Saba = {}));

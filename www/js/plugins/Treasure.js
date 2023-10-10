var Saba;
(function (Saba) {
    function recoverTreasures() {
        var candidates1 = [301, 302, 303, 304, 305, 306, 307, 308];
        var candidates2 = [321, 322, 323, 324, 325, 326, 327, 328, 329, 330];
        var candidates3 = [341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351];
        var candidates4 = [361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371];
        var candidates4 = [381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391];
        recoverTreasures2(candidates1, 4);
        recoverTreasures2(candidates2, 5);
        recoverTreasures2(candidates3, 5);
        recoverTreasures2(candidates4, 6);
    }
    Saba.recoverTreasures = recoverTreasures;
    function recoverTreasures2(candidates, min) {
        var times = min + Math.floor(Math.random() * 2);
        for (var i = 0; i < times; i++) {
            var sw = candidates[Math.floor(candidates.length * Math.random())];
            $gameSwitches.setValue(sw, false);
        }
    }
    function getTreasure(level, materialOnly) {
        getTreasureOne(level, materialOnly);
    }
    Saba.getTreasure = getTreasure;
    function getTreasureOne(level, materialOnly) {
        var item = getTreasureByLevel(level, materialOnly);
        if ($gameParty.numItems(item) > 3) {
            p('再抽選');
            item = getTreasureByLevel(level);
        }
        $gameParty.gainItem(item, 1);
        $gameVariables.setValue(10, '\x1bI[' + item.iconIndex + ']' + item.name);
    }
    function getTreasureByLevel(level, materialOnly) {
        if (materialOnly) {
            return getTreasureMaterial(level);
        }
        else {
            var item = getTreasureCandidate(level, false);
            if (!item) {
                item = getTreasureCandidate(level, true);
            }
            return item;
        }
    }
    function getTreasureMaterial(level) {
        var candidate = [];
        for (var _i = 0, $dataItems_1 = $dataItems; _i < $dataItems_1.length; _i++) {
            var item = $dataItems_1[_i];
            if (!item) {
                continue;
            }
            if (parseInt(item.meta['LV']) != level) {
                continue;
            }
            candidate.push(item);
        }
        if (candidate.length > 0) {
            return candidate[Math.floor(candidate.length * Math.random())];
        }
        else {
            p('error:' + level);
            return null;
        }
    }
    function getTreasureCandidate(level, force) {
        var candidate = [];
        $gameParty.finishedItems = $gameParty.finishedItems || [];
        for (var _i = 0, $dataWeapons_1 = $dataWeapons; _i < $dataWeapons_1.length; _i++) {
            var weapon = $dataWeapons_1[_i];
            pushMaterial(candidate, weapon, level, force);
            //p(r)
        }
        for (var _a = 0, $dataArmors_1 = $dataArmors; _a < $dataArmors_1.length; _a++) {
            var armor = $dataArmors_1[_a];
            pushMaterial(candidate, armor, level, force);
        }
        //p(candidate)
        if (candidate.length > 0) {
            var id = candidate[Math.floor(candidate.length * Math.random())];
            return $dataItems[id];
        }
        else {
            return null;
        }
    }
    function pushMaterial(candidate, item, level, force) {
        if (!item) {
            return;
        }
        if (parseInt(item.meta['LV']) != level) {
            return;
        }
        if (!force) {
            if ($gameParty.hasItem(item, true)) {
                if (Math.random() > 0.4) {
                    p('hasItem:' + item.name);
                    return;
                }
            }
        }
        var recipe = DataManager.itemRecipe(item);
        if (!recipe || recipe.recipe.length == 0) {
            return;
        }
        if (item.wtypeId > 0) {
            if (isGotWeapon(item)) {
                if (Math.random() > 0.4) {
                    return;
                }
            }
        }
        else {
            if (isGotArmor(item)) {
                if (Math.random() > 0.4) {
                    return;
                }
            }
        }
        var r = recipe.recipe;
        for (var _i = 0, r_1 = r; _i < r_1.length; _i++) {
            var material = r_1[_i];
            var m = DataManager.decodeSynthesisItem(material[0]);
            if (!m.meta['LV']) {
                continue;
            }
            if (parseInt(m.meta['LV']) > level) {
                continue;
            }
            candidate.push(m.id);
        }
    }
    function isGotWeapon(weapon) {
        for (var _i = 0, _a = $gameParty.finishedItems; _i < _a.length; _i++) {
            var finishedItem = _a[_i];
            if (finishedItem.itemType == 1) {
                if (finishedItem.itemId == weapon.id) {
                    return true;
                }
            }
        }
        return false;
    }
    function isGotArmor(armor) {
        for (var _i = 0, _a = $gameParty.finishedItems; _i < _a.length; _i++) {
            var finishedItem = _a[_i];
            if (finishedItem.itemType == 2) {
                if (finishedItem.itemId == armor.id) {
                    return true;
                }
            }
        }
        return false;
    }
    Game_Player.prototype.makeEncounterCount = function () {
        var n = $gameMap.encounterStep();
        this._encounterCount = Math.randomInt(n) + Math.randomInt(n) + 1;
        if (this._encounterCount <= 5) {
            this._encounterCount += 3;
        }
    };
})(Saba || (Saba = {}));

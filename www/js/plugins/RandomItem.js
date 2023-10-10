var Saba;
(function (Saba) {
    var _Game_Interpreter_command302 = Game_Interpreter.prototype.command302;
    Game_Interpreter.prototype.command302 = function () {
        $gameTemp.getItem = null;
        if ($gameParty.inBattle()) {
            //return true;
        }
        if (!this._params[4]) {
            return _Game_Interpreter_command302.call(this);
        }
        var goods = [this._params];
        while (this.nextEventCode() === 605) {
            this._index++;
            goods.push(this.currentCommand().parameters);
        }
        while (this.nextEventCode() === 302) {
            this._index++;
            goods.push(this.currentCommand().parameters);
            while (this.nextEventCode() === 605) {
                this._index++;
                goods.push(this.currentCommand().parameters);
            }
        }
        var item2;
        if ($gameSwitches.value(11)) {
            var newGoods = [];
            for (var _i = 0, goods_1 = goods; _i < goods_1.length; _i++) {
                var item = goods_1[_i];
                switch (item[0]) {
                    case 0:
                        item2 = $dataItems[item[1]];
                        break;
                    case 1:
                        item2 = $dataWeapons[item[1]];
                        break;
                    case 2:
                        item2 = $dataArmors[item[1]];
                        break;
                }
                if ($gameParty.numItems(item2) === 0 && !$gameParty.hasEquipItem(item2)) {
                    newGoods.push(item);
                }
            }
            goods = newGoods;
        }
        var item = goods[Math.floor(goods.length * Math.random())];
        if (!item) {
            return true;
        }
        switch (item[0]) {
            case 0:
                item2 = $dataItems[item[1]];
                break;
            case 1:
                item2 = $dataWeapons[item[1]];
                break;
            case 2:
                item2 = $dataArmors[item[1]];
                break;
        }
        /*if $game_party.item_number(item2) > 0
          $game_switches[543] = true
        end*/
        $gameVariables.setValue(10, '\x1bI[' + item2.iconIndex + ']' + item2.name);
        if (!$gameParty.inBattle()) {
            $gameParty.gainItem(item2, 1);
        }
        $gameTemp.getItem = item2;
        return true;
    };
    Game_Interpreter.prototype.calcTreasureType = function (valId) {
        var min = parseInt($dataMap.meta['箱min']);
        var max = parseInt($dataMap.meta['箱max']) + 1;
        var num = Math.randomInt(max - min) + min;
        var copyEvents = [];
        var boxEvents = [];
        for (var i = 0; i < $gameMap._events.length; i++) {
            var e = $gameMap._events[i];
            if (!e) {
                continue;
            }
            if (e && e.event().name == '箱') {
                var key = [$gameMap._mapId, i, 'A'];
                $gameSelfSwitches.setValue(key, false);
                boxEvents.push(e);
            }
            if (e && e.event().name == 'コピー箱') {
                copyEvents.push(e);
            }
        }
        var okEvents = [];
        for (var i = 0; i < num; i++) {
            if (boxEvents.length === 0) {
                break;
            }
            var index = Math.randomInt(boxEvents.length);
            okEvents.push(boxEvents[index]);
            boxEvents.splice(index, 1);
        }
        for (var i = 0; i < boxEvents.length; i++) {
            boxEvents[i].erase();
        }
        for (var i = 0; i < okEvents.length; i++) {
            var e = okEvents[i];
            var index = Math.randomInt(copyEvents.length);
            e.copyEvent = copyEvents[index].event();
            e._pageIndex = -2;
            e.refresh();
        }
        for (var i = 0; i < copyEvents.length; i++) {
            copyEvents[i].erase();
        }
    };
    var Game_Event_event = Game_Event.prototype.event;
    Game_Event.prototype.event = function () {
        if (this.copyEvent) {
            return this.copyEvent;
        }
        return Game_Event_event.call(this);
    };
    BattleManager.gainDropItems = function () {
        var items = this._rewards.items;
        var isDungeon = $gameSwitches.value(1);
        $gameSwitches.setValue(1, false);
        items.forEach(function (item) {
            $gameParty.gainItem(item, 1);
        });
        $gameSwitches.setValue(1, isDungeon);
    };
    var _Game_Troop_makeDropItems = Game_Troop.prototype.makeDropItems;
    Game_Troop.prototype.makeDropItems = function () {
        var items = _Game_Troop_makeDropItems.call(this);
        p(items);
        if (items.length > 0) {
            return items;
        }
        var level = getItemLevel();
        var list = [];
        for (var i = 1; i < $dataItems.length; i++) {
            var item = $dataItems[i];
            if (!item) {
                continue;
            }
            var lv = parseInt(item.meta['LV']);
            if (lv == level) {
                list.push(item);
            }
        }
        p(list);
        if (list.length === 0) {
            return [];
        }
        var getItem = list[Math.floor(Math.random() * list.length)];
        if (getItem) {
            return [getItem];
        }
        else {
            return [];
        }
    };
    function getItemLevel() {
        var list = [];
        switch ($gameVariables.value(2)) {
            case 1:
                list.push(1);
                list.push(2);
                break;
            case 2:
                list.push(1);
                list.push(2);
                list.push(3);
                break;
            case 3:
                list.push(2);
                list.push(3);
                list.push(4);
                break;
            case 4:
                list.push(3);
                list.push(4);
                list.push(5);
                break;
            case 5:
                list.push(4);
                list.push(5);
                list.push(6);
                list.push(7);
                break;
            case 6:
                list.push(5);
                list.push(6);
                list.push(7);
                list.push(8);
                break;
        }
        return list[Math.floor(Math.random() * list.length)];
        ;
    }
    BattleManager.displayDropItems = function () {
        var items = this._rewards.items;
        if (items.length > 0) {
            $gameMessage.newPage();
            items.forEach(function (item) {
                $gameMessage.add(TextManager.obtainItem.format('\x1bI[' + item.iconIndex + ']' + item.name));
            });
        }
    };
    Game_Map.prototype.restoreTreasure = function () {
        var events = this.events();
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            if (event.isTreasure()) {
                var sw = ['A', 'B', 'C'];
                for (var _i = 0, sw_1 = sw; _i < sw_1.length; _i++) {
                    var c = sw_1[_i];
                    var key = [event._mapId, event._eventId, c];
                    $gameSelfSwitches.setValue(key, false);
                }
            }
        }
    };
    Game_Event.prototype.isTreasure = function () {
        return this.event().note.indexOf('箱') >= 0;
    };
    Game_Party.prototype.hasEquipItem = function (item) {
        for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.armors().indexOf(item) >= 0) {
                return true;
            }
        }
        return false;
    };
})(Saba || (Saba = {}));

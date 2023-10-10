var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $gameMedals = null;
var Saba;
(function (Saba) {
    var _Game_System_prototype_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _Game_System_prototype_initialize.call(this);
        this.medalMap = {};
        this.medalParamMap = {};
    };
    var Game_Medals = /** @class */ (function () {
        function Game_Medals(medalMap) {
            this._medalMap = medalMap;
        }
        Game_Medals.prototype.addMedal = function (medalId) {
            if (this._medalMap[medalId]) {
                return;
            }
            p('addMedal:' + medalId);
            this._medalMap[medalId] = true;
            var newMedal = $dataArmors[medalId];
            var isShowLog = $gameSwitches.value(1);
            $gameSwitches.setValue(1, true);
            $gameParty.gainItem(newMedal, 1);
            var gold = parseInt(newMedal.meta['gold']);
            if (gold > 0) {
                $gameParty.gainGold(gold);
            }
            $gameSwitches.setValue(1, isShowLog);
            this.onMedal();
            return true;
        };
        Game_Medals.prototype.armorList = function () {
            var ret = [];
            //for (var id in this._medalMap) {
            for (var i = 501; i < 999; i++) {
                var item = $dataArmors[i];
                if (item.name) {
                    ret.push(item);
                }
            }
            return ret;
        };
        Game_Medals.prototype.hasMedal = function (id) {
            return this._medalMap[id];
        };
        Game_Medals.prototype.onMedal = function () {
            var n = this._updateParam('medal', 1);
            if (n >= 30) {
                this.addMedal(592);
            }
        };
        Game_Medals.prototype.onStep = function () {
            var n = this._updateParam('step', 1);
            if (n >= 1000) {
                this.addMedal(535);
            }
            if (n >= 5000) {
                this.addMedal(536);
            }
            if (n >= 10000) {
                this.addMedal(537);
            }
        };
        Game_Medals.prototype.onSecret = function () {
            var n = this._updateParam('secret', 1);
            if (n >= 1) {
                this.addMedal(538);
            }
            if (n >= 5) {
                this.addMedal(539);
            }
            if (n >= 7) {
                this.addMedal(540);
            }
        };
        Game_Medals.prototype.onOyako = function () {
            var n = this._updateParam('oyako', 1);
            if (n >= 1) {
                this.addMedal(511);
            }
            if (n >= 5) {
                this.addMedal(512);
            }
        };
        Game_Medals.prototype.onDefeated = function () {
            var n = this._updateParam('defeated', 1);
            if (n >= 1) {
                this.addMedal(541);
            }
            if (n >= 10) {
                this.addMedal(542);
            }
        };
        Game_Medals.prototype.onTreasure = function () {
            var n = this._updateParam('treasure', 1);
            if (n >= 1) {
                this.addMedal(586);
            }
            if (n >= 5) {
                this.addMedal(587);
            }
            if (n >= 10) {
                this.addMedal(588);
            }
            if (n >= 15) {
                this.addMedal(589);
            }
            if (n >= 20) {
                this.addMedal(590);
            }
        };
        Game_Medals.prototype.onFloorDown = function () {
            var n = this._updateParam('floorDown', 1);
            if (n >= 8) {
                this.addMedal(543);
            }
            if (n >= 16) {
                this.addMedal(544);
            }
            if (n >= 30) {
                this.addMedal(545);
            }
            if (n >= 100) {
                this.addMedal(546);
            }
        };
        Game_Medals.prototype.onVictory = function () {
            var n = this._updateParam('victory', 1);
            if (n >= 1) {
                this.addMedal(521);
            }
            if (n >= 10) {
                this.addMedal(522);
            }
            if (n >= 50) {
                this.addMedal(523);
            }
            if (n >= 100) {
                this.addMedal(524);
            }
            if (n >= 150) {
                this.addMedal(525);
            }
        };
        Game_Medals.prototype.onHire = function () {
            var n = $gameVariables.value(18);
            switch (n) {
                case 4:
                    this.addMedal(518);
                    break;
                case 8:
                    this.addMedal(519);
                    break;
                case 13:
                    this.addMedal(520);
                    break;
            }
        };
        Game_Medals.prototype.onLevelUp = function () {
            var n = $gameActors.actor(1).level;
            if (n >= 3) {
                this.addMedal(527);
            }
            if (n >= 8) {
                this.addMedal(528);
            }
            if (n >= 10) {
                this.addMedal(529);
            }
            if (n >= 13) {
                this.addMedal(530);
            }
            if (n >= 20) {
                this.addMedal(531);
            }
        };
        Game_Medals.prototype.onSexCount = function () {
            var status = $gameSystem.getEro(1);
            var sexCount = status.sexCount;
            for (var i in status.mob) {
                sexCount++;
            }
            if (sexCount >= 10) {
                this.addMedal(503);
            }
            if (sexCount >= 20) {
                this.addMedal(504);
            }
            var fera = status.kounaisyasei;
            /*if (fera > 0) {
                this.addMedal(505);
            }*/
            var anal = status.analsyasei;
            if (anal > 0) {
                this.addMedal(506);
            }
        };
        Game_Medals.prototype.onNinshin = function () {
            var status = $gameSystem.getEro(1);
            var n = status.ninshin - 1;
            if (n >= 1) {
                this.addMedal(507);
            }
            if (n >= 10) {
                this.addMedal(508);
            }
            if (status.bote && $gameSystem.getEro(2).bote && $gameSystem.getEro(3).bote && $gameSystem.getEro(4).bote) {
                this.addMedal(515);
            }
            if (status.bote && $gameSystem.getEro(2).bote) {
                this.addMedal(514);
                if (status.taneoya == $gameSystem.getEro(2).taneoya) {
                    this.addMedal(513);
                }
            }
        };
        Game_Medals.prototype.onSyusan = function () {
            var status = $gameSystem.getEro(1);
            var n = status.syusan - 1;
            if (n >= 1) {
                this.addMedal(509);
            }
            if (n >= 2) {
                this.addMedal(510);
            }
            var total = n;
            total += $gameSystem.getEro(2).syusan;
            total += $gameSystem.getEro(3).syusan;
            total += $gameSystem.getEro(4).syusan - 3;
            if (total >= 10) {
                this.addMedal(516);
            }
        };
        Game_Medals.prototype.onNoDamage = function () {
            var n = this._updateParam('nodamage', 1);
            if (n >= 5) {
                this.addMedal(531);
            }
            if (n >= 20) {
                this.addMedal(532);
            }
            if (n >= 50) {
                this.addMedal(533);
            }
            if (n >= 100) {
                this.addMedal(534);
            }
        };
        Game_Medals.prototype.onExp = function (n) {
            if (n <= 0) {
                return;
            }
            var exp = this._updateParam('exp', n);
            if (exp >= 500) {
                this.addMedal(521);
            }
            if (exp >= 2000) {
                this.addMedal(522);
            }
            if (exp >= 5000) {
                this.addMedal(523);
            }
        };
        Game_Medals.prototype.onGold = function (n) {
            if (n <= 0) {
                return;
            }
            var gold = this._updateParam('gold', n);
        };
        Game_Medals.prototype.onUseItem = function (itemId) {
            if (itemId <= 0) {
                return;
            }
            var num = this._updateParam('item' + itemId, 1);
            switch (itemId) {
                // 回復薬
                case 1:
                    if (num == 1) {
                        this.addMedal(539);
                    }
                    break;
            }
        };
        Game_Medals.prototype.onCounterAttack = function () {
        };
        Game_Medals.prototype.onLethalAttack = function (n) {
            if (n <= 0) {
                return;
            }
            var lethal = this._updateParam('lethal', n);
            if (lethal >= 10) {
                //this.addMedal(511);
            }
        };
        Game_Medals.prototype.onDeath = function () {
            var n = this._updateParam('death', 1);
            if (n >= 1) {
                this.addMedal(551);
            }
            if (n >= 5) {
                this.addMedal(552);
            }
        };
        Game_Medals.prototype.onRare = function () {
            var n = this._updateParam('rare', 1);
            if (n >= 5) {
                this.addMedal(593);
            }
            if (n >= 15) {
                this.addMedal(594);
            }
            if (n >= 50) {
                this.addMedal(595);
            }
        };
        Game_Medals.prototype.onMake = function () {
            var n = this._updateParam('make', 1);
            if (n >= 5) {
                this.addMedal(581);
            }
            if (n >= 15) {
                this.addMedal(582);
            }
            if (n >= 30) {
                this.addMedal(583);
            }
            if (n >= 40) {
                this.addMedal(584);
            }
            if (n >= 50) {
                this.addMedal(585);
            }
        };
        Game_Medals.prototype.onOverkill = function (overkill) {
            if (overkill >= 30) {
                this.addMedal(536);
            }
        };
        Game_Medals.prototype._updateParam = function (name, plus) {
            var map = $gameSystem.medalParamMap;
            map[name] = map[name] || 0;
            map[name] += plus;
            return map[name];
        };
        return Game_Medals;
    }());
    var _BattleManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function () {
        _BattleManager_processVictory.call(this);
        $gameMedals.onVictory();
    };
    var _Game_Party_prototype_gainGold = Game_Party.prototype.gainGold;
    Game_Party.prototype.gainGold = function (amount) {
        _Game_Party_prototype_gainGold.call(this, amount);
        if (amount > 0 && $gameSwitches.value(1)) {
            if (!$gameParty.inBattle()) {
                $gameVariables.setValue(20, amount);
                $gameTemp.addItemLog($dataItems[11]);
            }
        }
        $gameMedals.onGold(amount);
    };
    var _Game_Actor_prototype_gainExp = Game_Actor.prototype.gainExp;
    Game_Actor.prototype.gainExp = function (exp) {
        if (this.actorId() == 1) {
            $gameMedals.onExp(exp);
        }
        _Game_Actor_prototype_gainExp.call(this, exp);
    };
    var DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        DataManager_createGameObjects.call(this);
        $gameMedals = new Game_Medals($gameSystem.medalMap);
    };
    Game_Party.prototype.hasMedal = function (medal) {
        for (var _i = 0, _a = this.aliveMembers(); _i < _a.length; _i++) {
            var actor = _a[_i];
            if (actor.hasMedal(medal)) {
                return true;
            }
        }
        return false;
    };
    Game_Actor.prototype.hasMedal = function (medal) {
        for (var _i = 0, _a = this.armors(); _i < _a.length; _i++) {
            var armor = _a[_i];
            if (armor.id == medal) {
                return true;
            }
        }
        return false;
    };
    var Scene_Medal = /** @class */ (function (_super) {
        __extends(Scene_Medal, _super);
        function Scene_Medal() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_Medal.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createHelpWindow();
            this.createMedalWindow();
        };
        Scene_Medal.prototype.createHelpWindow = function () {
            this._helpWindow = new Window_Help(3);
            this.addWindow(this._helpWindow);
        };
        Scene_Medal.prototype.createMedalWindow = function () {
            this._medalWindow = new Window_Medal(0, this._helpWindow.height);
            this.addWindow(this._medalWindow);
            this._medalWindow.activate();
            this._medalWindow.refresh();
            this._medalWindow.setHandler('change', this.onChange.bind(this));
            this._medalWindow.setHandler('cancel', this.popScene.bind(this));
            this._medalWindow.select(0);
        };
        Scene_Medal.prototype.onChange = function () {
            var item = this._medalWindow.item();
            var hint = item.meta['hintId'];
            if ($gameMedals.hasMedal(item.id)) {
                this._helpWindow.setText(Saba.getMedalDescription(item));
            }
            else if (hint && $gameMedals.hasMedal(hint)) {
                this._helpWindow.setText(Saba.getMedalHintDescription(item));
            }
            else {
                this._helpWindow.setText('？？？');
            }
        };
        return Scene_Medal;
    }(Scene_MenuBase));
    var Window_Medal = /** @class */ (function (_super) {
        __extends(Window_Medal, _super);
        function Window_Medal() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._armorList = [];
            return _this;
        }
        Window_Medal.prototype.initialize = function (x, y) {
            Window_Selectable.prototype.initialize(x, y, Graphics.boxWidth, Graphics.boxHeight - y);
        };
        Window_Medal.prototype.refresh = function () {
            this.makeItems();
            _super.prototype.refresh.call(this);
        };
        Window_Medal.prototype.makeItems = function () {
            this._armorList = $gameMedals.armorList();
        };
        Window_Medal.prototype.maxItems = function () {
            return this._armorList.length;
        };
        Window_Medal.prototype.maxCols = function () {
            return 2;
        };
        Window_Medal.prototype.drawItem = function (index) {
            var item = this._armorList[index];
            if (item) {
                var rect = this.itemRect(index);
                rect.width -= this.textPadding();
                var enabled = this.isEnabled(item);
                this.changePaintOpacity(enabled);
                if (enabled) {
                    this.drawItemName(item, rect.x, rect.y, rect.width);
                }
                else {
                    this.drawItemName2(item, rect.x, rect.y, rect.width);
                }
                this.changePaintOpacity(true);
            }
        };
        Window_Medal.prototype.isEnabled = function (item) {
            return $gameMedals.hasMedal(item.id);
        };
        Window_Medal.prototype.item = function () {
            return this._armorList[this._index];
        };
        Window_Medal.prototype.drawItemName2 = function (item, x, y, width) {
            width = width || 312;
            if (item) {
                var iconBoxWidth = Window_Base._iconWidth + 4;
                this.resetTextColor();
                this.drawIcon(item.iconIndex, x + 2, y + 2);
                var name = '';
                for (var i = 0; i < item.name.length; i++) {
                    name += '？';
                }
                this.drawText(name, x + iconBoxWidth, y, width - iconBoxWidth);
            }
        };
        ;
        return Window_Medal;
    }(Window_Selectable));
    var _Scene_Menu_prototype_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_prototype_createCommandWindow.call(this);
        this._commandWindow.setHandler('medal', function () {
            SceneManager.push(Scene_Medal);
        });
    };
    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_extractSaveContents.call(this, contents);
        $gameMedals = new Game_Medals($gameSystem.medalMap);
    };
    var _Game_Party_prototype_consumeItem = Game_Party.prototype.consumeItem;
    Game_Party.prototype.consumeItem = function (item) {
        _Game_Party_prototype_consumeItem.call(this, item);
        $gameMedals.onUseItem(item.id);
    };
    Game_Party.prototype.getParamTotal = function (name) {
        var n = 0;
        for (var _i = 0, _a = this.aliveMembers(); _i < _a.length; _i++) {
            var actor = _a[_i];
            n += actor.getParamTotal(name);
        }
        return n;
    };
    Game_Enemy.prototype.getParamTotal = function (name) {
        return 0;
    };
    Game_Actor.prototype.getParamTotal = function (name) {
        var n = 0;
        for (var _i = 0, _a = this.armors(); _i < _a.length; _i++) {
            var armor = _a[_i];
            if (!armor) {
                continue;
            }
            if (armor.meta['actor']) {
                var actor = $gameActors.actor(parseInt(armor.meta['actor']));
                var skills = actor.skills();
                for (var _b = 0, skills_1 = skills; _b < skills_1.length; _b++) {
                    var skill = skills_1[_b];
                    if (skill.meta[name]) {
                        n += parseInt(skill.meta[name]);
                    }
                }
            }
            else {
                if (armor.meta[name]) {
                    n += parseInt(armor.meta[name]);
                }
            }
        }
        return n;
    };
    Game_Actor.prototype.getParamTotal2 = function (name) {
    };
})(Saba || (Saba = {}));

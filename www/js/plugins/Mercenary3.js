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
var Saba;
(function (Saba) {
    var _Scene_Menu_prototype_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_prototype_createCommandWindow.call(this);
        this._commandWindow.setHandler('mercenaryList', this.commandMercenaryList.bind(this));
    };
    Scene_Menu.prototype.commandMercenaryList = function () {
        SceneManager.push(Scene_MercenaryList);
    };
    var Scene_MercenaryList = /** @class */ (function (_super) {
        __extends(Scene_MercenaryList, _super);
        function Scene_MercenaryList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_MercenaryList.prototype.create = function () {
            _super.prototype.create.call(this);
            this.selectMercenary();
            this.createHelpWindow();
            this.createStatusWindow();
            this.createItemWindow();
        };
        Scene_MercenaryList.prototype.createHelpWindow = function () {
            this._helpWindow = new Window_Help(3);
            this.addWindow(this._helpWindow);
        };
        Scene_MercenaryList.prototype.selectMercenary = function () {
            for (var _i = 0, _a = $gameParty.armors(); _i < _a.length; _i++) {
                var armor = _a[_i];
                if (armor.atypeId == 5) {
                    this._armor = armor;
                    return;
                }
            }
        };
        Scene_MercenaryList.prototype.createItemWindow = function () {
            var wx = 0;
            var www = 0;
            var wy = this._statusWindow.y + this._statusWindow.height;
            var ww = Graphics.boxWidth - www;
            var wh = Graphics.boxHeight - wy;
            this._itemWindow = new Window_MecenaryItem2(wx + www, wy, ww, wh);
            this._itemWindow.setHelpWindow(this._helpWindow);
            this._itemWindow.setStatusWindow(this._statusWindow);
            this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
            this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
            this._itemWindow.setHandler('change', this.onItemChange.bind(this));
            this.addWindow(this._itemWindow);
            this._itemWindow.activate();
            this._itemWindow.refresh();
            this._itemWindow.select(0);
        };
        Scene_MercenaryList.prototype.onItemOk = function () {
            SoundManager.playOk();
            this._itemWindow.deactivate();
            this._statusWindow.activate();
            this._statusWindow.select(0);
        };
        Scene_MercenaryList.prototype.onItemCancel = function () {
            $gameVariables.setValue(81, 0);
            this.popScene();
        };
        Scene_MercenaryList.prototype.onItemChange = function () {
            if (this._itemWindow.item()) {
                this._statusWindow.setArmor(this._itemWindow.item());
            }
        };
        Scene_MercenaryList.prototype.createStatusWindow = function () {
            this._statusWindow = new Saba.Window_MercenaryStatus2(0, this._helpWindow.height, Graphics.width, Graphics.height - this._helpWindow.height - 290, this._armor);
            this.addWindow(this._statusWindow);
            //this._statusWindow.activate();
            this._statusWindow.setHandler('change', this.onStatusChange.bind(this));
            this._statusWindow.setHandler('ok', this.onOk.bind(this));
            this._statusWindow.setHandler('cancel', this.onCancel.bind(this));
        };
        Scene_MercenaryList.prototype.helpWindowText = function () {
            if (this._statusWindow.active) {
                return this._statusWindow.helpWindowText();
            }
            if (!this._armor) {
                return '';
            }
            var actor = $gameActors.actor(parseInt(this._armor.meta['actor']));
            return actor.name() + '\n' + actor.profile();
        };
        Scene_MercenaryList.prototype.onStatusChange = function () {
            this._helpWindow.setText(this.helpWindowText());
        };
        Scene_MercenaryList.prototype.onOk = function () {
            //$gameVariables.setValue(81, 0);
            //this.popScene();
            this._itemWindow.activate();
            this._statusWindow.deactivate();
            this._statusWindow.select(-1);
        };
        Scene_MercenaryList.prototype.onCancel = function () {
            //$gameVariables.setValue(81, 0);
            //this.popScene();
            this._itemWindow.activate();
            this._statusWindow.deactivate();
            this._statusWindow.select(-1);
            this._itemWindow.updateHelp();
        };
        Scene_MercenaryList.prototype.onConfirmCancel = function () {
            this._confirmWindow.hide();
            this._confirmWindow.deactivate();
            this._msgWindow.hide();
            this._msgWindow.activate();
            this._statusWindow.activate();
        };
        return Scene_MercenaryList;
    }(Scene_MenuBase));
    var Window_MecenaryItem2 = /** @class */ (function (_super) {
        __extends(Window_MecenaryItem2, _super);
        function Window_MecenaryItem2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_MecenaryItem2.prototype.makeItemList = function () {
            var armorList = $gameParty.allItems();
            for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
                var m = _a[_i];
                if (!m.isMercenary()) {
                    continue;
                }
                armorList = armorList.concat(m.getAllMembers());
            }
            this._data = armorList.filter(function (item) {
                return this.includes(item);
            }, this);
        };
        Window_MecenaryItem2.prototype.maxPageRows = function () {
            return 6;
        };
        Window_MecenaryItem2.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
            this.drawTitle();
        };
        Window_MecenaryItem2.prototype.setHelpWindowItem = function (item) {
            if (!item) {
                return;
            }
            this._helpWindow.setText(Saba.getArmorDescription(item, true));
        };
        Window_MecenaryItem2.prototype.itemRect = function (index) {
            var rect = new Rectangle();
            var maxCols = this.maxCols();
            rect.width = this.itemWidth();
            rect.height = this.itemHeight();
            rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
            rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 32;
            return rect;
        };
        Window_MecenaryItem2.prototype.drawTitle = function () {
            this.changeTextColor(this.systemColor());
            this.contents.fontSize = 22;
            var titles = ['力', '魔', '体', '精', '速', '運'];
            var index = 0;
            for (var _i = 0, titles_1 = titles; _i < titles_1.length; _i++) {
                var t = titles_1[_i];
                this.drawText(t, 342 + index * 42, -4, 138, this.lineHeight());
                index++;
            }
            this.contents.fontSize = 26;
        };
        Window_MecenaryItem2.prototype.drawItem = function (index) {
            var item = this._data[index];
            if (item) {
                var rect = this.itemRect(index);
                rect.width -= this.textPadding();
                this.changePaintOpacity(this.isEnabled(item));
                this.drawItemName(item, rect.x, rect.y, rect.width);
                var actor = $gameActors.actor(parseInt(item.meta['actor']));
                //drawMercenaryStatus(item, this, rect.x - 120, rect.y);
                this.drawActorParam(actor, 340, rect.y + 2);
            }
        };
        return Window_MecenaryItem2;
    }(Saba.Window_MecenaryItem));
    Saba.Window_MecenaryItem2 = Window_MecenaryItem2;
    function getAllMercenaryActors() {
        var result = [];
        for (var _i = 0, _a = $gameParty.allItems(); _i < _a.length; _i++) {
            var a = _a[_i];
            if (!a.meta['actor']) {
                continue;
            }
            result.push($gameActors.actor(a.meta['actor']));
        }
        var members = [$gameActors.actor(32), $gameActors.actor(33)];
        for (var _b = 0, members_1 = members; _b < members_1.length; _b++) {
            var m = members_1[_b];
            if (!m.isMercenary()) {
                continue;
            }
            for (var _c = 0, _d = m.getAllMembers(); _c < _d.length; _c++) {
                var m2 = _d[_c];
                result.push($gameActors.actor(m2.meta['actor']));
            }
        }
        return result;
    }
    Saba.getAllMercenaryActors = getAllMercenaryActors;
    function saveDailyMercenary() {
        var armorList = $gameParty.allItems();
        for (var _i = 0, armorList_1 = armorList; _i < armorList_1.length; _i++) {
            var a = armorList_1[_i];
            if (!a.meta['actor']) {
                continue;
            }
            $gameActors.actor(a.meta['actor']).daily = false;
        }
        for (var _a = 0, _b = $gameParty.members(); _a < _b.length; _a++) {
            var m = _b[_a];
            if (!m.isMercenary()) {
                continue;
            }
            for (var _c = 0, _d = m.getAllMembers(); _c < _d.length; _c++) {
                var m2 = _d[_c];
                //p($gameActors.actor(m2.meta['actor']).actorId())
                $gameActors.actor(m2.meta['actor']).daily = true;
            }
        }
    }
    Saba.saveDailyMercenary = saveDailyMercenary;
    function upNinshin(actorId, ninshin, mobId) {
        if ($gameVariables.value(30) == 1) {
            ninshin *= 2;
        }
        if ($gameVariables.value(30) == 2) {
            return;
        }
        var ero = $gameSystem.getEro(actorId);
        if (ero.ninshinRate >= 100) {
            return;
        }
        Saba.upNinshinRate(ero, ninshin, mobId);
    }
    Saba.upNinshin = upNinshin;
    function upNinshinMercenary(actorId, ninshin) {
        if ($gameVariables.value(30) == 1) {
            ninshin *= 2;
        }
        if ($gameVariables.value(30) == 2) {
            return;
        }
        var ero = $gameSystem.getEro(actorId);
        if (ero.ninshinRate >= 100) {
            return;
        }
        var list = getAllMercenaryActors();
        var dice = Math.floor(Math.random() * list.length);
        var mob = list[dice];
        var mobId = mob.actorId() + 400;
        Saba.upNinshinRate(ero, ninshin, mobId);
    }
    Saba.upNinshinMercenary = upNinshinMercenary;
    function upDailyMercenary(actorId) {
        var result = [];
        var list = getAllMercenaryActors();
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var a = list_1[_i];
            if (Math.random() > 0.4) {
                result.push(a.actorId() + 400);
            }
        }
        Saba.upEroStatus(actorId, result);
        /*if ($gameSwitches.value(241)) {
            upSubMercenary(3, [451, 452]);
            upSubMercenary(4, [451, 452]);
        }*/
    }
    Saba.upDailyMercenary = upDailyMercenary;
    function upDailyMercenary3() {
        var result = [];
        var list = getAllMercenaryActors();
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var a = list_2[_i];
            // if (a.daily) {
            result.push(a.actorId() + 400);
            //}
        }
        if ($gameSwitches.value(568)) {
            var eroList = [$gameSystem.getEro(1), $gameSystem.getEro(2), $gameSystem.getEro(3), $gameSystem.getEro(4)];
        }
        else {
            var eroList = [$gameSystem.getEro(1), $gameSystem.getEro(3), $gameSystem.getEro(4)];
        }
        Saba.upEroStatus(1, result, eroList);
    }
    Saba.upDailyMercenary3 = upDailyMercenary3;
    function upSubMercenary(actorId, mobIdList) {
        Saba.upEroStatus(actorId, mobIdList);
    }
})(Saba || (Saba = {}));

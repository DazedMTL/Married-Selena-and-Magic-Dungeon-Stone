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
    Game_System.prototype.clearBaisyun = function (actorId, id) {
        this._baisyunMap = this._baisyunMap || {};
        this._baisyunMap[actorId] = this._baisyunMap[actorId] || {};
        this._baisyunMap[actorId][id] = true;
    };
    Game_System.prototype.isClearBaisyun = function (actorId, id) {
        this._baisyunMap = this._baisyunMap || {};
        this._baisyunMap[actorId] = this._baisyunMap[actorId] || {};
        return this._baisyunMap[actorId][id];
    };
    var sayaList = [
        { id: 1, actorId: 1, name: '手コキ', common: 801, open: [], cond: { '理性以下': 90 } },
        { id: 2, actorId: 1, name: '素股', common: 805, open: [1], cond: { '理性以下': 70 } }
    ];
    var sonyaList = [
        { id: 1, actorId: 2, name: 'フェラ', common: 821, open: [], cond: { '理性以下': 90 } },
    ];
    var Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        if (command == 'selectBaisyun') {
            SceneManager.push(Scnee_BaisyunSelect);
            return;
        }
        ;
        Game_Interpreter_prototype_pluginCommand.call(this, command, args);
    };
    var Scnee_BaisyunSelect = /** @class */ (function (_super) {
        __extends(Scnee_BaisyunSelect, _super);
        function Scnee_BaisyunSelect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scnee_BaisyunSelect.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createDestWindow();
        };
        Scnee_BaisyunSelect.prototype.createDestWindow = function () {
            this._baisyunWindow = new Window_BaisyunSelect();
            this._baisyunWindow.setHandler('ok', this.onOk.bind(this));
            this._baisyunWindow.setHandler('cancel', this.onCancel.bind(this));
            this.addWindow(this._baisyunWindow);
        };
        Scnee_BaisyunSelect.prototype.onOk = function () {
            this._baisyunWindow.deactivate();
            var data = this._baisyunWindow.selectedData();
            $gameTemp.reserveCommonEvent(data.common);
            this.popScene();
        };
        Scnee_BaisyunSelect.prototype.onCancel = function () {
            $gameVariables.setValue(20, 0);
            $gameTemp.reserveCommonEvent(799);
            this.popScene();
        };
        Scnee_BaisyunSelect.prototype.start = function () {
            Scene_MenuBase.prototype.start.call(this);
            this._baisyunWindow.refresh();
            this._baisyunWindow.activate();
            this._baisyunWindow.select(0);
        };
        ;
        return Scnee_BaisyunSelect;
    }(Scene_MenuBase));
    Saba.Scnee_BaisyunSelect = Scnee_BaisyunSelect;
    var Window_BaisyunSelect = /** @class */ (function (_super) {
        __extends(Window_BaisyunSelect, _super);
        function Window_BaisyunSelect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_BaisyunSelect.prototype.initialize = function () {
            _super.prototype.initialize.call(this, 450, 200, this.windowWidth(), this.windowHeight());
        };
        Window_BaisyunSelect.prototype.windowWidth = function () {
            return Graphics.boxWidth - 250 * 2;
        };
        ;
        Window_BaisyunSelect.prototype.makeDestList = function () {
            if (this._baisyunList) {
                return;
            }
            this._baisyunList = [];
            var list;
            if ($gameSwitches.value(41)) {
                // サヤ
                list = sayaList;
            }
            if ($gameSwitches.value(42)) {
                // ソーニャ
                list = sonyaList;
            }
            if ($gameSwitches.value(43)) {
            }
            if ($gameSwitches.value(44)) {
            }
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var data = list_1[_i];
                if (this._isMatch(data)) {
                    this._baisyunList.push(data);
                }
            }
        };
        Window_BaisyunSelect.prototype._isMatch = function (data) {
            return true;
        };
        Window_BaisyunSelect.prototype.windowHeight = function () {
            this.makeDestList();
            return this._baisyunList.length * this.lineHeight() + 18 * 2;
        };
        Window_BaisyunSelect.prototype.selectedData = function () {
            return this._baisyunList[this.index()];
        };
        Window_BaisyunSelect.prototype.drawItem = function (index) {
            var data = this._baisyunList[index];
            var rect = this.itemRect(index);
            if ($gameSystem.isClearBaisyun(data.actorId, data.id)) {
                this.drawIcon(1603, rect.x, rect.y);
            }
            this.changePaintOpacity(this.isEnabled(index));
            this.drawText(this.getBaisyunName(data), rect.x + 40, rect.y, 300, 'left');
            var cond = this._getCond(data);
            if (cond) {
                this.drawText(cond, rect.x + 190, rect.y, 300, 'left');
            }
        };
        Window_BaisyunSelect.prototype.isCurrentItemEnabled = function () {
            return this.isEnabled(this.index());
        };
        Window_BaisyunSelect.prototype.isEnabled = function (index) {
            var data = this._baisyunList[index];
            if (!data.cond) {
                return true;
            }
            var actorId = data.actorId;
            var status = $gameSystem.eroStatus[actorId];
            var eroLevel = status.eroLevel;
            if (data.cond['理性以下']) {
                if (eroLevel < 0) {
                    if (data.cond['理性以下'] < eroLevel * -1) {
                        return false;
                    }
                }
            }
            return true;
        };
        Window_BaisyunSelect.prototype._getCond = function (data) {
            if (!data.cond) {
                return null;
            }
            var text = '条件:';
            if (data.cond['理性以下']) {
                text += '理性が' + data.cond['理性以下'] + '以下';
            }
            return text;
        };
        Window_BaisyunSelect.prototype.getBaisyunName = function (data) {
            return data.name;
        };
        Window_BaisyunSelect.prototype.maxItems = function () {
            if (!this._baisyunList) {
                return 0;
            }
            return this._baisyunList.length;
        };
        Window_BaisyunSelect.prototype.maxCols = function () {
            return 1;
        };
        return Window_BaisyunSelect;
    }(Window_Selectable));
    Saba.Window_BaisyunSelect = Window_BaisyunSelect;
})(Saba || (Saba = {}));

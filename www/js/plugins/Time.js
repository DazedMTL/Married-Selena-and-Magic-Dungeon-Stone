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
    var Window_Time = /** @class */ (function (_super) {
        __extends(Window_Time, _super);
        function Window_Time() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_Time.prototype.initialize = function () {
            _super.prototype.initialize.call(this, 780, 20, 230, 68);
            //this.backOpacity = 0;
            //this.opacity = 0;
            //this.padding = 0;
            this.refresh();
        };
        Window_Time.prototype.update = function () {
            _super.prototype.update.call(this);
            this.visible = $gameSwitches.value(11) && !$gameSwitches.value(1);
            if (this._lastDay != $gameVariables.value(14) || this._lastTime != $gameVariables.value(15)) {
                this.refresh();
            }
        };
        Window_Time.prototype.refresh = function () {
            this.contents.clear();
            if ($gameSwitches.value(998)) {
                this.contents.drawText('フリーＨモード', 2, 0, 190, 32, 'left');
                return;
            }
            var day = $gameVariables.value(14);
            this._lastDay = day;
            this.contents.drawText('Day ' + day, 8, 0, 100, 32, 'left');
            var time = $gameVariables.value(15);
            this._lastTime = time;
            var timeStr;
            if (time < 10) {
                timeStr = ' ' + time + ':00';
            }
            else if (time == 22) {
                timeStr = '' + (time - 1) + ':30';
            }
            else {
                timeStr = '' + time + ':00';
            }
            this.contents.drawText(timeStr, 116, 0, 100, 32, 'left');
        };
        return Window_Time;
    }(Window_Base));
    ;
    var _Scene_Map_prototype_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
        _Scene_Map_prototype_createAllWindows.call(this);
        this._timeWindow = new Window_Time();
        this.addWindow(this._timeWindow);
    };
})(Saba || (Saba = {}));

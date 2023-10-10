var Saba;
(function (Saba) {
    var _lastX;
    var _lastY;
    var _Game_Player_prototype_updateNonmoving = Game_Player.prototype.updateNonmoving;
    Game_Player.prototype.updateNonmoving = function (wasMoving) {
        _Game_Player_prototype_updateNonmoving.call(this, wasMoving);
        if (_lastX != this.x || _lastY != this.y) {
            Saba.$autoMap.onMove();
        }
        _lastX = this.x;
        _lastY = this.y;
    };
    var _Game_Player_prototype_locate = Game_Player.prototype.locate;
    Game_Player.prototype.locate = function (x, y) {
        _Game_Player_prototype_locate.call(this, x, y);
        Saba.$autoMap.onMove();
    };
    var AutoMap = /** @class */ (function () {
        function AutoMap(autoMap) {
            if (autoMap == null) {
                throw new Error('autoMap is null');
            }
            this.autoMap = autoMap;
        }
        AutoMap.prototype.setCallback = function (callback, obj) {
            this.callback = callback.bind(obj);
            this.callback();
        };
        AutoMap.prototype.onMove = function () {
            if (!$fple) {
                //return;
            }
            var info = this.getMapInfo();
            var x = $gamePlayer.x;
            var y = $gamePlayer.y;
            var key = this.createKey(x, y);
            if (info[key]) {
                if (this.callback) {
                    this.callback();
                }
                return;
            }
            info[key] = true;
            Saba.calcMapMedalFloor($gameMap, info);
            if (this.callback) {
                this.callback();
            }
        };
        AutoMap.prototype.getMapInfo = function () {
            var mapId = $gameMap.mapId();
            if (!this.autoMap[mapId]) {
                this.autoMap[mapId] = {};
            }
            var info = this.autoMap[mapId];
            return info;
        };
        AutoMap.prototype.createKey = function (x, y) {
            return x + '_' + y;
        };
        AutoMap.prototype.isFilled = function (x, y) {
            var info = this.getMapInfo();
            var key = this.createKey(x, y);
            return info[key];
        };
        return AutoMap;
    }());
    Saba.AutoMap = AutoMap;
    var DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        DataManager_createGameObjects.call(this);
        Saba.$autoMap = new AutoMap($gameSystem.autoMap);
    };
    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_extractSaveContents.call(this, contents);
        Saba.$autoMap = new AutoMap($gameSystem.autoMap);
    };
    var _Game_System_prototype_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _Game_System_prototype_initialize.call(this);
        this.autoMap = {};
    };
})(Saba || (Saba = {}));

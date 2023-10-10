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
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'Ninshin') {
            switch (args[0]) {
                case 'show':
                    if ($gameSwitches.value(999)) {
                        return;
                    }
                    SceneManager._scene.showNinshinGauge(Math.floor(args[1]), Math.floor(args[2]));
                    break;
                case 'hide':
                    SceneManager._scene.hideNinshinGauge();
                    break;
                case 'damage':
                    var actorId = Math.floor(args[1]);
                    var ninshinDamage = Math.floor(args[2]);
                    var total = $gameTemp.ninshinTotal;
                    var realDamage = ninshinDamage;
                    if ($gameParty.hasMedal(542)) {
                        total = 0;
                        realDamage = 0;
                    }
                    var ero = $gameSystem.getEro(actorId);
                    if ($gameTemp.ninshinDamage == 0) {
                        $gameTemp.ninshinDamage = ero.ninshinRate - ero.lastNinshinRate;
                    }
                    realDamage = Math.round(ninshinDamage / total * $gameTemp.ninshinDamage);
                    p('ninshinTotal:' + actorId + ' ' + total + ' ' + ninshinDamage + ' ' + realDamage + ' ' + $gameTemp.ninshinDamage);
                    ero.lastNinshinRate += realDamage;
                    if (ero.ninshinRate < ero.lastNinshinRate) {
                        ero.lastNinshinRate = ero.ninshinRate;
                        p('error:' + ero.ninshinRate + ' ' + ero.lastNinshinRate + ' ' + $gameTemp.ninshinDamage);
                    }
                    //$gameSystem.getEro(actorId).ninshinRate += realDamage;
                    //$gameSystem.getEro(actorId).ninshinRate = Math.min(100, $gameSystem.getEro(actorId).ninshinRate);
                    break;
                case 'damageShow':
                    var actorId = Math.floor(args[1]);
                    var ero = $gameSystem.getEro(actorId);
                    ero.lastNinshinRate = ero.ninshinRate;
                    break;
                case 'damageMer':
                    var mobId = $gameTemp.mercenaryId;
                    var status = MERCENARY_MAP[mobId];
                    var nakadashi = status[8];
                    p('nakadashi:' + nakadashi);
                    break;
            }
        }
    };
    var Sprite_NinshinBar = /** @class */ (function (_super) {
        __extends(Sprite_NinshinBar, _super);
        function Sprite_NinshinBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_NinshinBar.prototype.initialize = function (actorId, index) {
            _super.prototype.initialize.call(this);
            this.x = 0;
            this.y = (index - 1) * 192;
            this._actorId = actorId;
            var ero = $gameSystem.getEro(this._actorId);
            this._lastActorNinshin = ero.lastNinshinRate;
            this.createBitmap();
            this.redraw();
        };
        Sprite_NinshinBar.prototype.createBitmap = function () {
            this.bitmap = new Bitmap(1006, 78);
            this.bitmap.fontSize = 24;
        };
        Sprite_NinshinBar.prototype.update = function () {
            _super.prototype.update.call(this);
            var ero = $gameSystem.getEro(this._actorId);
            if (this._lastActorNinshin != ero.lastNinshinRate) {
                this.redraw();
            }
        };
        Sprite_NinshinBar.prototype.redraw = function () {
            this.bitmap.clear();
            var ero = $gameSystem.getEro(this._actorId);
            if (Math.abs(ero.lastNinshinRate - this._lastActorNinshin) < 1) {
                this._lastActorNinshin = ero.lastNinshinRate;
            }
            else {
                this._lastActorNinshin += 0.5;
            }
            var x = 232;
            var y = 16;
            var width = 400;
            var height = 16;
            var hpGaugeColor1 = this.textColor(20);
            var hpGaugeColor2 = this.textColor(21);
            if (this._lastActorNinshin >= 100) {
                var hpGaugeColor1 = this.textColor(27);
                var hpGaugeColor2 = this.textColor(27);
            }
            var gaugeBackColor = this.textColor(19);
            this.bitmap.fillRect(x, y, width, height, gaugeBackColor);
            var fillW = Math.floor((100 - this._lastActorNinshin) * width / 100);
            if (fillW > 0) {
                this.bitmap.gradientFillRect(x + 1, y + 1, fillW - 2, height - 2, hpGaugeColor1, hpGaugeColor2);
            }
            var ninshin = ImageManager.loadSystem('ninshin');
            this.bitmap.blt(ninshin, 0, 0, 160, 50, 20, 0);
            var xx = 170;
            if (this._lastActorNinshin >= 100) {
                this.bitmap.blt(ninshin, 0, 110, 70, 50, xx, -1);
            }
            else {
                this.bitmap.blt(ninshin, 0, 60, 70, 50, xx, -1);
            }
        };
        return Sprite_NinshinBar;
    }(Sprite_Base));
    Saba.Sprite_NinshinBar = Sprite_NinshinBar;
    Scene_Map.prototype.showNinshinGauge = function (actorId, index) {
        if (!index) {
            index = 1;
        }
        this['_ninshinBar' + index] = new Sprite_NinshinBar(actorId, index);
        this.addChild(this['_ninshinBar' + index]);
    };
    Scene_Map.prototype.hideNinshinGauge = function () {
        for (var i = 0; i < 4; i++) {
            var index = i + 1;
            if (this['_ninshinBar' + index]) {
                this.removeChild(this['_ninshinBar' + index]);
                this['_ninshinBar' + index] = null;
            }
        }
    };
    function saveNinshin() {
        for (var i = 1; i <= 5; i++) {
            var ero = $gameSystem.getEro(i);
            ero.lastNinshinRate = ero.ninshinRate;
        }
    }
    Saba.saveNinshin = saveNinshin;
    function saveNinshinOne(i) {
        var ero = $gameSystem.getEro(i);
        ero.lastNinshinRate = ero.ninshinRate;
    }
    Saba.saveNinshinOne = saveNinshinOne;
    function isNinshinGaugeDown(i) {
        var ero = $gameSystem.getEro(i);
        if (ero.bote) {
            return false;
        }
        return ero.lastNinshinRate != ero.ninshinRate;
    }
    Saba.isNinshinGaugeDown = isNinshinGaugeDown;
    function isNinshinGaugeDownNone() {
        for (var i = 1; i <= 5; i++) {
            var ero = $gameSystem.getEro(i);
            if (!ero.bote) {
                if (ero.lastNinshinRate != ero.ninshinRate) {
                    return false;
                }
            }
        }
        return true;
    }
    Saba.isNinshinGaugeDownNone = isNinshinGaugeDownNone;
    function searchTaneoya() {
        var name = $gameVariables.value(20);
        for (var i = 51; i < 100; i++) {
            var a = $gameActors.actor(i);
            if (a.name() == name) {
                $gameVariables.setValue(19, a.actorId());
                break;
            }
        }
    }
    Saba.searchTaneoya = searchTaneoya;
    function isTaneoya(actorId, mobId) {
        var a = $gameActors.actor(mobId - 400);
        if (a.name() == $gameSystem.getEro(actorId).taneoya) {
            return true;
        }
        return false;
    }
    Saba.isTaneoya = isTaneoya;
    function isTaneoyaName(actorId, name) {
        return $gameSystem.getEro(actorId).taneoya == name;
    }
    Saba.isTaneoyaName = isTaneoyaName;
    function isTaneoyaGuild(actorId) {
    }
    Saba.isTaneoyaGuild = isTaneoyaGuild;
})(Saba || (Saba = {}));

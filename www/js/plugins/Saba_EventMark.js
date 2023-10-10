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
    var EventMark;
    (function (EventMark) {
        var ScenarioEvent = /** @class */ (function () {
            function ScenarioEvent(file, ero) {
                this.file = file;
                this.ero = ero;
            }
            return ScenarioEvent;
        }());
        var _Game_System = /** @class */ (function (_super) {
            __extends(_Game_System, _super);
            function _Game_System() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            _Game_System.prototype.isEventReserved = function (actorId) {
                this._eventReservation = this._eventReservation || {};
                this._eventReservation[actorId] = this._eventReservation[actorId] || [];
                return this._eventReservation[actorId].length > 0;
            };
            _Game_System.prototype.isEroEventReserved = function (actorId) {
                this._eventReservation = this._eventReservation || {};
                this._eventReservation[actorId] = this._eventReservation[actorId] || [];
                if (this._eventReservation[actorId].length === 0) {
                    return false;
                }
                return this._eventReservation[actorId][0].ero;
            };
            _Game_System.prototype.reserveEvent = function (actorId, scenarioId, ero) {
                if (this.isEndEvent(scenarioId)) {
                    return;
                }
                this._eventReservation = this._eventReservation || {};
                this._eventReservation[actorId] = this._eventReservation[actorId] || [];
                this._eventReservation[actorId].push(new ScenarioEvent(scenarioId, ero));
            };
            _Game_System.prototype.clearReservedEvent = function () {
                this._eventReservation = {};
            };
            _Game_System.prototype.getReservedEvent = function (actorId) {
                //p(this._eventReservation)
                this._eventReservation = this._eventReservation || {};
                this._eventReservation[actorId] = this._eventReservation[actorId] || [];
                if (this._eventReservation[actorId][0]) {
                    return this._eventReservation[actorId][0].file;
                }
                return null;
            };
            _Game_System.prototype.endEvent = function (file) {
                this._finishedEvents = this._finishedEvents || {};
                this._finishedEvents[file] = true;
            };
            _Game_System.prototype.restoreEvent = function (file) {
                p('restoreEvent:' + file);
                this._finishedEvents = this._finishedEvents || {};
                this._finishedEvents[file] = false;
            };
            _Game_System.prototype.isEndEvent = function (file) {
                this._finishedEvents = this._finishedEvents || {};
                return this._finishedEvents[file];
            };
            _Game_System.prototype.clearFinishedEvent = function () {
                this._finishedEvents = {};
            };
            _Game_System.prototype.hasEroEvents = function () {
                for (var key in this._eventReservation) {
                    var array = this._eventReservation[key];
                    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                        var e = array_1[_i];
                        if (e.ero) {
                            return true;
                        }
                    }
                }
                return false;
            };
            return _Game_System;
        }(Game_System));
        Game_Interpreter.prototype.showEventMarks = function (targetId) {
            if (!$gameSystem.isEventReserved(targetId)) {
                return false;
            }
            var events = $gameMap.events();
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var event = events_1[_i];
                var name = event.characterName();
                if (event.event().name.indexOf('水晶') >= 0) {
                    if (targetId === 4) {
                        event.requestBalloon(1);
                        return true;
                    }
                    return false;
                }
                if (name.indexOf('sleep') >= 0) {
                    continue;
                }
                var n = /actor(\d+)/.exec(name);
                if (!n) {
                    continue;
                }
                var actorId = parseInt(n[1]);
                if (actorId === targetId) {
                    event.requestBalloon(1);
                    return true;
                }
            }
            return false;
        };
        Game_Interpreter.prototype.showEroEventMarks = function (targetId) {
            if (!$gameSystem.isEroEventReserved(targetId)) {
                return false;
            }
            var events = $gameMap.events();
            for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
                var event = events_2[_i];
                var name = event.characterName();
                var n = /actor(\d+)/.exec(name);
                if (!n) {
                    continue;
                }
                var actorId = parseInt(n[1]);
                if (actorId === targetId) {
                    event.requestBalloon(4);
                    return true;
                }
            }
            return false;
        };
        Game_Interpreter.prototype.beforeRun = function () {
            $gameSwitches.setValue(27, false);
            $gameSwitches.setValue(18, false);
        };
        Game_Interpreter.prototype.addActor1 = function (file, ero) {
            $gameSystem.reserveEvent(1, file, ero);
        };
        Game_Interpreter.prototype.runActor1 = function () {
            this.beforeRun();
            var file = $gameSystem.getReservedEvent(1);
            if (!file) {
                return false;
            }
            $gameSystem.endEvent(file);
            this.pluginCommand('Scenario', [file]);
            return true;
        };
        Game_Interpreter.prototype.addActor2 = function (file, ero) {
            $gameSystem.reserveEvent(2, file, ero);
        };
        Game_Interpreter.prototype.runActor2 = function () {
            this.beforeRun();
            var file = $gameSystem.getReservedEvent(2);
            if (!file) {
                return false;
            }
            $gameSystem.endEvent(file);
            this.pluginCommand('Scenario', [file]);
            return true;
        };
        Game_Interpreter.prototype.addActor3 = function (file, ero) {
            $gameSystem.reserveEvent(3, file, ero);
        };
        Game_Interpreter.prototype.runActor3 = function () {
            this.beforeRun();
            var file = $gameSystem.getReservedEvent(3);
            if (!file) {
                return false;
            }
            $gameSystem.endEvent(file);
            this.pluginCommand('Scenario', [file]);
            return true;
        };
        Game_Interpreter.prototype.addActor4 = function (file, ero) {
            $gameSystem.reserveEvent(4, file, ero);
        };
        Game_Interpreter.prototype.runActor4 = function () {
            this.beforeRun();
            var file = $gameSystem.getReservedEvent(4);
            p(file);
            if (!file) {
                return false;
            }
            $gameSystem.endEvent(file);
            this.pluginCommand('Scenario', [file]);
            return true;
        };
        Game_Interpreter.prototype.addActor5 = function (file, ero) {
            $gameSystem.reserveEvent(5, file, ero);
        };
        Game_Interpreter.prototype.runActor5 = function () {
            this.beforeRun();
            var file = $gameSystem.getReservedEvent(5);
            if (!file) {
                return false;
            }
            $gameSystem.endEvent(file);
            this.pluginCommand('Scenario', [file]);
            return true;
        };
        Game_Interpreter.prototype.addActor6 = function (file) {
            $gameSystem.reserveEvent(6, file);
        };
        Game_Interpreter.prototype.runActor6 = function () {
            this.beforeRun();
            var file = $gameSystem.getReservedEvent(6);
            if (!file) {
                return false;
            }
            $gameSystem.endEvent(file);
            this.pluginCommand('Scenario', [file]);
            return true;
        };
        Game_Interpreter.prototype.addActor7 = function (file, ero) {
            $gameSystem.reserveEvent(7, file, ero);
        };
        Game_Interpreter.prototype.runActor7 = function () {
            this.beforeRun();
            var file = $gameSystem.getReservedEvent(7);
            if (!file) {
                return false;
            }
            $gameSystem.endEvent(file);
            this.pluginCommand('Scenario', [file]);
            return true;
        };
        Game_Interpreter.prototype.addActor8 = function (file, ero) {
            $gameSystem.reserveEvent(8, file, ero);
        };
        Game_Interpreter.prototype.runActor8 = function () {
            this.beforeRun();
            var file = $gameSystem.getReservedEvent(8);
            if (!file) {
                return false;
            }
            $gameSystem.endEvent(file);
            this.pluginCommand('Scenario', [file]);
            return true;
        };
        Game_Interpreter.prototype.addActor9 = function (file, ero) {
            $gameSystem.reserveEvent(9, file, ero);
        };
        Game_Interpreter.prototype.runActor9 = function () {
            this.beforeRun();
            var file = $gameSystem.getReservedEvent(9);
            if (!file) {
                return false;
            }
            $gameSystem.endEvent(file);
            this.pluginCommand('Scenario', [file]);
            return true;
        };
        Game_Interpreter.prototype.addActor11 = function (file, ero) {
            $gameSystem.reserveEvent(11, file, ero);
        };
        Game_Interpreter.prototype.runActor11 = function () {
            this.beforeRun();
            var file = $gameSystem.getReservedEvent(11);
            if (!file) {
                return false;
            }
            $gameSystem.endEvent(file);
            this.pluginCommand('Scenario', [file]);
            return true;
        };
        Game_Interpreter.prototype.addActor12 = function (file, ero) {
            $gameSystem.reserveEvent(12, file, ero);
        };
        Game_Interpreter.prototype.runActor12 = function () {
            this.beforeRun();
            var file = $gameSystem.getReservedEvent(12);
            if (!file) {
                return false;
            }
            $gameSystem.endEvent(file);
            this.pluginCommand('Scenario', [file]);
            return true;
        };
        Game_Interpreter.prototype.addActor13 = function (file, ero) {
            $gameSystem.reserveEvent(13, file, ero);
        };
        Game_Interpreter.prototype.runActor13 = function () {
            this.beforeRun();
            var file = $gameSystem.getReservedEvent(13);
            if (!file) {
                return false;
            }
            $gameSystem.endEvent(file);
            this.pluginCommand('Scenario', [file]);
            return true;
        };
        Game_Interpreter.prototype.addActor15 = function (file, ero) {
            $gameSystem.reserveEvent(15, file, ero);
        };
        Game_Interpreter.prototype.runActor15 = function () {
            this.beforeRun();
            var file = $gameSystem.getReservedEvent(15);
            if (!file) {
                return false;
            }
            $gameSystem.endEvent(file);
            this.pluginCommand('Scenario', [file]);
            return true;
        };
        var _Sprite_Balloon_update = Sprite_Balloon.prototype.update;
        Sprite_Balloon.prototype.update = function () {
            _Sprite_Balloon_update.call(this);
            if (!$gameSwitches.value(27)) {
                return;
            }
            if (this._duration === 4) {
                this._duration++;
            }
        };
        Sprite_Character.prototype.updateBalloon = function () {
            this.setupBalloon();
            if (this._balloonSprite) {
                this._balloonSprite.x = this.x;
                this._balloonSprite.y = this.y - this.height + 7;
                if (!this._balloonSprite.isPlaying()) {
                    this.endBalloon();
                }
            }
        };
        var _Scene_Menu_initialize = Scene_Menu.prototype.initialize;
        Scene_Menu.prototype.initialize = function () {
            _Scene_Menu_initialize.call(this);
            $gameSwitches.setValue(18, false);
            $gameSwitches.setValue(19, true);
        };
        Saba.applyMyMethods(_Game_System, Game_System);
    })(EventMark || (EventMark = {}));
})(Saba || (Saba = {}));

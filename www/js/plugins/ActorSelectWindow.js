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
    var Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        if (command == 'selectEroActor') {
            SceneManager.push(Scnee_EroActorSelect);
            return;
        }
        ;
        Game_Interpreter_prototype_pluginCommand.call(this, command, args);
    };
    var Scnee_EroActorSelect = /** @class */ (function (_super) {
        __extends(Scnee_EroActorSelect, _super);
        function Scnee_EroActorSelect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scnee_EroActorSelect.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createStatusWindow();
            this.createConfirmWindow();
            this.createMsgWindow();
        };
        Scnee_EroActorSelect.prototype.createStatusWindow = function () {
            this._statusWindow = new Window_EroActorSelect();
            this._statusWindow.setHandler('ok', this.onOk.bind(this));
            this.addWindow(this._statusWindow);
        };
        ;
        Scnee_EroActorSelect.prototype.createConfirmWindow = function () {
            this._confirmWindow = new Saba.Window_Confirm();
            this._confirmWindow.setText('Confirm?');
            this._confirmWindow.setHandler('ok', this.onConfirmOk.bind(this));
            this._confirmWindow.setHandler('cancel', this.onConfirmCancel.bind(this));
            this._confirmWindow.deactivate();
            this.addWindow(this._confirmWindow);
            this._confirmWindow.hide();
        };
        Scnee_EroActorSelect.prototype.createMsgWindow = function () {
            this._msgWindow = new Saba.Window_Msg();
            this._msgWindow.setHandler('ok', this.onConfirmCancel.bind(this));
            this._msgWindow.setHandler('cancel', this.onConfirmCancel.bind(this));
            this._msgWindow.deactivate();
            this.addWindow(this._msgWindow);
            this._msgWindow.hide();
        };
        Scnee_EroActorSelect.prototype.onOk = function () {
            this._statusWindow.deactivate();
            var actor = this._statusWindow.actor();
            if (!this._statusWindow.isEnabled(actor)) {
                this._msgWindow.setText(actor.name() + "\u306F\u73FE\u5728\uFF28\u30A4\u30D9\u30F3\u30C8\u304C", "\u767A\u751F\u3057\u306A\u3044\u305F\u3081\u3001\u9078\u629E\u3067\u304D\u307E\u305B\u3093");
                this._msgWindow.show();
                this._msgWindow.activate();
                return;
            }
            this._confirmWindow.setText(actor.name() + '?');
            this._confirmWindow.setInfo(true);
            this._confirmWindow.show();
            this._confirmWindow.activate();
        };
        Scnee_EroActorSelect.prototype.onConfirmOk = function () {
            SoundManager.playOk();
            this._confirmWindow.hide();
            this._confirmWindow.deactivate();
            var actor = this._statusWindow.actor();
            $gameVariables.setValue(11, actor.actorId());
            this.popScene();
        };
        Scnee_EroActorSelect.prototype.onConfirmCancel = function () {
            this._msgWindow.hide();
            this._msgWindow.deactivate();
            this._confirmWindow.hide();
            this._confirmWindow.deactivate();
            this._statusWindow.activate();
        };
        Scnee_EroActorSelect.prototype.start = function () {
            Scene_MenuBase.prototype.start.call(this);
            this._statusWindow.refresh();
            this._statusWindow.activate();
            this._statusWindow.select(0);
        };
        ;
        return Scnee_EroActorSelect;
    }(Scene_MenuBase));
    Saba.Scnee_EroActorSelect = Scnee_EroActorSelect;
    var Window_EroActorSelect = /** @class */ (function (_super) {
        __extends(Window_EroActorSelect, _super);
        function Window_EroActorSelect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_EroActorSelect.prototype.initialize = function () {
            _super.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
        };
        Window_EroActorSelect.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
            this.changePaintOpacity(true);
            this.drawTextEx('In H scenes, you can choose the character to control.', 70, 10);
            this.drawTextEx('Please select the character you want to control.', 70, 46);
        };
        Window_EroActorSelect.prototype.standardPadding = function () {
            return 8;
        };
        ;
        Window_EroActorSelect.prototype.windowWidth = function () {
            return Graphics.boxWidth;
        };
        ;
        Window_EroActorSelect.prototype.windowHeight = function () {
            return Graphics.boxHeight;
        };
        Window_EroActorSelect.prototype.itemRect = function (index) {
            var rect = new Rectangle(0, 0, 0, 0);
            var maxCols = this.maxCols();
            rect.width = this.itemWidth();
            rect.height = this.itemHeight();
            rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
            rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 100;
            return rect;
        };
        Window_EroActorSelect.prototype.itemHeight = function () {
            return 490;
        };
        Window_EroActorSelect.prototype.spacing = function () {
            return 0;
        };
        Window_EroActorSelect.prototype.drawItem = function (index) {
            this.drawItemImage(index);
        };
        Window_EroActorSelect.prototype.drawItemImage = function (index) {
            var actor = $gameParty.members()[index];
            var rect = this.itemRect(index);
            this.changePaintOpacity(this.isEnabled(actor));
            var fw = Window_Base._faceWidth;
            var actorCopy = JsonEx.makeDeepCopy(actor);
            actorCopy.setPoseId(actorCopy.defaultPoseId);
            this.drawActorFace(actorCopy, rect.x, rect.y + 10, rect.width + rect.x + 120, 520, -20, -40, actorCopy.defaultFaceId, this.isEnabled(actor));
            this.drawActorName(actor, rect.x + 10, rect.y + 496);
            this.contents.fontSize = 24;
            var ero = $gameSystem.getEro(actor.actorId());
            var h = 32;
            var xx = rect.x + 20;
            this.drawText('Selection:', xx, rect.y + 500 + h * 1, 150, 'left');
            this.drawText(ero.sexCount + '', xx, rect.y + 500 + h * 1, 200, 'right');
            this.drawText('Creampie:', xx, rect.y + 500 + h * 2, 150, 'left');
            this.drawText(ero.nakadashi + '', xx, rect.y + 500 + h * 2, 200, 'right');
            this.drawText('Pregnancy:', xx, rect.y + 500 + h * 3, 150, 'left');
            this.drawText(ero.ninshin + '', xx, rect.y + 500 + h * 3, 200, 'right');
            if (this.hasNewEvent(actor)) {
                var baseTexture = Saba.getSystemBaseTexture('skill_tree');
                var sprite = new PIXI.Sprite(new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 70, 150, 30)));
                sprite.x = rect.x + 20;
                sprite.y = rect.y + 20;
                this.addChild(sprite);
            }
        };
        Window_EroActorSelect.prototype.isEnabled = function (actor) {
            if ($gameVariables.value(1) >= 3) {
                return true;
            }
            return this.hasNewEvent(actor);
        };
        Window_EroActorSelect.prototype.hasNewEvent = function (actor) {
            return !$gameSwitches.value(52 + actor.actorId());
        };
        Window_EroActorSelect.prototype.numVisibleRows = function () {
            return 1;
        };
        Window_EroActorSelect.prototype.maxCols = function () {
            return 4;
        };
        Window_EroActorSelect.prototype.maxItems = function () {
            return $gameParty.size();
        };
        Window_EroActorSelect.prototype.actor = function () {
            return $gameParty.members()[this.index()];
        };
        return Window_EroActorSelect;
    }(Window_Selectable));
    Game_Party.prototype.leader = function () {
        return this._leader || this.battleMembers()[0];
    };
})(Saba || (Saba = {}));

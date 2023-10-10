//=============================================================================
// EventSelector.js
//=============================================================================

/*:
 * @plugindesc Displays a window to select a common event.
 * @author Yoji Ojima
 *
 * @help
 *
 * Plugin Command:
 *   EventSelector open       # Open the event selector window
 *   EventSelector add 3      # Add common event #3 to the selector
 *   EventSelector remove 4   # Remove common event #4 from the selectorƒ１２１
 *   EventSelector clear      # Clear the event selector
 */

/*:ja
 * @plugindesc コモンイベントを選択するウィンドウを表示します。
 * @author Yoji Ojima
 *
 * @help
 *
 * プラグインコマンド:
 *   EventSelector open       # イベント選択ウィンドウを開く
 *   EventSelector add 3      # コモンイベント３番をイベント選択に追加
 *   EventSelector remove 4   # コモンイベント４番をイベント選択から削除
 *   EventSelector clear      # イベント選択をクリア
 */

(function () {

    var eventSelectorStatus = '';
    var selectedCommonEvent = null;

    var _Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'EventSelector') {
            switch (args[0]) {
                case 'open':
                    SceneManager._scene.createEventHelpWindow();
                    eventSelectorStatus = 'open';
                    this.setWaitMode('EventSelector');
                    break;
                case 'add':
                    $gameSystem.addToEventSelector(Number(args[1]));
                    break;
                case 'remove':
                    $gameSystem.removeFromEventSelector(Number(args[1]));
                    break;
                case 'clear':
                    $gameSystem.clearEventSelector();
                    break;
            }
        }
    };

    var _Game_Interpreter_updateWaitMode =
        Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function () {
        if (this._waitMode === 'EventSelector') {
            if (eventSelectorStatus === 'close') {
                this._waitMode = '';
                if (selectedCommonEvent) {
                    this.setupChild(selectedCommonEvent.list);
                    if (this._depth === 0) {
                        $gameSwitches.setValue(121, true);
                    }
                }
                eventSelectorStatus = '';
            }
            return true;
        } else {
            return _Game_Interpreter_updateWaitMode.call(this);
        }
    };

    var _Game_Interpreter_updateChild = Game_Interpreter.prototype.updateChild;
    Game_Interpreter.prototype.updateChild = function () {
        var result = _Game_Interpreter_updateChild.call(this);
        if (this._depth === 0 && $gameSwitches.value(121) && !result) {
            $gameSwitches.setValue(121, false);
            eventSelectorStatus = 'open';
            this.setWaitMode('EventSelector');
            return true;
        }
        return result;
    };

    Game_System.prototype.addToEventSelector = function (commonEventId) {
        if (!this._eventSelectorData) {
            this.clearEventSelector();
        }
        if (!this._eventSelectorData.contains(commonEventId)) {
            this._eventSelectorData.push(commonEventId);
        }
    };

    Game_System.prototype.removeFromEventSelector = function (commonEventId) {
        if (this._eventSelectorData) {
            var index = this._eventSelectorData.indexOf(commonEventId);
            if (index >= 0) {
                this._eventSelectorData.splice(index, 1);
            }
        }
    };

    Game_System.prototype.clearEventSelector = function () {
        this._eventSelectorData = [];
    };

    Game_System.prototype.eventSelectorData = function () {
        if (this._eventSelectorData) {
            return this._eventSelectorData.clone();
        } else {
            return [];
        }
    };

    Scene_Map.prototype.createEventHelpWindow = function () {
        if (this._eventHelpWindow) {
            return;
        }
        this._eventHelpWindow = new Window_Help(1);
        this._eventHelpWindow.visible = false;
        this._eventHelpWindow.width = 1080;
        this._eventHelpWindow.x = 100;
        this.addChild(this._eventHelpWindow);
        this._eventSelectorWindow = new Window_EventSelector(550, 100, this._eventHelpWindow);
        this.addChild(this._eventSelectorWindow);
    };

    function Window_EventSelector() {
        this.initialize.apply(this, arguments);
    }

    Window_EventSelector.prototype = Object.create(Window_Selectable.prototype);
    Window_EventSelector.prototype.constructor = Window_EventSelector;

    Window_EventSelector.lastTopRow = 0;
    Window_EventSelector.lastIndex = 0;

    Window_EventSelector.prototype.initialize = function (x, y, eventHelpWindow) {
        var width = 650;
        this.eventHelpWindow = eventHelpWindow;
        var height = this.fittingHeight(4);
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.openness = 0;
        this.deactivate();
        this.setHandler('ok', this.onOk.bind(this));
        this.setHandler('cancel', this.onCancel.bind(this));
    };

    Window_EventSelector.prototype.maxCols = function () {
        return 1;
    };

    var _Window_EventSelector_select = Window_EventSelector.prototype.select;
    Window_EventSelector.prototype.select = function (index) {
        _Window_EventSelector_select.call(this, index);
        if (index < 0) {
            return;
        }
        var commonEvent = this._list[index];
        var rect = this.itemRectForText(index);
        var list = commonEvent.name.split(' ');
        var params = list[0].split('_');
        var text = '';
        switch (parseInt(params[0])) {
            case 1: text = '\\C[2]おまんこの感度'; break;
            case 2: text = '\\C[2]アナルの感度'; break;
            case 3: text = '\\C[2]おまんこのガバ度'; break;
            case 4: text = '\\C[2]従順度'; break;

        }
        var num = params[1].replace(/[0-9]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
        });
        text += 'LV\\C[2]' + num + '\\C[0]が必要';

        switch (parseInt(params[0])) {
            case 1: text += '　'; break;
            case 2: text += '　　'; break;
            case 3: text += ''; break;
            case 4: text += '　　　　　'; break;

        }
        var ero = $gameSystem.getEro(1);
        text += '　　現在のLV:';
        num = (ero.getEroParam(parseInt(params[0])) + '').replace(/[0-9]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
        });
        text += num;
        this.eventHelpWindow.setText(text);
    };

    Window_EventSelector.prototype.maxItems = function () {
        return this._list ? this._list.length : 0;
    };

    Window_EventSelector.prototype.update = function () {
        Window_Selectable.prototype.update.call(this);
        switch (eventSelectorStatus) {
            case 'open':
                this.refresh();
                this.setTopRow(Window_EventSelector.lastTopRow);
                this.select(0);
                this.open();
                this.eventHelpWindow.visible = true;
                this.activate();
                eventSelectorStatus = 'select';
                break;
            case 'select':
                if (this.isClosed()) {
                    this.eventHelpWindow.visible = false;
                    eventSelectorStatus = 'close';
                }
                break;
        }
    };

    Window_EventSelector.prototype.isCurrentItemEnabled = function () {
        var commonEvent = this._list[this.index()];
        return this.isEnabled(commonEvent);
    };
    Window_EventSelector.prototype.refresh = function () {
        var ero = $gameSystem.getEro(1);
        var actor = $gameActors.actor(1);
        var data = $gameSystem.eventSelectorData();
        this._list = [];
        for (var i = 0; i < data.length; i++) {
            var commonEvent = $dataCommonEvents[data[i]];
            if (commonEvent) {

                this._list.push(commonEvent);
            }
        }
        var height = this.fittingHeight(this._list.length);
        this.height = height;
        this.createContents();
        this.drawAllItems();
    };

    Window_EventSelector.prototype.drawItem = function (index) {
        var commonEvent = this._list[index];
        var rect = this.itemRectForText(index);
        var list = commonEvent.name.split(' ');
        var name = list[1];
        if (name === 'bote') {
            name = list[2];
        }
        this.changePaintOpacity(this.isEnabled(commonEvent));
        this.drawText(name, rect.x + 50, rect.y, rect.width);
        if ($gameSwitches.value(commonEvent.id)) {
            var frameImage = ImageManager.loadSystem('fin');
            this.contents.blt(frameImage, 0, 0, frameImage.width, frameImage.height, rect.x - 5, rect.y - 2, frameImage.width, frameImage.height);
        }
    };

    Window_EventSelector.prototype.isOkTriggered = function () {
        return Input.isTriggered('ok');
    };
    Window_EventSelector.prototype.processHandling = function () {
        if (this.isOpenAndActive()) {
            if (this.isOkTriggered()) {
                this.processOk();
            } else if (this.isCancelEnabled() && this.isCancelTriggered()) {
                this.processCancel();
            } else if (this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
                this.processPagedown();
            } else if (this.isHandled('pageup') && Input.isTriggered('pageup')) {
                this.processPageup();
            }
        }
    };
    Window_EventSelector.prototype.processOk = function () {
        if (this.isCurrentItemEnabled()) {
            $gameSwitches.setValue(820, false);
        } else {
            $gameSwitches.setValue(820, true);
        }
        this.playOkSound();
        this.updateInputData();
        this.deactivate(); this.callOkHandler();
    };
    Window_EventSelector.prototype.isEnabled = function (item) {
        var ero = $gameSystem.getEro(1);
        var list = item.name.split(' ');
        var params = list[0].split('_');
        if (list[1] === 'bote') {
            if (!$gameActors.actor(1).bote) {
                return false;
            }
        }
        return ero.getEroParam(parseInt(params[0])) >= parseInt(params[1]);
    };

    Window_EventSelector.prototype.onOk = function () {
        selectedCommonEvent = this._list[this.index()];
        Window_EventSelector.lastTopRow = this.topRow();
        Window_EventSelector.lastIndex = this.index();
        this.close();
    };

    Window_EventSelector.prototype.onCancel = function () {
        selectedCommonEvent = null;
        Window_EventSelector.lastTopRow = this.topRow();
        Window_EventSelector.lastIndex = this.index();
        this.close();
    };

})();

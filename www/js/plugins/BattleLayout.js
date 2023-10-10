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
    Saba.TUTO_BATTLE = 802;
    Saba.TUTO_BATTLE_ATTACK_ONLY = 803;
    Saba.TUTO_BATTLE_SKILL_ONLY = 804;
    Scene_Battle.prototype.createSkillWindow = function () {
        var wy = this._helpWindow.y + this._helpWindow.height;
        var wh = this._statusWindow.y - wy;
        this._skillWindow = new Window_BattleSkill(10, wy, Graphics.boxWidth - 350, wh);
        this._skillWindow.setHelpWindow(this._helpWindow);
        this._skillWindow.setHandler('ok', this.onSkillOk.bind(this));
        this._skillWindow.setHandler('cancel', this.onSkillCancel.bind(this));
        this.addWindow(this._skillWindow);
    };
    Scene_Battle.prototype.createItemWindow = function () {
        var wy = this._helpWindow.y + this._helpWindow.height;
        var wh = this._statusWindow.y - wy;
        this._itemWindow = new Window_BattleItem(130, wy, Graphics.boxWidth - 550, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this.addWindow(this._itemWindow);
    };
    /*Window_BattleSkill.prototype.maxCols = function () {
        return 1;
    };*/
    var _Window_BattleSkill_prototype_makeItemList = Window_BattleSkill.prototype.makeItemList;
    Window_BattleSkill.prototype.makeItemList = function () {
        _Window_BattleSkill_prototype_makeItemList.call(this);
        var learnings = this._actor.currentClass().learnings;
        var order = 0;
        var map = {};
        for (var _i = 0, learnings_1 = learnings; _i < learnings_1.length; _i++) {
            var learning = learnings_1[_i];
            var skillId = learning.skillId;
            var startSkill = $dataSkills[skillId];
            map[startSkill.name] = order;
            order++;
        }
        this._data = this._data.sort(function (a, b) {
            return map[a.name] - map[b.name];
        });
    };
    var _Window_BattleSkill_prototype_includes = Window_BattleSkill.prototype.includes;
    Window_BattleSkill.prototype.includes = function (skill) {
        if (skill) {
            if (skill.name.contains('☆')) {
                return false;
            }
            if (skill.meta['baseSkill']) {
                return false;
            }
        }
        return _Window_BattleSkill_prototype_includes.call(this, skill);
    };
    Window_BattleItem.prototype.maxCols = function () {
        return 1;
    };
    Scene_Battle.prototype.endCommandSelection = function () {
        this._partyCommandWindow.close();
        //this._actorCommandWindow.close();
        //this._statusWindow.deselect();
    };
    Scene_Battle.prototype.updateWindowPositions = function () {
        /*
        var statusX = 0;
        if (BattleManager.isInputting()) {
            statusX = this._partyCommandWindow.width;
        } else {
            statusX = this._partyCommandWindow.width / 2;
        }
        if (this._statusWindow.x < statusX) {
            this._statusWindow.x += 16;
            if (this._statusWindow.x > statusX) {
                this._statusWindow.x = statusX;
            }
        }
        if (this._statusWindow.x > statusX) {
            this._statusWindow.x -= 16;
            if (this._statusWindow.x < statusX) {
                this._statusWindow.x = statusX;
            }
        }
        */
    };
    Game_Troop.prototype.letterTable = function () {
        return $gameSystem.isCJK() ? Game_Troop.LETTER_TABLE_HALF :
            Game_Troop.LETTER_TABLE_HALF;
    };
    Scene_Battle.prototype.createHelpWindow = function () {
        this._helpWindow = new Window_BattleHelp();
        this._helpWindow.visible = false;
        this.addWindow(this._helpWindow);
    };
    var Window_BattleHelp = /** @class */ (function (_super) {
        __extends(Window_BattleHelp, _super);
        function Window_BattleHelp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_BattleHelp.prototype.initialize = function (numLines) {
            var width = Graphics.boxWidth;
            var height = this.fittingHeight(numLines || 2);
            Window_Base.prototype.initialize.call(this, 120, 0, width - 200, height);
            this._text = '';
        };
        return Window_BattleHelp;
    }(Saba.Window_SkillHelp));
    Window_BattleStatus.prototype.initialize = function () {
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = 174; //Graphics.boxWidth - width;
        var y = Graphics.boxHeight - height;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.openness = 0;
    };
    Window_BattleStatus.prototype.drawBasicArea = function (rect, actor) {
        this.drawActorName(actor, rect.x + 0, rect.y, 188);
        if (!this.drawActorIcons(actor, rect.x + 116, rect.y, rect.width - 136)) {
        }
        //this.drawActorClass(actor, rect.x + 230, rect.y, 128);
    };
    Window_BattleStatus.prototype.standardFontSize = function () {
        return 25;
    };
    Window_BattleStatus.prototype.drawActorClass = function (actor, x, y, width) {
        var nickname = actor.nickname();
        this.drawText(nickname, x, y, width);
    };
    Window_BattleStatus.prototype.drawActorIcons = function (actor, x, y, width) {
        var icons = actor.allIcons();
        var states = actor.states().map(function (state) {
            return state;
        }).filter(function (state) {
            return state.iconIndex > 0;
        });
        x += 0;
        y += 0;
        var drawn = false;
        var interval = 34;
        for (var _i = 0, states_1 = states; _i < states_1.length; _i++) {
            var state = states_1[_i];
            var iconIndex = state.iconIndex;
            var sprite = Saba.getIconSprite(iconIndex, false);
            var turn = actor._stateTurns[state.id];
            sprite.x = x;
            sprite.y = y;
            this._windowContentsSprite.addChild(sprite);
            if (state.id != 1 && state.id != 4) {
                this.drawNumber(turn, x + 16, sprite.y - 8, 40, 'left', 9);
            }
            x += interval;
            drawn = true;
        }
        for (var paramId = 0; paramId < actor._buffs.length; paramId++) {
            var buffLevel = actor._buffs[paramId];
            if (buffLevel == 0) {
                continue;
            }
            var turn = actor._buffTurns[paramId];
            if (turn <= 0) {
                continue;
            }
            var iconIndex = 0;
            ;
            if (buffLevel > 0) {
                iconIndex = Game_BattlerBase.ICON_BUFF_START + (buffLevel - 1) * 8 + paramId;
            }
            else {
                iconIndex = Game_BattlerBase.ICON_DEBUFF_START + (-buffLevel - 1) * 8 + paramId;
            }
            var sprite = Saba.getIconSprite(iconIndex, false);
            sprite.x = x;
            sprite.y = y;
            this._windowContentsSprite.addChild(sprite);
            this.drawNumber(turn, x + 16, sprite.y - 8, 40, 'left', 9);
            x += interval;
            drawn = true;
        }
        return drawn;
    };
    Game_Party.prototype.maxBattleMembers = function () {
        return 6;
    };
    Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function (rect, actor) {
        this.drawActorHp(actor, rect.x - 146, rect.y, 150);
        if (actor.isMercenary()) {
            this.drawActorMp(actor, rect.x + 16, rect.y, 190);
        }
        else {
            this.drawActorMp(actor, rect.x + 16 - 30, rect.y, 190, true);
        }
        //this.drawActorTp(actor, rect.x + 100, rect.y, 90);
    };
    Window_BattleStatus.prototype.basicAreaRect = function (index) {
        var rect = this.itemRectForText(index);
        rect.width -= this.gaugeAreaWidth() + 15;
        return rect;
    };
    Window_BattleStatus.prototype.drawGauge = function (x, y, width, rate, color1, color2) {
        var fillW = Math.floor(width * rate);
        var gaugeY = y + this.lineHeight() - 7;
        this.contents.fillRect(x, gaugeY, width, 6, this.gaugeBackColor());
        if (isNaN(fillW)) {
            return;
        }
        this.contents.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
    };
    Window_Base.prototype.drawActorTp = function (actor, x, y, width) {
        width = width || 96;
        var color1 = this.tpGaugeColor1();
        var color2 = this.tpGaugeColor2();
        this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.tpA, x, y, 44);
        this.changeTextColor(this.tpColor(actor));
        this.drawCurrentAndMax(Math.floor(actor.tp / 100), Math.floor(actor.maxTp() / 100), x, y, width, this.mpColor(actor), this.normalColor());
    };
    Window_BattleStatus.prototype.gaugeAreaWidth = function () {
        return 170;
    };
    /*
    Window_BattleStatus.prototype.mpGaugeColor1 = function () {
        return this.textColor(28);
    };

    Window_BattleStatus.prototype.mpGaugeColor2 = function () {
        return this.textColor(29);
    };*/
    Window_BattleStatus.prototype.windowWidth = function () {
        return Graphics.boxWidth - 514;
    };
    Window_BattleStatus.prototype.windowHeight = function () {
        return this.fittingHeight(6);
    };
    Window_BattleStatus.prototype.lineHeight = function () {
        return 30;
    };
    Window_BattleStatus.prototype.updateCursor = function () {
        if (this._cursorAll) {
            var allRowsHeight = this.maxRows() * this.itemHeight();
            this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
            this.setTopRow(0);
        }
        else if (this.isCursorVisible()) {
            var rect = this.itemRect(this.index());
            this.setCursorRect(rect.x, rect.y, rect.width - 354, rect.height);
        }
        else {
            this.setCursorRect(0, 0, 0, 0);
        }
    };
    Window_ActorCommand.prototype.initialize = function () {
        var y = Graphics.boxHeight - this.windowHeight();
        Window_Command.prototype.initialize.call(this, 0, y);
        this.openness = 0;
        this.deactivate();
        this._actor = null;
        this.x = 0;
    };
    var _Window_ActorCommand_prototype_update = Window_ActorCommand.prototype.update;
    Window_ActorCommand.prototype.update = function () {
        if (this.isCursorMovable()) {
            if (Input.isTriggered('right')) {
                SoundManager.playCursor();
                this.select(2);
                return;
            }
            if (Input.isTriggered('left')) {
                SoundManager.playCursor();
                this.select(3);
                return;
            }
        }
        _Window_ActorCommand_prototype_update.call(this);
    };
    Window_ActorCommand.prototype.windowWidth = function () {
        return 174;
    };
    Window_ActorCommand.prototype.numVisibleRows = function () {
        return 5;
    };
    Window_ActorCommand.prototype.addGuardCommand = function () {
    };
    Window_ActorCommand.prototype.addSkillCommands = function () {
        var enabled = !$gameSwitches.value(Saba.TUTO_BATTLE_ATTACK_ONLY);
        var skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort(function (a, b) {
            return a - b;
        });
        skillTypes.forEach(function (stypeId) {
            var name = $dataSystem.skillTypes[stypeId];
            this.addCommand(name, 'skill', enabled, stypeId);
        }, this);
    };
    Window_ActorCommand.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        var item = this.commandName(index);
        if (item.weapon) {
            this.drawWeaponName(item, rect.x, rect.y, rect.width);
        }
        else {
            this.drawText(item, rect.x, rect.y, rect.width, align);
        }
    };
    Window_ActorCommand.prototype.makeCommandList = function () {
        if (this._actor) {
            this.addAttackCommand();
            this.addSkillCommands();
            this.addGuardCommand();
            this.addItemCommand();
            this.addAutoCommand();
        }
    };
    var _Window_ActorCommand_prototype_addSkillCommands = Window_ActorCommand.prototype.addSkillCommands;
    Window_ActorCommand.prototype.addSkillCommands = function () {
        if (this._actor.isMob()) {
            return;
        }
        _Window_ActorCommand_prototype_addSkillCommands.call(this);
    };
    var _Window_ActorCommand_prototype_addItemCommand = Window_ActorCommand.prototype.addItemCommand;
    Window_ActorCommand.prototype.addItemCommand = function () {
        if (this._actor.isMob()) {
            return;
        }
        _Window_ActorCommand_prototype_addItemCommand.call(this);
    };
    Window_ActorCommand.prototype.addAutoCommand = function () {
        if (this._actor.isMob()) {
            return;
        }
        this.addCommand('オート', 'auto', this._actor.canAttack());
    };
    var _Scene_Battle_prototype_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function () {
        _Scene_Battle_prototype_createActorCommandWindow.call(this);
        this._actorCommandWindow.setHandler('auto', this.commandAuto.bind(this));
    };
    Scene_Battle.prototype.commandAuto = function () {
        this.startAuto();
    };
    Window_BattleLog.prototype.initialize = function () {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Selectable.prototype.initialize.call(this, 120, 0, width - 120, height);
        this.opacity = 0;
        this._lines = [];
        this._methods = [];
        this._waitCount = 0;
        this._waitMode = '';
        this._baseLineStack = [];
        this._spriteset = null;
        this.createBackBitmap();
        this.createBackSprite();
        this.refresh();
    };
    Scene_Battle.prototype.createActorWindow = function () {
        this._actorWindow = new Window_BattleActor(this._statusWindow.x, this._statusWindow.y);
        this._actorWindow.setHandler('ok', this.onActorOk.bind(this));
        this._actorWindow.setHandler('cancel', this.onActorCancel.bind(this));
        this.addWindow(this._actorWindow);
    };
    Scene_Battle.prototype.selectActorSelection = function () {
        var item;
        switch (this._actorCommandWindow.currentSymbol()) {
            case 'skill':
                item = this._skillWindow.item();
                break;
            case 'item':
                item = this._skillWindow.item();
                break;
        }
        this._actorWindow.setUsingItem(item);
        this._actorWindow.refresh();
        this._actorWindow.show();
        this._actorWindow.activate();
        this._statusWindow.hide();
    };
    var _Scene_Battle_prototype_onActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function () {
        _Scene_Battle_prototype_onActorOk.call(this);
        this._statusWindow.show();
    };
    var _Scene_Battle_prototype_onActorCancel = Scene_Battle.prototype.onActorCancel;
    Scene_Battle.prototype.onActorCancel = function () {
        _Scene_Battle_prototype_onActorCancel.call(this);
        this._statusWindow.show();
    };
    Scene_Battle.prototype.updateStatusWindow = function () {
        if ($gameSwitches.value(26)) {
            this._statusWindow.close();
            this._partyCommandWindow.close();
            this._actorCommandWindow.close();
            return;
        }
        if ($gameMessage.isBusy()) {
            this._statusWindow.close();
            this._partyCommandWindow.close();
            this._actorCommandWindow.close();
        }
        else if (this.isActive() && !this._messageWindow.isClosing()) {
            this._statusWindow.openness = 255;
            this._actorCommandWindow.openness = 255;
            this._statusWindow.open();
            this._actorCommandWindow.open();
        }
    };
    Scene_Battle.prototype.startActorCommandSelection = function () {
        this._statusWindow.openness = 255;
        this._actorCommandWindow.openness = 255;
        this._statusWindow.select(BattleManager.actor().index());
        this._partyCommandWindow.close();
        this._actorCommandWindow.setup(BattleManager.actor());
        this._statusWindow.open();
    };
    var Window_BattleMessage = /** @class */ (function (_super) {
        __extends(Window_BattleMessage, _super);
        function Window_BattleMessage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_BattleMessage.prototype.initialize = function () {
            var width = this.windowWidth();
            var height = this.windowHeight();
            Window_Base.prototype.initialize.call(this, 110, 0, width, height);
            this.openness = 0;
            this.initMembers();
            this.createSubWindows();
            this.updatePlacement();
        };
        Window_BattleMessage.prototype.windowWidth = function () {
            return Graphics.boxWidth - 110;
        };
        return Window_BattleMessage;
    }(Window_Message));
    Window_BattleActor.prototype.setUsingItem = function (item) {
        this._usingItem = item;
    };
    var _Window_BattleActor_prototype_reselect = Window_BattleActor.prototype.reselect;
    Window_BattleActor.prototype.reselect = function () {
        if (this._usingItem && this._usingItem.scope == 8) {
            this.setCursorAll(true);
            for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
                var actor = _a[_i];
                actor.select();
            }
            this.updateCursor();
        }
        else {
            this.setCursorAll(false);
            this.updateCursor();
            _Window_BattleActor_prototype_reselect.call(this);
        }
    };
    Window_BattleLog.prototype.backPaintOpacity = function () {
        return 140;
    };
    Window_BattleLog.prototype.startTsuigekiAction = function (subject, action, target, weapon) {
        AudioManager.playSe({ name: 'Skill3', volume: 80, pitch: 100, pan: 0 });
        var item = action.item();
        this.push('clear');
        this.push('addText', subject.name() + 'の ' + weapon.name() + ' による追撃！');
        this.push('performActionStart', subject, action);
        this.push('waitForMovement');
        this.push('performAction', subject, action);
        this.push('showAnimation', subject, [target].clone(), item.animationId);
        this.push('invoke', action, target);
        this.displayAction(subject, item);
        this.push('wait');
        this.push('displayActionResults', subject, target);
    };
    Window_BattleLog.prototype.invoke = function (action, target) {
        action.apply(target);
    };
})(Saba || (Saba = {}));

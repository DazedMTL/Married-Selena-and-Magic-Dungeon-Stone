var Saba;
(function (Saba) {
    Scene_Menu.prototype.createStatusWindow = function () {
        this._statusWindow = new Window_MenuStatus(0, this._commandWindow.height);
        this._statusWindow.reserveFaceImages();
        this.addWindow(this._statusWindow);
        if (!$gameSwitches.value(1) && !$gameSwitches.value(21)) {
            for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
                var member = _a[_i];
                member.recoverAll();
            }
        }
    };
    Window_MenuCommand.prototype.numVisibleRows = function () {
        return Math.ceil(this.maxItems() / this.maxCols());
    };
    Window_MenuCommand.prototype.maxCols = function () {
        return 5;
    };
    Window_MenuCommand.prototype.windowWidth = function () {
        return Graphics.boxWidth - 200;
    };
    Window_Gold.prototype.windowWidth = function () {
        return 200;
    };
    Window_MenuCommand.prototype.makeCommandList = function () {
        var enabled = this.areMainCommandsEnabled();
        if (this.needsCommand('item')) {
            this.addCommand(TextManager.item, 'item', enabled && isNotMerTuto());
        }
        this.addCommand(TextManager.skill, 'skill', true && isNotMerTuto());
        /*if (this.needsCommand('equip')) {
            this.addCommand(TextManager.equip, 'equip', enabled);
        }*/
        this.addCommand(TextManager.kigae, 'kigae', $gameSwitches.value(231) && isNotMerTuto());
        this.addCommand(TextManager.organize, 'organize', $gameParty.members().length > 1);
        this.addSaveCommand();
        if (this.needsCommand('status')) {
            this.addCommand(TextManager.status, 'status', enabled && isNotMerTuto());
        }
        this.addCommand(TextManager.eroStatus, 'eroStatus', true && isNotMerTuto());
        this.addCommand(TextManager.medal, 'medal', true && isNotMerTuto());
        this.addCommand(TextManager.mercenaryList, 'mercenaryList', $gameParty.members().length > 1 && isNotMerTuto());
        this.addOptionsCommand();
        //this.addGameEndCommand();
        function isNotMerTuto() {
            if ($gameSwitches.value(238)) {
                return true;
            }
            if ($gameSwitches.value(461)) {
                if (!$gameSwitches.value(241)) {
                    if (!Saba.isMerTutoFinished()) {
                        return false;
                    }
                }
            }
            return true;
        }
    };
    Window_MenuCommand.prototype.addGameEndCommand = function () {
    };
    Window_MenuStatus.prototype.drawItemStatus = function (index) {
        this.contents.fontSize = 26;
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        var x = rect.x;
        var y = rect.y;
        var width = rect.width - x - this.textPadding();
        this.drawActorSimpleStatus(actor, x + 10, y + 0, width);
    };
    Window_MenuStatus.prototype.drawActorSimpleStatus = function (actor, x, y, width) {
        this._windowContentsSprite.paintOpacity = 256;
        var lineHeight = this.lineHeight();
        var x2 = x;
        var y2 = y;
        var width2 = 190;
        this.drawActorLevel(actor, x - 10, y + lineHeight * 0);
        this.drawActorName(actor, x + 260, y + lineHeight * 0);
        this.contents.fontSize = 22;
        this.drawActorNickname(actor, x + 262, y + lineHeight * 1);
        this.contents.fontSize = 26;
        this.drawActorHp(actor, x + 470, y2 + lineHeight * 0, width2);
        this.drawActorMp(actor, x + 700, y2 + lineHeight * 0, width2);
        this.drawActorIcons(actor, x + 260, y2 + lineHeight * 2);
        //this.drawActorTp(actor, x2, y2 + lineHeight * 2, width2);
    };
    Window_MenuStatus.prototype.standardPadding = function () {
        return 12;
    };
    Window_MenuStatus.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };
    Window_MenuStatus.prototype.windowHeight = function () {
        return Graphics.boxHeight - 108;
    };
    Window_MenuStatus.prototype.setOrganize = function (b) {
        this._organize = b;
        if (b) {
            var actor = $gameParty.members()[this.index()];
            if (!actor.isMercenary()) {
                this.cursorDown();
            }
            actor = $gameParty.members()[this.index()];
            if (!actor.isMercenary()) {
                this.cursorUp();
            }
        }
    };
    Window_MenuStatus.prototype.setMainActor = function (b) {
        this._mainActor = b;
        if (b) {
            var actor = $gameParty.members()[this.index()];
            if (actor.isMercenary() || actor.actorId() == 11) {
                this.cursorDown();
                actor = $gameParty.members()[this.index()];
                if (actor.isMercenary() || actor.actorId() == 11) {
                    this.cursorDown();
                }
            }
            actor = $gameParty.members()[this.index()];
            if (actor.isMercenary() || actor.actorId() == 11) {
                this.cursorUp();
            }
        }
    };
    var _Window_Selectable_prototype_cursorDown = Window_Selectable.prototype.cursorDown;
    Window_Selectable.prototype.cursorDown = function (wrap) {
        _Window_Selectable_prototype_cursorDown.call(this, wrap);
        if (this._organize) {
            for (var i = 0; i < 6; i++) {
                var actor = $gameParty.members()[this.index()];
                if (!actor.isMercenary()) {
                    _Window_Selectable_prototype_cursorDown.call(this, wrap);
                }
                else {
                    break;
                }
            }
        }
        if (this._mainActor) {
            for (var i = 0; i < 6; i++) {
                var actor = $gameParty.members()[this.index()];
                if (actor.isMercenary() || actor.actorId() == 11) {
                    _Window_Selectable_prototype_cursorDown.call(this, wrap);
                }
                else {
                    break;
                }
            }
        }
    };
    var _Window_Selectable_prototype_cursorUp = Window_Selectable.prototype.cursorUp;
    Window_Selectable.prototype.cursorUp = function (wrap) {
        _Window_Selectable_prototype_cursorUp.call(this, wrap);
        if (this._organize) {
            for (var i = 0; i < 6; i++) {
                var actor = $gameParty.members()[this.index()];
                if (!actor.isMercenary()) {
                    _Window_Selectable_prototype_cursorUp.call(this, wrap);
                }
                else {
                    break;
                }
            }
        }
        if (this._mainActor) {
            for (var i = 0; i < 6; i++) {
                var actor = $gameParty.members()[this.index()];
                if (actor.isMercenary() || actor.actorId() == 11) {
                    _Window_Selectable_prototype_cursorUp.call(this, wrap);
                }
                else {
                    break;
                }
            }
        }
    };
    Window_MenuStatus.prototype.spacing = function () {
        return 0;
    };
    Scene_Menu.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
    };
    Window_MenuStatus.prototype.drawItemImage = function (index) {
        var actor = $gameParty.members()[index];
        if (actor.actorId() >= 16) {
            return;
        }
        var rect = this.itemRect(index);
        this.changePaintOpacity(actor.isBattleMember());
        var fw = Window_Base._faceWidth;
        var actorCopy = JsonEx.makeDeepCopy(actor);
        actorCopy.setPoseId(actorCopy.defaultPoseId);
        this.drawActorFace(actorCopy, rect.x + 30, rect.y + 3, 250, 100, 0, 0, actorCopy.defaultFaceId);
        this.changePaintOpacity(true);
    };
    Window_MenuStatus.prototype.numVisibleRows = function () {
        return 6;
    };
    Window_MenuStatus.prototype.maxCols = function () {
        return 1;
    };
    var _Scene_Menu_prototype_createGoldWindow = Scene_Menu.prototype.createGoldWindow;
    Scene_Menu.prototype.createGoldWindow = function () {
        _Scene_Menu_prototype_createGoldWindow.call(this);
        this._goldWindow.x = this._commandWindow.width;
        this._goldWindow.y = 0;
    };
    Saba._Game_Party_prototype_allMembers = Game_Party.prototype.allMembers;
    Game_Party.prototype.allMembers = function () {
        if (!$gameSwitches.value(1)) {
            return Saba._Game_Party_prototype_allMembers.call(this);
        }
        var actors = [];
        for (var _i = 0, _a = this._actors; _i < _a.length; _i++) {
            var a = _a[_i];
            var ac = $gameActors.actor(a);
            if (ac.isMercenary() && ac.getAllMembers().length == 0) {
                continue;
            }
            actors.push(a);
        }
        return actors.map(function (id) {
            return $gameActors.actor(id);
        });
    };
    Game_Party.prototype.inMenu = function () {
        if (SceneManager._scene instanceof Scene_MenuBase) {
            return true;
        }
        return false;
    };
    var _Game_CharacterBase_prototype_characterName = Game_CharacterBase.prototype.characterName;
    Game_CharacterBase.prototype.characterName = function () {
        if (this._characterName == '!event') {
            return '';
        }
        return _Game_CharacterBase_prototype_characterName.call(this);
    };
    var Sprite_Enemy_prototype_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function () {
        Sprite_Enemy_prototype_updateBitmap.call(this);
        var size = this._enemy.enemy().meta['size'];
        if (size) {
            this.scale.x = parseFloat(size);
            this.scale.y = this.scale.x;
        }
    };
    Spriteset_Battle.prototype.updateWebGLToneChanger = function () {
        var tone = this._tone;
        this._toneFilter.reset();
        this._toneFilter.adjustTone(tone[0], tone[1], tone[2]);
        this._toneFilter.adjustSaturation(-tone[3]);
    };
    var _Game_Screen_prototype_tone = Game_Screen.prototype.tone;
    Game_Screen.prototype.tone = function () {
        if ($gameParty.inBattle() && $gameSystem.isMistEnabled()) {
            return [-90, -90, -50, 0];
        }
        else if ($gameParty.inBattle() && $gameVariables.value(1) == 5) {
            return [-60, -60, -40, 0];
        }
        else {
            return this._tone;
        }
    };
    Spriteset_Battle.prototype.createWebGLToneChanger = function () {
        var margin = 48;
        var width = Graphics.width + margin * 2;
        var height = Graphics.height + margin * 2;
    };
    var _Spriteset_Battle_prototype_createBattleback = Spriteset_Battle.prototype.createBattleback;
    Spriteset_Battle.prototype.createBattleback = function () {
        var margin = 32;
        var x = -this._battleField.x - margin;
        var y = -this._battleField.y - margin;
        var width = Graphics.width + margin * 2;
        var height = Graphics.height + margin * 2;
        _Spriteset_Battle_prototype_createBattleback.call(this);
        this._toneFilter = new ToneFilter();
        this._back1Sprite.filters = [this._toneFilter];
        this._back1Sprite.filterArea = new Rectangle(-margin, -margin, width, height);
        this._back2Sprite.filters = [this._toneFilter];
        this._back2Sprite.filterArea = new Rectangle(-margin, -margin, width, height);
        var baseTexture = Saba.getSystemBaseTexture('black');
        var texture = new PIXI.Texture(baseTexture);
        this._back3Sprite = new PIXI.Sprite(texture);
        this._back3Sprite.scale = new PIXI.Point(11, 8);
        this._back3Sprite.alpha = 0.6;
        this._battleField.addChild(this._back3Sprite);
    };
    Window_SkillList.prototype.drawItem = function (index) {
        var skill = this._data[index];
        if (skill) {
            var costWidth = this.costWidth();
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(skill));
            this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
            this.drawSkillCost(skill, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };
    Window_SkillList.prototype.drawSkillCost = function (skill, x, y, width) {
        if (this._actor.skillTpCost(skill) > 0) {
            this.changeTextColor(this.tpCostColor());
            this.drawText(Math.floor(this._actor.skillTpCost(skill) / 100), x, y, width, 'right');
        }
        else if (this._actor.skillMpCost(skill) > 0) {
            this.changeTextColor(this.mpCostColor());
            this.drawText(this._actor.skillMpCost(skill), x, y, width, 'right');
        }
    };
    Window_SkillList.prototype.drawItemName = function (item, x, y, width) {
        width = width || 312;
        if (item) {
            var iconBoxWidth = Window_Base._iconWidth + 4;
            this.resetTextColor();
            if (item.name.indexOf('☆') == 0) {
                this.changeTextColor(this.crisisColor());
            }
            if (item.name.indexOf('★') == 0) {
                this.changeTextColor(this.tpCostColor());
            }
            this.drawIcon(item.iconIndex, x + 2, y + 2);
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        }
    };
    Scene_Base.prototype.clearChildren = function () {
        while (this.children.length > 0) {
            if (this.children[0]._pictureContainer) {
                while (this.children[0]._pictureContainer.children.length > 0) {
                    this.children[0]._pictureContainer.children[0].destroy();
                }
            }
            this.children[0].destroyAndRemoveChildren();
            this.removeChild(this.children[0]);
        }
    };
    Game_Screen.prototype.maxPictures = function () {
        return 20;
    };
    var _Scene_Base_terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function () {
        _Scene_Base_terminate.call(this);
        if (this._bypassFirstClear)
            return;
        this.clearChildren();
    };
    WindowLayer.prototype.onRemoveAsAChild = function () {
        this.destroyAndRemoveChildren();
    };
    Sprite_Battler.prototype.updateDamagePopup = function () {
        this.setupDamagePopup();
        if (this._damages.length > 0) {
            for (var i = 0; i < this._damages.length; i++) {
                this._damages[i].update();
            }
            if (!this._damages[0].isPlaying()) {
                var s = this._damages[0];
                this.parent.removeChild(this._damages[0]);
                this._damages.shift();
                s.destroy();
            }
        }
    };
    var _Scene_Item_prototype_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function () {
        _Scene_Item_prototype_create.call(this);
        this._categoryWindow.deactivate();
        this.onCategoryOk();
    };
})(Saba || (Saba = {}));

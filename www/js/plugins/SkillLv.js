var Saba;
(function (Saba) {
    Window_Base.prototype.drawActorMp = function (actor, x, y, width, noLabel) {
        if (actor.skillMaxCounts[1] == 0) {
            if (actor.isMercenary()) {
                this.drawMercenaryMember(actor, x, y, width);
            }
            return;
        }
        width = width || 186;
        var color1 = this.mpGaugeColor1();
        var color2 = this.mpGaugeColor2();
        this.changeTextColor(this.systemColor());
        if (noLabel) {
        }
        else {
            this.drawText(TextManager.mpA, x, y, 44);
        }
        this.changeTextColor(this.normalColor());
        x += width - 152;
        for (var i = 1; i <= 5; i++) {
            var count = actor.skillCounts[i];
            if (count > 0) {
                this.drawNumber(count, x - 7, y - 1, 44, 'left', 3);
            }
            else {
                this._windowContentsSprite.paintOpacity = 98;
                this.drawNumber(0, x - 7, y - 1, 44, 'left', 3);
                this._windowContentsSprite.paintOpacity = 256;
            }
            x += 16;
            if (i != 5) {
                this.drawText('/', x, y, 44);
            }
            x += 17;
        }
    };
    var _Game_Actor_prototype_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function (actorId) {
        this.skillCounts = {};
        this.skillMaxCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        var counts = this.skillMaxCounts;
        switch (actorId) {
            case 2:
                counts[1] = 2;
                break;
            case 3:
                counts[1] = 2;
                break;
            case 4:
                counts[1] = 2;
                break;
        }
        _Game_Actor_prototype_setup.call(this, actorId);
    };
    var _Game_Actor_prototype_recoverAll = Game_Actor.prototype.recoverAll;
    Game_Actor.prototype.recoverAll = function () {
        _Game_Actor_prototype_recoverAll.call(this);
        if (SKILL_COUNTS[this.actorId()]) {
            var data = SKILL_COUNTS[this.actorId()][this.level];
            if (data) {
                var level = 1;
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var d = data_1[_i];
                    this.skillMaxCounts[level] = d;
                    level++;
                }
            }
        }
        for (var key in this.skillMaxCounts) {
            this.skillCounts[key] = this.skillMaxCounts[key];
        }
    };
    var _Game_Actor_prototype_canPaySkillCost = Game_Actor.prototype.canPaySkillCost;
    Game_Actor.prototype.canPaySkillCost = function (skill) {
        var level = parseInt(skill.meta['level']);
        if (level > 0) {
            if (this.skillCounts[level] == 0) {
                return false;
            }
        }
        return _Game_Actor_prototype_canPaySkillCost.call(this, skill);
    };
    var _Game_Actor_prototype_paySkillCost = Game_Actor.prototype.paySkillCost;
    Game_Actor.prototype.paySkillCost = function (skill) {
        _Game_Actor_prototype_paySkillCost.call(this, skill);
        var level = parseInt(skill.meta['level']);
        if (level > 0) {
            this.skillCounts[level] -= 1;
        }
    };
    Scene_ItemBase.prototype.determineItem = function () {
        var action = new Game_Action(this.user());
        var item = this.item();
        action.setItemObject(item);
        if (action.isForFriend()) {
            this.showSubWindow(this._actorWindow);
            this._actorWindow.selectForItem(this.item());
            this._itemWindow.hide();
        }
        else {
            this.useItem();
            this.activateItemWindow();
        }
    };
    Scene_Skill.prototype.onActorCancel = function () {
        this.hideSubWindow(this._actorWindow);
        this._itemWindow.show();
    };
    Scene_Skill.prototype.create = function () {
        Scene_ItemBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createItemWindow();
        this.createActorWindow();
        this._actorWindow.y = 108;
    };
    Scene_Skill.prototype.useItem = function () {
        Scene_ItemBase.prototype.useItem.call(this);
        //this._statusWindow.refresh();
        this._itemWindow.refresh();
    };
    Scene_Skill.prototype.createItemWindow = function () {
        var wx = 0;
        var wy = this._helpWindow.height;
        var ww = Graphics.boxWidth - 300;
        var wh = Graphics.boxHeight - wy;
        this._itemWindow = new Window_SkillList(wx, wy, ww, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this.addWindow(this._itemWindow);
        this._itemWindow.setStypeId(1);
        this._itemWindow.select(0);
        this._itemWindow.activate();
    };
    Scene_Skill.prototype.onItemCancel = function () {
        this.popScene();
    };
    Scene_Skill.prototype.refreshActor = function () {
        var actor = this.actor();
        this._itemWindow.setActor(actor);
    };
    Scene_Skill.prototype.onActorChange = function () {
        this.refreshActor();
        this._itemWindow.activate();
    };
    Scene_Skill.prototype.createHelpWindow = function () {
        this._helpWindow = new Saba.Window_SkillHelp();
        this.addWindow(this._helpWindow);
    };
    var _Window_SkillList_prototype_drawAllItems = Window_SkillList.prototype.drawAllItems;
    Window_SkillList.prototype.drawAllItems = function () {
        for (var i = 1; i <= 5; i++) {
            this['_levels' + i] = [];
        }
        _Window_SkillList_prototype_drawAllItems.call(this);
        for (var i = 0; i < 5; i++) {
            this.drawLevel(i + 1);
        }
        this.setHelpWindowItem(this.item());
    };
    Window_SkillList.prototype.isCurrentItemEnabled = function (wrap) {
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.maxCols();
        var level = Math.floor(index / 2) + 1;
        var col = index % 2;
        //p(this['_levels' + level])
        var skill = (this['_levels' + level][col]);
        return skill && this.isEnabled(skill);
    };
    Window_SkillList.prototype.drawLevel = function (level) {
        var rect = this.itemRect((level - 1) * 2);
        this.changeTextColor(this.systemColor());
        this.contents.drawText('LV' + level, 10, rect.y, 100, this.lineHeight());
        if (!this._actor) {
            return;
        }
        var current = this._actor.skillCounts[level];
        var max = this._actor.skillMaxCounts[level];
        this.changeTextColor(this.normalColor());
        this.contents.drawText(current + '/ ' + max, 80, rect.y, 100, this.lineHeight());
        var total = this._actor.skillCounts[level];
        var tex1 = this.getTex1();
        var tex2 = this.getTex2();
        var tex3 = this.getTex3();
        var max = this._actor.skillMaxCounts[level];
        for (var i = 0; i < max; i++) {
            var s;
            if (i >= total) {
                s = new PIXI.Sprite(tex3);
            }
            else {
                s = new PIXI.Sprite(tex1);
            }
            s.x = 140 + i * 6;
            s.y = rect.y + 6;
            this._windowContentsSprite.addChild(s);
        }
    };
    Window_SkillList.prototype.hitTest = function (x, y) {
        if (this.isContentsArea(x, y)) {
            var cx = x - this.padding;
            var cy = y - this.padding;
            var topIndex = this.topIndex();
            for (var i = 0; i < this.maxPageItems(); i++) {
                var index = topIndex + i;
                if (index < 20) {
                    var rect = this.itemRect(index);
                    var right = rect.x + rect.width;
                    var bottom = rect.y + rect.height;
                    if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
                        return index;
                    }
                }
            }
        }
        return -1;
    };
    Window_SkillList.prototype.itemRect = function (index) {
        var rect = new Rectangle();
        var maxCols = this.maxCols();
        rect.width = 220;
        rect.height = this.itemHeight();
        rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX + 190;
        rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
        return rect;
    };
    Window_SkillList.prototype.spacing = function () {
        return 14;
    };
    Window_SkillList.prototype.selectLast = function () {
        var skill;
        if ($gameParty.inBattle()) {
            skill = this._actor.lastBattleSkill();
        }
        else {
            skill = this._actor.lastMenuSkill();
        }
        if (!skill) {
            this.select(0);
            return;
        }
        var level = parseInt(skill.meta['level']);
        var col = this['_levels' + level].indexOf(skill);
        this.select((level - 1) * 2 + col);
    };
    Window_SkillList.prototype.drawItem = function (index) {
        var skill = this._data[index];
        if (skill) {
            var level = parseInt(skill.meta['level']);
            var rect;
            this['_levels' + level] = this['_levels' + level] || [];
            if (this['_levels' + level].length >= 1) {
                rect = this.itemRect(level * 2 - 1);
            }
            else {
                rect = this.itemRect(level * 2 - 2);
            }
            this['_levels' + level].push(skill);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(skill));
            this.drawItemName(skill, rect.x, rect.y, rect.width);
            //this.drawSkillCost(skill, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };
    Window_SkillList.prototype.cursorDown = function (wrap) {
        if (this.width <= 600) {
            return this.nextItem();
        }
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.maxCols();
        var level = Math.floor(index / 2) + 1 + 1;
        var col = index % 2;
        //p(this['_levels' + level])
        var count = 0;
        if (level > 5) {
            level = 1;
        }
        while (this['_levels' + level].length <= col) {
            level++;
            count++;
            if (level > 5) {
                level = 1;
            }
            if (count > 5) {
                col = 0;
                level = 1;
                break;
            }
        }
        index = (level - 1) * 2 + col;
        this.select(index);
    };
    Window_SkillList.prototype.nextItem = function () {
        var index = this.index();
        var level = Math.floor(index / 2) + 1;
        if (level > 5) {
            level = 1;
        }
        var col = index % 2;
        if (col == 0) {
            col++;
        }
        else {
            level++;
            col = 0;
        }
        var count = 0;
        while (this['_levels' + level].length <= col) {
            count++;
            if (col == 0) {
                col++;
            }
            else {
                col = 0;
                level++;
                if (level > 5) {
                    level = 1;
                }
            }
            if (count > 5) {
                col = 0;
                level = 1;
                break;
            }
        }
        index = (level - 1) * 2 + col;
        this.select(index);
    };
    Window_SkillList.prototype.cursorUp = function (wrap) {
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.maxCols();
        var level = Math.floor(index / 2);
        if (level < 1) {
            level = 5;
        }
        var col = index % 2;
        var count = 0;
        while (this['_levels' + level].length <= col) {
            count++;
            level--;
            if (level < 1) {
                level = 5;
            }
            if (count > 5) {
                col = 0;
                level = 1;
                break;
            }
        }
        index = (level - 1) * 2 + col;
        this.select(index);
    };
    Window_SkillList.prototype.item = function () {
        var index = this.index();
        var level = Math.floor(index / 2) + 1;
        var col = index % 2;
        if (this['_levels' + level]) {
            return this['_levels' + level][col];
        }
        else {
            return null;
        }
    };
    Window_SkillList.prototype.cursorRight = function (wrap) {
        var index = this.index();
        var level = Math.floor(index / 2) + 1;
        var col = index % 2;
        if (col == 0) {
            if (this['_levels' + level].length > 1) {
                col++;
            }
        }
        else {
            col = 0;
        }
        index = (level - 1) * 2 + col;
        this.select(index);
    };
    Window_SkillList.prototype.cursorLeft = function (wrap) {
        this.cursorRight(wrap);
    };
    function checkNewMagic() {
        var itemList = $gameParty.allItems();
        var magicList = [];
        for (var _i = 0, itemList_1 = itemList; _i < itemList_1.length; _i++) {
            var m = itemList_1[_i];
            if (m && m.meta['skillId']) {
                magicList.push(m);
                var actor = $gameActors.actor(parseInt(m.meta['actor']));
                actor.learnSkill(parseInt(m.meta['skillId']));
            }
        }
        for (var _a = 0, magicList_1 = magicList; _a < magicList_1.length; _a++) {
            var m2 = magicList_1[_a];
            $gameParty.loseItem(m2, 1);
        }
        return magicList.length > 0;
    }
    Saba.checkNewMagic = checkNewMagic;
})(Saba || (Saba = {}));

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
    Saba.MAX_MERCERNARY_NUM = 5;
    Game_Party.prototype.charactersForSavefile = function () {
        var members = this.battleMembers();
        var list = [];
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var m = members_1[_i];
            if (!m.isMercenary()) {
                list.push(m);
            }
        }
        return list.map(function (actor) {
            return [actor.characterName(), actor.characterIndex()];
        });
    };
    var _Scene_Menu_prototype_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_prototype_createCommandWindow.call(this);
        this._commandWindow.setHandler('organize', this.commandPersonal.bind(this));
    };
    function canGoDungeon() {
        for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.isMercenary()) {
                if (m.getAliveMembers().length == 0) {
                    return false;
                }
            }
        }
        return true;
    }
    Saba.canGoDungeon = canGoDungeon;
    Object.defineProperty(Game_Actor.prototype, 'level', {
        get: function () {
            if (this.isMercenary()) {
                var list = this.getAllMembers();
                if (list.length == 0) {
                    return 0;
                }
                var total = 0;
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var m = list_1[_i];
                    var actor = $gameActors.actor(parseInt(m.meta['actor']));
                    total += actor.level;
                }
                return Math.round(total / list.length);
            }
            else {
                return this._level;
            }
        },
        configurable: true
    });
    var _Scene_Menu_prototype_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function () {
        _Scene_Menu_prototype_onPersonalOk.call(this);
        switch (this._commandWindow.currentSymbol()) {
            case 'organize':
                if (!$gameParty.menuActor().isMercenary()) {
                    SoundManager.playBuzzer();
                    this._statusWindow.activate();
                    return;
                }
                SceneManager.push(Scene_Organization);
                break;
        }
    };
    var _Scene_Menu_prototype_commandPersonal = Scene_Menu.prototype.commandPersonal;
    Scene_Menu.prototype.commandPersonal = function () {
        _Scene_Menu_prototype_commandPersonal.call(this);
        var organize = this._commandWindow.currentSymbol() == 'organize';
        var mainActor = this._commandWindow.currentSymbol() == 'kigae' || this._commandWindow.currentSymbol() == 'eroStatus' || this._commandWindow.currentSymbol() == 'skill';
        this._statusWindow.setOrganize(organize);
        this._statusWindow.setMainActor(mainActor);
    };
    var Window_EquipStatus2 = /** @class */ (function (_super) {
        __extends(Window_EquipStatus2, _super);
        function Window_EquipStatus2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_EquipStatus2.prototype.windowHeight = function () {
            return this.fittingHeight(this.numVisibleRows());
        };
        Window_EquipStatus2.prototype.windowWidth = function () {
            return 300;
        };
        Window_EquipStatus2.prototype.numVisibleRows = function () {
            return 6;
        };
        return Window_EquipStatus2;
    }(Window_EquipStatus));
    var Scene_Organization = /** @class */ (function (_super) {
        __extends(Scene_Organization, _super);
        function Scene_Organization() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_Organization.prototype.create = function () {
            _super.prototype.create.call(this);
            if ($gameActors.actor(90)._level == null) {
                $gameActors.actor(90)._level = 6;
            }
            if ($gameActors.actor(91)._level == null) {
                $gameActors.actor(91)._level = 6;
            }
            this.createHelpWindow();
            this.createMercenaryStatusWindow();
            this.createStatusWindow();
            this.createSlotWindow();
            this.createItemWindow();
            this.createLabel();
            this.refreshActor();
        };
        Scene_Organization.prototype.createLabel = function () {
            var baseTexture = Saba.getSystemBaseTexture('number');
            var sprite = new PIXI.Sprite(new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 746, 280, 30)));
            this._label = sprite;
            this._label.x = 734;
            this._label.y = 10;
            this.addChild(this._label);
        };
        Scene_Organization.prototype.createHelpWindow = function () {
            this._helpWindow = new Window_Help(5);
            this.addWindow(this._helpWindow);
        };
        Scene_Organization.prototype.createStatusWindow = function () {
            this._statusWindow = new Window_EquipStatus2(0, this._helpWindow.height);
            this.addWindow(this._statusWindow);
        };
        Scene_Organization.prototype.createMercenaryStatusWindow = function () {
            this._mercenaryWindow = new Saba.Window_MercenaryStatus(0, 0, Graphics.width, this._helpWindow.height, null, true);
            this.addWindow(this._mercenaryWindow);
            this._mercenaryWindow.hide();
        };
        Scene_Organization.prototype.onChange = function () {
            this._mercenaryWindow.setArmor(this._slotWindow.item());
        };
        Scene_Organization.prototype.onRight = function () {
            if (this._mercenaryWindow.visible) {
                this._mercenaryWindow.hide();
                this._helpWindow.show();
            }
            else {
                this._mercenaryWindow.show();
                this._helpWindow.hide();
            }
        };
        Scene_Organization.prototype.createSlotWindow = function () {
            var wx = this._statusWindow.width;
            var wy = this._helpWindow.y + this._helpWindow.height;
            var ww = Graphics.boxWidth - this._statusWindow.width;
            var wh = this._statusWindow.height;
            this._slotWindow = new Window_MercenarySlot(wx, wy, ww, wh);
            this._slotWindow.setHelpWindow(this._helpWindow);
            this._slotWindow.setStatusWindow(this._statusWindow);
            this._slotWindow.setHandler('ok', this.onSlotOk.bind(this));
            this._slotWindow.setHandler('cancel', this.onSlotCancel.bind(this));
            this._slotWindow.setHandler('pagedown', this.onSlotNext.bind(this));
            this._slotWindow.setHandler('pageup', this.onSlotPrevious.bind(this));
            this._slotWindow.setHandler('change', this.onChange.bind(this));
            this._slotWindow.setHandler('cursorRight', this.onRight.bind(this));
            this.addWindow(this._slotWindow);
        };
        Scene_Organization.prototype.onSlotNext = function () {
            this._slotWindow.activate();
            if ($gameSwitches.value(1)) {
                return;
            }
            var i = this._slotWindow.index();
            if (i >= 4) {
                return;
            }
            var tmp = this._actor.equips()[i];
            var tmp2 = this._actor.equips()[i + 1];
            this._actor._equips[i].setObject(tmp2);
            this._actor._equips[i + 1].setObject(tmp);
            this._slotWindow.refresh();
            this._slotWindow.select(i + 1);
        };
        Scene_Organization.prototype.onSlotPrevious = function () {
            this._slotWindow.activate();
            if ($gameSwitches.value(1)) {
                return;
            }
            var i = this._slotWindow.index();
            if (i == 0) {
                return;
            }
            var tmp = this._actor.equips()[i];
            var tmp2 = this._actor.equips()[i - 1];
            this._actor._equips[i].setObject(tmp2);
            this._actor._equips[i - 1].setObject(tmp);
            this._slotWindow.refresh();
            this._slotWindow.select(i - 1);
        };
        Scene_Organization.prototype.createItemWindow = function () {
            var wx = 0;
            var www = 424;
            var wy = this._statusWindow.y + this._statusWindow.height;
            var ww = Graphics.boxWidth - www;
            var wh = Graphics.boxHeight - wy;
            this._itemWindow = new Window_MecenaryItem(wx + www, wy, ww, wh);
            this._itemWindow.setHelpWindow(this._helpWindow);
            this._itemWindow.setStatusWindow(this._statusWindow);
            this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
            this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
            this._slotWindow.setItemWindow(this._itemWindow);
            this.addWindow(this._itemWindow);
            this._paramWindow = new Saba.Window_EquipParam(0, wy, www, wh);
            this.addWindow(this._paramWindow);
        };
        Scene_Organization.prototype.onSlotOk = function () {
            this._itemWindow.activate();
            this._itemWindow.select(0);
        };
        Scene_Organization.prototype.onSlotCancel = function () {
            SceneManager.pop();
        };
        Scene_Organization.prototype.onItemOk = function () {
            SoundManager.playEquip();
            this.actor().changeEquip(this._slotWindow.index(), this._itemWindow.item());
            this.actor().recoverAll();
            this._slotWindow.activate();
            this._slotWindow.refresh();
            this._itemWindow.deselect();
            this._itemWindow.refresh();
            this._statusWindow.refresh();
            this._paramWindow.refresh();
        };
        Scene_Organization.prototype.onItemCancel = function () {
            this._slotWindow.activate();
            this._itemWindow.deselect();
        };
        Scene_Organization.prototype.refreshActor = function () {
            var actor = this.actor();
            this._statusWindow.setActor(actor);
            this._slotWindow.setActor(actor);
            this._itemWindow.setActor(actor);
            this._paramWindow.setActor(actor);
            this._slotWindow.activate();
            this._slotWindow.select(0);
        };
        return Scene_Organization;
    }(Scene_MenuBase));
    var _Game_Actor_prototype_initEquips = Game_Actor.prototype.initEquips;
    Game_Actor.prototype.initEquips = function (equips) {
        _Game_Actor_prototype_initEquips.call(this, equips);
        if (this.isMercenary()) {
            for (var i = 0; i < Saba.MAX_MERCERNARY_NUM; i++) {
                this._equips[i] = new Game_Item();
            }
        }
        if (this.actorId() == 32) {
            this._equips[0].setObject($dataArmors[452]);
            this._equips[1].setObject($dataArmors[451]);
            this._equips[2].setObject($dataArmors[453]);
        }
    };
    Game_Actor.prototype.getMercenaryDamageUp = function () {
        var equips = this.getMercenarySkills();
        var result = 1;
        for (var _i = 0, equips_1 = equips; _i < equips_1.length; _i++) {
            var e = equips_1[_i];
            if (e) {
                if (e.meta['damageUp']) {
                    result += parseInt(e.meta['damageUp']) / 100;
                }
            }
        }
        return result;
    };
    Game_Actor.prototype.getMercenarySkills = function () {
        if (!this.isMercenary()) {
            return _Game_Actor_prototype_armors.call(this);
        }
        var members = this.getAliveMembers();
        var result = [];
        for (var _i = 0, members_2 = members; _i < members_2.length; _i++) {
            var m = members_2[_i];
            var m2 = $gameActors.actor(m.meta['actor']);
            result = result.concat(getMercenaryArmorSkills(m2));
        }
        return result;
    };
    var getMercenaryArmorSkills = function (m2) {
        var skills = m2.skills();
        var result = [];
        for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
            var s = skills_1[_i];
            if (s && s.meta['armor']) {
                var passive = parseInt(s.meta['armor']);
                result.push($dataArmors[passive]);
            }
        }
        return result;
    };
    Game_Actor.prototype.isMercenary = function () {
        return this.actor().meta['傭兵'];
    };
    Game_Actor.prototype.isEmptyMercenary = function () {
        if (!this.isMercenary()) {
            return false;
        }
        for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
            var e = _a[_i];
            if (e != null) {
                return false;
            }
        }
        return true;
    };
    var _Game_Actor_prototype_equipSlots = Game_Actor.prototype.equipSlots;
    Game_Actor.prototype.equipSlots = function () {
        if (!this.isMercenary()) {
            return _Game_Actor_prototype_equipSlots.call(this);
        }
        var slots = [];
        for (var i = 0; i < Saba.MAX_MERCERNARY_NUM; i++) {
            slots.push(2);
        }
        return slots;
    };
    var _Game_Actor_prototype_isAppeared = Game_Actor.prototype.isAppeared;
    Game_Actor.prototype.isAppeared = function () {
        if (!this.isMercenary()) {
            if (this.mhp == 0) {
                return false;
            }
        }
        return _Game_Actor_prototype_isAppeared.call(this);
    };
    var _Game_Actor_prototype_recoverAll = Game_Actor.prototype.recoverAll;
    Game_Actor.prototype.recoverAll = function () {
        _Game_Actor_prototype_recoverAll.call(this);
        if (!this.isMercenary()) {
            return;
        }
        this._aliveMercenary = 0;
        for (var i = 0; i < Saba.MAX_MERCERNARY_NUM; i++) {
            if (!this._equips[i].isNull()) {
                this._aliveMercenary++;
            }
        }
        this._hp = 99;
        this._hp = this.mhp;
    };
    var _Game_ActionResult_prototype_clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function () {
        _Game_ActionResult_prototype_clear.call(this);
        this.deadMercenaries = [];
    };
    var _Game_Action_prototype_executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function (target, value) {
        var before = target.getAliveMembers();
        var real = value;
        var n = target.getFrontMerHp();
        if (n > 0 && value > n) {
            value = n;
        }
        _Game_Action_prototype_executeHpDamage.call(this, target, value);
        if (real > 0) {
            target.result().hpDamage = real;
        }
        var result = target.result();
        var after = target.getAliveMembers();
        //p(before)
        //p(after)
        if (before.length != after.length) {
            for (var _i = 0, before_1 = before; _i < before_1.length; _i++) {
                var m = before_1[_i];
                if (!after.contains(m)) {
                    result.deadMercenaries.push(m);
                }
            }
            if (after.length == 1) {
                $gameSwitches.setValue(206, true);
            }
        }
    };
    Game_Enemy.prototype.getFrontMerHp = function () {
        return 0;
    };
    Game_Actor.prototype.getFrontMerHp = function () {
        if (!this.isMercenary()) {
            return 0;
        }
        var hp = this.hp;
        for (var i = Saba.MAX_MERCERNARY_NUM - 1; i >= 0; i--) {
            if (!this._equips[i].isNull()) {
                if (!this._equips[i].object()) {
                    continue;
                }
                var h = getMercenaryHp(this._equips[i].object());
                if (hp <= h) {
                    return hp;
                }
                hp -= h;
            }
        }
        return 0;
    };
    var _Window_BattleLog_prototype_displayDamage = Window_BattleLog.prototype.displayDamage;
    Window_BattleLog.prototype.displayDamage = function (target) {
        _Window_BattleLog_prototype_displayDamage.call(this, target);
        var mem = target.result().deadMercenaries;
        if (mem && mem.length > 0) {
            for (var _i = 0, mem_1 = mem; _i < mem_1.length; _i++) {
                var m = mem_1[_i];
                if ($gameVariables.value(1) == 0) {
                    this.push('addText', '「' + m.name + '」is dead!');
                }
                else {
                    this.push('addText', '「' + m.name + '」is dead!');
                }
                this.push('playMercenarySe');
                this.push('wait');
                this.push('wait');
            }
        }
    };
    Window_BattleLog.prototype.playMercenarySe = function (subject, targets) {
        AudioManager.playSe({ name: 'Blow1', volume: 100, pitch: 90, pan: 0 });
    };
    Window_Base.prototype.drawMercenaryMember = function (actor, x, y, width) {
        var i = 0;
        var list = actor.getAllMembers();
        var total = actor.getAliveMembers().length;
        var list2 = [];
        for (var k = list.length - 1; k >= 0; k--) {
            list2.push(list[k]);
        }
        var hp = actor.hp;
        var remain = actor.mhp;
        for (var _i = 0, list2_1 = list2; _i < list2_1.length; _i++) {
            var m = list2_1[_i];
            i++;
            if (list.length - total >= i) {
                this.drawIcon(1660, x, y - 1);
                var s = Saba.getHpSprite(0);
            }
            else {
                this.drawIcon(1675, x, y - 1);
                var actor2 = $gameActors.actor(parseInt(m.meta['actor']));
                var h = remain - getMercenaryHp(m);
                remain -= getMercenaryHp(m);
                var merHp = hp - h;
                var s = Saba.getHpSprite(merHp);
                hp -= merHp;
            }
            s.x = x - 3;
            s.y = y - 8;
            this._windowContentsSprite.addChild(s);
            x += 29;
        }
    };
    var _Game_Actor_prototype_onPlayerWalk = Game_Actor.prototype.onPlayerWalk;
    Game_Actor.prototype.onPlayerWalk = function () {
        if (!$gameSwitches.value(1)) {
            return;
        }
        _Game_Actor_prototype_onPlayerWalk.call(this);
    };
    Game_Battler.prototype.getAliveMembers = function () {
        return [];
    };
    Game_Actor.prototype.getAliveMembers = function () {
        if (!this.isMercenary()) {
            return [];
        }
        if (!this._equips) {
            return [];
        }
        var members = [];
        var hp = this.hp;
        for (var i = Saba.MAX_MERCERNARY_NUM - 1; i >= 0; i--) {
            if (!this._equips[i].isNull()) {
                if (!this._equips[i].object()) {
                    continue;
                }
                var h = getMercenaryHp(this._equips[i].object());
                if (hp > 0) {
                    members.push(this._equips[i].object());
                }
                hp -= h;
            }
        }
        return members;
    };
    function getMercenaryHp(armor) {
        var actor = $gameActors.actor(parseInt(armor.meta['actor']));
        var h = Math.floor(actor.level / 3);
        var vit = actor.getParamValue('vit');
        if (vit > 0) {
            h += vit * Saba.HP_PER_VIT_MER;
        }
        h = Math.floor(h);
        return h + 1;
    }
    Saba.getMercenaryHp = getMercenaryHp;
    function getMercenaryHp2(actor) {
        var h = Math.floor(actor.level / 3);
        var vit = actor.getParamValue('vit');
        if (vit > 0) {
            h += vit * Saba.HP_PER_VIT_MER;
        }
        h = Math.floor(h);
        return h + 1;
    }
    Saba.getMercenaryHp2 = getMercenaryHp2;
    Game_Actor.prototype.getAllMembers = function () {
        if (!this.isMercenary()) {
            return [];
        }
        if (!this._equips) {
            return [];
        }
        var members = [];
        var hp = this.hp;
        for (var i = Saba.MAX_MERCERNARY_NUM - 1; i >= 0; i--) {
            if (!this._equips[i].isNull()) {
                if (!this._equips[i].object()) {
                    continue;
                }
                members.push(this._equips[i].object());
            }
        }
        return members;
    };
    Game_Actor.prototype.getParamValue = function (key) {
        var n = 0;
        if (this.actor().meta[key + '_']) {
            n += Math.floor(getRealParamValue(this.actor().meta[key + '_'], this.level));
        }
        this.params = this.params || {};
        if (this.params[key]) {
            n += this.params[key];
        }
        return n;
    };
    function getRealParamValue(rank, level) {
        return PARAM_MAP[rank][level - 1];
    }
    Game_Actor.prototype.getMerExpText = function () {
        this._merExp = this._merExp || 0;
        if (this.isMaxLevel()) {
            return '----';
        }
        return this._merExp + '/' + 10;
    };
    Game_Actor.prototype.gainExpMercenary = function (value) {
        var members = this.getAliveMembers();
        for (var _i = 0, members_3 = members; _i < members_3.length; _i++) {
            var m = members_3[_i];
            var actor = $gameActors.actor(parseInt(m.meta['actor']));
            var plusHp = actor.gainExpMercenary2(value);
            if (plusHp > 0) {
                this._hp += plusHp;
            }
        }
    };
    Game_Actor.prototype.gainExpMercenary2 = function (value) {
        this.params = this.params || {};
        /*this._merExp = this._merExp || 0;
        this._merExp++;
        /*this._merExp++;
        this._merExp++;
        this._merExp++;
        this._merExp++;
        this._merExp++;
        this._merExp++;
        this._merExp++;
        this._merExp++;
        this._merExp++;*/
        var last = getMercenaryHp2(this);
        this.gainExp(value);
        return getMercenaryHp2(this) - last;
    };
    var _Game_Actor_prototype_finalExpRate = Game_Actor.prototype.finalExpRate;
    Game_Actor.prototype.finalExpRate = function () {
        return 1;
    };
    var Window_MecenaryItem = /** @class */ (function (_super) {
        __extends(Window_MecenaryItem, _super);
        function Window_MecenaryItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_MecenaryItem.prototype.includes = function (item) {
            if (item === null) {
                return true;
            }
            return item.atypeId == 5;
        };
        Window_MecenaryItem.prototype.drawItem = function (index) {
            var item = this._data[index];
            if (item) {
                var rect = this.itemRect(index);
                rect.width -= this.textPadding();
                this.changePaintOpacity(this.isEnabled(item));
                this.drawItemName(item, rect.x, rect.y, rect.width - 300);
                var actor = $gameActors.actor(parseInt(item.meta['actor']));
                //drawMercenaryStatus(item, this, rect.x - 120, rect.y);
                this.drawActorParam(actor, 276, rect.y + 2);
            }
        };
        Window_MecenaryItem.prototype.maxCols = function () {
            return 1;
        };
        ;
        return Window_MecenaryItem;
    }(Window_EquipItem));
    Saba.Window_MecenaryItem = Window_MecenaryItem;
    function drawMercenaryStatus(armor, window, x, y) {
        var baseX = 380;
        var baseY = 6;
        var interval = 45;
        var hp = getMercenaryHp(armor);
        var s;
        if (hp <= 10) {
            s = Saba.getIconSprite2(4, hp);
        }
        else {
            s = Saba.getIconSprite2(16, hp - 10);
        }
        s.x = x + baseX;
        s.y = y - baseY;
        window._windowContentsSprite.addChild(s);
        var actor = $gameActors.actor(parseInt(armor.meta['actor']));
        var str = actor.getParamValue('str');
        if (str > 0) {
            var s = Saba.getIconSprite2(2, str);
            s.x = x + baseX + interval * 1;
            s.y = y - baseY;
            window._windowContentsSprite.addChild(s);
        }
        var vit = actor.getParamValue('vit');
        if (vit) {
            s = Saba.getIconSprite2(8, vit);
            s.x = x + baseX + interval * 2;
            s.y = y - baseY;
            window._windowContentsSprite.addChild(s);
        }
        var mnd = actor.getParamValue('mnd');
        if (mnd) {
            s = Saba.getIconSprite2(20, mnd);
            s.x = x + baseX + interval * 3;
            s.y = y - baseY;
            window._windowContentsSprite.addChild(s);
        }
        var agi = actor.getParamValue('agi');
        if (agi) {
            s = Saba.getIconSprite2(11, agi);
            s.x = x + baseX + interval * 4;
            s.y = y - baseY;
            window._windowContentsSprite.addChild(s);
        }
        var luk = actor.getParamValue('luk');
        if (luk) {
            s = Saba.getIconSprite2(5, luk);
            s.x = x + baseX + interval * 5;
            s.y = y - baseY;
            window._windowContentsSprite.addChild(s);
        }
    }
    Window_Base.prototype.drawActorParam = function (actor, x, y) {
        var params = ['str_', 'mgc_', 'vit_', 'mnd_', 'agi_', 'luk_'];
        var i = 0;
        for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
            var param = params_1[_i];
            var a = actor.actor().meta[param];
            var n = 0;
            switch (a) {
                case 'F':
                    n = 0;
                    break;
                case 'E':
                    n = 1;
                    break;
                case 'D':
                    n = 2;
                    break;
                case 'C':
                    n = 3;
                    break;
                case 'B':
                    n = 4;
                    break;
                case 'A':
                    n = 5;
                    break;
                case 'S':
                    n = 6;
                    break;
            }
            this.drawAlphabet(n, x + i * 42, y);
            i++;
        }
    };
    var Window_MercenarySlot = /** @class */ (function (_super) {
        __extends(Window_MercenarySlot, _super);
        function Window_MercenarySlot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_MercenarySlot.prototype.initialize = function (x, y, width, height) {
            _super.prototype.initialize.call(this, x, y, width, height);
            this._actor = null;
            this.refresh();
        };
        Window_MercenarySlot.prototype.setActor = function (actor) {
            if (this._actor !== actor) {
                this._actor = actor;
                this.refresh();
            }
        };
        Window_MercenarySlot.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._itemWindow) {
                this._itemWindow.setSlotId(this.index());
            }
        };
        Window_MercenarySlot.prototype.maxItems = function () {
            return Saba.MAX_MERCERNARY_NUM;
        };
        Window_MercenarySlot.prototype.item = function () {
            return this._actor ? this._actor.equips()[this.index()] : null;
        };
        Window_MercenarySlot.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
            this.drawTitle();
        };
        Window_MercenarySlot.prototype.drawTitle = function () {
            this.changeTextColor(this.systemColor());
            this.contents.fontSize = 22;
            var titles = ['Pow', 'Mag', 'Bod', 'Spi', 'Spd', 'Luk']
            var index = 0;
            for (var _i = 0, titles_1 = titles; _i < titles_1.length; _i++) {
                var t = titles_1[_i];
                this.drawText(t, 402 + index * 42, -4, 138, this.lineHeight());
                index++;
            }
            this.contents.fontSize = 26;
        };
        Window_MercenarySlot.prototype.itemRect = function (index) {
            var rect = new Rectangle();
            var maxCols = this.maxCols();
            rect.width = this.itemWidth();
            rect.height = this.itemHeight();
            rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
            rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 32;
            return rect;
        };
        Window_MercenarySlot.prototype.drawItem = function (index) {
            if (this._actor) {
                var rect = this.itemRectForText(index);
                this.changeTextColor(this.systemColor());
                this.changePaintOpacity(this.isEnabled(index));
                this.drawText(this.slotName(index), rect.x, rect.y, 138, this.lineHeight());
                this.drawItemName(this._actor.equips()[index], rect.x + 118, rect.y);
                var armor = this._actor.equips()[index];
                if (!armor) {
                    return;
                }
                var baseX = 380;
                var baseY = 6;
                var interval = 45;
                var hp = getMercenaryHp(armor);
                var s;
                /*if (hp <= 10) {
                    s = getIconSprite2(4, hp);
                } else {
                    s = getIconSprite2(16, hp - 10);
                }
                s.x = rect.x + baseX;
                s.y = rect.y - baseY;
                this._windowContentsSprite.addChild(s);
                */
                var actor = $gameActors.actor(parseInt(armor.meta['actor']));
                this.drawActorParam(actor, 400, rect.y - 2);
                /*
                var str = actor.getParamValue('str');
                if (str > 0) {
                    var s = getIconSprite2(2, str);
                    s.x = rect.x + baseX + interval * 1;
                    s.y = rect.y - baseY;
                    this._windowContentsSprite.addChild(s);
                }
               
                var vit = actor.getParamValue('vit');
                if (vit) {
                    s = getIconSprite2(8, vit);
                    s.x = rect.x + baseX + interval * 2;
                    s.y = rect.y - baseY;
                    this._windowContentsSprite.addChild(s);
                }
                var mnd = actor.getParamValue('mnd');
                if (mnd) {
                    s = getIconSprite2(20, mnd);
                    s.x = rect.x + baseX + interval * 3;
                    s.y = rect.y - baseY;
                    this._windowContentsSprite.addChild(s);
                }
                var agi = actor.getParamValue('agi');
                if (agi) {
                    s = getIconSprite2(11, agi);
                    s.x = rect.x + baseX + interval * 4;
                    s.y = rect.y - baseY;
                    this._windowContentsSprite.addChild(s);
                }
                var luk = actor.getParamValue('luk');
                if (luk) {
                    s = getIconSprite2(5, luk);
                    s.x = rect.x + baseX + interval * 5;
                    s.y = rect.y - baseY;
                    this._windowContentsSprite.addChild(s);
                }*/
            }
        };
        Window_MercenarySlot.prototype.cursorRight = function (wrap) {
            _super.prototype.cursorRight.call(this, wrap);
            this.callHandler('cursorRight');
        };
        Window_MercenarySlot.prototype.cursorLeft = function (wrap) {
            _super.prototype.cursorLeft.call(this, wrap);
            this.callHandler('cursorRight');
        };
        Window_MercenarySlot.prototype.setHelpWindowItem = function (item) {
            _super.prototype.setHelpWindowItem.call(this, item);
        };
        Window_MercenarySlot.prototype.slotName = function (index) {
            return 'Member ' + (index + 1);
        };
        Window_MercenarySlot.prototype.playBuzzerSound = function () {
            _super.prototype.playBuzzerSound.call(this);
            if ($gameSwitches.value(1)) {
                this._helpWindow.setText('\\C[18]Cannot organize during an adventure');
                return;
            }
        };
        Window_MercenarySlot.prototype.isEnabled = function (index) {
            if ($gameSwitches.value(1)) {
                return false;
            }
            return this._actor ? this._actor.isEquipChangeOk(index) : false;
        };
        Window_MercenarySlot.prototype.isCurrentItemEnabled = function () {
            return this.isEnabled(this.index());
        };
        Window_MercenarySlot.prototype.setStatusWindow = function (statusWindow) {
            this._statusWindow = statusWindow;
            this.callUpdateHelp();
        };
        Window_MercenarySlot.prototype.setItemWindow = function (itemWindow) {
            this._itemWindow = itemWindow;
            this.update();
        };
        Window_MercenarySlot.prototype.updateHelp = function () {
            _super.prototype.updateHelp.call(this);
            this.setHelpWindowItem(this.item());
            if (this._statusWindow) {
                this._statusWindow.setTempActor(null);
            }
        };
        return Window_MercenarySlot;
    }(Window_Selectable));
    Saba.mercenarySexCount = function () {
        var n = 0;
        for (var i = 450; i < 500; i++) {
            var armor = $dataArmors[i];
            var actorId = parseInt(armor.meta['actor']);
            if (actorId > 0) {
                if ($gameSwitches.value(i)) {
                    n += $gameActors.actor(actorId).actor().meta['nakadashi_'];
                }
            }
        }
        return n;
    };
    Game_Enemy.prototype.getArmorSkills = function () {
        return [];
    };
    Game_Actor.prototype.getArmorSkills = function () {
        var result = [];
        if (!this.isMercenary()) {
            return result;
        }
    };
    var _Game_Player_prototype_updateEncounterCount = Game_Player.prototype.updateEncounterCount;
    Game_Player.prototype.updateEncounterCount = function () {
        if (this.canEncounter()) {
            if ($gameSwitches.value(1) && $gameSwitches.value(238)) {
                if ($gameSwitches.value(878)) {
                    // ラスボス前
                    return;
                }
                this._food--;
                $gameMedals.onStep();
                //p(this._food)
                if (this._food <= 0) {
                    $gameTemp.reserveCommonEvent(698);
                    return;
                }
            }
        }
        _Game_Player_prototype_updateEncounterCount.call(this);
    };
    Game_Player.prototype.startDungeon = function () {
        this._maxFood = 100;
        this._food = this._maxFood;
    };
    function isSurplusMercenary() {
        var n = Saba.getAllMercenaryActors().length;
        var isAllMax = true;
        for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.isMercenary()) {
                n -= m.getAliveMembers().length;
                //p(m.getAliveMembers().length)
                if (m.getAliveMembers().length < 5) {
                    isAllMax = false;
                }
            }
        }
        return n > 0 && !isAllMax;
    }
    Saba.isSurplusMercenary = isSurplusMercenary;
    function killMercenary() {
        var list = $gameParty.aliveMembers();
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var m = list_2[_i];
            if (!m.isMercenary()) {
                continue;
            }
            var hp = m.hp;
            var list2 = m.getAliveMembers();
            for (var _a = 0, list2_2 = list2; _a < list2_2.length; _a++) {
                var m2 = list2_2[_a];
                var hp2 = getMercenaryHp(m2);
                if (hp > hp2) {
                    hp -= hp2;
                }
                else {
                    m.gainHp(-hp);
                    $gameVariables.setValue(20, m2.name);
                    $gameSwitches.setValue(20, true);
                    return;
                }
            }
        }
    }
    Saba.killMercenary = killMercenary;
})(Saba || (Saba = {}));

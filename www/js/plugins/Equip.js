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
    Game_Actor.prototype.equipSlots = function () {
        var slots = [1, 1, 3, 4, 5, 6];
        return slots;
    };
    Scene_Equip.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createStatusWindow();
        this.createSlotWindow();
        this.createItemWindow();
        this.refreshActor();
    };
    Scene_Equip.prototype.createSlotWindow = function () {
        var wx = this._statusWindow.width;
        var wy = this._helpWindow.height;
        var ww = Graphics.boxWidth - this._statusWindow.width;
        var wh = this._statusWindow.height;
        this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
        this._slotWindow.setHelpWindow(this._helpWindow);
        this._slotWindow.setStatusWindow(this._statusWindow);
        this._slotWindow.setHandler('ok', this.onSlotOk.bind(this));
        this._slotWindow.setHandler('cancel', this.popScene.bind(this));
        this._slotWindow.select(0);
        this._slotWindow.activate();
        this.addWindow(this._slotWindow);
    };
    Scene_Equip.prototype.createItemWindow = function () {
        var wx = 0;
        var wy = this._statusWindow.y + this._statusWindow.height;
        var www = 400;
        var ww = Graphics.boxWidth - www;
        var wh = Graphics.boxHeight - wy;
        this._itemWindow = new Window_EquipItem(wx + www, wy, ww, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setStatusWindow(this._statusWindow);
        this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this._slotWindow.setItemWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
        this._paramWindow = new Window_EquipParam(0, wy, www, wh);
        this.addWindow(this._paramWindow);
    };
    var Window_EquipParam = /** @class */ (function (_super) {
        __extends(Window_EquipParam, _super);
        function Window_EquipParam() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_EquipParam.prototype.refresh = function () {
            this._windowContentsSprite.destroyAndRemoveChildren();
            this.contents.clear();
            var a = this._actor;
            if (!a) {
                return;
            }
            this.drawActorName(this._actor, this.textPadding(), 4);
            this.drawActorHp(this._actor, this.textPadding() + 180, 4, 160);
            //this.drawActorMp(this._actor, this.textPadding() + 100 + 170, 4, 80);
            var params = a.params;
            var skillParams = a.skillParams;
            var equipParams = a.equipParams();
            var x = 124;
            var y = 46;
            this.drawP(x, y, TextManager.str, 0, params.str + skillParams.str, equipParams.str);
            this.drawP(x, y, TextManager.mgc, 1, params.mgc + skillParams.mgc, equipParams.mgc);
            this.drawP(x, y, TextManager.vit, 2, params.vit + skillParams.vit, equipParams.vit);
            this.drawP(x, y, TextManager.mnd, 3, params.mnd + skillParams.mnd, equipParams.mnd);
            this.drawP(x, y, TextManager.agi, 4, params.agi + skillParams.agi, equipParams.agi);
            this.drawP(x, y, TextManager.luk, 5, params.luk + skillParams.luk, equipParams.luk);
            /*if (a.isMercenary()) {
                var max = $gameSystem.maxCost || 8;
                this.drawCost(x, y, TextManager.cost, 6, params.luk + skillParams.luk, equipParams.cost_, max);
            }*/
        };
        Window_EquipParam.prototype.setActor = function (actor) {
            this._actor = actor;
            this.refresh();
        };
        return Window_EquipParam;
    }(Window_Base));
    Saba.Window_EquipParam = Window_EquipParam;
    Window_Base.prototype.drawCost = function (x, y, name, index, value, equipP, max) {
        var base = 10;
        this.changeTextColor(this.systemColor());
        this.drawText(name, x - 120, y - 5 + index * 31 + base, 70);
        var total = value + equipP;
        if (this._actor.isMercenary()) {
            value = equipP;
            equipP = 0;
        }
        /*var valueStr1 = Math.floor(total / 10);
        var valueStr2 = total % 10;
        if (valueStr1 > 0) {
            this.drawText(valueStr1, 125, 494 + index * 31 + base, 40, 'center');
        }
        this.drawText(valueStr2, 140, 494 + index * 31 + base, 40, 'center');*/
        this.drawNumber(total, x - 50, y - 5 + index * 31 + base, 48, 'right', 3);
        var tex1 = this.getTex1();
        var tex2 = this.getTex2();
        var tex3 = this.getTex3();
        for (var i = 1; i <= max; i++) {
            var s;
            if (i > total) {
                s = new PIXI.Sprite(tex3);
            }
            else if (i > value) {
                s = new PIXI.Sprite(tex2);
            }
            else {
                s = new PIXI.Sprite(tex1);
            }
            s.x = x + i * 6;
            s.y = y + index * 31 + base;
            this._windowContentsSprite.addChild(s);
        }
    };
    Scene_Equip.prototype.refreshActor = function () {
        var actor = this.actor();
        this._statusWindow.setActor(actor);
        this._slotWindow.setActor(actor);
        this._itemWindow.setActor(actor);
        this._paramWindow.setActor(actor);
    };
    Window_EquipSlot.prototype.drawItem = function (index) {
        if (this._actor) {
            var rect = this.itemRectForText(index);
            this.changeTextColor(this.systemColor());
            this.changePaintOpacity(this.isEnabled(index));
            this.drawText(this.slotName(index), rect.x, rect.y, 138, this.lineHeight());
            this.drawItemName(this._actor.equips()[index], rect.x + 138, rect.y);
            this.changePaintOpacity(true);
        }
    };
    Window_EquipSlot.prototype.slotName = function (index) {
        if (index == 0) {
            return '武器１';
        }
        if (index == 1) {
            return '武器２';
        }
        var slots = this._actor.equipSlots();
        return this._actor ? $dataSystem.equipTypes[slots[index]] : '';
    };
    var _Window_EquipSlot_prototype_setActor = Window_EquipSlot.prototype.setActor;
    Window_EquipSlot.prototype.setActor = function (actor) {
        _Window_EquipSlot_prototype_setActor.call(this, actor);
        this.updateHelp();
    };
    Window_EquipSlot.prototype.isEnabled = function (index) {
        if (index <= 3) {
            return true;
        }
        return index - 4 < 4;
    };
    var _Window_EquipItem_prototype_isEnabled = Window_EquipItem.prototype.isEnabled;
    Window_EquipItem.prototype.isEnabled = function (index) {
        if ($gameSwitches.value(1)) {
            return false;
        }
        return _Window_EquipItem_prototype_isEnabled.call(this, index);
    };
    var _Window_EquipItem_prototype_setHelpWindowItem = Window_EquipItem.prototype.setHelpWindowItem;
    Window_EquipItem.prototype.setHelpWindowItem = function (item) {
        if ($gameSwitches.value(1)) {
            if (item && !item.meta['actor']) {
                this._helpWindow.setText('\\C[18]冒険中は装備の変更ができません');
                return;
            }
        }
        _Window_EquipItem_prototype_setHelpWindowItem.call(this, item);
    };
    var _Window_EquipSlot_prototype_updateHelp = Window_EquipSlot.prototype.updateHelp;
    Window_EquipSlot.prototype.updateHelp = function () {
        if (this.item() == null) {
            switch (this.index()) {
                case 0:
                    this._helpWindow.setText('回数制限のない武器です。\n力が高いほど攻撃力も上がります。');
                    break;
                case 2:
                    this._helpWindow.setText('弾を使って攻撃する武器です。\n誰が使っても同じ攻撃力になるのが特長です。');
                    break;
                case 1:
                    this._helpWindow.setText('ここに装備した武器では能動的に攻撃ができませんが、\n追撃が発生した時にこの武器で攻撃することができます。');
                    break;
                case 3:
                    this._helpWindow.setText('主に防御力があがる装備です。\nスロットがついているものは、スロット数だけ勲章を装備できます。');
                    break;
                default:
                    this._helpWindow.setText('勲章をセットできます。\n');
                    break;
            }
            return;
        }
        _Window_EquipSlot_prototype_updateHelp.call(this);
    };
    Scene_Equip.prototype.onActorChange = function () {
        this.refreshActor();
        this._slotWindow.activate();
    };
    Window_Base.prototype.drawItemName = function (item, x, y, width) {
        width = width || 312;
        if (item) {
            var iconBoxWidth = this.lineHeight();
            var padding = (iconBoxWidth - Window_Base._iconWidth) / 2;
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + padding, y + padding);
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        }
    };
    Window_Base.prototype.drawWeaponName = function (weapon, x, y, width) {
        width = width || 312;
        if (weapon) {
            var iconBoxWidth = this.lineHeight();
            var padding = (iconBoxWidth - Window_Base._iconWidth) / 2;
            this.resetTextColor();
            this.drawIcon(weapon.iconIndex, x + padding, y + padding);
            this.drawText(weapon.name, x + iconBoxWidth, y, width - iconBoxWidth);
            var s = getLevelSprite(parseInt(weapon.meta['LV']));
            s.x = x;
            s.y = y;
            s.alpha = this.contents.paintOpacity / 255.0;
            this._windowContentsSprite.addChild(s);
        }
    };
    var _Window_Base_prototype_drawItemName = Window_Base.prototype.drawItemName;
    Window_Base.prototype.drawItemName = function (item, x, y, width) {
        _Window_Base_prototype_drawItemName.call(this, item, x, y, width);
        if (item) {
            var s;
            if (item.meta['iconPlus']) {
                s = getIconSprite2(1, item.meta['iconPlus']);
            }
            else if (item.meta['skillLv']) {
                var lv = parseInt(item.meta['skillLv']);
                s = getLevelSprite(lv);
                y += 10;
            }
            else if (item.meta['actor']) {
                var actor2 = $gameActors.actor(parseInt(item.meta['actor']));
                s = getLevelSprite(actor2.level);
                y += 10;
            }
            else if (item.meta['lv']) {
                s = getLevelSprite(parseInt(item.meta['lv']));
                y += 10;
            }
            else if (item.params && item.params[0] > 0) {
                var hp = item.params[0];
                var vit = parseInt(item.meta['vit']);
                if (vit > 0) {
                    hp += vit * Saba.HP_PER_VIT;
                }
                if (hp <= 10) {
                    s = getIconSprite2(4, hp);
                }
                else {
                    s = getIconSprite2(16, hp - 10);
                }
            }
            else if (item.meta['str']) {
                s = getIconSprite2(2, item.meta['str']);
            }
            else if (item.meta['dex']) {
                s = getIconSprite2(3, item.meta['dex']);
            }
            else if (item.meta['luk']) {
                s = getIconSprite2(5, item.meta['luk']);
            }
            else if (item.meta['expUp']) {
                s = getIconSprite2(6, item.meta['expUp']);
            }
            else if (item.meta['startItem']) {
                s = getIconSprite2(7, '1');
            }
            else if (item.meta['vit']) {
                s = getIconSprite2(8, item.meta['vit']);
            }
            else if (item.traits) {
                for (var _i = 0, _a = item.traits; _i < _a.length; _i++) {
                    var trail = _a[_i];
                    if (trail.code == 22 && trail.dataId == 0) {
                        //text += '\\C[2]' + TextManager.hit + '\\C[0] +' + (trail.value * 100) + '% ';
                    }
                    if (trail.code == 22 && trail.dataId == 2) {
                        s = getIconSprite2(9, Math.floor(trail.value * 100));
                    }
                }
            }
            else if (item.meta['goldUp']) {
                s = getIconSprite2(10, item.meta['goldUp']);
            }
            else if (item.meta['agi']) {
                s = getIconSprite2(11, item.meta['agi']);
            }
            else if (item.meta['drop']) {
                s = getIconSprite2(12, item.meta['drop']);
            }
            else if (item.meta['rare']) {
                s = getIconSprite2(13, item.meta['rare']);
            }
            if (s) {
                s.x = x - 2;
                s.y = y - 4;
                this._windowContentsSprite.addChild(s);
            }
        }
    };
    /**
     *
     * @param type 1=plus 2=
     * @param plus
     */
    function getIconSprite2(type, plus) {
        var plusNum = parseInt(plus);
        var baseTexture = Saba.getSystemBaseTexture('icon_mark');
        var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(40 * (plusNum - 1), type * 40, 40, 40));
        return new PIXI.Sprite(texture);
    }
    Saba.getIconSprite2 = getIconSprite2;
    function getLevelSprite(level) {
        if (level == 0) {
            level = 1;
        }
        var baseTexture = Saba.getSystemBaseTexture('icon_mark');
        var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(48 * (level - 1), 0, 48, 48));
        return new PIXI.Sprite(texture);
    }
    Saba.getLevelSprite = getLevelSprite;
    function getHpSprite(hp) {
        var baseTexture = Saba.getSystemBaseTexture('icon_mark');
        var yy = Math.floor(hp / 10);
        var xx = (hp % 10);
        var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(40 * xx, 40 * (21 + yy), 48, 48));
        return new PIXI.Sprite(texture);
    }
    Saba.getHpSprite = getHpSprite;
    Window_EquipStatus.prototype.numVisibleRows = function () {
        return 9;
    };
    Window_EquipStatus.prototype.refresh = function () {
        this.contents.clear();
        if (this._actor) {
            var paramIds = [2, 8, 9, 10, 11, 12];
            //this.drawActorName(this._actor, this.textPadding(), 0);
            for (var i = 0; i < paramIds.length; i++) {
                this.drawItem(0, this.lineHeight() * (0 + i), paramIds[i]);
            }
        }
    };
    Window_EquipStatus.prototype.drawCurrentParam = function (x, y, paramId) {
        this.resetTextColor();
        this.drawText(this._actor.getStatusParam(paramId), x, y, 48, 'right');
    };
    Window_EquipStatus.prototype.drawNewParam = function (x, y, paramId) {
        var newValue = this._tempActor.getStatusParam(paramId);
        var diffvalue = newValue - this._actor.getStatusParam(paramId);
        this.changeTextColor(this.paramchangeTextColor(diffvalue));
        this.drawText(newValue, x, y, 48, 'right');
    };
    Window_EquipItem.prototype.updateHelp = function () {
        Window_ItemList.prototype.updateHelp.call(this);
        if (this._actor && this._statusWindow) {
            var actor = JsonEx.makeDeepCopy(this._actor);
            var item = this.item();
            if (item && item.weapon) {
                item = item.weapon;
            }
            var index = this._slotId;
            actor.forceChangeEquip(index, item);
            actor.recoverAll();
            this._statusWindow.setTempActor(actor);
        }
    };
    Scene_Equip.prototype.onItemOk = function () {
        SoundManager.playEquip();
        var index = this._slotWindow.index();
        this.actor().changeEquip(index, this._itemWindow.item());
        this._slotWindow.activate();
        this._slotWindow.refresh();
        this._itemWindow.deselect();
        this._itemWindow.refresh();
        this._statusWindow.refresh();
        this._paramWindow.refresh();
    };
    Game_Actor.prototype.weapon = function () {
        return this.weapons()[0];
    };
    Game_Actor.prototype.getStatusParam = function (paramId) {
        if (this.isEmptyMercenary()) {
            return 0;
        }
        switch (paramId) {
            case 0:
                {
                    return this.mhp;
                }
            case 2:
                {
                    var n = 0;
                    n += this.atk2();
                    return n;
                }
            case 3:
                {
                    return this.def2();
                }
            case 4:
                {
                    if (!this.weapon()) {
                        return 0;
                    }
                    return this.atk2(this.weapon());
                }
            case 5:
                {
                    return 0;
                }
            case 8:
                return this.def2();
            case 9:
                return this.mat2();
            case 10:
                return this.mdf2();
            case 11:
                return Math.floor(this.hit2() * 100);
            case 12:
                return Math.floor(this.eva * 100);
        }
        return 0;
    };
    Window_ItemList.prototype.drawItem = function (index) {
        var item = this._data[index];
        if (item) {
            var numberWidth = this.numberWidth();
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(item));
            if (item.atypeId == 1) {
                this.drawWeaponName(item, rect.x, rect.y, rect.width);
            }
            else if ((item.atypeId && item.id > 500)) {
                this.drawItemName(item, rect.x, rect.y, rect.width);
            }
            else {
                this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
                this.drawItemNumber(item, rect.x, rect.y, rect.width);
            }
            this.changePaintOpacity(1);
        }
    };
    /*
        var _Game_Actor_prototype_releaseUnequippableItems = Game_Actor.prototype.releaseUnequippableItems;
        Game_Actor.prototype.releaseUnequippableItems = function (forcing) {
            _Game_Actor_prototype_releaseUnequippableItems.call(this, forcing);
            var num = this.slotNum();
            var equips = this.equips();
            
            var minSlot = 4;
            if (num < 4 && this._equips[minSlot + 3].object()) {
                if (!forcing) {
                    this.tradeItemWithParty(null, equips[minSlot + 3]);
                }
                this._equips[minSlot + 3].setObject(null);
            }
            if (num < 3 && this._equips[minSlot + 2].object()) {
                if (!forcing) {
                    this.tradeItemWithParty(null, equips[minSlot + 2]);
                }
                this._equips[minSlot + 2].setObject(null);
            }
            if (num < 2 && this._equips[minSlot + 1].object()) {
                if (!forcing) {
                    this.tradeItemWithParty(null, equips[minSlot + 1]);
                }
                this._equips[minSlot + 1].setObject(null);
            }
            if (num < 1 && this._equips[minSlot].object()) {
                if (!forcing) {
                    this.tradeItemWithParty(null, equips[minSlot]);
                }
                this._equips[minSlot].setObject(null);
            }
        };*/
})(Saba || (Saba = {}));

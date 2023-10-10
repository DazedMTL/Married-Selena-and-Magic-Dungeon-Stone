var Saba;
(function (Saba) {
    Game_System.prototype.addShopItem = function (etype, id) {
        this.shopItems = this.shopItems || [];
        this.shopItems.push([etype, id, 0]);
    };
    Game_System.prototype.removeShopItem = function (etype, id) {
        this.shopItems = this.shopItems || [];
        var index = -1;
        for (var i = 0; i < this.shopItems.length; i++) {
            var item = this.shopItems[i];
            if (item[0] == etype && item[1] == id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.shopItems.splice(index, 1);
        }
    };
    function getArmorPrice(armor) {
        var base = 0;
        switch (parseInt(armor.meta['LV'])) {
            case 1:
                base = 50;
                break;
            case 2:
                base = 150;
                break;
            case 3:
                base = 300;
                break;
        }
        switch (parseInt(armor.meta['slot'])) {
            case 1:
                base *= 1.5;
                break;
            case 2:
                base *= 2.5;
                break;
            case 3:
                base *= 3.5;
                break;
            case 4:
                base *= 5.5;
                break;
        }
        return Math.floor(base);
    }
    Scene_Shop.prototype.doBuy = function (number) {
        $gameParty.loseGold(number * this.buyingPrice());
        $gameParty.gainItem(this._item, number);
        $gameSystem.removeShopItem(this._item.etypeId || 0, this._item.id);
    };
    Window_ShopBuy.prototype.makeItemList = function () {
        this._data = [];
        this._price = [];
        var items = $gameSystem.shopItems || [];
        items.forEach(function (goods) {
            var item = null;
            switch (goods[0]) {
                case 0:
                    item = $dataItems[goods[1]];
                    break;
                case 1:
                    item = $dataWeapons[goods[1]];
                    break;
                case 3:
                    item = $dataArmors[goods[1]];
                    item.price = getArmorPrice(item);
                    break;
            }
            if (item) {
                this._data.push(item);
                this._price.push(goods[2] === 0 ? item.price : goods[3]);
            }
        }, this);
    };
    Window_ShopStatus.prototype.refresh = function () {
        this.contents.clear();
        if (this._item) {
            var x = this.textPadding();
            //this.drawPossession(x, 0);
            if (this.isEquipItem()) {
                this.drawEquipInfo(x, this.lineHeight() * 1);
            }
        }
    };
    Window_ShopBuy.prototype.updateHelp = function () {
        var item = this.item();
        this.setHelpWindowItem(item);
        if (this._statusWindow) {
            this._statusWindow.setItem(this.item());
        }
    };
    Window_ShopStatus.prototype.drawActorEquipInfo = function (x, y, actor) {
        var enabled = actor.canEquip(this._item);
        this.changePaintOpacity(enabled);
        this.resetTextColor();
        this.drawText(actor.name(), x, y, 168);
        if (this._item.etypeId === 1) {
            var gun = actor.weapon2();
            if (enabled) {
                this.drawActorParamChange2(x, y, actor, gun);
            }
            if (gun) {
                this.drawItemName(gun.obj(), x, y + this.lineHeight());
            }
        }
        else {
            var item1 = this.currentEquippedItem(actor, this._item.etypeId);
            if (enabled) {
                this.drawActorParamChange3(x, y, actor, item1);
            }
            this.drawItemName(item1, x, y + this.lineHeight());
        }
        this.changePaintOpacity(true);
    };
    Window_ShopStatus.prototype.drawActorParamChange3 = function (x, y, actor, item1) {
        var width = this.contents.width - this.textPadding() - x;
        var paramId = this.paramId();
        var change = this._item.params[paramId] - (item1 ? item1.params[paramId] : 0);
        this.changeTextColor(this.systemColor());
        this.drawText('防御力', x + 280, y, 140, 'left');
        this.changeTextColor(this.paramchangeTextColor(change));
        this.drawText((change > 0 ? '+' : ' ') + change, x, y, width, 'right');
    };
    Window_ShopStatus.prototype.drawActorParamChange2 = function (x, y, actor, gun) {
        var width = this.contents.width - this.textPadding() - x;
        var paramId = this.paramId();
        var actor2 = new Game_Actor(10);
        var action = new Game_Action(actor2);
        action.setSkill(this._item.meta['skill']);
        var value1 = Math.floor(action.makeDamageValue(actor2, false, false));
        var value2 = 0;
        if (gun) {
            var action = new Game_Action(actor2);
            action.setSkill(gun.obj().meta['skill']);
            value2 = Math.floor(action.makeDamageValue(actor2, false, false));
        }
        var change = value1 - value2;
        this.changeTextColor(this.systemColor());
        this.drawText('基礎ダメージ', x + 280, y, 140, 'left');
        this.changeTextColor(this.paramchangeTextColor(change));
        this.drawText((change > 0 ? '+' : ' ') + change, x, y, width, 'right');
        y += 32;
        this.changeTextColor(this.systemColor());
        this.drawText('命中', x + 280, y, width, 'left');
        var obj = $dataWeapons[this._item.id];
        change = value1 - value2;
        this.changeTextColor(this.paramchangeTextColor(change));
        this.drawText((change > 0 ? '+' : ' ') + change, x, y, width, 'right');
    };
    Window_ShopCommand.prototype.maxCols = function () {
        return 2;
    };
    Window_ShopCommand.prototype.makeCommandList = function () {
        this.addCommand(TextManager.buy, 'buy');
        this.addCommand(TextManager.cancel, 'cancel');
    };
    var _Scene_Shop_prototype_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function () {
        _Scene_Shop_prototype_create.call(this);
        this.createConfirmWindow();
    };
    Scene_Shop.prototype.createConfirmWindow = function () {
        this._confirmWindow = new Saba.Window_Confirm(300);
        this._confirmWindow.setText('購入しますか？');
        this._confirmWindow.setHandler('ok', this.onConfirmOk.bind(this));
        this._confirmWindow.setHandler('cancel', this.onCancel.bind(this));
        this._confirmWindow.deactivate();
        this.addWindow(this._confirmWindow);
        this._confirmWindow.hide();
    };
    Scene_Shop.prototype.onConfirmOk = function () {
        this.onNumberOk();
        this._confirmWindow.hide();
        this._confirmWindow.deactivate();
    };
    Scene_Shop.prototype.onCancel = function () {
        this.onNumberCancel();
        this._confirmWindow.hide();
        this._confirmWindow.deactivate();
    };
    Scene_Shop.prototype.onBuyOk = function () {
        this._item = this._buyWindow.item();
        this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
        this._numberWindow.setCurrencyUnit(this.currencyUnit());
        this._confirmWindow.show();
        this._confirmWindow.activate();
    };
})(Saba || (Saba = {}));

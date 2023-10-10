var Saba;
(function (Saba) {
    Window_ItemCategory.prototype.makeCommandList = function () {
        this.addCommand(TextManager.item, 'item');
        this.addCommand(TextManager.material, 'material');
    };
    Window_BattleLog.prototype.displayActionResults = function (subject, target) {
        if (target.result().used) {
            this.push('pushBaseLine');
            this.displayCritical(target);
            this.push('popupDamage', target);
            this.push('popupDamage', subject);
            this.displayDamage(target);
            this.displayAffectedStatus(target);
            if (this.displayFailure(target, subject)) {
                return;
            }
            this.push('waitForNewLine');
            this.push('popBaseLine');
        }
    };
    Window_ItemList.prototype.includes = function (item) {
        switch (this._category) {
            case 'item':
                return DataManager.isItem(item) && item.itypeId === 1;
            case 'material':
                return DataManager.isItem(item) && item.itypeId === 3;
            case 'weapon':
                return DataManager.isWeapon(item);
            case 'armor':
                return DataManager.isArmor(item);
            case 'keyItem':
                return DataManager.isItem(item) && item.itypeId === 2;
            default:
                return false;
        }
    };
    Window_ItemList.prototype.makeItemList = function () {
        this._data = $gameParty.allItems().filter(function (item) {
            return this.includes(item);
        }, this);
        this._data = this._data.sort(function (a, b) {
            if (a && b) {
                var id1 = a.id;
                var id2 = b.id;
                if (a.meta['order']) {
                    id1 = parseInt(a.meta['order']);
                }
                if (b.meta['order']) {
                    id2 = parseInt(b.meta['order']);
                }
                return id1 - id2;
            }
            if (a) {
                return -1;
            }
            else {
                return 1;
            }
        });
        if (this.includes(null)) {
            this._data.push(null);
        }
    };
    Window_BattleLog.prototype.displayFailure = function (target, subject) {
        if (target.result().isHit() && !target.result().success) {
            if (subject == target) {
                return;
            }
            if (target.isActor() && subject.isActor()) {
                return true;
            }
            this.push('addText', TextManager.actionFailure.format(target.name()));
        }
        return false;
    };
    BattleManager.processDefeat = function () {
        //this.displayDefeatMessage();
        this.playDefeatMe();
        for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
            var actor = _a[_i];
            actor.addState(1);
        }
        this._canLose = true;
        if (this._canLose) {
            this.replayBgmAndBgs();
        }
        else {
            AudioManager.stopBgm();
        }
        this.endBattle(2);
        $gameTemp.reserveCommonEvent(87);
    };
})(Saba || (Saba = {}));

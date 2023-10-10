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
    function hasMercenary(id) {
        return $gameParty.hasItem($dataArmors[id], true);
    }
    Saba.hasMercenary = hasMercenary;
    var Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        if (command == 'mercenary2') {
            $gameSwitches.setValue(20, false);
            $gameVariables.setValue(17, 0);
            $gameVariables.setValue(81, 0);
            $gameTemp.mercenaryId = parseInt(args[0]);
            var sid;
            if (hasMercenary($gameTemp.mercenaryId)) {
                var ero = $gameSystem.getEro(1);
                if (!canHire2($gameTemp.mercenaryId)) {
                    sid = 'm' + $gameTemp.mercenaryId + '_Hできない時';
                    if ($gameSystem.getEro(1).bote) {
                        if (Saba.isTaneoya(1, $gameTemp.mercenaryId)) {
                            sid = 'm' + $gameTemp.mercenaryId + '_Hできない時_自分bote';
                        }
                        else {
                            sid = 'm' + $gameTemp.mercenaryId + '_Hできない時_他人bote';
                        }
                    }
                    if (!$dataScenario[sid]) {
                        sid = 'm' + $gameTemp.mercenaryId + '_Hできない時';
                    }
                    this.pluginCommand('Scenario', [sid]);
                    $gameSwitches.setValue(20, true);
                }
                else if (ero.bote) {
                    if ($gameSystem.isEndEvent('m' + $gameTemp.mercenaryId + '_妊娠1_H中')) {
                        sid = 'm' + $gameTemp.mercenaryId + '_妊娠2_確認';
                    }
                    else {
                        sid = 'm' + $gameTemp.mercenaryId + '_妊娠1_確認';
                    }
                    if (Saba.isTaneoya(1, $gameTemp.mercenaryId)) {
                        $gameSwitches.setValue(25, true);
                    }
                    else {
                        $gameSwitches.setValue(25, false);
                    }
                    this.pluginCommand('Scenario', [sid]);
                }
                else {
                    sid = 'm' + $gameTemp.mercenaryId + '_2_確認';
                    if (!$dataScenario[sid]) {
                        sid = 'm' + $gameTemp.mercenaryId + '_Hできない時';
                        if (!$dataScenario[sid]) {
                            this.pluginCommand('Scenario', ['m' + $gameTemp.mercenaryId + '_1_H後']);
                        }
                        else {
                            this.pluginCommand('Scenario', [sid]);
                        }
                        $gameSwitches.setValue(20, true);
                        return;
                    }
                    this.pluginCommand('Scenario', ['m' + $gameTemp.mercenaryId + '_2_確認']);
                }
                return;
            }
            if (!canHire($gameTemp.mercenaryId)) {
                p('この冒険者を雇えません');
                if ($gameSystem.getEro(1).bote) {
                    var sid = 'ボテ中で雇えない';
                    this.pluginCommand('Scenario', [sid]);
                    return;
                }
                var sid = 'm' + $gameTemp.mercenaryId + '_雇えない時';
                if (!$dataScenario[sid]) {
                    sid = 'm' + $gameTemp.mercenaryId + '_雇える時';
                }
                this.pluginCommand('Scenario', [sid]);
                return;
            }
            this.pluginCommand('Scenario', ['m' + $gameTemp.mercenaryId + '_雇える時']);
            return;
        }
        if (command == 'mercenary') {
            if ($gameSwitches.value(5) && $gameSwitches.value(235)) {
                p('夜なのでないので雇えません');
                $gameVariables.setValue(81, 0);
                return;
            }
            if ($gameSwitches.value(20)) {
                p('雇うのをキャンセルしました');
                return;
            }
            if (hasMercenary($gameTemp.mercenaryId)) {
                p('すでに雇っています');
                return;
            }
            if (!canHire($gameTemp.mercenaryId)) {
                p('この冒険者を雇えません');
                $gameVariables.setValue(81, 0);
                return;
            }
            $gameTemp.mercenaryId = parseInt(args[0]);
            SceneManager.push(Scene_Mercenary);
            return;
        }
        if (command == 'hireMercenary') {
            if ($gameTemp.mercenaryId == 463) {
                $gameSwitches.setValue(40, true);
            }
            $gameSwitches.setValue($gameTemp.mercenaryId, true);
            var armor = $dataArmors[$gameTemp.mercenaryId];
            $gameParty.gainItem(armor, 1);
            var charaList = SceneManager._scene._spriteset._characterSprites;
            for (var _i = 0, charaList_1 = charaList; _i < charaList_1.length; _i++) {
                var c = charaList_1[_i];
                if (c._merSprite) {
                    c.removeChild(c._merSprite);
                    c._merSprite = null;
                }
            }
            var actorId = 1;
            if ($gameSwitches.value(274)) {
                actorId = 2;
            }
            //p($gameTemp.mercenaryId)
            var actor = $gameActors.actor(parseInt(armor.meta['actor']));
            $gameVariables.setValue(18, $gameVariables.value(18) + 1);
            $gameSystem.getEro(1).lastNinshinRate = $gameSystem.getEro(1).ninshinRate;
            //$gameSystem.getEro(1).sexCount++;
            if (actor.actor().meta['nakadashi_'] > 0) {
                var plus = actor.actor().meta['nakadashi_'];
                Saba.upEroStatus(actorId, [$gameTemp.mercenaryId], null, plus);
            }
            else {
                Saba.upEroStatus(actorId, [$gameTemp.mercenaryId]);
            }
            $gameSwitches.setValue($gameTemp.mercenaryId, true);
            //AudioManager.playSe({ name: 'Chime2', volume: 80, pitch: 100, pan: 0 });
            //$gameMessage.add('「' + armor.name + '」と傭兵の契約を行いました！');
            return;
        }
        if (command === 'Scenario2' || command === 'scenario2') {
            var varId = args[0];
            var id = $gameVariables.value(parseInt(varId)).normalize('NFC');
            var list_1 = $dataScenario[id];
            if (!list_1) {
                throw new Error('id:' + id + ' のデータが見つかりません');
            }
            if (args[1] == 'true') {
                if ($gameSystem.isEndEvent(id)) {
                    return;
                }
                $gameSystem.endEvent(id);
            }
            if (command === 'Scenario2') {
                $gameSystem.endEvent(id);
            }
            console.log("\u30B3\u30DE\u30F3\u30C9\u5B9F\u884C:" + args[0]);
            console.log(id);
            this.setupChild(list_1, this._eventId);
            return;
        }
        Game_Interpreter_prototype_pluginCommand.call(this, command, args);
    };
    function upMercenaryEro2() {
        var armor = $dataArmors[$gameTemp.mercenaryId];
        var actorId = 1;
        var actor = $gameActors.actor(parseInt(armor.meta['actor']));
        $gameSystem.getEro(1).lastNinshinRate = $gameSystem.getEro(1).ninshinRate;
        //$gameSystem.getEro(1).sexCount++;
        if (actor.actor().meta['nakadashi_'] > 0) {
            var plus = actor.actor().meta['nakadashi_'];
            if (Math.random() > 0.6) {
                plus++;
            }
            Saba.upEroStatus(actorId, [$gameTemp.mercenaryId], null, plus);
        }
        else {
            Saba.upEroStatus(actorId, [$gameTemp.mercenaryId]);
        }
    }
    Saba.upMercenaryEro2 = upMercenaryEro2;
    Game_Interpreter.prototype.isInnEvent = function () {
        var id = 'mercenary_' + $gameTemp.mercenaryId + '_inn';
        return $dataScenario[id];
    };
    var Scene_Mercenary = /** @class */ (function (_super) {
        __extends(Scene_Mercenary, _super);
        function Scene_Mercenary() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ;
        Scene_Mercenary.prototype.create = function () {
            this._armor = $dataArmors[$gameTemp.mercenaryId];
            _super.prototype.create.call(this);
            this.createHelpWindow();
            this.createStatusWindow();
            this.createConfirmWindow();
            this._helpWindow.setText(this.helpWindowText());
        };
        Scene_Mercenary.prototype.createConfirmWindow = function () {
            this._confirmWindow = new Saba.Window_Confirm(500);
            this._confirmWindow.setText('この冒険者を雇いますか？');
            this._confirmWindow.setHandler('ok', this.onConfirmOk.bind(this));
            this._confirmWindow.setHandler('cancel', this.onCancel.bind(this));
            this._confirmWindow.deactivate();
            this.addWindow(this._confirmWindow);
            this._confirmWindow.hide();
            this._msgWindow = new Saba.Window_Msg();
            this._msgWindow.setHandler('ok', this.onConfirmCancel.bind(this));
            this._msgWindow.setHandler('cancel', this.onConfirmCancel.bind(this));
            this._msgWindow.deactivate();
            this.addWindow(this._msgWindow);
            this._msgWindow.hide();
        };
        Scene_Mercenary.prototype.createStatusWindow = function () {
            this._statusWindow = new Window_MercenaryStatus(0, this._helpWindow.height, Graphics.width, Graphics.height - this._helpWindow.height, this._armor);
            this.addWindow(this._statusWindow);
            this._statusWindow.activate();
            this._statusWindow.setHandler('ok', this.onOk.bind(this));
            this._statusWindow.setHandler('cancel', this.onCancel.bind(this));
        };
        Scene_Mercenary.prototype.helpWindowText = function () {
            var actor = $gameActors.actor(parseInt(this._armor.meta['actor']));
            return actor.name() + '\n' + actor.profile();
        };
        Scene_Mercenary.prototype.onOk = function () {
            this._statusWindow.deactivate();
            this._confirmWindow.setInfo(true);
            this._confirmWindow.show();
            this._confirmWindow.activate();
        };
        Scene_Mercenary.prototype.onCancel = function () {
            $gameVariables.setValue(81, 0);
            this.popScene();
        };
        Scene_Mercenary.prototype.onConfirmOk = function () {
            var canHire = false;
            /*if (this._armor.price + calcCost() > $gameSystem.calcMaxCost()) {
                this._confirmWindow.hide();

                this._msgWindow.setText(`冒険者のコストがセレナの許容値を上回っているため`, `冒険者を雇用できません`);

                this._msgWindow.show();
                this._msgWindow.activate();
                return;
            }*/
            SoundManager.playOk();
            this._confirmWindow.hide();
            this._confirmWindow.deactivate();
            var eventId = this._armor.id + '';
            eventId = eventId.padZero(3);
            $gameVariables.setValue(81, 'm' + eventId + '_1_H前');
            //$gameTemp.reserveCommonEvent(81);
            this.popScene();
        };
        Scene_Mercenary.prototype.onConfirmCancel = function () {
            this._confirmWindow.hide();
            this._confirmWindow.deactivate();
            this._msgWindow.hide();
            this._msgWindow.activate();
            this._statusWindow.activate();
        };
        return Scene_Mercenary;
    }(Scene_MenuBase));
    var Window_MercenaryStatus = /** @class */ (function (_super) {
        __extends(Window_MercenaryStatus, _super);
        function Window_MercenaryStatus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_MercenaryStatus.prototype.initialize = function (x, y, width, height, armor, shortVer) {
            _super.prototype.initialize.call(this, x, y, width, height);
            this._shortVer = shortVer;
            this.setArmor(armor);
        };
        Window_MercenaryStatus.prototype.itemRect = function (index) {
            var rect = new Rectangle();
            var maxCols = this.maxCols();
            rect.width = 178;
            rect.height = 56;
            rect.x = index % maxCols * (rect.width - 4) + 448;
            rect.y = Math.floor(index / maxCols) * rect.height + 176;
            return rect;
        };
        Window_MercenaryStatus.prototype.maxCols = function () {
            return 3;
        };
        Window_MercenaryStatus.prototype.helpWindowText = function () {
            var index = this.index();
            if (index < 0) {
                return '';
            }
            var rowData = MERCENARY_MAP[this._armor.id];
            var data = rowData[12 + index];
            p(ERO_SKILL_MAP[data]);
            if (data) {
                return ERO_SKILL_MAP[data][16] || 'テキスト未設定';
            }
            else {
                return 'null';
            }
        };
        Window_MercenaryStatus.prototype.maxItems = function () {
            if (!this._armor) {
                return 0;
            }
            var rowData = MERCENARY_MAP[this._armor.id];
            var lineIndex = 0;
            for (var i = 12; i < 15; i++) {
                var data = rowData[i];
                if (data) {
                    var index = ERO_SKILL_LIST.indexOf(data);
                    if (index >= 0) {
                        lineIndex++;
                    }
                }
            }
            return lineIndex;
        };
        Window_MercenaryStatus.prototype.setArmor = function (armor) {
            this._armor = armor;
            this.refresh();
        };
        Window_MercenaryStatus.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
            this._windowContentsSprite.destroyAndRemoveChildren();
            if (!this._armor) {
                return;
            }
            var lineHeight = 36;
            var y = 0;
            this.changeTextColor(this.systemColor());
            var actor = $gameActors.actor(parseInt(this._armor.meta['actor']));
            p(actor);
            p(this._armor.meta['actor']);
            //this.drawStatusAlphabet(actor, '成長性', '成長性_', 0, lineHeight);
            if (!this._shortVer) {
                this.drawStatus('ＬＶ', actor.level, y, lineHeight, true);
                y += lineHeight;
                this.drawStatusAlphabet(actor, '力', 'str_', 0, lineHeight);
                this.drawStatusAlphabet(actor, '魔力', 'mgc_', 1, lineHeight);
                this.drawStatusAlphabet(actor, '体力', 'vit_', 2, lineHeight);
                this.drawStatusAlphabet(actor, '精神力', 'mnd_', 3, lineHeight);
                this.drawStatusAlphabet(actor, '速さ', 'agi_', 4, lineHeight);
                this.drawStatusAlphabet(actor, '運', 'luk_', 5, lineHeight);
            }
            var xx = 100;
            if (this._shortVer) {
                y += lineHeight;
                xx = 50;
            }
            y = 0;
            this.changeTextColor(this.systemColor());
            var skills = actor.skills();
            var passive = skills[0];
            if (passive && !this._shortVer) {
                var xx = 230;
                this.contents.drawText('スキル', xx + 20, y, 200, lineHeight, 'left');
                y += lineHeight;
                y += 4;
                var passiveData = passive;
                this.changeTextColor(this.normalColor());
                this.contents.drawText(passiveData.name, xx + 55, y, 200, lineHeight, 'left');
                if (passive.successRate < 100) {
                    this.contents.drawText('(発動率:' + passive.successRate + '％)', xx + 280, y, 200, lineHeight, 'left');
                }
                this.drawIcon(passiveData.iconIndex, xx + 20, y + 2);
                y += lineHeight;
                this.contents.drawText(passiveData.description, xx + 55, y, 500, lineHeight, 'left');
                y += lineHeight;
                y += lineHeight;
            }
            else {
                y = 200;
            }
            this.changeTextColor(this.systemColor());
            this.contents.drawText('エロ能力', xx + 20, y - 10, 200, lineHeight, 'left');
            this.changeTextColor(this.normalColor());
            var rowData = MERCENARY_MAP[this._armor.id];
            var lineIndex = 0;
            for (var i = 12; i < 15; i++) {
                var data = rowData[i];
                if (data) {
                    var index = ERO_SKILL_LIST.indexOf(data);
                    if (index >= 0) {
                        this.drawEroSkill(actor, index, lineIndex, lineHeight, data);
                        lineIndex++;
                    }
                }
            }
        };
        Window_MercenaryStatus.prototype.drawEroSkill = function (actor, skillIndex, index, lineHeight, data) {
            var x = 250;
            var y = 178 + index * 52 * 2;
            if (this._shortVer) {
                var x = 450 + (index % 3) * 174;
                var y = 178 + Math.floor(index / 3) * 52 * 2;
                y -= 148;
            }
            var baseTexture = Saba.getSystemBaseTexture('skill_bg');
            var sprite = new PIXI.Sprite(new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 0, 174, 60)));
            sprite.x = x;
            sprite.y = y;
            this._windowContentsSprite.addChild(sprite);
            var sprite2 = new PIXI.Sprite(new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 60 + 30 * skillIndex, 170, 30)));
            sprite2.x = x;
            sprite2.y = y + 10;
            this._windowContentsSprite.addChild(sprite2);
            if (!this._shortVer) {
                var des = ERO_SKILL_MAP[data];
                this.drawText(des[16], x, y + 52, 650);
            }
        };
        Window_MercenaryStatus.prototype.drawStatusAlphabet = function (actor, name, param, index, lineHeight) {
            var str = parseInt(actor.actor().meta[param]);
            this.changeTextColor(this.systemColor());
            var y = 36 + lineHeight * index;
            this.contents.drawText(name, 20, y, 200, lineHeight, 'left');
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
            this.drawAlphabet(n, 140, y + 2);
        };
        Window_MercenaryStatus.prototype.drawEroCount = function (actor, xx, name, label, index, lineHeight) {
            this.changeTextColor(this.systemColor());
            var y = lineHeight * index;
            var ero = $gameSystem.getEro(this._armor.id);
            this.contents.drawText(name, xx + 20, y, 130, lineHeight, 'left');
            this.changeTextColor(this.normalColor());
            var value = ero[label] || 0;
            this.contents.drawText(value, xx + 50, y, 150, lineHeight, 'right');
        };
        Window_MercenaryStatus.prototype.drawStatus = function (name, param, y, lineHeight, noPlus) {
            if (noPlus === void 0) { noPlus = false; }
            this.changeTextColor(this.systemColor());
            this.contents.drawText(name, 20, y, 200, lineHeight, 'left');
            this.changeTextColor(this.normalColor());
            this.contents.drawText('  ' + param, 50, y, 110, lineHeight, 'right');
        };
        Window_MercenaryStatus.prototype.drawSkill = function (skill, y, lineHeight) {
            this.changeTextColor(this.normalColor());
            this.contents.drawText(skill.name, 380, y, 200, lineHeight, 'left');
        };
        Window_MercenaryStatus.prototype.getPriceStr = function (price) {
            if (price < 10) {
                return '  ' + price;
            }
            else if (price < 100) {
                return ' ' + price;
            }
            else {
                return price + '';
            }
        };
        Window_MercenaryStatus.prototype.hitTest = function (x, y) {
            if (this.isContentsArea(x, y)) {
                var cx = x - this.padding;
                var cy = y - this.padding;
                this.callHandler('ok');
            }
            return -1;
        };
        ;
        return Window_MercenaryStatus;
    }(Window_Selectable));
    Saba.Window_MercenaryStatus = Window_MercenaryStatus;
    var Window_MercenaryStatus2 = /** @class */ (function (_super) {
        __extends(Window_MercenaryStatus2, _super);
        function Window_MercenaryStatus2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_MercenaryStatus2.prototype.refresh = function () {
            if (this.contents) {
                this.contents.clear();
                this.drawAllItems();
            }
            this._windowContentsSprite.destroyAndRemoveChildren();
            if (!this._armor) {
                return;
            }
            var lineHeight = 36;
            var y = 0;
            this.changeTextColor(this.systemColor());
            var actor = $gameActors.actor(parseInt(this._armor.meta['actor']));
            //this.drawStatusAlphabet(actor, '成長性', '成長性_', 0, lineHeight);
            if (!this._shortVer) {
                this.drawStatus('ＬＶ', actor.level, y, lineHeight, true);
                y += lineHeight;
                this.drawStatusAlphabet(actor, '力', 'str_', 0, lineHeight);
                this.drawStatusAlphabet(actor, '魔力', 'mgc_', 1, lineHeight);
                this.drawStatusAlphabet(actor, '体力', 'vit_', 2, lineHeight);
                this.drawStatusAlphabet(actor, '精神力', 'mnd_', 3, lineHeight);
                this.drawStatusAlphabet(actor, '速さ', 'agi_', 4, lineHeight);
                this.drawStatusAlphabet(actor, '運', 'luk_', 5, lineHeight);
            }
            var xx = 200;
            if (this._shortVer) {
                y += lineHeight;
                xx = 50;
            }
            this.changeTextColor(this.systemColor());
            this.contents.drawText('セレナとの関係', xx, y - lineHeight, 200, lineHeight, 'left');
            this.drawEroCount(actor, xx, 'セックス回数', 'sexCount', 1, lineHeight);
            this.drawEroCount(actor, xx, 'アナル回数', 'anal', 2, lineHeight);
            this.drawEroCount(actor, xx, '中出し回数', 'nakadashi', 3, lineHeight);
            this.drawEroCount(actor, xx, '口内射精回数', 'kounaisyasei', 4, lineHeight);
            this.drawEroCount(actor, xx, 'ぶっかけ回数', 'bukkake', 5, lineHeight);
            this.drawEroCount(actor, xx, 'キス回数', 'kiss', 6, lineHeight);
            this.drawEroCount(actor, xx, '孕ませ回数', 'haramase', 7, lineHeight);
            y = 0;
            this.changeTextColor(this.systemColor());
            var skills = actor.skills();
            var passive = skills[0];
            if (passive && !this._shortVer) {
                var xx = 430;
                this.contents.drawText('スキル', xx + 20, y, 200, lineHeight, 'left');
                y += lineHeight;
                y += 4;
                var passiveData = passive;
                this.changeTextColor(this.normalColor());
                this.contents.drawText(passiveData.name, xx + 55, y, 200, lineHeight, 'left');
                if (passive.successRate < 100) {
                    this.contents.drawText('(発動率:' + passive.successRate + '％)', xx + 280, y, 200, lineHeight, 'left');
                }
                this.drawIcon(passiveData.iconIndex, xx + 20, y + 2);
                y += lineHeight;
                this.contents.drawText(passiveData.description, xx + 55, y, 500, lineHeight, 'left');
                y += lineHeight;
                y += lineHeight;
            }
            else {
                y = 200;
            }
            this.changeTextColor(this.systemColor());
            this.contents.drawText('エロ能力', xx + 20, y - 10, 200, lineHeight, 'left');
            /*
            this.contents.drawText('雇用条件', 0, y, 200, lineHeight, 'left');
            this.changeTextColor(this.normalColor());
            var cost = this._armor.meta['cost'] + '';
            this.contents.drawText(cost, 135, y, 500, lineHeight, 'left');
            */
            this.changeTextColor(this.normalColor());
            var rowData = MERCENARY_MAP[this._armor.id];
            var lineIndex = 0;
            for (var i = 12; i < 15; i++) {
                var data = rowData[i];
                if (data) {
                    var index = ERO_SKILL_LIST.indexOf(data);
                    if (index >= 0) {
                        this.drawEroSkill(actor, index, lineIndex, lineHeight, data);
                        lineIndex++;
                    }
                }
            }
        };
        Window_MercenaryStatus2.prototype.drawEroSkill = function (actor, skillIndex, index, lineHeight, data) {
            var x = 450 + (index % 3) * 174;
            var y = 178 + Math.floor(index / 3) * 52 * 2;
            var baseTexture = Saba.getSystemBaseTexture('skill_bg');
            var sprite = new PIXI.Sprite(new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 0, 174, 60)));
            sprite.x = x;
            sprite.y = y;
            this._windowContentsSprite.addChild(sprite);
            var sprite2 = new PIXI.Sprite(new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 60 + 30 * skillIndex, 170, 30)));
            sprite2.x = x;
            sprite2.y = y + 10;
            this._windowContentsSprite.addChild(sprite2);
        };
        return Window_MercenaryStatus2;
    }(Window_MercenaryStatus));
    Saba.Window_MercenaryStatus2 = Window_MercenaryStatus2;
    ;
    var _Game_Actor_prototype_param = Game_Actor.prototype.param;
    Game_Actor.prototype.param = function (id) {
        if (!this.isMercenary()) {
            return _Game_Actor_prototype_param.call(this, id);
        }
        var members = this.getAliveMembers();
        var result = 0;
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var m = members_1[_i];
            var actor = $gameActors.actor(parseInt(m.meta['actor']));
            result += actor.param(id);
        }
        return result + 1;
    };
    var _Game_Actor_prototype_armors = Game_Actor.prototype.armors;
    Game_Actor.prototype.armors = function () {
        if (!this.isMercenary()) {
            return _Game_Actor_prototype_armors.call(this);
        }
        var members = this.getAliveMembers();
        var result = [];
        for (var _i = 0, members_2 = members; _i < members_2.length; _i++) {
            var m = members_2[_i];
            result = result.concat(getMercenaryArmors(m));
        }
        return result;
    };
    var getMercenaryArmors = function (armor) {
        var passive = parseInt(armor.meta['passive']);
        if (isNaN(passive)) {
            return [armor];
        }
        var passiveData = $dataArmors[passive];
        return [passiveData, armor];
    };
    var _Game_Actor_prototype_makeAutoBattleActions = Game_Actor.prototype.makeAutoBattleActions;
    Game_Actor.prototype.makeAutoBattleActions = function () {
        _Game_Actor_prototype_makeAutoBattleActions.call(this);
        if (!this.isMercenary()) {
            return;
        }
        var members = this.getAliveMembers();
        var result = [];
        var armors = this.armors();
        var skillUp = getSkillUp(armors);
        for (var _i = 0, members_3 = members; _i < members_3.length; _i++) {
            var m = members_3[_i];
            result = result.concat(getMercenarySkills(m, skillUp));
        }
        for (var _a = 0, result_1 = result; _a < result_1.length; _a++) {
            var skill = result_1[_a];
            var action = new Game_Action(this);
            action.setSkill(skill.id);
            this._actions.push(action);
        }
    };
    function getSkillUp(armors) {
        var up = 0;
        for (var _i = 0, armors_1 = armors; _i < armors_1.length; _i++) {
            var a = armors_1[_i];
            if (a.meta['skillUp']) {
                up += parseInt(a.meta['skillUp']);
            }
        }
        return up;
    }
    var getMercenarySkills = function (armor, skillUp) {
        var actor = $gameActors.actor(parseInt(armor.meta['actor']));
        var skills = actor.skills();
        for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
            var skill = skills_1[_i];
            if (skill.damage.type > 0) {
                if (skill.successRate > Math.random() * 100) {
                    return [skill];
                }
            }
        }
        return [];
    };
    var _Sprite_Character_prototype_setupBalloon = Sprite_Character.prototype.setupBalloon;
    Sprite_Character.prototype.setupBalloon = function () {
        _Sprite_Character_prototype_setupBalloon.call(this);
        if (this._character.event && !this._merSprite) {
            if (this._character.characterName().length == 0) {
                return;
            }
            var list = this._character.event().name.split('_');
            if (list.length == 2) {
                var merId = parseInt(list[1]);
                var sprite;
                if (!canHire2(merId)) {
                    return;
                }
                else if (hasMercenary(merId)) {
                    sprite = Saba.getSystemImage('mer');
                }
                else {
                    sprite = Saba.getSystemImage('mer2');
                }
                sprite.x = -23;
                sprite.y = -80;
                this.addChild(sprite);
                this._merSprite = sprite;
            }
        }
    };
    function canHire(merId) {
        if ($gameSystem.getEro(1).bote) {
            return false;
        }
        return canHire2(merId);
    }
    Saba.canHire = canHire;
    function canHire2(merId) {
        var data = MERCENARY_MAP[merId];
        if (!data) {
            return false;
        }
        if ($gameSwitches.value(5)) {
            //p('夜ではないので雇えません')
            return false;
        }
        if ($gameSwitches.value(281) && !$gameSwitches.value(284)) {
            //p('ギルドイベントが発生')
            return false;
        }
        if ($gameSwitches.value(566) && !$gameSwitches.value(568)) {
            //p('ギルドイベントが発生')
            return false;
        }
        if ($gameSwitches.value(247) && !$gameSwitches.value(248)) {
            //p('メルに報告が必要')
            return false;
        }
        if ($gameVariables.value(15) > 11) {
            //p('夜ではないので雇えません')
            return false;
        }
        /*if (!$gameSwitches.value(5) && $gameSwitches.value(461)) {
          return false;
        }*/
        if (!$gameSwitches.value(5) && !$gameSwitches.value(461)) {
            return merId == 461;
        }
        if (!$gameSwitches.value(241)) {
            return false;
        }
        var condition = data[11];
        var clearFloor = getFloor();
        var condition2 = getFloorCondition(condition);
        //var nakadashi = getMerNakadashi(condition);
        return clearFloor >= condition2;
    }
    Saba.canHire2 = canHire2;
    function getFloorCondition(condition) {
        switch (condition) {
            case '初期': return 0;
            case 'F': return 1;
            case 'E': return 2;
            case 'D': return 3;
            case 'C': return 4;
            case 'B': return 5;
            case 'A': return 6;
        }
    }
    function getFloor() {
        var n = 0;
        if ($gameSwitches.value(239)) {
            // ロープ取得
            n = 1;
        }
        if ($gameSwitches.value(261)) {
            n = 2;
        }
        if ($gameSwitches.value(262)) {
            n = 3;
        }
        if ($gameSwitches.value(263)) {
            n = 4;
        }
        if ($gameSwitches.value(615)) {
            n = 5;
        }
        if ($gameSwitches.value(264)) {
            n = 6;
        }
        return n;
    }
    function getMerNakadashi(condition) {
        switch (condition) {
            case '初期': return 0;
            case 'F': return 22;
            case 'E': return 40;
            case 'D': return 55;
            case 'C': return 70;
            case 'B': return 85;
            case 'A': return 100;
        }
    }
    function isMerTutoFinished() {
        return $gameParty.hasItem($dataArmors[461], true) && !$gameParty.hasItem($dataArmors[461], false)
            && !$gameParty.hasItem($dataArmors[451], false) && !$gameParty.hasItem($dataArmors[452], false) && !$gameParty.hasItem($dataArmors[453], false);
    }
    Saba.isMerTutoFinished = isMerTutoFinished;
    function sortMembers() {
        $gameParty.sortMembers();
    }
    Saba.sortMembers = sortMembers;
    Game_Party.prototype.sortMembers = function () {
        var members = Saba._Game_Party_prototype_allMembers.call(this);
        members = members.sort(function (a, b) {
            if (a.isMercenary()) {
                if (!b.isMercenary()) {
                    return -1;
                }
                return b.currentClass().id - a.currentClass().id;
            }
            else if (b.isMercenary()) {
                return 1;
            }
            return parseInt(a.actor().meta['order']) - parseInt(b.actor().meta['order']);
        });
        this._actors = [];
        for (var _i = 0, members_4 = members; _i < members_4.length; _i++) {
            var m = members_4[_i];
            this._actors.push(m.actorId());
        }
    };
    function calcCost() {
        var cost = 0;
        for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
            var m = _a[_i];
            cost += m.calcCost();
        }
        var merList = $gameParty.allItems().filter(function (item) {
            return item.atypeId == 5;
        }, this);
        for (var _b = 0, merList_1 = merList; _b < merList_1.length; _b++) {
            var a = merList_1[_b];
            cost += getMercenaryCost(a);
        }
        return cost;
    }
    Saba.calcCost = calcCost;
    Game_Actor.prototype.calcCost = function () {
        var cost = 0;
        if (!this.isMercenary()) {
            return cost;
        }
        var members = this.getAliveMembers();
        for (var _i = 0, members_5 = members; _i < members_5.length; _i++) {
            var m = members_5[_i];
            cost += getMercenaryCost(m);
        }
        return cost;
    };
    function getMercenaryCost(armor) {
        return armor.price;
    }
    Game_System.prototype.calcMaxCost = function () {
        this._maxCost = this._maxCost || 30;
        return this._maxCost;
    };
    function isNoMercenary() {
        for (var _i = 0, _a = $gameParty.allMembers(); _i < _a.length; _i++) {
            var actor = _a[_i];
            if (actor.isMercenary()) {
                if (actor.getAliveMembers().length > 0) {
                    return false;
                }
            }
        }
        return true;
    }
    Saba.isNoMercenary = isNoMercenary;
    function levelUpMercenary() {
        var id = $gameTemp.mercenaryId;
        var actor = $gameActors.actor(id - 400);
        if (actor.isMaxLevel()) {
            return false;
        }
        actor.levelUp();
        $gameVariables.setValue(19, actor.level);
        $gameVariables.setValue(20, actor.name());
        return true;
    }
    Saba.levelUpMercenary = levelUpMercenary;
    function canHireTaikenban() {
        var id = $gameTemp.mercenaryId;
        return [470, 461, 462].indexOf(id) >= 0;
    }
    Saba.canHireTaikenban = canHireTaikenban;
    function clearRandomMercenary() {
        for (var i = 761; i < 799; i++) {
            $gameSwitches.setValue(i, false);
        }
    }
    Saba.clearRandomMercenary = clearRandomMercenary;
    function randomMercenary() {
        for (var i = 761; i < 799; i++) {
            var dice = Math.random() * 100;
            if (dice > 50) {
                $gameSwitches.setValue(i, true);
            }
            else {
                $gameSwitches.setValue(i, false);
            }
        }
    }
    Saba.randomMercenary = randomMercenary;
})(Saba || (Saba = {}));

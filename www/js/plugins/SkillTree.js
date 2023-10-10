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
    var Window_Confirm = /** @class */ (function (_super) {
        __extends(Window_Confirm, _super);
        function Window_Confirm() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_Confirm.prototype.initialize = function (y) {
            var w = 500;
            var h = 150;
            if (!y) {
                y = (Graphics.boxHeight - h) / 2;
            }
            _super.prototype.initialize.call(this, (Graphics.boxWidth - w) / 2, y, w, h);
        };
        Window_Confirm.prototype.setInfo = function (ok) {
            this._ok = ok;
            this.refresh();
        };
        Window_Confirm.prototype.setText = function (text) {
            this._text = text;
            this._texts = null;
            this.height = 140;
            this.refresh();
        };
        Window_Confirm.prototype.setTexts = function (texts) {
            this._texts = texts;
            this.height = 180;
            this.refresh();
        };
        Window_Confirm.prototype.makeCommandList = function () {
            this.addCommand('OK', 'ok', this._ok);
            this.addCommand(TextManager.cancel, 'cancel', true);
        };
        Window_Confirm.prototype.windowWidth = function () {
            return 500;
        };
        Window_Confirm.prototype.windowHeight = function () {
            return 140;
        };
        Window_Confirm.prototype.maxCols = function () {
            return 2;
        };
        Window_Confirm.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
            if (this._texts) {
                var yy = 4;
                for (var _i = 0, _a = this._texts; _i < _a.length; _i++) {
                    var t = _a[_i];
                    this.drawText(t, 10, yy, 440, 'center');
                    yy += 35;
                }
            }
            else {
                this.drawText(this._text, 10, 4, 440, 'center');
            }
        };
        Window_Confirm.prototype.itemRect = function (index) {
            var rect = new Rectangle(0, 0, 0, 0);
            var maxCols = this.maxCols();
            rect.width = this.itemWidth();
            rect.height = this.itemHeight();
            rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
            rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 64;
            if (this._texts) {
                rect.y += 40;
            }
            return rect;
        };
        ;
        return Window_Confirm;
    }(Window_HorzCommand));
    Saba.Window_Confirm = Window_Confirm;
    var Window_Msg = /** @class */ (function (_super) {
        __extends(Window_Msg, _super);
        function Window_Msg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_Msg.prototype.initialize = function () {
            var w = 600;
            var h = 190;
            _super.prototype.initialize.call(this, (Graphics.boxWidth - w) / 2, (Graphics.boxHeight - h) / 2, w, h);
        };
        Window_Msg.prototype.setInfo = function (ok) {
            this._ok = ok;
            this.refresh();
        };
        Window_Msg.prototype.setText = function (text, text2) {
            this._text = text;
            this._text2 = text2;
            this.refresh();
        };
        Window_Msg.prototype.makeCommandList = function () {
            this.addCommand('OK', 'ok', this._ok);
        };
        Window_Msg.prototype.windowWidth = function () {
            return 600;
        };
        Window_Msg.prototype.windowHeight = function () {
            return 180;
        };
        Window_Msg.prototype.maxCols = function () {
            return 1;
        };
        Window_Msg.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
            this.drawText(this._text, 10, 4, 540, 'center');
            this.drawText(this._text2, 10, 40, 540, 'center');
        };
        Window_Msg.prototype.itemRect = function (index) {
            var rect = new Rectangle(0, 0, 0, 0);
            var maxCols = this.maxCols();
            rect.width = this.itemWidth();
            rect.height = this.itemHeight();
            rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
            rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 106;
            return rect;
        };
        ;
        return Window_Msg;
    }(Window_HorzCommand));
    Saba.Window_Msg = Window_Msg;
    Window_Help.prototype.drawSkillHelp = function (skill) {
        this.contents.clear();
        this._windowContentsSprite.destroyAndRemoveChildren();
        var margin = '  ';
        var t = '';
        if (isSkillOpened(skill) || !skill.name.contains('★')) {
            if (!$gameParty.inBattle()) {
                if (skill.mpCost > 0) {
                    t += '\\C[16]' + TextManager.spCost + ':\\C[0]' + skill.mpCost + margin;
                }
                if (skill.tpCost > 0) {
                    t += '\\C[18]' + TextManager.tpCost + ':\\C[0]' + (skill.tpCost / 10) + margin;
                }
            }
            var actorId = parseInt(skill.meta['skillActor']);
            var actor;
            if (isNaN(actorId)) {
                actor = new Game_Actor(10);
            }
            else {
                actor = new Game_Actor(actorId);
            }
            var action = new Game_Action(actor);
            action.setSkill(skill.id);
            margin = '   ';
            if (skill.damage.type > 0 && !skill.name.contains('☆')) {
                var value1;
                var damage = parseInt(skill.damage.formula);
                if (skill.damage.type == 3) {
                    value1 = Math.floor(action.makeDamageValue(actor, false, false));
                    t += '\\C[16]' + TextManager.recover + ':\\C[0]' + -value1 + margin;
                }
                else {
                    if (!isNaN(damage)) {
                        t += '\\C[16]' + TextManager.damage + ':\\C[0]' + damage + '' + margin;
                    }
                    else {
                        if (skill.meta['gunSkill']) {
                            value1 = skill.meta['gunSkill'];
                        }
                        else {
                            value1 = Math.floor(action.makeDamageValue(actor, false, false) * 10);
                        }
                        t += '\\C[16]' + TextManager.damage + ':\\C[0]' + value1 + '%' + margin;
                    }
                }
            }
            else if (skill.meta['counterAttack']) {
                t += '\\C[16]' + TextManager.damage + ':\\C[0]' + skill.meta['counterAttack'] + '%' + margin;
            }
            if (skill.successRate < 100) {
                t += '\\C[16]' + TextManager.hitRate + ':\\C[0]-' + (100 - skill.successRate) + '%' + margin;
            }
            if (skill.meta['マス']) {
                t += '\\C[16]' + TextManager.waitMass + '\\C[0]:' + skill.meta['マス'] + margin;
            }
            if (skill.meta['stunDown']) {
                t += '\\C[17]' + TextManager.stunDemerit + ':\\C[0]' + skill.meta['stunDown'] + '%' + margin;
            }
            if (skill.meta['stunUp']) {
                t += '\\C[17]' + TextManager.stunUp + ':\\C[0]' + skill.meta['stunUp'] + '%' + margin;
            }
            if (skill.meta['bullet']) {
                t += '\\C[16]' + TextManager.bulletCost + ':\\C[0]' + skill.meta['bullet'] + margin;
            }
            if (parseInt(skill.meta['硬直']) > 0) {
                t += '\\C[16]' + TextManager.cooldown + ':\\C[0]' + parseInt(skill.meta['硬直']) + margin;
            }
            if (!action.isForOne() && !action.isForRandom() && action.isForOpponent()) {
                t += '\\C[16]' + TextManager.targetAll + '\\C[0]' + margin;
            }
            if (t.length > 0) {
                t += '\n';
            }
            if (skill.meta['キャンセル']) {
                t += '\\C[17]' + TextManager.cancelTargetSkill + '\\C[0]' + margin;
            }
            if (skill.meta['delay']) {
                var coma = skill.meta['delay'];
                if (coma == 1) {
                    coma = '１';
                }
                var rate = 100;
                if (skill.meta['delayRate']) {
                    rate = skill.meta['delayRate'];
                }
                t += '\\C[17]' + TextManager.delayTarget + ':\\C[0]' + rate + '%' + margin;
            }
            for (var _i = 0, _a = skill.effects; _i < _a.length; _i++) {
                var effect = _a[_i];
                if (effect.code == 21) {
                    var state = $dataStates[effect.dataId];
                    if (!state || state.meta['notDisplay']) {
                        continue;
                    }
                    var hit2 = Math.floor(effect.value1 * 100);
                    t += '\\C[17]' + TextManager.addState.format(state.name) + ':\\C[0]';
                    t += '\\C[0]' + TextManager.baseSuccessRate + '\\C[0]' + hit2 + '%  ';
                    var traits = state.traits;
                    if (traits.length > 0) {
                        var trait = traits[0];
                        if (trait.code == 22 && trait.dataId == 7) {
                            t += '\\C[2]' + TextManager.skipDamage + ':\\C[0]' + Math.floor(trait.value * -100);
                            t += margin;
                        }
                    }
                }
                else if (effect.code == 32) {
                    if (effect.dataId == 2) {
                        t += '\\C[17]' + TextManager.addState.format(TextManager.attackDown) + ':\\C[0]100%' + '  ';
                    }
                    else if (effect.dataId == 5) {
                        t += '\\C[17]' + TextManager.addState.format(TextManager.mdfDown) + ':\\C[0]100%' + '  ';
                    }
                    else {
                        p(effect);
                    }
                }
            }
            if (!$gameParty.inBattle()) {
                var t2 = getLearningBonus(skill);
                if (t2.length > 0) {
                    var label = '\\C[16]' + TextManager.learningBonus + ': \\C[0]';
                    t += label + t2;
                }
            }
            if (skill.meta['ineffectiveBoss']) {
                t += '\\C[2]' + TextManager.ineffectiveBoss + '\\C[0]' + margin;
            }
            if (skill.meta['ineffectiveBossBattle']) {
                t += '\\C[2]' + TextManager.ineffectiveBossBattle + '\\C[0]' + margin;
            }
            if (skill.meta['normalHit']) {
                t += '\\C[2]' + TextManager.normalHit + '\\C[0]' + margin;
            }
            t += skill.description;
            if (t.length > 0) {
                t += '\n';
            }
        }
        if (skill.meta['requiredSkill']) {
            var requiredSkill = $dataSkills[skill.meta['requiredSkill']];
            t += '\\C[16]' + TextManager.requiredSkill + ': \\C[0]' + requiredSkill.name + 'Lv' + requiredSkill.meta['level'];
            var requiredSkill2 = $dataSkills[skill.meta['requiredSkill2']];
            if (requiredSkill2) {
                t += ', ' + requiredSkill2.name + 'Lv' + requiredSkill2.meta['level'];
            }
        }
        this.drawTextEx(t, this.textPadding(), 0);
    };
    function getLearningBonus(skill) {
        var t = '';
        var margin = '  ';
        if (skill.meta['hp']) {
            t += TextManager.hp + ' +' + skill.meta['hp'] + margin;
        }
        if (skill.meta['sp']) {
            t += TextManager.mp + ' +' + skill.meta['sp'] + margin;
        }
        if (skill.meta['str']) {
            t += TextManager.str + ' +' + skill.meta['str'] + margin;
        }
        if (skill.meta['mnd']) {
            t += TextManager.mnd + ' +' + skill.meta['mnd'] + margin;
        }
        if (skill.meta['mgc']) {
            t += TextManager.mgc + ' +' + skill.meta['mgc'] + margin;
        }
        if (skill.meta['vit']) {
            t += TextManager.vit + ' +' + skill.meta['vit'] + margin;
        }
        if (skill.meta['agi']) {
            t += TextManager.agi + ' +' + skill.meta['agi'] + margin;
        }
        if (skill.meta['luk']) {
            t += TextManager.luk + ' +' + skill.meta['luk'] + margin;
        }
        if (skill.meta.ougiPlus) {
            t += '\\C[17]奥義ポイント増加値アップ\\C[0]' + margin;
        }
        return t;
    }
    var Window_SkillHelp = /** @class */ (function (_super) {
        __extends(Window_SkillHelp, _super);
        function Window_SkillHelp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_SkillHelp.prototype.setSkill = function (skill) {
            this._skill = skill;
            this.refresh();
        };
        Window_SkillHelp.prototype.setItem = function (item) {
            var skill = item;
            if (skill && skill.mpCost >= 0) {
                this.setSkill(skill);
            }
            else {
                this._skill = null;
                _super.prototype.setItem.call(this, item);
            }
        };
        Window_SkillHelp.prototype.refresh = function () {
            var skill = this._skill;
            if (!skill) {
                _super.prototype.refresh.call(this);
                return;
            }
            this.drawSkillHelp(skill);
        };
        return Window_SkillHelp;
    }(Window_Help));
    Saba.Window_SkillHelp = Window_SkillHelp;
    function isSkillOpened(skill) {
        if (skill.meta['requiredSkill']) {
            var s1 = $dataSkills[skill.meta['requiredSkill']];
            if (!isLearnSkillType(s1)) {
                return false;
            }
        }
        if (skill.meta['requiredSkill2']) {
            var s2 = $dataSkills[skill.meta['requiredSkill2']];
            if (!isLearnSkillType(s2)) {
                return false;
            }
        }
        return true;
    }
    function isLearnSkillType(skill) {
        var actor = null;
        if (skill.id <= 200) {
            actor = $gameActors.actor(1);
        }
        else if (skill.id <= 300) {
            actor = $gameActors.actor(2);
        }
        else if (skill.id <= 400) {
            actor = $gameActors.actor(3);
        }
        else if (skill.id <= 500) {
            actor = $gameActors.actor(4);
        }
        for (var i = 0; i < 10; i++) {
            var s1 = $dataSkills[skill.id + i];
            if (s1.name != skill.name) {
                return false;
            }
            if (actor.isLearnedSkill(s1.id)) {
                return true;
            }
        }
        return false;
    }
    /**
 * Draws the outline text to the bitmap.
 *
 * @method drawText
 * @param {String} text The text that will be drawn
 * @param {Number} x The x coordinate for the left of the text
 * @param {Number} y The y coordinate for the top of the text
 * @param {Number} maxWidth The maximum allowed width of the text
 * @param {Number} lineHeight The height of the text line
 * @param {String} align The alignment of the text
 */
    Bitmap.prototype.drawText = function (text, x, y, maxWidth, lineHeight, align) {
        // Note: Firefox has a bug with textBaseline: Bug 737852
        //       So we use 'alphabetic' here.
        if (text !== undefined) {
            var tx = x;
            var ty = y + lineHeight - (lineHeight - this.fontSize * 0.7) / 2;
            var context = this._context;
            var alpha = context.globalAlpha;
            maxWidth = maxWidth || 0xffffffff;
            if (align === 'center') {
                tx += maxWidth / 2;
            }
            if (align === 'right') {
                tx += maxWidth;
            }
            context.save();
            /*var re = /^[0-9¥%]/;
            if (text && text.match && text.match(re)) {
                context.font = this._makeFontNameTextNumber();
            } else {*/
            context.font = this._makeFontNameText();
            //}
            context.textAlign = align;
            context.textBaseline = 'alphabetic';
            context.globalAlpha = 1;
            this._drawTextOutline(text, tx, ty, maxWidth);
            context.globalAlpha = alpha;
            this._drawTextBody(text, tx, ty, maxWidth);
            context.restore();
            this._setDirty();
        }
    };
    Bitmap.prototype._makeFontNameTextNumber = function () {
        return (this.fontItalic ? 'Italic ' : '') +
            (this.fontSize + 2) + 'px ' + "マキナス";
    };
    Window_Base.prototype.textWidth = function (text) {
        /*var re = /[02-9¥%]/;
        var re2 = /[1]/;
        if (text.match(re)) {
            return this.contents.measureTextWidth(text) + 3;
        }
        if (text.match(re2)) {
            return 10;
        }*/
        return this.contents.measureTextWidth(text);
    };
})(Saba || (Saba = {}));

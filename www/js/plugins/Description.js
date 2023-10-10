var Saba;
(function (Saba) {
    function getPlusText(armor) {
        var text = '';
        if (armor.params[0] > 0) {
            text += '\\C[2]ＨＰ\\C[2] +' + armor.params[0] + ' ';
        }
        if (armor.meta['str']) {
            text += '\\C[2]' + TextManager.str + '\\C[2] +' + armor.meta['str'] + ' ';
        }
        if (armor.meta['dex']) {
            text += '\\C[2]' + TextManager.dex + '\\C[2] +' + armor.meta['dex'] + ' ';
        }
        if (armor.meta['vit']) {
            text += '\\C[2]' + TextManager.vit + '\\C[2] +' + armor.meta['vit'] + ' ';
        }
        if (armor.meta['agi']) {
            text += '\\C[2]' + TextManager.agi + '\\C[2] +' + armor.meta['agi'] + ' ';
        }
        if (armor.meta['luk']) {
            text += '\\C[2]' + TextManager.luk + '\\C[2] +' + armor.meta['luk'] + ' ';
        }
        if (armor.meta['startItem']) {
            var item = $dataItems[armor.meta['startItem']];
            text += '\\C[2]' + item.name + '\\C[0]を所持してダンジョン探索を開始できる ';
        }
        if (armor.meta['expUp']) {
            text += '\\C[2]' + TextManager.exp + '\\C[0] +' + armor.meta['expUp'] + '% ';
        }
        if (armor.meta['drop']) {
            text += '\\C[2]' + TextManager.drop + '\\C[0] +' + armor.meta['drop'] + '% ';
        }
        if (armor.meta['rare']) {
            text += '\\C[2]' + TextManager.rare + '\\C[0] +' + armor.meta['rare'] + '% ';
        }
        if (armor.meta['weaponBonus']) {
            text += '\\C[2]' + TextManager.weaponBonus + '\\C[0] +' + armor.meta['weaponBonus'] + '% ';
        }
        for (var _i = 0, _a = armor.traits; _i < _a.length; _i++) {
            var trail = _a[_i];
            if (trail.code == 22 && trail.dataId == 0) {
                text += '\\C[2]' + TextManager.hit + '\\C[0] +' + (trail.value * 100) + '% ';
            }
            if (trail.code == 22 && trail.dataId == 2) {
                text += '\\C[2]' + TextManager.cri + '\\C[0] +' + (trail.value * 100) + '% ';
            }
        }
        return text;
    }
    Saba.getPlusText = getPlusText;
    function getMedalDescription(armor) {
        var text = armor.description;
        if (armor.meta['hint']) {
            text = '\\C[16]獲得条件: \\C[0]' + armor.meta['hint'] + '\n';
        }
        var plusText = getPlusText(armor);
        if (plusText.length > 0) {
            //text += '\\C[16]装備効果:\\C[0] ' + plusText;
        }
        if (armor.meta['gold']) {
            text += '\\C[16]取得効果:\\C[0] ' + armor.meta['gold'] + 'G を取得する';
        }
        return text;
    }
    Saba.getMedalDescription = getMedalDescription;
    function getMedalHintDescription(armor) {
        var text = '\\C[16]獲得条件: \\C[0]' + armor.meta['hint'] + '\n';
        //text += '\\C[16]装備効果:\\C[0] ';
        //return text + getPlusText(armor);
        return text;
    }
    Saba.getMedalHintDescription = getMedalHintDescription;
    function getArmorDescription(armor, noSkill) {
        if (noSkill === void 0) { noSkill = false; }
        var text = '';
        var margin = '  ';
        if (armor.meta['actor']) {
            var actor2 = $gameActors.actor(parseInt(armor.meta['actor']));
            text += actor2.name() + margin;
            for (var i = actor2.name().length; i < 7; i++) {
                text += '　';
            }
            text += actor2.nickname() + margin;
            text += '\n';
            if (!noSkill) {
                text += '\\C[16]LV: \\C[0]' + actor2.level + ' / ' + actor2.maxLevel() + margin;
                if (actor2.nextRequiredExp() < 0 || actor2.level == actor2.maxLevel()) {
                    text += '\\C[16]次のLVまで: \\C[0]' + '最大LVです' + margin;
                }
                else {
                    text += '\\C[16]次のLVまで: \\C[0]' + actor2.nextRequiredExp() + margin;
                }
                text += '\\C[16]HP: \\C[0]' + Saba.getMercenaryHp(armor) + margin;
                text += '\n';
            }
            //text += '\\C[16]経験値: \\C[0]' + actor2.getMerExpText() + margin;
            if (noSkill) {
                text += '\\C[8]' + actor2.profile();
            }
            var vit = actor2.getParamValue('vit');
            var hp = Saba.getMercenaryHp(armor);
            /*if (hp > 0) {
                text += '\\C[16]ＨＰ: \\C[0]' + hp + margin;
            }
            if (actor2.atk2 > 0) {
                text += '\\C[16]攻撃力: \\C[0]' + actor2.atk2 + margin;
            }
            if (actor2.def2 > 0) {
                text += '\\C[16]防御力: \\C[0]' + actor2.def2 + margin;
            }*/
        }
        if (noSkill) {
            return text;
        }
        if (!armor.meta['actor']) {
            if (armor.params[0] > 0) {
                text += '\\C[16]' + TextManager.param(0) + ': \\C[0]' + armor.params[0] + margin;
            }
            if (armor.params[2] > 0) {
                text += '\\C[16]' + TextManager.param(2) + ': \\C[0]' + armor.params[2] + margin;
            }
            if (armor.params[3] > 0) {
                text += '\\C[16]' + TextManager.param(8) + ': \\C[0]' + armor.params[3] + margin;
            }
            if (armor.params[4] > 0) {
                text += '\\C[16]' + TextManager.mgc + ': \\C[0]' + armor.params[4] + margin;
            }
            if (armor.params[5] > 0) {
                text += '\\C[16]' + TextManager.mdf + ': \\C[0]' + armor.params[5] + margin;
            }
            return text;
        }
        /*
        var str = actor2.getParamValue('str');
        if (str > 0) {
            text += '\\C[16]' + TextManager.str  + ': \\C[0]' + str + margin;
        }
        var dex = parseInt(actor2.actor().meta['dex']);
        if (dex > 0) {
            text += '\\C[16]' + TextManager.mnd  + ': \\C[0]' + dex + margin;
        }
        if (vit > 0) {
            text += '\\C[16]' + TextManager.vit + ': \\C[0]' + vit + margin;
        }
        var luk = parseInt(actor2.actor().meta['luk']);
        if (luk > 0) {
            text += '\\C[16]' + TextManager.luk + ': \\C[0]' + luk + margin;
        }
        */
        var skills = actor2.skills();
        if (skills.length > 0) {
            var passiveData = skills[0];
            text += '\n';
            var skillCount = 1;
            if (passiveData) {
                text += '\\C[2]スキル: \\C[0]';
                text += '\\I[' + passiveData.iconIndex + ']';
                text += passiveData.name;
                text += '\n';
                text += '　　　　 　' + passiveData.description;
                text += '\n';
                skillCount++;
            }
            var skill = parseInt(armor.meta['skill']);
            var skillData = $dataSkills[skill];
            if (skillData) {
                if (skillCount == 1) {
                    text += '\\C[2]スキル: \\C[0]';
                }
                else {
                    text += '\\C[2]スキル: \\C[0]';
                }
                text += '\\I[' + skillData.iconIndex + ']';
                text += skillData.name;
                text += '（発動率' + skillData.successRate + '％）';
                text += '\n';
                text += '　　　　 　' + skillData.description;
                text += '\n';
            }
        }
        return text;
    }
    Saba.getArmorDescription = getArmorDescription;
    function getWeaponDescription(weapon) {
        var margin = '  ';
        var text = '';
        if (weapon.isGun()) {
            text += '\\C[16]基礎ダメージ: \\C[0]' + weapon.skillDamage() + margin;
        }
        else {
            text += '\\C[16]攻撃力: \\C[0]' + weapon.atk() + margin;
        }
        text += '\\C[16]命中: \\C[0]' + weapon.hit() + '%' + margin;
        if (weapon.tsuigeki() > 0) {
            text += '\\C[16]追撃: \\C[0]' + weapon.tsuigeki() + '%' + margin;
        }
        if (!$gameParty.inBattle() && weapon.plusMax() > 0) {
            text += '\\C[16]最大強化値: \\C[0]' + '+' + weapon.plusMax() + margin;
        }
        text += weapon.obj().description;
        text += '\n';
        if (weapon.isGun()) {
            text += '\\C[16]弾数: \\C[0]' + '    ' + margin;
            text += '\\C[16]リロードまで: \\C[0]' + '    ' + margin;
        }
        if (weapon.stunUpRate() > 0) {
            text += '\\C[16]スタン値:\\C[0]' + '+' + weapon.stunUpRate() + '%' + margin;
        }
        if (weapon.cri() > 0) {
            text += '\\C[16]クリティカル:\\C[0]' + '+' + weapon.cri() + '%' + margin;
        }
        if (weapon.delay() > 0) {
            text += '\\C[16]ディレイ率:\\C[0]' + '' + weapon.delay() + '%' + margin;
        }
        return text;
    }
    Saba.getWeaponDescription = getWeaponDescription;
    Window_Help.prototype.setItem = function (item) {
        if (!item) {
            this.setText('');
            return;
        }
        this._windowContentsSprite.destroyAndRemoveChildren();
        if (item.etypeId > 0) {
            if (item.id > 500) {
                var text = item.description;
                if (text.length > 0) {
                    text += '\n';
                }
                this.setText(text + getPlusText(item));
            }
            else {
                this.setText(getArmorDescription(item));
            }
        }
        else if (item.weapon) {
            var weapon = item;
            this.setText(getWeaponDescription(weapon));
            if (weapon.isGun()) {
                var base = Saba.getSystemBaseTexture('bullet');
                var yy = 32;
                for (var i = 0; i < weapon.bulletMax(); i++) {
                    var xx = 25;
                    if (i < weapon.bullet()) {
                        xx = 0;
                    }
                    var s1 = new PIXI.Sprite(new PIXI.Texture(base, new PIXI.Rectangle(xx, yy, 25, 36)));
                    s1.x = 76 + i * 18;
                    s1.y = 38;
                    this._windowContentsSprite.addChild(s1);
                }
                for (var i = 0; i < weapon.coolTimeMax(); i++) {
                    var xx = 75;
                    if (i < weapon.coolTime()) {
                        xx = 50;
                    }
                    var s1 = new PIXI.Sprite(new PIXI.Texture(base, new PIXI.Rectangle(xx, yy, 25, 36)));
                    s1.x = 360 + i * 16;
                    s1.y = 38;
                    this._windowContentsSprite.addChild(s1);
                }
            }
        }
        else {
            this.setText(item ? getItemDescription(item) : '');
        }
    };
    /*var _Window_Help_prototype_textWidth = Window_Help.prototype.textWidth;
    Window_Help.prototype.textWidth = function(c) {
        switch (c) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0': return 14;
            case '%': return 26;
        }
        return _Window_Help_prototype_textWidth.call(this, c);
    };*/
})(Saba || (Saba = {}));
function getItemDescription(item) {
    var margin = '  ';
    var t = '';
    var actor = new Game_Actor(10);
    var action = new Game_Action(actor);
    action.setItem(item.id);
    if (item.damage.type > 0 && !item.name.contains('☆')) {
        var value1 = Math.floor(action.makeDamageValue(actor, false, false));
        if (item.damage.type == 1) {
            t += '\\C[16]' + TextManager.damage + ':\\C[0]' + value1 + margin;
        }
        if (item.damage.type == 3) {
            t += '\\C[16]' + TextManager.recover + ':\\C[0]' + -value1 + margin;
        }
    }
    for (var _i = 0, _a = item.effects; _i < _a.length; _i++) {
        var effect = _a[_i];
        if (effect.code == 21) {
            var state = $dataStates[effect.dataId];
            if (!state || state.meta['notDisplay']) {
                continue;
            }
            var hit2 = Math.floor(effect.value1 * 100);
            t += '\\C[17]' + TextManager.addState.format(state.name) + ':\\C[0]';
            t += '\\C[0]' + TextManager.baseSuccessRate + '\\C[0]' + hit2 + '%  ';
            if (state.maxTurns == state.minTurns) {
                t += '\\C[0]' + TextManager.turn.format(state.maxTurns) + '\\C[0]  ';
            }
            else {
                t += '\\C[0]' + TextManager.turn2.format(state.minTurns, state.maxTurns) + '\\C[0]  ';
            }
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
                t += '\\C[0]' + TextManager.attackDown + ':\\C[0]100%' + margin;
            }
            else if (effect.dataId == 5) {
                t += '\\C[0]' + TextManager.mdfDown + ':\\C[0]100%' + margin;
            }
            else {
                p(effect);
            }
        }
    }
    if (!action.isForOne() && !action.isForRandom() && action.isForOpponent()) {
        t += '\\C[16]' + TextManager.targetAll + '\\C[0]' + margin;
    }
    t += item.description;
    return t;
}

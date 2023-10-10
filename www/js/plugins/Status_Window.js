Object.defineProperties(Game_Actor.prototype, {
    agi: { get: function () { return this.params.agi; }, configurable: true },
});
var Saba;
(function (Saba) {
    Saba.LEVELUP_PARAMS = {
        1: [0, 1, 2, 4, 5, 6, 3, 2, 3, 5, 4, 1, 2, 3, 5, 1, 2, 4, 5, 6, 3, 2, 3, 5, 4, 1, 2, 3, 5, 6],
        2: [0, 5, 1, 4, 1, 5, 6, 3, 2, 5, 1, 4, 1, 5, 6, 3, 2, 5, 1, 4, 1, 5, 6, 3, 2, 5, 1, 4, 1, 5, 6, 3, 2],
        3: [0, 2, 4, 3, 5, 6, 5, 3, 3, 2, 4, 3, 5, 6, 5, 3, 3, 2, 4, 3, 5, 6, 5, 3, 3, 2, 4, 3, 5, 6, 5, 3, 3],
        4: [0, 3, 2, 5, 6, 4, 3, 5, 6, 3, 2, 5, 6, 4, 3, 5, 6, 3, 2, 5, 6, 4, 3, 5, 6, 3, 2, 5, 6, 4, 3, 5, 6],
        5: [0, 3, 2, 5, 6, 4, 3, 5, 6],
        14: [0, 3, 2, 5, 6, 4, 3, 5, 6],
    };
    Saba.LEVELUP_PARAMS[15] = Saba.LEVELUP_PARAMS[14];
    Saba.LEVELUP_PARAMS[16] = Saba.LEVELUP_PARAMS[14];
    Saba.LEVELUP_PARAMS[17] = Saba.LEVELUP_PARAMS[14];
    var _Game_Actor_prototype_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function (actorId) {
        this.skillParams = { 'str': 0, 'dex': 0, 'mnd': 0, 'mgc': 0, 'vit': 0, 'agi': 0, 'luk': 0 };
        var params = { 'str': 1, 'dex': 1, 'mnd': 1, 'mgc': 1, 'vit': 1, 'agi': 1, 'luk': 1 };
        this.params = params;
        switch (actorId) {
            case 1:
                params.str = 2;
                params.mnd = 8;
                params.mgc = 12;
                params.vit = 4;
                params.agi = 9;
                params.luk = 8;
                break;
            case 2:
            case 5:
                params.str = 4;
                params.mnd = 4;
                params.mgc = 3;
                params.vit = 3;
                params.agi = 11;
                params.luk = 4;
                break;
            case 3:
                params.str = 2;
                params.mnd = 12;
                params.mgc = 7;
                params.vit = 3;
                params.agi = 12;
                params.luk = 11;
                break;
            case 4:
                params.str = 6;
                params.mnd = 3;
                params.mgc = 9;
                params.vit = 5;
                params.agi = 6;
                params.luk = 4;
                break;
            case 6:
                params.str = 2;
                params.mnd = 9;
                params.mgc = 3;
                params.vit = 4;
                params.agi = 4;
                params.luk = 12;
                break;
            case 14:
            case 15:
                params.str = 6;
                params.mnd = 4;
                params.mgc = 1;
                params.vit = 8;
                params.agi = 2;
                params.luk = 1;
                break;
            case 11:
                params.str = 12;
                params.mnd = 3;
                params.mgc = 1;
                params.vit = 14;
                params.agi = 4;
                params.luk = 5;
                break;
            default:
                params.str = 0;
                params.mnd = 0;
                params.mgc = 0;
                params.vit = 0;
                params.agi = 0;
                params.luk = 0;
                break;
        }
        this.eroPoint = 0;
        this._plusOugi = 0;
        _Game_Actor_prototype_setup.call(this, actorId);
    };
    var _Game_Actor_prototype_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function () {
        if (this.actorId() >= 50) {
            _Game_Actor_prototype_levelUp.call(this);
            return;
        }
        if (!Saba.LEVELUP_PARAMS[this.actorId()]) {
            p(this.actorId() + 'のLVアップが設定されていません');
            return;
        }
        var param = Saba.LEVELUP_PARAMS[this.actorId()][this._level - this.actor().initialLevel];
        switch (param) {
            case 1:
                this.params['str']++;
                break;
            case 2:
                this.params['mnd']++;
                break;
            case 3:
                this.params['mgc']++;
                break;
            case 4:
                this.params['vit']++;
                break;
            case 5:
                this.params['agi']++;
                break;
            case 6:
                this.params['luk']++;
                break;
        }
        _Game_Actor_prototype_levelUp.call(this);
        if (this.actorId() == 1) {
            $gameMedals.onLevelUp();
        }
    };
    var _Game_Actor_prototype_gainTp = Game_Actor.prototype.gainTp;
    Game_Actor.prototype.gainTp = function (value) {
        this._plusOugi = this._plusOugi || 0;
        _Game_Actor_prototype_gainTp.call(this, value + this._plusOugi);
    };
    Game_Actor.prototype.calcSkillUpParams = function () {
        var params = { 'str': 0, 'mnd': 0, 'mgc': 0, 'vit': 0, 'agi': 0, 'luk': 0 };
        this._plusOugi = 0;
        for (var _i = 0, _a = this._skills; _i < _a.length; _i++) {
            var s = _a[_i];
            var skill = $dataSkills[s];
            for (var key in params) {
                if (skill.meta[key]) {
                    params[key] += Math.floor(skill.meta[key]);
                }
            }
            if (skill.meta.ougiPlus) {
                this._plusOugi += Math.floor(skill.meta.ougiPlus);
            }
        }
        this.skillParams = params;
    };
    Game_Actor.prototype.equipParams = function () {
        var params = { 'str': 0, 'mnd': 0, 'mgc': 0, 'vit': 0, 'agi': 0, 'luk': 0 };
        var armors = this.armors();
        for (var key in params) {
            for (var _i = 0, armors_1 = armors; _i < armors_1.length; _i++) {
                var armor = armors_1[_i];
                if (armor.meta['actor']) {
                    var actor = $gameActors.actor(parseInt(armor.meta['actor']));
                    params[key] += actor.getParamValue(key);
                }
                else {
                    if (armor.meta[key]) {
                        params[key] += Math.floor(armor.meta[key]);
                    }
                }
            }
        }
        return params;
    };
    Game_Actor.prototype.getParam = function (name) {
        var params = this.params;
        if (!params) {
            return 0;
        }
        var skillParams = this.skillParams;
        var equipParams = this.equipParams();
        return params[name] + skillParams[name] + equipParams[name];
    };
    var _Window_Status_prototype_refresh = Window_Status.prototype.refresh;
    Window_Status.prototype.refresh = function () {
        this._windowContentsSprite.destroyAndRemoveChildren();
        _Window_Status_prototype_refresh.call(this);
        this.drawParams();
    };
    Window_Status.prototype.textWidth = function (text) {
        return Math.max(this.contents.measureTextWidth(text), 16);
    };
    Window_Status.prototype.drawItemName = function (item, x, y, width) {
        width = width || 312;
        if (item) {
            var iconBoxWidth = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + 2, y + 2);
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        }
        if (item) {
            var s;
            if (item.meta['LV']) {
                s = Saba.getLevelSprite(parseInt(item.meta['LV']));
                y += 10;
            }
            if (s) {
                s.x = x - 2;
                s.y = y - 4;
                this._windowContentsSprite.addChild(s);
            }
        }
    };
    Window_Status.prototype.drawParams = function () {
        var a = this._actor;
        if (!a) {
            return;
        }
        var tachieActor = this._actor;
        if (this._actor.actorId() == 15) {
            tachieActor = $gameActors.actor(11);
        }
        if (this._actor.actorId() == 11) {
            this.drawTachieActor(tachieActor, this.contents, 590, 0, null, 1, 1, false);
        }
        else {
            this.drawTachieActor(tachieActor, this.contents, 490, 0, null, 1, 1, false);
        }
        var params = a.params;
        var skillParams = a.skillParams;
        var equipParams = a.equipParams();
        var x = 178;
        var y = 499;
        this.drawP(x, y, TextManager.str, 0, params.str + skillParams.str, equipParams.str);
        this.drawP(x, y, TextManager.mgc, 1, params.mgc + skillParams.mgc, equipParams.mgc);
        this.drawP(x, y, TextManager.vit, 2, params.vit + skillParams.vit, equipParams.vit);
        this.drawP(x, y, TextManager.mnd, 3, params.mnd + skillParams.mnd, equipParams.mnd);
        this.drawP(x, y, TextManager.agi, 4, params.agi + skillParams.agi, equipParams.agi);
        this.drawP(x, y, TextManager.luk, 5, params.luk + skillParams.luk, equipParams.luk);
    };
    Window_Status.prototype.drawBlock1 = function (y) {
        this.drawActorName(this._actor, 6, y);
        this.drawActorNickname(this._actor, 192, y);
    };
    Window_Status.prototype.drawBlock2 = function (y) {
        // this.drawActorFace(this._actor, 12, y);
        this.drawBasicInfo(42, y);
        if (this._actor.isMercenary()) {
            return;
        }
        this.drawExpInfo(266, y);
    };
    Window_Base.prototype.drawP = function (x, y, name, index, value, equipP) {
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
        for (var i = 1; i <= 30; i++) {
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
    Window_Status.prototype.drawBlock3 = function (y) {
        this.drawParameters(42, y);
        this.drawEquipments(302, y);
    };
    Window_Status.prototype.drawParameters = function (x, y) {
        var lineHeight = this.lineHeight();
        var paramIds = [2, 8, 9, 10, 11, 12];
        for (var i = 0; i < paramIds.length; i++) {
            var paramId = paramIds[i];
            var y2 = y + lineHeight * i;
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.param(paramId), x, y2, 160);
            this.resetTextColor();
            this.drawNumber(this._actor.getStatusParam(paramId), x + 140, y2, 60, 'right', 3);
            //this.drawText(this._actor.getStatusParam(paramId), x + 120, y2, 60, 'right');
        }
    };
    Window_Status.prototype.drawEquipments = function (x, y) {
        var equips = this._actor.equips();
        var count = Math.min(equips.length, this.maxEquipmentLines());
        var actorId = this._actor.actorId();
        for (var i = 0; i < count; i++) {
            if (actorId == 1 || actorId == 3 || actorId == 4) {
                if (i == 1) {
                    continue;
                }
                var index = i;
                if (index > 1) {
                    index--;
                }
            }
            else {
                index = i;
            }
            this.drawItemName(equips[i], x, y + this.lineHeight() * index);
        }
    };
    Window_Base.prototype.getTex1 = function () {
        if (this.barTex1 && this.barTex1.baseTexture) {
            return this.barTex1;
        }
        var baseTexture = Saba.getSystemBaseTexture('gauge');
        this.barTex1 = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 62, 6, 22));
        return this.barTex1;
    };
    Window_Base.prototype.getTex2 = function () {
        if (this.barTex2 && this.barTex2.baseTexture) {
            return this.barTex2;
        }
        var baseTexture = Saba.getSystemBaseTexture('gauge');
        this.barTex2 = new PIXI.Texture(baseTexture, new PIXI.Rectangle(6, 62, 6, 22));
        return this.barTex2;
    };
    Window_Base.prototype.getTex3 = function () {
        if (this.barTex3 && this.barTex3.baseTexture) {
            return this.barTex3;
        }
        var baseTexture = Saba.getSystemBaseTexture('gauge');
        this.barTex3 = new PIXI.Texture(baseTexture, new PIXI.Rectangle(12, 62, 6, 22));
        return this.barTex3;
    };
})(Saba || (Saba = {}));

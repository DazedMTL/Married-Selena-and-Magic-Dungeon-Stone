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
    Saba.KAIRAKU_ICON = 84;
    Saba.KEIKEN_ICON = 1675;
    Saba.NAKADASHI_ICON = 1706;
    Saba.SYUSAN_ICON = 1927;
    Saba.NINSHIN_ICON = 1715;
    var _Game_Actor_prototype_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function () {
        _Game_Actor_prototype_initMembers.call(this);
        this.acceMap = {};
        this.defaultFaceId = 1;
        this.defaultPoseId = 1;
    };
    Game_Actor.prototype.getMiddleAcceList = function () {
        var ret = [];
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var acceItem = $dataArmors[i];
            if (acceItem.meta['middleAcce']) {
                ret.push(parseInt(acceItem.meta['acce']));
            }
        }
        /*ret = ret.sort(function (a, b) {
            return b - a;
        });*/
        return ret;
    };
    Game_Actor.prototype.hasHoppeAcce = function () {
        var ret = [];
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var acceItem = $dataArmors[i];
            if (acceItem.meta['hoppe']) {
                return true;
            }
        }
        /*ret = ret.sort(function (a, b) {
            return b - a;
        });*/
        return false;
    };
    Game_Actor.prototype.getBackAcceList = function () {
        var ret = [];
        var list = [];
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var acceItem = $dataArmors[i];
            if (acceItem.meta['backAcce']) {
                list.push(acceItem);
            }
        }
        list = list.sort(function (a, b) {
            var orderA = 0;
            var orderB = 0;
            if (a.meta['order']) {
                orderA = parseInt(a.meta['order']);
            }
            if (b.meta['order']) {
                orderB = parseInt(b.meta['order']);
            }
            return orderA - orderB;
        });
        var bote = $gameSystem.getEro(this.actorId()).bote;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var acceItem = list_1[_i];
            var id = parseInt(acceItem.meta['acce']);
            if (acceItem.meta['alpha']) {
                ret.push([id, parseInt(acceItem.meta['alpha'])]);
            }
            else {
                if (bote && acceItem.meta['bote']) {
                    ret.push(id + 'b');
                }
                else {
                    ret.push(id);
                }
            }
        }
        return ret;
    };
    Game_Actor.prototype.removeGroup = function (group, id) {
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            if (id === i) {
                continue;
            }
            var acceItem = $dataArmors[i];
            if (acceItem.meta['group']) {
                var group2 = parseInt(acceItem.meta['group']);
                if (group2 === group) {
                    delete this.acceMap[i];
                    return;
                }
            }
        }
    };
    Game_Actor.prototype.getFrontAcceList = function () {
        var ret = [];
        var list = [];
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var acceItem = $dataArmors[i];
            if (acceItem.meta['frontAcce']) {
                list.push(acceItem);
            }
        }
        list = list.sort(function (a, b) {
            var orderA = a.id;
            var orderB = b.id;
            if (a.meta['order']) {
                orderA = parseInt(a.meta['order']);
            }
            if (b.meta['order']) {
                orderB = parseInt(b.meta['order']);
            }
            return orderA - orderB;
        });
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var acceItem = list_2[_i];
            var id = parseInt(acceItem.meta['acce']);
            ret.push(id);
        }
        return ret;
    };
    var Scene_Kigae = /** @class */ (function (_super) {
        __extends(Scene_Kigae, _super);
        function Scene_Kigae() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_Kigae.prototype.create = function () {
            Scene_MenuBase.prototype.create.call(this);
            this.createKigaeSlotWindow();
            this.createKigaeActorWindow();
            this.updateActor();
        };
        Scene_Kigae.prototype.createKigaeSlotWindow = function () {
            this._kigaeSlotWindow = new Window_KigaeSlot();
            this._kigaeSlotWindow.setHandler('ok', this.onOk.bind(this));
            this._kigaeSlotWindow.setHandler('change', this.onChange.bind(this));
            this._kigaeSlotWindow.setHandler('cancel', this.onCancel.bind(this));
            this.addWindow(this._kigaeSlotWindow);
        };
        Scene_Kigae.prototype.onCancel = function () {
            for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
                var battler = _a[_i];
                var actor = battler;
            }
            this._actor.setCacheChanged();
            $gamePlayer.refresh();
            this.popScene();
        };
        Scene_Kigae.prototype.createKigaeActorWindow = function () {
            this._kigaeActorWindow = new Window_KigaeActor();
            this.addWindow(this._kigaeActorWindow);
        };
        Scene_Kigae.prototype.updateActor = function () {
            _super.prototype.updateActor.call(this);
            if (this._kigaeActorWindow) {
                this._kigaeSlotWindow.setActor(this._actor);
                this._kigaeActorWindow.setActor(this._actor);
            }
        };
        Scene_Kigae.prototype.onOk = function () {
            this._actor.setCacheChanged();
            this._kigaeSlotWindow.decide();
            this._kigaeSlotWindow.refresh();
            this._kigaeActorWindow.refresh();
            this._kigaeSlotWindow.activate();
        };
        Scene_Kigae.prototype.onChange = function () {
            var outerId = this._kigaeSlotWindow.outerId();
            if (outerId) {
                this._kigaeActorWindow.setNaked(false);
            }
            else {
                this._kigaeActorWindow.setNaked(true);
            }
            var acceId = this._kigaeSlotWindow.acceId();
            if (acceId) {
                this._kigaeActorWindow.setNoInner(true);
            }
            else {
                this._kigaeActorWindow.setNoInner(false);
            }
        };
        return Scene_Kigae;
    }(Scene_MenuBase));
    var Window_KigaeSlot = /** @class */ (function (_super) {
        __extends(Window_KigaeSlot, _super);
        function Window_KigaeSlot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_KigaeSlot.prototype.initialize = function () {
            _super.prototype.initialize.call(this, 10, 30, 380, 700);
            this.initTexture();
            this.makeItemList();
            this.refresh();
            this.select(0);
            this.activate();
        };
        Window_KigaeSlot.prototype.initTexture = function () {
        };
        Window_KigaeSlot.prototype.refresh = function () {
            this._windowContentsSprite.destroyAndRemoveChildren();
            _super.prototype.refresh.call(this);
        };
        Window_KigaeSlot.prototype.setActor = function (actor) {
            this._actor = actor;
            this.makeItemList();
            this.refresh();
        };
        Window_KigaeSlot.prototype.makeItemList = function () {
            this._itemList = [];
            if (!this._actor) {
                return;
            }
            var armors = $gameParty.armors();
            for (var _i = 0, armors_1 = armors; _i < armors_1.length; _i++) {
                var armor = armors_1[_i];
                if (!this._actor.canEquipArmor(armor)) {
                    continue;
                }
                if (parseInt(armor.meta['acce']) > 0) {
                    this._itemList.push(armor);
                }
                if (armor.meta['outer']) {
                    this._itemList.push(armor);
                }
                if (armor.meta['face']) {
                    this._itemList.push(armor);
                }
                if (armor.meta['pose']) {
                    this._itemList.push(armor);
                }
                if (armor.meta['innerTop']) {
                    this._itemList.push(armor);
                }
                if (armor.meta['innerBottom']) {
                    this._itemList.push(armor);
                }
            }
            this._itemList = this._itemList.sort(function (a, b) {
                var orderA = a.id;
                var orderB = b.id;
                if (a.meta['order']) {
                    orderA = parseInt(a.meta['order']);
                }
                if (b.meta['order']) {
                    orderB = parseInt(b.meta['order']);
                }
                return orderA - orderB;
            });
        };
        Window_KigaeSlot.prototype.maxItems = function () {
            if (!this._itemList) {
                return 0;
            }
            return this._itemList.length;
        };
        Window_KigaeSlot.prototype.drawItem = function (index) {
            var armor = this._itemList[index];
            var rect = this.itemRect(index);
            if (!this._actor) {
                return;
            }
            var acceIndex = parseInt(armor.meta['acce']);
            if (acceIndex > 0) {
                this.drawTextEx('\\C[0]' + armor.name + '\\C[0]', rect.x, rect.y);
                if (this._actor.acceMap[armor.id]) {
                    this.drawEquip(rect.y);
                }
            }
            var ero = $gameSystem.getEro(this._actor.actorId());
            var outerId = armor.meta['outer'];
            if (ero.bote && armor.meta['outerBote']) {
                outerId = armor.meta['outerBote'];
            }
            if (outerId) {
                this.drawTextEx('\\C[24]' + armor.name + '\\C[0]', rect.x, rect.y);
                if (this._actor.outerId == outerId) {
                    this.drawEquip(rect.y);
                }
            }
            var faceId = parseInt(armor.meta['face']);
            if (faceId) {
                this.drawTextEx('\\C[6]' + armor.name + '\\C[0]', rect.x, rect.y);
                if (this._actor.defaultFaceId == faceId) {
                    this.drawEquip(rect.y);
                }
            }
            var poseId = parseInt(armor.meta['pose']);
            if (poseId) {
                this.drawTextEx('\\C[12]' + armor.name + '\\C[0]', rect.x, rect.y);
                if (this._actor.defaultPoseId == poseId) {
                    this.drawEquip(rect.y);
                }
            }
            var innerTopId = armor.meta['innerTop'];
            if (ero.bote && armor.meta['innerTopBote']) {
                innerTopId = armor.meta['innerTopBote'];
            }
            if (innerTopId) {
                this.drawTextEx('\\C[14]' + armor.name + '\\C[0]', rect.x, rect.y);
                if (this._actor.innerTopId == innerTopId) {
                    this.drawEquip(rect.y);
                }
            }
            var innerBottomId = armor.meta['innerBottom'];
            if (ero.bote && armor.meta['innerBottomBote']) {
                innerBottomId = armor.meta['innerBottomBote'];
            }
            if (innerBottomId) {
                this.drawTextEx('\\C[14]' + armor.name + '\\C[0]', rect.x, rect.y);
                if (this._actor.innerBottomId == innerBottomId) {
                    this.drawEquip(rect.y);
                }
            }
        };
        Window_KigaeSlot.prototype.drawEquip = function (y) {
            var baseTexture = Saba.getSystemBaseTexture('skill_tree');
            var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 36, 66, 36));
            var sprite = new PIXI.Sprite(texture);
            sprite.x = 260;
            sprite.y = y;
            this._windowContentsSprite.addChild(sprite);
        };
        Window_KigaeSlot.prototype.decide = function () {
            var armor = this._itemList[this.index()];
            var group = parseInt(armor.meta['group']);
            var acceId = parseInt(armor.meta['acce']);
            if (group > 0) {
                if (this._actor.acceMap[armor.id]) {
                    this._actor.acceMap[armor.id] = null;
                    return;
                }
                else {
                    this._actor.removeGroup(group, armor.id);
                }
            }
            if (acceId > 0) {
                this._actor.acceMap[armor.id] = !this._actor.acceMap[armor.id];
            }
            var outerId = armor.meta['outer'];
            var ero = $gameSystem.getEro(this._actor.actorId());
            if (ero.bote && armor.meta['outerBote']) {
                outerId = armor.meta['outerBote'];
            }
            if (outerId) {
                this._actor.setOuterId(outerId);
            }
            var faceId = parseInt(armor.meta['face']);
            if (faceId > 0) {
                this._actor.defaultFaceId = faceId;
            }
            var poseId = parseInt(armor.meta['pose']);
            if (poseId > 0) {
                this._actor.defaultPoseId = poseId;
            }
            var innerTopId = armor.meta['innerTop'];
            if (ero.bote && armor.meta['innerTopBote']) {
                innerTopId = armor.meta['innerTopBote'];
            }
            if (innerTopId) {
                this._actor.setInnerTopId(innerTopId);
            }
            var innerBottomId = armor.meta['innerBottom'];
            if (ero.bote && armor.meta['innerBottomBote']) {
                innerBottomId = armor.meta['innerBottomBote'];
            }
            if (innerBottomId) {
                this._actor.setInnerBottomId(innerBottomId);
            }
        };
        Window_KigaeSlot.prototype.outerId = function () {
            var armor = this._itemList[this.index()];
            return armor.meta['outer'];
        };
        Window_KigaeSlot.prototype.acceId = function () {
            var armor = this._itemList[this.index()];
            return armor.meta['acce'];
        };
        Window_KigaeSlot.prototype.playOkSound = function () {
            SoundManager.playCursor();
        };
        return Window_KigaeSlot;
    }(Window_Selectable));
    var Window_KigaeActor = /** @class */ (function (_super) {
        __extends(Window_KigaeActor, _super);
        function Window_KigaeActor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_KigaeActor.prototype.initialize = function () {
            Window_Base.prototype.initialize.call(this, 200, 0, 800, 768);
            this.opacity = 0;
        };
        Window_KigaeActor.prototype.setActor = function (actor) {
            this._actor = actor;
            this.refresh();
        };
        Window_KigaeActor.prototype.setNaked = function (b) {
            if (this._naked != b) {
                this._naked = b;
                this._actor.setCacheChanged();
                this.refresh();
            }
        };
        Window_KigaeActor.prototype.setNoInner = function (b) {
            if (this._noInner != b) {
                this._noInner = b;
                this._actor.setCacheChanged();
                this.refresh();
            }
        };
        Window_KigaeActor.prototype.refresh = function () {
            this._windowContentsSprite.destroyAndRemoveChildren();
            var actor = JsonEx.makeDeepCopy(this._actor);
            if (this._naked) {
                actor.setOuterId('a');
            }
            if (this._noInner) {
                actor.setInnerTopId('a');
                actor.setInnerBottomId('a');
            }
            actor.setPoseId(actor.defaultPoseId);
            this.drawTachieActor(actor, this.contents, 200, 0, null, actor.defaultFaceId);
        };
        return Window_KigaeActor;
    }(Window_Base));
    var _Scene_Menu_prototype_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_prototype_createCommandWindow.call(this);
        this._commandWindow.setHandler('kigae', this.commandPersonal.bind(this));
    };
    var _Scene_Menu_prototype_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function () {
        _Scene_Menu_prototype_onPersonalOk.call(this);
        switch (this._commandWindow.currentSymbol()) {
            case 'kigae':
                if ($gameParty.menuActor().isMercenary() || $gameParty.menuActor().actorId() == 11) {
                    SoundManager.playBuzzer();
                    this._statusWindow.activate();
                    return;
                }
                SceneManager.push(Scene_Kigae);
                break;
        }
    };
    Game_Actor.prototype.characterName = function () {
        var name = getCharacterName(this);
        if (name) {
            return name;
        }
        else {
            return this._characterName;
        }
    };
    Game_Actor.prototype.characterIndex = function () {
        if (this.actorId() > 50) {
            return this._characterIndex;
        }
        var index = getCharacterIndex(this);
        if (index >= 0) {
            return index;
        }
        else {
            return this._characterIndex;
        }
    };
    var _Game_Event_prototype_setImage = Game_Event.prototype.setImage;
    Game_Event.prototype.setImage = function (characterName, characterIndex) {
        _Game_Event_prototype_setImage.call(this, characterName, characterIndex);
        this._actorId = undefined;
    };
    var _Game_Event_prototype_characterName = Game_Event.prototype.characterName;
    Game_Event.prototype.characterName = function () {
        if ($gameSwitches.value(35)) {
            if (!this.page()) {
                return '';
            }
            if (this.page().list.length <= 1) {
                return '';
            }
            var aid = parseInt(this.event().meta['actor']);
            if (aid > 0) {
                if (!Saba.hasMercenary(aid + 400)) {
                    return '';
                }
                if ($gameSwitches.value(444)) {
                    var actorId = $gameVariables.value(19);
                    if (actorId == aid) {
                        return '';
                    }
                }
                return $gameActors.actor(aid).characterName();
            }
            if ($gameSwitches.value(444)) {
                if (this.event().meta['種親']) {
                    var actorId = $gameVariables.value(19);
                    return $gameActors.actor(actorId).characterName();
                }
            }
        }
        if (this._actorId === undefined) {
            var name = this._characterName;
            var n = /actor(\d+)/.exec(name);
            if (!n) {
                this._actorId = null;
                return _Game_Event_prototype_characterName.call(this);
            }
            var actorId = parseInt(n[1]);
            if (actorId >= 7) {
                this._actorId = null;
                return _Game_Event_prototype_characterName.call(this);
            }
            this._actorId = actorId;
        }
        if (this._actorId === null) {
            return _Game_Event_prototype_characterName.call(this);
        }
        var actor = $gameActors.actor(this._actorId);
        if (!actor) {
            this._actorId = null;
            return _Game_Event_prototype_characterName.call(this);
        }
        return getCharacterName(actor);
    };
    var _Game_Event_prototype_characterIndex = Game_Event.prototype.characterIndex;
    Game_Event.prototype.characterIndex = function () {
        if ($gameSwitches.value(35)) {
            var aid = parseInt(this.event().meta['actor']);
            if (aid > 0) {
                return $gameActors.actor(aid).characterIndex() + 4;
            }
        }
        if (this._actorId > 0) {
            var actor = $gameActors.actor(this._actorId);
            return getCharacterIndex(actor);
        }
        var index = _Game_Event_prototype_characterIndex.call(this);
        if ($gameSwitches.value(77) && $gameMap._interpreter._eventId == this.eventId() && index <= 3) {
            return index + 4;
        }
        return index;
    };
    function getCharacterName(actor) {
        var id;
        if (actor.actorId() > 50) {
            return null;
        }
        if (actor.actorId() < 10) {
            id = 'actor0' + actor.actorId();
        }
        else {
            id = 'actor' + actor.actorId();
        }
        if (actor.actorId() == 3 && actor.outerId == 'e') {
            return id;
        }
        var bote = $gameSystem.getEro(actor.actorId()).bote;
        if (bote) {
            if (actor.actorId() <= 4) {
                switch (actor.outerId) {
                    case 'e': return id + 'c-bote';
                    case 'g': return id + 'g-bote';
                }
            }
            return id + '-bote';
        }
        if (actor.actorId() == 5) {
            switch (actor.outerId) {
                case 'a': return id;
                case 'b': return id;
            }
        }
        switch (actor.outerId) {
            case 'a': return id;
            case 'b': return id;
            case 'bb': return id;
            case 'c': return id;
            case 'cc': return id;
            case 'f': return id + '-bote';
            case 'g': return id + actor.outerId;
            case 'e': return id + actor.outerId;
        }
        return id;
    }
    function getCharacterIndex(actor) {
        var bote = $gameSystem.getEro(actor.actorId()).bote;
        if (actor.actorId() == 5) {
            switch (actor.outerId) {
                case 'a': return 6;
                case 'b': return 0;
            }
        }
        if (actor.actorId() == 2) {
            return getCharacterIndex2(actor);
        }
        if (actor.actorId() == 3) {
            return getCharacterIndex3(actor);
        }
        if (actor.actorId() == 4) {
            return getCharacterIndex4(actor);
        }
        switch (actor.outerId) {
            case 'a':
            case 'h':
                if ($gameSwitches.value(880)) {
                    //　セレナ裸
                    return 7;
                }
                if (actor.actorId() == 1 && $gameSwitches.value(886)) {
                    // セレナ出産
                    return 7;
                }
                if (actor.actorId() == 2 && $gameSwitches.value(887)) {
                    // リン出産
                    return 7;
                }
                var index = 0;
                if (actor.outerId == 'a' && actor.actorId() == 1) {
                    index += 4;
                }
                switch (actor.innerTopId) {
                    case 'a':
                        index += 3;
                        break;
                    case 'b':
                    case 'c':
                    case 'd':
                    case 'e':
                    case 'f':
                    case 'g':
                        index += 2;
                        break;
                }
                return index;
            case 'b':
                if (bote) {
                    return 0;
                }
                return 0;
            case 'c': return 2;
            case 'd': return 4;
            case 'f': return 0;
            case 'g': return 0;
            case 'e':
                if ($gameSwitches.value(274)) {
                    return 1;
                }
                else {
                    return 0;
                }
        }
        return -1;
    }
    ;
    function getCharacterIndex2(actor) {
        if ($gameSwitches.value(887)) {
            // リン出産
            return 7;
        }
        var index = 0;
        if (!actor.acceMap[263]) {
            index += 4;
        }
        if (actor.outerId == 'b') {
            return index;
        }
        if (actor.outerId == 'h') {
            return index + 1;
        }
        if (actor.innerTopId != 'a') {
            return index + 2;
        }
        else {
            return index + 3;
        }
    }
    function getCharacterIndex3(actor) {
        if ($gameSwitches.value(888)) {
            // ロナ出産
            return 7;
        }
        var index = 0;
        if (actor.acceMap[298]) {
            index += 4;
        }
        if (actor.outerId == 'b') {
            return index;
        }
        if (actor.outerId == 'a') {
            return index + 3;
        }
        if (actor.outerId == 'd') {
            return index + 2;
        }
        else {
            return index + 1;
        }
    }
    function getCharacterIndex4(actor) {
        if ($gameSwitches.value(883)) {
            // ソフィア出産
            return 7;
        }
        var index = 0;
        if (!actor.acceMap[302]) {
            index += 4;
        }
        if (actor.outerId == 'b') {
            return index;
        }
        if (actor.innerBottomId == 'b') {
            return index + 1;
        }
        else {
            return index + 3;
        }
    }
    var _Game_Event_prototype_screenX = Game_Event.prototype.screenX;
    Game_Event.prototype.screenX = function () {
        var x = _Game_Event_prototype_screenX.call(this);
        if ($gameSwitches.value(77) && $gameMap._interpreter._eventId == this.eventId()) {
            if ($gamePlayer.screenX() > x) {
                this._direction = 6;
                return x + 36;
            }
            else if ($gamePlayer.screenX() < x) {
                this._direction = 4;
                return x - 36;
            }
        }
        return x;
    };
    var _Game_Event_prototype_screenY = Game_Event.prototype.screenY;
    Game_Event.prototype.screenY = function () {
        var y = _Game_Event_prototype_screenY.call(this);
        if ($gameSwitches.value(77) && $gameMap._interpreter._eventId == this.eventId()) {
            if ($gamePlayer.screenY() > y) {
                this._direction = 2;
                return y + 36;
            }
            else if ($gamePlayer.screenY() < y) {
                this._direction = 8;
                return y - 36;
            }
        }
        return y;
    };
    Saba.actorCashedSprites = {};
    Window_MenuStatus.prototype.processOk = function () {
        $gameParty.setMenuActor($gameParty.members()[this.index()]);
        Window_Selectable.prototype.processOk.call(this);
    };
    Game_Actor.prototype.getCashedSprite = function () {
        var s = Saba.actorCashedSprites[this.actorId()];
        if (s) {
            var renderTexture = $gameTemp.getActorBitmapBodyCache(this.actorId());
            var t = new PIXI.Texture(renderTexture);
            return new PIXI.Sprite(t);
        }
        return null;
    };
})(Saba || (Saba = {}));

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
    Game_Followers.prototype.initialize = function () {
        this._visible = $dataSystem.optFollowers;
        this._gathering = false;
        this.clear();
    };
    Game_Followers.prototype.clear = function () {
        this._data = [];
        if ($gameSwitches.value(243)) {
            this._data.push(new Game_Follower3(1));
        }
        else {
            for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
                var m = _a[_i];
                if (m.isMercenary()) {
                    var members = m.getAliveMembers();
                    for (var _b = 0, members_1 = members; _b < members_1.length; _b++) {
                        var mem = members_1[_b];
                        this._data.push(new Game_Follower2(mem));
                    }
                }
                else {
                    if (m.actorId() == 1) {
                        continue;
                    }
                    this._data.push(new Game_Follower3(m.actorId()));
                    //this._data.push(new Game_Follower(2));
                }
            }
        }
    };
    var _Game_Player_prototype_characterName = Game_Player.prototype.characterName;
    Game_Player.prototype.characterName = function () {
        if ($gameSwitches.value(447)) {
            // リン
            return $gameActors.actor(5).characterName();
        }
        if ($gameSwitches.value(243)) {
            var armor = $dataArmors[$gameTemp.mercenaryId];
            var actor = $gameActors.actor(parseInt(armor.meta['actor']));
            return actor.characterName();
        }
        else if ($gameSwitches.value(274)) {
            return $gameActors.actor(2).characterName();
        }
        else {
            return _Game_Player_prototype_characterName.call(this);
        }
    };
    var _Game_Player_prototype_characterIndex = Game_Player.prototype.characterIndex;
    var _Game_Actor_prototype_characterIndex = Game_Actor.prototype.characterIndex;
    Game_Player.prototype.characterIndex = function () {
        if ($gameSwitches.value(243)) {
            var armor = $dataArmors[$gameTemp.mercenaryId];
            var actor = $gameActors.actor(parseInt(armor.meta['actor']));
            if ($gameSwitches.value(32)) {
                return actor.characterIndex() + 4;
            }
            else {
                return actor.characterIndex();
            }
        }
        else {
            if ($gameSwitches.value(447)) {
                return $gameActors.actor(5).characterIndex();
            }
            else if ($gameSwitches.value(274)) {
                return $gameActors.actor(2).characterIndex();
            }
            else {
                return $gameActors.actor(1).characterIndex();
            }
            return _Game_Actor_prototype_characterIndex.call(this);
        }
    };
})(Saba || (Saba = {}));
var Game_Follower3 = /** @class */ (function (_super) {
    __extends(Game_Follower3, _super);
    function Game_Follower3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Game_Follower3.prototype.actor = function () {
        return $gameActors.actor(this._memberIndex);
    };
    return Game_Follower3;
}(Game_Follower));
function Game_Follower2() {
    this.initialize.apply(this, arguments);
}
Game_Follower2.prototype = Object.create(Game_Character.prototype);
Game_Follower2.prototype.constructor = Game_Follower2;
Game_Follower2.prototype.initialize = function (armor) {
    Game_Character.prototype.initialize.call(this);
    this._armor = armor;
    this.setTransparent($dataSystem.optTransparent);
    this.setThrough(true);
};
Game_Follower2.prototype.refresh = function () {
    var actor = $gameActors.actor(this._armor.meta['actor']);
    var characterName = this.isVisible() ? actor.characterName() : '';
    var characterIndex = this.isVisible() ? actor.characterIndex() : '';
    this.setImage(characterName, characterIndex);
};
Game_Follower2.prototype.isVisible = function () {
    return $gamePlayer.followers().isVisible();
};
Game_Follower2.prototype.update = function () {
    Game_Character.prototype.update.call(this);
    this.setMoveSpeed($gamePlayer.realMoveSpeed());
    this.setOpacity($gamePlayer.opacity());
    this.setBlendMode($gamePlayer.blendMode());
    this.setWalkAnime($gamePlayer.hasWalkAnime());
    this.setStepAnime($gamePlayer.hasStepAnime());
    this.setDirectionFix($gamePlayer.isDirectionFixed());
    this.setTransparent($gamePlayer.isTransparent());
};
Game_Follower2.prototype.chaseCharacter = function (character) {
    var sx = this.deltaXFrom(character.x);
    var sy = this.deltaYFrom(character.y);
    if (sx !== 0 && sy !== 0) {
        this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
    }
    else if (sx !== 0) {
        this.moveStraight(sx > 0 ? 4 : 6);
    }
    else if (sy !== 0) {
        this.moveStraight(sy > 0 ? 8 : 2);
    }
    this.setMoveSpeed($gamePlayer.realMoveSpeed());
};

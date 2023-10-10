var Saba;
(function (Saba) {
    Game_Actor.prototype.isSpriteVisible = function () {
        return true;
    };
    Sprite_Actor.prototype.updateBitmap = function () {
    };
    Sprite_Actor.prototype.updateMotion = function () {
    };
    Sprite_Actor.prototype.startEntryMotion = function () {
    };
    Sprite_Actor.prototype.createShadowSprite = function () {
    };
    Sprite_Actor.prototype.updateShadow = function () {
    };
    Sprite_Actor.prototype.damageOffsetY = function () {
        return 10;
    };
    Sprite_Actor.prototype.damageOffsetX = function () {
        return -40;
    };
    Sprite_Enemy.prototype.damageOffsetY = function () {
        if (this._homeY > 510) {
            return 510 - this._homeY - 46;
        }
        return -46;
    };
    Sprite_Actor.prototype.setActorHome = function (index) {
        this.setHome(505, 592 + index * 30);
    };
    Sprite_Actor.prototype.setBattler = function (battler) {
        Sprite_Battler.prototype.setBattler.call(this, battler);
        var changed = (battler !== this._actor);
        if (changed) {
            this._actor = battler;
            if (battler) {
                this.setActorHome(battler.index());
            }
            this.startEntryMotion();
            //this._stateSprite.setup(battler);
        }
    };
    Spriteset_Battle.prototype.createActors = function () {
        this._actorSprites = [];
        for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
            this._actorSprites[i] = new Sprite_Actor(null, this._animeParent);
            this._animeParent.addChild(this._actorSprites[i]);
        }
    };
    Sprite_Actor.prototype.startMove = function (x, y, duration) {
    };
    Sprite_Animation.prototype.updatePosition = function () {
        if (this._animation.position === 3) {
            this.x = this.parent.width / 2;
            this.y = this.parent.height / 2;
            if (this._target.parent._actor) {
                this.x = 505;
                this.y = 690;
            }
        }
        else {
            var parent = this._target.parent;
            var grandparent = parent ? parent.parent : null;
            this.x = this._target.x;
            this.y = this._target.y;
            if (this.parent === grandparent) {
                this.x += parent.x;
                this.y += parent.y;
            }
            if (this._animation.position === 0) {
                this.y -= this._target.height;
            }
            else if (this._animation.position === 1) {
                this.y -= this._target.height / 2;
            }
            if (this._target instanceof Sprite_Enemy) {
                if (this.y > 500) {
                    this.y = 500;
                }
            }
        }
    };
    var _Scene_Battle_prototype_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function () {
        this._animeSprite = new Sprite_Base();
        _Scene_Battle_prototype_createDisplayObjects.call(this);
        this.addChild(this._animeSprite);
    };
    Scene_Battle.prototype.createSpriteset = function () {
        this._spriteset = new Spriteset_Battle(this._animeSprite);
        this.addChild(this._spriteset);
    };
    var _Spriteset_Battle_prototype_initialize = Spriteset_Battle.prototype.initialize;
    Spriteset_Battle.prototype.initialize = function (animeParent) {
        this._animeParent = animeParent;
        _Spriteset_Battle_prototype_initialize.call(this);
    };
    var _Sprite_Actor_prototype_initialize = Sprite_Actor.prototype.initialize;
    Sprite_Actor.prototype.initialize = function (battler, animeParent) {
        this._animeParent = animeParent;
        _Sprite_Actor_prototype_initialize.call(this, battler);
    };
    Window_BattleLog.prototype.waitForMovement = function () {
        //this.setWaitMode('movement');
    };
    /*Sprite_Actor.prototype.startAnimation = function (animation, mirror, delay) {
        var sprite = new Sprite_Animation();
        sprite.x = this._homeX;
        sprite.y = this._homeY;
        sprite.setup(this._effectTarget, animation, mirror, delay);
        this._animeParent.addChild(sprite);
        this._animationSprites.push(sprite);
    };*/
})(Saba || (Saba = {}));

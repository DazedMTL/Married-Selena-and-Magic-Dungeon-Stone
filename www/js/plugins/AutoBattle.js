var Saba;
(function (Saba) {
    Saba._isAutoBattle = false;
    var _Scene_Battle_prototype_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function () {
        Saba._isAutoBattle = false;
        _Scene_Battle_prototype_start.call(this);
    };
    var _Scene_Battle_prototype_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function () {
        Saba._isAutoBattle = false;
        _Scene_Battle_prototype_terminate.call(this);
    };
    var _Scene_Battle_prototype_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function () {
        _Scene_Battle_prototype_update.call(this);
        if (Saba._isAutoBattle) {
            if (Input.isTriggered('cancel') || Input.isTriggered('pagedown')) {
                Saba._isAutoBattle = false;
                SoundManager.playCancel();
                this._spriteset._enemyHpSprite.refresh();
            }
        }
        else {
            if (Input.isTriggered('pagedown')) {
                if (!$gameTemp.analyze) {
                    this.startAuto();
                }
            }
            if (this._actorCommandWindow && this._actorCommandWindow.active) {
                if (Input.isTriggered('pageup')) {
                    SoundManager.playOk();
                    $gameTemp.analyze = true;
                    this._spriteset.refreshHp();
                    this._actorCommandWindow.active = false;
                }
            }
            else if ($gameTemp.analyze) {
                if (Input.isTriggered('pageup') || Input.isTriggered('cancel')) {
                    this._actorCommandWindow.activate();
                    SoundManager.playCancel();
                    $gameTemp.analyze = false;
                    this._spriteset.refreshHp();
                }
            }
        }
    };
    var _Scene_Battle_prototype_updateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
    Scene_Battle.prototype.updateBattleProcess = function () {
        if ($gameTemp.analyze) {
            return;
        }
        _Scene_Battle_prototype_updateBattleProcess.call(this);
    };
    Scene_Battle.prototype.startAuto = function () {
        Saba._isAutoBattle = true;
        SoundManager.playOk();
        if (BattleManager.isInputting()) {
            this._actorCommandWindow.active = false;
            if (BattleManager.inputtingAction()) {
                this.commandAttack();
                BattleManager.inputtingAction().setAttack();
                var action = BattleManager.inputtingAction();
                action.setTarget(0);
                this.selectEnemySelection();
                this._tachieSprite.update();
                this.onEnemyOk();
                this._enemyWindow.active = false;
                this._spriteset._enemyHpSprite.refresh();
            }
        }
    };
    var _Sprite_EnemyHp_prototype_refresh = Saba.Sprite_EnemyHp.prototype.refresh;
    Saba.Sprite_EnemyHp.prototype.refresh = function () {
        if (!this._updated) {
            return;
        }
        _Sprite_EnemyHp_prototype_refresh.call(this);
        this._drawAutoBattle();
    };
    Saba.Sprite_EnemyHp.prototype._drawAutoBattle = function () {
        if (!Saba._isAutoBattle) {
            return;
        }
        var baseTexture = Saba.getSystemBaseTexture('auto_battle');
        var bg = new PIXI.Sprite(new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 0, 250, 50)));
        bg.x = 800;
        bg.y = 130;
        this.addChild(bg);
    };
    var _Window_BattleLog_prototype_isFastForward = Window_BattleLog.prototype.isFastForward;
    Window_BattleLog.prototype.isFastForward = function () {
        if (Saba._isAutoBattle) {
            return true;
        }
        return _Window_BattleLog_prototype_isFastForward.call(this);
    };
    Sprite_Animation.prototype.isSkip = function () {
        if (_Window_BattleLog_prototype_isFastForward.call(this) || Saba._isAutoBattle) {
            return true;
        }
        else {
            return false;
        }
    };
    Sprite_Animation.prototype.updateMain = function () {
        if (this.isPlaying() && this.isReady()) {
            if (this._delay > 0) {
                this._delay--;
            }
            else {
                this._duration--;
                this.updatePosition();
                if (this._duration % this._rate === 0) {
                    this.updateFrame();
                }
                if (this.isSkip() || isBattleFast()) {
                    this._duration--;
                    this.updatePosition();
                    if (this._duration % this._rate === 0) {
                        this.updateFrame();
                    }
                }
            }
        }
    };
})(Saba || (Saba = {}));

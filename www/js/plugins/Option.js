var Saba;
(function (Saba) {
    ConfigManager.skipKey = false;
    var _Window_Options_prototype_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function () {
        _Window_Options_prototype_addGeneralOptions.call(this);
        this.addCommand('Skip', 'skipKey');
        this.addCommand('Battle Speed', 'battleSpeed');
    };
    var _Window_Options_prototype_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function () {
        _Window_Options_prototype_makeCommandList.call(this);
        this.addCommand('Cancel', 'gameEnd', true);
    };
    var _Window_Options_prototype_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function (index) {
        var symbol = this.commandSymbol(index);
        var value = this.getConfigValue(symbol);
        if (symbol == 'skipKey') {
            return value ? 'Ctrl' : 'Shift';
        }
        if (symbol == 'battleSpeed') {
            return value ? 'Fast' : 'Normal';
        }
        if (symbol == 'gameEnd') {
            return '';
        }
        return _Window_Options_prototype_statusText.call(this, index);
    };
    var _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function () {
        if (this.commandSymbol(this.index()) === 'gameEnd') {
            Window_Command.prototype.processOk.call(this);
        }
        else {
            _Window_Options_processOk.call(this);
        }
    };
    var _Scene_Options_createOptionsWindow = Scene_Options.prototype.createOptionsWindow;
    Scene_Options.prototype.createOptionsWindow = function () {
        _Scene_Options_createOptionsWindow.call(this);
        this._optionsWindow.setHandler('gameEnd', function () {
            if (SceneManager._stack[0] === Scene_Title) {
                SceneManager.pop();
            }
            else {
                SceneManager.push(Scene_GameEnd);
            }
        });
    };
    Scene_GameEnd.prototype.commandToTitle = function () {
        this.fadeOutAll();
        if ($fple) {
            Graphics.terminateFPLE();
            $fple.terminate();
            $fple = null;
        }
        SceneManager.goto(Scene_Title);
    };
    var _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function () {
        var config = _ConfigManager_makeData.call(this);
        config.skipKey = this.skipKey;
        config.battleSpeed = this.battleSpeed;
        return config;
    };
    var _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
        _ConfigManager_applyData.call(this, config);
        this.skipKey = this.readFlag(config, 'skipKey');
        this.battleSpeed = config['battleSpeed'];
        if (this.battleSpeed === undefined) {
            this.battleSpeed = true;
        }
    };
    Game_Interpreter.prototype.releaseSpriteSheet = function (file) {
        var path = 'img/ero/' + file + '.json';
        this.releaseSpriteSheetPath(path);
    };
    Game_Interpreter.prototype.releaseSpriteSheetPath = function (path) {
        var sheet = Saba.spriteSheetCache[path];
        if (!sheet) {
            console.error(path);
            return;
        }
        delete Saba.spriteSheetCache[path];
        p('release:' + path);
        var baseTex = null;
        for (var key in sheet.textures) {
            sheet.textures[key].destroy(true);
            baseTex = sheet.textures[key].baseTexture;
        }
        PIXI.Texture.removeFromCache(PIXI.utils.TextureCache[path]);
        PIXI.Texture.removeFromCache(PIXI.utils.TextureCache[path + '_image']);
        if (baseTex) {
            baseTex.destroy(true);
            Graphics.callGC();
        }
    };
})(Saba || (Saba = {}));
function getSkipKey() {
    if (ConfigManager.skipKey) {
        return 'control';
    }
    return 'shift';
}
function isBattleFast() {
    return ConfigManager.battleSpeed;
}

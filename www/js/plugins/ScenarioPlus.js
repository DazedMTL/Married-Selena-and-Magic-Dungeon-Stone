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
    var _Game_Temp_prototype_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function () {
        _Game_Temp_prototype_initialize.call(this);
        this.ignoreFiles = {};
    };
    Game_Temp.prototype.addIgnoreFiles = function (list) {
        if (!list) {
            return;
        }
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var file = list_1[_i];
            this.ignoreFiles[file] = true;
        }
    };
    Game_Temp.prototype.clearIgnoreFiles = function () {
        this.ignoreFiles = {};
    };
    var SimpleScenario;
    (function (SimpleScenario) {
        var CG_PICTURE_ID1 = 15;
        var CG_PICTURE_ID2 = 16;
        var WAIT_MODE_MOVIE_START = 1;
        var WAIT_MODE_MOVIE_END = 2;
        var cgFolder = 'ero';
        var jpegPrefix = '__CG_JPG__';
        SimpleScenario.webpPrefix = '__CG_WEBP__';
        ImageManager.preloadEro = function (filename, hue, smooth) {
            var folder = 'img/ero/';
            if (filename) {
                var path = folder + encodeURIComponent(filename) + '.jpg';
                var key = path + ':' + hue;
                this.cache2 = this.cache2 || {};
                if (!this._cache2[key]) {
                    this.loadNormalBitmap2(path, hue || 0);
                }
            }
        };
        ImageManager.loadEro = function (filename, hue, smooth) {
            return this.loadBitmap('img/' + cgFolder + '/', filename, hue, true);
        };
        ImageManager.loadSabaWebp = function (filename, hue) {
            return this.loadWebp('img/' + cgFolder + '/', filename, hue, true);
        };
        ImageManager.loadWebp = function (folder, filename, hue, smooth) {
            if (filename) {
                var path = folder + encodeURIComponent(filename) + '.webp';
                var bitmap = this.loadNormalBitmap2(path, hue || 0);
                bitmap.smooth = smooth;
                return bitmap;
            }
            else {
                return this.loadEmptyBitmap();
            }
        };
        ImageManager.loadSabaJpeg = function (filename, hue) {
            return this.loadJpeg('img/' + cgFolder + '/', filename, hue, true);
        };
        ImageManager.loadJpeg = function (folder, filename, hue, smooth) {
            if (filename) {
                var path = folder + encodeURIComponent(filename) + '.jpg';
                var bitmap = this.loadNormalBitmap2(path, hue || 0);
                bitmap.smooth = smooth;
                return bitmap;
            }
            else {
                return this.loadEmptyBitmap();
            }
        };
        ImageManager.loadNormalBitmap2 = function (path, hue) {
            var key = path + ':' + hue;
            this.cache2 = this.cache2 || {};
            var bitmap = this.cache2[key];
            if (!bitmap) {
                bitmap = Bitmap.load(path);
                bitmap.addLoadListener(function () {
                    bitmap.rotateHue(hue);
                });
                this.cache2[key] = bitmap;
            }
            return bitmap;
        };
        ImageManager.clearEro = function () {
            this.cache2 = this.cache2 || {};
            for (var key in this.cache2) {
                this.cache2[key].destroy();
            }
            this.cache2 = {};
        };
        var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            if (command == 'Tachie' && args[0] === 'preloadJpg') {
                var file = args[1];
                ImageManager.loadSabaJpeg(file);
                return;
            }
            if (command == 'Tachie' && args[0] === 'preloadWebp') {
                var file = args[1];
                var file = 'img/ero/ero' + file + '.json';
                ImageManager.loadSpriteSheet(file);
                this.setWaitMode('image');
                return;
            }
            if (command == 'Tachie' && args[0] === 'bote') {
                var actor = parseInt(args[1]);
                var type = parseInt(args[2]);
                $gameSystem.getEro(actor).bote = type;
                $gameActors.actor(actor).setDirty();
                return;
            }
            if (command == 'WaitMovie') {
                this._waitForMovieMode = WAIT_MODE_MOVIE_START;
                return;
            }
            _Game_Interpreter_pluginCommand.call(this, command, args);
        };
        var _Sprite_Picture_loadBitmap = Sprite_Picture.prototype.loadBitmap;
        Sprite_Picture.prototype.loadBitmap = function () {
            if (this._pictureName.indexOf(jpegPrefix) === 0) {
                this.eroAnime = null;
                this.bitmap = ImageManager.loadSabaJpeg(this._pictureName.substr(jpegPrefix.length));
            }
            else if (this._pictureName.indexOf(SimpleScenario.webpPrefix) === 0) {
                var file = this._pictureName.substr(SimpleScenario.webpPrefix.length);
                if (file.length <= 10) {
                    this.eroAnime = null;
                    this.drawEro(file);
                }
                else {
                    try {
                        var json = JSON.parse(file);
                        var wait = Math.floor(json.wait);
                        this.eroAnime = json.pic;
                        this.eroAnimeIndex = 0;
                        this.eroAnimeWait = wait;
                        this.eroAnimeFrameIndex = 0;
                        this.eroSeIndex = json.seIndex;
                        this.eroSeList = json.se;
                        this.drawEro(this.eroAnime[this.eroAnimeIndex]);
                    }
                    catch (e) {
                        p(file);
                        throw e;
                    }
                }
            }
            else {
                _Sprite_Picture_loadBitmap.call(this);
            }
        };
        Sprite_Picture.prototype.drawEro = function (file) {
            var renderTexture = $gameTemp.getActorBitmapBodyCache(this._pictureId);
            var s = new PIXI.Sprite();
            if ($gameTemp.eroBack) {
                this.drawEro2(s, $gameTemp.eroBack);
            }
            for (var i = 1; i <= 7; i++) {
                this.drawEro2(s, file + '_0' + i);
            }
            Graphics._renderer.render(s, renderTexture);
            var sprite = new PIXI.Sprite(renderTexture);
            this.removeChildren();
            this.addChild(sprite);
        };
        Sprite_Picture.prototype.drawEro2 = function (s, file) {
            if ($gameTemp.ignoreFiles[file]) {
                return;
            }
            var texture = PIXI.utils.TextureCache[file + '.png'];
            if (!texture) {
                return;
            }
            var sprite = new PIXI.Sprite(texture);
            s.addChild(sprite);
            //sprite.destroy({ children: true, texture: true });
        };
        var _Sprite_Picture_prototype_updateBitmap = Sprite_Picture.prototype.updateBitmap;
        Sprite_Picture.prototype.updateBitmap = function () {
            _Sprite_Picture_prototype_updateBitmap.call(this);
            if (this.invisible) {
                this.visible = false;
            }
        };
        var _Scenario_Converter_convertCommand_start = SimpleScenario.Scenario_Converter.prototype.convertCommand_start;
        var _Scenario_Converter = /** @class */ (function (_super) {
            __extends(_Scenario_Converter, _super);
            function _Scenario_Converter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            _Scenario_Converter.prototype.convertCommand_jpg = function (context) {
                var file = context.headerStr('file');
                var wait = context.headerInt('wait', 60);
                var scale = 100;
                var id;
                if (this._eroIndex === -1) {
                    this._eroIndex = 1;
                    id = CG_PICTURE_ID1;
                    context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, jpegPrefix + file, 0, 0, 0, 0, scale, scale, 0, 0] });
                    context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, wait, true] });
                    this._eroIndex = 0;
                }
                else if (this._eroIndex === 0) {
                    id = CG_PICTURE_ID2;
                    if (wait > 0) {
                        context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, jpegPrefix + file, 0, 0, 0, 0, scale, scale, 0, 0] });
                        context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, wait, true] });
                    }
                    else {
                        context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, jpegPrefix + file, 0, 0, 0, 0, scale, scale, 255, 0] });
                    }
                    this._eroIndex = 1;
                }
                else {
                    id = CG_PICTURE_ID1;
                    context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, jpegPrefix + file, 0, 0, 0, 0, scale, scale, 255, 0] });
                    id = CG_PICTURE_ID2;
                    if (wait > 0) {
                        context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, 2, true] });
                        context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 0, 0, wait, true] });
                    }
                    else {
                        context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 0, 0, 1, true] });
                    }
                    this._eroIndex = 0;
                }
                context.insertTop({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie preloadJpg " + file] });
            };
            _Scenario_Converter.prototype.convertCommand_restore = function (context) {
                var file = context.headerStr('file');
                context.push({ 'code': 355, 'indent': this.indent, 'parameters': ["$gameSystem.restoreEvent('" + file + "')"] });
            };
            _Scenario_Converter.prototype.convertCommand_ero_back = function (context) {
                var file = context.headerStr('file');
                context.insertTop({ 'code': 355, 'indent': this.indent, 'parameters': ["$gameTemp.eroBack='" + file + "'"] });
            };
            _Scenario_Converter.prototype.convertCommand_reco = function (context) {
                var id = context.headerStr('id');
                context.insertTop({ 'code': 355, 'indent': this.indent, 'parameters': ["this.reco(" + id + ")"] });
            };
            _Scenario_Converter.prototype.convertCommand_ero = function (context) {
                var file = context.headerStr('file');
                var wait = context.headerInt('wait', 20);
                var scale = 100;
                var id;
                if (this._eroIndex === -1) {
                    this._eroIndex = 1;
                    id = CG_PICTURE_ID1;
                    context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, SimpleScenario.webpPrefix + file, 0, 0, 0, 0, scale, scale, 0, 0] });
                    context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, wait, true] });
                    this._eroIndex = 0;
                }
                else if (this._eroIndex === 0) {
                    id = CG_PICTURE_ID2;
                    if (wait > 0) {
                        context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, SimpleScenario.webpPrefix + file, 0, 0, 0, 0, scale, scale, 0, 0] });
                        context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, wait, true] });
                    }
                    else {
                        context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, SimpleScenario.webpPrefix + file, 0, 0, 0, 0, scale, scale, 255, 0] });
                    }
                    this._eroIndex = 1;
                }
                else {
                    id = CG_PICTURE_ID1;
                    context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, SimpleScenario.webpPrefix + file, 0, 0, 0, 0, scale, scale, 255, 0] });
                    id = CG_PICTURE_ID2;
                    if (wait > 0) {
                        context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, 2, true] });
                        context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 0, 0, wait, true] });
                    }
                    else {
                        context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 0, 0, 1, true] });
                    }
                    this._eroIndex = 0;
                }
            };
            _Scenario_Converter.prototype.convertCommand_eroUp = function (context) {
                var id = context.headerInt('id');
                context.push({ 'code': 355, 'indent': this.indent, 'parameters': ["this.eroUp('" + id + "')"] });
            };
            _Scenario_Converter.prototype.convertCommand_eroAnime = function (context) {
                var files = context.headerStr('files').split(',');
                var wait = context.headerInt('wait', 4);
                var se = context.header['se'] ? JSON.parse(context.headerStr('se')) : '';
                var seIndex = context.headerInt('seIndex', -1);
                var reverse = context.headerBool('reverse', true);
                var json = {};
                json.wait = wait;
                json.seIndex = seIndex;
                json.se = se;
                var fileList = [];
                for (var i = 0; i < files.length; i++) {
                    var f = files[i];
                    fileList.push(f);
                }
                if (reverse) {
                    for (var i = files.length - 1; i >= 1; i--) {
                        var f = files[i];
                        fileList.push(f);
                    }
                }
                json.pic = fileList;
                var jsonStr = JSON.stringify(json);
                var scale = 100;
                var id;
                if (this._eroIndex === -1) {
                    this._eroIndex = 1;
                    id = CG_PICTURE_ID1;
                    context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, SimpleScenario.webpPrefix + jsonStr, 0, 0, 0, 0, scale, scale, 0, 0] });
                    context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, wait, true] });
                    this._eroIndex = 0;
                }
                else if (this._eroIndex === 0) {
                    id = CG_PICTURE_ID2;
                    if (wait > 0) {
                        context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, SimpleScenario.webpPrefix + jsonStr, 0, 0, 0, 0, scale, scale, 0, 0] });
                        context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, wait, true] });
                    }
                    else {
                        context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, SimpleScenario.webpPrefix + fileList, 0, 0, 0, 0, scale, scale, 255, 0] });
                    }
                    this._eroIndex = 1;
                }
                else {
                    id = CG_PICTURE_ID1;
                    context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, SimpleScenario.webpPrefix + jsonStr, 0, 0, 0, 0, scale, scale, 255, 0] });
                    id = CG_PICTURE_ID2;
                    if (wait > 0) {
                        context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, 2, true] });
                        context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 0, 0, wait, true] });
                    }
                    else {
                        context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 0, 0, 1, true] });
                    }
                    this._eroIndex = 0;
                }
            };
            _Scenario_Converter.prototype.convertCommand_waitmov = function (context) {
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ['WaitMovie'] });
            };
            _Scenario_Converter.prototype.convertCommand_start = function (context) {
                _Scenario_Converter_convertCommand_start.call(this, context);
                this._eroIndex = -1;
                this.defaultPosMap = { 1: Saba.Tachie.RIGHT_POS, 2: Saba.Tachie.LEFT_POS, 3: Saba.Tachie.LEFT_POS, 4: Saba.Tachie.LEFT_POS, 5: Saba.Tachie.LEFT_POS, 6: Saba.Tachie.LEFT_POS, 7: Saba.Tachie.LEFT_POS, 8: Saba.Tachie.LEFT_POS, 9: Saba.Tachie.LEFT_POS, 11: Saba.Tachie.LEFT_POS, 13: Saba.Tachie.LEFT_POS, 16: Saba.Tachie.LEFT_POS, 17: Saba.Tachie.CENTER_POS, 18: Saba.Tachie.CENTER_POS, 19: Saba.Tachie.CENTER_POS };
                this._ninshinTotal = 0;
                this._defaultMobNameMap = {};
                this._defaultMobFaceMap = {};
                $gameTemp.lastMovie = null;
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie notClose on"] });
            };
            _Scenario_Converter.prototype.convertCommand_load_ero = function (context) {
                var file = context.headerStr('file');
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie preloadWebp " + file] });
            };
            _Scenario_Converter.prototype.convertCommand_vib = function (context) {
                var name = 'vib';
                var volume = context.headerInt('volume', 80);
                var pitch = context.headerInt('pitch', 100);
                var pan = context.headerInt('pan', 0);
                var se = { name: name, volume: volume, pitch: pitch, pan: pan };
                context.push({ 'code': 245, 'indent': this.indent, 'parameters': [se] });
            };
            _Scenario_Converter.prototype.convertCommand_ninshinShow = function (context) {
                if (this.defaultPosMap[2] == Saba.Tachie.RIGHT_POS) {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Ninshin show 2"] });
                }
                else if (this.defaultPosMap[3] == Saba.Tachie.RIGHT_POS) {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Ninshin show 3"] });
                }
                else if (this.defaultPosMap[4] == Saba.Tachie.RIGHT_POS) {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Ninshin show 4"] });
                }
                else {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Ninshin show 1"] });
                }
            };
            _Scenario_Converter.prototype.convertCommand_ninshinHide = function (context) {
                if (this.defaultPosMap[2] == Saba.Tachie.LEFT_POS) {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Ninshin hide 2"] });
                }
                else if (this.defaultPosMap[3] == Saba.Tachie.LEFT_POS) {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Ninshin hide 3"] });
                }
                else if (this.defaultPosMap[4] == Saba.Tachie.LEFT_POS) {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Ninshin hide 4"] });
                }
                else {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Ninshin hide 1"] });
                }
            };
            _Scenario_Converter.prototype.convertCommand_ninshin = function (context) {
                var value = context.headerInt('value');
                if (this.defaultPosMap[2] == Saba.Tachie.RIGHT_POS) {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Ninshin damage 2 " + value] });
                }
                else if (this.defaultPosMap[3] == Saba.Tachie.RIGHT_POS) {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Ninshin damage 3 " + value] });
                }
                else if (this.defaultPosMap[4] == Saba.Tachie.RIGHT_POS) {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Ninshin damage 4 " + value] });
                }
                else {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Ninshin damage 1 " + value] });
                }
                this._ninshinTotal += value;
                //context.push({'code': 122, 'indent': this.indent, 'parameters': [121, 121, 0, 0, value]});
                //context.push({'code': 117, 'indent': this.indent, 'parameters': [882]});
            };
            _Scenario_Converter.prototype.convertCommand_hide = function (context) {
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie notClose off"] });
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hide"] });
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hideName"] });
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hideBalloon"] });
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie clearWindowColor"] });
                context.push({ 'code': 117, 'indent': this.indent, 'parameters': [321] });
            };
            _Scenario_Converter.prototype.convertCommand_se_pan = function (context) {
                var name = 'se_pan';
                var volume = context.headerInt('volume', 100);
                var pitch = context.headerInt('pitch', 100);
                var pan = context.headerInt('pan', 0);
                var se = { name: name, volume: volume, pitch: pitch, pan: pan };
                context.push({ 'code': 250, 'indent': this.indent, 'parameters': [se] });
            };
            _Scenario_Converter.prototype.convertCommand_se_sei = function (context) {
                var name = 'se_sei';
                var volume = context.headerInt('volume', 100);
                var pitch = context.headerInt('pitch', 100);
                var pan = context.headerInt('pan', 0);
                var se = { name: name, volume: volume, pitch: pitch, pan: pan };
                context.push({ 'code': 250, 'indent': this.indent, 'parameters': [se] });
            };
            _Scenario_Converter.prototype.convertCommand_se_sounyu = function (context) {
                var name = 'se_sounyu';
                var volume = context.headerInt('volume', 100);
                var pitch = context.headerInt('pitch', 100);
                var pan = context.headerInt('pan', 0);
                var se = { name: name, volume: volume, pitch: pitch, pan: pan };
                context.push({ 'code': 250, 'indent': this.indent, 'parameters': [se] });
            };
            _Scenario_Converter.prototype.convertCommand_se_nugi = function (context) {
                var name = 'Equip2';
                var volume = context.headerInt('volume', 100);
                var pitch = context.headerInt('pitch', 100);
                var pan = context.headerInt('pan', 0);
                var se = { name: name, volume: volume, pitch: pitch, pan: pan };
                context.push({ 'code': 250, 'indent': this.indent, 'parameters': [se] });
            };
            _Scenario_Converter.prototype.convertCommand_effect = function (context) {
                var name = '0effect_effect_0' + context.headerInt('type');
                var layer = 21;
                var file = name;
                var origin = context.header['origin'] === 'center' ? 1 : 0;
                var type = context.header['type'] === 'var' ? 1 : 0;
                var x = context.headerInt('x', 0);
                var y = context.headerInt('y', 0);
                var zoomX = context.headerInt('zoom_x', 100);
                var zoomy = context.headerInt('zoom_y', 100);
                var opacity = context.headerInt('transparent', 255);
                var blend = context.headerInt('blend', 0);
                context.push({ 'code': 231, 'indent': this.indent, 'parameters': [layer, file, origin, type, x, y, zoomX, zoomy, opacity, blend, true] });
            };
            _Scenario_Converter.prototype.convertCommand_hide_effect = function (context) {
                var layer = 21;
                context.push({ 'code': 235, 'indent': this.indent, 'parameters': [layer, true] });
            };
            _Scenario_Converter.prototype.convertCommand_bote = function (context) {
                var actor = context.headerInt('actor');
                var type = context.headerStr('type');
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie bote " + actor + " " + type] });
            };
            _Scenario_Converter.prototype.convertCommand_outer = function (context) {
                var actor = context.headerInt('actor');
                var outer = context.headerStr('outer');
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie outer " + actor + " " + outer] });
            };
            _Scenario_Converter.prototype.convertCommand_innerBottom = function (context) {
                var actor = context.headerInt('actor');
                var inner = context.headerStr('inner');
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie innerBottom " + actor + " " + inner] });
            };
            _Scenario_Converter.prototype.convertCommand_if_shojo = function (context) {
                var actor = 1;
                for (var i = 2; i <= 4; i++) {
                    if (this.defaultPosMap[i] == Saba.Tachie.LEFT_POS) {
                        actor = i;
                        break;
                    }
                }
                this.indent++;
                var ifnum = 0;
                var id = 80 + actor;
                var flag = 1;
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
            };
            _Scenario_Converter.prototype.convertCommand_if_not_shojo = function (context) {
                var actor = 1;
                for (var i = 2; i <= 4; i++) {
                    if (this.defaultPosMap[i] == Saba.Tachie.LEFT_POS) {
                        actor = i;
                        break;
                    }
                }
                this.indent++;
                var ifnum = 0;
                var id = 80 + actor;
                var flag = 0;
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
            };
            _Scenario_Converter.prototype.convertCommand_set_mob_name = function (context) {
                var mob = context.headerInt('mob', 1);
                var armor = $dataArmors[mob];
                this._defaultMobNameMap[1] = armor.name;
            };
            return _Scenario_Converter;
        }(SimpleScenario.Scenario_Converter));
        var Game_Interpreter_command261 = Game_Interpreter.prototype.command261;
        Game_Interpreter.prototype.command261 = function () {
            if (Input.isPressed(Saba.Tachie.MESSAGE_SKIP_KEY) || Input.isPressed('cancel')) {
                return true;
            }
            return Game_Interpreter_command261.call(this);
        };
        Game_Interpreter.prototype.fadeSpeed = function () {
            if ($gameVariables.value(16) > 0) {
                return $gameVariables.value(16);
            }
            return 24;
        };
        var _Game_Interpreter_command261 = Game_Interpreter.prototype.command261;
        Game_Interpreter.prototype.command261 = function () {
            if (!$gameMessage.isBusy()) {
                var name = this._params[0];
                $gameTemp.lastMovie = name;
                if (!$gameTemp.showLoop) {
                    $gameTemp.showLoop = true;
                }
            }
            return _Game_Interpreter_command261.call(this);
        };
        var _Game_Interpreter_update = Game_Interpreter.prototype.update;
        Game_Interpreter.prototype.update = function () {
            _Game_Interpreter_update.call(this);
            if ($gameTemp.playMovie && !Graphics.isVideoPlaying() && this._waitMode != 'video' && $gameTemp.sabaWaitForMovieMode != WAIT_MODE_MOVIE_START) {
                var ext = this.videoFileExt();
                Graphics.playVideo('movies/' + $gameTemp.playMovie + ext);
                this.setWaitMode('video');
                $gameTemp.sabaWaitForMovieMode = WAIT_MODE_MOVIE_START;
                Input.clear();
            }
        };
        function LoopSprite() {
            this.initialize.apply(this, arguments);
        }
        LoopSprite.prototype = Object.create(Sprite_Base.prototype);
        LoopSprite.prototype.constructor = LoopSprite;
        LoopSprite.prototype.initialize = function () {
            Sprite_Base.prototype.initialize.call(this);
            this.x = 6;
            this.y = 0;
            this.createBitmap();
            this.redraw();
            this.frame = 120;
        };
        LoopSprite.prototype.createBitmap = function () {
        };
        var _LoopSprite_update = LoopSprite.prototype.update;
        LoopSprite.prototype.update = function () {
            _LoopSprite_update.call(this);
            if (!this.visible) {
                return;
            }
            if (this.frame === 0) {
                this.opacity -= 5;
                if (this.opacity < 20) {
                    this.visible = false;
                }
            }
            else {
                this.frame--;
            }
        };
        LoopSprite.prototype.redraw = function () {
            this.bitmap = ImageManager.loadSystem('loop');
        };
        Sprite_Picture.prototype.updateOther = function () {
            var picture = this.picture();
            this.opacity = picture.opacity();
            this.blendMode = picture.blendMode();
            this.alpha = this.opacity / 255;
            this.rotation = picture.angle() * Math.PI / 180;
            if (this.opacity == 0 || !this.visible) {
                return;
            }
            if (this.eroAnime) {
                this.alpha = 1;
                this.eroAnimeFrameIndex++;
                if (this.eroAnimeFrameIndex >= this.eroAnimeWait) {
                    this.eroAnimeFrameIndex = 0;
                    this.eroAnimeIndex++;
                    if (this.eroAnimeIndex >= this.eroAnime.length) {
                        this.eroAnimeIndex = 0;
                    }
                    this.drawEro(this.eroAnime[this.eroAnimeIndex]);
                    if (this.eroSeIndex == this.eroAnimeIndex) {
                        var dice = Math.floor(this.eroSeList.length * Math.random());
                        var se = this.eroSeList[dice];
                        if (typeof se == 'object') {
                            for (var i = 0; i < se.length; i++) {
                                AudioManager.playSe({ name: se[i], volume: 80, pitch: 100, pan: 0 });
                            }
                        }
                        else {
                            AudioManager.playSe({ name: se, volume: 80, pitch: 100, pan: 0 });
                        }
                    }
                }
            }
        };
        /*
        // Play Movie
        Game_Interpreter.prototype.command261 = function() {
            if (!$gameMessage.isBusy()) {
                if (Graphics._isVideoVisible()) {
                    return false;
                }
                var name = this._params[0];
                if (name.length > 0) {
                    console.log('plat')
                    var ext = this.videoFileExt();
                    Graphics.playVideo('movies/' + name + ext);
                    this.setWaitMode('video');
                    $gameTemp.sabaWaitForMovieMode = 1;
                }
                this._index++;
            }
            return false;
        };*/
        SimpleScenario.validates['ero'] = {
            'file': SimpleScenario.notEmpty(),
        };
        SimpleScenario.validates['ero_back'] = {
            'file': SimpleScenario.notEmpty(),
        };
        SimpleScenario.validates['reco'] = {
            'id': SimpleScenario.notEmpty(),
        };
        SimpleScenario.validates['se_nugi'] = {};
        SimpleScenario.validates['se_pan'] = {};
        SimpleScenario.validates['se_sei'] = {};
        SimpleScenario.validates['se_sounyu'] = {};
        SimpleScenario.validates['ninshin'] = {};
        SimpleScenario.validates['ninshinShow'] = {};
        SimpleScenario.validates['ninshinHide'] = {};
        SimpleScenario.validates['vib'] = {};
        SimpleScenario.validates['waitmov'] = {};
        SimpleScenario.validates['bote'] = {};
        SimpleScenario.validates['jpg'] = {};
        SimpleScenario.validates['sei'] = {};
        SimpleScenario.validates['effect'] = {};
        SimpleScenario.validates['hide_effect'] = {};
        SimpleScenario.validates['hide_sei'] = {};
        SimpleScenario.validates['load_ero'] = {};
        SimpleScenario.validates['outer'] = {};
        SimpleScenario.validates['innerBottom'] = {};
        SimpleScenario.validates['if_shojo'] = {};
        SimpleScenario.validates['if_not_shojo'] = {};
        SimpleScenario.validates['restore'] = {};
        SimpleScenario.validates['set_mob_name'] = {};
        /*
        
        var WAIT_MODE_MOVIE_START = 1;
        var WAIT_MODE_MOVIE_END = 2;
        
        var _Game_Interpreter_updateWaitCount = Game_Interpreter.prototype.updateWaitCount;
        Game_Interpreter.prototype.updateWaitCount = function() {
            if ($gameTemp.sabaWaitForMovieMode > 0) {
                if ($gameTemp.sabaWaitForMovieMode == WAIT_MODE_MOVIE_END) {
                    if (Graphics._isVideoVisible()) {
                        return true;
                    }
                    $gameTemp.sabaWaitForMovieMode = 0;
                }
                else {
                    if (Graphics._isVideoVisible()) {
                        $gameTemp.sabaWaitForMovieMode = WAIT_MODE_MOVIE_END;
                    }
                    return true;
                }
            }
            return _Game_Interpreter_updateWaitCount.call(this);
        };
        */
        Saba.applyMyMethods(_Scenario_Converter, SimpleScenario.Scenario_Converter);
    })(SimpleScenario = Saba.SimpleScenario || (Saba.SimpleScenario = {}));
})(Saba || (Saba = {}));

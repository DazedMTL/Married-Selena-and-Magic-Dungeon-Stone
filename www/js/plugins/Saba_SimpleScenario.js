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
//=============================================================================
// Saba_SimpleScenario.js
//=============================================================================
/*:ja
 * @author Sabakan
 * @plugindesc テキストファイルからツクールのイベントを書き出すプラグインです。
 *
 * @param autoWordWrap
 * @desc YED_WordWrap のプラグインの機能の自動改行用の文字列(<wrap> <br>)を自動で埋め込みます。
 * @default false
 *
 * @param scenarioFolder
 * @desc シナリオファイルがある場所を設定します
 * @default /../scenario/
 *
 *
 * @help
 * Ver
 *
 * 睡工房さんのTES　と互換があるようにしています。
 * hime.be/rgss3/tes.html
 * リファレンスも、↑をご覧ください。
 * ただし、未実装箇所が多くあります。
 *
 * ■使い方
 * プロジェクトフォルダと同じディレクトリに
 * scenario フォルダを作成します。
 * その中に.txt ファイルを作成し、シナリオを書いていきます。
 *
 * その後、ツクールの開発環境からゲームを起動し、
 * マップ画面でF7キーを押すことで変換が完了します。
 *
 * シナリオを実行するには、プラグインコマンドで
 * scenario <<ファイル名>>
 * と記述します。
 *
 //**************************************************************************
 //　独自コマンド
 //**************************************************************************
 * 　n1 n2 n3 ... n99
 * 　＞立ち絵を表示します。n の後の数字はアクターIDです。
 * 　　■パラメータ
 * 　　　face: number
 * 　　　　→表情ID
 * 　　　hoppe: number
 * 　　　　→ほっぺたの赤らみID
 * 　　　pose: number
 * 　　　　→ポーズID
 * 　　　name: string
 * 　　　　→表示する名前
 * 　　　pos: string
 * 　　　　→立ち位置(right→右, left→左, center→中央)
 * 　　　　　　　　　(default_posよりも優先します)
 *
 * 　m1 m2 m3 ... m99
 * 　＞立ち絵なし、名前ありのメッセージを表示します。m の後の数字はモブIDです。
 * 　　■パラメータ
 * 　　　face: number
 * 　　　　→表情ID
 * 　　　name: string
 * 　　　　→表示する名前
 *
 * 　mob1 mob2 mob3 ... mob99
 * 　＞m1 などのコマンドで表示されるデフォルトの名前を設定します。
 * 　　■パラメータ
 * 　　　name: string
 * 　　　　→設定する名前
 *
 * 　cos1 cos2 cos3 ... cos99
 * 　＞キャラクターの衣装を変更します。n の後の数字はアクターIDです。
 * 　　■パラメータ
 * 　　　face: id
 * 　　　　→表情ID
 * 　　　outer: string
 * 　　　　→アウターのID(a→裸)
 * 　　　innerBottm: string
 * 　　　　→パンツのID(a→裸)
 * 　　　innerTop: string
 * 　　　　→ブラのID(a→裸)
 *
 * 　not_close
 * 　＞会話ウィンドウを一時的に閉じなくします。
 * 　　■パラメータ
 * 　　　flag: string
 * 　　　　→on: 閉じなくする  off: 解除する
 *
 * 　hide_left
 * 　＞左のキャラを非表示にします
 *
 * 　hide_right
 * 　＞右のキャラを非表示にします
 *
 * 　color
 * 　＞ウィンドウカラーを設定します。
 * 　　キャラの会話では自動で設定されますが、
 * 　　通常の地の文などでは前回の色を引き継いでしまうため、
 * 　　このコマンドで指定し直すことができます。
 * 　　■パラメータ
 * 　　　color: number
 * 　　　　→ウィンドウ色ID
 *
 * 　hide
 * 　＞全てのキャラクターを非表示にし、ウィンドウが閉じなくなるモードを
 * 　　合わせて解除します。
 *
 * 　default_pos
 * 　＞キャラクターのデフォルト立ち位置を設定します。
 * 　　設定しない場合、左に立ちます。
 * 　　■パラメータ
 * 　　　actor: number
 * 　　　　→アクターID
 * 　　　pos: string
 * 　　　　→立ち位置(right→右, left→左, center→中央)
 *
 * 　start
 * 　＞default_posなどの設定をクリアします。
 *
 * 　preloadPicture
 * 　＞picture ファイルを先に読み込んでおきます
 * 　　■パラメータ
 * 　　　file: 読み込んでおくファイル名
 *
 * 　turn_left
 * 　turn_right
 * 　turn_up
 * 　turn_down
 * 　＞キャラクターが向きを変えます。
 * 　　@route_h event=-1 skip=true wait=true
 * 　　@route type=turn_XXX
 * 　　と同じです。
 * 　　■パラメータ
 * 　　　event: number
 * 　　　　→イベントID。デフォルトは-1
 * 　　　skil: boolean
 * 　　　　→デフォルトはtrue
 * 　　　wait: boolean
 * 　　　　→デフォルトはtrue
 *
 * 　move_left
 * 　move_right
 * 　move_up
 * 　move_down
 * 　＞キャラクターが移動します。
 * 　　@route_h event=-1 skip=true wait=true
 * 　　@route type=left or right or up or down
 * 　　と同じです。
 * 　　■パラメータ
 * 　　　event: number
 * 　　　　→イベントID。デフォルトは-1
 * 　　　skil: boolean
 * 　　　　→デフォルトはtrue
 * 　　　wait: boolean
 * 　　　　→デフォルトはtrue
//**************************************************************************
//　独自拡張
//**************************************************************************
 * fadeout
 * →time を指定できるようにしました
 *
 * fadein
 * →time を指定できるようにしました
 *
 * movie
 * →playback_rate を指定できるようにしました
 * デフォルトは1です。0.5 を指定すると1/2、2 を指定すると2倍の速度で再生されます
 *
 * イベント実装状況(○→実装済み)
//**************************************************************************
//　メッセージ系
//**************************************************************************
 *○　message_h
 *○　message
 *○　choice_h
 *○　choice_if
 *○　choice_cancel
 *○　choice_end
 *　　input_num
 *　　choice_item
 *　　scroll_h
 *　　scroll
 *　　scroll_end
//**************************************************************************
//　ゲーム進行系
//**************************************************************************
 *○　sw
 *　　var
 *　　var_random
 *　　var_item
 *　　var_weapon
 *　　var_armor
 *　　var_actor
 *　　var_enemy
 *　　var_character
 *　　var_party
 *　　var_other
 *　　var_script
 *○　self_sw
 *○　timer
//**************************************************************************
//　フロー制御系
//**************************************************************************
 *○　if_sw
 *○　if_var
 *○　if_self_sw
 *○　if_timer
 *○　if_enemy
 *○　if_character
 *○　if_vehicle
 *○　if_money
 *○　if_item
 *○　if_weapon
 *○　if_armor
 *○　if_button
 *○　if_script
 *○　else
 *　　loop
 *　　loop_end
 *　　loop_break
 *○　event_break
 *○　return
 *○　common
 *○　label
 *○　label_jump
 *　　comment
 *　　comment2
//**************************************************************************
//　パーティ系
//**************************************************************************
 *　　money
 *　　item
 *　　weapon
 *　　armor
 *　　member
//**************************************************************************
//　アクター系
//**************************************************************************
 *　　hp
 *　　mp
 *　　state
 *○　all_recovery
 *○　exp
 *○　level
 *　　capability
 *　　skill
 *　　equip
 *○　name
 *○　class
 *○　nickname
//**************************************************************************
//　移動系
//**************************************************************************
 *○　map_move
 *○　vehicle_pos
 *○　event_pos
 *○　scroll_map
 *○　route_h
 *○　route
 *○　vehicle
//**************************************************************************
//　キャラクター系
//**************************************************************************
 *○　transparent
 *○　followers
 *○　gather
 *○　anime
 *○　balloon
 *○　erace
//**************************************************************************
//　画面効果系
//**************************************************************************
 *○　fadeout
 *○　fadein
 *○　tone
 *○　flash
 *○　shake
//**************************************************************************
//　時間調整系
//**************************************************************************
 *○　wait
//**************************************************************************
//　ピクチャと天候系
//**************************************************************************
 *○　picture
 *○　picture_move
 *○　picture_rotation
 *○　picture_tone
 *○　picture_erace
 *○　weather
//**************************************************************************
//　音楽と効果音系
//**************************************************************************
 *○　bgm
 *○　fadeout_bgm
 *○　save_bgm
 *○　resume_bgm
 *○　bgs
 *○　fadeout_bgs
 *○　me
 *○　se
//**************************************************************************
//　シーン制御系
//**************************************************************************
 *　　battle
 *　　battle_win
 *　　battle_escape
 *　　battle_loss
 *　　battle_end
 *　　shop
 *　　input_name
 *○　menu_open
 *○　save_open
 *○　gameover
 *　　battle_bgm
 *　　battle_end_me
 *○　title_return
//**************************************************************************
//　システム設定系
//**************************************************************************
 *　　battle_bgm
 *　　battle_end_me
 *○　save_disable
 *○　menu_disable
 *○　encount_disable
 *○　formation_disable
 *　　window_color
 *　　actor_graphic
 *　　vehicle_graphic
//**************************************************************************
//　ムービー系
//**************************************************************************
 *○　movie
//**************************************************************************
//　マップ系
//**************************************************************************
 *　　map_name_disable
 *　　tileset
 *　　battle_background
 *　　parallax
 *　　pos_info
//**************************************************************************
//　バトル系
//**************************************************************************
 *　　enemy_hp
 *　　enemy_mp
 *　　enemy_state
 *　　enemy_all_recovery
 *　　enemy_appear
 *　　enemy_trans
 *　　battle_anime
 *　　force
 *　　battle_abort
//**************************************************************************
//　上級系
//**************************************************************************
 *　　script
 *　　script2
 *　　plugin
//**************************************************************************
//　その他
//**************************************************************************
 *○　end
 *
 * @license
 * Saba_SimpleScenario licensed under the MIT License.
 */
var Saba;
(function (Saba) {
    var SimpleScenario;
    (function (SimpleScenario) {
        var parameters = PluginManager.parameters('Saba_SimpleScenario');
        var AUTO_WARD_WRAP = parameters['autoWordWrap'] === 'true';
        if (Utils.isNwjs()) {
            var fs = require('fs');
            var path = require('path');
        }
        var pathParam = parameters['scenarioFolder'];
        var SCENARIO_FILE_NAME = 'Scenario.json';
        SimpleScenario.SCENARIO_PATH = function () {
            var p = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, pathParam);
            if (p.match(/^\/([A-Z]\:)/)) {
                p = p.slice(1);
            }
            var result = decodeURIComponent(p);
            if (result[0] == '/') {
                //    return '.' + result;
            }
            return result;
        }();
        var DATA_PATH = function () {
            var p = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/data/');
            if (p.match(/^\/([A-Z]\:)/)) {
                p = p.slice(1);
            }
            var result = decodeURIComponent(p);
            if (result[0] == '/') {
                //    return '.' + result;
            }
            return result;
        }();
        DataManager.loadDataFile('$dataScenario', SCENARIO_FILE_NAME);
        // 変換ボタン。F7
        Input.keyMapper[118] = 'debug2';
        var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        var _Scene_Map_update = Scene_Map.prototype.update;
        var logList = [];
        var _Game_Interpreter = /** @class */ (function (_super) {
            __extends(_Game_Interpreter, _super);
            function _Game_Interpreter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            _Game_Interpreter.prototype.pluginCommand = function (command, args) {
                _Game_Interpreter_pluginCommand.call(this, command, args);
                if (command === 'Scenario' || command === 'scenario') {
                    var id = args[0];
                    var list_1 = $dataScenario[id.normalize('NFC')];
                    if (!list_1) {
                        throw new Error('id:' + id + ' のデータが見つかりません');
                    }
                    if (args[1] == 'true') {
                        if ($gameSystem.isEndEvent(id)) {
                            return;
                        }
                        $gameSystem.endEvent(id);
                    }
                    console.log("\u30B3\u30DE\u30F3\u30C9\u5B9F\u884C:" + args[0]);
                    //logList.push(id + '.txt');
                    //fs.writeFileSync(DATA_PATH + 'Scenario.txt', JSON.stringify(logList));
                    this.setupChild(list_1, this._eventId);
                }
            };
            _Game_Interpreter.prototype.isSkip = function () {
                return Input.isPressed(Saba.Tachie.MESSAGE_SKIP_KEY);
            };
            _Game_Interpreter.prototype.command232 = function () {
                var x, y;
                if (this._params[3] === 0) {
                    x = this._params[4];
                    y = this._params[5];
                }
                else {
                    x = $gameVariables.value(this._params[4]);
                    y = $gameVariables.value(this._params[5]);
                }
                var wait = this._params[10];
                if (this.isSkip()) {
                    wait = Math.round(wait / 2);
                }
                $gameScreen.movePicture(this._params[0], this._params[2], x, y, this._params[6], this._params[7], this._params[8], this._params[9], wait);
                if (this._params[11]) {
                    this.wait(wait);
                }
                return true;
            };
            _Game_Interpreter.prototype.command230 = function () {
                if (this.isSkip()) {
                    this.wait(this._params[0] / 3);
                }
                else {
                    this.wait(this._params[0]);
                }
                return true;
            };
            ;
            return _Game_Interpreter;
        }(Game_Interpreter));
        var _Scene_Map = /** @class */ (function (_super) {
            __extends(_Scene_Map, _super);
            function _Scene_Map() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            _Scene_Map.prototype.update = function () {
                _Scene_Map_update.call(this);
                this.updateConvertScenario();
            };
            _Scene_Map.prototype.updateConvertScenario = function () {
                if (Input.isTriggered('debug2') && $gameTemp.isPlaytest()) {
                    SoundManager.playSave();
                    var converter = new Scenario_Converter();
                    converter.convertAll();
                }
            };
            return _Scene_Map;
        }(Scene_Map));
        var _DataManager_checkError = DataManager.checkError;
        DataManager.checkError = function () {
            if (DataManager._errorUrl && DataManager._errorUrl.indexOf(SCENARIO_FILE_NAME) >= 0) {
                console.error('Failed to load: ' + DataManager._errorUrl);
                DataManager._errorUrl = null;
            }
            _DataManager_checkError.call(this);
        };
        /**
         * シナリオテキストをMVで使えるJSON形式に変換するクラスです
         */
        var Scenario_Converter = /** @class */ (function () {
            function Scenario_Converter() {
            }
            /**
             * 全てのシナリオを変換します。
             */
            Scenario_Converter.prototype.convertAll = function () {
                var self = this;
                this._replaceMap = {};
                var scenario = {};
                fs.readdir(SimpleScenario.SCENARIO_PATH, function (err, files) {
                    if (err) {
                        console.error(err.message);
                        return;
                    }
                    if (!files) {
                        return;
                    }
                    try {
                        self.convertReplace(files);
                        self.convertFiles(SimpleScenario.SCENARIO_PATH, files, scenario);
                        console.log(scenario);
                        fs.writeFileSync(DATA_PATH + 'Scenario.json', JSON.stringify(scenario));
                        DataManager.loadDataFile('$dataScenario', SCENARIO_FILE_NAME);
                        console.log('シナリオの変換が終わりました');
                    }
                    catch (e) {
                        p(e);
                    }
                });
            };
            Scenario_Converter.prototype.convertFiles = function (basePath, files, scenario) {
                if (!files) {
                    return;
                }
                for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                    var file = files_1[_i];
                    var filePath = path.resolve(basePath, file);
                    var stat = fs.statSync(filePath);
                    if (stat.isDirectory()) {
                        var files2 = fs.readdirSync(filePath);
                        this.convertFiles(filePath + '/', files2, scenario);
                        continue;
                    }
                    var name_1 = this.parseValidFileName(file);
                    if (!name_1) {
                        continue;
                    }
                    var text = fs.readFileSync(basePath + file, 'utf8');
                    scenario[name_1.normalize('NFC')] = this.convert(file, text);
                }
            };
            /**
             * 指定のファイルがシナリオファイルかどうかを返します
             */
            Scenario_Converter.prototype.parseValidFileName = function (file) {
                if (file.indexOf('replace.txt') === 0) {
                    return;
                }
                var index = file.indexOf('.txt');
                if (index === -1) {
                    index = file.indexOf('.sce');
                }
                if (index === -1) {
                    return null;
                }
                var name = file.substr(0, index);
                return name;
            };
            /**
             * replace ファイルを変換します
             */
            Scenario_Converter.prototype.convertReplace = function (files) {
                for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
                    var file = files_2[_i];
                    var index = file.indexOf('replace.txt');
                    if (index === -1) {
                        continue;
                    }
                    var name_2 = file.substr(0, index);
                    var text = fs.readFileSync(SimpleScenario.SCENARIO_PATH + file, 'utf8');
                    this.parseReplace(text);
                    return;
                }
            };
            Scenario_Converter.prototype.parseReplace = function (text) {
                var lines = text.split(/\r\n|\r|\n/);
                for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                    var line = lines_1[_i];
                    if (line.indexOf('//') === 0) {
                        continue;
                    }
                    var chars = line.split(/\s/);
                    if (chars.length < 2) {
                        continue;
                    }
                    this._replaceMap[chars[0]] = chars[chars.length - 1];
                }
                //console.log(this._replaceMap)
            };
            Scenario_Converter.prototype.convert = function (file, text) {
                this.indent = 0;
                var list = [];
                var lines = text.split(/\r\n|\r|\n/);
                var blocks = [];
                var lastHeader = '@normal_messages';
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    line = line.replace(/^\uFEFF/, '');
                    lines[i] = this.removeWS(line);
                }
                ;
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    if (line.length === 0) {
                        continue;
                    }
                    if (line.indexOf('//') === 0) {
                        continue;
                    }
                    if (line.indexOf('#') === 0) {
                        continue;
                    }
                    var block = new Block(i + 1);
                    blocks.push(block);
                    if (line.indexOf('@') === 0) {
                        block.header = line;
                        lastHeader = line;
                        if (line.indexOf('@choice_if') >= 0 || line.indexOf('@choice_h') >= 0) {
                            continue;
                        }
                        var offset = 1;
                        if (i + offset === lines.length) {
                            break;
                        }
                        lines[i + offset] = this.removeWS(lines[i + offset]);
                        while (i + offset < lines.length && (lines[i + offset].indexOf('@') !== 0 || lines[i + offset].indexOf('@route') !== -1) && lines[i + offset].length > 0) {
                            block.pushMsg(this.removeWS(lines[i + offset]));
                            offset++;
                            if (i + offset < lines.length) {
                                lines[i + offset] = this.removeWS(lines[i + offset]);
                            }
                        }
                        i += offset - 1;
                    }
                    else {
                        block.header = lastHeader; //'@normal_messages';
                        var offset = 0;
                        while (i + offset < lines.length && lines[i + offset].indexOf('@') !== 0 && lines[i + offset].length > 0) {
                            block.pushMsg(this.removeWS(lines[i + offset]));
                            offset++;
                        }
                        if (offset >= 1) {
                            i += offset - 1;
                        }
                    }
                }
                var context = new Context(file, 0, 'start', list, null, null);
                this.convertCommand_start(context);
                for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
                    var block = blocks_1[_i];
                    this.convertCommand(file, list, block);
                }
                context.insertTop({ 'code': 355, 'indent': this.indent, 'parameters': ["$gameTemp.ninshinTotal='" + this._ninshinTotal + "'"] });
                context.insertTop({ 'code': 355, 'indent': this.indent, 'parameters': ["$gameTemp.ninshinDamage=0"] });
                return list;
            };
            /**
             * ホワイトスペースを削除します。
             */
            Scenario_Converter.prototype.removeWS = function (line) {
                var ret = line.replace(/^[\x20|\t]+/g, '');
                if (ret === '_') {
                    return ' ';
                }
                else {
                    return ret;
                }
            };
            /**
             * コマンドを変換します。
             */
            Scenario_Converter.prototype.convertCommand = function (file, list, block) {
                var headerList = block.header.split(/\s/g);
                var command = headerList[0].substr(1);
                var header = this.parseHeader(headerList, ['セレナ', 'セレナ2', 'リン', 'リン2', 'ソフィア', 'ロナ', 'エリス', 'アキラ', 'ランディ', 'ラルゴ', 'メル', 'グルカ', 'ジュリア', 'コバック', 'シン'].contains(command));
                var context = new Context(file, block.lineNumber, command, list, header, block.data);
                var n = /n(\d+)/.exec(command);
                var a = /a(\d+)/.exec(command);
                var cos = /cos(\d+)/.exec(command);
                var m = /m(\d+)/.exec(command);
                var mob = /mob(\d+)/.exec(command);
                try {
                    this.validate(context);
                    if (n) {
                        this['convertCommand_n'](parseInt(n[1]), context);
                    }
                    else if (a) {
                        this['convertCommand_n'](parseInt(a[1]), context);
                    }
                    else if (cos) {
                        this['convertCommand_cos'](parseInt(cos[1]), context);
                    }
                    else if (m) {
                        this['convertCommand_m'](parseInt(m[1]), context);
                    }
                    else if (mob) {
                        this['convertCommand_mob'](parseInt(mob[1]), context);
                    }
                    else if (command == '') {
                        this['convertCommand_normal_messages'](context);
                    }
                    else {
                        if (command === 'n' || command === 'a' || command === 'm' || command === 'mob') {
                            context.error('のコマンドが存在しません');
                        }
                        else if (!this['convertCommand_' + command]) {
                            context.error(command + 'のコマンドが存在しません');
                        }
                        else {
                            this['convertCommand_' + command](context);
                        }
                    }
                }
                catch (e) {
                    console.error(command + 'のコマンドでエラーが発生しました');
                    console.log(e);
                    console.log(e.stack);
                    throw e;
                }
            };
            /**
             * コマンドのパラメータが正しいかどうかを検証します。
             * @param {Context} context [description]
             */
            Scenario_Converter.prototype.validate = function (context) {
                var validaor = SimpleScenario.validates[context.command];
                if (!validaor) {
                    console.error(context.command + 'のコマンドの Validator が存在しません');
                    return;
                }
                for (var paramName in validaor) {
                    if (!validaor.hasOwnProperty(paramName)) {
                        continue;
                    }
                    var vv = validaor[paramName];
                    if (!vv) {
                        console.error(context.command + " " + paramName + " \u306EValidator \u304C\u5B58\u5728\u3057\u307E\u305B\u3093");
                        continue;
                    }
                    if (Array.isArray(vv)) {
                        var validatorList = vv;
                        for (var _i = 0, validatorList_1 = validatorList; _i < validatorList_1.length; _i++) {
                            var v = validatorList_1[_i];
                            if (!v) {
                                console.error(context.command + " " + paramName + " \u306EValidator \u304C\u5B58\u5728\u3057\u307E\u305B\u3093");
                                continue;
                            }
                            v.validate(context, paramName, context.header[paramName]);
                        }
                    }
                    else {
                        vv.validate(context, paramName, context.header[paramName]);
                    }
                }
            };
            /**
             * ヘッダをパースします。
             */
            Scenario_Converter.prototype.parseHeader = function (headerList, isActor) {
                var result = {};
                if (isActor) {
                    result['face'] = 1;
                }
                for (var i = 1; i < headerList.length; i++) {
                    var text = headerList[i];
                    if (isActor) {
                        switch (text) {
                            case '笑':
                                result['face'] = 2;
                                break;
                            case '明':
                                result['face'] = 3;
                                break;
                            case '困':
                                result['face'] = 4;
                                break;
                            case '呆':
                                result['face'] = 5;
                                break;
                            case '考':
                                result['face'] = 6;
                                break;
                            case '驚':
                                result['face'] = 7;
                                break;
                            case '怒':
                                result['face'] = 8;
                                break;
                            case '悲':
                                result['face'] = 9;
                                break;
                            case '恥':
                                result['face'] = 10;
                                break;
                            case '叫':
                                result['face'] = 11;
                                break;
                            case '閉':
                                result['face'] = 12;
                                break;
                            case '苦':
                                result['face'] = 13;
                                break;
                        }
                    }
                    var index = text.indexOf('=');
                    var key = text.substr(0, index);
                    var value = text.substr(index + 1);
                    result[key] = value;
                }
                return new Header(result);
            };
            Scenario_Converter.prototype.convertCommand_start = function (context) {
                this.defaultPosMap = { 1: Saba.Tachie.LEFT_POS, 2: Saba.Tachie.RIGHT_POS, 3: Saba.Tachie.RIGHT_POS, 4: Saba.Tachie.RIGHT_POS, 5: Saba.Tachie.RIGHT_POS, 6: Saba.Tachie.CENTER_POS, 9: Saba.Tachie.RIGHT_POS };
                this._defaultMobNameMap = {};
                this._defaultMobFaceMap = {};
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie notClose on"] });
            };
            Scenario_Converter.prototype.convertCommand_hide = function (context) {
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie notClose off"] });
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hide"] });
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hideName"] });
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hideBalloon"] });
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie clearWindowColor"] });
            };
            Scenario_Converter.prototype.convertCommand_move_down = function (context) {
                var event = context.headerInt('event', -1);
                var skip = context.headerBool('skip', true);
                var wait = context.headerBool('wait', true);
                var list = [];
                list.push({ code: 1, indent: null, parameters: parameters });
                list.push({ 'code': 0 });
                var routes = { repeat: false, skippable: skip, wait: wait, list: list };
                context.push({ 'code': 205, 'indent': this.indent, 'parameters': [event, routes] });
            };
            Scenario_Converter.prototype.convertCommand_move_left = function (context) {
                var event = context.headerInt('event', -1);
                var skip = context.headerBool('skip', true);
                var wait = context.headerBool('wait', true);
                var list = [];
                list.push({ code: 2, indent: null, parameters: parameters });
                list.push({ 'code': 0 });
                var routes = { repeat: false, skippable: skip, wait: wait, list: list };
                context.push({ 'code': 205, 'indent': this.indent, 'parameters': [event, routes] });
            };
            Scenario_Converter.prototype.convertCommand_move_right = function (context) {
                var event = context.headerInt('event', -1);
                var skip = context.headerBool('skip', true);
                var wait = context.headerBool('wait', true);
                var list = [];
                list.push({ code: 3, indent: null, parameters: parameters });
                list.push({ 'code': 0 });
                var routes = { repeat: false, skippable: skip, wait: wait, list: list };
                context.push({ 'code': 205, 'indent': this.indent, 'parameters': [event, routes] });
            };
            Scenario_Converter.prototype.convertCommand_move_up = function (context) {
                var event = context.headerInt('event', -1);
                var skip = context.headerBool('skip', true);
                var wait = context.headerBool('wait', true);
                var list = [];
                list.push({ code: 4, indent: null, parameters: parameters });
                list.push({ 'code': 0 });
                var routes = { repeat: false, skippable: skip, wait: wait, list: list };
                context.push({ 'code': 205, 'indent': this.indent, 'parameters': [event, routes] });
            };
            Scenario_Converter.prototype.convertCommand_turn_down = function (context) {
                var event = context.headerInt('event', -1);
                var skip = context.headerBool('skip', true);
                var wait = context.headerBool('wait', true);
                var list = [];
                list.push({ code: 16, indent: null, parameters: parameters });
                list.push({ 'code': 0 });
                var routes = { repeat: false, skippable: skip, wait: wait, list: list };
                context.push({ 'code': 205, 'indent': this.indent, 'parameters': [event, routes] });
            };
            Scenario_Converter.prototype.convertCommand_turn_left = function (context) {
                var event = context.headerInt('event', -1);
                var skip = context.headerBool('skip', true);
                var wait = context.headerBool('wait', true);
                var list = [];
                list.push({ code: 17, indent: null, parameters: parameters });
                list.push({ 'code': 0 });
                var routes = { repeat: false, skippable: skip, wait: wait, list: list };
                context.push({ 'code': 205, 'indent': this.indent, 'parameters': [event, routes] });
            };
            Scenario_Converter.prototype.convertCommand_turn_right = function (context) {
                var event = context.headerInt('event', -1);
                var skip = context.headerBool('skip', true);
                var wait = context.headerBool('wait', true);
                var list = [];
                list.push({ code: 18, indent: null, parameters: parameters });
                list.push({ 'code': 0 });
                var routes = { repeat: false, skippable: skip, wait: wait, list: list };
                context.push({ 'code': 205, 'indent': this.indent, 'parameters': [event, routes] });
            };
            Scenario_Converter.prototype.convertCommand_turn_up = function (context) {
                var event = context.headerInt('event', -1);
                var skip = context.headerBool('skip', true);
                var wait = context.headerBool('wait', true);
                var list = [];
                list.push({ code: 19, indent: null, parameters: parameters });
                list.push({ 'code': 0 });
                var routes = { repeat: false, skippable: skip, wait: wait, list: list };
                context.push({ 'code': 205, 'indent': this.indent, 'parameters': [event, routes] });
            };
            Scenario_Converter.prototype.convertCommand_step_anime_on = function (context) {
                var event = context.headerInt('event', -1);
                var skip = context.headerBool('skip', true);
                var wait = context.headerBool('wait', true);
                var list = [];
                list.push({ code: 33, indent: null, parameters: parameters });
                list.push({ 'code': 0 });
                var routes = { repeat: false, skippable: skip, wait: wait, list: list };
                context.push({ 'code': 205, 'indent': this.indent, 'parameters': [event, routes] });
            };
            Scenario_Converter.prototype.convertCommand_step_anime_off = function (context) {
                var event = context.headerInt('event', -1);
                var skip = context.headerBool('skip', true);
                var wait = context.headerBool('wait', true);
                var list = [];
                list.push({ code: 34, indent: null, parameters: parameters });
                list.push({ 'code': 0 });
                var routes = { repeat: false, skippable: skip, wait: wait, list: list };
                context.push({ 'code': 205, 'indent': this.indent, 'parameters': [event, routes] });
            };
            Scenario_Converter.prototype.convertCommand_hide_left = function (context) {
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hideLeft"] });
            };
            Scenario_Converter.prototype.convertCommand_hide_right = function (context) {
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hideRight"] });
            };
            Scenario_Converter.prototype.convertCommand_hide_center = function (context) {
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hideCenter"] });
            };
            Scenario_Converter.prototype.convertCommand_default_pos = function (context) {
                var actorId = parseInt(context.header['actor']);
                var position = Saba.Tachie.LEFT_POS;
                switch (context.header['position']) {
                    case 'right':
                        position = Saba.Tachie.RIGHT_POS;
                        break;
                    case 'center':
                        position = Saba.Tachie.CENTER_POS;
                        break;
                }
                this.defaultPosMap[actorId] = position;
            };
            Scenario_Converter.prototype.convertCommand_not_close = function (context) {
                var flag = context.header['flag'];
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie notClose " + flag] });
            };
            Scenario_Converter.prototype.convertCommand_preloadPicture = function (context) {
                var file = context.headerStr('file');
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie preloadPicture " + file] });
            };
            Scenario_Converter.prototype.convertCommand_セレナ = function (context) {
                this.convertCommand_n(1, context);
            };
            Scenario_Converter.prototype.convertCommand_セレナ2 = function (context) {
                this.convertCommand_n(21, context);
            };
            Scenario_Converter.prototype.convertCommand_リン = function (context) {
                this.convertCommand_n(2, context);
            };
            Scenario_Converter.prototype.convertCommand_ロナ = function (context) {
                this.convertCommand_n(3, context);
            };
            Scenario_Converter.prototype.convertCommand_ソフィア = function (context) {
                this.convertCommand_n(4, context);
            };
            Scenario_Converter.prototype.convertCommand_エリス = function (context) {
                this.convertCommand_n(5, context);
            };
            Scenario_Converter.prototype.convertCommand_ジュリア = function (context) {
                this.convertCommand_n(6, context);
            };
            Scenario_Converter.prototype.convertCommand_ラルゴ = function (context) {
                this.convertCommand_n(7, context);
            };
            Scenario_Converter.prototype.convertCommand_ランディ = function (context) {
                this.convertCommand_n(8, context);
            };
            Scenario_Converter.prototype.convertCommand_メル = function (context) {
                this.convertCommand_n(9, context);
            };
            Scenario_Converter.prototype.convertCommand_グルカ = function (context) {
                this.convertCommand_n(11, context);
            };
            Scenario_Converter.prototype.convertCommand_シン = function (context) {
                this.convertCommand_n(13, context);
            };
            Scenario_Converter.prototype.convertCommand_エリス2 = function (context) {
                this.convertCommand_n(15, context);
            };
            Scenario_Converter.prototype.convertCommand_種親 = function (context) {
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie pose " + 14 + " " + 1] });
                this.convertCommand_n(14, context);
            };
            Scenario_Converter.prototype.convertCommand_コバック = function (context) {
                this.convertCommand_n(16, context);
            };
            Scenario_Converter.prototype.convertCommand_リン2 = function (context) {
                this.convertCommand_n(5, context);
            };
            Scenario_Converter.prototype.convertCommand_リンの会話 = function (context) {
                this.defaultPosMap[1] = Saba.Tachie.LEFT_POS;
                this.defaultPosMap[2] = Saba.Tachie.RIGHT_POS;
                this.defaultPosMap[5] = Saba.Tachie.RIGHT_POS;
            };
            Scenario_Converter.prototype.convertCommand_メルの会話 = function (context) {
                this.defaultPosMap[9] = Saba.Tachie.RIGHT_POS;
            };
            Scenario_Converter.prototype.convertCommand_ロナの会話 = function (context) {
                this.defaultPosMap[1] = Saba.Tachie.LEFT_POS;
                this.defaultPosMap[3] = Saba.Tachie.RIGHT_POS;
            };
            Scenario_Converter.prototype.convertCommand_ソフィアの会話 = function (context) {
                this.defaultPosMap[1] = Saba.Tachie.LEFT_POS;
                this.defaultPosMap[4] = Saba.Tachie.RIGHT_POS;
            };
            Scenario_Converter.prototype.convertCommand_シオリ2 = function (context) {
                this.convertCommand_n(9, context);
            };
            Scenario_Converter.prototype.convertCommand_n = function (actorId, context) {
                var position = this.defaultPosMap[actorId] || Saba.Tachie.LEFT_POS;
                ;
                switch (context.header['position']) {
                    case 'right':
                        position = Saba.Tachie.RIGHT_POS;
                        break;
                    case 'center':
                        position = Saba.Tachie.CENTER_POS;
                        break;
                    case 'left':
                        position = Saba.Tachie.LEFT_POS;
                        break;
                }
                if (context.header['face']) {
                    var face = parseInt(context.header['face']);
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie face " + actorId + " " + face] });
                }
                var index = null;
                if (context.header['index']) {
                    index = context.headerInt('index') - 1;
                }
                if (context.header['pose']) {
                    var pose = parseInt(context.header['pose']);
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie pose " + actorId + " " + pose] });
                }
                var hoppe = context.headerInt('hoppe', 0);
                var namida = context.headerInt('namida', 0);
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hoppe " + actorId + " " + hoppe] });
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie namida " + actorId + " " + namida] });
                var name = '\\N[' + actorId + ']';
                if (context.header['name']) {
                    name = context.header['name'];
                }
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie showName " + name] });
                var faceActorId = 0;
                if (Saba.Tachie.disabledTachieActorIdList.indexOf(actorId) >= 0) {
                    faceActorId = actorId;
                    var color = 0;
                    if (context.header['color']) {
                        color = context.headerInt('color');
                    }
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hideBalloon"] });
                    if (color > 0) {
                        context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie windowColor " + color] });
                    }
                    else {
                        context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie clearWindowColor"] });
                    }
                }
                else {
                    var x = 0;
                    var y = 0;
                    if (position === Saba.Tachie.LEFT_POS) {
                        context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie showLeft " + actorId + " " + x + " " + y + " 100"] });
                    }
                    else if (position === Saba.Tachie.CENTER_POS) {
                        context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie showCenter " + actorId + " " + x + " " + y + " 100"] });
                    }
                    else {
                        context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie showRight " + actorId + " " + x + " " + y + " 100"] });
                    }
                }
                this.convertCommand_messages(context, faceActorId, index);
            };
            Scenario_Converter.prototype.convertCommand_color = function (context) {
                var color = 0;
                if (context.header['color']) {
                    color = context.headerInt('color');
                }
                if (color > 0) {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie windowColor " + color] });
                }
                else {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie clearWindowColor"] });
                }
            };
            Scenario_Converter.prototype.convertCommand_m = function (mobId, context) {
                var name = this._defaultMobNameMap[mobId] || '';
                if (context.header['name']) {
                    name = context.headerStr('name');
                }
                var isMob = false;
                if (name.indexOf('男') >= 0 || name.indexOf('司祭') >= 0 || name.indexOf('主人') >= 0 || name.indexOf('村人') >= 0 || name.indexOf('ブルーノ') >= 0 || name.indexOf('衛兵') >= 0 || name.indexOf('謎の女性') >= 0 || name.indexOf('盗賊') >= 0 || name.indexOf('戦士') >= 0 || name.indexOf('村') >= 0 || name.indexOf('魔') >= 0 || name.indexOf('自称') >= 0 || name.indexOf('物乞い') >= 0 || name.indexOf('ゴルドー') >= 0) {
                    isMob = true;
                }
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie deactivateAll"] });
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie showName " + name] });
                var face = '';
                var index = 0;
                var faceList = this._defaultMobFaceMap[mobId];
                if (faceList) {
                    face = faceList[0];
                    index = faceList[1];
                }
                if (context.header['face']) {
                    face = context.headerStr('face');
                }
                if (context.header['index']) {
                    index = context.headerInt('index');
                }
                var color = 0;
                if (context.header['color']) {
                    color = context.headerInt('color');
                }
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hideBalloon"] });
                if (color > 0) {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie windowColor " + color] });
                }
                else {
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie clearWindowColor"] });
                }
                if (isMob) {
                    var x = 0;
                    var y = 0;
                    if (name.indexOf('謎の女性') >= 0) {
                        context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie pose " + 14 + " " + 7] });
                    }
                    else if (name.indexOf('ブルーノ') >= 0 || name.indexOf('ゴルドー') >= 0) {
                        context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie pose " + 14 + " " + 5] });
                    }
                    else if (name.indexOf('司祭') >= 0) {
                        context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie pose " + 14 + " " + 4] });
                    }
                    else if (name.indexOf('男A') >= 0 || name.indexOf('薄汚れた') >= 0) {
                        context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie pose " + 14 + " " + 2] });
                    }
                    else if (name.indexOf('男B') >= 0 || name.indexOf('農民風') >= 0) {
                        context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie pose " + 14 + " " + 3] });
                    }
                    else {
                        context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie pose " + 14 + " " + 1] });
                    }
                    context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie showLeft " + 14 + " " + x + " " + y + " 100"] });
                }
                context.push({ 'code': 101, 'indent': this.indent, 'parameters': [face, index, 0, 2] });
                for (var _i = 0, _a = context.data; _i < _a.length; _i++) {
                    var msg = _a[_i];
                    context.push({ 'code': 401, 'indent': this.indent, 'parameters': [this.replaceMessage(msg)] });
                }
            };
            Scenario_Converter.prototype.convertCommand_normal_messages = function (context) {
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie clearWindowColor"] });
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hideName"] });
                this.convertCommand_messages(context);
            };
            Scenario_Converter.prototype.convertCommand_messages = function (context, faceActorId, argFaceIndex) {
                if (faceActorId === void 0) { faceActorId = 0; }
                if (argFaceIndex === void 0) { argFaceIndex = null; }
                var faceName = '';
                var faceIndex = 0;
                if (faceActorId > 0) {
                    var actor = $gameActors.actor(faceActorId);
                    faceName = actor.faceName();
                    faceIndex = actor.faceIndex();
                    if (argFaceIndex != null) {
                        faceIndex = argFaceIndex;
                    }
                }
                context.push({ 'code': 101, 'indent': this.indent, 'parameters': [faceName, faceIndex, 0, 2] });
                for (var _i = 0, _a = context.data; _i < _a.length; _i++) {
                    var msg = _a[_i];
                    context.push({ 'code': 401, 'indent': this.indent, 'parameters': [this.replaceMessage(msg)] });
                }
            };
            Scenario_Converter.prototype.convertCommand_cos = function (actorId, context) {
                var types = ['outer', 'innerTop', 'innerBottom', 'face', 'acceOn', 'acceOff'];
                for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                    var type = types_1[_i];
                    if (context.header[type]) {
                        var id = context.header[type];
                        context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie " + type + " " + actorId + " " + id] });
                    }
                }
            };
            Scenario_Converter.prototype.convertCommand_mob = function (mobId, context) {
                var name = context.headerStr('name');
                this._defaultMobNameMap[mobId] = name;
                var face = context.headerStr('face');
                var index = context.headerInt('index', 0);
                if (face) {
                    this._defaultMobFaceMap[mobId] = [face, index];
                }
            };
            Scenario_Converter.prototype.convertCommand_message_h = function (context) {
                context.push({ 'code': 356, 'indent': this.indent, 'parameters': ["Tachie hideName"] });
                var actor = context.header['actor'] || '';
                var index = context.headerInt('index', 0);
                var back = context.headerInt('back', 0);
                var pos = context.headerInt('pos', 2);
                context.push({ 'code': 101, 'indent': this.indent, 'parameters': [actor, index, back, pos] });
                for (var _i = 0, _a = context.data; _i < _a.length; _i++) {
                    var msg = _a[_i];
                    context.push({ 'code': 401, 'indent': this.indent, 'parameters': [msg] });
                }
            };
            Scenario_Converter.prototype.convertCommand_message = function (context) {
                var value = context.header['value'];
                context.push({ 'code': 401, 'indent': this.indent, 'parameters': [this.replaceMessage(value)] });
            };
            Scenario_Converter.prototype.replaceMessage = function (text) {
                for (var key in this._replaceMap) {
                    if (!this._replaceMap.hasOwnProperty(key)) {
                        continue;
                    }
                    var value = this._replaceMap[key];
                    var regExp = new RegExp(key, 'g');
                    text = text.replace(regExp, value);
                }
                return text;
            };
            Scenario_Converter.prototype.convertCommand_choice_h = function (context) {
                var labels = [];
                if (context.header['label1']) {
                    labels.push(context.header['label1']);
                }
                if (context.header['label2']) {
                    labels.push(context.header['label2']);
                }
                if (context.header['label3']) {
                    labels.push(context.header['label3']);
                }
                if (context.header['label4']) {
                    labels.push(context.header['label4']);
                }
                if (context.header['label5']) {
                    labels.push(context.header['label5']);
                }
                if (context.header['label6']) {
                    labels.push(context.header['label6']);
                }
                var cancelType = context.headerInt('cancel', 0) - 1; // -2
                var defaultType = context.headerInt('default', 0) - 1;
                var positionType = context.headerInt('position', 2);
                var background = context.headerInt('background', 0);
                context.push({ 'code': 102, 'indent': this.indent, 'parameters': [labels, cancelType, defaultType, positionType, background] });
            };
            Scenario_Converter.prototype.convertCommand_choice_if = function (context) {
                var index = context.headerInt('index') - 1;
                this.indent++;
                context.push({ 'code': 402, 'indent': this.indent - 1, 'parameters': [index] });
            };
            Scenario_Converter.prototype.convertCommand_choice_cancel = function (context) {
                this.indent++;
                context.push({ 'code': 403, 'indent': this.indent - 1, 'parameters': [] });
            };
            Scenario_Converter.prototype.convertCommand_choice_end = function (context) {
                this.indent--;
                context.push({ 'code': 0, 'indent': this.indent, 'parameters': [] });
            };
            /**
             * ○ 条件分岐（スイッチ）
             */
            Scenario_Converter.prototype.convertCommand_if_sw = function (context) {
                this.indent++;
                var ifnum = 0;
                var id = context.headerInt('id');
                var flag = context.headerStr('flag', 'on') === 'on' ? 0 : 1;
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
            };
            /**
             * ○ 条件分岐（変数）
             */
            Scenario_Converter.prototype.convertCommand_if_var = function (context) {
                this.indent++;
                var ifnum = 1;
                var id = context.headerInt('id');
                var value = context.headerStr('value');
                var reg = /(var\.)/;
                var type = reg.exec(value) ? 1 : 0; //0:数値 1:変数
                var op = ['=', '>=', '<=', '>', '<', '><'].indexOf(context.headerStr('op')) || 0;
                if (type === 1 && parseInt(value) <= 0) {
                    throw new Error('変数指定時に「0」以下が使われました。');
                }
                var valueNum = /(\d+)/.exec(value);
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, type, parseInt(valueNum[0]), op] });
            };
            /**
             * ○ 条件分岐（セルフスイッチ）
             */
            Scenario_Converter.prototype.convertCommand_if_self_sw = function (context) {
                this.indent++;
                var ifnum = 2;
                var id = context.headerStr('id');
                var flag = context.headerStr('flag', 'on') === 'on' ? 0 : 1;
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
            };
            /**
             * ○ 条件分岐（タイマー）
             */
            Scenario_Converter.prototype.convertCommand_if_timer = function (context) {
                this.indent++;
                var ifnum = 3;
                var time = context.headerInt('time');
                var op = ['>=', '<=', '<'].indexOf(context.headerStr('op')) || 0;
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, time, op] });
            };
            /**
             * ○ 条件分岐（アクター）
             */
            Scenario_Converter.prototype.convertCommand_if_actor = function (context) {
                this.indent++;
                var ifnum = 4;
                var id = context.headerInt('id');
                var type = 0;
                var value = 0;
                switch (context.headerStr('type')) {
                    case 'party':
                        type = 0;
                        value = 0;
                        break;
                    case 'name':
                        type = 1;
                        value = context.headerInt('value');
                        break;
                    case 'class':
                        type = 2;
                        new SimpleScenario.NotEmptyValidator().validate(context, 'value', context.header['value']);
                        new SimpleScenario.NumericValidator(1).validate(context, 'value', context.header['value']);
                        value = context.headerInt('value');
                        break;
                    case 'skill':
                        type = 3;
                        new SimpleScenario.NotEmptyValidator().validate(context, 'value', context.header['value']);
                        new SimpleScenario.NumericValidator(1).validate(context, 'value', context.header['value']);
                        value = context.headerInt('value');
                        break;
                    case 'weapon':
                        type = 4;
                        new SimpleScenario.NotEmptyValidator().validate(context, 'value', context.header['value']);
                        new SimpleScenario.NumericValidator(1).validate(context, 'value', context.header['value']);
                        value = context.headerInt('value');
                        break;
                    case 'armor':
                        type = 5;
                        new SimpleScenario.NotEmptyValidator().validate(context, 'value', context.header['value']);
                        new SimpleScenario.NumericValidator(1).validate(context, 'value', context.header['value']);
                        value = context.headerInt('value');
                        break;
                    case 'state':
                        type = 6;
                        new SimpleScenario.NotEmptyValidator().validate(context, 'value', context.header['value']);
                        new SimpleScenario.NumericValidator(1).validate(context, 'value', context.header['value']);
                        value = context.headerInt('value');
                        break;
                    default:
                        type = 0;
                        value = 0;
                        break;
                }
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, type, value] });
            };
            /**
             * ○ 条件分岐（敵キャラ）
             */
            Scenario_Converter.prototype.convertCommand_if_enemy = function (context) {
                this.indent++;
                var ifnum = 5;
                var type = 0;
                var value = 0;
                var enemy = context.headerInt('enemy');
                switch (context.headerStr('type')) {
                    case 'visible':
                        type = 0;
                        value = 0;
                        break;
                    case 'state':
                        type = 1;
                        new SimpleScenario.NotEmptyValidator().validate(context, 'value', context.header['value']);
                        new SimpleScenario.NumericValidator(1).validate(context, 'value', context.header['value']);
                        value = context.headerInt('value');
                        break;
                    default:
                        type = 0;
                        value = 0;
                        break;
                }
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, enemy, type, value] });
            };
            /**
             * ○ 条件分岐（キャラクター）
             */
            Scenario_Converter.prototype.convertCommand_if_character = function (context) {
                this.indent++;
                var ifnum = 6;
                var id = context.headerInt('id');
                var direction = 0;
                switch (context.headerStr('direction')) {
                    case '2':
                    case 'down':
                        direction = 2;
                        break;
                    case '4':
                    case 'left':
                        direction = 4;
                        break;
                    case '6':
                    case 'right':
                        direction = 6;
                        break;
                    case '8':
                    case 'up':
                        direction = 8;
                        break;
                }
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, direction] });
            };
            /**
             * ○ 条件分岐（乗り物）
             */
            Scenario_Converter.prototype.convertCommand_if_vehicle = function (context) {
                this.indent++;
                var ifnum = 13;
                var vehicle = context.headerInt('vehicle');
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, vehicle] });
            };
            /**
             * ○ 条件分岐（お金）
             */
            Scenario_Converter.prototype.convertCommand_if_money = function (context) {
                this.indent++;
                var ifnum = 7;
                var money = context.headerInt('money');
                var op = ['ge', 'le', 'lt'].indexOf(context.header['op']) || 0;
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, money, op] });
            };
            /**
             * ○ 条件分岐（アイテム）
             */
            Scenario_Converter.prototype.convertCommand_if_item = function (context) {
                this.indent++;
                var ifnum = 8;
                var id = context.headerInt('id');
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id] });
            };
            /**
             * ○ 条件分岐（武器）
             */
            Scenario_Converter.prototype.convertCommand_if_weapon = function (context) {
                this.indent++;
                var ifnum = 9;
                var id = context.headerInt('id');
                var equip = context.headerStr('equip', 'false') == 'true' ? true : false;
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, equip] });
            };
            /**
             * ○ 条件分岐（防具）
             */
            Scenario_Converter.prototype.convertCommand_if_armor = function (context) {
                this.indent++;
                var ifnum = 10;
                var id = context.headerInt('id');
                var equip = context.headerStr('equip', 'false') == 'true' ? true : false;
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, equip] });
            };
            /**
             * ○ 条件分岐（ボタン）
             */
            Scenario_Converter.prototype.convertCommand_if_button = function (context) {
                this.indent++;
                var ifnum = 11;
                var button = 0;
                switch (context.headerStr('button')) {
                    case '2':
                    case 'down':
                        button = 2;
                        break;
                    case '4':
                    case 'left':
                        button = 4;
                        break;
                    case '6':
                    case 'right':
                        button = 6;
                        break;
                    case '8':
                    case 'up':
                        button = 8;
                        break;
                    case '11':
                    case 'A':
                        button = 11;
                        break;
                    case '12':
                    case 'B':
                        button = 12;
                        break;
                    case '13':
                    case 'C':
                        button = 13;
                        break;
                    case '14':
                    case 'X':
                        button = 14;
                        break;
                    case '15':
                    case 'Y':
                        button = 15;
                        break;
                    case '16':
                    case 'Z':
                        button = 16;
                        break;
                    case '17':
                    case 'L':
                        button = 17;
                        break;
                    case '18':
                    case 'R':
                        button = 18;
                        break;
                }
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, button] });
            };
            /**
             * ○ 条件分岐（スクリプト）
             */
            Scenario_Converter.prototype.convertCommand_if_script = function (context) {
                this.indent++;
                var ifnum = 12;
                var script = context.headerStr('script');
                script = script.replace(/<!!>/g, '=');
                script = script.replace(/<ii>/g, ' ');
                context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, script] });
            };
            /**
             * ○ 条件分岐（それ以外）
             */
            Scenario_Converter.prototype.convertCommand_else = function (context) {
                this.indent++;
                context.push({ 'code': 411, 'indent': this.indent - 1, 'parameters': [] });
            };
            Scenario_Converter.prototype.convertCommand_end_else = function (context) {
                this.indent--;
                context.push({ 'code': 0, 'indent': this.indent + 1, 'parameters': [] });
                this.indent++;
                context.push({ 'code': 411, 'indent': this.indent - 1, 'parameters': [] });
            };
            /**
             * ○ イベントの中断
             */
            Scenario_Converter.prototype.convertCommand_event_break = function (context) {
                context.push({ 'code': 115, 'indent': this.indent, 'parameters': [] });
            };
            /**
             * ○ イベントの中断（returnタグにて）
             */
            Scenario_Converter.prototype.convertCommand_return = function (context) {
                context.push({ 'code': 115, 'indent': this.indent, 'parameters': [] });
            };
            /**
             * ○ コモンイベント
             */
            Scenario_Converter.prototype.convertCommand_common = function (context) {
                var id = context.headerInt('id');
                context.push({ 'code': 117, 'indent': this.indent, 'parameters': [id] });
            };
            /**
             * ○ ラベル
             */
            Scenario_Converter.prototype.convertCommand_label = function (context) {
                var value = context.headerStr('value');
                context.push({ 'code': 118, 'indent': this.indent, 'parameters': [value] });
            };
            /**
             * ○ ラベルジャンプ
             */
            Scenario_Converter.prototype.convertCommand_label_jump = function (context) {
                var value = context.headerStr('value');
                context.push({ 'code': 119, 'indent': this.indent, 'parameters': [value] });
            };
            /**
             * ○ 注釈
             */
            Scenario_Converter.prototype.convertCommand_comment = function (context) {
                var value = context.headerStr('value');
                context.push({ 'code': 108, 'indent': this.indent, 'parameters': [value] });
            };
            /**
             * ○ 注釈（２行目以降）
             */
            Scenario_Converter.prototype.convertCommand_comment2 = function (context) {
                var value = context.headerStr('value');
                context.push({ 'code': 408, 'indent': this.indent, 'parameters': [value] });
            };
            Scenario_Converter.prototype.convertCommand_sw = function (context) {
                var id = context.headerInt('id');
                var end = context.headerInt('end', id);
                var flag = context.headerStr('flag') === 'on' ? 0 : 1;
                context.push({ 'code': 121, 'indent': this.indent, 'parameters': [id, end, flag] });
            };
            Scenario_Converter.prototype.convertCommand_var = function (context) {
                var id = context.headerInt('id');
                var end = context.headerInt('end', id);
                var op = ['=', '+', '-', '*', '/', '%'].indexOf(context.headerStr('op')) || 0;
                var value = context.headerInt('value');
                context.push({ 'code': 122, 'indent': this.indent, 'parameters': [id, end, op, 0, value] });
            };
            Scenario_Converter.prototype.convertCommand_self_sw = function (context) {
                var id = context.headerStr('id');
                var flag = context.headerStr('flag') === 'on' ? 0 : 1;
                context.push({ 'code': 123, 'indent': this.indent, 'parameters': [id, flag] });
            };
            Scenario_Converter.prototype.convertCommand_timer = function (context) {
                var flag = context.headerStr('flag') === 'on' ? 0 : 1;
                var time = context.headerInt('time');
                context.push({ 'code': 124, 'indent': this.indent, 'parameters': [flag, time] });
            };
            Scenario_Converter.prototype.convertCommand_save_disable = function (context) {
                var flag = context.headerBool('flag', true) ? 0 : 1;
                context.push({ 'code': 134, 'indent': this.indent, 'parameters': [flag] });
            };
            Scenario_Converter.prototype.convertCommand_menu_disable = function (context) {
                var flag = context.headerBool('flag', true) ? 0 : 1;
                context.push({ 'code': 135, 'indent': this.indent, 'parameters': [flag] });
            };
            Scenario_Converter.prototype.convertCommand_encount_disable = function (context) {
                var flag = context.headerBool('flag', true) ? 0 : 1;
                context.push({ 'code': 136, 'indent': this.indent, 'parameters': [flag] });
            };
            Scenario_Converter.prototype.convertCommand_formation_disable = function (context) {
                var flag = context.headerBool('flag', true) ? 0 : 1;
                context.push({ 'code': 137, 'indent': this.indent, 'parameters': [flag] });
            };
            Scenario_Converter.prototype.convertCommand_map_move = function (context) {
                var direction;
                switch (context.headerStr('direction')) {
                    case '2':
                    case 'down':
                        direction = 2;
                        break;
                    case '4':
                    case 'left':
                        direction = 4;
                        break;
                    case '6':
                    case 'right':
                        direction = 6;
                        break;
                    case '8':
                    case 'up':
                        direction = 8;
                }
                var fade;
                switch (context.headerStr('fade')) {
                    case '1':
                    case 'white':
                        fade = 1;
                        break;
                    case '2':
                    case 'none':
                        fade = 2;
                        break;
                    default:
                        fade = 0;
                }
                var type = context.headerStr('type', 'const') === 'const' ? 0 : 1;
                var map = context.headerInt('map');
                var x = context.headerInt('x');
                var y = context.headerInt('y');
                context.push({ 'code': 201, 'indent': this.indent, 'parameters': [type, map, x, y, direction, fade] });
            };
            Scenario_Converter.prototype.convertCommand_vehicle_pos = function (context) {
                var vehicle = context.headerInt('vehicle');
                var type = context.headerStr('type', 'const') === 'const' ? 0 : 1;
                var map = context.headerInt('map');
                var x = context.headerInt('x');
                var y = context.headerInt('y');
                context.push({ 'code': 202, 'indent': this.indent, 'parameters': [vehicle, type, map, x, y] });
            };
            Scenario_Converter.prototype.convertCommand_event_pos = function (context) {
                var id = context.headerInt('id');
                var type;
                if (context.headerStr('type') === 'var') {
                    type = 1;
                }
                else if (context.headerStr('type') === 'var') {
                    type = 2;
                }
                else {
                    type = 0;
                }
                var x = context.headerInt('x');
                var y = context.headerInt('y');
                var direction;
                switch (context.headerStr('direction')) {
                    case '2':
                    case 'down':
                        direction = 2;
                        break;
                    case '4':
                    case 'left':
                        direction = 4;
                        break;
                    case '6':
                    case 'right':
                        direction = 6;
                        break;
                    case '8':
                    case 'up':
                        direction = 8;
                        break;
                    default:
                        direction = 0;
                        break;
                }
                context.push({ 'code': 203, 'indent': this.indent, 'parameters': [id, type, x, y, direction] });
            };
            Scenario_Converter.prototype.convertCommand_scroll_map = function (context) {
                var direction;
                switch (context.headerStr('direction')) {
                    case '2':
                    case 'down':
                        direction = 2;
                        break;
                    case '4':
                    case 'left':
                        direction = 4;
                        break;
                    case '6':
                    case 'right':
                        direction = 6;
                        break;
                    case '8':
                    case 'up':
                        direction = 8;
                        break;
                }
                var num = context.headerInt('num');
                var speed = context.headerInt('speed', 4);
                context.push({ 'code': 204, 'indent': this.indent, 'parameters': [direction, num, speed] });
            };
            Scenario_Converter.prototype.convertCommand_route_h = function (context) {
                var event = context.headerInt('event');
                var repeat = context.headerBool('repeat', false);
                var skip = context.headerBool('skip', false);
                var wait = context.headerBool('wait', true);
                if (context.data.length === 0) {
                    context.error('移動ルートが設定されていません。');
                    return;
                }
                var list = [];
                for (var _i = 0, _a = context.data; _i < _a.length; _i++) {
                    var line = _a[_i];
                    list.push(this.convertCommand_route(context, line));
                }
                list.push({ 'code': 0 });
                var routes = { repeat: repeat, skippable: skip, wait: wait, list: list };
                context.push({ 'code': 205, 'indent': this.indent, 'parameters': [event, routes] });
            };
            Scenario_Converter.prototype.convertCommand_route = function (context, line) {
                var headerList = line.split(' ');
                var header = this.parseHeader(headerList);
                var type = header.headerStr('type');
                var parameters = [];
                var code = parseInt(type);
                if (isNaN(code)) {
                    switch (type) {
                        case 'down':
                            code = 1;
                            break;
                        case 'left':
                            code = 2;
                            break;
                        case 'right':
                            code = 3;
                            break;
                        case 'up':
                            code = 4;
                            break;
                        case 'dl':
                            code = 5;
                            break;
                        case 'dr':
                            code = 6;
                            break;
                        case 'ul':
                            code = 7;
                            break;
                        case 'ur':
                            code = 8;
                            break;
                        case 'random':
                            code = 9;
                            break;
                        case 'toward':
                            code = 10;
                            break;
                        case 'away':
                            code = 11;
                            break;
                        case 'foward':
                            code = 12;
                            break;
                        case 'backward':
                            code = 13;
                            break;
                        case 'jump':
                            code = 14;
                            new SimpleScenario.NumericValidator(-100, 100).validate(context, 'x', header['x']);
                            new SimpleScenario.NumericValidator(-100, 100).validate(context, 'y', header['y']);
                            parameters.push(header.headerInt('x', 0));
                            parameters.push(header.headerInt('y', 0));
                            break;
                        case 'wait':
                            code = 15;
                            new SimpleScenario.NumericValidator(1, 999).validate(context, 'time', header['time']);
                            parameters.push(header.headerInt('time', 60));
                            break;
                        case 'turn_down':
                            code = 16;
                            break;
                        case 'turn_left':
                            code = 17;
                            break;
                        case 'turn_right':
                            code = 18;
                            break;
                        case 'turn_up':
                            code = 19;
                            break;
                        case 'turn_90_r':
                            code = 20;
                            break;
                        case 'turn_90_l':
                            code = 21;
                            break;
                        case 'turn_180':
                            code = 22;
                            break;
                        case 'turn_90_rl':
                        case 'turn_90_lr':
                            code = 23;
                            break;
                        case 'turn_random':
                            code = 24;
                            break;
                        case 'turn_toward':
                            code = 25;
                            break;
                        case 'turn_away':
                            code = 26;
                            break;
                        case 'switch_on':
                        case 'sw_on':
                            code = 27;
                            new SimpleScenario.NotEmptyValidator().validate(context, 'id', header['id']);
                            new SimpleScenario.NumericValidator(1).validate(context, 'id', header['id']);
                            parameters['id'] = header.headerInt('id');
                            break;
                        case 'switch_off':
                        case 'sw_off':
                            code = 28;
                            new SimpleScenario.NotEmptyValidator().validate(context, 'id', header['id']);
                            new SimpleScenario.NumericValidator(1).validate(context, 'id', header['id']);
                            parameters.push(header.headerInt('id'));
                            break;
                        case 'change_speed':
                            code = 29;
                            new SimpleScenario.NumericValidator(1, 6).validate(context, 'speed', header['speed']);
                            parameters.push(header.headerInt('speed', 3));
                            break;
                        case 'change_freq':
                            code = 30;
                            new SimpleScenario.NumericValidator(1, 5).validate(context, 'freq', header['freq']);
                            parameters.push(header.headerInt('freq', 3));
                            break;
                        case 'walk_anime_on':
                            code = 31;
                            break;
                        case 'walk_anime_off':
                            code = 32;
                            break;
                        case 'step_anime_on':
                            code = 33;
                            break;
                        case 'step_anime_off':
                            code = 34;
                            break;
                        case 'dir_fix_on':
                            code = 35;
                            break;
                        case 'dir_fix_off':
                            code = 36;
                            break;
                        case 'through_on':
                            code = 37;
                            break;
                        case 'through_off':
                            code = 38;
                            break;
                        case 'transparent_on':
                            code = 39;
                            break;
                        case 'transparent_off':
                            code = 40;
                            break;
                        case 'change_graphic':
                            code = 41;
                            new SimpleScenario.NotEmptyValidator().validate(context, 'file', header['file']);
                            new SimpleScenario.NotEmptyValidator().validate(context, 'index', header['index']);
                            new SimpleScenario.NumericValidator(0, 7).validate(context, 'index', header['index']);
                            parameters.push(header.headerStr('file'));
                            parameters.push(header.headerInt('index'));
                            break;
                        case 'change_opacity':
                            code = 42;
                            new SimpleScenario.NumericValidator(0, 255).validate(context, 'opacity', header['opacity']);
                            parameters.push(header.headerInt('opacity', 255));
                            break;
                        case 'change_blend':
                            code = 43;
                            new SimpleScenario.NumericValidator(0, 2).validate(context, 'blend', header['blend']);
                            parameters.push(header.headerInt('blend', 0));
                            break;
                        case 'play_se':
                            code = 44;
                            new SimpleScenario.NumericValidator(0, 100).validate(context, 'volume', header['volume']);
                            new SimpleScenario.NumericValidator(50, 150).validate(context, 'pitch', header['pitch']);
                            new SimpleScenario.NumericValidator(-100, 100).validate(context, 'pan', header['pan']);
                            var file = header.headerStr('file', '');
                            var volume = header.headerInt('volume', 100);
                            var pitch = header.headerInt('pitch', 100);
                            var pan = header.headerInt('pan', 0);
                            var obj = {};
                            obj['name'] = file;
                            obj['volume'] = volume;
                            obj['pitch'] = pitch;
                            obj['pan'] = pan;
                            parameters.push(obj);
                            break;
                        case 'script':
                            code = 45;
                            new SimpleScenario.NotEmptyValidator().validate(context, 'script', header['script']);
                            var script = header['script'];
                            script = script.replace(/<!!>/g, '=');
                            script = script.replace(/<ii>/g, ' ');
                            parameters.push(script);
                            break;
                        default:
                            context.error('存在しない移動コマンドです。' + type);
                            break;
                    }
                }
                return { code: code, indent: null, parameters: parameters };
            };
            Scenario_Converter.prototype.convertCommand_vehicle = function (context) {
                context.push({ 'code': 206, 'indent': this.indent, 'parameters': [] });
            };
            Scenario_Converter.prototype.convertCommand_transparent = function (context) {
                var flag = context.headerBool('flag', true) ? 0 : 1;
                context.push({ 'code': 211, 'indent': this.indent, 'parameters': [flag] });
            };
            /**
             * ○ アニメーションの表示
             */
            Scenario_Converter.prototype.convertCommand_anime = function (context) {
                var target = context.headerInt('target');
                var anime = context.headerInt('anime');
                var wait = context.headerBool('wait', false);
                context.push({ 'code': 212, 'indent': this.indent, 'parameters': [target, anime, wait] });
            };
            /**
             * ○ フキダシアイコンの表示
             */
            Scenario_Converter.prototype.convertCommand_balloon = function (context) {
                var target = context.headerInt('target');
                var balloon = context.headerInt('balloon');
                var wait = context.headerBool('wait', false);
                context.push({ 'code': 213, 'indent': this.indent, 'parameters': [target, balloon, wait] });
            };
            /**
             * ○ イベントの一時消去
             */
            Scenario_Converter.prototype.convertCommand_erace = function (context) {
                context.push({ 'code': 214, 'indent': this.indent, 'parameters': [] });
            };
            Scenario_Converter.prototype.convertCommand_followers = function (context) {
                var flag = context.headerBool('flag', true) ? 0 : 1;
                context.push({ 'code': 216, 'indent': this.indent, 'parameters': [flag] });
            };
            Scenario_Converter.prototype.convertCommand_gather = function (context) {
                context.push({ 'code': 217, 'indent': this.indent, 'parameters': [] });
            };
            Scenario_Converter.prototype.convertCommand_fadeout = function (context) {
                var time = context.headerInt('time', -1);
                context.push({ 'code': 221, 'indent': this.indent, 'parameters': [time] });
            };
            Scenario_Converter.prototype.convertCommand_fadein = function (context) {
                var time = context.headerInt('time', -1);
                context.push({ 'code': 222, 'indent': this.indent, 'parameters': [time] });
            };
            Scenario_Converter.prototype.convertCommand_tone = function (context) {
                var tone = context.headerTone();
                var time = context.headerInt('time', 60);
                var wait = context.headerBool('wait', true);
                context.push({ 'code': 223, 'indent': this.indent, 'parameters': [tone, time, wait] });
            };
            Scenario_Converter.prototype.convertCommand_flash = function (context) {
                var red = context.headerInt('red', 255);
                var green = context.headerInt('green', 255);
                var blue = context.headerInt('blue', 255);
                var strength = context.headerInt('strength', 170);
                var color = [red, green, blue, strength];
                var time = context.headerInt('time', 60);
                var wait = context.headerBool('wait', true);
                context.push({ 'code': 224, 'indent': this.indent, 'parameters': [color, time, wait] });
            };
            Scenario_Converter.prototype.convertCommand_shake = function (context) {
                var strength = context.headerInt('strength', 5);
                var speed = context.headerInt('speed', 5);
                var time = context.headerInt('time', 60);
                var wait = context.headerBool('wait', true);
                context.push({ 'code': 225, 'indent': this.indent, 'parameters': [strength, speed, time, wait] });
            };
            Scenario_Converter.prototype.convertCommand_wait = function (context) {
                var time = context.headerInt('time', 60);
                context.push({ 'code': 230, 'indent': this.indent, 'parameters': [time] });
            };
            Scenario_Converter.prototype.convertCommand_picture = function (context) {
                var layer = context.headerInt('layer');
                var file = context.header['file'];
                var origin = context.header['origin'] === 'center' ? 1 : 0;
                var type = context.header['type'] === 'var' ? 1 : 0;
                var x = context.headerInt('x', 0);
                var y = context.headerInt('y', 0);
                var zoomX = context.headerInt('zoom_x', 100);
                var zoomy = context.headerInt('zoom_y', 100);
                var opacity = context.headerInt('transparent', 255);
                var blend = context.headerInt('blend', 0);
                context.push({ 'code': 231, 'indent': this.indent, 'parameters': [layer, file, origin, type, x, y, zoomX, zoomy, opacity, blend] });
            };
            Scenario_Converter.prototype.convertCommand_picture_move = function (context) {
                var layer = context.headerInt('layer');
                var origin = context.headerInt('origin', 0);
                var type = context.header['type'] === 'var' ? 1 : 0;
                var x = context.headerInt('x', 0);
                var y = context.headerInt('y', 0);
                var zoomX = context.headerInt('zoom_x', 100);
                var zoomy = context.headerInt('zoom_y', 100);
                var opacity = context.headerInt('transparent', 255);
                var blend = context.headerInt('blend', 0);
                var time = context.headerInt('time', 0);
                var wait = context.headerBool('wait', true);
                context.push({ 'code': 232, 'indent': this.indent, 'parameters': [layer, 0, origin, type, x, y, zoomX, zoomy, opacity, blend, time, wait] });
            };
            Scenario_Converter.prototype.convertCommand_picture_rotation = function (context) {
                var layer = context.headerInt('layer');
                var speed = context.headerInt('speed', 5);
                context.push({ 'code': 233, 'indent': this.indent, 'parameters': [layer, speed] });
            };
            Scenario_Converter.prototype.convertCommand_picture_tone = function (context) {
                var layer = context.headerInt('layer');
                var tone = context.headerTone();
                var time = context.headerInt('time', 60);
                var wait = context.headerBool('wait', true);
                context.push({ 'code': 234, 'indent': this.indent, 'parameters': [layer, tone, time, wait] });
            };
            Scenario_Converter.prototype.convertCommand_picture_erace = function (context) {
                var layer = context.headerInt('layer');
                context.push({ 'code': 235, 'indent': this.indent, 'parameters': [layer] });
            };
            Scenario_Converter.prototype.convertCommand_picture_weather = function (context) {
                var weather = context.headerStr('weather', 'none');
                var strength = context.headerInt('strength', 5);
                var time = context.headerInt('time', 60);
                var wait = context.headerBool('wait', true);
                context.push({ 'code': 236, 'indent': this.indent, 'parameters': [weather, strength, time, wait] });
            };
            /**
             * ○ ＢＧＭの演奏
             */
            Scenario_Converter.prototype.convertCommand_bgm = function (context) {
                var name = context.headerStr('file');
                var volume = context.headerInt('volume', 100);
                var pitch = context.headerInt('pitch', 100);
                var pan = context.headerInt('pan', 0);
                var bgm = { name: name, volume: volume, pitch: pitch, pan: pan };
                context.push({ 'code': 241, 'indent': this.indent, 'parameters': [bgm] });
            };
            /**
             * ○ ＢＧＭのフェードアウト
             */
            Scenario_Converter.prototype.convertCommand_fadeout_bgm = function (context) {
                var time = context.headerInt('time', 10);
                context.push({ 'code': 242, 'indent': this.indent, 'parameters': [time] });
            };
            /**
             * ○ ＢＧＭの保存
             */
            Scenario_Converter.prototype.convertCommand_save_bgm = function (context) {
                context.push({ 'code': 243, 'indent': this.indent, 'parameters': [] });
            };
            /**
             * ○ ＢＧＭの再開
             */
            Scenario_Converter.prototype.convertCommand_resume_bgm = function (context) {
                context.push({ 'code': 244, 'indent': this.indent, 'parameters': [] });
            };
            /**
             * ○ ＢＧＳの演奏
             */
            Scenario_Converter.prototype.convertCommand_bgs = function (context) {
                var name = context.headerStr('file');
                var volume = context.headerInt('volume', 100);
                var pitch = context.headerInt('pitch', 100);
                var pan = context.headerInt('pan', 0);
                var bgs = { name: name, volume: volume, pitch: pitch, pan: pan };
                context.push({ 'code': 245, 'indent': this.indent, 'parameters': [bgs] });
            };
            /**
             * ○ ＢＧＳのフェードアウト
             */
            Scenario_Converter.prototype.convertCommand_fadeout_bgs = function (context) {
                var time = context.headerInt('time', 10);
                context.push({ 'code': 246, 'indent': this.indent, 'parameters': [time] });
            };
            /**
             * ○ ＭＥの演奏
             */
            Scenario_Converter.prototype.convertCommand_me = function (context) {
                var name = context.headerStr('file');
                var volume = context.headerInt('volume', 100);
                var pitch = context.headerInt('pitch', 100);
                var pan = context.headerInt('pan', 0);
                var me = { name: name, volume: volume, pitch: pitch, pan: pan };
                context.push({ 'code': 249, 'indent': this.indent, 'parameters': [me] });
            };
            /**
             * ○ ＳＥの演奏
             */
            Scenario_Converter.prototype.convertCommand_se = function (context) {
                var name = context.headerStr('file');
                var volume = context.headerInt('volume', 100);
                var pitch = context.headerInt('pitch', 100);
                var pan = context.headerInt('pan', 0);
                var se = { name: name, volume: volume, pitch: pitch, pan: pan };
                context.push({ 'code': 250, 'indent': this.indent, 'parameters': [se] });
            };
            /**
             * ○ ＳＥの停止
             */
            Scenario_Converter.prototype.convertCommand_stop_se = function (context) {
                context.push({ 'code': 251, 'indent': this.indent, 'parameters': [] });
            };
            /**
             * ○ メニュー画面を開く
             */
            Scenario_Converter.prototype.convertCommnad_menu_open = function (context) {
                context.push({ 'code': 351, 'indent': this.indent, 'parameters': [] });
            };
            /**
             * ○ セーブ画面を開く
             */
            Scenario_Converter.prototype.convertCommnad_save_open = function (context) {
                context.push({ 'code': 352, 'indent': this.indent, 'parameters': [] });
            };
            /**
             * ○ ゲームオーバー
             */
            Scenario_Converter.prototype.convertCommnad_gameover = function (context) {
                context.push({ 'code': 353, 'indent': this.indent, 'parameters': [] });
            };
            /**
             * ○ タイトル画面に戻す
             */
            Scenario_Converter.prototype.convertCommnad_title_return = function (context) {
                context.push({ 'code': 354, 'indent': this.indent, 'parameters': [] });
            };
            /**
             * ○ ムービーの再生
             */
            Scenario_Converter.prototype.convertCommand_movie = function (context) {
                var file = context.headerStr('file');
                var playbackRate = parseFloat(context.headerStr('playback_rate'));
                if (isNaN(playbackRate)) {
                    playbackRate = 1;
                }
                context.push({ 'code': 261, 'indent': this.indent, 'parameters': [file, playbackRate] });
            };
            /**
             * ○ タイルセットの変更
             */
            Scenario_Converter.prototype.convertCommand_tileset = function (context) {
                var id = context.headerStr('id');
                context.push({ 'code': 282, 'indent': this.indent, 'parameters': [id] });
            };
            Scenario_Converter.prototype.convertCommand_all_recovery = function (context) {
                var params = context.headerVar('actor');
                context.push({ 'code': 314, 'indent': this.indent, 'parameters': [params[0], params[1]] });
            };
            Scenario_Converter.prototype.convertCommand_exp = function (context) {
                var actor = context.headerVar('actor');
                var value = context.headerOperateVar('value');
                var message = context.headerBool('message', false);
                context.push({ 'code': 315, 'indent': this.indent, 'parameters': [actor[0], actor[1], value[0], value[1], value[2], message] });
            };
            Scenario_Converter.prototype.convertCommand_level = function (context) {
                var actor = context.headerVar('actor');
                var value = context.headerOperateVar('value');
                var message = context.headerBool('message', false);
                context.push({ 'code': 316, 'indent': this.indent, 'parameters': [actor[0], actor[1], value[0], value[1], value[2], message] });
            };
            Scenario_Converter.prototype.convertCommand_name = function (context) {
                var actor = context.headerInt('actor');
                var value = context.headerStr('value');
                context.push({ 'code': 320, 'indent': this.indent, 'parameters': [actor, value] });
            };
            Scenario_Converter.prototype.convertCommand_class = function (context) {
                var actor = context.headerInt('actor');
                var value = context.headerInt('value');
                var keep_exp = context.headerBool('keep_exp', false);
                context.push({ 'code': 321, 'indent': this.indent, 'parameters': [actor, value, keep_exp] });
            };
            Scenario_Converter.prototype.convertCommand_nickname = function (context) {
                var actor = context.headerInt('actor');
                var value = context.headerInt('value');
                context.push({ 'code': 323, 'indent': this.indent, 'parameters': [actor, value] });
            };
            Scenario_Converter.prototype.convertCommand_end = function (context) {
                this.indent--;
                context.push({ 'code': 0, 'indent': this.indent + 1, 'parameters': [] });
            };
            return Scenario_Converter;
        }());
        SimpleScenario.Scenario_Converter = Scenario_Converter;
        var Block = /** @class */ (function () {
            function Block(lineNumber) {
                this.lineNumber = lineNumber;
                this.data = [];
            }
            Block.prototype.pushMsg = function (line) {
                if (AUTO_WARD_WRAP && line.indexOf('@') === -1) {
                    if (this.data.length === 0) {
                        this.data.push('<wrap>' + line);
                    }
                    else {
                        this.data.push('<br>' + line);
                    }
                }
                else {
                    this.data.push(line);
                }
            };
            return Block;
        }());
        var Context = /** @class */ (function () {
            function Context(file, lineNumber, command, list, _header, data) {
                this.file = file;
                this.lineNumber = lineNumber;
                this.command = command;
                this.list = list;
                this._header = _header;
                this.data = data;
            }
            Context.prototype.push = function (command) {
                this.list.push(command);
            };
            Object.defineProperty(Context.prototype, "header", {
                get: function () {
                    return this._header.header;
                },
                enumerable: true,
                configurable: true
            });
            Context.prototype.headerInt = function (id, defaultValue) {
                if (defaultValue === void 0) { defaultValue = 0; }
                return this._header.headerInt(id, defaultValue);
            };
            Context.prototype.headerStr = function (id, defaultValue) {
                if (defaultValue === void 0) { defaultValue = ''; }
                return this._header.headerStr(id, defaultValue);
            };
            Context.prototype.headerBool = function (id, defaultValue) {
                if (defaultValue === void 0) { defaultValue = false; }
                return this._header.headerBool(id, defaultValue);
            };
            Context.prototype.headerTone = function () {
                return this._header.headerTone();
            };
            Context.prototype.headerVar = function (id) {
                return this._header.headerVar(id);
            };
            Context.prototype.headerOperateVar = function (id) {
                return this._header.headerOperateVar(id);
            };
            Context.prototype.error = function (msg) {
                console.error("file: " + this.file + " line: " + this.lineNumber + " command: " + this.command + " " + msg);
            };
            Context.prototype.insertTop = function (command) {
                this.list.splice(0, 0, command);
            };
            return Context;
        }());
        SimpleScenario.Context = Context;
        var Header = /** @class */ (function () {
            function Header(header) {
                this.header = header;
            }
            Header.prototype.headerInt = function (id, defaultValue) {
                if (defaultValue === void 0) { defaultValue = 0; }
                var value = this.header[id];
                if (!value) {
                    return defaultValue;
                }
                var valueInt = parseInt(value);
                if (isNaN(valueInt)) {
                    return defaultValue;
                }
                return valueInt;
            };
            Header.prototype.headerStr = function (id, defaultValue) {
                if (defaultValue === void 0) { defaultValue = ''; }
                var value = this.header[id];
                if (!value) {
                    return defaultValue;
                }
                return value;
            };
            Header.prototype.headerBool = function (id, defaultValue) {
                if (defaultValue === void 0) { defaultValue = false; }
                var value = this.header[id];
                if (value === 'true') {
                    return true;
                }
                if (value === 'false') {
                    return false;
                }
                return defaultValue;
            };
            Header.prototype.headerTone = function () {
                var red = this.headerInt('red', 0);
                var green = this.headerInt('green', 0);
                var blue = this.headerInt('blue', 0);
                var gray = this.headerInt('gray', 0);
                var tone = [red, green, blue, gray];
                return tone;
            };
            Header.prototype.headerVar = function (id) {
                var value = this.header[id];
                var reg = /^[+]{0,1}(var\.){0,1}(\d+)$/;
                var ret = reg.exec(value);
                var paramId = parseInt(ret[2]);
                if (ret[1] === undefined) {
                    return [0, paramId];
                }
                else {
                    return [1, paramId];
                }
            };
            Header.prototype.headerOperateVar = function (id) {
                var value = this.header[id];
                var reg = /^([-]{0,1})(var\.){0,1}(\d+)$/;
                var ret = reg.exec(value);
                var operation = ret[1] === '-' ? 1 : 0;
                var paramId = parseInt(ret[3]);
                if (ret[2] === undefined) {
                    return [operation, 0, paramId];
                }
                else {
                    return [operation, 1, paramId];
                }
            };
            return Header;
        }());
        var _Game_Temp_initialize = Game_Temp.prototype.initialize;
        Game_Temp.prototype.initialize = function () {
            _Game_Temp_initialize.call(this);
            this.videoPlaybackRate = 1.0;
        };
        var WAIT_MODE_MOVIE_START = 1;
        var WAIT_MODE_MOVIE_END = 2;
        var _Game_Interpreter_updateWaitCount = Game_Interpreter.prototype.updateWaitCount;
        Game_Interpreter.prototype.updateWaitCount = function () {
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
        var _Game_Interpreter_command261 = Game_Interpreter.prototype.command261;
        Game_Interpreter.prototype.command261 = function () {
            if (!$gameMessage.isBusy()) {
                if (Graphics._isVideoVisible()) {
                    return false;
                }
                var playbackRate = this._params[1];
                if (!isNaN(playbackRate)) {
                    $gameTemp.videoPlaybackRate = playbackRate;
                }
                else {
                    $gameTemp.videoPlaybackRate = 1;
                }
                $gameTemp.sabaWaitForMovieMode = WAIT_MODE_MOVIE_START;
            }
            return _Game_Interpreter_command261.call(this);
        };
        // Fadeout Screen
        var _Game_Interpreter_command221 = Game_Interpreter.prototype.command221;
        Game_Interpreter.prototype.command221 = function () {
            if (!$gameMessage.isBusy()) {
                var fadeSpeed = parseInt(this._params[0]);
                if (isNaN(fadeSpeed) || fadeSpeed < 0) {
                    fadeSpeed = this.fadeSpeed();
                }
                if (this.isSkip()) {
                    fadeSpeed = Math.floor(fadeSpeed / 3);
                }
                $gameScreen.startFadeOut(fadeSpeed);
                this.wait(fadeSpeed);
                this._index++;
            }
            return false;
        };
        // Fadein Screen
        var _Game_Interpreter_command222 = Game_Interpreter.prototype.command222;
        Game_Interpreter.prototype.command222 = function () {
            if (!$gameMessage.isBusy()) {
                var fadeSpeed = parseInt(this._params[0]);
                if (isNaN(fadeSpeed) || fadeSpeed < 0) {
                    fadeSpeed = this.fadeSpeed();
                }
                if (this.isSkip()) {
                    fadeSpeed = Math.floor(fadeSpeed / 3);
                }
                $gameScreen.startFadeIn(fadeSpeed);
                this.wait(fadeSpeed);
                this._index++;
            }
            return false;
        };
        var _Graphics_onVideoLoad = Graphics._onVideoLoad;
        Graphics._onVideoLoad = function () {
            this._video.playbackRate = $gameTemp.videoPlaybackRate;
            _Graphics_onVideoLoad.call(this);
        };
        Saba.applyMyMethods(_Game_Interpreter, Game_Interpreter);
        Saba.applyMyMethods(_Scene_Map, Scene_Map);
    })(SimpleScenario = Saba.SimpleScenario || (Saba.SimpleScenario = {}));
})(Saba || (Saba = {}));

//=============================================================================
// Saba_TachieFace.js
//=============================================================================
/*:ja
 * @author Sabakan
 * @plugindesc 顔グラに立ち絵の画像を表示するプラグインです。
 *
 * @param faceScale
 * @desc 顔グラとして立ち絵を描画する時の拡大率(%)です
 * @default 100
 *
 * @param disableTachieFaceIdList
 * @desc 通常の顔グラを表示するアクターのリストです。空白区切り(2 3 4……など)
 * @default
 *
 * @param actorFaceSize
 * @desc 立ち絵の顔グラを表示する時のデフォルトサイズです。幅、高さの順です
 * @default 144, 144
 *
 * @param actor1offset
 * @desc アクター１のキャラの顔グラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor2offset
 * @desc アクター２のキャラの顔グラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor3offset
 * @desc アクター３のキャラの顔グラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor4offset
 * @desc アクター４のキャラの顔グラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor5offset
 * @desc アクター５のキャラの顔グラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor6offset
 * @desc アクター６のキャラの顔グラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor7offset
 * @desc アクター７のキャラの顔グラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor8offset
 * @desc アクター８のキャラの顔グラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor9offset
 * @desc アクター９のキャラの顔グラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor10offset
 * @desc アクター１０のキャラの顔グラのx座標，y座標の補正値です
 * @default 0, 0
 *
 *
 * @param showTachieActorFace
 * @desc 立ち絵を表示中も顔グラを表示する場合 true にします
 * @default false
 *
 * @param tachieActorFacePos
 * @desc 立ち絵の顔グラを表示する時の座標です。x、yの順です
 * @default 0, 0
 *
 * @help
 * Ver
 *
 *
 */
var Saba;
(function (Saba) {
    var Tachie;
    (function (Tachie) {
        Tachie.faceOffsetX = {};
        Tachie.faceOffsetY = {};
        var parameters = PluginManager.parameters('Saba_TachieFace');
        var disableTachieFaceIdList = Saba.toIntArray(parameters['disableTachieFaceIdList'].split(' '));
        Tachie.showTachieActorFace = parameters['showTachieActorFace'] === 'true';
        Tachie.actorFaceSize = Saba.toIntArray(parameters['actorFaceSize'].split(','));
        Tachie.tachieActorFacePos = Saba.toIntArray(parameters['tachieActorFacePos'].split(','));
        for (var i = 1; i <= 17; i++) {
            var offset1 = String(parameters['actor' + i + 'offset']).split(',');
            Tachie.faceOffsetX[i] = parseInt(offset1[0] || '0');
            Tachie.faceOffsetY[i] = parseInt(offset1[1] || '0');
            if (isNaN(Tachie.faceOffsetX[i])) {
                Tachie.faceOffsetX[i] = 0;
            }
            if (isNaN(Tachie.faceOffsetY[i])) {
                Tachie.faceOffsetY[i] = 0;
            }
        }
        var faceScale = parseInt(parameters['faceScale']);
        var _Scene_MenuBase_prototype_create = Scene_MenuBase.prototype.create;
        Scene_MenuBase.prototype.create = function () {
            _Scene_MenuBase_prototype_create.call(this);
            for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
                var actor = _a[_i];
                actor.preloadTachie();
            }
        };
        var _Window_Base_drawActorFace = Window_Base.prototype.drawActorFace;
        Window_Base.prototype.drawActorFace = function (actor, x, y, width, height, offsetX, offsetY, faceId, enabled) {
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            if (faceId === void 0) { faceId = 1; }
            if (enabled === void 0) { enabled = true; }
            if (disableTachieFaceIdList.indexOf(actor.actorId()) >= 0) {
                _Window_Base_drawActorFace.call(this, actor, x, y, width, height);
                return;
            }
            /*var imageAvailable = PIXI.utils.TextureCache[actor.bodyBackFile() + '.png'] || ImageManager.loadTachie(actor.bodyBackFile()).isReady();
            if (! imageAvailable) {
                _Window_Base_drawActorFace.call(this, actor, x, y, width, height);
                return true;
            }*/
            var actorId = actor.actorId();
            width = width || 250;
            height = height || 187;
            var yy = 0;
            var dx = x + Tachie.tachieActorFacePos[0] + offsetX - 40;
            var xxx = 0;
            if (actorId == 1) {
                yy = 56;
                dx += 20;
            }
            else if (actorId == 2) {
                yy = 90;
                dx += 20;
            }
            else if (actorId == 3) {
                yy = 80;
                dx += 10;
            }
            else if (actorId == 4) {
                yy = 70;
                dx -= 20;
            }
            else if (actorId == 14 || actorId == 15 || actorId == 16) {
                yy = 12;
                actor = $gameActors.actor(11);
                dx -= 20;
            }
            else {
                yy = 0;
            }
            var yyy = 35;
            var rect = new Rectangle(xxx, Tachie.faceOffsetY[actorId] + offsetY + yyy + yy, width, height);
            if (actorId == 1) {
                dx -= 10;
                //rect = new Rectangle(x, faceOffsetY[actorId] + offsetY + yyy + yy, width, height);
            }
            if (actorId == 2) {
                dx -= 10;
            }
            if (actorId == 3) {
                dx -= 10;
            }
            if (actorId == 11) {
                dx -= 30;
            }
            var dy = y + Tachie.tachieActorFacePos[1] - yyy - yy;
            var alpha = 1;
            if (!enabled) {
                alpha = 1;
            }
            this.drawTachieActor(actor, null, dx, dy, rect, faceId, 72 / 100.0, false, false, alpha);
        };
    })(Tachie = Saba.Tachie || (Saba.Tachie = {}));
})(Saba || (Saba = {}));

//=============================================================================
// NonmaskedWindowOverlay.js
//=============================================================================

/*:
 * @plugindesc ウィンドウをマスクせずに重ね合わせられるようにします。
 * @author aoitaku
 * @version 0.0.1 2015/11/15
 *
 * @param nonmaskedScene
 * @desc ウィンドウのマスク処理を無効化するシーン名（Scene_に続く文字列）をスペース区切りで列挙します。例：Menu Item
 *
 * @help ウィンドウをマスクせずに重ね合わせられるようにします。
 * ツクールMVのウィンドウ表示は下のウィンドウを上のウィンドウでマスクするため
 * 半透明のウィンドウを重ね合わせても下のウィンドウを透過して表示できません。
 * 
 * このプラグインは、半透明のウィンドウを重ねられるようにシーン単位でマスク処理
 * をカットできるようにします。
 * 半透明のウィンドウを重ねたいシーンでenableOverlayWithoutMaskを呼び出すと、
 * マスク処理がカットされるようになります。
 *
 * プラグイン管理メニューで、nonmaskedSceneパラメータにシーン名を列挙することで、
 * シーン毎にウィンドウのマスク処理を無効化することができます。
 * 例えばメニュー画面や戦闘シーンでウィンドウのマスク処理を無効化したい場合は、
 * Menu Battle
 * のように指定すれば、メニュー画面と戦闘シーンでウィンドウを重ねることができる
 * ようになります。
 *
 * このプラグインには、プラグインコマンドはありません。
 *
 * --------------------------------------------------------------------------------------
 * zlib/libpng ライセンス
 * http://opensource.org/licenses/Zlib
 *
 * Copyright (c) 2015 aoitaku<twitter:aoitaku>
 * This software is provided 'as-is', without any express or implied warranty.
 * In no event will the authors be held liable for any damages arising from
 * the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it freely,
 * subject to the following restrictions:
 *
 * 1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 *
 * 邦訳は下記を参照してください。
 * https://osdn.jp/projects/opensource/wiki/licenses%2Fzlib_libpng_license
 */

(function () {
    WindowLayer.prototype.renderWebGL = function (renderer) {
        if (!this.visible || !this.renderable) {
            return;
        }

        if (this.children.length == 0) {
            return;
        }

        renderer.flush();
        this.filterArea.copy(this);
        renderer.filterManager.pushFilter(this, this.filters);
        renderer.currentRenderer.start();

        var shift = new PIXI.Point();
        var rt = renderer._activeRenderTarget;
        var projectionMatrix = rt.projectionMatrix;
        shift.x = Math.round((projectionMatrix.tx + 1) / 2 * rt.sourceFrame.width);
        shift.y = Math.round((projectionMatrix.ty + 1) / 2 * rt.sourceFrame.height);

        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            if (child._isWindow && child.visible && child.openness > 0) {
                //this._maskWindow(child, shift);
                renderer.maskManager.pushScissorMask(this, this._windowMask);
                renderer.clear();
                renderer.maskManager.popScissorMask();
                renderer.currentRenderer.start();
                child.renderWebGL(renderer);
                renderer.currentRenderer.flush();
            }
        }

        renderer.flush();
        renderer.filterManager.popFilter();
        renderer.maskManager.popScissorMask();

        for (var j = 0; j < this.children.length; j++) {
            if (!this.children[j]._isWindow) {
                this.children[j].renderWebGL(renderer);
            }
        }
    };
})();
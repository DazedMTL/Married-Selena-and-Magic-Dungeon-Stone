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
    var _Sprite_Battler_prototype_setupDamagePopup = Sprite_Battler.prototype.setupDamagePopup;
    Sprite_Battler.prototype.setupDamagePopup = function () {
        if (this._battler.isDamagePopupRequested()) {
            if (this._battler.isSpriteVisible()) {
                if (this._battler.isEnemy() && this._battler.result().skillFinish) {
                    var sprite = new Sprite_EffectResult();
                    sprite.x = this.x + this.damageOffsetX() - 90;
                    sprite.y = this.y + this.damageOffsetY() - 110;
                    this.parent.addChild(sprite);
                }
            }
        }
        _Sprite_Battler_prototype_setupDamagePopup.call(this);
    };
    var Sprite_EffectResult = /** @class */ (function (_super) {
        __extends(Sprite_EffectResult, _super);
        function Sprite_EffectResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_EffectResult.prototype.initialize = function () {
            Sprite.prototype.initialize.call(this);
            var baseTexture = Saba.getSystemBaseTexture('effect_text');
            var sprite = new PIXI.Sprite(new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 0, 250, 60)));
            this.addChild(sprite);
            this._frameCount = 0;
        };
        Sprite_EffectResult.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._frameCount <= 60) {
                this.y -= 1;
            }
            this._frameCount++;
            if (this._frameCount >= 50) {
                this.alpha -= 0.03;
            }
            if (this._frameCount > 70) {
                this.parent.removeChild(this);
            }
        };
        return Sprite_EffectResult;
    }(Sprite));
})(Saba || (Saba = {}));
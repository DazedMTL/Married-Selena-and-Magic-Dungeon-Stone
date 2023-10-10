Sprite_Base.prototype.textColor = function (n) {
    if (!this.windowskin) {
        this.windowskin = ImageManager.loadSystem('Window');
    }
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    return this.windowskin.getPixel(px, py);
};
Sprite_Base.prototype.normalColor = function () {
    return this.textColor(0);
};
Sprite_Base.prototype.systemColor = function () {
    return this.textColor(16);
};
Sprite_Base.prototype.crisisColor = function () {
    return this.textColor(17);
};
Sprite_Base.prototype.deathColor = function () {
    return this.textColor(18);
};
Sprite_Base.prototype.gaugeBackColor = function () {
    return this.textColor(19);
};
Sprite_Base.prototype.hpGaugeColor1 = function () {
    return this.textColor(20);
};
Sprite_Base.prototype.hpGaugeColor2 = function () {
    return this.textColor(21);
};
Sprite_Base.prototype.mpGaugeColor1 = function () {
    return this.textColor(22);
};
Sprite_Base.prototype.mpGaugeColor2 = function () {
    return this.textColor(23);
};
Sprite_Base.prototype.mpCostColor = function () {
    return this.textColor(23);
};
Sprite_Base.prototype.powerUpColor = function () {
    return this.textColor(24);
};
Sprite_Base.prototype.powerDownColor = function () {
    return this.textColor(25);
};
Sprite_Base.prototype.tpGaugeColor1 = function () {
    return this.textColor(28);
};
Sprite_Base.prototype.tpGaugeColor2 = function () {
    return this.textColor(29);
};
Sprite_Base.prototype.tpCostColor = function () {
    return this.textColor(29);
};
Sprite_Base.prototype.pendingColor = function () {
    return this.windowskin.getPixel(120, 120);
};

Sprite_Animation.prototype.setupRate = function () {
    if (this._animation.name.contains('60')) {
        this._rate = 1;
    }
    else {
        this._rate = 2;
    }
};

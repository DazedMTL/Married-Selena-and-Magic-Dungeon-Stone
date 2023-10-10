Window_Base.prototype.drawNumber = function (num, x, y, w, align, type) {
    drawNumber(num, x, y, w, align, type, this._windowContentsSprite);
};
Window_Base.prototype.drawPercent = function (x, y, type) {
    var baseTexture = getBaseTexture();
    var texture = new PIXI.Texture(baseTexture);
    if (!type) {
        texture.frame = new PIXI.Rectangle(11 * 32, 94, 36, 31);
    }
    else if (type == 1) {
        texture.frame = new PIXI.Rectangle(11 * 21, 550, 21, 24);
    }
    var sprite = new PIXI.Sprite(texture);
    sprite.x = x;
    sprite.y = y;
    this._windowContentsSprite.addChild(sprite);
};
Sprite_Base.prototype.drawPercent = function (x, y, type) {
    var baseTexture = getBaseTexture();
    var texture = new PIXI.Texture(baseTexture);
    if (!type) {
        texture.frame = new PIXI.Rectangle(11 * 32, 94, 36, 31);
    }
    else if (type == 1) {
        y += 2;
        texture.frame = new PIXI.Rectangle(10 * 21, 600, 21, 26);
    }
    else if (type == 2) {
        y += 2;
        texture.frame = new PIXI.Rectangle(10 * 21, 600 + 26, 21, 26);
    }
    var sprite = new PIXI.Sprite(texture);
    sprite.x = x;
    sprite.y = y;
    var base = this;
    if (this.numBase) {
        base = this.numBase;
    }
    base.addChild(sprite);
};
Sprite_Base.prototype.drawNumber = function (num, x, y, w, align, type) {
    var base = this;
    if (this.numBase) {
        base = this.numBase;
    }
    drawNumber(num, x, y, w, align, type, base);
};
Sprite_Base.prototype.drawHP = function (x, y, type) {
    var baseTexture = getBaseTexture();
    var texture = new PIXI.Texture(baseTexture);
    if (type == 2) {
        texture.frame = new PIXI.Rectangle(50, 140, 50, 40);
    }
    else {
        texture.frame = new PIXI.Rectangle(0, 140, 50, 40);
    }
    var sprite = new PIXI.Sprite(texture);
    sprite.x = x;
    sprite.y = y;
    var base = this;
    if (this.numBase) {
        base = this.numBase;
    }
    base.addChild(sprite);
};
function getBaseTexture() {
    var baseTexture = PIXI.utils.BaseTextureCache['system/number'];
    if (!baseTexture) {
        var bitmap = ImageManager.loadSystem('number');
        if (!bitmap.isReady()) {
            return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.imageUrl = 'system/number';
        PIXI.utils.BaseTextureCache['system/number'] = baseTexture;
    }
    return baseTexture;
}
Window_Base.prototype.drawAlphabet = function (num, x, y) {
    drawAlphabet(num, x, y, this._windowContentsSprite);
};
Sprite_Base.prototype.drawAlphabet = function (num, x, y) {
    var base = this;
    if (this.numBase) {
        base = this.numBase;
    }
    drawAlphabet(num, x, y, base);
};
function drawAlphabet(num, x, y, parent) {
    var baseTexture = getBaseTexture();
    if (!baseTexture) {
        return;
    }
    var pw = 30;
    var ph = 30;
    var yy = 780;
    var texture = new PIXI.Texture(baseTexture);
    texture.frame = new PIXI.Rectangle(num * pw, yy, pw, ph);
    var sprite = new PIXI.Sprite(texture);
    sprite.x = x;
    if (parent.paintOpacity !== undefined) {
        sprite.alpha = parent.paintOpacity / 256;
    }
    sprite.y = y;
    parent.addChild(sprite);
}
function drawNumber(num, x, y, w, align, type, parent) {
    var baseTexture = getBaseTexture();
    if (!baseTexture) {
        return;
    }
    var xx = 0;
    if (type === 4) {
        var pw = 19;
        var ph = 23;
        xx = 100;
        var yy = 147;
        var ww = 20;
    }
    else if (type == 1) {
        var pw = 32;
        var ph = 40;
        var yy = 0;
        var ww = 25;
    }
    else {
        var pw = 32;
        var ph = 38;
        var yy = 53;
        var ww = 19;
        if (type == 3) {
            yy += 40;
            var ww = 18;
        }
        if (type == 6) {
            yy += 780;
            var ww = 18;
            ph = 30;
        }
        if (type == 5) {
            yy += 770;
        }
        if (type == 7) {
            yy += 494;
            ww = 24;
        }
        if (type == 8) {
            yy += 550;
            pw = 21;
            ww = 12;
            ph = 24;
            y += 5;
        }
        if (type == 9) {
            yy += 550 + 26;
            pw = 21;
            ww = 12;
            ph = 24;
            y += 5;
        }
    }
    var str = num + '';
    for (var i = 0; i < str.length; i++) {
        if (align == 'right') {
            var c = parseInt(str[str.length - i - 1]);
        }
        else {
            var c = parseInt(str[i]);
        }
        var texture = new PIXI.Texture(baseTexture);
        texture.frame = new PIXI.Rectangle(c * pw + 2 + xx, yy, pw, ph);
        var sprite = new PIXI.Sprite(texture);
        if (align == 'right') {
            sprite.x = x + w - (i + 1) * ww - 8;
            if (type == 1 && i == str.length - 1 && c == 1) {
                sprite.x += 2;
            }
        }
        else {
            sprite.x = x + i * ww;
        }
        if (parent.paintOpacity !== undefined) {
            sprite.alpha = parent.paintOpacity / 256;
        }
        sprite.y = y;
        parent.addChild(sprite);
    }
    if (num < 0) {
        var texture = new PIXI.Texture(baseTexture);
        texture.frame = new PIXI.Rectangle(10 * pw + 2 + xx, yy, pw, ph);
        var sprite = new PIXI.Sprite(texture);
        if (align == 'right') {
            sprite.x = x + w - (i + 1) * ww + 10;
        }
        else {
            sprite.x = x + i * ww;
        }
        sprite.y = y;
        parent.addChild(sprite);
    }
}
Window_Base.prototype.drawActorLevel = function (actor, x, y) {
    this.drawTextImage(x, y + 0, 2);
    this.drawNumber(actor.level, x + 50, y, 36, 'right', 1);
};
Window_Base.prototype.drawCurrentAndMax = function (current, max, x, y, width, color1, color2, valueWidth2) {
    var labelWidth = 32;
    var valueWidth = valueWidth2 || 50;
    var slashWidth = 16;
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
    if (width < 150) {
        x3 += 76;
    }
    this.changeTextColor(color1);
    this.drawNumber(current, x3, y - 2, valueWidth, 'right', 3);
    if (width > 140) {
        this.changeTextColor(color2);
        this.drawText('/', x2, y, slashWidth, 'right');
        this.drawNumber(max, x1, y - 2, valueWidth, 'right', 3);
    }
};
Window_Base.prototype.drawCurrentAndMax2 = function (current, damage, max, x, y, width, color1, color2, valueWidth2) {
    var labelWidth = 32;
    var valueWidth = valueWidth2 || 60;
    if (width < 150) {
        valueWidth = 40;
    }
    var slashWidth = 16;
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth - 80;
    this.changeTextColor(color1);
    this.drawNumber(current, x3, y, valueWidth, 'right', 3);
    this.drawNumber(damage, x3 + 80, y, valueWidth, 'right', 5);
    this.changeTextColor(color2);
    this.drawText('/', x2, y, slashWidth, 'right');
    this.drawText('→', x2 - 84, y, 24, 'right');
    this.drawNumber(max, x1, y, valueWidth, 'right', 3);
};
Window_Base.prototype.drawCurrencyValue = function (value, unit, x, y, width, num) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    num = num || 2;
    this.drawNumber(value, x, y, width - unitWidth - 6, 'right', 2);
    this.changeTextColor(this.systemColor());
    this.drawTextImage(x + width - 32, y + 0, 1);
};
Window_Base.prototype.drawTextImage = function (x, y, type) {
    drawTextImage(x, y, type, this._windowContentsSprite);
};
Sprite_Base.prototype.drawTextImage = function (x, y, type) {
    drawTextImage(x, y, type, this._windowContentsSprite || this);
};
function drawTextImage(x, y, type, parent) {
    var baseTexture = PIXI.utils.BaseTextureCache['system/number'];
    if (!baseTexture) {
        var bitmap = ImageManager.loadSystem('number');
        if (!bitmap.isReady()) {
            return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.imageUrl = 'system/number';
        PIXI.utils.BaseTextureCache['system/number'] = baseTexture;
    }
    var texture = new PIXI.Texture(baseTexture);
    switch (type) {
        case 1:
            texture.frame = new PIXI.Rectangle(0, 180, 50, 40);
            break;
        case 3:
            texture.frame = new PIXI.Rectangle(0, 180, 50, 40);
            break;
        case 2:
            texture.frame = new PIXI.Rectangle(0, 220, 50, 40);
            break;
        case 4:
            texture.frame = new PIXI.Rectangle(50, 180, 50, 40);
            break;
        case 5:
            texture.frame = new PIXI.Rectangle(100, 180, 50, 40);
            break;
        case 6:
            texture.frame = new PIXI.Rectangle(150, 180, 60, 40);
            break;
        case 7:
            texture.frame = new PIXI.Rectangle(50, 220, 60, 40);
            break;
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
            texture.frame = new PIXI.Rectangle(0, 220 + (type - 10) * 40, 190, 42);
            break;
        case 21:
            texture.frame = new PIXI.Rectangle(0, 220 + (14 - 10) * 40, 190, 42);
            break;
        case 22:
            texture.frame = new PIXI.Rectangle(0, 220 + (17 - 10) * 40, 190, 42);
            break;
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
            texture.frame = new PIXI.Rectangle(0, 540 + (type - 31) * 40, 290, 42);
            break;
    }
    var sprite = new PIXI.Sprite(texture);
    sprite.x = x;
    sprite.y = y;
    parent.addChild(sprite);
}
/*
Sprite_Damage.prototype.createDigits = function(baseRow, value) {
    var string = Math.abs(value).toString();
    var row = baseRow + (value < 0 ? 1 : 0);
    var w = this.digitWidth();
    var h = this.digitHeight();
    for (var i = 0; i < string.length; i++) {
        var sprite = this.createChildSprite();
        var n = Number(string[i]);
        var ww = w - 8;
        sprite.setFrame(n * w + 2, row * h, w - 6, h);
        sprite.x = (i - (string.length - 1) / 2) * ww;
        sprite.dy = -i;
    }
};*/

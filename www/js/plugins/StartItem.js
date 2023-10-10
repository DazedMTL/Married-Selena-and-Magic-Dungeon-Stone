var Saba;
(function (Saba) {
    Game_Party.prototype.gainStartItems = function () {
        for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
            var a = _a[_i];
            a.gainStartItems();
        }
    };
    Game_Actor.prototype.gainStartItems = function () {
        for (var _i = 0, _a = this.armors(); _i < _a.length; _i++) {
            var a = _a[_i];
            if (!a) {
                continue;
            }
            var itemId = parseInt(a.meta['startItem']);
            if (isNaN(itemId)) {
                continue;
            }
            $gameParty.gainItem($dataItems[itemId], 1);
        }
    };
})(Saba || (Saba = {}));

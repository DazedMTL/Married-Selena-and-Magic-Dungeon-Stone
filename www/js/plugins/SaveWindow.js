var Saba;
(function (Saba) {
    Window_SavefileList.prototype.drawContents = function (info, rect, valid) {
        var bottom = rect.y + rect.height;
        if (rect.width >= 420) {
            /*if (info.floor) {
                this.drawText('Chapter ' + info.stage + '   ' + getStageName(info.stage) + ' B' + info.floor + 'F', rect.x + 192, rect.y, 600);
            } else {*/
            var placeName = getPlaceName(info.placeId);
            this.drawText(info.chapterName + '   ' + placeName, rect.x + 192, rect.y, 600);
            //}
            if (info.level) {
                this.drawText('Lv ' + info.level, rect.x + 774, rect.y + 94, 194);
            }
            if (valid) {
                this.drawPartyCharacters(info, rect.x + 220, bottom - 4);
            }
        }
        var lineHeight = this.lineHeight();
        var y2 = bottom - lineHeight;
        if (y2 >= lineHeight) {
            this.drawPlaytime(info, rect.x, y2, rect.width);
        }
    };
    function getChapterName() {
        if ($gameSwitches.value(268)) {
            return '８層踏破';
        }
        if ($gameSwitches.value(267)) {
            return '８層攻略中';
        }
        if ($gameSwitches.value(266)) {
            return '７層攻略中';
        }
        if ($gameSwitches.value(265)) {
            return '６層攻略中';
        }
        if ($gameSwitches.value(264)) {
            return '５層攻略中';
        }
        if ($gameSwitches.value(263)) {
            return '４層攻略中';
        }
        if ($gameSwitches.value(262)) {
            return '３層攻略中';
        }
        if ($gameSwitches.value(261)) {
            return '２層攻略中';
        }
        if ($gameSwitches.value(220)) {
            return '１層攻略中';
        }
        return 'Opening';
    }
    var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function () {
        var info = _DataManager_makeSavefileInfo.call(this);
        info.stage = $gameVariables.value(1);
        if ($gameSwitches.value(1)) {
            info.floor = $gameVariables.value(2);
        }
        info.placeId = $gameVariables.value(8);
        info.level = $gameActors.actor(1).level;
        info.chapterName = getChapterName();
        return info;
    };
})(Saba || (Saba = {}));

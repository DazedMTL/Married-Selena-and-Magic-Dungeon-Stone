var Saba;
(function (Saba) {
    var PARAM1 = [1, 2, 3, 4, 5, 6, 7, 8];
    var PARAM2 = [2, 4, 6, 8, 10, 12, 14, 16];
    var PARAM3 = [2, 5, 8, 11, 14, 17, 21, 25];
    var PARAM4 = [3, 6, 10, 14, 19, 24, 29, 35];
    var PARAM5 = [4, 8, 12, 17, 22, 28, 34, 40];
    var _DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function (object) {
        _DataManager_onLoad.call(this, object);
        if (object === $dataWeapons) {
            for (var _i = 0, synthData_1 = synthData; _i < synthData_1.length; _i++) {
                var data = synthData_1[_i];
                if (data[0] == 'w') {
                    $dataWeapons[data[1]].meta['合成材料'] = data[2];
                }
            }
            for (var _a = 0, object_1 = object; _a < object_1.length; _a++) {
                var w = object_1[_a];
                if (!w) {
                    continue;
                }
                if (!w.meta['LV']) {
                    continue;
                }
                var level = parseInt(w.meta['LV']);
                if (!level) {
                    continue;
                }
                switch (w.wtypeId) {
                    case 1:
                        // セレナの武器1 杖
                        w.params[2] += PARAM4[level - 1] + 1;
                        w.params[4] += PARAM4[level - 1] + 2;
                        w.traits.push({
                            code: 22,
                            dataId: 0,
                            value: PARAM5[level - 1] / 100
                        });
                        break;
                    case 2:
                        // セレナの武器2 本
                        w.params[4] += PARAM5[level - 1] + 2;
                        w.params[5] += PARAM1[level - 1] + 1;
                        break;
                    case 3:
                        // ソフィアの武器1 杖
                        w.params[2] += PARAM5[level - 1] + 2;
                        w.params[4] += PARAM3[level - 1] + 1;
                        w.traits.push({
                            code: 22,
                            dataId: 0,
                            value: PARAM5[level - 1] / 100
                        });
                        break;
                    case 4:
                        // ソフィアの武器2 聖水
                        w.params[4] += PARAM3[level - 1] + 2;
                        w.params[5] += PARAM1[level - 1] + 1;
                        w.params[3] += PARAM1[level - 1] + 1;
                        break;
                    case 5:
                        // ロナの武器1 剣
                        w.params[2] += PARAM4[level - 1] + 3;
                        w.traits.push({
                            code: 22,
                            dataId: 0,
                            value: PARAM5[level - 1] / 100
                        });
                        break;
                    case 6:
                        // ロナの武器2 爪
                        w.params[2] += PARAM3[level - 1] + 1;
                        w.traits.push({
                            code: 22,
                            dataId: 0,
                            value: PARAM4[level - 1] / 100
                        });
                        break;
                    case 9:
                        // リンの武器1
                        w.params[2] += PARAM4[level - 1] + 3;
                        w.traits.push({
                            code: 22,
                            dataId: 0,
                            value: PARAM4[level - 1] / 100
                        });
                        w.params[0] += PARAM3[level - 1];
                        break;
                    case 10:
                        // リンの武器2 爪
                        w.params[2] += PARAM3[level - 1] + 1;
                        w.traits.push({
                            code: 22,
                            dataId: 0,
                            value: PARAM5[level - 1] / 100
                        });
                        w.params[0] += PARAM2[level - 1];
                        break;
                }
            }
        }
        else if (object === $dataArmors) {
            for (var _b = 0, synthData_2 = synthData; _b < synthData_2.length; _b++) {
                var data = synthData_2[_b];
                if (data[0] == 'a') {
                    $dataArmors[data[1]].meta['合成材料'] = data[2];
                }
            }
            for (var _c = 0, object_2 = object; _c < object_2.length; _c++) {
                var a = object_2[_c];
                if (!a) {
                    continue;
                }
                if (!a.meta['LV']) {
                    continue;
                }
                var level = parseInt(a.meta['LV']);
                if (!level) {
                    continue;
                }
                switch (a.atypeId) {
                    case 1:
                        switch (a.etypeId) {
                            case 3:
                                // セレナの服
                                a.params[0] += PARAM1[level - 1];
                                a.params[3] += PARAM3[level - 1];
                                a.params[5] += PARAM2[level - 1];
                                /*w.traits.push({
                                    code: 22,
                                    dataId: 0,
                                    value: PARAM5[level - 1] / 100
                                });*/
                                break;
                            case 4:
                                // セレナの帽子
                                a.params[3] += PARAM3[level - 1];
                                a.traits.push({
                                    code: 22,
                                    dataId: 1,
                                    value: PARAM4[level - 1] / 100
                                });
                                a.params[5] += PARAM2[level - 1];
                                break;
                            case 5:
                                // セレナの指輪
                                a.params[3] += PARAM2[level - 1];
                                a.params[4] += PARAM2[level - 1];
                                break;
                            case 6:
                                // セレナの首飾り
                                a.params[0] += PARAM1[level - 1];
                                a.params[4] += PARAM2[level - 1];
                                break;
                        }
                        break;
                    case 2:
                        switch (a.etypeId) {
                            case 3:
                                // ソフィアの服
                                a.params[0] += PARAM2[level - 1];
                                a.params[3] += PARAM2[level - 1];
                                /*w.traits.push({
                                    code: 22,
                                    dataId: 0,
                                    value: PARAM5[level - 1] / 100
                                });*/
                                break;
                            case 4:
                                // ソフィアの盾
                                a.params[3] += PARAM3[level - 1];
                                a.params[5] += PARAM2[level - 1];
                                a.traits.push({
                                    code: 22,
                                    dataId: 1,
                                    value: PARAM4[level - 1] / 100
                                });
                                break;
                            case 5:
                                // ソフィアの指輪
                                a.params[3] += PARAM2[level - 1];
                                a.params[4] += PARAM2[level - 1];
                                a.params[5] += PARAM2[level - 1];
                                break;
                            case 6:
                                // ソフィアのオーブ
                                a.params[0] += PARAM2[level - 1];
                                a.params[5] += PARAM2[level - 1];
                                a.traits.push({
                                    code: 22,
                                    dataId: 1,
                                    value: PARAM2[level - 1] / 100
                                });
                                break;
                        }
                        break;
                    case 3:
                        switch (a.etypeId) {
                            case 3:
                                // ロナの服
                                a.params[0] += PARAM1[level - 1] + 1;
                                a.params[3] += PARAM2[level - 1];
                                /*w.traits.push({
                                    code: 22,
                                    dataId: 0,
                                    value: PARAM5[level - 1] / 100
                                });*/
                                break;
                            case 4:
                                // ロナの盾
                                a.params[3] += PARAM3[level - 1];
                                a.traits.push({
                                    code: 22,
                                    dataId: 1,
                                    value: PARAM4[level - 1] / 100
                                });
                                break;
                            case 5:
                                // ロナのリボン
                                a.params[0] += PARAM1[level - 1];
                                a.params[5] += PARAM2[level - 1];
                                break;
                            case 6:
                                // ロナのオーブ
                                a.params[5] += PARAM2[level - 1];
                                a.traits.push({
                                    code: 22,
                                    dataId: 1,
                                    value: PARAM2[level - 1] / 100
                                });
                                break;
                        }
                        break;
                }
            }
        }
    };
})(Saba || (Saba = {}));
